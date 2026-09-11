import { registry } from './registry';
import type { DesktopState, Rect, Size, WindowAction, AppId } from './types';

export const initialState: DesktopState = { openWindows: [], activeWindowId: null, zOrder: [] };
export function clampRect(rect: Rect, viewport: Size, min: Size): Rect {
  const width = Math.min(Math.max(rect.width, min.width), viewport.width);
  const height = Math.min(Math.max(rect.height, min.height), viewport.height);
  return { width, height, x: Math.max(0, Math.min(rect.x, viewport.width - width)), y: Math.max(0, Math.min(rect.y, viewport.height - height)) };
}
function focus(state: DesktopState, id: AppId): DesktopState {
  if (!state.openWindows.some(w => w.id === id && w.state !== 'minimized')) return state;
  return { ...state, activeWindowId: id, zOrder: [...state.zOrder.filter(key => key !== id), id] };
}
function selectTop(state: DesktopState): DesktopState {
  const top = [...state.zOrder].reverse().find(id => state.openWindows.some(w => w.id === id && w.state !== 'minimized'));
  return { ...state, activeWindowId: top ?? null };
}
export function windowReducer(state: DesktopState, action: WindowAction): DesktopState {
  if (action.type === 'reset') return initialState;
  if (action.type === 'viewport') return { ...state, openWindows: state.openWindows.map(w => ({ ...w,
    rect: clampRect(w.rect, action.viewport, registry[w.id].minSize),
    restoreRect: w.restoreRect && clampRect(w.restoreRect, action.viewport, registry[w.id].minSize),
  })) };
  const current = state.openWindows.find(w => w.id === action.id);
  if (action.type === 'open') {
    if (current) return focus({ ...state, openWindows: state.openWindows.map(w => w.id === action.id ? {
      ...w, path: action.path ?? w.path, state: w.state === 'minimized' ? w.beforeMinimize ?? 'normal' : w.state,
    } : w) }, action.id);
    const app = registry[action.id];
    return focus({ ...state, openWindows: [...state.openWindows, { id: action.id, path: action.path ?? app.path,
      rect: clampRect({ ...app.initialPosition, ...app.defaultSize }, action.viewport, app.minSize), state: 'normal' }],
      zOrder: [...state.zOrder, action.id] }, action.id);
  }
  if (!current) return state;
  if (action.type === 'focus') return focus(state, action.id);
  if (action.type === 'close') return selectTop({ ...state, openWindows: state.openWindows.filter(w => w.id !== action.id), zOrder: state.zOrder.filter(id => id !== action.id) });
  if (action.type === 'minimize') {
    if (current.state === 'minimized') return state;
    return selectTop({ ...state, openWindows: state.openWindows.map(w => w.id === action.id ? { ...w, beforeMinimize: current.state as 'normal' | 'maximized', state: 'minimized' } : w) });
  }
  if (action.type === 'restore') return focus({ ...state, openWindows: state.openWindows.map(w => w.id === action.id ? { ...w, state: w.state === 'minimized' ? w.beforeMinimize ?? 'normal' : w.state } : w) }, action.id);
  if (action.type === 'maximize') {
    if (!registry[action.id].maximizable || current.state === 'minimized') return state;
    return focus({ ...state, openWindows: state.openWindows.map(w => w.id !== action.id ? w : w.state === 'maximized'
      ? { ...w, state: 'normal', rect: w.restoreRect ?? w.rect, restoreRect: undefined }
      : { ...w, state: 'maximized', restoreRect: { ...w.rect } }) }, action.id);
  }
  if (action.type === 'geometry' && current.state === 'normal') return { ...state, openWindows: state.openWindows.map(w => w.id === action.id ? { ...w, rect: clampRect(action.rect, action.viewport, registry[w.id].minSize) } : w) };
  return state;
}
export const minimizedWindows = (state: DesktopState) => state.openWindows.filter(w => w.state === 'minimized');
export const maximizedWindows = (state: DesktopState) => state.openWindows.filter(w => w.state === 'maximized');
