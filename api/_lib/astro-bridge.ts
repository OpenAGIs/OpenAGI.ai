type NodeRequest = {
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  method?: string;
  url?: string;
  [Symbol.asyncIterator]?: () => AsyncIterableIterator<Buffer>;
};

type NodeResponse = {
  end: (chunk?: string | Buffer) => void;
  setHeader: (name: string, value: string) => void;
  statusCode: number;
};

function getBaseUrl(req: NodeRequest): string {
  const protoHeader = req.headers['x-forwarded-proto'];
  const hostHeader = req.headers['x-forwarded-host'] ?? req.headers.host;
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader;
  return `${proto || 'https'}://${host || 'openagi.ai'}`;
}

export function toRequestUrl(req: NodeRequest): URL {
  return new URL(req.url || '/', getBaseUrl(req));
}

async function readStreamBody(req: NodeRequest): Promise<Buffer> {
  if (!req[Symbol.asyncIterator]) return Buffer.from('');

  const chunks: Buffer[] = [];
  for await (const chunk of req as AsyncIterable<Buffer>) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function normalizeBody(body: unknown): BodyInit | undefined {
  if (body == null) return undefined;
  if (typeof body === 'string') return body;
  if (body instanceof Buffer) return body;
  return JSON.stringify(body);
}

export async function toWebRequest(
  req: NodeRequest,
  options: { rawBody?: boolean } = {}
): Promise<Request> {
  const url = toRequestUrl(req).toString();
  const method = req.method || 'GET';
  const headers = new Headers();

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'undefined') continue;
    if (Array.isArray(value)) {
      for (const item of value) headers.append(key, item);
    } else {
      headers.set(key, value);
    }
  }

  if (options.rawBody) {
    const raw = await readStreamBody(req);
    return new Request(url, { method, headers, body: raw.length > 0 ? raw : undefined });
  }

  const body = normalizeBody(req.body);
  return new Request(url, { method, headers, body });
}

export async function sendWebResponse(res: NodeResponse, response: Response): Promise<void> {
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));

  if (!response.body) {
    res.end();
    return;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
