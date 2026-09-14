import type { Locale } from '../i18n/core';
import { getAiLab, getCompetencies, getExperience, getProfile, getPublicLinks } from './professional';
import { ecosystemLabels, localizeProject } from './projects';
import { publicProfessionalModel } from './professional';

export function getPortfolio(locale: Locale = 'es') {
const sourceProfile = getProfile(locale);
const competencies = getCompetencies(locale);
const publicLinks = getPublicLinks(locale);
const profile = {
  name: sourceProfile.name,
  shortName: sourceProfile.shortName,
  role: sourceProfile.headline,
  introduction: sourceProfile.introduction,
  mode: sourceProfile.mode,
  focusLine: sourceProfile.focusLine,
  statement: sourceProfile.summary,
  github: publicLinks.find(link => link.id === 'github' && link.availability === 'available')?.url ?? '',
  skills: sourceProfile.focusAreas.map(id => competencies.find(item => item.id === id)?.name).filter((value): value is string => Boolean(value)),
  languages: [...new Set(competencies.flatMap(item => item.skills))],
  education: sourceProfile.education.join(' '), spokenLanguages: sourceProfile.languages.join(' '),
};

 const categories = [locale === 'es' ? 'Todos los proyectos' : 'All projects', ...Object.values(ecosystemLabels).map(value => value[locale])];
 const projects = publicProfessionalModel.projectCatalog.map(project => {
   const localized = localizeProject(project, locale);
   return {
   ...localized,
   category: project.ecosystem,
   categoryLabel: ecosystemLabels[project.ecosystem][locale],
   name: localized.publicName,
   description: localized.summary,
   overview: localized.engineeringStory,
   status: localized.status.join(' / '),
   capabilities: localized.implementedCapabilities,
 }; });

const experience = getExperience(locale).map(item => ({ id: item.id, company: item.company, role: item.role, period: item.period, description: item.summary, note: item.sections.map(section => section.content).join(' ') }));

const labs = getAiLab(locale).map(item => ({ id: item.id, name: item.title, description: item.summary, concept: item.summary }));
return { profile, categories, projects, experience, labs };
}

export interface Note {
  slug: string; title: string; description: string; date: string; updated?: string;
  tags: string[]; readingTime: number; canonical?: string; html: string;
}
export interface ContentData { notes: Note[] }
