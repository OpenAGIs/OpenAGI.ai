import { createElement } from 'react';
import { AdminAlertEmail } from '../../src/emails/AdminAlertEmail';
import { getEmailCopy } from '../../src/i18n-emails';
import { sendEmail } from '../../src/services/email';

function getLocale(req: any): string | undefined {
  if (typeof req.body?.locale === 'string') return req.body.locale;
  if (typeof req.body?.lang === 'string') return req.body.lang;
  return undefined;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const adminTo = process.env.ADMIN_ALERT_EMAIL_TO;
  if (!adminTo) return res.status(501).json({ ok: false, error: 'missing_admin_to' });

  const subject = typeof req.body?.subject === 'string' ? req.body.subject : null;
  const message = typeof req.body?.message === 'string' ? req.body.message : null;
  const locale = getLocale(req);

  if (!subject || !message) return res.status(400).json({ ok: false, error: 'missing_subject_or_message' });

  const prefix = getEmailCopy(locale).alert.subjectPrefix;
  const result = await sendEmail({
    to: adminTo,
    subject: `${prefix} ${subject}`,
    react: createElement(AdminAlertEmail, { subject, message, locale }),
    tags: [{ name: 'type', value: 'admin_alert' }]
  });

  return res.status(result.ok ? 200 : 500).json(result);
}
