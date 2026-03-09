#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'src/data/ai-digest.json');

function pick(str, tag) {
  const m = str.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
}

function xmlDecode(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function fetchArxivByCurl() {
  const query = encodeURIComponent('(cat:cs.AI OR cat:cs.CL OR cat:cs.LG)');
  const url = `https://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=12`;
  const xml = execSync(`curl -sL '${url}'`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];

  return entries.slice(0, 8).map((e) => ({
    source: 'arXiv',
    title: xmlDecode(pick(e, 'title')),
    link: pick(e, 'id'),
    published: pick(e, 'published'),
    summary: xmlDecode(pick(e, 'summary')).slice(0, 220)
  }));
}

async function main() {
  const papers = fetchArxivByCurl();
  const payload = {
    generatedAt: new Date().toISOString(),
    generatedBy: 'scripts/fetch-ai-digest.mjs',
    note: '公开源自动抓取（第一版）：arXiv cs.AI/cs.CL/cs.LG；后续可扩展 Gmail/Substack/X 私有订阅源。',
    papers
  };
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`Wrote ${papers.length} items -> ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
