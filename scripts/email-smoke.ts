import { createElement } from 'react';
import { AiTaskCompletedEmail, renderAiTaskCompletedEmail } from '../src/emails/AiTaskCompletedEmail.js';
import { AdminAlertEmail, renderAdminAlertEmail } from '../src/emails/AdminAlertEmail.js';
import { OtpEmail, renderOtpEmail } from '../src/emails/OtpEmail.js';
import { ReceiptEmail, renderReceiptEmail } from '../src/emails/ReceiptEmail.js';
import { WelcomeEmail, renderWelcomeEmail } from '../src/emails/WelcomeEmail.js';
import { sendEmail } from '../src/services/email.js';

async function main() {
  const samples = [
    ['welcome', await renderWelcomeEmail({ name: 'Test User', locale: 'en' })],
    ['otp', await renderOtpEmail({ code: '123456', expiresInMinutes: 10, locale: 'zh-CN' })],
    [
      'task-completed',
      await renderAiTaskCompletedEmail({ taskName: 'Batch indexing', summary: 'Indexed 42 files.' })
    ],
    ['receipt', await renderReceiptEmail({ amount: '10.00', currency: 'USD' })],
    ['admin', await renderAdminAlertEmail({ subject: 'Example', message: 'Something happened.' })]
  ] as const;

  for (const [name, html] of samples) {
    console.log(`[smoke] ${name} html length=${html.length}`);
  }

  const result = await sendEmail({
    to: 'user@example.com',
    subject: 'Smoke test',
    react: createElement(WelcomeEmail, { name: 'Smoke Test' }),
    tags: [{ name: 'type', value: 'smoke' }]
  });

  if (result.ok) {
    console.log('[smoke] sendEmail succeeded with id', result.id);
  } else {
    console.log('[smoke] sendEmail failed safely', 'error' in result ? result.error : 'unknown');
  }

  const result2 = await sendEmail({
    to: 'admin@example.com',
    subject: 'Alert smoke',
    react: createElement(AdminAlertEmail, { subject: 'Disk threshold', message: '85% full' }),
    tags: [{ name: 'type', value: 'smoke-alert' }]
  });

  if (result2.ok) {
    console.log('[smoke] second send result ok');
  } else {
    console.log('[smoke] second send result', 'error' in result2 ? result2.error : 'unknown');
  }

  // Ensure JSX templates are loadable as React components.
  createElement(OtpEmail, { code: '000000' });
  createElement(AiTaskCompletedEmail, { taskName: 'Task' });
  createElement(ReceiptEmail, { amount: '1.00' });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
