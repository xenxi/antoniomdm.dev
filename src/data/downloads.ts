import { translator, type Locale } from '../i18n/core';
import { getCompetencies, getExperience, getProfile, getPublicLinks } from './professional';

export function cvResponse(locale: Locale) {
  const profile = getProfile(locale); const experience = getExperience(locale); const competencies = getCompetencies(locale); const t = translator(locale);
  const links = getPublicLinks(locale).filter(link => link.availability === 'available' && link.url);
  const text = [
    profile.name, profile.headline, profile.focusLine, '', profile.summary, '',
    `${t('Skills')}: ${competencies.map(item => item.name).join(', ')}`, '', t('Experience'),
    experience.map(job => [job.role + ' — ' + job.company, job.period, job.summary, ...job.sections.map(section => section.content)].join('\n')).join('\n\n'), '',
    t('Education'), profile.education.join('\n'), '', t('Languages'), profile.languages.join(' '), '',
    links.map(link => `${link.label}: ${link.url}`).join('\n'), '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Language': locale } });
}
