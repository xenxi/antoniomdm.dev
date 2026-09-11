import type { Locale } from '../i18n/core';
import { localizedPath } from '../i18n/core';
import { getPortfolio, type ContentData } from './portfolio';
import { pageMetadata, routes } from './routes';
import { getArchitectureCases, getCvVariants, getPublicLinks, getTerminalIndex, getProfile, getCompetencies, getAchievements, getExperience, getPublicClaims } from './professional';

export function getUiData(locale: Locale, content: ContentData) {
  const metadata = Object.fromEntries(routes(content).map(path => {
    const value = pageMetadata(localizedPath(path, locale), content);
    return [path, { title: value.title, description: value.description, canonical: value.canonical, note: Boolean(value.note) }];
  }));
  return {
    portfolio: getPortfolio(locale),
    professionalExperience: getExperience(locale),
    humanNote: getProfile(locale).humanNote,
    systemFacts: [
      ...getPublicClaims(locale).filter(claim => claim.id === 'profile-12-years').map(claim => ({ id: 'experience', label: 'Experience', value: claim.text })),
      ...getCompetencies(locale).filter(item => item.id === 'dotnet-backend').map(item => ({ id: 'technology', label: 'Technology', value: item.name })),
    ],
    overviewSkills: getCompetencies(locale).flatMap(item => item.skills).filter(skill => ['.NET', 'C#', 'ASP.NET Core', 'EF', 'Dapper', 'SQL Server', 'Azure SQL', 'PostgreSQL', 'React', 'TypeScript', 'Flutter', 'Kotlin'].includes(skill)),
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
