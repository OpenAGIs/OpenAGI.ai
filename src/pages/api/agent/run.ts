import crypto from 'node:crypto';
import type { APIRoute } from 'astro';

import { runModel } from '../../../services/ai/client';
import { McpClient } from '../../../services/ai/mcp';
import { captureException } from '../../../server/extensions/sentry';
import { upsertTask, type AgentTaskRecord } from '../../../server/agent/tasks-store';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    if (!prompt) return new Response(JSON.stringify({ error: 'Missing prompt' }), { status: 400 });

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

    upsertTask(task);

    void (async () => {
      task.status = 'running';
      task.updatedAt = new Date().toISOString();
      upsertTask(task);

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
        upsertTask(task);
      } catch (error: unknown) {
        task.status = 'failed';
        task.updatedAt = new Date().toISOString();
        task.error = error instanceof Error ? error.message : String(error);
        upsertTask(task);
        await captureException(error, { route: '/api/agent/run', taskId });
      }
    })();

    return new Response(JSON.stringify({ taskId, status: task.status }), { status: 202 });
  } catch (error: unknown) {
    await captureException(error, { route: '/api/agent/run' });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal error' }),
      { status: 500 }
    );
  }
};
