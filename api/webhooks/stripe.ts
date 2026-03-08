import Stripe from 'stripe';

import { captureException } from '../../src/server/extensions/sentry';
import { recordCheckoutCompleted } from '../../src/server/extensions/subscription-store';
import { getStripeWebhookSecret } from '../../src/server/extensions/stripe';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const signature = req.headers['stripe-signature'];
  if (!signature) return res.status(400).send('Missing stripe-signature header');

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const payload = Buffer.concat(chunks).toString('utf8');

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(
      payload,
      Array.isArray(signature) ? signature[0] : signature,
      getStripeWebhookSecret()
    );
  } catch (error: unknown) {
    await captureException(error, { route: '/api/webhooks/stripe', stage: 'verify-signature' });
    return res.status(400).send('Invalid signature');
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

    return res.status(200).json({ received: true, type: event.type });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/webhooks/stripe', eventType: event.type });
    return res.status(500).send('Handler error');
  }
}
