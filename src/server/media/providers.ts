export type MediaMetric = {
  platform: string;
  account: string;
  followers: number | null;
  source: 'live_api' | 'fallback';
  updatedAt: string;
  note?: string;
};

async function fetchGithubFollowers(account: string): Promise<MediaMetric> {
  const username = account.replace(/^@/, '').trim();
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: { 'user-agent': 'openagi-media-dashboard' }
  });

  if (!res.ok) {
    return {
      platform: 'GitHub',
      account,
      followers: null,
      source: 'fallback',
      updatedAt: new Date().toISOString(),
      note: `GitHub API ${res.status}`
    };
  }

  const data = (await res.json()) as { followers?: number };
  return {
    platform: 'GitHub',
    account,
    followers: typeof data.followers === 'number' ? data.followers : null,
    source: 'live_api',
    updatedAt: new Date().toISOString()
  };
}

async function fetchNpmDownloads(pkg: string): Promise<MediaMetric> {
  const res = await fetch(`https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(pkg)}`);
  if (!res.ok) {
    return {
      platform: 'NPM',
      account: pkg,
      followers: null,
      source: 'fallback',
      updatedAt: new Date().toISOString(),
      note: `NPM API ${res.status}`
    };
  }
  const data = (await res.json()) as { downloads?: number };
  return {
    platform: 'NPM',
    account: pkg,
    followers: typeof data.downloads === 'number' ? data.downloads : null,
    source: 'live_api',
    updatedAt: new Date().toISOString(),
    note: 'followers 字段复用为近7天下载量（技术影响力代理指标）'
  };
}

export async function collectLiveMetrics(): Promise<MediaMetric[]> {
  const [github, npmOpenclaw] = await Promise.all([
    fetchGithubFollowers('OpenAGIs'),
    fetchNpmDownloads('openclaw')
  ]);

  return [github, npmOpenclaw];
}
