import { chapters, freelanceChapterIds, missionById, personalEvents } from './campaign';
import { townSpawn, townWalkable } from './town';
import { makeCompanyMap } from './company-scenes';
import { mapWalkable } from './pixel-map';
import { sideQuests } from './quest-content';
import { validSnake, type SnakeState } from './snake';
import { studioWalkable } from './studio-layout';

export const saveKey = 'antonios:career:v1';
export type EventId = 'freelance' | 'incident' | 'wedding' | 'emma-born' | 'friday' | 'family';
export interface Progress { side?: string[]; failedSide?: string[]; energy?: number; remaining?: number; snake?: SnakeState; mission: number; sequence: string[]; x: number; y: number; seen: EventId[]; completedEvents: EventId[]; pendingPipeline: boolean; choices: string[] }
export interface GameState { version: 1; layout?: 2 | 3; timed?: boolean; chapterId: string; chapters: Record<string, Progress>; coffee: boolean; secret: boolean; world?: { x: number; y: number; inside: boolean }; cleared?: string[] }
export const freshProgress = (): Progress => ({ mission: 0, sequence: [], x: 4, y: 7, seen: [], completedEvents: [], pendingPipeline: false, choices: [], side: [], energy: 100 });
export const newGame = (): GameState => ({ version: 1, layout: 3, chapterId: chapters[0].id, chapters: { [chapters[0].id]: freshProgress() }, coffee: false, secret: false, world: { ...townSpawn, inside: false } });
// Standalone runs never grant campaign unlocks or write to the campaign save.
export function newQuickMission(missionId: string, chapterId?: string): GameState | null {
  const chapter = chapters.find(chapter => (!chapterId || chapter.id === chapterId) && chapter.missions.includes(missionId));
  if (!chapter) return null;
  return { ...newGame(), chapterId: chapter.id, chapters: { [chapter.id]: { ...freshProgress(), mission: chapter.missions.indexOf(missionId) } }, world: { ...townSpawn, inside: true } };
}
export function getProgress(state: GameState) { return state.chapters[state.chapterId] ?? freshProgress(); }
export function selectChapter(state: GameState, chapterId: string): GameState {
  if (!chapters.some(chapter => chapter.id === chapterId)) return state;
  return { ...state, chapterId, chapters: { ...state.chapters, [chapterId]: state.chapters[chapterId] ?? freshProgress() } };
}
export function updateProgress(state: GameState, patch: Partial<Progress>): GameState { return { ...state, chapters: { ...state.chapters, [state.chapterId]: { ...getProgress(state), ...patch } } }; }
export const isComplete = (state: GameState, chapterId = state.chapterId) => (state.chapters[chapterId]?.mission ?? 0) >= chapters.find(chapter => chapter.id === chapterId)!.missions.length;
// Failure rules live in the engine so campaign, quick play and restored saves agree.
export function failAttempt(state: GameState): GameState {
  const p = getProgress(state), mission = missionById[chapters.find(c => c.id === state.chapterId)!.missions[p.mission]];
  return updateProgress(state, { energy: Math.max(0, (p.energy ?? 100) - 15), sequence: [], snake: undefined,
    choices: mission ? p.choices.filter(id => !id.startsWith(`${mission.id}:`)) : p.choices,
    ...(mission && state.timed !== false ? { remaining: Math.max(0, (p.remaining ?? mission.seconds ?? 90) - 10) } : {}) });
}
export function tickMission(state: GameState): GameState {
  const p = getProgress(state), mission = missionById[chapters.find(c => c.id === state.chapterId)!.missions[p.mission]];
  if (!mission || state.timed === false || p.remaining === 0 || p.energy === 0) return state;
  const remaining = (p.remaining ?? mission.seconds ?? 90) - 1;
  const next = updateProgress(state, { remaining });
  return remaining === 0 ? failAttempt(next) : next;
}
export function recoverEnergy(state: GameState): GameState {
  const p = getProgress(state);
  return updateProgress(state, { energy: 100, ...(p.energy === 0 ? { sequence: [], snake: undefined, remaining: undefined,
    choices: p.choices.filter(id => !id.startsWith(`${chapters.find(c => c.id === state.chapterId)!.missions[p.mission]}:`)) } : {}) });
}
export function chooseSide(state: GameState, id: string, index: number): { state: GameState; accepted: boolean; reward: number } {
  const p = getProgress(state), side = sideQuests.find(q => q.id === id && q.chapter === state.chapterId);
  if (!side || p.energy === 0 || !Number.isInteger(index) || !side.options[index] || p.mission < (side.after ?? 0) || p.side?.includes(id)) return { state, accepted: false, reward: 0 };
  if (index !== side.correct) return { state: updateProgress(failAttempt(state), { failedSide: [...new Set([...(p.failedSide ?? []), id])] }), accepted: false, reward: 0 };
  const reward = p.failedSide?.includes(id) ? 0 : Math.min(20, 100 - (p.energy ?? 100));
  return { state: updateProgress(state, { side: [...(p.side ?? []), id], energy: (p.energy ?? 100) + reward }), accepted: true, reward };
}
export function choose(state: GameState, choiceId: string): { state: GameState; accepted: boolean; completed: boolean; feedback?: string } {
  const progress = getProgress(state); const chapter = chapters.find(chapter => chapter.id === state.chapterId)!;
  const mission = missionById[chapter.missions[progress.mission]];
  const choice = mission?.choices.find(choice => choice.id === choiceId);
  if (!choice || progress.energy === 0 || (state.timed !== false && progress.remaining === 0) || (mission.challenge === 'snake' && progress.snake?.score !== 4)) return { state, accepted: false, completed: false };
  const accepted = mission.sequence ? mission.sequence[progress.sequence.length] === choiceId : Boolean(choice.accepted);
  if (!accepted) return { state: failAttempt(state), accepted: false, completed: false, feedback: choiceId };
  const sequence = [...progress.sequence, choiceId]; const completed = !mission.sequence || sequence.length === mission.sequence.length;
  return { state: updateProgress(state, { sequence: completed ? [] : sequence, mission: progress.mission + (completed ? 1 : 0), choices: [...progress.choices, `${mission.id}:${choiceId}`], ...(completed ? { remaining: undefined, snake: undefined, energy: Math.max(0, (progress.energy ?? 100) - 10) } : {}) }), accepted: true, completed, feedback: choiceId };
}
export function hasEvent(state: GameState, event: EventId) { return Object.values(state.chapters).some(progress => progress.completedEvents.includes(event)); }
export function eligibleEvents(state: GameState): EventId[] {
  const progress = getProgress(state); const id = state.chapterId;
  const available: EventId[] = [];
  if (freelanceChapterIds.includes(id)) available.push('freelance');
  if (['alcatel-lucent', 'anexia', 'system-recovery'].includes(id)) available.push('incident');
  const chapter = chapters.find(chapter => chapter.id === id)!;
  for (const event of personalEvents) if (chapter.experienceId === event.occursDuringExperienceId && id !== 'system-recovery') available.push(event.id);
  if (id === 'anexia' && hasEvent(state, 'wedding')) available.push('friday');
  if ((id === 'domingo-alonso' || id === 'system-recovery') && hasEvent(state, 'emma-born')) available.push('family');
  return available.filter(event => !progress.seen.includes(event));
}
export function beginEvent(state: GameState, event: EventId): GameState { return updateProgress(state, { seen: [...new Set([...getProgress(state).seen, event])] }); }
export function completeEvent(state: GameState, event: EventId): GameState { return updateProgress(beginEvent(state, event), { completedEvents: [...new Set([...getProgress(state).completedEvents, event])] }); }

