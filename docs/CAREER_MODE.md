# AntoñiOS — Career Mode

Validación de esta versión: `npm run check`, exportación Godot y Playwright. Véase `GODOT_ARCADE.md`. / Validate this version with `npm run check`, Godot export and Playwright. See `GODOT_ARCADE.md`.

## ES

Career Mode sustituye la previsualización de Arcade por una campaña jugable. Se entra explícitamente desde `/arcade/`; `/en/arcade/` ofrece la misma experiencia en inglés. No se carga el motor al abrir el escritorio o la ficha de Arcade. El enlace de cambio de idioma usa `?career=continue` para volver a entrar tras esa acción explícita y recupera la partida local.

La campaña tiene nueve capítulos relacionados con las nueve experiencias públicas y un décimo capítulo, System Recovery. La partida comienza en Villa Trayectoria: una ciudad abierta de 30 × 20 casillas con dos avenidas, parques, bancos, flores y estanque. La puerta freelance inicia el prólogo; después se avanza por las etapas de la campaña. Cada empresa exige completar las misiones, eventos y reparaciones anteriores. Las etapas abiertas pueden revisitarse y repetirse sin perder puertas ya ganadas. El tour dura 30 segundos, puede saltarse y no modifica la partida.

El mapa principal utiliza Godot, con pixel art original, personajes animados, colisiones, búsqueda de caminos y puertas de empresa; véase [la integración Godot](GODOT_ARCADE.md). Godot es el único motor jugable. El tour muestra una ilustración estática. JOB ROUTE combina una ciudad isométrica con oficinas isométricas de 11 × 11 casillas: recepción, sala acristalada, puestos de trabajo, plantas y luz de neón. El personaje tiene pelo castaño corto y ondulado, barba y gafas. Las empresas tienen interiores; su salida devuelve al personaje a la puerta de la ciudad. Flechas/WASD permiten caminar, E o Espacio interactúan con objetos cercanos y tocar un objeto hace caminar hasta él. Los controles HTML permiten las mismas acciones sin depender del canvas. Los diálogos usan `dialog` nativo y el escritorio queda inerte durante el juego.

Las misiones incluyen búsqueda de bugs, trazas, diagnóstico con métricas, construcción de flujos, ordenación de prioridades y decisiones de arquitectura. Las secuencias conservan su progreso; una respuesta incorrecta recibe feedback sin avanzar. Dos transiciones de arquitectura admitidas explican costes diferentes. El desafío final exige observar, trazar, diagnosticar, priorizar, contener, corregir y verificar.

Las llamadas freelance pueden interrumpir misiones en freelance, La Salle y Alcatel. Se ha respetado la aclaración del usuario del 13 de septiembre de 2026: freelance se solapó un par de meses con Alcatel. Las fechas públicas se mantienen: Alcatel comienza en septiembre de 2014 y freelance acaba en octubre de 2014. No se han extendido ficticiamente las fechas del CV hasta Nokia. Allí se presenta el cierre narrativo de la cadena y el silencio del teléfono.

Las incidencias permiten investigar o pedir cobertura; aplazarlas conserva el impacto abierto. Investigar deja el pipeline como tarea pendiente, mientras delegar asigna responsables. Boda durante Nokia y nacimiento de Emma durante Domingo Alonso están en `PersonalEvent`, con IDs de relación y desbloqueos narrativos independientes del CV. Tras ellos aparecen los guiños de Marga y de cobertura familiar. La música es opcional, requiere activar las preferencias y pulsar reproducir; se pausa en los eventos personales y al pausar u ocultar la partida.

`campaign.ts` contiene configuración y ficción bilingüe; sus capítulos solo guardan `experienceId`, escenario e IDs de misiones. `CareerGame.tsx` recibe el mismo `UiData` que el escritorio: empresa, puesto, fechas, resumen y competencias se resuelven desde esa proyección del modelo profesional canónico. No se ha añadido otra copia del CV ni alterado datos profesionales. Las métricas de los desafíos y los logros del juego están identificados como simulaciones, no como resultados profesionales. El build no necesita acceder al vault privado.

`engine.ts` contiene transiciones puras y validación del guardado versionado. `antonios:career:v1` guarda avance por capítulo, secuencias parciales, elecciones, posición interior y exterior e interrupciones pendientes. Los guardados anteriores siguen siendo compatibles. Un guardado incompatible no rompe el juego; si el almacenamiento está bloqueado, la sesión sigue funcionando y se informa al usuario. Los temporizadores se cancelan al pausar o salir y el audio se libera al desmontar.

El CV y la ficha original de experiencia siguen accesibles sin jugar, desde HTML estático y también desde los diálogos. El enlace a una experiencia abre su aplicación normal con el registro expandido. No se duplica su ficha dentro del juego.

