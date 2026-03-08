import crypto from 'node:crypto';

import { runModel } from '../../src/services/ai/client';
import { McpClient } from '../../src/services/ai/mcp';
import { captureException } from '../../src/server/extensions/sentry';

type AgentTaskRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  input: {
    provider?: 'openai' | 'anthropic';
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

const taskKey = '__OPENAGI_AGENT_TASKS__';

function getStore(): Map<string, AgentTaskRecord> {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[taskKey]) g[taskKey] = new Map<string, AgentTaskRecord>();
  return g[taskKey] as Map<string, AgentTaskRecord>;
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
        let mcpContext: unknown;
        if (body.mcpServerUrl && body.mcpToolName) {
          const mcp = new McpClient({
            url: String(body.mcpServerUrl),
            token: typeof body.mcpToken === 'string' ? body.mcpToken : undefined,
            timeoutMs: 15000
          });

          mcpContext = await mcp.callTool({
            toolName: String(body.mcpToolName),
            arguments: typeof body.mcpArgs === 'object' && body.mcpArgs ? body.mcpArgs : {}
          });
        }

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
        await captureException(error, { route: '/api/agent/run', taskId });
      }
    })();

    return res.status(202).json({ taskId, status: task.status });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/agent/run' });
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Internal error' });
  }
}
