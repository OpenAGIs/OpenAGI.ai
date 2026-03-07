import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components';
import type { ReactNode } from 'react';
import { getEmailCopy, resolveEmailLocale } from '../i18n-emails.js';
import { getSiteUrl, stripTrailingSlash } from './utils.js';

type BaseLayoutProps = {
  previewText?: string;
  title?: string;
  children: ReactNode;
  siteUrl?: string;
  unsubscribeUrl?: string;
  locale?: string;
};

export function BaseLayout({
  previewText,
  title,
  children,
  siteUrl = getSiteUrl(),
  unsubscribeUrl,
  locale
}: BaseLayoutProps) {
  const safeSiteUrl = stripTrailingSlash(siteUrl);
  const logoUrl = `${safeSiteUrl}/openagi-logo-text.png`;
  const resolvedUnsubscribeUrl = unsubscribeUrl ?? `${safeSiteUrl}/unsubscribe`;
  const l = resolveEmailLocale(locale);
  const copy = getEmailCopy(l);

  return (
    <Html lang={l}>
      <Head />
      {previewText ? <Preview>{previewText}</Preview> : null}
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Link href={safeSiteUrl} style={styles.logoLink}>
              <Img src={logoUrl} width="160" alt="OpenAGI" style={styles.logo} />
            </Link>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <Section style={styles.content}>{children}</Section>
            <Hr style={styles.hr} />
            <Section style={styles.footer}>
              <Text style={styles.footerText}>© {new Date().getFullYear()} OpenAGI. {copy.common.rights}</Text>
              <Link href={resolvedUnsubscribeUrl} style={styles.unsubscribe}>
                {copy.common.unsubscribe}
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    margin: '0',
    padding: '24px 12px',
    backgroundColor: '#0b0f1a',
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
  },
  container: {
    maxWidth: '560px',
    width: '100%',
    backgroundColor: '#0f172a',
    border: '1px solid rgba(148,163,184,0.15)',
    borderRadius: '16px',
    padding: '24px'
  },
  logoLink: {
    textDecoration: 'none',
    display: 'inline-block'
  },
  logo: {
    display: 'block'
  },
  title: {
    margin: '16px 0 12px 0',
    fontSize: '18px',
    lineHeight: '24px',
    color: '#e2e8f0',
    fontWeight: '700'
  },
  content: {
    color: '#cbd5e1',
    fontSize: '14px',
    lineHeight: '22px'
  },
  hr: {
    borderColor: 'rgba(148,163,184,0.2)',
    margin: '20px 0'
  },
  footer: {
    textAlign: 'center' as const
  },
  footerText: {
    color: 'rgba(203,213,225,0.7)',
    fontSize: '12px',
    lineHeight: '18px',
    margin: '0 0 8px 0'
  },
  unsubscribe: {
    color: 'rgba(203,213,225,0.9)',
    textDecoration: 'underline',
    fontSize: '12px'
  }
};
