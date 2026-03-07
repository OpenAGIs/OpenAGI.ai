export type ConceptTopic = {
  id: string;
  title: string;
  summary: string;
  anchors?: string[];
  links?: { label: string; href: string }[];
  tags?: string[];
};

export type ConceptSeries = {
  id: string;
  title: string;
  description: string;
  layer: 'Foundation' | 'Runtime' | 'Ecosystem';
  topics: ConceptTopic[];
};

export const conceptSeries: ConceptSeries[] = [
  {
    id: 'agent-stack',
    title: 'AgentStack Fundamentals',
    description: 'Core concepts for building reliable agents that plan, remember, and act across tools.',
    layer: 'Foundation',
    topics: [
      {
        id: 'architecture',
        title: 'Reference Architecture',
        summary: 'Event-driven spine with policy, memory, reasoning, and actuator layers. Emphasizes deterministic handoff between planner and executors.',
        anchors: ['data-plane', 'control-plane', 'safety'],
        links: [
          { label: 'Architecture RFC', href: 'https://docs.openagi.ai/start/architecture' },
          { label: 'Design Notes', href: 'https://docs.openagi.ai/start/agent-stack' },
        ],
        tags: ['spec', 'rfc', 'blueprint'],
      },
      {
        id: 'memory',
        title: 'Memory & Context',
        summary: 'Short/long-term memory strategy with vector recall, conversation stitching, and retrieval-time feedback.',
        anchors: ['episodic', 'semantic', 'context-window'],
        links: [
          { label: 'Memory Playbook', href: 'https://docs.openagi.ai/start/memory' },
          { label: 'Vector Store API', href: 'https://docs.openagi.ai/start/storage' },
        ],
        tags: ['memory', 'retrieval', 'context'],
      },
      {
        id: 'evaluation',
        title: 'Agent Evaluation',
        summary: 'Red team scripts, replay harness, and offline scoring with task suites to avoid regression.',
        anchors: ['replays', 'metrics', 'bench'],
        links: [
          { label: 'Eval Harness', href: 'https://docs.openagi.ai/start/eval' },
        ],
        tags: ['quality', 'eval', 'replay'],
      },
    ],
  },
  {
    id: 'runtime',
    title: 'Runtime & Protocol',
    description: 'MCP-driven runtime primitives for tools, transport, and multi-agent orchestration.',
    layer: 'Runtime',
    topics: [
      {
        id: 'mcp',
        title: 'Model Context Protocol',
        summary: 'Contracts for tools, prompts, and resources. Covers discovery, auth, and streaming envelopes.',
        anchors: ['server', 'client', 'broker'],
        links: [
          { label: 'MCP Docs', href: 'https://modelcontextprotocol.io/' },
          { label: 'OpenAGI MCP Server', href: 'https://docs.openagi.ai/start/mcp-server' },
        ],
        tags: ['protocol', 'tools', 'interop'],
      },
      {
        id: 'runtime-loop',
        title: 'Runtime Loop',
        summary: 'Planner/reactor loop with guardrails, detachable skills, and circuit-breaker semantics.',
        anchors: ['planner', 'executor', 'guardrails'],
        links: [
          { label: 'Runtime Guide', href: 'https://docs.openagi.ai/start/runtime' },
        ],
        tags: ['runtime', 'control', 'guardrails'],
      },
      {
        id: 'observability',
        title: 'Observability',
        summary: 'Tracing, structured events, and run metadata for reproducibility and auditability.',
        anchors: ['telemetry', 'spans', 'replay'],
        links: [
          { label: 'Tracing', href: 'https://docs.openagi.ai/start/observability' },
        ],
        tags: ['telemetry', 'ops', 'debug'],
      },
    ],
  },
  {
    id: 'ecosystem',
    title: 'Ecosystem & Integrations',
    description: 'Community modules, governance, and deployment playbooks across clouds and edge.',
    layer: 'Ecosystem',
    topics: [
      {
        id: 'skills',
        title: 'Skill & Tooling Catalog',
        summary: 'Curated MCP tools, agent skills, and verified connectors with safety badges.',
        anchors: ['catalog', 'security', 'certification'],
        links: [
          { label: 'Skill Directory', href: 'https://clawhub.com' },
        ],
        tags: ['catalog', 'tooling', 'marketplace'],
      },
      {
        id: 'deploy',
        title: 'Deployment Guides',
        summary: 'Recipes for self-hosting, Vercel preview flows, and hybrid on-prem setups.',
        anchors: ['vercel', 'self-host', 'infra'],
        links: [
          { label: 'Deploy Playbook', href: 'https://docs.openagi.ai/start/deploy' },
        ],
        tags: ['ops', 'deploy', 'playbook'],
      },
      {
        id: 'community',
        title: 'Community Patterns',
        summary: 'Governance, RFC workflow, and alumni network with pairing and office hours.',
        anchors: ['rfc', 'governance', 'alumni'],
        links: [
          { label: 'Community RFCs', href: 'https://docs.openagi.ai/start/community' },
        ],
        tags: ['community', 'rfc', 'people'],
      },
    ],
  },
];
