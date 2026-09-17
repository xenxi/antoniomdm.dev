# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: career.spec.ts >> all chapters, personal unlocks and the seven-phase boss are playable end to end
- Location: tests/e2e/career.spec.ts:87:1

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('[data-choice="publish"]')
    - locator resolved to <button data-choice="publish">Publish design</button>

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
          - heading "Nokia" [level=1] [ref=e200]
          - paragraph [ref=e201]: January 2016 — May 2017 · .NET Developer
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
                    - generic: LV. 6
                  - generic:
                    - text: CHAPTERS
                    - generic: 5 / 10
                    - progressbar "CHAPTERS 5 / 10"
                  - generic:
                    - text: MISSION
                    - generic: 0 / 4
                    - progressbar "MISSION 0 / 4"
                  - generic: Career Town
              - generic:
                - generic:
                  - paragraph: CURRENT OBJECTIVE
                  - strong: From drawing to system
                  - generic:
                    - text: Nokia
                    - generic: E
                  - generic:
                    - generic: Energy 100%
                    - generic: 89s
              - generic:
                - time: Sep 15, 2026, 04:09 PM ☼
                - paragraph: WORK TODAY. A FUTURE TOMORROW.
              - figure "SCENE MAP":
                - img "Scene floor plan and route to the current objective"
                - generic: Nokia
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
                - generic "Pixel art map. Arrow keys or WASD to walk, E to interact, Escape to pause. Tab to leave the map." [ref=f6e2]
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
            - paragraph [ref=e236]: Network campus · the 3310 endures
            - paragraph [ref=e237]: A large engineering office, connectivity lab and free unlimited coffee beside the 3310 statue.
          - generic [ref=e238]:
            - generic [ref=e239]:
              - text: Energy
              - strong [ref=e240]: 100/100
              - meter "Energy 100/100" [ref=e241]
            - generic [ref=e242] [cursor=pointer]:
              - checkbox "Time challenge" [checked] [ref=e243]
              - text: Time challenge
            - generic [ref=e244]:
              - generic [ref=e245]: 89s
              - progressbar "Time challenge" [ref=e246]
          - paragraph [ref=e247]: Main quest
          - heading "From drawing to system" [level=2] [ref=e248]
          - paragraph [ref=e249]: "Arrange this fictional network design flow: import, validate, calculate, then publish."
          - button "Open terminal mission →" [ref=e250] [cursor=pointer]
          - generic [ref=e251]: Accessible shortcut
          - paragraph [ref=e252]: Go to the marked objective and press E, or use the shortcut.
          - list "Chapter missions" [ref=e253]:
            - listitem [ref=e254]:
              - generic [aria-hidden] [ref=e255]: "01"
              - generic [ref=e256]:
                - text: From drawing to system
                - generic [ref=e257]: Workstation
            - listitem [ref=e258]:
              - generic [aria-hidden] [ref=e259]: "02"
              - generic [ref=e260]:
                - text: The fiber that goes nowhere
                - generic [ref=e261]: Connectivity bench
            - listitem [ref=e262]:
              - generic [aria-hidden] [ref=e263]: "03"
              - generic [ref=e264]:
                - text: "3310: an indestructible route"
                - generic [ref=e265]: Nokia 3310 · Snake
            - listitem [ref=e266]:
              - generic [aria-hidden] [ref=e267]: "04"
              - generic [ref=e268]:
                - text: Coverage without shortcuts
                - generic [ref=e269]: Review board
          - progressbar "Main quest" [ref=e270]
          - paragraph [ref=e271]: 22:47 · … … … No calls. The freelance chain ends on reaching Nokia.
          - link "View full experience ↗" [ref=e272] [cursor=pointer]:
            - /url: /en/experience/#nokia
          - group [ref=e273]:
            - generic "Decisions and evidence for this chapter" [ref=e274]
          - group [ref=e275]:
            - generic "Campaign journal · 5/10" [ref=e276] [cursor=pointer]
      - generic [ref=e277]:
        - strong [ref=e278]: Inventory
        - generic [ref=e279]: ▣ Phone
        - generic [ref=e280]: ◇ Knowledge
      - generic [ref=e281]:
        - generic [ref=e282]: Settings and anecdotes recreated with humor. Missions are simulations; professional experience is linked separately.
        - generic [ref=e283]:
          - 'button "Footsteps and doors: on" [pressed] [ref=e284] [cursor=pointer]'
          - button "Pause music" [ref=e285] [cursor=pointer]
          - generic [ref=e286]: Automatic local save
      - status [ref=e287]: "Check the marked objective on the map: every mission has its own location."
      - dialog [ref=e288]:
        - generic [ref=e290]:
          - paragraph [ref=e291]: JOB ROUTE / ANTOÑIOS
          - heading "From drawing to system" [level=2] [ref=e292]
        - paragraph [ref=e293]: Flow routing
        - paragraph [ref=e294]: "Arrange this fictional network design flow: import, validate, calculate, then publish."
        - paragraph [ref=e295]: Each mistake costs 15 energy and, in timed mode, 10 seconds. It resets the current sequence or route. At zero energy you must rest before continuing.
        - paragraph [ref=e296]: "Energy: 100/100"
        - generic [ref=e297]:
          - generic [ref=e298]: 89s
          - button "No time limit" [ref=e299] [cursor=pointer]
        - paragraph [ref=e300]: Step 3 / 4
        - generic "Completed chapters" [ref=e301]:
          - generic [ref=e302]: ✓ Import geometry
          - generic [ref=e303]: ✓ Validate rules
        - generic [ref=e304]:
          - button "Calculate costs" [ref=e305] [cursor=pointer]
          - button "Publish design" [ref=e306] [cursor=pointer]
          - button "Validate rules" [disabled] [ref=e307]
          - button "Import geometry" [disabled] [ref=e308]
        - status [ref=e309]: Finding errors early prevents propagation.
        - button "Close" [ref=e310] [cursor=pointer]
        - paragraph [ref=e311]:
          - link "View full profile ↗" [ref=e312] [cursor=pointer]:
            - /url: /en/profile/
