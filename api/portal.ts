import { captureException } from '../src/server/extensions/sentry';
import { getStripeClient, type StripePortalPayload } from '../src/server/extensions/stripe';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = (req.body || {}) as StripePortalPayload;
    let customerId = body.customerId;

    if (!customerId && body.checkoutSessionId) {
      const session = await getStripeClient().checkout.sessions.retrieve(String(body.checkoutSessionId));
      customerId = typeof session.customer === 'string' ? session.customer : undefined;
    }

    if (!customerId) return res.status(400).json({ error: 'Missing customerId (or checkoutSessionId)' });

    const baseUrl = (process.env.PUBLIC_APP_URL || `https://${req.headers.host || 'openagi.ai'}`).replace(/\/+$/, '');
    const returnUrl = body.returnUrl || `${baseUrl}/pricing`;

    const portal = await getStripeClient().billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });

    if (!portal.url) return res.status(502).json({ error: 'Stripe did not return a portal URL' });
    return res.status(200).json({ url: portal.url });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/portal' });
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
