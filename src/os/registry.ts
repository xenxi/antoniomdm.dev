import type { AppId, ApplicationDefinition } from './types';
import { profileSections } from './profile-sections';

const entries: [AppId, string, string, string][] = [
  ['welcome', 'Welcome', '/', 'Start here'], ['projects', 'Projects', '/projects/', 'Selected work'],
  ['experience', 'Experience', '/experience/', 'The career timeline'], ['notes', 'Blog', '/notes/', 'Ideas and build logs'],
  ['lab', 'AI Lab', '/ai/', 'Applied AI, clearly scoped'], ['about', 'Profile', '/profile/', 'The person behind the system'],
  ['cv', 'CV', '/cv/', 'A printable profile'], ['terminal', 'Terminal', '/terminal/', 'A different way to navigate'],
  ['settings', 'Settings', '/settings/', 'Make yourself at home'], ['arcade', 'Arcade', '/arcade/', 'Same person. Different reality.'],
  ['architecture', 'Architecture', '/architecture/', 'Confirmed case-study structures'], ['contact', 'Contact', '/contact/', 'Verified professional channels'],
];
export const applications: ApplicationDefinition[] = entries.map(([id,name,path,description], index) => ({
  id, name, path, description, icon: id, component: id,
  defaultSize: { width: id === 'about' ? 960 : id === 'architecture' ? 920 : 680, height: id === 'about' ? 660 : id === 'architecture' ? 720 : 510 },
  minSize: { width: 340, height: 280 }, initialPosition: id === 'about' ? { x: 264, y: 24 } : { x: 270 + index % 4 * 24, y: 40 + index % 4 * 24 },
  resizable: true, maximizable: true, singleInstance: true,
}));
export const registry = Object.fromEntries(applications.map(app => [app.id, app])) as Record<AppId, ApplicationDefinition>;
export const normalizePath = (path: string) => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`;
export function appForPath(path: string): AppId | undefined {
  const clean = normalizePath(path);
  if (clean === '/' || clean === '/about/' || profileSections.some(section => section.path === clean)) return 'about';
  if (clean === '/blog/') return 'notes';
  if (clean === '/ai/' || clean === '/lab/') return 'lab';
  return applications.find(app => app.path !== '/' && (clean === app.path || ((app.id === 'projects' || app.id === 'notes' || app.id === 'architecture') && clean.startsWith(app.path))))?.id;
}
export const desktopApplications: AppId[] = ['about', 'architecture', 'projects', 'lab', 'notes', 'terminal', 'arcade', 'contact'];
export const launcherApplications = [...desktopApplications, 'settings' as const].map(id => registry[id]);
