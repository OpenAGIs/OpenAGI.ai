function toIsoNow() {
  return new Date().toISOString();
}

function toNumberOrZero(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function resolveUserFromPayload(payload, state) {
  const metadataUserId = payload?.metadata?.user_id ?? payload?.metadata?.userId;
  if (metadataUserId) {
    return { userId: String(metadataUserId), source: 'metadata.user_id' };
  }

  if (payload?.client_reference_id) {
    return { userId: String(payload.client_reference_id), source: 'client_reference_id' };
  }

  if (payload?.customer && state.customerToUser[payload.customer]) {
    return {
      userId: state.customerToUser[payload.customer],
      source: 'customer_map',
    };
  }

  return { userId: null, source: 'none' };
}

function upsertUser(state, userId, patch) {
  const previous = state.users[userId] ?? {
    userId,
    stripeCustomerId: null,
    subscriptionStatus: 'inactive',
    tokensBalance: 0,
    updatedAt: null,
  };

  state.users[userId] = {
    ...previous,
    ...patch,
    updatedAt: toIsoNow(),
  };

  return state.users[userId];
}

function appendAudit(state, eventId, eventType, action, details = {}) {
  state.audits.push({
    at: toIsoNow(),
    eventId,
    eventType,
    action,
    details,
  });
}

function markProcessed(state, eventId, eventType, userId) {
  state.processedEvents[eventId] = {
    processedAt: toIsoNow(),
    eventType,
    userId: userId ?? null,
  };
}

function applyCheckoutSessionCompleted(state, eventId, payload, resolvedUser) {
  if (!resolvedUser.userId) {
    appendAudit(state, eventId, 'checkout.session.completed', 'user_not_resolved', {
      customer: payload?.customer ?? null,
    });
    return { handled: false, reason: 'user_not_resolved' };
  }

  const tokensDelta = toNumberOrZero(
    payload?.metadata?.tokens_purchased ?? payload?.metadata?.tokens_delta ?? 0,
  );

  const existing = state.users[resolvedUser.userId];
  const existingTokens = existing?.tokensBalance ?? 0;

  const nextUser = upsertUser(state, resolvedUser.userId, {
    stripeCustomerId: payload?.customer ?? existing?.stripeCustomerId ?? null,
    subscriptionStatus:
      payload?.mode === 'subscription' || payload?.subscription
        ? 'active'
        : existing?.subscriptionStatus ?? 'inactive',
    tokensBalance: existingTokens + tokensDelta,
  });

  if (payload?.customer) {
    state.customerToUser[payload.customer] = resolvedUser.userId;
  }

  appendAudit(state, eventId, 'checkout.session.completed', 'billing_state_updated', {
    userId: resolvedUser.userId,
    resolutionSource: resolvedUser.source,
    stripeCustomerId: payload?.customer ?? null,
    tokensDelta,
    tokensBalance: nextUser.tokensBalance,
    subscriptionStatus: nextUser.subscriptionStatus,
  });

  return { handled: true, userId: resolvedUser.userId };
}

function applySubscriptionLifecycle(state, eventId, eventType, payload, resolvedUser) {
  if (!resolvedUser.userId) {
    appendAudit(state, eventId, eventType, 'user_not_resolved', {
      customer: payload?.customer ?? null,
    });
    return { handled: false, reason: 'user_not_resolved' };
  }

  const existing = state.users[resolvedUser.userId];
  const nextStatus = payload?.status ?? 'unknown';

  const nextUser = upsertUser(state, resolvedUser.userId, {
    stripeCustomerId: payload?.customer ?? existing?.stripeCustomerId ?? null,
    subscriptionStatus: nextStatus,
    tokensBalance: existing?.tokensBalance ?? 0,
  });

  if (payload?.customer) {
    state.customerToUser[payload.customer] = resolvedUser.userId;
  }

  appendAudit(state, eventId, eventType, 'subscription_state_updated', {
    userId: resolvedUser.userId,
    resolutionSource: resolvedUser.source,
    stripeCustomerId: payload?.customer ?? null,
    subscriptionStatus: nextUser.subscriptionStatus,
  });

  return { handled: true, userId: resolvedUser.userId };
}

export async function processStripeEvent(store, event) {
  const eventId = event?.id;
  const eventType = event?.type;

  if (!eventId || !eventType) {
    throw new Error('Stripe event must include id and type');
  }

  const state = await store.read();

  if (state.processedEvents[eventId]) {
    appendAudit(state, eventId, eventType, 'event_replay_skipped');
    await store.write(state);
    return {
      status: 'skipped',
      reason: 'event_already_processed',
    };
  }

  const payload = event?.data?.object ?? {};
  const resolvedUser = resolveUserFromPayload(payload, state);
  let result;

  if (eventType === 'checkout.session.completed') {
    result = applyCheckoutSessionCompleted(state, eventId, payload, resolvedUser);
  } else if (
    eventType === 'customer.subscription.created' ||
    eventType === 'customer.subscription.updated' ||
    eventType === 'customer.subscription.deleted'
  ) {
    result = applySubscriptionLifecycle(state, eventId, eventType, payload, resolvedUser);
  } else {
    appendAudit(state, eventId, eventType, 'event_ignored');
    result = { handled: false, reason: 'event_type_not_supported' };
  }

  markProcessed(state, eventId, eventType, result.userId ?? resolvedUser.userId);
  await store.write(state);

  return {
    status: 'processed',
    eventType,
    ...result,
  };
}

export function createStripeWebhookHandler({ verifyAndParseEvent, store }) {
  if (typeof verifyAndParseEvent !== 'function') {
    throw new Error('verifyAndParseEvent must be a function');
  }

  return async function handleWebhookRequest({ rawBody, stripeSignature }) {
    const event = await verifyAndParseEvent(rawBody, stripeSignature);
    return processStripeEvent(store, event);
  };
}
