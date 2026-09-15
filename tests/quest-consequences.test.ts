import { describe, it, expect } from 'vitest';
import { chapters, missionById } from '../src/arcade/campaign';
import { companyScenes } from '../src/arcade/company-scenes';
import { extraMissions, questCopy, sideQuests } from '../src/arcade/quest-content';
import { choose, chooseSide, failAttempt, getProgress, newGame, newQuickMission, parseSave, recoverEnergy, tickMission, updateProgress } from '../src/arcade/engine';
import { newSnake } from '../src/arcade/snake';

describe('Mission consequences', () => {
  it('charges every rejected quiz answer in both modes without advancing', () => {
    for (const chapter of chapters) for (const id of chapter.missions) {
      const mission = missionById[id];
      if (mission.challenge) continue;
      for (const option of mission.choices.filter(c => !c.accepted)) for (const timed of [true, false]) {
        const initial = { ...newQuickMission(id, chapter.id)!, timed };
        const result = choose(initial, option.id);
        expect(result.accepted).toBe(false);
        expect(getProgress(result.state)).toMatchObject({ energy: 85, mission: getProgress(initial).mission, sequence: [] });
        expect(getProgress(result.state).remaining).toBe(timed ? (mission.seconds ?? 90) - 10 : undefined);
        expect(parseSave(JSON.stringify(result.state))).toEqual(result.state);
      }
    }
  });
  it('loses only the current sequence on failure, keeps earlier missions and clamps resources', () => {
    let state = updateProgress(newQuickMission('distributed', 'system-recovery')!, { energy: 10, remaining: 3, choices: ['observe:dashboard'] });
    state = choose(state, 'web').state;
    state = choose(state, 'sql').state;
    expect(getProgress(state)).toMatchObject({ energy: 0, remaining: 0, sequence: [], choices: ['observe:dashboard'], mission: 1 });
    expect(choose({ ...state, timed: false }, 'web').state).toEqual({ ...state, timed: false });
    const recovered = recoverEnergy(state);
    expect(getProgress(recovered)).toMatchObject({ energy: 100, remaining: undefined, sequence: [], choices: ['observe:dashboard'], mission: 1 });
    expect(choose(recovered, 'web').accepted).toBe(true);
  });
  it('charges expiry once and does not restore a failed sequence when timing is disabled', () => {
    const initial = updateProgress(choose(newQuickMission('image')!, 'touch').state, { remaining: 1 });
    const expired = tickMission(initial);
    expect(getProgress(expired)).toMatchObject({ remaining: 0, energy: 85, sequence: [], choices: [] });
    expect(tickMission(expired)).toBe(expired);
    expect(choose(expired, 'touch').state).toBe(expired);
    const untimed = { ...expired, timed: false };
    expect(choose(untimed, 'touch').accepted).toBe(true);
    expect(tickMission(untimed)).toBe(untimed);
  });
  it('clears unfinished Snake routes on failed attempts and exhaustion recovery', () => {
    const state = updateProgress(newQuickMission('nokia-snake')!, { snake: newSnake(), energy: 15 });
    const failed = failAttempt(state);
    expect(getProgress(failed)).toMatchObject({ energy: 0, snake: undefined });
    expect(choose(failed, 'nokia-snake-0').state).toBe(failed);
    expect(getProgress(recoverEnergy(failed))).toMatchObject({ energy: 100, snake: undefined });
  });
  it('keeps a failed incident unresolved, persists the lost reward and prevents reward farming', () => {
    for (const side of sideQuests) {
      const initial = updateProgress(newQuickMission(chapters.find(c => c.id === side.chapter)!.missions[side.after ?? 0], side.chapter)!, { energy: 50 });
      const failure = chooseSide(initial, side.id, (side.correct + 1) % 3);
      expect(getProgress(failure.state)).toMatchObject({ energy: 35, side: [], failedSide: [side.id] });
      const restored = parseSave(JSON.stringify(failure.state))!;
      const fixed = chooseSide(restored, side.id, side.correct);
      expect(fixed).toMatchObject({ accepted: true, reward: 0 });
      expect(getProgress(fixed.state)).toMatchObject({ energy: 35, side: [side.id], failedSide: [side.id] });
      expect(chooseSide(fixed.state, side.id, side.correct).state).toBe(fixed.state);
      const clean = chooseSide(initial, side.id, side.correct);
      expect(clean.reward).toBe(20);
      expect(getProgress(clean.state).energy).toBe(70);
      expect(getProgress(recoverEnergy(failure.state)).failedSide).toEqual([side.id]);
    }
  });
  it('rejects unavailable incidents, invalid input and malformed failure saves', () => {
    for (const [id, index] of [['foam', 2], ['family-visit', 0], ['leak', -1], ['leak', 0.5], ['unknown', 0]] as const) {
      const initial = newGame(); expect(chooseSide(initial, id, index).state).toBe(initial);
    }
    const exhausted = updateProgress(newGame(), { energy: 0 });
    expect(chooseSide(exhausted, 'leak', 0).state).toBe(exhausted);
    for (const failedSide of ['leak', ['family-visit'], [123]]) expect(parseSave(JSON.stringify(updateProgress(newGame(), { failedSide } as never)))).toBeNull();
  });
});

describe('Player-facing quest content', () => {
  it('has complete translations and distinct failure feedback for all answers', () => {
    const check = (value: unknown) => {
      if (!value || typeof value !== 'object') return;
      if ('es' in value || 'en' in value) for (const locale of ['es', 'en']) expect((value as Record<string, unknown>)[locale]).toEqual(expect.stringMatching(/\S/));
      Object.values(value).forEach(check);
    };
    [missionById, sideQuests, questCopy].forEach(check);
    for (const mission of extraMissions) {
      expect(new Set(mission.choices.map(c => c.feedback.es)).size).toBe(mission.choices.length);
      expect(new Set(mission.choices.map(c => c.feedback.en)).size).toBe(mission.choices.length);
    }
    for (const side of sideQuests) side.options.forEach((_, index) => { if (index !== side.correct) expect(side.failures[index]).toBeDefined(); });
  });
  it('does not expose character design notes in mission or scene copy', () => {
    const content = JSON.stringify([missionById, sideQuests, Object.values(companyScenes).map(s => [s.description, s.furniture.map(f => f.label)])]);
    expect(content).not.toMatch(/coronilla|balding|nube discreta|discreet cloud|nube misteriosa|mysterious cloud|calzoncillos|underpants|bilirrubina|bilirubin|compañero bajito|short flatmate|opositor|exam candidate|compañero esqueleto|skeleton colleague/i);
  });
});
