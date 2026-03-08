import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { createJsonFileStore } from '../fileStore.mjs';
import { processStripeEvent } from '../webhookProcessor.mjs';

async function createStorePath(name) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'ope-10-'));
  return path.join(dir, name);
}

test('checkout.session.completed maps metadata user, links customer, and updates tokens', async () => {
  const storePath = await createStorePath('store-1.json');
  const store = createJsonFileStore(storePath);

  const result = await processStripeEvent(store, {
    id: 'evt_checkout_1',
    type: 'checkout.session.completed',
    data: {
      object: {
        customer: 'cus_123',
        client_reference_id: 'client-ref-user',
        mode: 'subscription',
        metadata: {
          user_id: 'user_from_metadata',
          tokens_purchased: '25',
        },
      },
    },
  });

  assert.equal(result.status, 'processed');
  assert.equal(result.userId, 'user_from_metadata');

  const state = await store.read();
  assert.equal(state.customerToUser.cus_123, 'user_from_metadata');
  assert.equal(state.users.user_from_metadata.subscriptionStatus, 'active');
  assert.equal(state.users.user_from_metadata.tokensBalance, 25);
  assert.ok(state.processedEvents.evt_checkout_1);
});

test('subscription.updated resolves user by existing customer mapping and updates status', async () => {
  const storePath = await createStorePath('store-2.json');
  const store = createJsonFileStore(storePath);

  await processStripeEvent(store, {
    id: 'evt_checkout_2',
    type: 'checkout.session.completed',
    data: {
      object: {
        customer: 'cus_abc',
        client_reference_id: 'user_client_ref',
        metadata: {
          tokens_purchased: '10',
        },
      },
    },
  });

  const updateResult = await processStripeEvent(store, {
    id: 'evt_sub_1',
    type: 'customer.subscription.updated',
    data: {
      object: {
        customer: 'cus_abc',
        status: 'past_due',
      },
    },
  });

  assert.equal(updateResult.status, 'processed');
  assert.equal(updateResult.userId, 'user_client_ref');

  const state = await store.read();
  assert.equal(state.users.user_client_ref.subscriptionStatus, 'past_due');
});

test('replayed event is skipped and logged without double-applying balance updates', async () => {
  const storePath = await createStorePath('store-3.json');
  const store = createJsonFileStore(storePath);

  const event = {
    id: 'evt_checkout_replay',
    type: 'checkout.session.completed',
    data: {
      object: {
        customer: 'cus_replay',
        client_reference_id: 'user_replay',
        metadata: {
          tokens_purchased: '15',
        },
      },
    },
  };

  const first = await processStripeEvent(store, event);
  const second = await processStripeEvent(store, event);

  assert.equal(first.status, 'processed');
  assert.equal(second.status, 'skipped');

  const state = await store.read();
  assert.equal(state.users.user_replay.tokensBalance, 15);
  assert.ok(
    state.audits.some(
      (audit) =>
        audit.eventId === 'evt_checkout_replay' &&
        audit.action === 'event_replay_skipped',
    ),
  );
});

test('records processed unresolved events for audit visibility', async () => {
  const storePath = await createStorePath('store-4.json');
  const store = createJsonFileStore(storePath);

  const result = await processStripeEvent(store, {
    id: 'evt_sub_no_user',
    type: 'customer.subscription.deleted',
    data: {
      object: {
        customer: 'cus_unknown',
        status: 'canceled',
      },
    },
  });

  assert.equal(result.status, 'processed');
  assert.equal(result.handled, false);
  assert.equal(result.reason, 'user_not_resolved');

  const state = await store.read();
  assert.ok(state.processedEvents.evt_sub_no_user);
  assert.ok(
    state.audits.some(
      (audit) =>
        audit.eventId === 'evt_sub_no_user' && audit.action === 'user_not_resolved',
    ),
  );
});
