export default async function handler(req: any, res: any) {
  const url = new URL(req.url || '/', `https://${req.headers.host || 'openagi.ai'}`);
  if (req.method === 'POST' && url.pathname === '/api/webhooks/stripe') {
    return res.status(202).json({ received: true });
  }

  return res.status(404).json({ error: 'Not found' });
}
