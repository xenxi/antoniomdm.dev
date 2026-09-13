import { chapters, freelanceChapterIds, missionById, personalEvents } from './campaign';

export const saveKey = 'antonios:career:v1';
export type EventId = 'freelance' | 'incident' | 'wedding' | 'emma-born' | 'friday' | 'family';
export interface Progress { mission: number; sequence: string[]; x: number; y: number; seen: EventId[]; completedEvents: EventId[]; pendingPipeline: boolean; choices: string[] }
export interface GameState { version: 1; chapterId: string; chapters: Record<string, Progress>; coffee: boolean; secret: boolean }
export const freshProgress = (): Progress => ({ mission: 0, sequence: [], x: 4, y: 7, seen: [], completedEvents: [], pendingPipeline: false, choices: [] });
export const newGame = (): GameState => ({ version: 1, chapterId: chapters[0].id, chapters: { [chapters[0].id]: freshProgress() }, coffee: false, secret: false });
export function getProgress(state: GameState) { return state.chapters[state.chapterId] ?? freshProgress(); }
export function selectChapter(state: GameState, chapterId: string): GameState {
  if (!chapters.some(chapter => chapter.id === chapterId)) return state;
  return { ...state, chapterId, chapters: { ...state.chapters, [chapterId]: state.chapters[chapterId] ?? freshProgress() } };
}
export function updateProgress(state: GameState, patch: Partial<Progress>): GameState { return { ...state, chapters: { ...state.chapters, [state.chapterId]: { ...getProgress(state), ...patch } } }; }
export const isComplete = (state: GameState, chapterId = state.chapterId) => (state.chapters[chapterId]?.mission ?? 0) >= chapters.find(chapter => chapter.id === chapterId)!.missions.length;
export function choose(state: GameState, choiceId: string): { state: GameState; accepted: boolean; completed: boolean; feedback?: string } {
  const progress = getProgress(state); const chapter = chapters.find(chapter => chapter.id === state.chapterId)!;
  const mission = missionById[chapter.missions[progress.mission]];
  const choice = mission?.choices.find(choice => choice.id === choiceId);
  if (!choice) return { state, accepted: false, completed: false };
  const accepted = mission.sequence ? mission.sequence[progress.sequence.length] === choiceId : Boolean(choice.accepted);
  if (!accepted) return { state, accepted: false, completed: false, feedback: choiceId };
  const sequence = [...progress.sequence, choiceId]; const completed = !mission.sequence || sequence.length === mission.sequence.length;
  return { state: updateProgress(state, { sequence: completed ? [] : sequence, mission: progress.mission + (completed ? 1 : 0), choices: [...progress.choices, `${mission.id}:${choiceId}`] }), accepted: true, completed, feedback: choiceId };
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

const events: EventId[] = ['freelance', 'incident', 'wedding', 'emma-born', 'friday', 'family'];
export function parseSave(value: string | null): GameState | null {
  if (!value || value.length > 60000) return null;
  try {
    const saved = JSON.parse(value);
    if (saved?.version !== 1 || !chapters.some(chapter => chapter.id === saved.chapterId) || !saved.chapters || typeof saved.chapters !== 'object' || Array.isArray(saved.chapters) || typeof saved.coffee !== 'boolean' || typeof saved.secret !== 'boolean') return null;
    const result: GameState = { version: 1, chapterId: saved.chapterId, chapters: {}, coffee: saved.coffee, secret: saved.secret };
    for (const [id, raw] of Object.entries(saved.chapters)) {
      const chapter = chapters.find(chapter => chapter.id === id); const p = raw as Progress;
      if (!chapter || !p || !Number.isInteger(p.mission) || p.mission < 0 || p.mission > chapter.missions.length || !isWalkable(p.x, p.y, chapter.scenario) || typeof p.pendingPipeline !== 'boolean') return null;
      if (![p.seen, p.completedEvents, p.sequence, p.choices].every(Array.isArray)) return null;
      if (p.seen.some(id => !events.includes(id)) || p.completedEvents.some(id => !p.seen.includes(id)) || p.choices.length > 100) return null;
      const sequence = missionById[chapter.missions[p.mission]]?.sequence ?? [];
      if (p.sequence.length >= Math.max(1, sequence.length) || p.sequence.some((id, i) => id !== sequence[i])) return null;
      if (p.choices.some(value => typeof value !== 'string' || !chapter.missions.some(id => missionById[id].choices.some(choice => `${id}:${choice.id}` === value)))) return null;
      result.chapters[id] = { mission: p.mission, sequence: [...p.sequence], x: p.x, y: p.y, seen: [...new Set(p.seen)], completedEvents: [...new Set(p.completedEvents)], pendingPipeline: p.pendingPipeline, choices: [...p.choices] };
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
