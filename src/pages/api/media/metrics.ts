import type { APIRoute } from 'astro';

import { collectLiveMetrics } from '../../../server/media/providers';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const metrics = await collectLiveMetrics();
    return new Response(
      JSON.stringify({ ok: true, metrics, generatedAt: new Date().toISOString() }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};
