import type { AppId, ApplicationDefinition } from './types';
import { profileSections } from './profile-sections';

const entries: [AppId, string, string, string][] = [
  ['welcome', 'Welcome', '/', 'Start here'], ['projects', 'Projects', '/projects/', 'Selected work'],
  ['experience', 'Experience', '/experience/', 'The career timeline'], ['blog', 'Blog', '/blog/app/', 'Questions, experiments and engineering notes'],
  ['lab', 'AI Lab', '/ai-lab/', 'Applied AI, clearly scoped'], ['about', 'Profile', '/profile/', 'The person behind the system'],
  ['background', 'Background processes', '/background-processes/', 'Personal processes still running'],
  ['terminal', 'Terminal', '/terminal/', 'A different way to navigate'],
  ['settings', 'Settings', '/settings/', 'Make yourself at home'], ['arcade', 'Arcade', '/arcade/', 'Same person. Different reality.'],
  ['architecture', 'Architecture', '/architecture/', 'Engineering decisions from discovery to production'], ['contact', 'Contact', '/contact/', 'Verified professional channels'],
];
export const applications: ApplicationDefinition[] = entries.map(([id,name,path,description], index) => ({
  id, name, path, description, icon: id, component: id,
  defaultSize: { width: id === 'about' ? 960 : id === 'architecture' || id === 'blog' ? 980 : 680, height: id === 'about' ? 660 : id === 'architecture' || id === 'blog' ? 720 : 510 },
  minSize: { width: 340, height: 280 }, initialPosition: id === 'about' ? { x: 264, y: 24 } : { x: 270 + index % 4 * 24, y: 40 + index % 4 * 24 },
  resizable: true, maximizable: true, singleInstance: true,
}));
export const registry = Object.fromEntries(applications.map(app => [app.id, app])) as Record<AppId, ApplicationDefinition>;
export const normalizePath = (path: string) => path === '/' ? '/' : `/${path.split('/').filter(Boolean).join('/')}/`;
export function appForPath(path: string): AppId | undefined {
  const clean = normalizePath(path);
  if (clean === '/' || clean === '/about/' || profileSections.some(section => section.path === clean)) return 'about';
  if (clean === '/ai-lab/' || clean.startsWith('/ai-lab/') || clean === '/ai/' || clean === '/lab/') return 'lab';
  return applications.find(app => app.path !== '/' && (clean === app.path || ((app.id === 'projects' || app.id === 'architecture') && clean.startsWith(app.path))))?.id;
}
export const desktopApplications: AppId[] = ['about', 'background', 'architecture', 'projects', 'blog', 'lab', 'terminal', 'arcade', 'contact'];
export const launcherApplications = [...desktopApplications, 'settings' as const].map(id => registry[id]);
