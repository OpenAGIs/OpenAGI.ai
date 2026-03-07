export function getSiteUrl(): string {
  if (typeof process !== 'undefined' && process?.env?.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL;
  const metaEnv = (import.meta as any)?.env as Record<string, string | undefined> | undefined;
  return metaEnv?.PUBLIC_SITE_URL ?? 'https://openagi.ai';
}

export function stripTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}
