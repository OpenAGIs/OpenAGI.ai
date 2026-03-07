import { createElement } from 'react';
import { AiTaskCompletedEmail } from '../../src/emails/AiTaskCompletedEmail';
import { getEmailCopy } from '../../src/i18n-emails';
import { sendEmail } from '../../src/services/email';

function getLocale(req: any): string | undefined {
  if (typeof req.body?.locale === 'string') return req.body.locale;
  if (typeof req.body?.lang === 'string') return req.body.lang;
  return undefined;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const email = typeof req.body?.email === 'string' ? req.body.email : null;
  const taskName = typeof req.body?.taskName === 'string' ? req.body.taskName : 'Task';
  const taskUrl = typeof req.body?.taskUrl === 'string' ? req.body.taskUrl : undefined;
  const summary = typeof req.body?.summary === 'string' ? req.body.summary : undefined;
  const locale = getLocale(req);

  if (!email) return res.status(400).json({ ok: false, error: 'missing_email' });

  const result = await sendEmail({
    to: email,
    subject: getEmailCopy(locale).task.subject(taskName),
    react: createElement(AiTaskCompletedEmail, { taskName, taskUrl, summary, locale }),
    tags: [{ name: 'type', value: 'task_completed' }]
  });

  return res.status(result.ok ? 200 : 500).json(result);
}
