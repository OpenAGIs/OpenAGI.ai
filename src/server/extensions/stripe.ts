import Stripe from 'stripe';

export type StripeCheckoutPayload = {
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  clientReferenceId?: string;
};

export type StripePortalPayload = {
  customerId?: string;
  checkoutSessionId?: string;
  returnUrl?: string;
};

let stripeClient: Stripe | null = null;

export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return key;
}

export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
  return secret;
}

export function getStripeClient(): Stripe {
  if (stripeClient) return stripeClient;
  stripeClient = new Stripe(getStripeSecretKey());
  return stripeClient;
}

export function getBaseUrl(request: Request): string {
  const configured = process.env.PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/+$/, '');
  return new URL(request.url).origin.replace(/\/+$/, '');
}
