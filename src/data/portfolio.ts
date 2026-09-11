import { translator, type Locale } from '../i18n/core';
import { getAiLab, getCompetencies, getExperience, getProfile, getProjects, getPublicLinks } from './professional';

export function getPortfolio(locale: Locale = 'es') {
const t = translator(locale);
const sourceProfile = getProfile(locale);
const competencies = getCompetencies(locale);
const publicLinks = getPublicLinks(locale);
const profile = {
  name: sourceProfile.name,
  shortName: sourceProfile.shortName,
  role: sourceProfile.headline,
  focusLine: sourceProfile.focusLine,
  statement: sourceProfile.summary,
  github: publicLinks.find(link => link.id === 'github' && link.availability === 'available')?.url ?? '',
  skills: sourceProfile.focusAreas.map(id => competencies.find(item => item.id === id)?.name).filter((value): value is string => Boolean(value)),
  languages: [...new Set(competencies.flatMap(item => item.skills))],
  education: sourceProfile.education.join(' '), spokenLanguages: sourceProfile.languages.join(' '),
};

const categories = ['All projects', 'Production', 'Open Source', 'Experiments', 'Side Quests'].map(t);
const projects = getProjects(locale).map(project => ({
  slug: project.slug, name: project.title, category: t('Side Quests'), featured: true,
  technologies: project.technologies,
  description: project.summary,
  overview: project.sections[0]?.content ?? project.summary,
  status: project.capabilities.map(capability => `${capability.deliveryStatus === 'implemented' ? (locale === 'es' ? 'Implementado' : 'Implemented') : capability.deliveryStatus === 'in_progress' ? (locale === 'es' ? 'En desarrollo' : 'In progress') : (locale === 'es' ? 'Experimento' : 'Experiment')}: ${capability.title}.`).join(' '),
  capabilities: project.capabilities,
}));

const experience = getExperience(locale).map(item => ({ id: item.id, company: item.company, role: item.role, period: item.period, description: item.summary, note: item.sections.map(section => section.content).join(' ') }));

const labs = getAiLab(locale).map(item => ({ id: item.id, name: item.title, description: item.summary, concept: item.summary }));
return { profile, categories, projects, experience, labs };
}

export interface Note {
  slug: string; title: string; description: string; date: string; updated?: string;
  tags: string[]; readingTime: number; canonical?: string; html: string;
}
export interface ContentData { notes: Note[] }
