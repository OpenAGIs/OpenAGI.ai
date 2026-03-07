import { Button, Text } from '@react-email/components';
import { render } from '@react-email/render';
import { BaseLayout } from './BaseLayout.js';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl, stripTrailingSlash } from './utils.js';

export type AiTaskCompletedEmailProps = {
  taskName?: string;
  taskUrl?: string;
  summary?: string;
  siteUrl?: string;
  locale?: string;
};

export function AiTaskCompletedEmail({
  taskName = 'Task',
  taskUrl,
  summary,
  siteUrl = getSiteUrl(),
  locale
}: AiTaskCompletedEmailProps) {
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l).task;
  const resolvedTaskUrl = taskUrl ?? `${stripTrailingSlash(siteUrl)}/`;

  return (
    <BaseLayout previewText={copy.preview(taskName)} title={copy.title} siteUrl={siteUrl} locale={l}>
      <Text style={styles.p}>
        <strong>{copy.completed(taskName)}</strong>
      </Text>
      {summary ? <Text style={styles.p}>{summary}</Text> : null}
      <Button href={resolvedTaskUrl} style={styles.button}>
        {copy.cta}
      </Button>
      <Text style={styles.muted}>{copy.hint}</Text>
    </BaseLayout>
  );
}

export async function renderAiTaskCompletedEmail(props: AiTaskCompletedEmailProps): Promise<string> {
  return render(<AiTaskCompletedEmail {...props} />);
}

const styles = {
  p: { margin: '0 0 14px 0' },
  button: {
    backgroundColor: '#22c55e',
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
