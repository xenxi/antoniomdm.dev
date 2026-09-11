import { applications, appForPath, normalizePath, registry } from '../os/registry';
import { getPortfolio, type ContentData } from './portfolio';
import { basePath, localeForPath, localizedPath, translator } from '../i18n/core';
import { profileSections } from '../os/profile-sections';
export function routes(content: ContentData) {
  const { projects } = getPortfolio();
  return [...new Set([...applications.map(app => app.path), ...profileSections.map(section => section.path), ...projects.map(project => `/projects/${project.slug}/`), ...content.notes.map(note => `/notes/${note.slug}/`)])];
}
export function pageMetadata(path: string, content: ContentData) {
  const locale = localeForPath(path); const t = translator(locale);
  const { profile, projects } = getPortfolio(locale);
  const normalized = normalizePath(basePath(path)); const originalApp = registry[appForPath(normalized) ?? 'welcome'];
  const routeApp = normalized === '/architecture/' ? { name: 'Architecture', description: 'Confirmed case-study structures' } : normalized === '/contact/' ? { name: 'Contact', description: 'Verified professional channels' } : undefined;
  const app = { ...originalApp, name: t(routeApp?.name ?? originalApp.name), description: t(routeApp?.description ?? originalApp.description) };
  const project = projects.find(project => normalized === `/projects/${project.slug}/`);
  const note = content.notes.find(note => normalized === `/notes/${note.slug}/`);
  const section = profileSections.find(section => section.path === normalized);
  const title = note?.title ?? project?.name ?? (normalized === '/' || normalized === '/profile/' ? `${profile.name} · ${profile.role}` : section ? `${app.name} · ${t(section.name)}` : app.name);
  const description = note?.description ?? project?.description ?? (app.id === 'welcome' ? profile.statement : `${app.name} — ${app.description}. ${profile.shortName}, ${t('Software Architect')}.`);
  const canonical = note?.canonical ?? `https://antoniomdm.dev${localizedPath(normalized, locale)}`;
  const person = { '@type': 'Person', '@id': 'https://antoniomdm.dev/#person', name: profile.name, jobTitle: profile.role, url: 'https://antoniomdm.dev/es/', sameAs: [profile.github], knowsAbout: profile.skills };
  const schema: Record<string, unknown>[] = [person, { '@type': 'WebSite', '@id': 'https://antoniomdm.dev/#website', name: 'AntoñiOS', url: 'https://antoniomdm.dev/es/' }];
  if (note) schema.push({ '@type': 'Article', headline: title, description, inLanguage: locale, datePublished: note.date, dateModified: note.updated ?? note.date, author: { '@id': person['@id'] }, mainEntityOfPage: canonical, keywords: note.tags, image: `https://antoniomdm.dev${locale === 'es' ? '/social.png' : '/en/social.png'}` });
  else if (project) schema.push({ '@type': 'SoftwareSourceCode', name: project.name, description, programmingLanguage: ['Kotlin', 'Dart'], runtimePlatform: ['Android TV', 'Flutter', 'webOS'], url: canonical, author: { '@id': person['@id'] } });
  else schema.push({ '@type': app.id === 'welcome' || app.id === 'about' ? 'ProfilePage' : 'WebPage', name: title, description, url: canonical, mainEntity: { '@id': person['@id'] } });
  const crumbs = [{ '@type': 'ListItem', position: 1, name: t('Desktop'), item: `https://antoniomdm.dev${localizedPath('/', locale)}` }];
  if (normalized !== '/') crumbs.push({ '@type': 'ListItem', position: 2, name: app.name, item: `https://antoniomdm.dev${localizedPath(routeApp ? normalized : app.path, locale)}` });
  if (project || note) crumbs.push({ '@type': 'ListItem', position: 3, name: title, item: canonical });
  schema.push({ '@type': 'BreadcrumbList', itemListElement: crumbs });
  return { title, description, canonical, note, schema: { '@context': 'https://schema.org', '@graph': schema } };
}
