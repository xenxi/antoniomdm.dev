import type { ContentData } from '../data/portfolio';
import type { Preferences } from '../os/preferences';
export interface ArcadeProps {
  content: ContentData; preferences: Preferences; exit: () => void; navigate: (path: string) => void;
}
/** Future engines must stop loops, release listeners and dispose audio on unmount. */
export interface ArcadeEngine {
  mount: (host: HTMLElement, props: ArcadeProps) => void;
  pause: () => void;
  dispose: () => void;
}
