import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString() ?? 'https://openagi.ai';

  const staticPaths = ['/', '/integrations', '/shoutouts', '/showcase', '/blog'];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const postPaths = posts.map((p) => `/blog/${p.slug}`);

  const allPaths = [...staticPaths, ...postPaths];

  const now = new Date().toISOString();
  const urls = allPaths
    .map((path) => {
      const loc = new URL(path, base).toString();
      return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`;
    })
    .join('\n');

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};

