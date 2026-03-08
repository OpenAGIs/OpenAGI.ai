import { Text } from '@react-email/components';
import { render } from '@react-email/render';
import { BaseLayout } from './BaseLayout.js';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl } from './utils.js';

export type AdminAlertEmailProps = {
  subject: string;
  message: string;
  siteUrl?: string;
  locale?: string;
};

export function AdminAlertEmail({
  subject,
  message,
  siteUrl = getSiteUrl(),
  locale
}: AdminAlertEmailProps) {
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l).alert;

  return (
    <BaseLayout previewText={subject} title={copy.title} siteUrl={siteUrl} locale={l}>
      <Text style={styles.meta}>{copy.body}</Text>
      <Text style={styles.label}>{copy.subjectLabel}</Text>
      <Text style={styles.value}>{subject}</Text>
      <Text style={styles.label}>{copy.messageLabel}</Text>
      <Text style={styles.value}>{message}</Text>
    </BaseLayout>
  );
}

export async function renderAdminAlertEmail(props: AdminAlertEmailProps): Promise<string> {
  return render(<AdminAlertEmail {...props} />);
}

const styles = {
  meta: {
    margin: '0 0 14px 0',
    color: 'rgba(203,213,225,0.75)'
  },
  label: {
    margin: '10px 0 6px 0',
    fontSize: '12px',
    color: 'rgba(203,213,225,0.75)'
  },
  value: {
    margin: '0 0 14px 0'
  }
};