Validación: `npm run check` y `npx playwright test`. Los tests protegen referencias al modelo, cobertura de experiencias, paridad ES/EN, seis mecánicas, siete fases finales, respuestas incorrectas, decisiones alternativas, eventos, colisiones, búsqueda de caminos, guardados, pausas, cambio de idioma, controles táctiles, HTML sin JavaScript y accesibilidad con axe. Capturas locales: `test-results/career-*.png`.

Alcance visual: ciudad y oficinas ilustradas de 1536 × 1024 píxeles, con personaje de cuatro orientaciones y movimiento por casillas; los minijuegos viven en paneles HTML accesibles. No hay backend, puntuaciones de habilidad profesional ni guardado entre dispositivos. Esta implementación no implica publicación ni despliegue.

## EN

Career Mode replaces the Arcade preview with a playable campaign. Entry is explicit at `/arcade/`; `/en/arcade/` offers the same experience in English. The engine does not load when opening the desktop or Arcade landing. The language link uses `?career=continue` to re-enter after that explicit action and restore the local save.

The campaign has nine chapters tied to the nine public experiences and a tenth chapter, System Recovery. The game starts in Career Town: a 30 × 20 tile open town with two avenues, parks, benches, flowers and a pond. The freelance door starts the prologue, then the campaign progresses through its chapters. Each company requires completion of earlier missions, events and repairs. Open chapters can be revisited and replayed without losing earned doors. The 30-second tour can be skipped and does not change the save.

The main map uses Godot with original pixel art, animated characters, collisions, pathfinding and company doors; see [the Godot integration](GODOT_ARCADE.md). Godot is the only game engine. The tour displays a static illustration. JOB ROUTE combines an isometric town with 11 × 11 tile isometric offices: reception, a glass meeting room, workstations, plants and neon lighting. The player has short wavy brown hair, a beard and glasses. Companies have interiors; leaving returns the player to their town door. Arrows/WASD move, E or Space interacts with nearby objects, and tapping an object walks to it. HTML controls offer the same actions without relying on canvas. Dialogs use native `dialog`; the desktop is inert during gameplay.

Missions cover bug hunting, tracing, metric diagnosis, flow construction, priority ordering and architecture decisions. Sequences retain progress; wrong answers receive feedback without advancing. Two accepted architecture transitions explain different costs. The final challenge requires observing, tracing, diagnosing, prioritizing, containing, fixing and verifying.

Freelance calls can interrupt missions in freelance, La Salle and Alcatel. The user's September 13, 2026 clarification is respected: freelance overlapped Alcatel by a couple of months. Public dates remain unchanged: Alcatel starts in September 2014 and freelance ends in October 2014. CV dates were not fictionally extended to Nokia. Nokia presents the narrative closure of the chain and the silent phone.

Incidents allow investigation or asking for cover; deferring leaves impact open. Investigation leaves a pending pipeline task, while delegation assigns owners. The wedding during Nokia and Emma's birth during Domingo Alonso live in `PersonalEvent`, with relationship IDs and narrative unlocks independent of the CV. Later callbacks involve Marga and family cover. Music is optional, requires enabling preferences and pressing play, and pauses for personal events or paused/hidden gameplay.

`campaign.ts` holds bilingual configuration and fiction; chapters only store `experienceId`, scene and mission IDs. `CareerGame.tsx` receives the same `UiData` as the desktop: company, role, dates, summary and competencies resolve from that projection of the canonical professional model. No second CV copy was added and no professional facts were changed. Challenge metrics and game achievements are labeled simulations rather than professional results. The build does not need private vault access.

`engine.ts` contains pure transitions and versioned save validation. `antonios:career:v1` stores per-chapter progress, partial sequences, choices, indoor and outdoor positions and pending interruptions. Older saves remain compatible. Incompatible saves do not crash gameplay; blocked storage leaves the session playable and informs the user. Timers stop on pause or exit and audio is released on unmount.

The CV and original experience view stay accessible without gameplay, from static HTML and from dialogs. Experience links open the regular app with the relevant record expanded. Its full view is not duplicated inside the game.

Validation: `npm run check` and `npx playwright test`. Tests protect model references, experience coverage, ES/EN parity, six mechanics, seven final phases, wrong answers, alternative decisions, events, collisions, pathfinding, saves, pause, language switching, touch controls, HTML without JavaScript and axe accessibility. Local screenshots: `test-results/career-*.png`.

Visual scope: an illustrated town and 1536 × 1024 offices, with a four-direction character and tile movement; minigames live in accessible HTML panels. There is no backend, professional skill rating or cross-device save. This implementation does not imply publishing or deployment.
