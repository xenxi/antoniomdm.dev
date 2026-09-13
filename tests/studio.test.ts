import { describe, expect, it } from 'vitest';
import { choose, newGame, parseSave, updateProgress } from '../src/arcade/engine';
import { makePixelMap, mapPath, mapWalkable } from '../src/arcade/pixel-map';
import { readMapAction } from '../src/arcade/godot-bridge';
import { studioObjects } from '../src/arcade/studio-layout';

describe('Illustrated Godot office', () => {
  const map = makePixelMap('office', [], 'es', 'Example');
  it('connects every walkable floor tile and every interaction to the entrance', () => {
    for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) {
      if (mapWalkable(map, x, y) && !(x === 4 && y === 7)) expect(mapPath(map, { x: 4, y: 7 }, { x, y }).length, `${x},${y}`).toBeGreaterThan(0);
    }
    for (const o of studioObjects) {
      expect(mapWalkable(map, o.x, o.y)).toBe(false);
      expect([[0, 1], [1, 0], [-1, 0], [0, -1]].some(([dx, dy]) => mapPath(map, { x: 4, y: 7 }, { x: o.x + dx, y: o.y + dy }).length > 0)).toBe(true);
    }
  });
  it('accepts the clicked object when two interactions share a neighboring tile', () => {
    const state = { map, x: 0, y: 2, active: true };
    for (const id of ['portal', 'secret']) expect(readMapAction({ type: 'interact', id }, state)).toEqual({ type: 'interact', id });
    expect(readMapAction({ type: 'interact', id: 'terminal' }, state)).toBeNull();
    expect(readMapAction({ type: 'interact', id: 'portal' }, { ...state, active: false })).toBeNull();
  });
  it('migrates old floor coordinates while preserving progress and rejects invalid new positions', () => {
    const old = { ...updateProgress(choose(newGame(), 'button').state, { x: 9, y: 1 }), layout: undefined };
    const migrated = parseSave(JSON.stringify(old))!;
    expect(migrated.layout).toBe(2);
    expect(migrated.chapters.freelance).toMatchObject({ x: 4, y: 7, mission: 1 });
    const current = updateProgress(newGame(), { x: 0, y: 2 });
    expect(parseSave(JSON.stringify(current))?.chapters.freelance).toMatchObject({ x: 0, y: 2 });
    expect(parseSave(JSON.stringify(updateProgress(newGame(), { x: 3, y: 8 })))).toBeNull();
  });
});
