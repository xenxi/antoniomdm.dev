# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: career.spec.ts >> keyboard movement, collision, touch controls, save and language continuation
- Location: tests/e2e/career.spec.ts:36:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Volver a la misión' })
    - locator resolved to <button class="career-primary">Volver a la misión</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - link "Saltar al contenido del escritorio" [ref=f2e2] [cursor=pointer]:
    - /url: "#desktop"
  - generic [ref=f2e4]:
    - generic [aria-hidden] [ref=f2e5]:
      - banner [ref=f2e6]:
        - link [ref=f2e7] [cursor=pointer]:
          - /url: /
          - strong [ref=f2e9]:
            - generic [ref=f2e10]: AntoñiOS
        - navigation [ref=f2e11]:
          - button [ref=f2e12] [cursor=pointer]: Aplicaciones
        - generic [ref=f2e13]: Sistema operativo personal
        - generic [ref=f2e14]:
          - button [pressed] [ref=f2e15] [cursor=pointer]
          - navigation [ref=f2e19]:
            - link [ref=f2e20] [cursor=pointer]:
              - /url: /arcade/
              - text: ES
            - link [ref=f2e21] [cursor=pointer]:
              - /url: /en/arcade/
              - text: EN
          - generic [ref=f2e22]: EN LÍNEA
          - time [ref=f2e24]: mar, 15 sept, 16:07
      - main [ref=f2e25]:
        - navigation [ref=f2e26]:
          - link [ref=f2e27] [cursor=pointer]:
            - /url: /profile/
            - generic [ref=f2e31]: Perfil
          - link [ref=f2e32] [cursor=pointer]:
            - /url: /background-processes/
            - generic [ref=f2e36]: Procesos en segundo plano
          - link [ref=f2e37] [cursor=pointer]:
            - /url: /architecture/
            - generic [ref=f2e41]: Arquitectura
          - link [ref=f2e42] [cursor=pointer]:
            - /url: /projects/
            - generic [ref=f2e46]: Proyectos
          - link [ref=f2e47] [cursor=pointer]:
            - /url: /ai-lab/
            - generic [ref=f2e51]: Laboratorio de IA
          - link [ref=f2e52] [cursor=pointer]:
            - /url: /notes/
            - generic [ref=f2e56]: Blog
          - link [ref=f2e57] [cursor=pointer]:
            - /url: /terminal/
            - generic [ref=f2e61]: Terminal
          - link [ref=f2e62] [cursor=pointer]:
            - /url: /arcade/
            - generic [ref=f2e66]: Arcade
          - link [ref=f2e67] [cursor=pointer]:
            - /url: /contact/
            - generic [ref=f2e71]: Contacto
        - complementary [ref=f2e72]:
          - paragraph [ref=f2e73]:
            - generic [aria-hidden] [ref=f2e74]: ">_"
            - generic [ref=f2e75]: Abre una aplicación...
            - generic [ref=f2e76]: Ctrl + K
          - generic [ref=f2e77]: "Alt + flechas: mover · Alt + Mayús + flechas: redimensionar · Esc: minimizar"
        - complementary [ref=f2e78]:
          - generic [ref=f2e126]:
            - strong [ref=f2e127]: TODO FUNCIONA.
            - generic [ref=f2e128]: No preguntes por qué...
            - generic [ref=f2e129]: "SYSTEM STATUS: PROBABLY FINE"
        - region [ref=f2e131]:
          - generic [ref=f2e132]:
            - generic [ref=f2e133]: Arcade.exe
            - generic [ref=f2e137]:
              - button [ref=f2e138] [cursor=pointer]: −
              - button [ref=f2e139] [cursor=pointer]: □
              - button [ref=f2e140] [cursor=pointer]: ×
          - generic [ref=f2e142]:
            - paragraph [ref=f2e143]: ANTONIOS.EXE / JOB ROUTE
            - heading [level=1] [ref=f2e144]: JOB ROUTE »
            - paragraph [ref=f2e145]: Tu carrera es la campaña.
            - paragraph [ref=f2e146]: "Nueve etapas con escenario propio: del caos de un piso compartido a grandes oficinas y al trabajo en remoto. Completa cuatro misiones por empresa, resuelve incidencias, encuentra los teléfonos gigantes y juega a Snake en el 3310. Después te espera un desafío final de siete fases. Escenarios y retos recreados con humor; trayectoria profesional real."
            - button [ref=f2e147] [cursor=pointer]: ENTRAR ↗
            - generic [ref=f2e148]:
              - link [ref=f2e149] [cursor=pointer]:
                - /url: /profile/
                - text: Ver perfil completo ↗
              - link [ref=f2e150] [cursor=pointer]:
                - /url: /experience/
                - text: Explorar la trayectoria ↗
            - paragraph [ref=f2e151]: Campaña de exploración o misión rápida directa · música activada por defecto · guardado local · contrarreloj opcional · español e inglés.
            - group [ref=f2e152]:
              - generic [ref=f2e153]: La carrera real, sin necesidad de jugar
          - generic [ref=f2e154]:
            - generic [ref=f2e155]: La misma persona. Otra realidad.
            - generic [ref=f2e156]: AntoñiOS
      - contentinfo [ref=f2e166]:
        - button [ref=f2e167] [cursor=pointer]:
          - generic [ref=f2e169]: Aplicaciones
        - link [ref=f2e170] [cursor=pointer]:
          - /url: /profile/
        - navigation [ref=f2e174]:
          - button [pressed] [ref=f2e175] [cursor=pointer]
        - generic [ref=f2e179]:
          - link [ref=f2e180] [cursor=pointer]:
            - /url: /arcade/
          - button [pressed] [ref=f2e183] [cursor=pointer]: ♪
          - link [ref=f2e184] [cursor=pointer]:
            - /url: /settings/
          - link [ref=f2e187] [cursor=pointer]:
            - /url: /arcade/?view=reading
            - text: Vista de lectura ↗
          - time [ref=f2e188]: mar, 15 sept, 16:07
    - region "AntoñiOS Career Mode" [ref=f2e189]:
      - generic [ref=f2e190]:
        - generic [ref=f2e191]:
          - text: JOB ROUTE
          - generic [aria-hidden] [ref=f2e192]: »
          - generic [ref=f2e193]: ANTOÑIOS / COLOR
        - navigation "Navegación de Career Mode" [ref=f2e194]:
          - link "Ver perfil completo ↗" [ref=f2e195] [cursor=pointer]:
            - /url: /profile/
          - link "English" [ref=f2e196] [cursor=pointer]:
            - /url: /en/arcade/?career=continue
            - text: EN
          - button "← Volver al escritorio" [ref=f2e197] [cursor=pointer]
      - generic [ref=f2e198]:
        - generic [ref=f2e199]:
          - heading "Profesional independiente" [level=1] [ref=f2e200]
          - paragraph [ref=f2e201]: Junio de 2013 — Octubre de 2014 · Desarrollador web
        - generic [ref=f2e202]:
          - button "Volver a la ciudad" [ref=f2e203] [cursor=pointer]
          - button "Menú" [ref=f2e204] [cursor=pointer]
          - button "Pausar" [ref=f2e205] [cursor=pointer]
      - generic [ref=f2e206]:
        - generic [ref=f2e207]:
          - generic [ref=f2e208]:
            - generic:
              - generic:
                - generic:
                  - generic:
                    - strong: ANTONIO
                    - generic: NV. 1
                  - generic:
                    - text: ETAPAS
                    - generic: 0 / 10
                    - progressbar "ETAPAS 0 / 10"
                  - generic:
                    - text: MISIÓN
                    - generic: 3 / 4
                    - progressbar "MISIÓN 3 / 4"
                  - generic: Villa Trayectoria
              - generic:
                - generic:
                  - paragraph: OBJETIVO ACTUAL
                  - strong: Cerrar alcance, abrir la puerta
                  - generic:
                    - text: Profesional independiente
                    - generic: E
                  - generic:
                    - generic: Energía 55%
                    - generic: 75s
              - generic:
                - time: 15 sept 2026, 16:07 ☼
                - paragraph: TRABAJO HOY. UN FUTURO MAÑANA.
              - figure "PLANO DEL ESCENARIO":
                - img "Plano del escenario y ruta al objetivo actual"
                - generic: Profesional independiente
              - navigation "Menú" [ref=f2e209]:
                - button "M Mapa" [ref=f2e210] [cursor=pointer]:
                  - generic [ref=f2e211]: M
                  - text: Mapa
                - button "I Inventario" [ref=f2e212] [cursor=pointer]:
                  - generic [ref=f2e213]: I
                  - text: Inventario
                - button "J Trabajos" [ref=f2e214] [cursor=pointer]:
                  - generic [ref=f2e215]: J
                  - text: Trabajos
                - button "O Pausa" [ref=f2e216] [cursor=pointer]:
                  - generic [ref=f2e217]: O
                  - text: Pausa
            - 'group "Ciudad pixel art: camina con flechas e interactúa con E" [ref=f2e218]':
              - iframe [aria-hidden] [ref=f2e220]:
                - generic "Mapa pixel art. Flechas o WASD para caminar, E para interactuar, Escape para pausar. Tab para salir del mapa." [ref=f3e2]
              - generic [ref=f2e221]:
                - link "Licencia de Godot" [ref=f2e222] [cursor=pointer]:
                  - /url: /licenses/godot.txt
                  - text: GODOT
                - button "Acercar al personaje" [ref=f2e223] [cursor=pointer]
          - paragraph [ref=f2e224]: Flechas / WASD para caminar · pulsa el suelo para elegir destino o un objeto para acercarte · E / espacio para interactuar · M para el mapa · mantén pulsados los controles táctiles.
          - generic [ref=f2e225]:
            - group "Movimiento" [ref=f2e226]:
              - button "Caminar al norte" [disabled] [ref=f2e227]: ↑
              - button "Caminar al oeste" [disabled] [ref=f2e228]: ←
              - button "Caminar al sur" [disabled] [ref=f2e229]: ↓
              - button "Caminar al este" [disabled] [ref=f2e230]: →
            - button "Interactuar E" [ref=f2e231] [cursor=pointer]
          - group [ref=f2e232]:
            - generic "Interacción directa accesible" [ref=f2e233] [cursor=pointer]
        - complementary [ref=f2e234]:
          - generic [ref=f2e235]:
            - paragraph [ref=f2e236]: Piso compartido · alquiler y deadlines
            - paragraph [ref=f2e237]: Prepara la web para la entrega y resuelve las incidencias del piso para recuperar concentración.
          - generic [ref=f2e238]:
            - generic [ref=f2e239]:
              - text: Energía
              - strong [ref=f2e240]: 55/100
              - meter "Energía 55/100" [ref=f2e241]
            - generic [ref=f2e242] [cursor=pointer]:
              - checkbox "Contrarreloj" [checked] [ref=f2e243]
              - text: Contrarreloj
            - generic [ref=f2e244]:
              - generic [ref=f2e245]: 75s
              - progressbar "Contrarreloj" [ref=f2e246]
          - paragraph [ref=f2e247]: Misión principal
          - heading "Cerrar alcance, abrir la puerta" [level=2] [ref=f2e248]
          - paragraph [ref=f2e249]: La web está lista. Llega un «ya que estamos» con cinco páginas nuevas. ¿Cómo cierras la entrega?
          - button "Abrir misión del terminal →" [ref=f2e250] [cursor=pointer]
          - generic [ref=f2e251]: Acceso directo accesible
          - paragraph [ref=f2e252]: Ve al objetivo marcado y pulsa E, o usa el acceso directo.
          - list "Misiones de esta etapa" [ref=f2e253]:
            - listitem [ref=f2e254]:
              - generic [aria-hidden] [ref=f2e255]: ✓
              - generic [ref=f2e256]:
                - text: Solo es cambiar un botón
                - generic [ref=f2e257]: Puesto de trabajo
            - listitem [ref=f2e258]:
              - generic [aria-hidden] [ref=f2e259]: ✓
              - generic [ref=f2e260]:
                - text: Maquetación contra reloj
                - generic [ref=f2e261]: Puesto de trabajo
            - listitem [ref=f2e262]:
              - generic [aria-hidden] [ref=f2e263]: ✓
              - generic [ref=f2e264]:
                - text: La entrega también se usa con teclado
                - generic [ref=f2e265]: Panel de revisión
            - listitem [ref=f2e266]:
              - generic [aria-hidden] [ref=f2e267]: "04"
              - generic [ref=f2e268]:
                - text: Cerrar alcance, abrir la puerta
                - generic [ref=f2e269]: Compañero de piso
          - group [ref=f2e270]:
            - generic "Incidencias opcionales · 0/4" [ref=f2e271] [cursor=pointer]
            - paragraph [ref=f2e272]: "Concentración: las distracciones del piso consumen energía. Resolverlas devuelve la calma."
            - button "◇ Una fuga antes de la entrega" [ref=f2e273] [cursor=pointer]
            - button "◇ Sin conexión para enviar la entrega" [ref=f2e274] [cursor=pointer]
            - button "◇ La lavadora pierde espuma" [ref=f2e275] [cursor=pointer]
            - button "◇ Media hora para revisar la entrega" [ref=f2e276] [cursor=pointer]
          - progressbar "Misión principal" [ref=f2e277]
          - link "Ver experiencia completa ↗" [ref=f2e278] [cursor=pointer]:
            - /url: /experience/#freelance
          - group [ref=f2e279]:
            - generic "Decisiones y evidencia de esta etapa" [ref=f2e280]
          - group [ref=f2e281]:
            - generic "Diario de campaña · 0/10" [ref=f2e282] [cursor=pointer]
      - generic [ref=f2e283]:
        - strong [ref=f2e284]: Inventario
        - generic [ref=f2e285]: ▣ Teléfono
        - generic [ref=f2e286]: ◇ Conocimiento
      - generic [ref=f2e287]:
        - generic [ref=f2e288]: Escenarios y anécdotas recreados con humor. Las misiones son simulaciones; la experiencia profesional está enlazada por separado.
        - generic [ref=f2e289]:
          - 'button "Pasos y puertas: activados" [pressed] [ref=f2e290] [cursor=pointer]'
          - button "Pausar música" [ref=f2e291] [cursor=pointer]
          - generic [ref=f2e292]: Guardado local automático
      - status [ref=f2e293]
      - dialog [ref=f2e294]:
        - generic [ref=f2e296]:
          - paragraph [ref=f2e297]: JOB ROUTE / ANTOÑIOS
          - heading "Diario de campaña" [level=2] [ref=f2e298]
        - paragraph [ref=f2e299]: La interacción debe poder operarse con teclado y comunicar su estado.
        - button "Volver a la misión" [active] [ref=f2e300] [cursor=pointer]
        - paragraph [ref=f2e301]:
          - link "Ver perfil completo ↗" [ref=f2e302] [cursor=pointer]:
            - /url: /profile/
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
> 63  |     await page.getByRole('button', { name: 'Volver a la misión' }).click();
      |                                                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  96  |       for (const choice of mission.sequence ?? [mission.choices.find(choice => choice.accepted)!.id]) await page.locator(`[data-choice="${choice}"]`).click();
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
```