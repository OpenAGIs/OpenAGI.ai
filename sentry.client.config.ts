import * as Sentry from '@sentry/astro';

Sentry.init({
  dsn: import.meta.env.PUBLIC_SENTRY_DSN ?? import.meta.env.SENTRY_DSN,
  tracesSampleRate: 1
});
