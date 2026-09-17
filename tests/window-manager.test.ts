import { describe, expect, it } from 'vitest';
import { initialState, windowReducer as reduce, minimizedWindows, maximizedWindows, clampRect } from '../src/os/window-manager';
import { appForPath, registry } from '../src/os/registry';
import { defaults, parsePreferences } from '../src/os/preferences';
import type { AppId } from '../src/os/types';

const viewport = { width: 1400, height: 850 };
const open = (state = initialState, id: AppId = 'projects', path?: string) => reduce(state, { type: 'open', id, path, viewport });
describe('WindowManager', () => {
  it('opens, closes and reopens an application without changing the registry', () => {
    const opened = open(); expect(opened.openWindows).toHaveLength(1);
    const closed = reduce(opened, { type: 'close', id: 'projects' });
    expect(closed.openWindows).toHaveLength(0); expect(closed.activeWindowId).toBeNull();
    expect(registry.projects.name).toBe('Projects'); expect(open(closed).openWindows).toHaveLength(1);
  });
  it('maintains one instance and updates the document deep link', () => {
    const state = open(open(), 'projects', '/projects/platform934/');
    expect(state.openWindows).toHaveLength(1); expect(state.openWindows[0].path).toBe('/projects/platform934/');
  });
  it('minimizes without closing and restores the same geometry', () => {
    const state = open(); const minimized = reduce(state, { type: 'minimize', id: 'projects' });
    expect(minimizedWindows(minimized)).toHaveLength(1); expect(minimized.activeWindowId).toBeNull();
    const restored = reduce(minimized, { type: 'restore', id: 'projects' });
    expect(restored.openWindows[0].rect).toEqual(state.openWindows[0].rect); expect(restored.activeWindowId).toBe('projects');
  });
  it('reopening a minimized application restores it', () => {
    const state = open(reduce(open(), { type: 'minimize', id: 'projects' }));
    expect(state.openWindows).toHaveLength(1); expect(state.openWindows[0].state).toBe('normal');
  });
  it('maximizes and unmaximizes to the exact previous rectangle', () => {
    const rect = { x: 115, y: 75, width: 730, height: 490 };
    const moved = reduce(open(), { type: 'geometry', id: 'projects', rect, viewport });
    const maximized = reduce(moved, { type: 'maximize', id: 'projects' });
    expect(maximizedWindows(maximized)).toHaveLength(1);
    const restored = reduce(maximized, { type: 'maximize', id: 'projects' }); expect(restored.openWindows[0].rect).toEqual(rect);
  });
  it('restores a minimized maximized window in maximized state', () => {
    const state = reduce(reduce(open(), { type: 'maximize', id: 'projects' }), { type: 'minimize', id: 'projects' });
    expect(reduce(state, { type: 'restore', id: 'projects' }).openWindows[0].state).toBe('maximized');
  });
  it('focuses with bounded z-order and selects the next visible window on close', () => {
    let state = open(open(), 'notes');
    for (let i = 0; i < 1000; i++) state = reduce(state, { type: 'focus', id: i % 2 ? 'notes' : 'projects' });
    expect(state.zOrder).toEqual(['projects', 'notes']); expect(state.activeWindowId).toBe('notes');
    const closed = reduce(state, { type: 'close', id: 'notes' }); expect(closed.activeWindowId).toBe('projects');
  });
  it('does not focus a minimized window accidentally', () => {
    const state = reduce(open(open(), 'notes'), { type: 'minimize', id: 'notes' });
    expect(reduce(state, { type: 'focus', id: 'notes' })).toEqual(state);
  });
  it('constrains geometry and reconciles viewport changes', () => {
    expect(clampRect({ x: -30, y: 2000, width: 9000, height: 10 }, viewport, registry.projects.minSize)).toEqual({ x: 0, y: 570, width: 1400, height: 280 });
    const state = reduce(open(), { type: 'viewport', viewport: { width: 390, height: 600 } });
    expect(state.openWindows[0].rect.x).toBe(0); expect(state.openWindows[0].rect.width).toBe(390);
  });
  it('ignores unknown closed instances and resets cleanly', () => {
    expect(reduce(initialState, { type: 'close', id: 'notes' })).toEqual(initialState);
    expect(reduce(open(), { type: 'reset' })).toEqual(initialState);
  });
  it.each(['/projects', '/projects/', '/projects/platform934/'])('deep link %s opens Projects', path => {
    const id = appForPath(path)!; expect(id).toBe('projects'); expect(open(initialState, id, path).activeWindowId).toBe('projects');
  });
  it('maps legacy blog and rejects unknown routes', () => { expect(appForPath('/blog/')).toBe('notes'); expect(appForPath('/missing/')).toBeUndefined(); });
});
describe('Preferences', () => {
  it('defaults arcade music on and preserves explicit mute preferences', () => { expect(defaults.music).toBe(true); expect(parsePreferences('{"music":false}').music).toBe(false); expect(parsePreferences('{"sound":false}').sound).toBe(false); expect(parsePreferences(null)).toEqual(defaults); expect(parsePreferences('{broken')).toEqual(defaults); expect(parsePreferences('null')).toEqual(defaults); });
  it('validates persisted types and discards unrelated fields', () => { expect(parsePreferences('{"sound":"true","wallpaper":"other","injected":1}')).toEqual(defaults); expect(parsePreferences('{"sound":true,"wallpaper":"midnight"}')).toEqual({ ...defaults, sound: true, wallpaper: 'midnight' }); expect(parsePreferences('{"sound":false}').sound).toBe(false); });
});
