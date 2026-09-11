import type { Locale } from '../../i18n/core';
import { publicProfessionalModel as model } from './model';
import type { EditorialSection, LocalizedText } from './types';
import { assertPublicProfessionalModel } from './validation';

assertPublicProfessionalModel(model);
const localize = (value: LocalizedText, locale: Locale) => value[locale];
const period = (start: string, end: string | null, locale: Locale) => {
  const format = (value: string) => new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}-01T00:00:00Z`));
  const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
  return `${capitalize(format(start))} — ${end ? capitalize(format(end)) : locale === 'es' ? 'Actualidad' : 'Present'}`;
};

export function getProfile(locale: Locale) {
  const value = model.profile;
  return { ...value, headline: localize(value.headline, locale), focusLine: localize(value.focusLine, locale), summary: localize(value.summary, locale), humanNote: localize(value.humanNote, locale), education: value.education.map(item => localize(item, locale)), languages: value.languages.map(item => localize(item, locale)) };
}

export function getExperience(locale: Locale) {
  return model.experiences.map(item => ({ ...item, company: localize(item.company, locale), role: localize(item.role, locale), period: period(item.start, item.end, locale), summary: localize(item.summary, locale), sections: item.sections.map(section => ({ ...section, title: localize(section.title, locale), content: localize(section.content, locale) })) }));
}

export function getCompetencies(locale: Locale) {
  return model.competencies.map(item => ({ ...item, name: localize(item.name, locale), summary: item.summary ? localize(item.summary, locale) : undefined }));
}

export function getAchievements(locale: Locale) {
  return model.achievements.map(item => ({ ...item, title: localize(item.title, locale), summary: localize(item.summary, locale), scope: localize(item.scope, locale), metric: item.metric ? { ...item.metric, unit: localize(item.metric.unit, locale) } : undefined }));
}

export function getProjects(locale: Locale) {
  return model.projects.map(item => ({ ...item, title: localize(item.title, locale), summary: localize(item.summary, locale), sections: item.sections.map(section => ({ ...section, title: localize(section.title, locale), content: localize(section.content, locale) })), capabilities: item.capabilities.map(capability => ({ ...capability, title: localize(capability.title, locale), description: localize(capability.description, locale) })), decisions: item.decisions.map(decision => ({ ...decision, title: localize(decision.title, locale), description: localize(decision.description, locale) })) }));
}

function publicSection(section: EditorialSection, locale: Locale) {
  return section.status === 'published' && section.content ? localize(section.content, locale) : undefined;
}

export function getArchitectureCases(locale: Locale) {
  return model.architectureCases.map(item => ({
    id: item.id, slug: item.slug, title: localize(item.title, locale), summary: localize(item.summary, locale),
    sections: (['context', 'problem', 'constraints', 'options', 'decision', 'tradeoffs', 'implementation', 'result', 'learning'] as const).flatMap(id => {
      const content = publicSection(item[id], locale); return content ? [{ id, content }] : [];
    }),
    claimIds: item.claimIds, experienceIds: item.experienceIds, competencyIds: item.competencyIds, achievementIds: item.achievementIds,
  }));
}

export function getPublicLinks(locale: Locale) {
  return model.externalLinks.map(item => ({ ...item, label: localize(item.label, locale) }));
}

export function getCvVariants(locale: Locale) {
  return model.cvVariants.map(item => ({ ...item, title: localize(item.title, locale), extendedRoute: localize(item.extendedRoute, locale), pdf: item.pdf[locale] }));
}

export function getAiLab(locale: Locale) {
  return model.aiLab.map(item => ({ ...item, title: localize(item.title, locale), summary: localize(item.summary, locale) }));
}

export function getTerminalIndex(locale: Locale) {
  const links = new Map(getPublicLinks(locale).map(link => [link.id, link]));
  return model.terminalCommands.flatMap(command => {
    const link = command.externalLinkId ? links.get(command.externalLinkId) : undefined;
    if (command.externalLinkId && link?.availability !== 'available') return [];
    return [{ id: command.id, label: localize(command.label, locale), route: command.route, url: link?.url }];
  });
}

export function getPublicClaims(locale: Locale) {
  return model.claims.map(claim => ({ ...claim, text: localize(claim.text, locale) }));
}

export { model as publicProfessionalModel };
