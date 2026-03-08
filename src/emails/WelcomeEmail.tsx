import { Button, Text } from '@react-email/components';
import { render } from '@react-email/render';
import { BaseLayout } from './BaseLayout.js';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl, stripTrailingSlash } from './utils.js';

export type WelcomeEmailProps = {
  name?: string;
  siteUrl?: string;
  locale?: string;
};

export function WelcomeEmail({ name, siteUrl = getSiteUrl(), locale }: WelcomeEmailProps) {
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l).welcome;
  const homeUrl = `${stripTrailingSlash(siteUrl)}/`;

  return (
    <BaseLayout previewText={copy.preview} title={copy.title} siteUrl={siteUrl} locale={l}>
      <Text style={styles.p}>{copy.greeting(name)}</Text>
      <Text style={styles.p}>{copy.body}</Text>
      <Button href={homeUrl} style={styles.button}>
        {copy.cta}
      </Button>
      <Text style={styles.muted}>{copy.ignore}</Text>
    </BaseLayout>
  );
}

export async function renderWelcomeEmail(props: WelcomeEmailProps): Promise<string> {
  return render(<WelcomeEmail {...props} />);
}

const styles = {
  p: { margin: '0 0 14px 0' },
  button: {
    backgroundColor: '#3b82f6',
    color: '#0b0f1a',
    borderRadius: '12px',
    padding: '12px 18px',
    fontWeight: '700',
    textDecoration: 'none',
    marginTop: '8px',
    marginBottom: '14px'
  },
  muted: { margin: '4px 0 0 0', color: 'rgba(203,213,225,0.75)' }
};
