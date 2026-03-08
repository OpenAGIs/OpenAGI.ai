import { POST as checkoutPost } from '../../src/pages/api/checkout';
import { sendWebResponse, toWebRequest } from '../../src/server/vercel/astro-bridge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const request = await toWebRequest(req);
  const response = await checkoutPost({ request } as any);
  return sendWebResponse(res, response);
}
