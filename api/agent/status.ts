import { captureException } from '../../src/server/extensions/sentry';
import { getTask } from '../../src/server/agent/tasks-store';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = new URL(req.url || '/', `https://${req.headers.host || 'openagi.ai'}`);
    const id = url.searchParams.get('id')?.trim();
    if (!id) return res.status(400).json({ error: 'Missing task id' });

    const task = getTask(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    return res.status(200).json(task);
  } catch (error: unknown) {
    await captureException(error, { route: '/api/agent/status' });
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
