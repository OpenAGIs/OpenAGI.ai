/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY?: string;
  readonly EMAIL_FROM_ADDRESS?: string;
  readonly EMAIL_FROM_NAME?: string;
  readonly ADMIN_ALERT_EMAIL_TO?: string;
  readonly PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

