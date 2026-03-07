export type AgentTaskStatus = 'queued' | 'running' | 'completed' | 'failed';

export type AgentTaskRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: AgentTaskStatus;
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

const globalKey = '__OPENAGI_AGENT_TASKS__';
type TaskStore = Map<string, AgentTaskRecord>;

function getStore(): TaskStore {
  const g = globalThis as unknown as Record<string, unknown>;
  if (!g[globalKey]) g[globalKey] = new Map<string, AgentTaskRecord>();
  return g[globalKey] as TaskStore;
}

export function upsertTask(task: AgentTaskRecord): AgentTaskRecord {
  const store = getStore();
  store.set(task.id, task);
  return task;
}

export function getTask(id: string): AgentTaskRecord | undefined {
  return getStore().get(id);
}
