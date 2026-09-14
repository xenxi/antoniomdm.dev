export type Direction = 'up' | 'down' | 'left' | 'right';
export interface Box { x: number; y: number; width: number; height: number }

export function directionFromKey(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp': return 'up';
    case 'ArrowDown': return 'down';
    case 'ArrowLeft': return 'left';
    case 'ArrowRight': return 'right';
    default: return null;
  }
}

const center = (box: Box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });
const overlaps = (a: number, aSize: number, b: number, bSize: number) => a < b + bSize && b < a + aSize;

/**
 * Returns the index of the candidate that best continues movement in `direction`
 * from `origin`, or -1 when nothing lies ahead. Only candidates in the requested
 * half-space count, so focus never wraps to a far element behind the origin.
 */
export function findDirectionalTarget(origin: Box, candidates: Box[], direction: Direction): number {
  const from = center(origin);
  let best = -1; let bestScore = Infinity;
  candidates.forEach((candidate, index) => {
    const to = center(candidate);
    const dx = to.x - from.x; const dy = to.y - from.y;
    let primary: number; let secondary: number; let aligned: boolean;
    if (direction === 'right') {
      if (dx <= 0.5) return;
      primary = dx; secondary = Math.abs(dy); aligned = overlaps(origin.y, origin.height, candidate.y, candidate.height);
    } else if (direction === 'left') {
      if (dx >= -0.5) return;
      primary = -dx; secondary = Math.abs(dy); aligned = overlaps(origin.y, origin.height, candidate.y, candidate.height);
    } else if (direction === 'down') {
      if (dy <= 0.5) return;
      primary = dy; secondary = Math.abs(dx); aligned = overlaps(origin.x, origin.width, candidate.x, candidate.width);
    } else {
      if (dy >= -0.5) return;
      primary = -dy; secondary = Math.abs(dx); aligned = overlaps(origin.x, origin.width, candidate.x, candidate.width);
    }
    const score = primary + secondary * (aligned ? 1.4 : 6);
    if (score < bestScore) { bestScore = score; best = index; }
  });
  return best;
}

/** Chooses an entry candidate when the focused element is a container and not a candidate itself. */
export function pickEntry(candidates: Box[], direction: Direction): number {
  if (!candidates.length) return -1;
  const backwards = direction === 'up' || direction === 'left';
  let best = 0; let bestScore = Infinity;
  candidates.forEach((box, index) => {
    const point = center(box);
    const score = backwards ? -(point.x + point.y) : point.x + point.y;
    if (score < bestScore) { bestScore = score; best = index; }
  });
  return best;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

export interface NavigationContext { root: HTMLElement; kind: 'dialog' | 'launcher' | 'window' | 'desktop' }

export function isTypingTarget(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element || typeof element.matches !== 'function') return false;
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT' || element.isContentEditable) return true;
  const role = element.getAttribute('role');
  return role === 'slider' || role === 'spinbutton' || role === 'listbox' || role === 'textbox' || role === 'combobox';
}

/** Highest-priority interactive context: modal dialog, launcher overlay, active window, desktop. */
export function resolveContext(os: HTMLElement): NavigationContext {
  const dialog = document.querySelector<HTMLElement>('dialog[open]');
  if (dialog) return { root: dialog, kind: 'dialog' };
  const launcher = os.querySelector<HTMLElement>('.launcher');
  if (launcher) return { root: launcher, kind: 'launcher' };
  const window = os.querySelector<HTMLElement>('.window.active:not([hidden])');
  if (window) return { root: window, kind: 'window' };
  return { root: os.querySelector<HTMLElement>('.desktop-surface') ?? os, kind: 'desktop' };
}

function isReachable(element: HTMLElement): boolean {
  if (element.tabIndex < 0) return false;
  if (element.hasAttribute('data-spatial-skip') || element.getAttribute('aria-hidden') === 'true') return false;
  if (element.closest('[hidden], [inert]')) return false;
  const rect = element.getBoundingClientRect();
  if (rect.width <= 1 || rect.height <= 1) return false;
  const style = getComputedStyle(element);
  return style.visibility !== 'hidden' && style.display !== 'none';
}

export function collectFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(element => element !== root && isReachable(element));
}

function focusElement(element: HTMLElement) {
  element.focus({ preventScroll: true });
  element.setAttribute('data-spatial-focus', '');
  element.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

/** Moves focus within the highest-priority context. Returns true when focus changed. */
export function navigateSpatial(os: HTMLElement, direction: Direction): boolean {
  const context = resolveContext(os);
  const candidates = collectFocusable(context.root);
  if (!candidates.length) return false;
  const boxes = candidates.map(element => element.getBoundingClientRect());
  const active = document.activeElement as HTMLElement | null;
  const inside = Boolean(active && context.root.contains(active) && candidates.includes(active));
  if (!inside) {
    const entry = pickEntry(boxes, direction);
    if (entry < 0) return false;
    focusElement(candidates[entry]);
    return true;
  }
  const index = findDirectionalTarget((active as HTMLElement).getBoundingClientRect(), boxes, direction);
  if (index < 0 || candidates[index] === active) return false;
  focusElement(candidates[index]);
  return true;
}