```

# Test source

```ts
  1   | import { makeCompanyMap } from '../../src/arcade/company-scenes';
  2   | import { snakeRoute } from '../campaign-fixture';
  3   | import { test, expect, type Page } from '@playwright/test';
  4   | import { unlockBefore } from './career-fixture';
  5   | import AxeBuilder from '@axe-core/playwright';
  6   | import { chapters, missionById } from '../../src/arcade/campaign';
  7   | 
  8   | test.use({ reducedMotion: 'reduce', launchOptions: { args: ['--enable-unsafe-swiftshader'] } });
  9   | test('a stylesheet failure returns to the launcher and explicit retry recovers', async ({ page }) => {
  10  |   await page.goto('/en/arcade/'); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  11  |   await page.route('**/arcade.*.css', route => route.abort());
  12  |   await page.getByRole('button', { name: 'ENTER' }).click();
  13  |   await expect(page.getByRole('status')).toContainText('Arcade could not load');
  14  |   await page.unroute('**/arcade.*.css');
  15  |   await page.getByRole('button', { name: 'ENTER' }).click();
  16  |   await expect(page.getByRole('region', { name: 'AntoñiOS Career Mode' })).toBeVisible();
  17  | });
  18  | async function enter(page: Page, path = '/en/arcade/') {
  19  |   await page.goto(path); await expect(page.locator('[data-ready="true"]')).toBeVisible();
  20  |   await page.getByRole('button', { name: 'ENTER', exact: false }).click();
  21  |   await expect(page.getByRole('region', { name: 'AntoñiOS Career Mode' })).toBeVisible();
  22  | }
  23  | async function dismiss(page: Page) { await page.getByRole('button', { name: 'Return to mission', exact: true }).click(); }
  24  | async function resolveEvent(page: Page) {
  25  |   const dialog = page.getByRole('dialog');
  26  |   if (await dialog.getByRole('button', { name: 'Accept', exact: true }).count()) {
  27  |     await dialog.getByRole('button', { name: 'Accept', exact: true }).click();
  28  |     await dialog.getByRole('button', { name: 'Restore the verified public URL' }).click();
  29  |   } else if (await dialog.getByRole('button', { name: 'Remember the rings' }).count()) await dialog.getByRole('button', { name: 'Remember the rings' }).click();
  30  |   else if (await dialog.getByRole('button', { name: 'Welcome, Emma' }).count()) await dialog.getByRole('button', { name: 'Welcome, Emma' }).click();
  31  |   else if (await dialog.getByRole('button', { name: 'Go home', exact: true }).count()) await dialog.getByRole('button', { name: 'Go home', exact: true }).click();
  32  |   else await dialog.getByRole('button', { name: 'Notify the team and ask for cover' }).click();
  33  |   await dismiss(page);
  34  | }
  35  | 
  36  | test('keyboard movement, collision, touch controls, save and language continuation', async ({ page }) => {
  37  |   await enter(page); await page.getByRole('button', { name: 'New game', exact: false }).click();
  38  |   const map = page.locator('.godot-world'); await expect(map).toHaveAttribute('data-engine', 'ready', { timeout: 60000 }); await map.focus();
  39  |   await expect(map).toHaveAttribute('data-map', 'town');
  40  |   await page.keyboard.press('e');
  41  |   await expect(map).toHaveAttribute('data-map', 'freelance'); await map.focus();
  42  |   await page.keyboard.press('ArrowUp'); await expect(map).toHaveAttribute('data-player', '4,6');
  43  |   await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowDown');
  44  |   await expect(map).toHaveAttribute('data-player', '3,7');
  45  |   await page.keyboard.press('e'); await expect(page.getByRole('dialog')).toContainText('Just change one button');
  46  |   await page.locator('[data-choice="input"]').click(); await expect(page.locator('.career-feedback')).toContainText('required field');
  47  |   await page.getByRole('button', { name: 'Close', exact: true }).click();
  48  |   await page.locator('.career-world').getByRole('link', { name: 'Español', exact: true }).click();
  49  |   await expect(page).toHaveURL('/arcade/?career=continue');
  50  |   await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  51  |   await expect(page.locator('.godot-world')).toHaveAttribute('data-player', '3,7');
  52  |   await page.getByRole('button', { name: 'Caminar al este', exact: true }).click();
  53  |   await expect(page.locator('.godot-world')).toHaveAttribute('data-player', '4,7');
  54  |   await page.getByRole('button', { name: 'Pausar', exact: true }).click();
  55  |   await expect(page.getByRole('heading', { name: 'En pausa', exact: true })).toBeVisible();
  56  |   await page.getByRole('button', { name: 'Volver al juego', exact: true }).last().click();
  57  |   await page.locator('.career-quest-panel').getByRole('button', { name: 'Abrir misión del terminal' }).click();
  58  |   await page.locator('[data-choice="button"]').click();
  59  |   await page.getByRole('button', { name: 'Volver a la misión' }).click();
  60  |   for (const id of chapters[0].missions.slice(1)) {
  61  |     await page.locator('.career-quest-panel').getByRole('button', { name: 'Abrir misión del terminal' }).click();
  62  |     await page.locator('[data-choice="' + missionById[id].choices.find(c => c.accepted)!.id + '"]').click();
  63  |     await page.getByRole('button', { name: 'Volver a la misión' }).click();
  64  |   }
  65  |   await expect(page.getByRole('dialog')).toContainText('Cliente freelance');
  66  |   await page.getByRole('button', { name: 'Aceptar', exact: true }).click();
  67  |   await page.getByRole('button', { name: 'Restaurar la URL pública verificada' }).click();
  68  |   await page.getByRole('button', { name: 'Volver a la misión' }).click();
  69  |   await expect(page.locator('.career-quest-panel').getByRole('button', { name: 'Volver a la ciudad', exact: false })).toBeVisible();
  70  |   await page.getByRole('link', { name: 'Ver experiencia completa' }).click();
  71  |   await expect(page).toHaveURL('/experience/#freelance');
  72  |   await expect(page.locator('#freelance')).toBeVisible();
  73  |   await expect(page.locator('#freelance')).toHaveAttribute('open', '');
  74  | });
  75  | 
  76  | test('tapping an elevated terminal sprite walks to it and opens its mission', async ({ page }) => {
  77  |   await unlockBefore(page, 'signlab'); await page.setViewportSize({ width: 390, height: 844 }); await enter(page);
  78  |   await page.locator('[data-chapter="signlab"]').click();
  79  |   await expect(page.locator('.godot-world')).toHaveAttribute('data-engine', 'ready', { timeout: 60000 });
  80  |   const map = page.frameLocator('.godot-frame').locator('canvas'); const box = (await map.boundingBox())!;
  81  |   const hit = makeCompanyMap('signlab', 'en', 'Signlab').objects.find(o => o.id === 'terminal')!.hit!;
  82  |   await map.click({ position: { x: (hit[0] + hit[2] / 2) / 480 * box.width, y: (hit[1] + hit[3] / 2) / 320 * box.height } });
  83  |   await expect(page.getByRole('dialog')).toContainText('Connect the interaction');
  84  |   await expect(page.locator('.godot-world')).not.toHaveAttribute('data-player', '4,7');
  85  | });
  86  | 
  87  | test('all chapters, personal unlocks and the seven-phase boss are playable end to end', async ({ page }) => {
  88  |   test.setTimeout(120000);
  89  |   await enter(page);
  90  |   for (const chapter of chapters) {
  91  |     await page.locator(`[data-chapter="${chapter.id}"]`).click();
  92  |     for (const id of chapter.missions) {
  93  |       await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  94  |       const mission = missionById[id];
  95  |       if (mission.challenge === 'snake') for (const [dx, dy, count] of snakeRoute) for (let i = 0; i < count; i++) await page.locator('.snake-controls').getByRole('button', { name: dx === 1 ? 'Right' : dx === -1 ? 'Left' : dy === 1 ? 'Down' : 'Up', exact: true }).click();
> 96  |       for (const choice of mission.sequence ?? [mission.choices.find(choice => choice.accepted)!.id]) await page.locator(`[data-choice="${choice}"]`).click();
      |                                                                                                                                                       ^ Error: locator.click: Test timeout of 120000ms exceeded.
  97  |       await dismiss(page);
  98  |     }
  99  |     // Every required event is exposed before the next chapter can be entered.
  100 |     const expectedEvents = chapter.id === 'freelance' || chapter.id === 'la-salle' ? 1 : chapter.id === 'alcatel-lucent' || chapter.id === 'anexia' || chapter.id === 'domingo-alonso' || chapter.id === 'system-recovery' ? 2 : chapter.id === 'nokia' ? 1 : 0;
  101 |     for (let i = 0; i < expectedEvents; i++) { await expect(page.getByRole('dialog')).toBeVisible(); await resolveEvent(page); }
  102 |     await expect(page.locator('.career-success')).toContainText('Level complete');
  103 |     if (chapter.id === 'system-recovery') {
  104 |       await expect(page.locator('.career-quest-panel')).toContainText('System recovered');
  105 |       await expect(page.locator('.career-quest-panel')).toContainText('Career in progress');
  106 |       await page.screenshot({ path: 'test-results/career-recovered.png', fullPage: true });
  107 |     }
  108 |     await page.getByRole('button', { name: 'Menu', exact: true }).click();
  109 |   }
  110 |   await expect(page.locator('.career-chapter.is-complete')).toHaveCount(10);
  111 | });
  112 | 
  113 | test('a timed event interrupts a trace and resumes its exact sequence; pauses stop the timer', async ({ page }) => {
  114 |   await unlockBefore(page, 'la-salle'); await enter(page); await page.clock.install();
  115 |   await page.locator('[data-chapter="la-salle"]').click();
  116 |   await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  117 |   await page.locator('[data-choice="device"]').click();
  118 |   await page.clock.fastForward(17000);
  119 |   await expect(page.getByRole('dialog')).toContainText('Freelance client');
  120 |   await resolveEvent(page);
  121 |   await expect(page.getByRole('dialog')).toContainText('Step 2 / 4');
  122 |   await page.getByRole('button', { name: 'Close', exact: true }).click();
  123 | });
  124 | 
  125 | test('pausing a company stops its event timer', async ({ page }) => {
  126 |   await unlockBefore(page, 'nokia'); await enter(page); await page.clock.install();
  127 |   await page.locator('[data-chapter="nokia"]').click();
  128 |   await page.getByRole('button', { name: 'Pause', exact: true }).click();
  129 |   await page.clock.fastForward(60000); await expect(page.getByRole('dialog')).toHaveCount(0);
  130 |   await page.getByRole('button', { name: 'Resume game', exact: true }).last().click();
  131 |   await page.clock.fastForward(17000); await expect(page.getByRole('dialog')).toContainText('A cooperative adventure');
  132 | });
  133 | 
  134 | test('tour ends at thirty seconds without changing save progress', async ({ page }) => {
  135 |   await enter(page); await page.clock.install();
  136 |   await page.getByRole('button', { name: '30-second tour', exact: true }).click();
  137 |   await page.clock.runFor(11000); await expect(page.locator('.career-tour')).toContainText('Projects grow');
  138 |   await page.clock.runFor(10000); await expect(page.locator('.career-tour')).toContainText('Now you see the whole system');
  139 |   await page.clock.runFor(9000); await expect(page.locator('.career-chapter-grid')).toBeVisible();
  140 |   expect(await page.evaluate(() => localStorage.getItem('antonios:career:v1'))).toBeNull();
  141 | });
  142 | 
  143 | test('static Spanish and English launchers expose the real career and profile without JavaScript', async ({ browser }) => {
  144 |   const context = await browser.newContext({ javaScriptEnabled: false }); const page = await context.newPage();
  145 |   for (const prefix of ['', '/en']) {
  146 |     await page.goto(`http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}${prefix}/arcade/`);
  147 |     await expect(page.getByRole('heading', { name: 'JOB ROUTE »' })).toBeVisible();
  148 |     await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://antoniomdm.dev${prefix}/arcade/`);
  149 |     const launcher = page.locator('.arcade-launcher'); await launcher.locator('summary').click();
  150 |     await expect(launcher.locator('li')).toHaveCount(9);
  151 |     await launcher.getByRole('link', { name: prefix ? 'View full profile' : 'Ver perfil completo' }).click();
  152 |     await expect(page).toHaveURL(new RegExp(`${prefix}/profile/$`));
  153 |   }
  154 |   await context.close();
  155 | });
  156 | 
  157 | test('desktop and mobile scenes and dialogs meet accessibility and overflow checks', async ({ page }) => {
  158 |   await unlockBefore(page, 'anexia'); await enter(page);
  159 |   await page.screenshot({ path: 'test-results/career-menu.png', fullPage: true });
  160 |   expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  161 |   await page.locator('[data-chapter="anexia"]').click();
  162 |   await page.screenshot({ path: 'test-results/career-city.png', fullPage: true });
  163 |   await page.locator('.career-quest-panel').getByRole('button', { name: 'Open terminal mission' }).click();
  164 |   expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  165 |   await page.getByRole('button', { name: 'Close', exact: true }).click();
  166 |   await page.setViewportSize({ width: 390, height: 844 });
  167 |   await page.screenshot({ path: 'test-results/career-mobile.png', fullPage: true });
  168 |   expect(await page.locator('.career-world').evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
  169 |   expect((await new AxeBuilder({ page }).include('.career-world').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  170 | });
  171 | 
```