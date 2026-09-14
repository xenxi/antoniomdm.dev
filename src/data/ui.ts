import type { Locale } from '../i18n/core';
import { basePath, localizedPath } from '../i18n/core';
import { getPortfolio, type ContentData } from './portfolio';
import { pageMetadata, routes } from './routes';
import { getArchitectureCases, getCvVariants, getPublicLinks, getProfile, getCompetencies, getAchievements, getExperience, getPublicClaims, getDecisionAreas, getRepresentativeDecisions } from './professional';
import { getArchitectureDiagram } from './architecture-presentation';
import { contactInfo, contactMailto } from './contact';
import { cvAssets, cvSupportingLine } from './cv';

export function getUiData(locale: Locale, content: ContentData, path = localizedPath('/', locale)) {
  const activePath = basePath(path);
  const localizedProfile = getProfile(locale);
  const localizedCompetencies = getCompetencies(locale);
  const competency = (id: string) => localizedCompetencies.find(item => item.id === id)?.name ?? '';
  const metadata = Object.fromEntries(routes(content).map(path => {
    const value = pageMetadata(localizedPath(path, locale), content);
    return [path, { title: value.title, description: value.description, canonical: value.canonical, note: Boolean(value.note) }];
  }));
  return {
    portfolio: getPortfolio(locale),
    professionalExperience: getExperience(locale),
    humanNote: localizedProfile.humanNote,
    systemFacts: [
      ...getPublicClaims(locale).filter(claim => claim.id === 'profile-12-years').map(claim => ({ id: 'experience', label: 'Experience', value: claim.text })),
      { id: 'core', label: 'Core', value: competency('dotnet-backend') },
      { id: 'focus', label: 'Focus', value: [competency('software-architecture'), competency('distributed-systems'), competency('legacy-modernization')].join(' · ') },
      { id: 'mode', label: 'Mode', value: locale === 'es' ? 'Hands-on · Discovery → Producción' : 'Hands-on · Discovery → Production' },
    ],
    overviewSkills: getCompetencies(locale).flatMap(item => item.skills).filter(skill => ['.NET', 'C#', 'ASP.NET Core', 'EF', 'Dapper', 'SQL Server', 'Azure SQL', 'PostgreSQL', 'React', 'TypeScript', 'Flutter', 'Kotlin'].includes(skill)),
    competencies: getCompetencies(locale),
    achievements: getAchievements(locale),
    pdfs: (['es', 'en'] as const).map(language => ({ language, ...getCvVariants(language).find(variant => variant.primary)!.pdf })),
    architectureCases: getArchitectureCases(locale).map(item => {
      const selected = activePath === `/architecture/${item.slug}/`;
      return { ...item, sections: selected ? item.sections : [], diagram: selected ? getArchitectureDiagram(item.id, locale) : undefined };
    }),
    decisionAreas: getDecisionAreas(locale),
    representativeDecisions: getRepresentativeDecisions(locale),
    publicLinks: getPublicLinks(locale),
    cvVariants: getCvVariants(locale),
    contact: contactInfo,
    contactMailto,
    cvAssets,
    cvSupportingLine,
    knownPaths: routes(content), metadata,
  };
}

export type UiData = ReturnType<typeof getUiData>;
