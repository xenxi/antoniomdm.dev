import { finishSnake } from '../campaign-fixture';
import { makeCompanyMap } from '../../src/arcade/company-scenes';
import type { Page } from '@playwright/test';
import { chapters, missionById } from '../../src/arcade/campaign';
import { choose, completeEvent, eligibleEvents, newGame, selectChapter } from '../../src/arcade/engine';

export async function clickCompanyObject(page: Page, chapter: string, id: string, marker = false, touch = false) {
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  const box = (await canvas.boundingBox())!;
  const object = makeCompanyMap(chapter, 'en', chapter).objects.find(o => o.id === id)!;
  const hit = object.hit!;
  const [x, y] = marker ? object.marker! : [hit[0] + hit[2] / 2, hit[1] + hit[3] / 2];
  const position = { x: x / 480 * box.width, y: y / 320 * box.height };
  if (touch) await canvas.tap({ position }); else await canvas.click({ position });
}

// Earn prerequisite progress through the real engine for isolated later-chapter tests.
export async function unlockBefore(page: Page, id: string) {
  let state = newGame();
  for (const chapter of chapters) {
    if (chapter.id === id) break;
    state = selectChapter(state, chapter.id);
    for (const id of chapter.missions) {
      const mission = missionById[id];
        if (mission.challenge === 'snake') state = finishSnake(state);
      for (const answer of mission.sequence ?? [mission.choices.find(c => c.accepted)!.id]) state = choose(state, answer).state;
    }
    while (eligibleEvents(state).length) state = completeEvent(state, eligibleEvents(state)[0]);
  }
  await page.addInitScript(save => localStorage.setItem('antonios:career:v1', save), JSON.stringify(state));
}
