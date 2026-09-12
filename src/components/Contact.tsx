import { useState } from 'preact/hooks';
import { useLocale } from '../i18n/context';
import type { UiData } from '../data/ui';

const withoutProtocol = (url: string) => url.replace(/^https?:\/\/(?:www\.)?/, '');

export default function Contact({ data }: { data: UiData }) {
  const { locale, t } = useLocale();
  const { contact, contactMailto } = data;
  const [copyStatus, setCopyStatus] = useState('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyStatus(t('Email copied to clipboard.'));
    } catch {
      setCopyStatus(t('Could not copy the email. Use the email link instead.'));
    }
  }

  return <div class="contact-app">
    <p class="eyebrow">{locale === 'es' ? 'CONTACTO / DISPONIBILIDAD VERIFICADA' : 'CONTACT / VERIFIED AVAILABILITY'}</p>
    <h1>{contact.displayName}</h1>
    <p class="contact-summary">{contact.location[locale]} · {contact.availability[locale]}</p>
    <ul class="contact-actions">
      <li><a href={contactMailto}><strong>{t('Email')}</strong><span>{contact.email}</span></a></li>
      <li><a href={contact.linkedin} target="_blank" rel="noreferrer"><strong>LinkedIn</strong><span>{withoutProtocol(contact.linkedin)}</span></a></li>
      <li><a href={contact.github} target="_blank" rel="noreferrer"><strong>GitHub</strong><span>{withoutProtocol(contact.github)}</span></a></li>
      <li><a href={contact.website} target="_blank" rel="noreferrer"><strong>{t('Website')}</strong><span>{withoutProtocol(contact.website)}</span></a></li>
    </ul>
    <button type="button" class="contact-copy" onClick={copyEmail}>{t('Copy email')}</button>
    <p class="contact-copy-status" role="status" aria-live="polite">{copyStatus}</p>
  </div>;
}
