import { describe, expect, it } from 'vitest';
import { blockedTiles, readWorldAction } from '../src/arcade/godot-bridge';
import { chapters } from '../src/arcade/campaign';
import { pathTo } from '../src/arcade/engine';
import { worldCopy } from '../src/arcade/GodotWorld';

const state = { x: 4, y: 4, active: true, portalEnabled: false, scenario: 'bedroom' as const };
describe('Godot campaign boundary', () => {
  it('rejects jumps, blocked tiles, remote interactions and paused input', () => {
    for (const event of [null, { type: 'move', x: 9, y: 9 }, { type: 'move', x: 4, y: 3 }, { type: 'move', x: NaN, y: 4 }, { type: 'interact', id: 'coffee' }, { type: 'interact', id: '__proto__' }, { type: 'portal' }]) expect(readWorldAction(event, state)).toBeNull();
    expect(readWorldAction({ type: 'move', x: 5, y: 4 }, { ...state, active: false })).toBeNull();
    expect(readWorldAction({ type: 'move', x: 5, y: 4 }, state)).toEqual({ type: 'move', x: 5, y: 4 });
    expect(readWorldAction({ type: 'interact', id: 'terminal' }, state)).toEqual({ type: 'interact', id: 'terminal' });
  });
  it('opens a portal only after completion and within reach', () => {
    expect(readWorldAction({ type: 'portal' }, { ...state, portalEnabled: true })).toBeNull();
    expect(readWorldAction({ type: 'portal' }, { ...state, x: 8, y: 5 })).toBeNull();
    expect(readWorldAction({ type: 'portal' }, { ...state, x: 8, y: 5, portalEnabled: true })).toEqual({ type: 'portal' });
  });
  it('keeps the terminal and exit reachable in every scenario', () => {
    for (const chapter of chapters) {
      expect(blockedTiles(chapter.scenario)).toContainEqual({ x: 4, y: 3 });
      expect(pathTo({ x: 4, y: 7 }, { x: 4, y: 4 }, chapter.scenario).length).toBeGreaterThan(0);
      expect(pathTo({ x: 4, y: 4 }, { x: 8, y: 5 }, chapter.scenario).length).toBeGreaterThan(0);
    }
  });
  it('translates the loader, failures, controls and portal guidance', () => {
    for (const value of Object.values(worldCopy)) { expect(value.es).toBeTruthy(); expect(value.en).toBeTruthy(); }
  });
});
