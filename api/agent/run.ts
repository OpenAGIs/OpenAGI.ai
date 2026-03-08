import crypto from 'node:crypto';

type AiProvider = 'openai' | 'anthropic';

type AgentTaskRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  input: {
    provider?: AiProvider;
    model?: string;
    prompt: string;
    mcpServerUrl?: string;
    mcpToolName?: string;
  };
  output?: {
    text: string;
    provider: string;
    model: string;
    mcpContext?: unknown;
  };
  error?: string;
};

type AiRunInput = {
  provider?: AiProvider;
  model?: string;
  system?: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
};

const taskKey = '__OPENAGI_AGENT_TASKS__';

function getStore(): Map<string, AgentTaskRecord> {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[taskKey]) g[taskKey] = new Map<string, AgentTaskRecord>();
  return g[taskKey] as Map<string, AgentTaskRecord>;
}

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

async function callMcpTool(body: any): Promise<unknown> {
  if (!body.mcpServerUrl || !body.mcpToolName) return undefined;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(String(body.mcpServerUrl), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(typeof body.mcpToken === 'string' ? { authorization: `Bearer ${body.mcpToken}` } : {})
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: crypto.randomUUID(),
        method: 'tools/call',
        params: {
          name: String(body.mcpToolName),
          arguments: typeof body.mcpArgs === 'object' && body.mcpArgs ? body.mcpArgs : {}
        }
      }),
      signal: controller.signal
    });

    const payload = await res.json().catch(() => ({} as any));
    if (!res.ok) throw new Error(`MCP request failed (${res.status})`);
    if (payload?.error) throw new Error(payload.error.message || 'MCP error');
    return payload?.result;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const taskId = crypto.randomUUID();
    const now = new Date().toISOString();
    const task: AgentTaskRecord = {
      id: taskId,
      createdAt: now,
      updatedAt: now,
      status: 'queued',
      input: {
        provider: body.provider,
        model: body.model,
        prompt,
        mcpServerUrl: body.mcpServerUrl,
        mcpToolName: body.mcpToolName
      }
    };

    getStore().set(task.id, task);

    void (async () => {
      task.status = 'running';
      task.updatedAt = new Date().toISOString();
      getStore().set(task.id, task);

      try {
        const mcpContext = await callMcpTool(body);
        const finalPrompt = mcpContext
          ? `${prompt}\n\n[MCP_CONTEXT]\n${JSON.stringify(mcpContext, null, 2)}`
          : prompt;

        const result = await runModel({
          provider: body.provider,
          model: body.model,
          system: body.system,
          prompt: finalPrompt,
          temperature: body.temperature,
          maxTokens: body.maxTokens
        });

        task.status = 'completed';
        task.updatedAt = new Date().toISOString();
        task.output = {
          text: result.text,
          provider: result.provider,
          model: result.model,
          ...(mcpContext ? { mcpContext } : {})
        };
        getStore().set(task.id, task);
      } catch (error: unknown) {
        task.status = 'failed';
        task.updatedAt = new Date().toISOString();
        task.error = error instanceof Error ? error.message : String(error);
        getStore().set(task.id, task);
      }
    })();

    return res.status(202).json({ taskId, status: task.status });
  } catch (error: unknown) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
