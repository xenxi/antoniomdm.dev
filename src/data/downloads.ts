import { getPortfolio } from './portfolio';
import { translator, type Locale } from '../i18n/core';
export function cvResponse(locale: Locale) {
  const { profile, experience } = getPortfolio(locale); const t = translator(locale);
  const text = `${profile.name}\n${profile.role}\n\n${profile.statement}\n\n${t('Skills')}: ${profile.skills.join(', ')}\n${t('Languages & tools')}: ${profile.languages.join(', ')}\n\n${t('Experience')}\n${experience.map(job => `${job.role} — ${job.company}\n${job.period}\n${job.description}\n${job.note}`).join('\n\n')}\n\n${t('Education')}\n${profile.education}\n\n${t('Languages')}\n${profile.spokenLanguages}\n\n${profile.github}\n`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Language': locale } });
}
