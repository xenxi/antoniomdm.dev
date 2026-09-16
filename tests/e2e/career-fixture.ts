import { finishSnake } from '../campaign-fixture';
import { makeCompanyMap } from '../../src/arcade/company-scenes';
import { expect, type Page, type TestInfo } from '@playwright/test';
import { chapters, missionById } from '../../src/arcade/campaign';
import { choose, completeEvent, eligibleEvents, newGame, selectChapter } from '../../src/arcade/engine';

type DebugWindow = Window & { __CAREER_E2E_DEBUG_ENABLE__?: boolean; __CAREER_E2E_DEBUG__?: Record<string, unknown> };

export async function enableGodotE2EDebug(page: Page) {
  await page.addInitScript(() => { (window as DebugWindow).__CAREER_E2E_DEBUG_ENABLE__ = true; });
}

export async function dumpGodotDebug(page: Page, testInfo: TestInfo, label = 'failure') {
  const world = page.locator('.godot-world');
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  const [debug, worldState, canvasState] = await Promise.all([
    page.evaluate(() => (window as DebugWindow).__CAREER_E2E_DEBUG__ ?? null).catch(() => null),
    world.evaluate(element => {
      const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
      const centerX = rect.left + rect.width / 2, centerY = rect.top + rect.height / 2;
      const target = document.elementFromPoint(centerX, centerY) as HTMLElement | null;
      const active = document.activeElement as HTMLElement | null;
      const activeRect = active?.getBoundingClientRect();
      const dialog = active?.closest('[role="dialog"]') as HTMLElement | null;
      const scrollParent = active ? [active, ...active.parentElement ? [active.parentElement] : []].find(candidate => {
        const overflow = getComputedStyle(candidate).overflowY;
        return overflow === 'auto' || overflow === 'scroll';
      }) : null;
      return {
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        pointerEvents: style.pointerEvents,
        activeElement: active ? {
          tag: active.tagName,
          className: active.className,
          text: active.textContent?.trim(),
          rect: activeRect ? { x: activeRect.x, y: activeRect.y, width: activeRect.width, height: activeRect.height } : null,
          pointerEvents: getComputedStyle(active).pointerEvents,
          elementAtCenter: activeRect ? (() => { const at = document.elementFromPoint(activeRect.left + activeRect.width / 2, activeRect.top + activeRect.height / 2) as HTMLElement | null; return at ? { tag: at.tagName, className: at.className, text: at.textContent?.trim() } : null; })() : null,
          dialog: dialog ? { className: dialog.className, rect: dialog.getBoundingClientRect().toJSON() } : null,
          scrollTop: scrollParent?.scrollTop ?? null,
        } : null,
        elementAtCenter: target ? { tag: target.tagName, className: target.className } : null,
        scroll: { document: document.scrollingElement?.scrollTop ?? 0, world: element.scrollTop },
      };
    }).catch(() => null),
    canvas.evaluate(element => {
      const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
      const centerX = rect.left + rect.width / 2, centerY = rect.top + rect.height / 2;
      const target = document.elementFromPoint(centerX, centerY) as HTMLElement | null;
      return {
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
        buffer: { width: (element as HTMLCanvasElement).width, height: (element as HTMLCanvasElement).height },
        pointerEvents: style.pointerEvents,
        elementAtCenter: target ? { tag: target.tagName, id: target.id, className: target.className } : null,
        activeElement: document.activeElement instanceof HTMLElement ? { tag: document.activeElement.tagName, id: document.activeElement.id } : null,
        devicePixelRatio: devicePixelRatio,
      };
    }).catch(() => null),
  ]);
  await testInfo.attach(`godot-debug-${label}.json`, { body: Buffer.from(JSON.stringify({ debug, worldState, canvasState }, null, 2)), contentType: 'application/json' });
}

export async function clickCompanyObject(page: Page, chapter: string, id: string, marker = false, touch = false) {
  // data-map is React's intended map. data-godot-map is set only after the
  // real renderer has rebuilt that map's art, grid and input hitboxes.
  await expect(page.locator('.godot-world')).toHaveAttribute('data-godot-map', chapter);
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  const box = (await canvas.boundingBox())!;
  const object = makeCompanyMap(chapter, 'en', chapter).objects.find(o => o.id === id)!;
  const hit = object.hit!;
  const [x, y] = marker ? object.marker! : [hit[0] + hit[2] / 2, hit[1] + hit[3] / 2];
  const position = { x: x / 480 * box.width, y: y / 320 * box.height };
  await page.evaluate(interaction => {
    const target = window as DebugWindow;
    const debug = target.__CAREER_E2E_DEBUG__ ?? {};
    target.__CAREER_E2E_DEBUG__ = { ...debug, testInteraction: interaction };
  }, { chapter, id, marker, expectedLogical: { x, y }, box, position });
  if (touch) await canvas.tap({ position }); else await canvas.click({ position });
}

export async function clickCanvasPoint(page: Page, logical: { x: number; y: number }, id: string, touch = false) {
  const canvas = page.frameLocator('.godot-frame').locator('canvas');
  const box = (await canvas.boundingBox())!;
  const position = { x: logical.x / 480 * box.width, y: logical.y / 320 * box.height };
  await page.evaluate(interaction => {
    const target = window as DebugWindow;
    const debug = target.__CAREER_E2E_DEBUG__ ?? {};
    target.__CAREER_E2E_DEBUG__ = { ...debug, testInteraction: interaction };
  }, { id, expectedLogical: logical, box, position });
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
