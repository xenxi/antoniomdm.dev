import { describe, expect, it } from 'vitest';
import { advanceMotion, avatarFrames, type Motion } from '../src/arcade/avatar';
import { makePixelMap, mapProject, mapTile, mapPath, mapWalkable } from '../src/arcade/pixel-map';
import { hudCopy } from '../src/arcade/GameHud';

describe('Directional animation and movement', () => {
  it('walks towards a tile without overshooting and derives facing from movement', () => {
    const start: Motion = { x: 4, y: 6, facing: 'down', travel: 0 };
    const moving = advanceMotion(start, { x: 5, y: 6 }, .016, false);
    expect(moving.x).toBeGreaterThan(4); expect(moving.x).toBeLessThan(5); expect(moving.y).toBe(6); expect(moving.facing).toBe('right');
    let settled = moving;
    for (let i = 0; i < 20; i++) settled = advanceMotion(settled, { x: 5, y: 6 }, .016, false);
    expect(settled.x).toBe(5); expect(settled.travel).toBeCloseTo(1);
    expect(advanceMotion(settled, { x: 5, y: 5 }, .016, false).facing).toBe('up');
    expect(advanceMotion(settled, { x: 4, y: 6 }, .016, false).facing).toBe('left');
  });
  it('snaps for reduced motion and bounds elapsed time after a suspended tab', () => {
    const start: Motion = { x: 4, y: 6, facing: 'down', travel: 0 };
    expect(advanceMotion(start, { x: 5, y: 6 }, .016, true).x).toBe(5);
    expect(advanceMotion(start, { x: 5, y: 6 }, 60, false).x).toBeLessThan(5);
  });
  it('provides a four-step cycle per direction, valid colors and bilingual HUD copy', () => {
    for (const frames of Object.values(avatarFrames)) {
      expect(frames).toHaveLength(4);
      expect(new Set(frames.map(frame => JSON.stringify(frame))).size).toBeGreaterThanOrEqual(3);
      for (const frame of frames) for (const [x, y, w, h, color] of frame) { expect(x).toBeGreaterThanOrEqual(0); expect(y).toBeGreaterThanOrEqual(0); expect(w).toBeGreaterThan(0); expect(h).toBeGreaterThan(0); expect(color).toMatch(/^#[a-f0-9]{6}$/i); }
    }
    expect(avatarFrames.left).not.toEqual(avatarFrames.right);
    expect(avatarFrames.up).not.toEqual(avatarFrames.down);
    for (const copy of Object.values(hudCopy)) { expect(copy.es.trim()).toBeTruthy(); expect(copy.en.trim()).toBeTruthy(); }
  });
});


describe('Isometric office navigation', () => {
  for (const scenario of ['bedroom', 'office', 'network']) it(scenario + ': screen coordinates resolve to the correct walkable tile and objects remain reachable', () => {
    const map = makePixelMap(scenario, [], 'en', 'Example');
    for (let x = 0; x < map.width; x++) for (let y = 0; y < map.height; y++) {
      const point = mapProject(map, x + .5, y + .5);
      expect(mapTile(map, point.x, point.y)).toEqual({ x, y });
    }
    for (const object of map.objects) {
      const routes = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dy]) => mapPath(map, { x: 4, y: 7 }, { x: object.x + dx, y: object.y + dy }));
      expect(routes.some(route => route.length > 0 && route.every(p => mapWalkable(map, p.x, p.y)))).toBe(true);
      expect(object.hit).toHaveLength(4);
    }
  });
});
