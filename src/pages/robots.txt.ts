import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const isProd = import.meta.env.PROD;
  const sitemapUrl = site ? new URL('/sitemap-index.xml', site).toString() : '/sitemap-index.xml';

  const body = isProd
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': isProd ? 'public, max-age=3600' : 'no-store'
    }
  });
};

