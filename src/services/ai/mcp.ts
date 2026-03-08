import crypto from 'node:crypto';

export type McpServerConfig = {
  url: string;
  token?: string;
  timeoutMs?: number;
};

export type McpCallInput = {
  toolName: string;
  arguments?: Record<string, unknown>;
};

export class McpClient {
  private config: McpServerConfig;

  constructor(config: McpServerConfig) {
    this.config = config;
  }

  async callTool(input: McpCallInput): Promise<unknown> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 15000);

    try {
      const res = await fetch(this.config.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(this.config.token ? { authorization: `Bearer ${this.config.token}` } : {})
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: crypto.randomUUID(),
          method: 'tools/call',
          params: {
            name: input.toolName,
            arguments: input.arguments || {}
          }
        }),
        signal: controller.signal
      });

      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(`MCP request failed (${res.status})`);
      if ((payload as any).error) throw new Error((payload as any).error.message || 'MCP error');

      return (payload as any).result;
    } finally {
      clearTimeout(timeout);
    }
  }
}
