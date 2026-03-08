import { renderAiTaskCompletedEmail } from '../../src/emails/AiTaskCompletedEmail';
import { renderAdminAlertEmail } from '../../src/emails/AdminAlertEmail';
import { renderOtpEmail } from '../../src/emails/OtpEmail';
import { renderReceiptEmail } from '../../src/emails/ReceiptEmail';
import { renderWelcomeEmail } from '../../src/emails/WelcomeEmail';

export default async function handler(req: any, res: any) {
  if (process.env.NODE_ENV === 'production') return res.status(404).send('Not found');
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const template = typeof req.query?.t === 'string' ? req.query.t : 'welcome';
  const locale = typeof req.query?.locale === 'string' ? req.query.locale : undefined;
  let html: string;

  switch (template) {
    case 'welcome':
      html = await renderWelcomeEmail({
        name: typeof req.query?.name === 'string' ? req.query.name : undefined,
        locale
      });
      break;
    case 'otp':
      html = await renderOtpEmail({
        code: typeof req.query?.code === 'string' ? req.query.code : '123456',
        locale
      });
      break;
    case 'task-completed':
      html = await renderAiTaskCompletedEmail({
        taskName: typeof req.query?.taskName === 'string' ? req.query.taskName : 'Example task',
        taskUrl: typeof req.query?.taskUrl === 'string' ? req.query.taskUrl : 'https://openagi.ai',
        summary: typeof req.query?.summary === 'string' ? req.query.summary : 'Your task finished successfully.',
        locale
      });
      break;
    case 'receipt':
      html = await renderReceiptEmail({
        amount: typeof req.query?.amount === 'string' ? req.query.amount : '10.00',
        currency: typeof req.query?.currency === 'string' ? req.query.currency : 'USD',
        receiptUrl: typeof req.query?.receiptUrl === 'string' ? req.query.receiptUrl : undefined,
        locale
      });
      break;
    case 'admin-alert':
      html = await renderAdminAlertEmail({
        subject: typeof req.query?.subject === 'string' ? req.query.subject : 'Example alert',
        message: typeof req.query?.message === 'string' ? req.query.message : 'Something went wrong.',
        locale
      });
      break;
    default:
      return res.status(400).json({
        ok: false,
        error: 'unknown_template',
        supported: ['welcome', 'otp', 'task-completed', 'receipt', 'admin-alert']
      });
  }

  res.setHeader('content-type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
