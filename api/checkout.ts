import Stripe from 'stripe';

type StripeCheckoutPayload = {
  priceId?: string;
  successUrl?: string;
  cancelUrl?: string;
  customerEmail?: string;
  clientReferenceId?: string;
};

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  if (!stripeClient) stripeClient = new Stripe(key);
  return stripeClient;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = (req.body || {}) as StripeCheckoutPayload;
    const priceId = body.priceId || process.env.STRIPE_PRICE_ID;
    if (!priceId) return res.status(400).json({ error: 'Missing priceId' });

    const baseUrl = (process.env.PUBLIC_APP_URL || `https://${req.headers.host || 'openagi.ai'}`).replace(/\/+$/, '');
    const successUrl = body.successUrl || `${baseUrl}/pricing?success=1&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = body.cancelUrl || `${baseUrl}/pricing?canceled=1`;

    const session = await getStripeClient().checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: String(priceId), quantity: 1 }],
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.customerEmail,
      client_reference_id: body.clientReferenceId
    });

    if (!session.url) return res.status(502).json({ error: 'Stripe did not return a session URL' });
    return res.status(200).json({ id: session.id, url: session.url });
  } catch (error: unknown) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
