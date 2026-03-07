import type { APIRoute } from 'astro';

import { captureException } from '../../server/extensions/sentry';
import { getBaseUrl, getStripeClient, type StripePortalPayload } from '../../server/extensions/stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as StripePortalPayload;
    let customerId = body.customerId;

    if (!customerId && body.checkoutSessionId) {
      const session = await getStripeClient().checkout.sessions.retrieve(String(body.checkoutSessionId));
      customerId = typeof session.customer === 'string' ? session.customer : undefined;
    }

    if (!customerId) {
      return new Response(JSON.stringify({ error: 'Missing customerId (or checkoutSessionId)' }), { status: 400 });
    }

    const baseUrl = getBaseUrl(request);
    const returnUrl = body.returnUrl || `${baseUrl}/pricing`;

    const portal = await getStripeClient().billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl
    });

    if (!portal.url) {
      return new Response(JSON.stringify({ error: 'Stripe did not return a portal URL' }), { status: 502 });
    }

    return new Response(JSON.stringify({ url: portal.url }), { status: 200 });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/portal' });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500 }
    );
  }
};