export function chapterCleared(state: GameState, id: string) {
  if (state.cleared?.includes(id)) return true;
  const selected = selectChapter(state, id), p = getProgress(selected);
  return isComplete(selected) && !p.pendingPipeline && !p.seen.some(event => !p.completedEvents.includes(event)) && eligibleEvents(selected).length === 0;
}
export function chapterUnlocked(state: GameState, id: string) {
  const index = chapters.findIndex(chapter => chapter.id === id);
  return index >= 0 && chapters.slice(0, index).every(chapter => chapterCleared(state, chapter.id));
}
export function enterCompany(state: GameState, id: string): GameState {
  if (!chapterUnlocked(state, id)) return state;
  return { ...selectChapter(state, id), world: { ...(state.world ?? townSpawn), inside: true } };
}
export function replayChapter(state: GameState): GameState {
  if (!chapterCleared(state, state.chapterId)) return state;
  const p = getProgress(state);
  return updateProgress({ ...state, cleared: [...new Set([...(state.cleared ?? []), state.chapterId])] }, { ...freshProgress(), failedSide: undefined, remaining: undefined, snake: undefined, seen: p.seen, completedEvents: p.completedEvents });
}

const events: EventId[] = ['freelance', 'incident', 'wedding', 'emma-born', 'friday', 'family'];
export function parseSave(value: string | null): GameState | null {
  if (!value || value.length > 60000) return null;
  try {
    const saved = JSON.parse(value);
    if (saved?.version !== 1 || !chapters.some(chapter => chapter.id === saved.chapterId) || !saved.chapters || typeof saved.chapters !== 'object' || Array.isArray(saved.chapters) || typeof saved.coffee !== 'boolean' || typeof saved.secret !== 'boolean') return null;
    if (saved.layout !== undefined && saved.layout !== 2 && saved.layout !== 3) return null;
    const result: GameState = { version: 1, layout: 3, chapterId: saved.chapterId, chapters: {}, coffee: saved.coffee, secret: saved.secret };
    if (saved.timed !== undefined) { if (typeof saved.timed !== 'boolean') return null; result.timed = saved.timed; }
    if (saved.world !== undefined) {
      if (!saved.world || !townWalkable(saved.world.x, saved.world.y) || typeof saved.world.inside !== 'boolean') return null;
      result.world = { x: saved.world.x, y: saved.world.y, inside: saved.world.inside };
    }
    if (saved.cleared !== undefined) {
      if (!Array.isArray(saved.cleared) || saved.cleared.length > chapters.length || saved.cleared.some((id: unknown) => !chapters.some(chapter => chapter.id === id))) return null;
      result.cleared = [...new Set<string>(saved.cleared)];
    }
    for (const [id, raw] of Object.entries(saved.chapters)) {
      const chapter = chapters.find(chapter => chapter.id === id); const p = raw as Progress;
      if (!chapter || !p || !Number.isInteger(p.mission) || p.mission < 0 || p.mission > chapter.missions.length || !(saved.layout === 3 ? mapWalkable(makeCompanyMap(id, 'es', id), p.x, p.y) : saved.layout === 2 ? studioWalkable(p.x, p.y) : isWalkable(p.x, p.y, chapter.scenario)) || typeof p.pendingPipeline !== 'boolean') return null;
      if (![p.seen, p.completedEvents, p.sequence, p.choices].every(Array.isArray)) return null;
      if (p.seen.some(id => !events.includes(id)) || p.completedEvents.some(id => !p.seen.includes(id)) || p.choices.length > 100) return null;
      const sequence = missionById[chapter.missions[p.mission]]?.sequence ?? [];
      if (p.sequence.length >= Math.max(1, sequence.length) || p.sequence.some((id, i) => id !== sequence[i])) return null;
      if (p.choices.some(value => typeof value !== 'string' || !chapter.missions.some(id => missionById[id].choices.some(choice => `${id}:${choice.id}` === value)))) return null;
      if (p.side !== undefined && (!Array.isArray(p.side) || p.side.some(q => !sideQuests.some(s => s.chapter === id && s.id === q)))) return null;
      if (p.failedSide !== undefined && (!Array.isArray(p.failedSide) || p.failedSide.some(q => !sideQuests.some(s => s.chapter === id && s.id === q)))) return null;
      if (p.energy !== undefined && (!Number.isFinite(p.energy) || p.energy < 0 || p.energy > 100)) return null;
      if (p.remaining !== undefined && (!Number.isInteger(p.remaining) || p.remaining < 0 || p.remaining > (missionById[chapter.missions[p.mission]]?.seconds ?? 90))) return null;
      if (p.snake !== undefined && (!validSnake(p.snake) || missionById[chapter.missions[p.mission]]?.challenge !== 'snake')) return null;
      const sameLayout = saved.layout === 3;
      result.chapters[id] = { mission: p.mission, sequence: [...p.sequence], x: sameLayout ? p.x : 4, y: sameLayout ? p.y : 7, seen: [...new Set(p.seen)], completedEvents: [...new Set(p.completedEvents)], pendingPipeline: p.pendingPipeline, choices: [...p.choices], side: [...new Set(p.side ?? [])], energy: p.energy ?? 100, ...(p.remaining !== undefined ? { remaining: p.remaining } : {}), ...(p.snake ? { snake: p.snake } : {}) };
      if (p.failedSide) result.chapters[id].failedSide = [...new Set(p.failedSide)];
    }
    if (saved.layout !== 3) {
      const currentIndex = chapters.findIndex(c => c.id === saved.chapterId);
      const previouslyCompleted = chapters.filter(chapter => {
        const progress = result.chapters[chapter.id];
        const oldMissionCount = chapter.id === 'system-recovery' ? 7 : chapter.id === 'domingo-alonso' ? 2 : 1;
        return progress && progress.mission >= oldMissionCount && !progress.pendingPipeline && !progress.seen.some(event => !progress.completedEvents.includes(event)) && eligibleEvents(selectChapter(result, chapter.id)).length === 0;
      }).map(chapter => chapter.id);
      result.cleared = [...new Set([...(result.cleared ?? []), ...chapters.slice(0, currentIndex).map(c => c.id), ...previouslyCompleted])];
    }
    if (!result.chapters[result.chapterId]) return null;
    return result;
  } catch { return null; }
}

