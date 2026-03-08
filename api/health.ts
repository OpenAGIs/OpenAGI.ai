import { captureException } from '../src/server/extensions/sentry';
import { toRequestUrl } from '../src/server/vercel/astro-bridge';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (toRequestUrl(req).searchParams.get('fail') === '1') {
      throw new Error('Synthetic /api/health failure');
    }

    return res.status(200).json({ ok: true });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/health' });
    return res.status(500).json({ ok: false });
  }
}
