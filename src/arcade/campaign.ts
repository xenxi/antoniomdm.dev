import { extraMissions } from './quest-content';
import type { LocalizedText } from '../data/professional/types';

export const text = (es: string, en: string): LocalizedText => ({ es, en });
export type Mechanic = 'bug' | 'trace' | 'bottleneck' | 'routing' | 'priority' | 'architecture';
export interface Choice { id: string; label: LocalizedText; feedback: LocalizedText; accepted?: boolean }
export interface Mission {
  id: string; mechanic: Mechanic; title: LocalizedText; briefing: LocalizedText;
  target?: string; seconds?: number; challenge?: 'snake';
  evidence?: string; metrics?: { label: string; value: number }[]; sequence?: string[]; choices: Choice[];
}
const choice = (id: string, es: string, en: string, feedbackEs: string, feedbackEn: string, accepted = false): Choice => ({ id, label: text(es, en), feedback: text(feedbackEs, feedbackEn), accepted });
export const missions: Mission[] = [
  ...extraMissions,
  { id: 'button', mechanic: 'bug', title: text('Solo es cambiar un botón', 'Just change one button'), briefing: text('El cliente no puede enviar el formulario. Inspecciona el HTML y selecciona la línea que lo bloquea.', 'The client cannot submit the form. Inspect the HTML and select the line that blocks it.'), evidence: '<form>\n  <input name="message" required />\n  <button type="button">OK</button>\n</form>', choices: [
    choice('input', '<input required />', '<input required />', 'El campo obligatorio es intencional. Mira cómo se envía el formulario.', 'The required field is intentional. Look at how the form submits.'),
    choice('button', '<button type="button"> → type="submit"', '<button type="button"> → type="submit"', 'El formulario ya se envía. El cliente añade: «Y ya que estamos…».', 'The form submits now. The client adds: “While you are at it…”', true),
  ] },
  { id: 'mobile', mechanic: 'bug', title: text('El primer bug', 'The first bug'), briefing: text('La última tarjeta de esta app de museo se pierde. Encuentra el límite incorrecto.', 'The last card in this museum app is missing. Find the incorrect boundary.'), evidence: 'cards = [0, 1, 2]\nfor (i = 0; i < cards.length - 1; i++)\n  render(cards[i])', choices: [
    choice('loop', 'i < cards.length', 'i < cards.length', 'Ahora se muestran las tres tarjetas. Pequeños cambios, comportamiento verificable.', 'All three cards now appear. Small changes, verifiable behavior.', true),
    choice('start', 'i = 1', 'i = 1', 'Eso también omitiría la primera tarjeta. Revisa el final del bucle.', 'That would also skip the first card. Check the end of the loop.'),
  ] },
  { id: 'image', mechanic: 'routing', title: text('Conecta la interacción', 'Connect the interaction'), briefing: text('Construye el recorrido desde el gesto del visitante hasta la imagen actualizada. Selecciona los nodos en orden.', 'Build the route from the visitor’s gesture to the updated image. Select the nodes in order.'), sequence: ['touch', 'handler', 'state', 'render'], choices: [
    choice('render', '04 · Dibujar imagen', '04 · Render image', 'La vista refleja el estado actualizado.', 'The view reflects the updated state.', true),
    choice('state', '03 · Actualizar estado', '03 · Update state', 'El estado cambia antes de dibujar.', 'State changes before rendering.', true),
    choice('touch', '01 · Gesto', '01 · Gesture', 'Todo empieza con la intención del visitante.', 'It starts with the visitor’s intent.', true),
    choice('handler', '02 · Manejador', '02 · Handler', 'El manejador interpreta el gesto.', 'The handler interprets the gesture.', true),
  ] },
  { id: 'systems', mechanic: 'trace', title: text('¿Dónde se corta la conexión?', 'Where does the connection break?'), briefing: text('El equipo no llega al servicio. Sigue la ruta del diagnóstico, desde el dispositivo hasta el servidor.', 'The workstation cannot reach the service. Follow the diagnostic route, from device to server.'), sequence: ['device', 'network', 'dns', 'server'], choices: [
    choice('dns', 'DNS · 10.0.0.8', 'DNS · 10.0.0.8', 'El nombre resuelve a la dirección esperada.', 'The name resolves to the expected address.', true),
    choice('device', 'PC · ping localhost', 'PC · ping localhost', 'La interfaz local responde.', 'The local interface responds.', true),
    choice('server', 'SERVER · :443 CLOSED', 'SERVER · :443 CLOSED', 'Encontrado: el servicio no escucha en el puerto esperado.', 'Found it: the service is not listening on the expected port.', true),
    choice('network', 'LAN · gateway OK', 'LAN · gateway OK', 'La puerta de enlace responde.', 'The gateway responds.', true),
  ] },
  { id: 'validation', mechanic: 'bug', title: text('Una regla de ingeniería', 'An engineering rule'), briefing: text('En esta simulación, una distancia debe ser positiva. El validador acepta cero. Corrige la condición.', 'In this simulation, a distance must be positive. The validator accepts zero. Fix the condition.'), evidence: 'bool Valid(double distance) {\n  return distance >= 0;\n}', choices: [
    choice('positive', 'return distance > 0;', 'return distance > 0;', 'La regla rechaza cero y negativos. Añade casos de frontera a la revisión.', 'The rule rejects zero and negative values. Add boundary cases to the review.', true),
    choice('nonzero', 'return distance != 0;', 'return distance != 0;', 'Eso admite distancias negativas. El requisito es positivo, no solo distinto de cero.', 'That permits negative distances. The requirement is positive, not merely nonzero.'),
  ] },
  { id: 'network', mechanic: 'routing', title: text('Del dibujo al sistema', 'From drawing to system'), briefing: text('Organiza este flujo ficticio de diseño de red: primero importa, después valida, calcula y publica.', 'Arrange this fictional network design flow: import, validate, calculate, then publish.'), sequence: ['import', 'validate', 'calculate', 'publish'], choices: [
    choice('calculate', 'Calcular costes', 'Calculate costs', 'Los cálculos parten de un diseño validado.', 'Calculations use a validated design.', true),
    choice('publish', 'Publicar diseño', 'Publish design', 'El diseño está listo para revisión.', 'The design is ready for review.', true),
    choice('validate', 'Validar reglas', 'Validate rules', 'Detectar errores antes evita propagarlos.', 'Finding errors early prevents propagation.', true),
    choice('import', 'Importar geometría', 'Import geometry', 'Ya tenemos un modelo sobre el que trabajar.', 'We now have a model to work with.', true),
  ] },
  { id: 'pipeline', mechanic: 'priority', title: text('La entrega y sus dependencias', 'Delivery and its dependencies'), briefing: text('La compilación falla, un informe está pendiente y el cliente necesita saber cuándo llegará. Decide el orden: comunica el bloqueo, recupera la compilación y valida el informe.', 'The build is broken, a report is pending and the client needs an ETA. Order the work: communicate the blocker, recover the build and validate the report.'), sequence: ['communicate', 'build', 'report'], choices: [
    choice('report', 'Validar informe', 'Validate report', 'La salida ya puede verificarse con una compilación reproducible.', 'The output can now be verified with a reproducible build.', true),
    choice('build', 'Reparar compilación', 'Repair build', 'La entrega vuelve a tener una base verificable.', 'Delivery has a verifiable foundation again.', true),
    choice('communicate', 'Comunicar bloqueo', 'Communicate blocker', 'El equipo y el cliente ya comparten expectativas.', 'The team and client now share expectations.', true),
  ] },
  { id: 'application', mechanic: 'bottleneck', title: text('La aplicación va lenta', 'The application is slow'), briefing: text('En este laboratorio, el plan de ejecución muestra un escaneo repetido por petición. Localiza el recurso a investigar antes de añadir servidores.', 'In this lab, the execution plan shows a repeated scan per request. Locate the resource to investigate before adding servers.'), metrics: [{ label: 'CPU', value: 31 }, { label: 'RAM', value: 48 }, { label: 'SQL', value: 97 }, { label: 'POOL', value: 99 }, { label: 'CACHE HIT', value: 14 }], choices: [
    choice('cpu', 'CPU · Añadir instancias', 'CPU · Add instances', 'La CPU tiene margen. Más instancias podrían aumentar las consultas a SQL.', 'CPU has headroom. More instances could increase SQL queries.'),
    choice('sql', 'SQL · Revisar consulta y plan', 'SQL · Inspect query and plan', 'El escaneo presiona SQL y retiene conexiones. El pool es un síntoma relacionado.', 'The scan pressures SQL and holds connections. The pool is a related symptom.', true),
    choice('ram', 'RAM · Ampliar memoria', 'RAM · Add memory', 'La memoria no está saturada. Usa también la evidencia del plan.', 'Memory is not saturated. Use the execution-plan evidence too.'),
  ] },
  { id: 'distributed', mechanic: 'trace', title: text('Sigue el traceId', 'Follow the traceId'), briefing: text('traceId a7f2 cruza cinco servicios. Sigue sus spans desde WEB para localizar el origen, no solo el lugar donde aparece el error.', 'traceId a7f2 crosses five services. Follow its spans from WEB to find the origin, not just where the error appears.'), sequence: ['web', 'api', 'orders', 'pricing', 'sql'], choices: [
    choice('pricing', 'PRICING · a7f2 · 2,410 ms', 'PRICING · a7f2 · 2,410 ms', 'Pricing espera su dependencia.', 'Pricing waits for its dependency.', true),
    choice('web', 'WEB · a7f2 · 2,500 ms', 'WEB · a7f2 · 2,500 ms', 'La petición comienza aquí.', 'The request starts here.', true),
    choice('sql', 'SQL · a7f2 · 2,390 ms', 'SQL · a7f2 · 2,390 ms', 'La mayor parte del tiempo está en la consulta. Ya tienes una hipótesis comprobable.', 'Most time is spent in the query. You now have a testable hypothesis.', true),
    choice('orders', 'ORDERS · a7f2 · 2,430 ms', 'ORDERS · a7f2 · 2,430 ms', 'Orders llama a Pricing.', 'Orders calls Pricing.', true),
    choice('noise', 'CACHE · b9c1 · 4 ms', 'CACHE · b9c1 · 4 ms', 'Ese span pertenece a otra petición. Comprueba el traceId.', 'That span belongs to another request. Check the traceId.'),
    choice('api', 'API · a7f2 · 2,460 ms', 'API · a7f2 · 2,460 ms', 'El siguiente span pertenece a Orders.', 'The next span belongs to Orders.', true),
  ] },
  { id: 'architecture', mechanic: 'architecture', title: text('Diseña la transición', 'Design the transition'), briefing: text('El sistema heredado debe seguir funcionando. Hay lecturas frecuentes que toleran consistencia eventual y operaciones que necesitan el estado exacto. Elige una transición y asume su coste.', 'The legacy system must keep running. Frequent reads tolerate eventual consistency; some operations require exact state. Choose a transition and accept its cost.'), choices: [
    choice('rewrite', 'Reescribir y cortar hoy', 'Rewrite and cut over today', 'Sin convivencia ni red de seguridad, incumples la continuidad requerida.', 'Without coexistence or a safety net, this violates the continuity requirement.'),
    choice('projection', 'Proyección de lectura + Outbox', 'Read projection + Outbox', 'Descargas lecturas tolerantes a retrasos. Coste: sincronización y reconciliación; el estado exacto sigue en la fuente autoritativa.', 'You offload reads that tolerate lag. Cost: synchronization and reconciliation; exact state stays at the authoritative source.', true),
    choice('strangler', 'Extraer una capacidad cada vez', 'Extract one capability at a time', 'Reduces el alcance de cada cambio. Coste: convivencia temporal y contratos entre sistemas; la mejora de lecturas llega gradualmente.', 'You reduce the scope of each change. Cost: temporary coexistence and cross-system contracts; read improvements arrive gradually.', true),
  ] },
  { id: 'observe', mechanic: 'bottleneck', title: text('01 / Observa', '01 / Observe'), briefing: text('El simulador de AntoñiOS marca errores en varios servicios. ¿Qué evidencia permite estimar el impacto antes de tocar el sistema?', 'The AntoñiOS simulator reports errors across services. What evidence helps estimate impact before changing the system?'), metrics: [{ label: 'SQL', value: 97 }, { label: 'POOL', value: 96 }, { label: 'ERROR %', value: 31 }], choices: [
    choice('dashboard', 'Correlacionar errores, latencia y usuarios afectados', 'Correlate errors, latency and affected users', 'El impacto está delimitado. Sigue ahora una petición fallida.', 'Impact is scoped. Now follow a failed request.', true),
    choice('restart', 'Reiniciar todo', 'Restart everything', 'Perderías evidencia y podrías ampliar el impacto. Primero observa.', 'You would lose evidence and might broaden impact. Observe first.'),
  ] },
  { id: 'prioritize', mechanic: 'priority', title: text('04 / Prioriza', '04 / Prioritize'), briefing: text('Clientes afectados, pipeline rojo y una PR pendiente. Ordena: pide cobertura al equipo, contiene el incidente, recupera el pipeline y revisa la PR.', 'Customers are affected, the pipeline is red and a PR is pending. Order: ask the team for cover, contain the incident, recover the pipeline and review the PR.'), sequence: ['team', 'incident', 'ci', 'pr'], choices: [
    choice('pr', 'PR pendiente', 'Pending PR', 'La revisión vuelve a tener su espacio.', 'Review gets its time again.', true),
    choice('ci', 'Pipeline fallando', 'Failing pipeline', 'Restauras la vía de entrega después de contener el impacto.', 'You restore delivery after containing impact.', true),
    choice('team', 'Pedir cobertura al equipo', 'Ask the team for cover', 'Coordinación y comunicación delegadas: ya no estás solo.', 'Coordination and communication delegated: you are no longer alone.', true),
    choice('incident', 'Contener producción', 'Contain production', 'La prioridad es limitar el daño actual a clientes.', 'The priority is limiting current customer impact.', true),
  ] },
  { id: 'contain', mechanic: 'architecture', title: text('05 / Contén', '05 / Contain'), briefing: text('Los eventos duplicados multiplican efectos y una caché sirve valores obsoletos. Existe un modo degradado probado. Elige una contención reversible.', 'Duplicate events multiply effects and a cache serves stale values. A tested degraded mode exists. Choose reversible containment.'), choices: [
    choice('degrade', 'Activar modo degradado y pausar el consumidor afectado', 'Enable degraded mode and pause the affected consumer', 'El alcance baja. Conservas eventos para reproducirlos después de corregir la idempotencia.', 'Impact narrows. You retain events for replay after fixing idempotency.', true),
    choice('delete', 'Borrar la cola y todos los datos', 'Delete the queue and all data', 'Destruirías información necesaria para recuperar el servicio.', 'You would destroy information needed for recovery.'),
  ] },
  { id: 'fix', mechanic: 'routing', title: text('06 / Corrige', '06 / Fix'), briefing: text('Construye una ruta de procesamiento que tolere reentregas: recibir, comprobar Inbox, aplicar una vez e invalidar caché. En esta simulación, Inbox y efecto comparten transacción.', 'Build a processing route that tolerates redelivery: receive, check Inbox, apply once and invalidate cache. In this simulation, Inbox and effect share a transaction.'), sequence: ['receive', 'inbox', 'apply', 'cache'], choices: [
    choice('cache', 'Invalidar caché', 'Invalidate cache', 'La lectura siguiente vuelve a consultar la fuente.', 'The next read consults the source again.', true),
    choice('apply', 'Aplicar efecto una vez', 'Apply effect once', 'Una entrega duplicada no duplica el efecto.', 'A duplicate delivery does not duplicate the effect.', true),
    choice('receive', 'Recibir evento', 'Receive event', 'Cada evento conserva su identificador.', 'Every event retains its identifier.', true),
    choice('inbox', 'Comprobar Inbox', 'Check Inbox', 'La transacción protege la deduplicación y el efecto.', 'The transaction protects deduplication and the effect.', true),
  ] },
  { id: 'verify', mechanic: 'priority', title: text('07 / Verifica', '07 / Verify'), briefing: text('El cambio está aplicado. Ordena la recuperación: pruebas de reentrega, canary con métricas, reanudar tráfico y comunicar seguimiento.', 'The change is applied. Order recovery: redelivery tests, a canary with metrics, resume traffic and communicate follow-up.'), sequence: ['test', 'canary', 'resume', 'communicate'], choices: [
    choice('resume', 'Reanudar tráfico y consumidores', 'Resume traffic and consumers', 'La recuperación se amplía de forma controlada.', 'Recovery expands in a controlled way.', true),
    choice('communicate', 'Comunicar recuperación y seguimiento', 'Communicate recovery and follow-up', 'Sistema recuperado. La carrera sigue en curso.', 'System recovered. The career remains in progress.', true),
    choice('test', 'Probar reentregas y consistencia', 'Test redelivery and consistency', 'Las pruebas verifican el comportamiento, no solo el despliegue.', 'Tests verify behavior, not just deployment.', true),
    choice('canary', 'Canary · comprobar errores y latencia', 'Canary · check errors and latency', 'La muestra recupera valores estables en este simulador.', 'The sample returns to stable values in this simulator.', true),
  ] },
];

