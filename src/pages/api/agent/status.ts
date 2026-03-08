import type { APIRoute } from 'astro';

import { captureException } from '../../../server/extensions/sentry';
import { getTask } from '../../../server/agent/tasks-store';

export const GET: APIRoute = async ({ request }) => {
  try {
    const id = new URL(request.url).searchParams.get('id')?.trim();
    if (!id) return new Response(JSON.stringify({ error: 'Missing task id' }), { status: 400 });

    const task = getTask(id);
    if (!task) return new Response(JSON.stringify({ error: 'Task not found' }), { status: 404 });

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/agent/status' });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500 }
    );
  }
};
