import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import sentry from '@sentry/astro';

const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;
const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;

const sentrySourceMapsUploadOptions =
  sentryAuthToken && sentryOrg && sentryProject
    ? {
        authToken: sentryAuthToken,
        org: sentryOrg,
        project: sentryProject
      }
    : {
        enabled: false
      };

export default defineConfig({
  site: 'https://openagi.ai',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sitemap(),
    sentry({
      sourceMapsUploadOptions: sentrySourceMapsUploadOptions
    })
  ],
  build: {
    assets: 'assets'
  }
});
