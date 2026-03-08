import { createElement } from 'react';
import { ReceiptEmail } from '../../src/emails/ReceiptEmail';
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
  const amount = typeof req.body?.amount === 'string' ? req.body.amount : null;
  const currency = typeof req.body?.currency === 'string' ? req.body.currency : undefined;
  const receiptUrl = typeof req.body?.receiptUrl === 'string' ? req.body.receiptUrl : undefined;
  const locale = getLocale(req);

  if (!email || !amount) return res.status(400).json({ ok: false, error: 'missing_email_or_amount' });

  const result = await sendEmail({
    to: email,
    subject: getEmailCopy(locale).receipt.subject,
    react: createElement(ReceiptEmail, { amount, currency, receiptUrl, locale }),
    tags: [{ name: 'type', value: 'receipt' }]
  });

  return res.status(result.ok ? 200 : 500).json(result);
}
