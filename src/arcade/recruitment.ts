import { chapters, missionById, text, type Mechanic } from './campaign';
import { chapterCleared, getProgress, selectChapter, eligibleEvents, type GameState } from './engine';

export const gameSkills: Record<Mechanic, ReturnType<typeof text>> = {
  bug: text('Depuración', 'Debugging'),
  trace: text('Diagnóstico de sistemas', 'Systems diagnosis'),
  bottleneck: text('Análisis de rendimiento', 'Performance analysis'),
  routing: text('Diseño de flujos', 'Flow design'),
  priority: text('Priorización y entrega', 'Prioritization and delivery'),
  architecture: text('Decisiones de arquitectura', 'Architecture decisions'),
};

// These are game objectives, never invented historical hiring requirements.
export function hiringRequirements(game: GameState, id: string) {
  const index = chapters.findIndex(chapter => chapter.id === id);
  const remaining = chapters.slice(0, Math.max(0, index)).filter(chapter => !chapterCleared(game, chapter.id));
  return remaining.map(chapter => {
    const selected = selectChapter(game, chapter.id), progress = getProgress(selected);
    const missions = chapter.missions.map((id, index) => ({ ...missionById[id], done: index < progress.mission }));
    const events = new Set([...eligibleEvents(selected), ...progress.seen.filter(id => !progress.completedEvents.includes(id))]);
    return { id: chapter.id, missions, skills: [...new Set(missions.filter(m => !m.done).map(m => m.mechanic))], events: events.size, repair: progress.pendingPipeline };
  });
}
