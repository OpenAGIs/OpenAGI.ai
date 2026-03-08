import { createElement } from 'react';
import { getEmailCopy } from '../../src/i18n-emails';
import { OtpEmail } from '../../src/emails/OtpEmail';
import { sendEmail } from '../../src/services/email';

function getLocale(req: any): string | undefined {
  if (typeof req.body?.locale === 'string') return req.body.locale;
  if (typeof req.body?.lang === 'string') return req.body.lang;
  return undefined;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const email = typeof req.body?.email === 'string' ? req.body.email : null;
  const code = typeof req.body?.code === 'string' ? req.body.code : null;
  const expiresInMinutes =
    typeof req.body?.expiresInMinutes === 'number' ? req.body.expiresInMinutes : undefined;
  const locale = getLocale(req);

  if (!email || !code) return res.status(400).json({ ok: false, error: 'missing_email_or_code' });

  const result = await sendEmail({
    to: email,
    subject: getEmailCopy(locale).otp.subject,
    react: createElement(OtpEmail, { code, expiresInMinutes, locale }),
    tags: [{ name: 'type', value: 'otp' }]
  });

  return res.status(result.ok ? 200 : 500).json(result);
}
