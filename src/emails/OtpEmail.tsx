import { Section, Text } from '@react-email/components';
import { render } from '@react-email/render';
import { BaseLayout } from './BaseLayout.js';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl } from './utils.js';

export type OtpEmailProps = {
  code: string;
  expiresInMinutes?: number;
  siteUrl?: string;
  locale?: string;
};

export function OtpEmail({
  code,
  expiresInMinutes = 10,
  siteUrl = getSiteUrl(),
  locale
}: OtpEmailProps) {
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l).otp;

  return (
    <BaseLayout previewText={copy.preview(code)} title={copy.title} siteUrl={siteUrl} locale={l}>
      <Text style={styles.p}>{copy.intro}</Text>
      <Section style={styles.codeBox}>
        <Text style={styles.code}>{code}</Text>
      </Section>
      <Text style={styles.muted}>{copy.expires(expiresInMinutes)}</Text>
      <Text style={styles.muted}>{copy.ignore}</Text>
    </BaseLayout>
  );
}

export async function renderOtpEmail(props: OtpEmailProps): Promise<string> {
  return render(<OtpEmail {...props} />);
}

const styles = {
  p: { margin: '0 0 14px 0' },
  codeBox: {
    backgroundColor: 'rgba(148,163,184,0.12)',
    border: '1px solid rgba(148,163,184,0.18)',
    borderRadius: '14px',
    padding: '18px',
    textAlign: 'center' as const,
    margin: '8px 0 12px 0'
  },
  code: {
    margin: '0',
    fontSize: '22px',
    letterSpacing: '0.18em',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  muted: { margin: '10px 0 0 0', color: 'rgba(203,213,225,0.75)' }
};
