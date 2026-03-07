import type { APIRoute } from 'astro';

import { captureException } from '../../server/extensions/sentry';
import { getBaseUrl, getStripeClient, type StripeCheckoutPayload } from '../../server/extensions/stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json().catch(() => ({}))) as StripeCheckoutPayload;
    const priceId = body.priceId || process.env.STRIPE_PRICE_ID;
    if (!priceId) {
      return new Response(JSON.stringify({ error: 'Missing priceId' }), { status: 400 });
    }

    const baseUrl = getBaseUrl(request);
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

    if (!session.url) {
      return new Response(JSON.stringify({ error: 'Stripe did not return a session URL' }), { status: 502 });
    }

    return new Response(JSON.stringify({ id: session.id, url: session.url }), { status: 200 });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/checkout' });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500 }
    );
  }
};
