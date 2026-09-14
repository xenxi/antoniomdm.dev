import { describe, it, expect } from 'vitest';
import { chapters, missionById } from '../src/arcade/campaign';
import { companyScenes, makeCompanyMap } from '../src/arcade/company-scenes';
import { mapPath, mapProject, mapTile, mapWalkable } from '../src/arcade/pixel-map';
import { questCopy, sideQuests } from '../src/arcade/quest-content';
import { choose, completeEvent, newGame, newQuickMission, parseSave, selectChapter, updateProgress, chapterUnlocked, replayChapter } from '../src/arcade/engine';
import { newSnake, stepSnake, validSnake } from '../src/arcade/snake';
import { finishSnake } from './campaign-fixture';

describe('Distinct company scenarios and four-mission campaign', () => {
  it('starts every quick challenge with fresh resources and no fabricated unlocks', () => {
    for (const chapter of chapters) for (const [index, id] of chapter.missions.entries()) {
      const run = newQuickMission(id, chapter.id)!;
      expect(run.chapterId).toBe(chapter.id);
      expect(run.chapters[chapter.id]).toMatchObject({ mission: index, sequence: [], choices: [], energy: 100 });
      expect(run.world?.inside).toBe(true);
      expect(run.cleared).toBeUndefined();
      expect(parseSave(JSON.stringify(run))).toEqual(run);
    }
    expect(newQuickMission('unknown')).toBeNull();
  });
  it('provides every main and side objective in a connected, collision-aware scene', () => {
    for (const chapter of chapters) {
      const map = makeCompanyMap(chapter.id, 'es', chapter.id), spawn = { x: 4, y: 7 };
      expect(mapWalkable(map, spawn.x, spawn.y)).toBe(true);
      expect(new Set(map.objects.map(o => o.id)).size).toBe(map.objects.length);
      expect(new Set(map.blocked.map(o => `${o.x},${o.y}`)).size).toBe(map.blocked.length);
      if (chapter.id !== 'system-recovery') expect(chapter.missions).toHaveLength(4);
      const targets = [...chapter.missions.map(id => missionById[id].target ?? 'terminal'), ...sideQuests.filter(s => s.chapter === chapter.id).map(s => s.target), 'coffee', 'portal'];
      for (const id of targets) {
        const object = map.objects.find(o => o.id === id)!;
        expect(object, `${chapter.id}/${id}`).toBeDefined();
        expect([[0, 1], [1, 0], [-1, 0], [0, -1]].some(([dx, dy]) => mapPath(map, spawn, { x: object.x + dx, y: object.y + dy }).length > 0), `${chapter.id}/${id}`).toBe(true);
      }
      for (let y = 0; y < map.height; y++) for (let x = 0; x < map.width; x++) {
        if (!mapWalkable(map, x, y) || x === spawn.x && y === spawn.y) continue;
        expect(mapPath(map, spawn, { x, y }).length, `${chapter.id}/${x},${y}`).toBeGreaterThan(0);
        const projected = mapProject(map, x + .5, y + .5);
        expect(mapTile(map, projected.x, projected.y)).toEqual({ x, y });
      }
    }
    expect(companyScenes.anexia.furniture.filter(f => f.kind === 'desk')).toHaveLength(10);
    expect(companyScenes['alcatel-lucent'].width).toBeGreaterThan(companyScenes.freelance.width);
    expect(new Set(Object.values(companyScenes).map(s => JSON.stringify(s.furniture))).size).toBe(chapters.length);
  });
  it('has bilingual scenarios, options, results and interface copy', () => {
    function check(value: unknown) {
      if (!value || typeof value !== 'object') return;
      if ('es' in value || 'en' in value) { expect(value).toMatchObject({ es: expect.any(String), en: expect.any(String) }); expect(Object.values(value).every(v => typeof v === 'string' && v.trim().length)).toBe(true); }
      Object.values(value).forEach(check);
    }
    [companyScenes, sideQuests, questCopy].forEach(check);
    for (const side of sideQuests) { expect(side.options.length).toBeGreaterThanOrEqual(3); expect(side.options[side.correct]).toBeDefined(); }
  });
  it('gates expired missions, retains progress when switching to untimed mode and validates saves', () => {
    const expired = updateProgress(newGame(), { remaining: 0, energy: 20, side: ['cat'] });
    expect(choose(expired, 'button').accepted).toBe(false);
    expect(choose({ ...expired, timed: false }, 'button').completed).toBe(true);
    expect(parseSave(JSON.stringify(expired))).toEqual(expired);
    for (const patch of [{ energy: -1 }, { energy: 101 }, { remaining: 999 }, { remaining: .5 }, { side: ['family-visit'] }, { snake: { score: 4 } }]) expect(parseSave(JSON.stringify(updateProgress(newGame(), patch as never)))).toBeNull();
  });
  it('migrates old office coordinates and preserves already earned company access', () => {
    const old = { ...selectChapter(newGame(), 'nokia'), layout: 2, cleared: ['freelance'] };
    const migrated = parseSave(JSON.stringify(old))!;
    expect(migrated.layout).toBe(3);
    expect(migrated.chapters.nokia).toMatchObject({ x: 4, y: 7, mission: 0 });
    expect(chapterUnlocked(migrated, 'nokia')).toBe(true);
    const oldFirstComplete = { ...completeEvent(choose(newGame(), 'button').state, 'freelance'), layout: 2 };
    expect(chapterUnlocked(parseSave(JSON.stringify(oldFirstComplete))!, 'xul')).toBe(true);
  });
  it('replaying an earned chapter resets a partially played challenge and clock', () => {
    const earned = { ...updateProgress(selectChapter(newGame(), 'nokia'), { mission: 2, remaining: 0, snake: newSnake() }), cleared: ['nokia'] };
    const replayed = replayChapter(earned);
    expect(replayed.chapters.nokia).toMatchObject({ mission: 0, energy: 100, remaining: undefined, snake: undefined });
    expect(parseSave(JSON.stringify(replayed))).toEqual(replayed);
  });
});

describe('3310 Snake routing challenge', () => {
  it('requires the actual four packets before accepting the mission answer', () => {
    const state = updateProgress(selectChapter(newGame(), 'nokia'), { mission: 2 });
    expect(choose(state, 'nokia-snake-0').accepted).toBe(false);
    const solved = finishSnake(state);
    expect(solved.chapters.nokia.snake).toMatchObject({ score: 4, failed: false });
    expect(choose(solved, 'nokia-snake-0').completed).toBe(true);
    expect(parseSave(JSON.stringify(solved))).toEqual(solved);
  });
  it('rejects reversal, walls, malformed bodies and movement after collision', () => {
    const collision = stepSnake(newSnake(), -1, 0);
    expect(collision.failed).toBe(true);
    expect(stepSnake(collision, 0, 1)).toBe(collision);
    let wall = newSnake(); for (let i = 0; i < 5; i++) wall = stepSnake(wall, 0, -1);
    expect(wall.failed).toBe(true);
    expect(validSnake(newSnake())).toBe(true);
    expect(validSnake({ ...newSnake(), body: [{ x: 99, y: 0 }] })).toBe(false);
    expect(validSnake({ ...newSnake(), score: 4 })).toBe(false);
  });
});
