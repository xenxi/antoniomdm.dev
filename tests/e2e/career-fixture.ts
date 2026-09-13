import type { Page } from '@playwright/test';
import { chapters, missionById } from '../../src/arcade/campaign';
import { choose, completeEvent, eligibleEvents, newGame, selectChapter } from '../../src/arcade/engine';

// Earn prerequisite progress through the real engine for isolated later-chapter tests.
export async function unlockBefore(page: Page, id: string) {
  let state = newGame();
  for (const chapter of chapters) {
    if (chapter.id === id) break;
    state = selectChapter(state, chapter.id);
    for (const id of chapter.missions) {
      const mission = missionById[id];
      for (const answer of mission.sequence ?? [mission.choices.find(c => c.accepted)!.id]) state = choose(state, answer).state;
    }
    while (eligibleEvents(state).length) state = completeEvent(state, eligibleEvents(state)[0]);
  }
  await page.addInitScript(save => localStorage.setItem('antonios:career:v1', save), JSON.stringify(state));
}
