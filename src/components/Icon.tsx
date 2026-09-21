import type { AppId } from '../os/types';
const paths: Record<AppId, string> = {
  architecture: 'M9 3h6v5H9z M3 16h6v5H3z M15 16h6v5h-6z M12 8v4 M6 16v-4h12v4',
  contact: 'M3 5h18v14H3z M3 6l9 7 9-7',
  welcome: 'M4 5h16v13H4z M4 9h16 M8 21h8 M12 18v3 M8 12l3 2-3 2 M13 16h3',
  projects: 'M2 15l10 5 10-5v4l-10 5-10-5z M2 9l10 5 10-5v4l-10 5-10-5z M2 5l10-5 10 5-10 5z',
  experience: 'M2 4h8l3 3h9v14H2z M2 9h20',
  blog: 'M3 4h18v16H3z M3 8h18 M7 6h.01 M10 6h.01 M13 6h.01 M7 12l3 2-3 2 M12 16h5',
  lab: 'M9 3h6 M10 3v7l-6 9v2h16v-2l-6-9V3 M7 15h10 M10 18h1 M14 17h1',
  about: 'M9 3h6v2h2v7h-2v2H9v-2H7V5h2z M4 22v-4h3v-2h10v2h3v4',
  background: 'M4 4h7v6H4z M13 4h7v6h-7z M4 13h7v7H4z M13 13h7v7h-7z M6 7h3 M15 7h3 M6 16h3 M15 16h3',
  terminal: 'M3 4h18v16H3z M7 9l4 3-4 3 M13 15h4',
  settings: 'M9 3h6v3h3v3h3v6h-3v3h-3v3H9v-3H6v-3H3V9h3V6h3z M9 9h6v6H9z',
  arcade: 'M5 5h14v2h2v3h2v10h-5l-3-4H9l-3 4H1V10h2V7h2z M7 8v6 M4 11h6 M16 9h2 M19 12h2',
};
export default function Icon({ name, className = '' }: { name: AppId; className?: string }) {
  return <svg class={`app-icon app-icon-${name} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" aria-hidden="true"><path d={paths[name]} /></svg>;
}
