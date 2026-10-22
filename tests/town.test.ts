import { finishSnake } from './campaign-fixture';
import { describe, expect, it } from 'vitest';
import { chapters, missionById } from '../src/arcade/campaign';
import { chapterUnlocked, choose, completeEvent, eligibleEvents, enterCompany, newGame, parseSave, replayChapter, selectChapter, updateProgress } from '../src/arcade/engine';
import { makePixelMap, mapPath, mapWalkable, mapProject, mapTile } from '../src/arcade/pixel-map';
import { buildings, townCopy, townSpawn } from '../src/arcade/town';
import { readMapAction } from '../src/arcade/godot-bridge';
import { hiringRequirements } from '../src/arcade/recruitment';
import { waterfrontTile } from '../src/arcade/waterfront-layout';
import { frontEdgeAt, occlusionEdgeAt, townForeground } from '../src/arcade/town-scene';

describe('Open town and chronological company doors', () => {
  it('explains real outstanding skills and distinguishes events from completed challenges', () => {
    const initial = newGame();
    expect(hiringRequirements(initial, 'freelance')).toEqual([]);
    expect(hiringRequirements(initial, 'unknown')).toEqual([]);
    expect(hiringRequirements(initial, 'xul')[0]).toMatchObject({ id: 'freelance', skills: ['bug', 'priority'], events: 1 });
    let solved = initial;
    for (const id of chapters[0].missions) solved = choose(solved, missionById[id].choices.find(c => c.accepted)!.id).state;
    expect(hiringRequirements(solved, 'xul')[0]).toMatchObject({ skills: [], events: 1, missions: chapters[0].missions.map(() => ({ done: true })) });
    const cleared = completeEvent(solved, 'freelance');
    expect(hiringRequirements(cleared, 'xul')).toEqual([]);
    expect(hiringRequirements(cleared, 'signlab').map(c => c.id)).toEqual(['xul']);
    expect(makePixelMap('town', [{ id: 'freelance', name: 'Freelance', unlocked: true, complete: true }], 'en').objects.slice(0, 2)).toMatchObject([{ locked: false, complete: true }, { locked: true, complete: false }]);
  });
  it('shares the office character and projects every saved tile onto the illustrated city', () => {
    const town = makePixelMap('town', [], 'es'), office = makePixelMap('office', [], 'es');
    expect(town.sprite).toBe(office.sprite);
    expect(town.art).toBe('/images/job-route/waterfront-city.webp');
    expect(town.projection).toBe('isometric');
    for (let x = 0; x < town.width; x++) for (let y = 0; y < town.height; y++) {
      const p = mapProject(town, x + .5, y + .5);
      expect(mapTile(town, p.x, p.y)).toEqual({ x, y });
    }
    expect(town.objects.every(o => (o.hitPolygon?.length ?? 0) >= 4)).toBe(true);
  });
  it('allows every door to be reached while respecting buildings, trees and water', () => {
    const map = makePixelMap('town', [], 'es');
    expect(mapWalkable(map, townSpawn.x, townSpawn.y)).toBe(true);
    for (const b of buildings) {
      const path = mapPath(map, townSpawn, b.door);
      expect(path.length, b.id).toBeGreaterThan(0);
      expect(path.every(p => mapWalkable(map, p.x, p.y))).toBe(true);
      const center = b.footprint.reduce((sum, p) => [sum[0] + p[0] / b.footprint.length, sum[1] + p[1] / b.footprint.length], [0, 0]);
      const tile = waterfrontTile(center[0], center[1]);
      expect(mapWalkable(map, tile.x, tile.y)).toBe(false);
    }
    expect(mapWalkable(map, 20, 9)).toBe(false);
    expect(mapWalkable(map, 3, 8)).toBe(false);
  });
  it('unlocks doors only after all preceding missions, events and repairs', () => {
    let state = newGame();
    for (const [index, chapter] of chapters.entries()) {
      expect(chapterUnlocked(state, chapter.id)).toBe(true);
      const next = chapters[index + 1];
      if (next) expect(enterCompany(state, next.id)).toBe(state);
      state = enterCompany(state, chapter.id);
      for (const id of chapter.missions) {
        const mission = missionById[id];
        if (mission.challenge === 'snake') state = finishSnake(state);
        for (const id of mission.sequence ?? [mission.choices.find(c => c.accepted)!.id]) state = choose(state, id).state;
      }
      if (next && eligibleEvents(state).length) expect(chapterUnlocked(state, next.id)).toBe(false);
      while (eligibleEvents(state).length) state = completeEvent(state, eligibleEvents(state)[0]);
      if (next) {
        expect(chapterUnlocked(updateProgress(state, { pendingPipeline: true }), next.id)).toBe(false);
        expect(chapterUnlocked(state, next.id)).toBe(true);
      }
    }
    expect(enterCompany(state, '__proto__')).toBe(state);
    state = replayChapter(selectChapter(state, 'freelance'));
    expect(state.chapters.freelance.mission).toBe(0);
    expect(chapterUnlocked(state, 'system-recovery')).toBe(true);
    expect(parseSave(JSON.stringify(state))).toEqual(state);
  });
  it('keeps stairs and the fountain promenade open while blocking planted beds and pool edges', () => {
    const map = makePixelMap('town', [], 'es');
    for (const tile of [{ x: 33, y: 31 }, { x: 34, y: 33 }, { x: 44, y: 47 }]) {
      expect(mapWalkable(map, tile.x, tile.y)).toBe(true);
      expect(mapPath(map, townSpawn, tile).length).toBeGreaterThan(0);
    }
    for (const tile of [{ x: 34, y: 31 }, { x: 37, y: 45 }, { x: 43, y: 44 }]) expect(mapWalkable(map, tile.x, tile.y)).toBe(false);
  });
  it('sorts sloping scenery by its local ground edge instead of hiding actors in front', () => {
    const diamond = [[0, 10], [10, 5], [20, 10], [10, 15]];
    expect(frontEdgeAt(diamond, 2)).toBe(11);
    expect(frontEdgeAt(diamond, 18)).toBe(11);
    expect(frontEdgeAt(diamond, 10)).toBe(15);
    expect(occlusionEdgeAt(diamond, 10)).toBeLessThan(11);
    const strips = townForeground();
    expect(strips.every(strip => Number.isFinite(strip.depth))).toBe(true);
    expect(strips.every(strip => Math.max(...strip.polygon.map(p => p[0])) - Math.min(...strip.polygon.map(p => p[0])) <= 4)).toBe(true);
    // At the stairs (256,160), the planter's local edge is behind the feet;
    // sorting the whole planter at its southern corner used to hide the actor.
    const planter = strips.filter(strip => strip.id === 'garden-0' && strip.polygon.some(p => p[0] <= 266) && strip.polygon.some(p => p[0] >= 246));
    expect(planter.length).toBeGreaterThan(0);
    expect(planter.every(strip => strip.depth < (160 + 100) / 4)).toBe(true);
  });
  it('preserves indoor and outdoor saves and rejects impossible world coordinates', () => {
    for (const state of [newGame(), enterCompany(newGame(), 'freelance')]) expect(parseSave(JSON.stringify(state))).toEqual(state);
    const relocated = parseSave(JSON.stringify({ ...newGame(), world: { x: 20, y: 9, inside: false } }));
    expect(relocated?.world).toEqual({ ...townSpawn, inside: false });
    expect(relocated?.chapters).toEqual(newGame().chapters);
    expect(parseSave(JSON.stringify({ ...newGame(), world: { x: 64, y: 9, inside: false } }))).toBeNull();
    const old = selectChapter(newGame(), 'xul'); delete old.world;
    expect(parseSave(JSON.stringify(old))).toEqual(old);
  });
  it('rejects distant doors, teleports, stale invalid actions and paused movement', () => {
    const state = { ...townSpawn, active: true, map: makePixelMap('town', [], 'es') };
    expect(readMapAction({ type: 'interact', id: 'freelance' }, state)).toEqual({ type: 'interact', id: 'freelance' });
    const nokia = buildings.find(b => b.id === 'nokia')!.door;
    expect(readMapAction({ type: 'interact', id: 'nokia', position: [nokia.x, nokia.y] }, state)).toEqual({ type: 'interact', id: 'nokia', position: [nokia.x, nokia.y] });
    expect(readMapAction({ type: 'interact', id: 'nokia', position: [4, 15] }, state)).toBeNull();
    expect(readMapAction({ type: 'interact', id: 'nokia' }, state)).toBeNull();
    expect(readMapAction({ type: 'move', x: 14, y: 6 }, state)).toBeNull();
    expect(readMapAction({ type: 'move', x: 5, y: 6 }, { ...state, active: false })).toBeNull();
    for (const value of Object.values(townCopy)) { expect(value.es).toBeTruthy(); expect(value.en).toBeTruthy(); }
  });
  it('moves old city saves to the new plaza without losing earned progress', () => {
    const previous = { ...newGame(), townLayout: undefined, world: { x: 4, y: 6, inside: false } };
    previous.chapters.freelance.energy = 55;
    const restored = parseSave(JSON.stringify(previous))!;
    expect(restored.world).toEqual({ ...townSpawn, inside: false });
    expect(restored.chapters).toEqual(previous.chapters);
  });
});

