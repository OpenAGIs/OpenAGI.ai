export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = new URL(req.url || '/', `https://${req.headers.host || 'openagi.ai'}`);
  const id = url.searchParams.get('id')?.trim();
  if (!id) return res.status(400).json({ error: 'Missing task id' });

  // Root API mode does not persist in-memory tasks across isolated lambdas.
  return res.status(404).json({ error: 'Task not found' });
}
