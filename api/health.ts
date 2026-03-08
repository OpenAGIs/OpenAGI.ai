export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = new URL(req.url || '/', `https://${req.headers.host || 'openagi.ai'}`);
  if (url.searchParams.get('fail') === '1') return res.status(500).json({ ok: false });

  return res.status(200).json({ ok: true });
}
