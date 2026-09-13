import { describe, expect, it } from 'vitest';
import { chapters, missionById } from '../src/arcade/campaign';
import { chapterUnlocked, choose, completeEvent, eligibleEvents, enterCompany, newGame, parseSave, replayChapter, selectChapter, updateProgress } from '../src/arcade/engine';
import { makePixelMap, mapPath, mapWalkable, mapProject, mapTile } from '../src/arcade/pixel-map';
import { buildings, townCopy, townSpawn } from '../src/arcade/town';
import { readMapAction } from '../src/arcade/godot-bridge';

describe('Open town and chronological company doors', () => {
  it('shares the office character and projects every saved tile onto the illustrated city', () => {
    const town = makePixelMap('town', [], 'es'), office = makePixelMap('office', [], 'es');
    expect(town.sprite).toBe(office.sprite);
    expect(town.art).toBe('/images/job-route/neon-district.webp');
    expect(town.projection).toBe('isometric');
    for (let x = 0; x < town.width; x++) for (let y = 0; y < town.height; y++) {
      const p = mapProject(town, x + .5, y + .5);
      expect(mapTile(town, p.x, p.y)).toEqual({ x, y });
    }
    expect(town.objects.every(o => o.hitPolygon?.length === 6)).toBe(true);
  });
  it('allows every door to be reached while respecting buildings, trees and water', () => {
    const map = makePixelMap('town', [], 'es');
    expect(mapWalkable(map, townSpawn.x, townSpawn.y)).toBe(true);
    for (const b of buildings) {
      const path = mapPath(map, { x: 15, y: 11 }, { x: b.door.x, y: b.door.y + 1 });
      expect(path.length, b.id).toBeGreaterThan(0);
      expect(path.every(p => mapWalkable(map, p.x, p.y))).toBe(true);
      expect(mapWalkable(map, b.x, b.y)).toBe(false);
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
  it('preserves indoor and outdoor saves and rejects impossible world coordinates', () => {
    for (const state of [newGame(), enterCompany(newGame(), 'freelance')]) expect(parseSave(JSON.stringify(state))).toEqual(state);
    expect(parseSave(JSON.stringify({ ...newGame(), world: { x: 20, y: 9, inside: false } }))).toBeNull();
    const old = selectChapter(newGame(), 'xul'); delete old.world;
    expect(parseSave(JSON.stringify(old))).toEqual(old);
  });
  it('rejects distant doors, teleports, stale invalid actions and paused movement', () => {
    const state = { ...townSpawn, active: true, map: makePixelMap('town', [], 'es') };
    expect(readMapAction({ type: 'interact', id: 'freelance' }, state)).toEqual({ type: 'interact', id: 'freelance' });
    expect(readMapAction({ type: 'interact', id: 'nokia' }, state)).toBeNull();
    expect(readMapAction({ type: 'move', x: 14, y: 6 }, state)).toBeNull();
    expect(readMapAction({ type: 'move', x: 5, y: 6 }, { ...state, active: false })).toBeNull();
    for (const value of Object.values(townCopy)) { expect(value.es).toBeTruthy(); expect(value.en).toBeTruthy(); }
  });
});

