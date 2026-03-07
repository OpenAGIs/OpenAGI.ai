import type { APIRoute } from 'astro';

const xmlEscape = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() ?? 'https://openagi.ai';
  const loc = new URL('/sitemap.xml', base).toString();
  const now = new Date().toISOString();

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap>\n` +
    `    <loc>${xmlEscape(loc)}</loc>\n` +
    `    <lastmod>${now}</lastmod>\n` +
    `  </sitemap>\n` +
    `</sitemapindex>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600'
    }
  });
};

