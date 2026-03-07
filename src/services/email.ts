import type { ReactElement } from 'react';
import { Resend } from 'resend';

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  react?: ReactElement;
  html?: string;
  text?: string;
  replyTo?: string | string[];
  tags?: Array<{ name: string; value: string }>;
};

type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; error: string; details?: unknown };

function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process?.env?.[key]) return process.env[key];
  const metaEnv = (import.meta as any)?.env as Record<string, string | undefined> | undefined;
  return metaEnv?.[key];
}

function getFromAddress(): string | null {
  const fromAddress = getEnv('EMAIL_FROM_ADDRESS');
  const fromName = getEnv('EMAIL_FROM_NAME') ?? 'OpenAGI';
  if (!fromAddress) return null;
  return `${fromName} <${fromAddress}>`;
}

export async function sendEmail(args: SendEmailArgs): Promise<SendEmailResult> {
  const apiKey = getEnv('RESEND_API_KEY');
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY missing; email not sent', {
      to: args.to,
      subject: args.subject
    });
    return { ok: false, error: 'missing_resend_api_key' };
  }

  const from = getFromAddress();
  if (!from) {
    console.warn('[email] EMAIL_FROM_ADDRESS missing; email not sent', {
      to: args.to,
      subject: args.subject
    });
    return { ok: false, error: 'missing_from_address' };
  }

  if (!args.react && !args.html && !args.text) {
    return { ok: false, error: 'missing_content' };
  }

  const to = Array.isArray(args.to) ? args.to : [args.to];

  try {
    const resend = new Resend(apiKey);
    const data = await resend.emails.send({
      from,
      to,
      subject: args.subject,
      react: args.react,
      html: args.html,
      text: args.text,
      replyTo: args.replyTo,
      tags: args.tags
    });

    if (data.error) {
      return { ok: false, error: 'send_failed', details: data.error };
    }

    if (!data.data?.id) {
      return { ok: false, error: 'send_failed', details: data };
    }

    return { ok: true, id: data.data.id };
  } catch (error) {
    console.error('[email] send failed', { error, to, subject: args.subject });
    return { ok: false, error: 'send_failed', details: error };
  }
}
