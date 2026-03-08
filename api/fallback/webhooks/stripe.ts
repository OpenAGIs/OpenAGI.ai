import { POST as stripeWebhookPost } from '../../../src/pages/api/webhooks/stripe';
import { sendWebResponse, toWebRequest } from '../../../src/server/vercel/astro-bridge';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const request = await toWebRequest(req, { rawBody: true });
  const response = await stripeWebhookPost({ request } as any);
  return sendWebResponse(res, response);
}
