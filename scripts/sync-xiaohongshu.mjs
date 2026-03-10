#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const mediaFile = path.join(ROOT, 'src/pages/media.html.astro');
const logDir = path.join(ROOT, 'logs');
const logFile = path.join(logDir, 'sync-xhs.log');

const xhsUrl = 'https://www.xiaohongshu.com/search_result?keyword=openagi_ai';
const today = new Date().toISOString().slice(0, 10);

function probe() {
  try {
    const cmd = `curl -L -A 'Mozilla/5.0' -s -o /dev/null -w '%{http_code}' '${xhsUrl}'`;
    const code = Number(execSync(cmd, { encoding: 'utf8' }).trim());
    return code >= 200 && code < 400;
  } catch {
    return false;
  }
}

async function main() {
  const ok = probe();
  const followers = ok ? '同步中' : '待检查';
  const d7 = ok ? '同步中' : '待检查';
  const d30 = ok ? '同步中' : '待检查';

  const src = await fs.readFile(mediaFile, 'utf8');
  const rowRe = /\{ platform: '小红书',[\s\S]*?updatedAt: '[^']*' \},/;
  const row = `{ platform: '小红书', account: 'openagi_ai', url: '${xhsUrl}', followers: '${followers}', delta7d: '${d7}', delta30d: '${d30}', updatedAt: '${today}' },`;

  const next = src.replace(rowRe, row);
  if (next !== src) {
    await fs.writeFile(mediaFile, next, 'utf8');
  }

  await fs.mkdir(logDir, { recursive: true });
  const stamp = new Date().toISOString();
  await fs.appendFile(logFile, `${stamp} ok=${ok} updatedAt=${today}\n`, 'utf8');

  console.log(`sync-xiaohongshu done: ok=${ok}, updatedAt=${today}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
