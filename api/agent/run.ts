import { POST as runPost } from '../../src/pages/api/agent/run';
import { sendWebResponse, toWebRequest } from '../_lib/astro-bridge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const request = await toWebRequest(req);
  const response = await runPost({ request } as any);
  return sendWebResponse(res, response);
}
