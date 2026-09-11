import type { AppId } from '../os/types';
const paths: Record<AppId, string> = {
  architecture: 'M9 3h6v5H9z M3 16h6v5H3z M15 16h6v5h-6z M12 8v4 M6 16v-4h12v4',
  contact: 'M3 5h18v14H3z M3 6l9 7 9-7',
  welcome: 'M4 5h16v13H4z M4 9h16 M8 21h8 M12 18v3 M8 12l3 2-3 2 M13 16h3',
  projects: 'M3 7V5h7l2 3h9v12H3z M3 11h18',
  experience: 'M8 7V4h8v3 M3 7h18v13H3z M3 12h18 M10 11v3h4v-3',
  notes: 'M5 3h11l4 4v14H5z M16 3v5h4 M8 12h9 M8 16h7',
  lab: 'M9 3h6 M10 3v7l-6 9v2h16v-2l-6-9V3 M7 15h10 M10 18h1 M14 17h1',
  about: 'M9 3h6v2h2v7h-2v2H9v-2H7V5h2z M4 22v-4h3v-2h10v2h3v4',
  cv: 'M5 3h14v18H5z M8 7h3v3H8z M14 7h2 M14 10h2 M8 14h8 M8 18h8',
  terminal: 'M3 4h18v16H3z M7 9l4 3-4 3 M13 15h4',
  settings: 'M9 3h6v3h3v3h3v6h-3v3h-3v3H9v-3H6v-3H3V9h3V6h3z M9 9h6v6H9z',
  arcade: 'M5 3h14v12h2v6H3v-6h2z M8 6h8v6H8z M7 17h4 M9 15v4 M15 17h2',
};
export default function Icon({ name, className = '' }: { name: AppId; className?: string }) {
  return <svg class={`app-icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" aria-hidden="true"><path d={paths[name]} /></svg>;
}
