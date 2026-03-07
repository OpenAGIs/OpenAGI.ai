import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sentry from '@sentry/astro';

const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

const sourceMapsUploadOptions =
  sentryOrg && sentryProject && sentryAuthToken
    ? {
        org: sentryOrg,
        project: sentryProject,
        authToken: sentryAuthToken
      }
    : undefined;

export default defineConfig({
  site: 'https://clawd.bot',
  output: 'server',
  adapter: vercel(),
  integrations: [
    sentry({
      sourceMapsUploadOptions
    })
  ],
  build: {
    assets: 'assets'
  }
});
