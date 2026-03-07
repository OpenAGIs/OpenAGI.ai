import type { APIRoute } from 'astro';
import Stripe from 'stripe';

import { captureException } from '../../../server/extensions/sentry';
import { getStripeWebhookSecret } from '../../../server/extensions/stripe';
import { recordCheckoutCompleted } from '../../../server/extensions/subscription-store';

export const POST: APIRoute = async ({ request }) => {
  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing stripe-signature header', { status: 400 });

  let payload: string;
  try {
    payload = await request.text();
  } catch {
    return new Response('Invalid request body', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(payload, signature, getStripeWebhookSecret());
  } catch (error: unknown) {
    await captureException(error, { route: '/api/webhooks/stripe', stage: 'verify-signature' });
    return new Response('Invalid signature', { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userKey = session.client_reference_id || session.customer_email || session.customer?.toString() || session.id;

      recordCheckoutCompleted({
        userKey,
        customerId: session.customer?.toString(),
        subscriptionId: session.subscription?.toString(),
        status: 'active'
      });
    }

    return new Response(JSON.stringify({ received: true, type: event.type }), { status: 200 });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/webhooks/stripe', eventType: event.type });
    return new Response('Handler error', { status: 500 });
  }
};