export interface Chapter { id: string; experienceId: string; scenario: 'bedroom' | 'office' | 'network' | 'city'; missions: string[] }
// Opening flash-forward: the freelance room introduces the controls, then the career resumes chronologically.
// Professional labels, dates and competencies MUST be resolved from the public model by experienceId.
export const chapters: Chapter[] = [
  { id: 'freelance', experienceId: 'freelance', scenario: 'bedroom', missions: ['button', 'responsive', 'layout-a11y', 'client-handoff'] },
  { id: 'xul', experienceId: 'xul', scenario: 'office', missions: ['mobile', 'xul-learn', 'xul-lifecycle', 'xul-review'] },
  { id: 'signlab', experienceId: 'signlab', scenario: 'office', missions: ['image', 'signlab-coordinates', 'signlab-overlap', 'signlab-delivery'] },
  { id: 'la-salle', experienceId: 'la-salle', scenario: 'office', missions: ['systems', 'school-permissions', 'school-backup', 'school-inventory'] },
  { id: 'alcatel-lucent', experienceId: 'alcatel-lucent', scenario: 'network', missions: ['validation', 'alcatel-desk', 'alcatel-statue', 'alcatel-platform'] },
  { id: 'nokia', experienceId: 'nokia', scenario: 'network', missions: ['network', 'nokia-connectivity', 'nokia-snake', 'nokia-geometry'] },
  { id: 'vector-itc', experienceId: 'vector-itc', scenario: 'office', missions: ['pipeline', 'vector-report', 'vector-nlp', 'vector-workflow'] },
  { id: 'anexia', experienceId: 'anexia', scenario: 'city', missions: ['application', 'anexia-requirements', 'anexia-mobile', 'anexia-valuation'] },
  { id: 'domingo-alonso', experienceId: 'domingo-alonso', scenario: 'city', missions: ['distributed', 'architecture', 'dag-tests', 'dag-ai'] },
  { id: 'system-recovery', experienceId: 'domingo-alonso', scenario: 'city', missions: ['observe', 'distributed', 'application', 'prioritize', 'contain', 'fix', 'verify'] },
];
export const missionById = Object.fromEntries(missions.map(mission => [mission.id, mission]));
export const freelanceChapterIds = ['freelance', 'la-salle', 'alcatel-lucent'];
export interface PersonalEvent { id: 'wedding' | 'emma-born'; occursDuringExperienceId: string; type: 'personal'; unlocks: string[]; title: LocalizedText; description: LocalizedText }
export const personalEvents: PersonalEvent[] = [
  { id: 'wedding', occursDuringExperienceId: 'nokia', type: 'personal', unlocks: ['wedding-ring', 'married'], title: text('Una aventura cooperativa', 'A cooperative adventure'), description: text('Llegar. Recordar los anillos. Decir «sí». Antonio y Marga comienzan una nueva aventura compartida.', 'Arrive. Remember the rings. Say “I do”. Antonio and Marga begin a new shared adventure.') },
  { id: 'emma-born', occursDuringExperienceId: 'domingo-alonso', type: 'personal', unlocks: ['family-first'], title: text('Se une una nueva jugadora', 'New player joined'), description: text('Emma. Un pequeño nombre, un mundo nuevo. La familia ahora suma tres.', 'Emma. A small name, a new world. The family now numbers three.') },
];

