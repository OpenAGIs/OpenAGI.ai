import Stripe from 'stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = req.headers['stripe-signature'];
  if (!secret || !signature) {
    return res.status(400).json({ error: 'Missing stripe webhook secret/signature' });
  }

  const payload =
    typeof req.body === 'string'
      ? req.body
      : Buffer.isBuffer(req.body)
        ? req.body.toString('utf8')
        : JSON.stringify(req.body ?? {});

  let event: Stripe.Event;
  try {
    event = Stripe.webhooks.constructEvent(payload, Array.isArray(signature) ? signature[0] : signature, secret);
  } catch {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  return res.status(200).json({ received: true, type: event.type });
}
