export type Resource = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  owner: string;
  logo?: string;
};

export const resources: Resource[] = [
  {
    id: 'openagi-runtime',
    name: 'OpenAGI Runtime',
    description: 'Reference runtime with MCP-first planner, replay harness, and skill sandboxing.',
    tags: ['Framework', 'Runtime', 'MCP'],
    link: 'https://github.com/openclaw/openclaw',
    owner: 'Core Team',
    logo: '/resources/openagi-runtime.svg',
  },
  {
    id: 'agentstack-starter',
    name: 'AgentStack Starter',
    description: 'Batteries-included template for shipping an AI agent with observability and evals.',
    tags: ['Starter', 'Agentic Workflow'],
    link: 'https://github.com/openclaw/agentstack-starter',
    owner: 'Community',
    logo: '/resources/agentstack-starter.svg',
  },
  {
    id: 'mcp-registry',
    name: 'MCP Tool Registry',
    description: 'Curated, security-reviewed MCP servers and tools, with compatibility notes.',
    tags: ['MCP', 'Catalog', 'Tools'],
    link: 'https://clawhub.com',
    owner: 'AI Alumni',
    logo: '/resources/mcp-registry.svg',
  },
  {
    id: 'eval-kit',
    name: 'Agent Eval Kit',
    description: 'Replay suite and prompts for benchmarking goal-seeking behavior across LLMs.',
    tags: ['Evaluation', 'Testing'],
    link: 'https://docs.openagi.ai/start/eval',
    owner: 'Research',
    logo: '/resources/eval-kit.svg',
  },
  {
    id: 'obs-stack',
    name: 'Observability Stack',
    description: 'OpenTelemetry traces + span events for agent runs; ready-made dashboards.',
    tags: ['Observability', 'Runtime'],
    link: 'https://docs.openagi.ai/start/observability',
    owner: 'Core Team',
    logo: '/resources/observability.svg',
  },
  {
    id: 'alumni-club',
    name: 'AI Alumni Club',
    description: 'Peer network of founders, ops, and builders; monthly demos and pairing.',
    tags: ['Community', 'People'],
    link: 'https://t.me/openagi',
    owner: 'Community',
    logo: '/resources/alumni-club.svg',
  },
  {
    id: 'infra-recipes',
    name: 'Infra Recipes',
    description: 'Terraform and Helm snippets for self-hosting the runtime with GPU pools.',
    tags: ['DevOps', 'Deploy'],
    link: 'https://docs.openagi.ai/start/deploy',
    owner: 'Contributors',
    logo: '/resources/infra-recipes.svg',
  },
  {
    id: 'research-digest',
    name: 'Research Digest',
    description: 'Weekly curated papers and agent techniques; focuses on practical adoption.',
    tags: ['Research', 'Newsletter'],
    link: 'https://openagi.ai/blog',
    owner: 'Research Guild',
    logo: '/resources/research-digest.svg',
  },
];
