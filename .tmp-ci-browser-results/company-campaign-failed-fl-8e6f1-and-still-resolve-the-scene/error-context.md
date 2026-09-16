# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: company-campaign.spec.ts >> failed flat incidents lose their reward, persist and still resolve the scene
- Location: tests/e2e/company-campaign.spec.ts:37:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Return to mission', exact: true })
    - locator resolved to <button class="career-primary">Return to mission</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to desktop content" [ref=e2] [cursor=pointer]:
    - /url: "#desktop"
  - generic [ref=e4]:
    - generic [aria-hidden] [ref=e5]:
      - banner [ref=e6]:
        - link [ref=e7] [cursor=pointer]:
          - /url: /en/
          - strong [ref=e9]:
            - generic [ref=e10]: AntoñiOS
        - navigation [ref=e11]:
          - button [ref=e12] [cursor=pointer]: Apps
        - generic [ref=e13]: Personal operating system
        - generic [ref=e14]:
          - button [pressed] [ref=e15] [cursor=pointer]
          - navigation [ref=e19]:
            - link [ref=e20] [cursor=pointer]:
              - /url: /arcade/
              - text: ES
            - link [ref=e21] [cursor=pointer]:
              - /url: /en/arcade/
              - text: EN
          - generic [ref=e22]: ONLINE
          - time [ref=e24]: Tue 15 Sept, 16:09
      - main [ref=e25]:
        - navigation [ref=e26]:
          - link [ref=e27] [cursor=pointer]:
            - /url: /en/profile/
            - generic [ref=e31]: Profile
          - link [ref=e32] [cursor=pointer]:
            - /url: /en/background-processes/
            - generic [ref=e36]: Background processes
          - link [ref=e37] [cursor=pointer]:
            - /url: /en/architecture/
            - generic [ref=e41]: Architecture
          - link [ref=e42] [cursor=pointer]:
            - /url: /en/projects/
            - generic [ref=e46]: Projects
          - link [ref=e47] [cursor=pointer]:
            - /url: /en/ai-lab/
            - generic [ref=e51]: AI Lab
          - link [ref=e52] [cursor=pointer]:
            - /url: /en/notes/
            - generic [ref=e56]: Blog
          - link [ref=e57] [cursor=pointer]:
            - /url: /en/terminal/
            - generic [ref=e61]: Terminal
          - link [ref=e62] [cursor=pointer]:
            - /url: /en/arcade/
            - generic [ref=e66]: Arcade
          - link [ref=e67] [cursor=pointer]:
            - /url: /en/contact/
            - generic [ref=e71]: Contact
        - complementary [ref=e72]:
          - paragraph [ref=e73]:
            - generic [aria-hidden] [ref=e74]: ">_"
            - generic [ref=e75]: Open an application...
            - generic [ref=e76]: Ctrl + K
          - generic [ref=e77]: "Alt + arrows: move · Alt + Shift + arrows: resize · Esc: minimize"
        - complementary [ref=e78]:
          - generic [ref=e126]:
            - strong [ref=e127]: EVERYTHING WORKS.
            - generic [ref=e128]: Don't ask why...
            - generic [ref=e129]: "SYSTEM STATUS: PROBABLY FINE"
        - region [ref=e131]:
          - generic [ref=e132]:
            - generic [ref=e133]: Arcade.exe
            - generic [ref=e137]:
              - button [ref=e138] [cursor=pointer]: −
              - button [ref=e139] [cursor=pointer]: □
              - button [ref=e140] [cursor=pointer]: ×
          - generic [ref=e142]:
            - paragraph [ref=e143]: ANTONIOS.EXE / JOB ROUTE
            - heading [level=1] [ref=e144]: JOB ROUTE »
            - paragraph [ref=e145]: Your career is the campaign.
            - paragraph [ref=e146]: "Nine chapters with distinct settings: from shared-flat chaos to large offices and remote work. Complete four missions per company, resolve incidents, find giant phones and play Snake on the 3310. Then take on a seven-phase final challenge. Settings and challenges recreated with humor; a real professional career."
            - button [ref=e147] [cursor=pointer]: ENTER ↗
            - generic [ref=e148]:
              - link [ref=e149] [cursor=pointer]:
                - /url: /en/profile/
                - text: View full profile ↗
              - link [ref=e150] [cursor=pointer]:
                - /url: /en/experience/
                - text: Explore the career ↗
            - paragraph [ref=e151]: Exploration campaign or direct quick mission · music enabled by default · local saves · optional time challenges · Spanish and English.
            - group [ref=e152]:
              - generic [ref=e153]: The real career, no gameplay required
          - generic [ref=e154]:
            - generic [ref=e155]: Same person. Different reality.
            - generic [ref=e156]: AntoñiOS
      - contentinfo [ref=e166]:
        - button [ref=e167] [cursor=pointer]:
          - generic [ref=e169]: Apps
        - link [ref=e170] [cursor=pointer]:
          - /url: /en/profile/
        - navigation [ref=e174]:
          - button [pressed] [ref=e175] [cursor=pointer]
        - generic [ref=e179]:
          - link [ref=e180] [cursor=pointer]:
            - /url: /en/arcade/
          - button [pressed] [ref=e183] [cursor=pointer]: ♪
          - link [ref=e184] [cursor=pointer]:
            - /url: /en/settings/
          - link [ref=e187] [cursor=pointer]:
            - /url: /en/arcade/?view=reading
            - text: Reading view ↗
          - time [ref=e188]: Tue 15 Sept, 16:09
    - region "AntoñiOS Career Mode" [ref=e189]:
      - generic [ref=e190]:
        - generic [ref=e191]:
          - text: JOB ROUTE
          - generic [aria-hidden] [ref=e192]: »
          - generic [ref=e193]: ANTOÑIOS / COLOR
        - navigation "Career Mode navigation" [ref=e194]:
          - link "View full profile ↗" [ref=e195] [cursor=pointer]:
            - /url: /en/profile/
          - link "Español" [ref=e196] [cursor=pointer]:
            - /url: /arcade/?career=continue
            - text: ES
          - button "← Return to desktop" [ref=e197] [cursor=pointer]
      - generic [ref=e198]:
        - generic [ref=e199]:
          - heading "Freelance" [level=1] [ref=e200]
          - paragraph [ref=e201]: June 2013 — October 2014 · Web Developer
        - generic [ref=e202]:
          - button "Return to town" [ref=e203] [cursor=pointer]
          - button "Menu" [ref=e204] [cursor=pointer]
          - button "Pause" [ref=e205] [cursor=pointer]
      - generic [ref=e206]:
        - generic [ref=e207]:
          - generic [ref=e208]:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - strong: ANTONIO
                    - generic: LV. 1
                  - generic:
                    - text: CHAPTERS
                    - generic: 0 / 10
                    - progressbar "CHAPTERS 0 / 10"
                  - generic:
                    - text: MISSION
                    - generic: 1 / 4
                    - progressbar "MISSION 1 / 4"
                  - generic: Career Town
              - generic:
                - generic:
                  - paragraph: CURRENT OBJECTIVE
                  - strong: Layout against the clock
                  - generic:
                    - text: Freelance
                    - generic: E
                  - generic:
                    - generic: Energy 40%
                    - generic: No time limit
              - generic:
                - time: Sep 15, 2026, 04:08 PM ☼
                - paragraph: WORK TODAY. A FUTURE TOMORROW.
              - figure "SCENE MAP":
                - img "Scene floor plan and route to the current objective"
                - generic: Freelance
              - navigation "Menu" [ref=e209]:
                - button "M Map" [ref=e210] [cursor=pointer]:
                  - generic [ref=e211]: M
                  - text: Map
                - button "I Inventory" [ref=e212] [cursor=pointer]:
                  - generic [ref=e213]: I
                  - text: Inventory
                - button "J Jobs" [ref=e214] [cursor=pointer]:
                  - generic [ref=e215]: J
                  - text: Jobs
                - button "O Pause" [ref=e216] [cursor=pointer]:
                  - generic [ref=e217]: O
                  - text: Pause
            - 'group "Pixel art town: walk with arrows and interact with E" [ref=e218]':
              - iframe [aria-hidden] [ref=e220]:
                - generic "Pixel art map. Arrow keys or WASD to walk, E to interact, Escape to pause. Tab to leave the map." [ref=f1e2]
              - generic [ref=e221]:
                - link "Godot license" [ref=e222] [cursor=pointer]:
                  - /url: /licenses/godot.txt
                  - text: GODOT
                - button "Follow the character" [ref=e223] [cursor=pointer]
          - paragraph [ref=e224]: Arrows / WASD to walk · tap the floor to choose a destination or an object to approach it · E / space to interact · M for the map · hold the touch controls to walk.
          - generic [ref=e225]:
            - group "Movement" [ref=e226]:
              - button "Walk north" [disabled] [ref=e227]: ↑
              - button "Walk west" [disabled] [ref=e228]: ←
              - button "Walk south" [disabled] [ref=e229]: ↓
              - button "Walk east" [disabled] [ref=e230]: →
            - button "Interact E" [ref=e231] [cursor=pointer]
          - group [ref=e232]:
            - generic "Accessible direct interaction" [ref=e233] [cursor=pointer]
        - complementary [ref=e234]:
          - generic [ref=e235]:
            - paragraph [ref=e236]: Shared rental · rent and deadlines
            - paragraph [ref=e237]: Prepare the website for delivery and resolve flat incidents to regain focus.
          - generic [ref=e238]:
            - generic [ref=e239]:
              - text: Energy
              - strong [ref=e240]: 40/100
              - meter "Energy 40/100" [ref=e241]
            - generic [ref=e242] [cursor=pointer]:
              - checkbox "Time challenge" [ref=e243]
              - text: Time challenge
          - paragraph [ref=e244]: Main quest
          - heading "Layout against the clock" [level=2] [ref=e245]
          - paragraph [ref=e246]: The client reviews the site on a 360 px phone. A fixed 960 px column overflows. What would you test?
          - button "Open terminal mission →" [ref=e247] [cursor=pointer]
          - generic [ref=e248]: Accessible shortcut
          - paragraph [ref=e249]: Go to the marked objective and press E, or use the shortcut.
          - list "Chapter missions" [ref=e250]:
            - listitem [ref=e251]:
              - generic [aria-hidden] [ref=e252]: ✓
              - generic [ref=e253]:
                - text: Just change one button
                - generic [ref=e254]: Workstation
            - listitem [ref=e255]:
              - generic [aria-hidden] [ref=e256]: "02"
              - generic [ref=e257]:
                - text: Layout against the clock
                - generic [ref=e258]: Workstation
            - listitem [ref=e259]:
              - generic [aria-hidden] [ref=e260]: "03"
              - generic [ref=e261]:
                - text: Delivery works with a keyboard too
                - generic [ref=e262]: Review board
            - listitem [ref=e263]:
              - generic [aria-hidden] [ref=e264]: "04"
              - generic [ref=e265]:
                - text: Close scope, open the door
                - generic [ref=e266]: Flatmate
          - group [ref=e267]:
            - generic "Optional incidents · 4/4" [ref=e268] [cursor=pointer]
            - paragraph [ref=e269]: "Focus: flat distractions consume energy. Resolving them restores calm."
            - button "✓ A leak before deliveryResolved" [disabled] [ref=e270]
            - button "✓ No connection to send the deliveryResolved" [disabled] [ref=e271]
            - button "✓ The washer is leaking foamResolved" [disabled] [ref=e272]
            - button "✓ Half an hour to review the deliveryResolved" [disabled] [ref=e273]
          - progressbar "Main quest" [ref=e274]
          - link "View full experience ↗" [ref=e275] [cursor=pointer]:
            - /url: /en/experience/#freelance
          - group [ref=e276]:
            - generic "Decisions and evidence for this chapter" [ref=e277]
          - group [ref=e278]:
            - generic "Campaign journal · 0/10" [ref=e279] [cursor=pointer]
      - generic [ref=e280]:
        - strong [ref=e281]: Inventory
        - generic [ref=e282]: ▣ Phone
        - generic [ref=e283]: ◇ Knowledge
      - generic [ref=e284]:
        - generic [ref=e285]: Settings and anecdotes recreated with humor. Missions are simulations; professional experience is linked separately.
        - generic [ref=e286]:
          - 'button "Footsteps and doors: on" [pressed] [ref=e287] [cursor=pointer]'
          - button "Pause music" [ref=e288] [cursor=pointer]
          - generic [ref=e289]: Automatic local save
      - status [ref=e290]: "Check the marked objective on the map: every mission has its own location."
      - dialog [ref=e291]:
        - generic [ref=e293]:
          - paragraph [ref=e294]: JOB ROUTE / ANTOÑIOS
          - heading "Campaign journal" [level=2] [ref=e295]
        - paragraph [ref=e296]: "The review is finished before sending and rehearsal has a new time slot. +0 Energy. Reward lost due to an earlier mistake: resolving this incident no longer restores energy."
        - button "Return to mission" [active] [ref=e297] [cursor=pointer]
        - paragraph [ref=e298]:
          - link "View full profile ↗" [ref=e299] [cursor=pointer]:
            - /url: /en/profile/
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { chapters } from '../../src/arcade/campaign';
  3  | import { completeEvent, newGame, updateProgress } from '../../src/arcade/engine';
  4  | import { unlockBefore } from './career-fixture';
  5  | 
  6  | test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  7  | 
  8  | test('clock pauses, expires, can be disabled and survives the language switch', async ({ page }) => {
  9  |   const state = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, remaining: 5 });
  10 |   await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify(state));
  11 |   await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  12 |   await page.locator('[data-chapter="freelance"]').click();
  13 |   await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  14 |   await page.clock.install();
  15 |   await page.clock.runFor(2000);
  16 |   await page.getByRole('button', { name: 'Pause', exact: true }).click();
  17 |   await expect(page.getByRole('heading', { name: 'Paused', exact: true })).toBeVisible();
  18 |   const before = await page.locator('.quest-clock > span').textContent();
  19 |   await page.clock.fastForward(60000);
  20 |   await expect(page.locator('.quest-clock > span')).toHaveText(before!);
  21 |   await page.getByRole('button', { name: 'Resume game', exact: true }).last().click();
  22 |   await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  23 |   await expect(page.getByRole('dialog')).toBeVisible();
  24 |   const energyBeforeTimeout = Number(await page.locator('.quest-resources meter').getAttribute('value'));
  25 |   await page.clock.runFor(6000);
  26 |   await expect(page.locator('[data-choice="responsive-1"]')).toBeDisabled();
  27 |   await expect.poll(async () => Number(await page.locator('.quest-resources meter').getAttribute('value'))).toBeLessThan(energyBeforeTimeout);
  28 |   await page.getByRole('dialog').getByRole('button', { name: 'No time limit', exact: true }).click();
  29 |   await page.locator('[data-choice="responsive-1"]').click();
  30 |   await page.getByRole('button', { name: 'Return to mission', exact: true }).click();
  31 |   await page.locator('.career-world').getByRole('link', { name: 'Español', exact: true }).click();
  32 |   await expect(page).toHaveURL('/arcade/?career=continue');
  33 |   await expect(page.locator('.quest-timing-toggle input')).not.toBeChecked();
  34 |   await expect(page.locator('.chapter-missions .is-current')).toContainText('La entrega también se usa con teclado');
  35 | });
  36 | 
  37 | test('failed flat incidents lose their reward, persist and still resolve the scene', async ({ page }) => {
  38 |   const state = updateProgress(completeEvent(newGame(), 'freelance'), { mission: 1, energy: 100 });
  39 |   await page.addInitScript(save => { if (!localStorage.getItem('antonios:career:v1')) localStorage.setItem('antonios:career:v1', save); }, JSON.stringify({ ...state, timed: false }));
  40 |   await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click(); await page.locator('[data-chapter="freelance"]').click();
  41 |   await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  42 |   await page.locator('.career-scene').screenshot({ path: 'test-results/shared-flat-before.png' });
  43 |   for (const [id, correct] of [['leak', 0], ['cat', 1], ['foam', 2], ['noise', 0]] as const) {
  44 |     await page.locator(`[data-side="${id}"]`).click();
  45 |     await page.locator(`[data-side-choice="${(correct + 1) % 3}"]`).click();
  46 |     await expect(page.getByRole('dialog')).toContainText('Reward lost');
  47 |     await page.locator(`[data-side-choice="${correct}"]`).click();
> 48 |     await page.getByRole('button', { name: 'Return to mission', exact: true }).click();
     |                                                                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  49 |     await expect(page.locator(`[data-side="${id}"]`)).toBeDisabled();
  50 |   }
  51 |   await expect(page.locator('.quest-resources meter')).toHaveAttribute('value', '40');
  52 |   const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('antonios:career:v1')!));
  53 |   expect(saved.chapters.freelance.side).toEqual(['leak', 'cat', 'foam', 'noise']);
  54 |   expect(saved.chapters.freelance.failedSide).toEqual(['leak', 'cat', 'foam', 'noise']);
  55 |   await page.locator('.career-scene').screenshot({ path: 'test-results/shared-flat-after.png' });
  56 | });
  57 | 
  58 | test('every company renders its own world with four listed missions', async ({ page }) => {
  59 |   test.setTimeout(120000);
  60 |   await unlockBefore(page, 'system-recovery');
  61 |   await page.goto('/en/arcade/'); await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  62 |   for (const chapter of chapters) {
  63 |     await page.locator(`[data-chapter="${chapter.id}"]`).click();
  64 |     await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  65 |     await expect(page.locator('.godot-world')).toHaveAttribute('data-map', chapter.id);
  66 |     await expect(page.locator('.chapter-missions li')).toHaveCount(chapter.missions.length);
  67 |     await page.locator('.career-scene').screenshot({ path: `test-results/company-${chapter.id}.png` });
  68 |     const dialog = page.getByRole('dialog');
  69 |     if (await dialog.isVisible()) {
  70 |       const close = dialog.getByRole('button', { name: /^(?:Close|Return to mission)$/ });
  71 |       if (await close.count()) await close.first().click();
  72 |     }
  73 |     await page.getByRole('button', { name: 'Menu', exact: true }).click();
  74 |   }
  75 | });
  76 | 
```