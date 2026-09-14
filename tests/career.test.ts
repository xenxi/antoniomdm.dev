import { finishSnake } from './campaign-fixture';
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { chapters, missions, missionById, copy, personalEvents, freelanceChapterIds } from '../src/arcade/campaign';
import { newGame, getProgress, selectChapter, choose, isComplete, parseSave, updateProgress, eligibleEvents, beginEvent, completeEvent, move, pathTo, objects, isWalkable } from '../src/arcade/engine';
import { getExperience } from '../src/data/professional';
import { getUiData } from '../src/data/ui';
import { render } from 'preact-render-to-string';
import CareerGame from '../src/arcade/CareerGame';
import { LocaleContext } from '../src/i18n/context';
import { h } from 'preact';
import { defaults } from '../src/os/preferences';

describe('Career Mode professional data boundary', () => {
  it('covers all nine experiences by reference and keeps the final boss separate', () => {
    expect(chapters.filter(chapter => chapter.id !== 'system-recovery').map(chapter => chapter.experienceId).sort()).toEqual(getExperience('es').map(job => job.id).sort());
    for (const chapter of chapters) {
      expect(Object.keys(chapter).sort()).toEqual(['experienceId', 'id', 'missions', 'scenario']);
      expect(chapter.missions.every(id => Boolean(missionById[id]))).toBe(true);
    }
    expect(new Set(missions.map(mission => mission.mechanic)).size).toBe(6);
    expect(chapters.at(-1)?.missions).toHaveLength(7);
  });
  it('reflects a canonical description or date edit without changing game configuration', () => {
    const data = getUiData('es', { notes: [] });
    data.professionalExperience.find(job => job.id === 'nokia')!.company = 'CANONICAL COMPANY EDIT';
    data.professionalExperience.find(job => job.id === 'nokia')!.period = 'CANONICAL PERIOD EDIT';
    const output = render(h(LocaleContext.Provider, { value: 'es', children: h(CareerGame, { data, content: { notes: [] }, preferences: defaults, exit() {}, navigate() {} }) }));
    expect(output).toContain('CANONICAL COMPANY EDIT');
    expect(output).toContain('CANONICAL PERIOD EDIT');
    expect(readFileSync('src/arcade/CareerGame.tsx', 'utf8')).toContain('job.summary');
    expect(readFileSync('src/arcade/CareerGame.tsx', 'utf8')).not.toMatch(/from ['"].*professional\/(model|selectors)/);
  });
  it('requires both languages throughout the narrative and no professional fields in personal events', () => {
    function check(value: unknown) {
      if (!value || typeof value !== 'object') return;
      if ('es' in value || 'en' in value) { expect(value).toHaveProperty('es'); expect(value).toHaveProperty('en'); expect((value as { es: string }).es.trim()).not.toBe(''); expect((value as { en: string }).en.trim()).not.toBe(''); }
      Object.values(value).forEach(check);
    }
    [copy, missions, personalEvents].forEach(check);
    expect(personalEvents.map(event => [event.id, event.occursDuringExperienceId])).toEqual([['wedding', 'nokia'], ['emma-born', 'domingo-alonso']]);
    expect(JSON.stringify(personalEvents)).not.toMatch(/competencyIds|achievementIds|\brole\b|\bcompany\b/);
    expect(freelanceChapterIds).toEqual(['freelance', 'la-salle', 'alcatel-lucent']);
  });
});

describe('Playable campaign', () => {
  it('completes every chapter independently and the boss requires all seven phases', () => {
    for (const chapter of chapters) {
      let state = selectChapter(newGame(), chapter.id);
      expect(isComplete(state)).toBe(false);
      for (const id of chapter.missions) {
        const mission = missionById[id];
        if (mission.challenge === 'snake') state = finishSnake(state);
        for (const answer of mission.sequence ?? [mission.choices.find(choice => choice.accepted)!.id]) {
          const result = choose(state, answer); expect(result.accepted, `${chapter.id}/${id}/${answer}`).toBe(true); state = result.state;
        }
      }
      expect(isComplete(state)).toBe(true);
      expect(parseSave(JSON.stringify(state))).toEqual(state);
    }
  });
  it('rejects wrong answers, permits distinct architecture trade-offs and retains partial traces', () => {
    let state = selectChapter(newGame(), 'domingo-alonso');
    expect(choose(state, 'noise').state).toEqual(state);
    state = choose(state, 'web').state;
    expect(getProgress(state).sequence).toEqual(['web']);
    expect(choose(state, 'sql').state).toEqual(state);
    expect(parseSave(JSON.stringify(state))).toEqual(state);
    state = updateProgress(state, { mission: 1, sequence: [] });
    expect(choose(state, 'rewrite').accepted).toBe(false);
    expect(choose(state, 'strangler').completed).toBe(true);
    expect(choose(state, 'projection').completed).toBe(true);
  });
  it('keeps interruptions resumable and ties later family events to personal unlocks', () => {
    let state = selectChapter(newGame(), 'la-salle'); state = choose(state, 'device').state;
    state = beginEvent(state, 'freelance');
    expect(getProgress(parseSave(JSON.stringify(state))!).seen).toContain('freelance');
    state = completeEvent(state, 'freelance'); expect(getProgress(state).sequence).toEqual(['device']);
    state = selectChapter(state, 'nokia'); expect(eligibleEvents(state)).toEqual(['wedding']);
    state = completeEvent(state, 'wedding'); state = selectChapter(state, 'anexia'); expect(eligibleEvents(state)).toContain('friday');
    state = selectChapter(state, 'system-recovery'); expect(eligibleEvents(state)).not.toContain('family');
    state = selectChapter(state, 'domingo-alonso'); state = completeEvent(state, 'emma-born');
    state = selectChapter(state, 'system-recovery'); expect(eligibleEvents(state)).toContain('family');
  });
  it('validates corrupted, incompatible and unsafe saves', () => {
    for (const raw of ['bad json', '{}', 'null', JSON.stringify({ ...newGame(), version: 2 }), JSON.stringify({ ...newGame(), chapterId: '__proto__' }), ' '.repeat(60001)]) expect(parseSave(raw)).toBeNull();
    for (const patch of [{ mission: 99 }, { x: -1 }, { x: 3, y: 8 }, { sequence: ['nope'] }, { seen: ['unknown'] }, { choices: ['unknown'] }, { completedEvents: ['wedding'] }]) expect(parseSave(JSON.stringify(updateProgress(newGame(), patch as never)))).toBeNull();
  });
  it('enforces collisions and finds walkable paths to each interactive object in every scene', () => {
    let state = newGame(); state = updateProgress(state, { x: 4, y: 4 });
    expect(move(state, 0, -1)).toEqual(state); expect(move(state, 2, 0)).toEqual(state);
    expect(getProgress(move(state, 1, 0)).x).toBe(5);
    for (const scenario of ['bedroom', 'office', 'network', 'city']) for (const object of objects) {
      const routes = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => pathTo({ x: 4, y: 7 }, { x: object.x + dx, y: object.y + dy }, scenario));
      expect(routes.some(route => route.length > 0)).toBe(true);
      routes.flat().forEach(point => expect(isWalkable(point.x, point.y, scenario)).toBe(true));
    }
  });
});
