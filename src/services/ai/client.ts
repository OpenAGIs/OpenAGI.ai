export type AiProvider = 'openai' | 'anthropic';

export type AiRunInput = {
  provider?: AiProvider;
  model?: string;
  system?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
};

export type AiRunOutput = {
  provider: AiProvider;
  model: string;
  text: string;
  raw: unknown;
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

async function runOpenAI(input: Required<Pick<AiRunInput, 'prompt'>> & AiRunInput): Promise<AiRunOutput> {
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

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (json as any)?.error?.message || `OpenAI request failed (${res.status})`;
    throw new Error(message);
  }

  const text = (json as any)?.choices?.[0]?.message?.content;
  if (!text || typeof text !== 'string') throw new Error('OpenAI response missing text content');

  return { provider: 'openai', model, text, raw: json };
}

async function runAnthropic(input: Required<Pick<AiRunInput, 'prompt'>> & AiRunInput): Promise<AiRunOutput> {
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

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = (json as any)?.error?.message || `Anthropic request failed (${res.status})`;
    throw new Error(message);
  }

  const text = (json as any)?.content?.find((item: any) => item?.type === 'text')?.text;
  if (!text || typeof text !== 'string') throw new Error('Anthropic response missing text content');

  return { provider: 'anthropic', model, text, raw: json };
}

export async function runModel(input: AiRunInput): Promise<AiRunOutput> {
  if (!input.prompt || !input.prompt.trim()) throw new Error('Prompt is required');

  const inferredModel = input.model || '';
  const provider = input.provider || (inferredModel ? inferProvider(inferredModel) : 'openai');

  if (provider === 'anthropic') return runAnthropic(input);
  return runOpenAI(input);
}
