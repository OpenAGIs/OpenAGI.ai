import { Link, Section, Text } from '@react-email/components';
import { render } from '@react-email/render';
import { BaseLayout } from './BaseLayout.js';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl } from './utils.js';

export type ReceiptEmailProps = {
  amount: string;
  currency?: string;
  receiptUrl?: string;
  siteUrl?: string;
  locale?: string;
};

export function ReceiptEmail({
  amount,
  currency = 'USD',
  receiptUrl,
  siteUrl = getSiteUrl(),
  locale
}: ReceiptEmailProps) {
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l).receipt;

  return (
    <BaseLayout previewText={copy.preview} title={copy.title} siteUrl={siteUrl} locale={l}>
      <Text style={styles.p}>{copy.body}</Text>
      <Section style={styles.amountBox}>
        <Text style={styles.amount}>
          {amount} {currency}
        </Text>
      </Section>
      {receiptUrl ? (
        <Text style={styles.p}>
          {copy.label}:{' '}
          <Link href={receiptUrl} style={styles.link}>
            {receiptUrl}
          </Link>
        </Text>
      ) : null}
    </BaseLayout>
  );
}

export async function renderReceiptEmail(props: ReceiptEmailProps): Promise<string> {
  return render(<ReceiptEmail {...props} />);
}

const styles = {
  p: { margin: '0 0 14px 0' },
  amountBox: {
    backgroundColor: 'rgba(148,163,184,0.12)',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: '14px',
    padding: '18px',
    textAlign: 'center' as const,
    margin: '8px 0 12px 0'
  },
  amount: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  link: {
    color: '#93c5fd',
    textDecoration: 'underline'
  }
};
