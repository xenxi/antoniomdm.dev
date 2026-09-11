import type { Locale } from '../i18n/core';
import { localizedPath } from '../i18n/core';
import { getPortfolio, type ContentData } from './portfolio';
import { pageMetadata, routes } from './routes';
import { getArchitectureCases, getCvVariants, getPublicLinks, getTerminalIndex, getProfile, getCompetencies, getAchievements, getExperience } from './professional';

export function getUiData(locale: Locale, content: ContentData) {
  const metadata = Object.fromEntries(routes(content).map(path => {
    const value = pageMetadata(localizedPath(path, locale), content);
    return [path, { title: value.title, description: value.description, canonical: value.canonical, note: Boolean(value.note) }];
  }));
  return {
    portfolio: getPortfolio(locale),
    professionalExperience: getExperience(locale),
    humanNote: getProfile(locale).humanNote,
    competencies: getCompetencies(locale),
    achievements: getAchievements(locale),
    pdfs: (['es', 'en'] as const).map(language => ({ language, ...getCvVariants(language).find(variant => variant.primary)!.pdf })),
    architectureCases: getArchitectureCases(locale).map(item => ({ id: item.id, title: item.title, summary: item.summary })),
    publicLinks: getPublicLinks(locale),
    cvVariants: getCvVariants(locale),
    terminalIndex: getTerminalIndex(locale),
    knownPaths: routes(content), metadata,
  };
}

export type UiData = ReturnType<typeof getUiData>;
