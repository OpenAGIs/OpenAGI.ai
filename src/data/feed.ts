export type FeedItem = {
  id: string;
  title: string;
  summary: string;
  link: string;
  source: 'GitHub' | 'X' | 'Newsletter';
  date: string;
};

export const fallbackFeedItems: FeedItem[] = [
  {
    id: 'runtime-0.6',
    title: 'Runtime 0.6 ships MCP broker',
    summary: 'Added broker mode for multiplexing MCP servers; includes circuit breaker and audit log.',
    link: 'https://github.com/openclaw/openclaw/releases',
    source: 'GitHub',
    date: '2024-03-08',
  },
  {
    id: 'eval-suite',
    title: 'Agent eval suite now public',
    summary: 'Replay harness with regression charts and prompt snapshots.',
    link: 'https://x.com/openclaw/status/1841000000000000000',
    source: 'X',
    date: '2024-03-02',
  },
  {
    id: 'newsletter-01',
    title: 'AI Alumni Brief — Issue #01',
    summary: 'Deployment stories, MCP tool picks, and a runtime trace teardown.',
    link: 'https://buttondown.email/',
    source: 'Newsletter',
    date: '2024-02-27',
  },
];

const fetchJson = async <T>(url: string, timeoutMs: number): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
};

const truncate = (value: string, max = 140) => {
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 1)}…`;
};

type GitHubRelease = {
  id: number;
  name: string | null;
  tag_name: string;
  body: string | null;
  html_url: string;
  published_at: string | null;
  created_at: string;
};

const getGitHubFeedItems = async (repo: string): Promise<FeedItem[]> => {
  const releases = await fetchJson<GitHubRelease[]>(
    `https://api.github.com/repos/${repo}/releases?per_page=5`,
    1500
  );

  return releases.map((release) => ({
    id: `github-${release.id}`,
    title: release.name?.trim() || release.tag_name,
    summary: truncate(release.body || 'Release published.'),
    link: release.html_url,
    source: 'GitHub',
    date: (release.published_at || release.created_at).slice(0, 10),
  }));
};

type RemoteFeedItem = Omit<FeedItem, 'source'> & { source: FeedItem['source'] };

const getRemoteFeedItems = async (url: string): Promise<FeedItem[]> => {
  const items = await fetchJson<RemoteFeedItem[]>(url, 1500);
  return items
    .filter((item) => item && item.title && item.link && item.source)
    .slice(0, 10)
    .map((item) => ({
      id: item.id || `remote-${item.source}-${item.link}`,
      title: item.title,
      summary: item.summary || '',
      link: item.link,
      source: item.source,
      date: item.date || new Date().toISOString().slice(0, 10),
    }));
};

export const getFeedItems = async (): Promise<FeedItem[]> => {
  const repo = import.meta.env.FEED_GITHUB_REPO as string | undefined;
  const remoteUrl = import.meta.env.FEED_ITEMS_URL as string | undefined;

  const candidates: FeedItem[][] = [];

  if (repo) {
    try {
      candidates.push(await getGitHubFeedItems(repo));
    } catch {
      // fall back silently to static feed
    }
  }

  if (remoteUrl) {
    try {
      candidates.push(await getRemoteFeedItems(remoteUrl));
    } catch {
      // fall back silently to static feed
    }
  }

  candidates.push(fallbackFeedItems);

  const merged: FeedItem[] = [];
  const seen = new Set<string>();
  for (const list of candidates) {
    for (const item of list) {
      const key = item.link;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(item);
    }
  }

  return merged.slice(0, 6);
};
