import type { AppId, ApplicationDefinition } from './types';

const entries: [AppId, string, string, string][] = [
  ['welcome', 'Welcome', '/', 'Start here'], ['projects', 'Projects', '/projects/', 'Selected work'],
  ['experience', 'Experience', '/experience/', 'The career timeline'], ['notes', 'Notes', '/notes/', 'Ideas and build logs'],
  ['lab', 'Lab', '/lab/', 'A space to experiment'], ['about', 'About', '/about/', 'The person behind the system'],
  ['cv', 'CV', '/cv/', 'A printable profile'], ['terminal', 'Terminal', '/terminal/', 'A different way to navigate'],
  ['settings', 'Settings', '/settings/', 'Make yourself at home'], ['arcade', 'Arcade', '/arcade/', 'Same person. Different reality.'],
];
export const applications: ApplicationDefinition[] = entries.map(([id,name,path,description], index) => ({
  id, name, path, description, icon: id, component: id,
  defaultSize: { width: id === 'welcome' ? 720 : 680, height: id === 'welcome' ? 610 : 510 },
  minSize: { width: 340, height: 280 }, initialPosition: { x: 210 + index % 4 * 38, y: 64 + index % 4 * 32 },
  resizable: true, maximizable: true, singleInstance: true,
}));
export const registry = Object.fromEntries(applications.map(app => [app.id, app])) as Record<AppId, ApplicationDefinition>;
export const normalizePath = (path: string) => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`;
export function appForPath(path: string): AppId | undefined {
  const clean = normalizePath(path);
  if (clean === '/') return 'welcome';
  if (clean === '/blog/') return 'notes';
  return applications.find(app => app.path !== '/' && (clean === app.path || ((app.id === 'projects' || app.id === 'notes') && clean.startsWith(app.path))))?.id;
}
