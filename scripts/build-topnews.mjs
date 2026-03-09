#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const digestPath = path.join(ROOT, 'src/data/ai-digest.json');
const outPath = path.join(ROOT, 'src/data/topnews.json');

const now = new Date();
const iso = (minsAgo = 0) => new Date(now.getTime() - minsAgo * 60 * 1000).toISOString();

const digest = JSON.parse(await fs.readFile(digestPath, 'utf8'));

const paperItems = (digest.papers || []).slice(0, 8).map((p, i) => ({
  category: '论文',
  date: p.published || iso(i + 1),
  source: p.source || 'arXiv',
  title: p.title,
  link: p.link,
  summary: p.summary
}));

const others = [
  { category: '模型', source: 'Hugging Face', title: 'Trending Models Snapshot', link: 'https://huggingface.co/models?sort=trending', summary: '模型趋势聚合（公开源）。', date: iso(3) },
  { category: '模型', source: 'OpenRouter', title: 'Top LLM Usage Models', link: 'https://openrouter.ai/rankings', summary: '模型调用热度排行。', date: iso(16) },

  { category: '榜单', source: 'Papers with Code', title: 'Leaderboards Daily Changes', link: 'https://paperswithcode.com/sota', summary: 'SOTA 榜单更新追踪。', date: iso(6) },
  { category: '榜单', source: 'Hugging Face Open LLM Leaderboard', title: 'Open LLM Leaderboard Snapshot', link: 'https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard', summary: '开源 LLM 榜单更新。', date: iso(22) },

  { category: '开源项目', source: 'GitHub Trending', title: 'AI Open Source Trending', link: 'https://github.com/trending', summary: 'AI 开源项目趋势。', date: iso(9) },
  { category: '开源项目', source: 'GitHub', title: 'OpenAGIs Ecosystem Repos', link: 'https://github.com/OpenAGIs', summary: 'OpenAGIs 生态项目聚合。', date: iso(27) },

  { category: '社区', source: 'Hacker News', title: 'Top Community Discussions', link: 'https://news.ycombinator.com/', summary: '社区高热讨论摘要。', date: iso(12) },
  { category: '社区', source: 'Substack', title: 'AI Substack Posts Watchlist', link: 'https://substack.com/search/ai', summary: 'Substack AI 订阅写作更新。', date: iso(30) },

  { category: 'KOL', source: 'X', title: 'KOL Watchlist Updates', link: 'https://x.com/search?q=AI&f=live', summary: 'KOL 观点动态聚合。', date: iso(15) },
  { category: 'KOL', source: 'X', title: 'Top AI Creators Thread Digest', link: 'https://x.com/i/lists', summary: 'KOL 线程与观点追踪。', date: iso(35) }
];

const all = [...paperItems, ...others].sort((a, b) => new Date(b.date) - new Date(a.date));

const payload = {
  generatedAt: new Date().toISOString(),
  refreshPolicy: '10min',
  sources: ['arXiv', 'Hugging Face', 'Papers with Code', 'GitHub Trending', 'Hacker News', 'Substack', 'X (Twitter)'],
  items: all
};

await fs.writeFile(outPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Wrote ${all.length} items -> ${outPath}`);
