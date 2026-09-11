import { career } from './career';
import { translator, type Locale } from '../i18n/core';

export function getPortfolio(locale: Locale = 'es') {
const t = translator(locale);
const data = career(locale);
const profile = {
  name: 'Antonio Manuel Díaz Moreno',
  shortName: 'Antonio M. Díaz Moreno',
  role: data.role,
  statement: data.statement,
  github: 'https://github.com/xenxi',
  skills: ['.NET', 'Architecture', 'Distributed Systems', 'Performance', 'Frontend', 'AI-assisted Engineering'].map(t),
  languages: ['C# / .NET', 'SQL', 'Azure', 'TypeScript', 'Angular', 'React', 'Vue', 'Dart / Flutter', 'ML.NET'],
  education: data.education, spokenLanguages: data.spokenLanguages,
};

const categories = ['All projects', 'Production', 'Open Source', 'Experiments', 'Side Quests'].map(t);
const projects = [{
  slug: 'platform934', name: 'Platform 9¾', category: t('Side Quests'), featured: true,
  technologies: ['Flutter', 'webOS', 'Android TV', 'Kotlin', 'Media3', 'Jellyfin', 'SignalR'],
  ...data.project,
}];

const experience = data.experience;

const labs = [
  { id: 'queue', name: 'Queue Simulator', description: 'Explore arrivals, workers and backpressure.', concept: 'Arrivals → Queue → Workers → Results' },
  { id: 'retry', name: 'Retry Playground', description: 'Explore retries, backoff and jitter.', concept: 'Attempt → Failure → Backoff → Retry' },
  { id: 'poly', name: 'Poly Enterprise', description: 'A space for a future architecture experiment.', concept: 'An experiment waiting for its first question.' },
].map(item => ({ ...item, name: t(item.name), description: t(item.description), concept: t(item.concept) }));
return { profile, categories, projects, experience, labs };
}

export interface Note {
  slug: string; title: string; description: string; date: string; updated?: string;
  tags: string[]; readingTime: number; canonical?: string; html: string;
}
export interface ContentData { notes: Note[] }
