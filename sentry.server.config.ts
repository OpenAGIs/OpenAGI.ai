import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? process.env.PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1
});
