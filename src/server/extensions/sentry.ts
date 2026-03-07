import crypto from 'node:crypto';

type CaptureContext = Record<string, unknown>;

function parseSentryDsn(dsn: string): { endpoint: string; dsn: string } | null {
  try {
    const url = new URL(dsn);
    const projectId = url.pathname.replace(/^\/+/, '');
    if (!projectId) return null;
    const endpoint = `${url.protocol}//${url.host}/api/${projectId}/envelope/`;
    return { endpoint, dsn };
  } catch {
    return null;
  }
}

function normalizeError(error: unknown): { type: string; message: string; stacktrace?: string } {
  if (error instanceof Error) {
    return {
      type: error.name || 'Error',
      message: error.message || 'Unknown error',
      stacktrace: error.stack
    };
  }

  return {
    type: 'Error',
    message: typeof error === 'string' ? error : JSON.stringify(error)
  };
}

export async function captureException(error: unknown, context: CaptureContext = {}): Promise<boolean> {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return false;

  const parsed = parseSentryDsn(dsn);
  if (!parsed) return false;

  const normalized = normalizeError(error);
  const eventId = crypto.randomUUID().replace(/-/g, '');
  const payload = {
    event_id: eventId,
    platform: 'javascript',
    level: 'error',
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
    release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA,
    tags: {
      runtime: 'astro-api'
    },
    extra: context,
    exception: {
      values: [
        {
          type: normalized.type,
          value: normalized.message,
          stacktrace: normalized.stacktrace
            ? {
                frames: normalized.stacktrace.split('\n').map((line) => ({ filename: line.trim() }))
              }
            : undefined
        }
      ]
    }
  };

  const envelope =
    `${JSON.stringify({ dsn: parsed.dsn, sent_at: new Date().toISOString() })}\n` +
    `${JSON.stringify({ type: 'event' })}\n` +
    `${JSON.stringify(payload)}`;

  try {
    const res = await fetch(parsed.endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-sentry-envelope' },
      body: envelope
    });
    return res.ok;
  } catch {
    return false;
  }
}
