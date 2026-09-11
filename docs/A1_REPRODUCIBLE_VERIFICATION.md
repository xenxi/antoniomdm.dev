# A1 — Verificación reproducible / Reproducible verification

Fecha / Date: **2026-09-11**. Estado / Status: **PARTIAL**.

## Problem / Problema

**ES.** `npm run test:e2e` no era reproducible desde un arranque en frío. Con el puerto 4321 libre y sin Astro o Playwright activos, el comando terminaba con código 1 y `Process from config.webServer exited early`. El mismo servidor quedaba ejecutándose en segundo plano y una ejecución posterior podía reutilizarlo, ocultando el defecto de lifecycle.

**EN.** `npm run test:e2e` was not reproducible from a cold start. With port 4321 free and no Astro or Playwright process running, the command exited 1 with `Process from config.webServer exited early`. The same server remained alive in the background, and a later run could reuse it, masking the lifecycle defect.

## Root cause / Causa raíz

**ES.** Astro 7.3.2 llama a `isRunByAgent()` al ejecutar su CLI. En el entorno Codex detectado, `astro preview` selecciona automáticamente su ruta `background()` incluso sin `--background`: crea un proceso Node desacoplado, espera a que escriba el lock y termina el proceso padre con código 0. Playwright gestiona y observa ese padre (`npm run preview`), por lo que interpreta su terminación como un cierre prematuro aunque el daemon ya escuche en 4321.

**EN.** Astro 7.3.2 calls `isRunByAgent()` in its CLI. In the detected Codex environment, `astro preview` automatically selects its `background()` path even without `--background`: it spawns a detached Node process, waits for its lock and exits the parent with code 0. Playwright owns and watches that parent (`npm run preview`), so it reports an early exit even though the daemon is already listening on 4321.

Evidencia de reproducción / Reproduction evidence:

- `npm run test:e2e`: exit 1, 4,252 ms; stderr relevante / relevant stderr: `Process from config.webServer exited early`.
- Proceso padre observado / observed parent: Node PID 14276; daemon creado / spawned daemon: Node PID 23528, `astro.mjs preview --host 127.0.0.1 --json`.
- Astro informó readiness interna en 27 ms en su log; Playwright no alcanzó readiness HTTP porque su proceso gestionado ya había terminado / Astro logged internal readiness in 27 ms; Playwright never reached HTTP readiness because its managed process had exited.
- Puerto / port: `127.0.0.1:4321`, propiedad del daemon PID 23528. Se detuvo únicamente con `npx astro preview stop`; después el puerto quedó libre / owned by daemon PID 23528. It was stopped only with `npx astro preview stop`; the port was free afterwards.

## Previous behavior / Comportamiento anterior

**ES.** `playwright.config.ts` ejecutaba `npm run preview`, esperaba `http://127.0.0.1:4321` y permitía `reuseExistingServer` fuera de CI. No construía como parte de `npm run test:e2e`, no fijaba timeout explícito y no impedía que una ejecución local aprobase reutilizando el daemon dejado por otra ejecución.

**EN.** `playwright.config.ts` ran `npm run preview`, waited for `http://127.0.0.1:4321`, and allowed `reuseExistingServer` outside CI. It did not build as part of `npm run test:e2e`, had no explicit timeout, and allowed a local run to pass by reusing a daemon leaked by another run.

## Implemented solution / Solución implementada

**ES.** El lifecycle queda bajo un único propietario:

1. El hook npm `pretest:e2e` ejecuta `npm run build` antes de Playwright.
2. Playwright lanza `node ./scripts/e2e-preview.mjs`.
3. El script usa la API de Astro en el mismo proceso, sin la autodetección/daemonización de la CLI.
4. Vite usa `strictPort: true` sobre `127.0.0.1:4321`; nunca salta silenciosamente a otro puerto.
5. Playwright espera un HTTP válido en la URL, con timeout explícito de 30 s y sin sleeps fijos.
6. `reuseExistingServer` es siempre `false`: un servidor previo produce un error, no un PASS.
7. Playwright cierra exclusivamente el árbol que lanzó. En POSIX solicita `SIGTERM` y concede hasta 5 s; en Windows Playwright termina su propio árbol de procesos. El script también atiende `SIGINT`/`SIGTERM` y llama a `server.stop()`.