export const objects = [
  { id: 'terminal', x: 4, y: 3 }, { id: 'team', x: 7, y: 5 }, { id: 'coffee', x: 2, y: 6 }, { id: 'secret', x: 8, y: 2 },
] as const;
export type ObjectId = typeof objects[number]['id'];
export function isWalkable(x: number, y: number, scenario: string) {
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || y < 1 || x > 9 || y > 9) return false;
  if (objects.some(object => object.x === x && object.y === y)) return false;
  return !((scenario === 'bedroom' && x <= 2 && y <= 3) || (scenario !== 'bedroom' && ((x <= 2 && y <= 3) || (x >= 7 && y >= 7))));
}
export function move(state: GameState, dx: number, dy: number): GameState {
  const p = getProgress(state); const chapter = chapters.find(chapter => chapter.id === state.chapterId)!;
  return Math.abs(dx) + Math.abs(dy) === 1 && isWalkable(p.x + dx, p.y + dy, chapter.scenario) ? updateProgress(state, { x: p.x + dx, y: p.y + dy }) : state;
}
export function nearby(x: number, y: number): ObjectId | undefined { return objects.find(object => Math.abs(object.x - x) + Math.abs(object.y - y) <= 1)?.id; }
export function pathTo(from: { x: number; y: number }, target: { x: number; y: number }, scenario: string): { x: number; y: number }[] {
  const queue = [[from]]; const visited = new Set([`${from.x},${from.y}`]);
  while (queue.length) {
    const path = queue.shift()!; const current = path[path.length - 1];
    if (current.x === target.x && current.y === target.y) return path.slice(1);
    for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const next = { x: current.x + dx, y: current.y + dy }; const key = `${next.x},${next.y}`;
      if (!visited.has(key) && isWalkable(next.x, next.y, scenario)) { visited.add(key); queue.push([...path, next]); }
    }
  }
  return [];
}
