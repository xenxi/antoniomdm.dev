# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: company-campaign.spec.ts >> clock pauses, expires, can be disabled and survives the language switch
- Location: tests/e2e/company-campaign.spec.ts:8:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeDisabled() failed

Locator:  locator('[data-choice="responsive-1"]')
Expected: disabled
Received: undefined

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
                    - generic: Energy 79%
                    - generic: 0s
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
              - strong [ref=e240]: 79/100
              - meter "Energy 79/100" [ref=e241]
            - generic [ref=e242] [cursor=pointer]:
              - checkbox "Time challenge" [checked] [ref=e243]
              - text: Time challenge
            - generic [ref=e244]:
              - generic [ref=e245]: 0s
              - progressbar "Time challenge" [ref=e246]
              - status [ref=e247]: "Time is up: −15 energy and the current attempt resets. Completed missions are preserved. Restart the timer or continue without a limit."
              - button "Restart timer" [ref=e248] [cursor=pointer]
          - paragraph [ref=e249]: Main quest
          - heading "Layout against the clock" [level=2] [ref=e250]
          - paragraph [ref=e251]: The client reviews the site on a 360 px phone. A fixed 960 px column overflows. What would you test?
          - button "Open terminal mission →" [ref=e252] [cursor=pointer]
          - generic [ref=e253]: Accessible shortcut
          - paragraph [ref=e254]: Go to the marked objective and press E, or use the shortcut.
          - list "Chapter missions" [ref=e255]:
            - listitem [ref=e256]:
              - generic [aria-hidden] [ref=e257]: ✓
              - generic [ref=e258]:
                - text: Just change one button
                - generic [ref=e259]: Workstation
            - listitem [ref=e260]:
              - generic [aria-hidden] [ref=e261]: "02"
              - generic [ref=e262]:
                - text: Layout against the clock
                - generic [ref=e263]: Workstation
            - listitem [ref=e264]:
              - generic [aria-hidden] [ref=e265]: "03"
              - generic [ref=e266]:
                - text: Delivery works with a keyboard too
                - generic [ref=e267]: Review board
            - listitem [ref=e268]:
              - generic [aria-hidden] [ref=e269]: "04"
              - generic [ref=e270]:
                - text: Close scope, open the door
                - generic [ref=e271]: Flatmate
          - group [ref=e272]:
            - generic "Optional incidents · 0/4" [ref=e273] [cursor=pointer]
            - paragraph [ref=e274]: "Focus: flat distractions consume energy. Resolving them restores calm."
            - button "◇ A leak before delivery" [ref=e275] [cursor=pointer]
            - button "◇ No connection to send the delivery" [ref=e276] [cursor=pointer]
            - button "◇ The washer is leaking foam" [ref=e277] [cursor=pointer]
            - button "◇ Half an hour to review the delivery" [ref=e278] [cursor=pointer]
          - progressbar "Main quest" [ref=e279]
          - link "View full experience ↗" [ref=e280] [cursor=pointer]:
            - /url: /en/experience/#freelance
          - group [ref=e281]:
            - generic "Decisions and evidence for this chapter" [ref=e282]
          - group [ref=e283]:
            - generic "Campaign journal · 0/10" [ref=e284] [cursor=pointer]
      - generic [ref=e285]:
        - strong [ref=e286]: Inventory
        - generic [ref=e287]: ▣ Phone
        - generic [ref=e288]: ◇ Knowledge
      - generic [ref=e289]:
        - generic [ref=e290]: Settings and anecdotes recreated with humor. Missions are simulations; professional experience is linked separately.
        - generic [ref=e291]:
          - 'button "Footsteps and doors: on" [pressed] [ref=e292] [cursor=pointer]'
          - button "Pause music" [ref=e293] [cursor=pointer]
          - generic [ref=e294]: Automatic local save
      - status [ref=e295]: "Check the marked objective on the map: every mission has its own location."
      - dialog [ref=e296]:
        - generic [ref=e298]:
          - paragraph [ref=e299]: JOB ROUTE / ANTOÑIOS
          - heading "Layout against the clock" [level=2] [ref=e300]
        - paragraph [ref=e301]: Bug hunt
        - paragraph [ref=e302]: The client reviews the site on a 360 px phone. A fixed 960 px column overflows. What would you test?
        - paragraph [ref=e303]: Each mistake costs 15 energy and, in timed mode, 10 seconds. It resets the current sequence or route. At zero energy you must rest before continuing.
        - paragraph [ref=e304]: "Energy: 79/100"
        - generic [ref=e305]:
          - generic [ref=e306]: 0s
          - button "No time limit" [active] [ref=e307] [cursor=pointer]
        - generic [ref=e308]:
          - status [ref=e309]: "Time is up: −15 energy and the current attempt resets. Completed missions are preserved. Restart the timer or continue without a limit."
          - button "Restart timer" [ref=e310] [cursor=pointer]
        - generic [ref=e311]:
          - button "Hide all overflow" [disabled] [ref=e312]
          - 'button "width: 100%; max-width: 960px and check the content" [disabled] [ref=e313]'
          - button "Shrink all text to 8 px" [disabled] [ref=e314]
        - status [ref=e315]
        - button "Close" [ref=e316] [cursor=pointer]
        - paragraph [ref=e317]:
          - link "View full profile ↗" [ref=e318] [cursor=pointer]:
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
> 26 |   await expect(page.locator('[data-choice="responsive-1"]')).toBeDisabled();
     |                                                              ^ Error: expect(locator).toBeDisabled() failed
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
  48 |     await page.getByRole('button', { name: 'Return to mission', exact: true }).click();
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