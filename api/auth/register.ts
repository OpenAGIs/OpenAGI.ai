import { createElement } from 'react';
import { getEmailCopy } from '../../src/i18n-emails';
import { sendEmail } from '../../src/services/email';
import { WelcomeEmail } from '../../src/emails/WelcomeEmail';

function getLocale(req: any): string | undefined {
  if (typeof req.body?.locale === 'string') return req.body.locale;
  if (typeof req.body?.lang === 'string') return req.body.lang;
  return undefined;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const email = typeof req.body?.email === 'string' ? req.body.email : null;
  const name = typeof req.body?.name === 'string' ? req.body.name : undefined;
  const locale = getLocale(req);

  if (!email) return res.status(400).json({ ok: false, error: 'missing_email' });

  const result = await sendEmail({
    to: email,
    subject: getEmailCopy(locale).welcome.subject,
    react: createElement(WelcomeEmail, { name, locale }),
    tags: [{ name: 'type', value: 'welcome' }]
  });

  return res.status(result.ok ? 200 : 500).json(result);
}
