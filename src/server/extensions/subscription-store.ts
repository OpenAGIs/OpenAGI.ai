export type SubscriptionSnapshot = {
  customerId?: string | null;
  subscriptionId?: string | null;
  status: string;
  updatedAt: string;
};

const globalKey = '__OPENAGI_SUBSCRIPTIONS__';
type SubscriptionStore = Map<string, SubscriptionSnapshot>;

function getStore(): SubscriptionStore {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[globalKey]) g[globalKey] = new Map<string, SubscriptionSnapshot>();
  return g[globalKey] as SubscriptionStore;
}

export function recordCheckoutCompleted(params: {
  userKey: string;
  customerId?: string | null;
  subscriptionId?: string | null;
  status?: string;
}): SubscriptionSnapshot {
  const snapshot: SubscriptionSnapshot = {
    customerId: params.customerId ?? null,
    subscriptionId: params.subscriptionId ?? null,
    status: params.status || 'active',
    updatedAt: new Date().toISOString()
  };
  getStore().set(params.userKey, snapshot);
  return snapshot;
}
