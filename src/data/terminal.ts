import type { LocalizedText } from './professional/types';

export type TerminalAction = 'OUTPUT' | 'NAVIGATE' | 'EXTERNAL_LINK' | 'CLEAR' | 'THEME' | 'ARCADE' | 'REBOOT' | 'EASTER_EGG';

export interface TerminalCommandDefinition {
  id: string;
  label: LocalizedText;
  description: LocalizedText;
  action: TerminalAction;
  route?: string;
  externalLinkId?: 'github' | 'linkedin';
}

const text = (es: string, en: string): LocalizedText => ({ es, en });

export const terminalCommands: TerminalCommandDefinition[] = [
  { id: 'help', label: text('Ayuda', 'Help'), description: text('Muestra los comandos disponibles', 'List the available commands'), action: 'OUTPUT' },
  { id: 'whoami', label: text('Quién soy', 'Who I am'), description: text('Identidad profesional', 'Professional identity'), action: 'OUTPUT' },
  { id: 'profile', label: text('Perfil', 'Profile'), description: text('Abre el perfil', 'Open the profile'), action: 'NAVIGATE', route: '/profile/' },
  { id: 'experience', label: text('Experiencia', 'Experience'), description: text('Abre la trayectoria profesional', 'Open the career timeline'), action: 'NAVIGATE', route: '/experience/' },
  { id: 'architecture', label: text('Arquitectura', 'Architecture'), description: text('Abre los casos de estudio', 'Open the case studies'), action: 'NAVIGATE', route: '/architecture/' },
  { id: 'projects', label: text('Proyectos', 'Projects'), description: text('Abre los proyectos', 'Open the projects'), action: 'NAVIGATE', route: '/projects/' },
  { id: 'ai', label: text('IA', 'AI'), description: text('Abre el laboratorio de IA', 'Open the AI Lab'), action: 'NAVIGATE', route: '/ai-lab/' },
  { id: 'contact', label: text('Contacto', 'Contact'), description: text('Abre los canales profesionales', 'Open the professional channels'), action: 'NAVIGATE', route: '/contact/' },
  { id: 'cv', label: text('CV', 'CV'), description: text('Abre el CV', 'Open the CV'), action: 'NAVIGATE', route: '/cv/' },
  { id: 'github', label: text('GitHub', 'GitHub'), description: text('Muestra el perfil de GitHub', 'Show the GitHub profile'), action: 'EXTERNAL_LINK', externalLinkId: 'github' },
  { id: 'linkedin', label: text('LinkedIn', 'LinkedIn'), description: text('Muestra el perfil de LinkedIn', 'Show the LinkedIn profile'), action: 'EXTERNAL_LINK', externalLinkId: 'linkedin' },
  { id: 'clear', label: text('Limpiar', 'Clear'), description: text('Limpia la salida del terminal', 'Clear the terminal output'), action: 'CLEAR' },
  { id: 'theme', label: text('Tema', 'Theme'), description: text('Abre los ajustes del sistema', 'Open the system settings'), action: 'THEME', route: '/settings/' },
  { id: 'arcade', label: text('Arcade', 'Arcade'), description: text('Abre Arcade', 'Open Arcade'), action: 'ARCADE', route: '/arcade/' },
  { id: 'reboot', label: text('Reiniciar', 'Reboot'), description: text('Intento de reinicio decorativo', 'Decorative reboot attempt'), action: 'REBOOT' },
  { id: 'sudo', label: text('Sudo', 'Sudo'), description: text('Límite de seguridad decorativo', 'Decorative security boundary'), action: 'EASTER_EGG' },
];

export const terminalAliases: Record<string, string> = {
  about: 'profile',
  career: 'experience',
  work: 'experience',
  resume: 'cv',
};

export function resolveTerminalCommand(input: string): TerminalCommandDefinition | undefined {
  const token = input.trim().toLowerCase();
  if (!token) return undefined;
  const canonical = terminalAliases[token] ?? token;
  return terminalCommands.find(command => command.id === canonical);
}