**EN.** The lifecycle now has a single owner:

1. The npm `pretest:e2e` hook runs `npm run build` before Playwright.
2. Playwright starts `node ./scripts/e2e-preview.mjs`.
3. The script uses Astro's API in the same process, bypassing CLI agent auto-daemonization.
4. Vite uses `strictPort: true` on `127.0.0.1:4321` and never silently moves to another port.
5. Playwright waits for a valid HTTP response at the URL, with an explicit 30 s timeout and no fixed sleeps.
6. `reuseExistingServer` is always `false`: a pre-existing server is an error, not a PASS.
7. Playwright stops only the tree it launched. On POSIX it requests `SIGTERM` with a 5 s allowance; on Windows Playwright terminates its own process tree. The script also handles `SIGINT`/`SIGTERM` and calls `server.stop()`.

No se añadieron retries, no se ampliaron timeouts de pruebas y no se cambió ninguna assertion funcional / No retries were added, test timeouts were not increased, and no functional assertion was changed.

## Windows validation / Validación Windows

Entorno / Environment: Windows, Node **24.19.0**, npm **11.17.0**, Astro **7.3.2**, Playwright **1.63.0**, Chromium.

| Check | Exit | Resultado / Result |
|---|---:|---|
| `npm ci` | 0 | 547 paquetes auditados, 0 vulnerabilidades / 547 packages audited, 0 vulnerabilities |
| `npm run lint` | 0 | PASS |
| `npm run typecheck` | 0 | 37 archivos, 0 errores/warnings/hints / 37 files, no diagnostics |
| `npm test` | 0 | 19/19, 2 archivos / 19/19 in 2 files |
| `npm run build` | 0 | 27 páginas / 27 pages |
| `npm run test:e2e`, cold debug run | 0 | 14/14; preview PID 9428; readiness del wrapper 404 ms; primer HTTP 200 de Playwright ~1.9 s; total 8,842 ms / wrapper readiness 404 ms; Playwright first HTTP 200 ~1.9 s; total 8,842 ms |
| Final E2E run 1 | 0 | 14/14; readiness 392 ms; total 7,850 ms; puerto libre, sin preview Node / port free, no preview Node |
| Final E2E run 2 | 0 | 14/14; readiness 371 ms; total 7,777 ms; puerto libre, sin preview Node / port free, no preview Node |
| Final E2E run 3 | 0 | 14/14; readiness 396 ms; total 7,551 ms; puerto libre, sin preview Node / port free, no preview Node |

**Propagación de errores / Error propagation.** Una spec temporal con una assertion deliberadamente falsa arrancó el preview, devolvió exit 1 en 3,895 ms y dejó 4321 libre y cero procesos preview. La spec se retiró y el inventario final volvió a 14 tests en 2 archivos. Con 4321 ocupado por un servidor de diagnóstico propio (PID 29540), Playwright rechazó el arranque con `http://127.0.0.1:4321 is already used`, devolvió exit 1 en 1,220 ms y no lanzó otro preview. Después se cerró exclusivamente el proceso de diagnóstico y se verificaron puerto libre y cero procesos preview.

**Error propagation.** A temporary spec with an intentionally false assertion started preview, exited 1 in 3,895 ms, and left port 4321 free with zero preview processes. The spec was removed and the final inventory returned to 14 tests in 2 files. With 4321 occupied by an owned diagnostic server (PID 29540), Playwright rejected startup with `http://127.0.0.1:4321 is already used`, exited 1 in 1,220 ms, and did not launch another preview. Only the owned diagnostic process was then stopped; the port was free and no preview process remained.

## CI/Linux considerations / Consideraciones CI/Linux

**ES.** `.github/workflows/publish.yml` ya fija Node 24 y ordena `npm ci`, lint, typecheck, unit, build, instalación de Chromium y E2E antes de subir `dist`. El job de deploy depende del éxito del job build y no se ejecuta en pull requests. A1 no necesitó modificar el workflow. El nuevo comando usa rutas relativas, Node ESM y señales POSIX soportadas por Playwright; no contiene quoting ni comandos específicos de PowerShell/cmd.

