import { GET as statusGet } from '../../src/pages/api/agent/status';
import { sendWebResponse, toWebRequest } from '../_lib/astro-bridge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const request = await toWebRequest(req);
  const response = await statusGet({ request } as any);
  return sendWebResponse(res, response);
}
