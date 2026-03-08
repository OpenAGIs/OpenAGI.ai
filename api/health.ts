import { GET as healthGet } from '../src/pages/api/health';
import { sendWebResponse, toRequestUrl } from '../src/server/vercel/astro-bridge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const response = await healthGet({ url: toRequestUrl(req) } as any);
  return sendWebResponse(res, response);
}