**EN.** `.github/workflows/publish.yml` already pins Node 24 and orders `npm ci`, lint, typecheck, unit, build, Chromium installation, and E2E before uploading `dist`. The deploy job depends on the successful build job and does not run for pull requests. A1 did not need to modify the workflow. The new command uses relative paths, Node ESM, and POSIX signals supported by Playwright; it contains no PowerShell/cmd-specific quoting or commands.

**ES.** La ejecución Linux real queda pendiente: este host no tiene Docker ni WSL, y no se disparó Actions porque esta entrega prohíbe desplegar y no autoriza crear/pushear una rama de validación. Por esa única falta de evidencia remota/Linux, el estado es PARTIAL y no DONE.

**EN.** A real Linux run remains pending: this host has neither Docker nor WSL, and Actions was not dispatched because this delivery forbids deployment and does not authorize creating/pushing a validation branch. This is the sole reason the status is PARTIAL rather than DONE.

## Commands executed / Comandos ejecutados

- Inventario de procesos con `Get-CimInstance Win32_Process` y listeners Node con `Get-NetTCPConnection`.
- `node --version`, `npm --version`, `npx astro --version`, `npx playwright --version`.
- Baseline: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run test:e2e`.
- Diagnóstico: `npm run preview`, `npx astro preview --help`, `npx astro preview status`, `npx astro preview logs`, `npx astro preview stop`.
- Validación negativa: `npx playwright test tests/e2e/a1-failure-probe.spec.ts` con spec temporal; ejecución con 4321 ocupado por proceso propio.
- Validación final: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, y tres ejecuciones consecutivas de `npm run test:e2e`.
- Verificación Linux disponible: `docker version`, `wsl --status`, `wsl --list --verbose`.

## Results / Resultados

**ES.** El defecto de cold start queda corregido en Windows. Build, readiness HTTP, ejecución, propagación del exit code y cleanup se producen en el orden requerido. La suite conserva 19 tests unitarios y 14 escenarios E2E. No se tocó contenido, UI, Arcade, identidad, dependencias ni lockfile, y no hubo deploy.

**EN.** The cold-start defect is fixed on Windows. Build, HTTP readiness, execution, exit-code propagation, and cleanup occur in the required order. The suite retains 19 unit tests and 14 E2E scenarios. No content, UI, Arcade, identity, dependency, or lockfile change was made, and nothing was deployed.

## Known limitations / Limitaciones conocidas

- Falta ejecutar el árbol exacto en Linux/GitHub Actions / The exact tree still needs a Linux/GitHub Actions run.
- El puerto es fijo por contrato con tests existentes. La colisión falla de forma explícita; no se selecciona un puerto dinámico / The port remains fixed to match existing tests. A collision fails explicitly; no dynamic port is selected.
- La API JavaScript `preview()` de Astro está marcada experimental por Astro 7.3.2; queda aislada en un wrapper pequeño y cubierto por las ejecuciones E2E / Astro 7.3.2 marks its JavaScript `preview()` API experimental; it is isolated in a small wrapper exercised by every E2E run.
- `npm ci` mostró una advertencia de política local sobre el postinstall de `esbuild`; build y todos los checks pasaron, y A1 no cambió esa política / `npm ci` showed a local policy warning for the `esbuild` postinstall; build and all checks passed, and A1 did not alter that policy.

## Files changed / Archivos modificados

- `package.json`: build automático antes de E2E / automatic build before E2E.
- `playwright.config.ts`: servidor foreground, readiness, puerto estricto, no reuse y cleanup / foreground server, readiness, strict port, no reuse, and cleanup.
- `scripts/e2e-preview.mjs`: propietario del preview en primer plano / foreground preview owner.
- `docs/A1_REPRODUCIBLE_VERIFICATION.md`: esta evidencia / this evidence.

`.github/workflows/publish.yml` fue auditado pero no modificado por A1; ya aparecía modificado en el árbol de trabajo al comenzar / `.github/workflows/publish.yml` was audited but not changed by A1; it was already modified in the working tree at the start.

## Rollback / Reversión

**ES.** Retirar `pretest:e2e`, restaurar el bloque `webServer` anterior y eliminar `scripts/e2e-preview.mjs` y este documento. No revertir el repositorio completo ni los cambios previos del usuario.

**EN.** Remove `pretest:e2e`, restore the former `webServer` block, and delete `scripts/e2e-preview.mjs` and this document. Do not revert the whole repository or the user's pre-existing changes.
