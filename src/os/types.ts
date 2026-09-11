export type AppId = 'welcome' | 'projects' | 'experience' | 'notes' | 'lab' | 'about' | 'cv' | 'terminal' | 'settings' | 'arcade' | 'architecture' | 'contact';
export interface Rect { x: number; y: number; width: number; height: number }
export interface Size { width: number; height: number }
export interface WindowDefinition {
  defaultSize: Size; minSize: Size; initialPosition: { x: number; y: number };
  resizable: boolean; maximizable: boolean; singleInstance: true;
}
export interface ApplicationDefinition extends WindowDefinition {
  id: AppId; name: string; icon: AppId; component: AppId; path: string; description: string;
}
export interface WindowInstance {
  id: AppId; path: string; rect: Rect; state: 'normal' | 'minimized' | 'maximized';
  beforeMinimize?: 'normal' | 'maximized'; restoreRect?: Rect;
}
export interface DesktopState { openWindows: WindowInstance[]; activeWindowId: AppId | null; zOrder: AppId[] }
export type WindowAction =
  | { type: 'open'; id: AppId; path?: string; viewport: Size }
  | { type: 'close' | 'minimize' | 'restore' | 'focus' | 'maximize'; id: AppId }
  | { type: 'geometry'; id: AppId; rect: Rect; viewport: Size }
  | { type: 'viewport'; viewport: Size }
  | { type: 'reset' };
