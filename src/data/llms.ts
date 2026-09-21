import type { Locale } from '../i18n/core';
import { localizedPath } from '../i18n/core';
import { getContent } from './content';
import { getAchievements, getAiLab, getArchitectureCases, getCompetencies, getExperience, getProfile, getProjects, getPublicLinks } from './professional';

export async function llmsResponse(locale: Locale) {
  const profile = getProfile(locale); const experience = getExperience(locale); const competencies = getCompetencies(locale);
  const achievements = getAchievements(locale); const projects = getProjects(locale); const cases = getArchitectureCases(locale); const aiLab = getAiLab(locale);
  const links = getPublicLinks(locale).filter(link => link.availability === 'available' && link.url); const content = await getContent(locale);
  const heading = locale === 'es' ? 'Modelo profesional público' : 'Public professional model';
  const lines = [
    '# AntoñiOS', '', `## ${heading}`, '', profile.name, profile.headline, profile.focusLine, '', profile.summary, '',
    `## ${locale === 'es' ? 'Experiencia' : 'Experience'}`, ...experience.map(item => `- ${item.company} — ${item.role} (${item.period}): ${item.summary}`), '',
    `## ${locale === 'es' ? 'Competencias' : 'Competencies'}`, ...competencies.map(item => `- ${item.name} — ${item.classification}; ${item.recency}`), '',
    `## ${locale === 'es' ? 'Logros confirmados' : 'Confirmed achievements'}`, ...achievements.map(item => `- ${item.title}: ${item.summary}`), '',
    `## ${locale === 'es' ? 'Proyectos' : 'Projects'}`, ...projects.map(item => `- [${item.title}](https://antoniomdm.dev${localizedPath(`/projects/${item.slug}/`, locale)}): ${item.summary}\n  ${item.capabilities.map(capability => `${capability.deliveryStatus}: ${capability.title}`).join(' · ')}`), '',
    `## ${locale === 'es' ? 'Casos de arquitectura' : 'Architecture cases'}`, ...cases.map(item => `- [${item.title}](https://antoniomdm.dev${localizedPath('/architecture/', locale)}): ${item.summary}`), '',
    '## AI Lab', ...aiLab.map(item => `- ${item.title}: ${item.summary}`), '',
    `## Blog`, ...content.outOfScope.map(article => `- [${article.title}](https://antoniomdm.dev${localizedPath(`/blog/${article.slug}/`, locale)}): ${article.summary}`), '',
    `## ${locale === 'es' ? 'Enlaces verificados' : 'Verified links'}`, ...links.map(link => `- ${link.label}: ${link.url}`), '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Content-Language': locale } });
}