export const copy = {
  campaignMode: text('Campaña · explora la ciudad', 'Campaign · explore the town'),
  quickMode: text('Arcade · misión rápida', 'Arcade · quick mission'),
  quickIntro: text('Elige cualquier misión y entra directamente al reto. Tu campaña conserva su progreso.', 'Choose any mission and jump straight into the challenge. Your campaign keeps its progress.'),
  selectCompany: text('Elegir escenario', 'Choose a setting'),
  selectMission: text('Elegir misión', 'Choose a mission'),
  launchMission: text('Jugar esta misión', 'Play this mission'),
  quickDone: text('¡Misión superada!', 'Mission cleared!'),
  quickAgain: text('Repetir misión', 'Replay mission'),
  quickNext: text('Siguiente misión', 'Next mission'),
  quickBack: text('Volver al selector', 'Back to mission select'),
  subtitle: text('Tu carrera es la campaña.', 'Your career is the campaign.'),
  intro: text('Una ciudad a color, parques y una empresa por etapa. Recorre sus calles y abre nuevas puertas a medida que avanzas por el CV.', 'A colorful town, parks and a company for every chapter. Walk its streets and unlock new doors as you progress through the CV.'),
  premise: text('El mundo es ficción. La carrera que contiene no.', 'The world is fiction. The career within it is real.'),
  simulation: text('Misiones, diálogos y métricas son simulaciones, no resultados históricos ni valoraciones profesionales.', 'Missions, dialogue and metrics are simulations, not historical results or professional ratings.'),
  start: text('Nueva partida', 'New game'), continue: text('Continuar', 'Continue'), tour: text('Tour de 30 segundos', '30-second tour'), profile: text('Ver perfil completo', 'View full profile'), exit: text('← Volver al escritorio', '← Return to desktop'),
  chapters: text('Empresas de la ciudad', 'Town companies'), independent: text('Explora libremente; completa cada etapa para abrir la siguiente empresa.', 'Explore freely; finish each chapter to unlock the next company.'),
  prologue: text('Prólogo · después volvemos a los comienzos', 'Prologue · then back to the beginnings'),
  play: text('Jugar capítulo', 'Play chapter'), menu: text('Menú', 'Menu'), pause: text('Pausar', 'Pause'), paused: text('En pausa', 'Paused'), resume: text('Volver al juego', 'Resume game'),
  replay: text('Repetir este capítulo', 'Replay this chapter'),
  controls: text('Flechas / WASD para caminar · E / espacio para interactuar · M para el mapa · mantén pulsados los controles táctiles.', 'Arrows / WASD to walk · E / space to interact · M for the map · hold the touch controls to walk.'),
  map: text('Mapa de ciudad visto desde arriba. Usa las flechas para caminar y E junto a puertas, personas u objetos.', 'Top-down town map. Use arrows to walk and E near doors, people or objects.'),
  move: text('Movimiento', 'Movement'), up: text('Caminar al norte', 'Walk north'), down: text('Caminar al sur', 'Walk south'), left: text('Caminar al oeste', 'Walk west'), right: text('Caminar al este', 'Walk east'), interact: text('Interactuar', 'Interact'),
  accessible: text('Interacción directa accesible', 'Accessible direct interaction'), workstation: text('Abrir misión del terminal', 'Open terminal mission'), npc: text('Hablar con el equipo', 'Talk to the team'), coffee: text('Tomar café', 'Have coffee'), secret: text('Examinar caja negra', 'Inspect black box'),
  walkCloser: text('Acércate al objeto marcado en el plano y pulsa E.', 'Approach the object marked on the map and press E.'),
  npcLine: text('EQUIPO · «Comprueba una hipótesis cada vez. Y avisa si necesitas cobertura».', 'TEAM · “Test one hypothesis at a time. And let us know if you need cover.”'),
  coffeeLine: text('Café adquirido. +1 taza, ninguna habilidad profesional inventada.', 'Coffee acquired. +1 cup, no invented professional skills.'),
  secretLine: text('THE INTERNET · No dejar caer. Parece una caja sorprendentemente pequeña.', 'THE INTERNET · Do not drop. It looks surprisingly small.'),
  terminalHint: text('Consulta el objetivo marcado en el plano: cada misión tiene su lugar.', 'Check the marked objective on the map: every mission has its own location.'),
  main: text('Misión principal', 'Main quest'), step: text('Paso', 'Step'), complete: text('Etapa completada', 'Level complete'), next: text('Siguiente capítulo', 'Next chapter'), experience: text('Ver experiencia completa', 'View full experience'),
  abilities: text('Competencias descubiertas', 'Abilities discovered'), noAbilities: text('Explora el perfil completo para conocer la trayectoria.', 'Explore the full profile to discover the career.'),
  journal: text('Diario de campaña', 'Campaign journal'), inventory: text('Inventario', 'Inventory'), achievements: text('Logros del juego', 'Game achievements'), progress: text('Capítulos completados', 'Completed chapters'),
  phone: text('Teléfono', 'Phone'), knowledge: text('Conocimiento', 'Knowledge'), ring: text('Anillo de boda', 'Wedding ring'), family: text('Familia', 'Family'), bugs: text('Bugs resueltos', 'Bugs resolved'),
  event: text('Evento inesperado', 'Unexpected event'), freelance: text('22:47 · Cliente freelance', '22:47 · Freelance client'), call: text('«Perdona que te escriba tan tarde… Solo es una cosilla. La web ha dejado de funcionar».', '“Sorry to message so late… Just one little thing. The website stopped working.”'),
  accept: text('Aceptar', 'Accept'), acceptAnyway: text('Aceptar porque sabes que vas a aceptar', 'Accept because you know you will anyway'), sideFix: text('La configuración apunta a localhost. Selecciona la corrección para cerrar la secundaria.', 'Configuration points to localhost. Select the fix to close the side quest.'),
  fixConfig: text('Restaurar la URL pública verificada', 'Restore the verified public URL'), sideDone: text('Secundaria resuelta. Recompensa: «¿Puedes cambiar también el botón?».', 'Side quest solved. Reward: “Can you change the button too?”'),
  incident: text('La entrega sigue pendiente. Producción acaba de caer y el pipeline está rojo.', 'Delivery is still pending. Production just went down and the pipeline is red.'),
  investigate: text('Investigar producción', 'Investigate production'), delegate: text('Avisar al equipo y pedir cobertura', 'Notify the team and ask for cover'), defer: text('Continuar la tarea', 'Continue the task'),
  investigateResult: text('Impacto contenido. El pipeline queda pendiente en el diario: vuelve a él antes de entregar.', 'Impact contained. The pipeline stays pending in the journal: return to it before delivery.'),
  deferResult: text('El impacto sigue abierto. La tarea puede esperar: investiga o pide cobertura.', 'Impact remains open. The task can wait: investigate or ask for cover.'),
  coverResult: text('EQUIPO · «Nos encargamos». La incidencia y la comunicación tienen responsables.', 'TEAM · “We’ve got this.” The incident and communication now have owners.'),
  pipelinePending: text('Pendiente · recuperar pipeline', 'Pending · recover pipeline'), repair: text('Reparar y verificar pipeline', 'Repair and verify pipeline'),
  personal: text('Evento personal', 'Personal event'), weddingAction: text('Recordar los anillos → decir «sí»', 'Remember the rings → say “I do”'), weddingDone: text('Casados · +∞ aventuras compartidas. Un guiño personal, no una valoración profesional.', 'Married · +∞ shared adventures. A personal wink, not a professional rating.'),
  welcomeEmma: text('Bienvenida, Emma', 'Welcome, Emma'), familyDone: text('La familia primero · equipo de tres.', 'Family first · party of three.'),
  friday: text('Viernes, 18:43. Estás a punto de desplegar. MARGA: «¿Vienes?».', 'Friday, 18:43. You are about to deploy. MARGA: “Coming?”'), home: text('Ir a casa', 'Go home'), deploy: text('Desplegar con cobertura acordada', 'Deploy with agreed cover'),
  homeResult: text('El despliegue espera a una ventana con cobertura. Hay vida fuera del código.', 'Deployment waits for a staffed window. There is life beyond code.'),
  baby: text('Emma necesita a papá. Puedes parar: el equipo está ahí.', 'Emma needs Dad. You can stop: the team is there.'),
  silence: text('22:47 · … … … Nadie llama. La cadena freelance termina al llegar a Nokia.', '22:47 · … … … No calls. The freelance chain ends on reaching Nokia.'),
  returnMission: text('Volver a la misión', 'Return to mission'), close: text('Cerrar', 'Close'), retry: text('Revisa el orden indicado por la evidencia y vuelve a intentarlo.', 'Check the order indicated by the evidence and try again.'),
  saved: text('Guardado local automático', 'Automatic local save'), saveError: text('No se puede guardar en este navegador. La partida sigue disponible durante esta sesión.', 'This browser cannot save. Your game remains available for this session.'),
  invalidSave: text('La partida guardada no era compatible. Puedes iniciar una nueva.', 'The saved game was incompatible. You can start a new one.'),
  reset: text('¿Empezar de nuevo y reemplazar la partida guardada?', 'Start over and replace the saved game?'), confirmReset: text('Sí, nueva partida', 'Yes, new game'), cancel: text('Cancelar', 'Cancel'),
  recovered: text('Sistema recuperado', 'System recovered'), current: text('Nivel actual', 'Current level'), ongoing: text('Carrera en curso', 'Career in progress'), perspective: text('La misma persona. Otra perspectiva.', 'Same person. Different perspective.'),
  tourIntro: text('Todo empieza con un problema pequeño. Caminar, preguntar, probar.', 'It starts with a small problem. Walk, ask, test.'),
  tourMiddle: text('Los proyectos crecen. Freelance comparte espacio con el trabajo. La vida también ocurre.', 'Projects grow. Freelance shares space with work. Life happens too.'),
  tourEnd: text('Ahora ves el sistema completo. El CV siempre está a un clic; esta carrera continúa.', 'Now you see the whole system. The CV is always one click away; this career continues.'),
  tourSkip: text('Terminar tour', 'Finish tour'),
  bugLabel: text('Busca el bug', 'Bug hunt'), traceLabel: text('Sigue la traza', 'Trace hunt'), bottleneckLabel: text('Encuentra el cuello de botella', 'Bottleneck'), routingLabel: text('Conecta el flujo', 'Flow routing'), priorityLabel: text('Ordena las prioridades', 'Prioritization'), architectureLabel: text('Decisiones y consecuencias', 'Architecture decisions'),
};
