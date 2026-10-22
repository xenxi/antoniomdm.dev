import type { UiData } from '../data/ui';

export const nativeChannel = 'antonios:godot:v1';
export type NativeCommand = { type: string; [key: string]: unknown };
export interface NativePanel { title: string; text: string; feedback: string; board?: { cells: number[]; label: string }; choices: { id: string; label: string; command: NativeCommand; disabled: boolean }[] }

export function readNativePanel(value: unknown): NativePanel | null {
  if (!value || typeof value !== 'object') return null;
  const panel = value as NativePanel;
  const commands = ['answer', 'sideAnswer', 'eventChoice', 'setTimerEnabled', 'closePanel', 'recoverEnergy', 'retryMission', 'startQuick', 'endQuick', 'confirmNewGame', 'newGame', 'snakeStep', 'snakeRestart'];
  if (typeof panel.title !== 'string' || typeof panel.text !== 'string' || typeof panel.feedback !== 'string' || !Array.isArray(panel.choices) || panel.choices.length > 100) return null;
  if (panel.board !== undefined && (!panel.board || typeof panel.board.label !== 'string' || !Array.isArray(panel.board.cells) || panel.board.cells.length !== 64 || panel.board.cells.some(cell => ![0, 1, 2].includes(cell)))) return null;
  return panel.choices.every(choice => choice && typeof choice.id === 'string' && typeof choice.label === 'string' && typeof choice.disabled === 'boolean' && choice.command && commands.includes(choice.command.type)) ? panel : null;
}

/** Resolve identifiers against public content; never navigate to a bridge-supplied URL.
 * Resuelve identificadores contra contenido público, nunca URLs suministradas por el puente. */
export function nativePortfolioPath(value: unknown, data: Pick<UiData, 'portfolio' | 'professionalExperience'>): string | null {
  if (!value || typeof value !== 'object') return null;
  const event = value as Record<string, unknown>;
  if (event.type !== 'portfolio' || typeof event.id !== 'string') return null;
  if (event.kind === 'experience' && data.professionalExperience.some(item => item.id === event.id)) return `/experience/#${encodeURIComponent(event.id)}`;
  if (event.kind === 'project') {
    const project = data.portfolio.projects.find(item => item.id === event.id);
    return project ? `/projects/${project.slug}/` : null;
  }
  if (event.kind === 'blog' && event.id === '') return '/blog/app/';
  if (event.kind === 'ai-lab' && event.id === '') return '/ai-lab/';
  return null;
}
