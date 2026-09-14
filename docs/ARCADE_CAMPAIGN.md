# Campaña por empresas / Company campaign

## Español

La campaña contiene nueve etapas de cuatro misiones y un desafío final de siete fases. Conserva el prólogo freelance y vuelve después al orden de la trayectoria. Las empresas, puestos y fechas proceden del modelo profesional, contrastado con `xenxi/knowledge-vault/career/master/cv-master.md`. Los interiores, diálogos y casos de entrenamiento son recreaciones humorísticas, no nuevas afirmaciones profesionales.

| Etapa | Escenario | Retos |
| --- | --- | --- |
| Freelance | Piso alquilado, cocina, dormitorios y salón; cuatro compañeros | Formulario, maquetación adaptable con 45 segundos, teclado y entrega al cliente |
| XUL | Estudio creativo, cueva de desarrollo y cocina | Bug Android, aprendizaje acompañado, estado y revisión |
| Signlab | Estudio móvil y galería táctil | Gestos, coordenadas, regiones y pruebas |
| La Salle | Aulas, pasillo y sala de servidores | Diagnóstico, permisos, mantenimiento y documentación |
| Alcatel | Gran oficina, puesto B-12, comedor y One Touch Easy verde | Reglas, búsqueda de puesto, cantidades y plataforma compartida |
| Nokia | Gran oficina de redes, laboratorio y 3310 | Flujo de diseño, conectividad, Snake y geometría |
| Vector | Centro de automatización y análisis | Entrega, informes, evaluación de NLP y límites de automatización |
| Anexia | Oficina naranja de diez puestos | Rendimiento, requisitos, Flutter y valoración inmobiliaria |
| DAG | Piso familiar y despacho remoto | Trazas, arquitectura, pruebas y diagnóstico asistido |

Las siete incidencias opcionales incluyen agua, gato/cable, espuma, ruido, comida, pausa de café y visita de la peque. Cada solución se guarda, recupera hasta 20 puntos de energía y actualiza el decorado cuando corresponde. Las misiones consumen 10 puntos; los errores, 5. Las distracciones pendientes del piso consumen 3 cada 12 segundos activos. El café repone la energía; en Nokia es gratis e ilimitado. La energía baja invita a descansar y no bloquea la partida.

El reloj se detiene en pausa, con la pestaña oculta, durante carga y en diálogos ajenos a la misión. Al agotarse se conservan los pasos resueltos: se puede reiniciar o desactivar el límite. La configuración y los segundos restantes se guardan. El mapa apunta al objetivo de cada misión; los accesos directos accesibles permiten resolverla sin desplazarse.

Snake funciona por pasos, con flechas o botones. Recoger cuatro paquetes es un requisito real antes de verificar la respuesta. Se comprueban bordes y colisiones, y se conserva la partida parcial. El movimiento ambiental de los personajes respeta la preferencia de movimiento reducido.

Implementación: `company-scenes.ts` define mobiliario, colisiones, zonas, arte y objetivos; `quest-content.ts` contiene preguntas y secundarias bilingües; `campaign.ts` establece el orden; `engine.ts` valida las partidas. El formato de escenario pasa a `layout: 3`, manteniendo la clave anterior de almacenamiento y migrando coordenadas y accesos ya ganados. No hacen falta imágenes nuevas ni dependencias adicionales. Reconstruir Godot con `npm run build:godot` y la web con `npm run build`.

Validación: pruebas de conectividad de todos los suelos y objetivos, progresión completa, traducciones, migración, temporizadores y Snake; pruebas de navegador de las diez escenas, incidencias, idioma, móvil, teclado, motor WASM y accesibilidad.

## English

The campaign contains nine four-mission chapters and a seven-phase final challenge. It preserves the freelance prologue before returning to career order. Companies, roles and dates come from the professional model, checked against `xenxi/knowledge-vault/career/master/cv-master.md`. Interiors, dialogue and training cases are humorous recreations, not additional professional claims.

| Chapter | Setting | Challenges |
| --- | --- | --- |
| Freelance | Rented flat, kitchen, bedrooms and living room; four flatmates | Form submission, responsive layout with 45 seconds, keyboard access and client handoff |
| XUL | Creative studio, developer cave and kitchen | Android bug, guided learning, state and review |
| Signlab | Mobile studio and touch gallery | Gestures, coordinates, regions and testing |
| La Salle | Classrooms, corridor and server room | Diagnosis, permissions, maintenance and documentation |
| Alcatel | Large office, desk B-12, cafeteria and green One Touch Easy | Rules, desk search, quantities and shared platform |
| Nokia | Large network office, lab and 3310 | Design flow, connectivity, Snake and geometry |
| Vector | Automation and analysis center | Delivery, reports, NLP evaluation and automation limits |
| Anexia | Orange office with ten desks | Performance, requirements, Flutter and property valuation |
| DAG | Family flat and remote office | Traces, architecture, testing and assisted diagnosis |

The seven optional incidents cover water, the cat/cable, foam, noise, lunch, a coffee break and a visit from the little one. Each solution is saved, restores up to 20 energy and updates the scenery where applicable. Missions cost 10 energy and mistakes cost 5. Pending flat distractions cost 3 every 12 active seconds. Coffee restores energy; Nokia coffee is free and unlimited. Low energy invites a break and never blocks play.

The timer stops when paused, when the tab is hidden, during loading and in non-mission dialogs. Expiry preserves solved steps: restart or disable the limit. The setting and remaining seconds are saved. The map points to each mission’s objective; accessible shortcuts allow completion without walking.

Snake is turn-based, using arrow keys or buttons. Collecting four packets is an actual prerequisite for verifying the answer. Boundaries and self-collisions are checked, and partial games are saved. Ambient character movement respects reduced-motion preferences.

Implementation: `company-scenes.ts` defines furniture, collisions, zones, art and objectives; `quest-content.ts` supplies bilingual questions and side quests; `campaign.ts` sets the order; `engine.ts` validates saves. The scene format becomes `layout: 3`, retaining the previous storage key and migrating coordinates and earned access. No new images or dependencies are needed. Rebuild Godot with `npm run build:godot` and the website with `npm run build`.

Validation covers every walkable tile and objective, full progression, translations, migration, timers and Snake, plus browser tests for all ten scenes, incidents, language switching, mobile, keyboard, WASM and accessibility.
