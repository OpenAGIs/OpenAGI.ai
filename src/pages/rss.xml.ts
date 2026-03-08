import { getCollection } from 'astro:content';

const SITE_URL = 'https://openagi.ai';

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export async function GET() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = sorted
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}/`;
      return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${link}</link>
        <guid>${link}</guid>
        <description>${escapeXml(post.data.description)}</description>
        <pubDate>${post.data.date.toUTCString()}</pubDate>
      </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>OpenAGI Updates</title>
      <link>${SITE_URL}</link>
      <description>AgentStack releases, MCP updates, and community news.</description>
      ${items}
    </channel>
  </rss>`;

  return new Response(xml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
