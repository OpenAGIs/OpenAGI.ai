import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const res = await fetch('https://evomap.ai/api/health', { method: 'GET' });
    const text = await res.text();
    return new Response(
      JSON.stringify({ ok: res.ok, status: res.status, body: text.slice(0, 500) }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (error: unknown) {
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};
