import crypto from 'node:crypto';

type AiProvider = 'openai' | 'anthropic';

type AiRunInput = {
  provider?: AiProvider;
  model?: string;
  system?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
};

function inferProvider(model: string): AiProvider {
  if (model.startsWith('claude')) return 'anthropic';
  return 'openai';
}

function getDefaultModel(provider: AiProvider): string {
  return provider === 'anthropic' ? 'claude-3-5-sonnet-latest' : 'gpt-4o-mini';
}

function getApiKey(provider: AiProvider): string {
  const key = provider === 'anthropic' ? process.env.ANTHROPIC_API_KEY : process.env.OPENAI_API_KEY;
  if (!key) throw new Error(`Missing API key for provider: ${provider}`);
  return key;
}

async function runModel(input: AiRunInput): Promise<{ provider: AiProvider; model: string; text: string }> {
  const inferredModel = input.model || '';
  const provider = input.provider || (inferredModel ? inferProvider(inferredModel) : 'openai');

  if (provider === 'anthropic') {
    const model = input.model || getDefaultModel('anthropic');
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': getApiKey('anthropic'),
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: input.temperature ?? 0.2,
        max_tokens: input.maxTokens ?? 1024,
        system: input.system,
        messages: [{ role: 'user', content: input.prompt }]
      })
    });

    const json = await res.json().catch(() => ({} as any));
    if (!res.ok) throw new Error(json?.error?.message || `Anthropic request failed (${res.status})`);
    const text = json?.content?.find((item: any) => item?.type === 'text')?.text;
    if (!text || typeof text !== 'string') throw new Error('Anthropic response missing text content');
    return { provider: 'anthropic', model, text };
  }

  const model = input.model || getDefaultModel('openai');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${getApiKey('openai')}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      temperature: input.temperature ?? 0.2,
      max_tokens: input.maxTokens ?? 1024,
      messages: [
        ...(input.system ? [{ role: 'system', content: input.system }] : []),
        { role: 'user', content: input.prompt }
      ]
    })
  });

  const json = await res.json().catch(() => ({} as any));
  if (!res.ok) throw new Error(json?.error?.message || `OpenAI request failed (${res.status})`);
  const text = json?.choices?.[0]?.message?.content;
  if (!text || typeof text !== 'string') throw new Error('OpenAI response missing text content');
  return { provider: 'openai', model, text };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const taskId = crypto.randomUUID();

    // Best-effort async execution; endpoint contract returns queued metadata.
    void runModel({
      provider: body.provider,
      model: body.model,
      system: body.system,
      prompt,
      temperature: body.temperature,
      maxTokens: body.maxTokens
    }).catch(() => undefined);

    return res.status(202).json({ taskId, status: 'running' });
  } catch (error: unknown) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
