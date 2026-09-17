import type { Locale } from '../i18n/core';

export interface ArchitectureDiagramData {
  title: string;
  description: string;
  groups: { title: string; nodes: { label: string; tone?: 'source' | 'change' | 'outcome' }[]; wide?: boolean; note?: string }[];
}

export function getArchitectureDiagram(id: string, locale: Locale): ArchitectureDiagramData {
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  const node = (es: string, en: string, tone?: 'source' | 'change' | 'outcome') => ({ label: l(es, en), tone });
  const title = l('Diagrama conceptual', 'Conceptual diagram');
  if (id === 'vehicle-read-model') return { title, description: l('Evolución conceptual desde una lectura legacy costosa hacia una proyección bulk y después incremental, manteniendo la fuente autoritativa para el estado exacto.', 'Conceptual evolution from an expensive legacy read toward a bulk and then incremental projection, retaining the authoritative source for exact state.'), groups: [
    { title: l('Inicio', 'Initial'), nodes: [node('Ruta legacy autoritativa', 'Authoritative legacy path', 'source'), node('Resolución a nivel de empresa', 'Company-level resolution'), node('Presión y bloqueos de lectura', 'Pressure and blocked reads', 'outcome')] },
    { title: l('Fase 1 · Bulk', 'Phase 1 · Bulk'), nodes: [node('Servicio en segundo plano', 'Background service', 'change'), node('Actualización bulk', 'Bulk update'), node('Proyección de lectura', 'Read projection', 'outcome')] },
    { title: l('Fase 2 · Incremental', 'Phase 2 · Incremental'), nodes: [node('Cambio de negocio', 'Business change', 'source'), node('Outbox', 'Outbox'), node('Evento', 'Event'), node('Actualización incremental', 'Incremental update', 'outcome')] },
    { title: l('Elección de lectura', 'Read choice'), nodes: [node('Lectura frecuente → Proyección', 'Frequent read → Projection', 'change'), node('Estado exacto → Fuente autoritativa', 'Exact state → Authoritative source', 'outcome')] },
  ] };
  if (id === 'testing-infrastructure') return { title, description: l('Secuencia de mejora del testing y comparación entre preparación con efectos laterales y estados semánticos, además del límite HTTP.', 'Testing improvement sequence and comparison between side-effecting setup and semantic states, together with the HTTP boundary.'), groups: [
    { title: l('Evolución recurrente', 'Recurring evolution'), wide: true, nodes: [node('Fricción legacy', 'Legacy friction', 'source'), node('Mejora local', 'Local improvement'), node('Patrón normalizado', 'Normalized pattern'), node('Soporte compartido', 'Shared support'), node('Adopción del equipo', 'Team adoption'), node('Simplificación posterior', 'Later simplification', 'outcome')] },
    { title: l('Preparación del estado', 'State setup'), nodes: [node('Comportamiento para preparar', 'Behavior used for setup', 'source'), node('Efectos laterales y ruido', 'Side effects and noise'), node('Estado semántico enfocado', 'Focused semantic state', 'outcome')] },
    { title: l('Límite externo', 'External boundary'), nodes: [node('Wrapper simulado', 'Mocked wrapper', 'source'), node('Contrato HTTP', 'HTTP contract', 'change'), node('WireMock', 'WireMock', 'outcome')] },
  ] };
  if (id === 'event-summaries') return { title, description: l('Comparación conceptual: enriquecimiento síncrono anterior y resúmenes para consumos afectados, mientras los eventos granulares permanecen.', 'Conceptual comparison: former synchronous enrichment and summaries for affected consumption, while granular events remain.'), groups: [
    { title: l('Antes', 'Before'), nodes: [node('Notification Event', 'Notification Event', 'source'), node('Consumidor', 'Consumer'), node('Enriquecimiento API síncrono', 'Synchronous API enrichment'), node('Contexto requerido', 'Required context', 'outcome')] },
    { title: l('Narrativa que permanece', 'Narrative that remains'), nodes: [node('Cambio de negocio', 'Business change', 'source'), node('Notification Event granular', 'Granular Notification Event', 'outcome')], note: l('No se sustituye globalmente.', 'Not globally replaced.') },
    { title: l('Consumo afectado', 'Affected consumption'), nodes: [node('Cambio de negocio', 'Business change', 'source'), node('Event Summary', 'Event Summary', 'change'), node('Consumidor con contexto relevante', 'Consumer with relevant context', 'outcome')] },
  ] };
  if (id === 'service-boundaries-and-ddd') return { title, description: l('Dos casos de simplificación y el patrón inverso de modelado de dominio. La complejidad debe justificar su coste en cada contexto.', 'Two simplification cases and the inverse domain-modelling pattern. Complexity must justify its cost in each context.'), groups: [
    { title: l('Límite distribuido', 'Distributed boundary'), nodes: [node('Mismo flujo y ownership', 'Same flow and ownership', 'source'), node('Coste remoto sin independencia', 'Remote cost without independence'), node('Retirar separación', 'Remove separation', 'outcome')] },
    { title: l('DDD ceremonial', 'Ceremonial DDD'), nodes: [node('Dominio simple, restricción de rendimiento', 'Simple domain, performance constraint', 'source'), node('Capas sin invariantes', 'Layers without invariants'), node('Simplificar con acoplamiento controlado', 'Simplify with controlled coupling', 'outcome')] },
    { title: l('Patrón recurrente inverso', 'Inverse recurring pattern'), nodes: [node('Reglas y transiciones reales', 'Real rules and transitions', 'source'), node('Value Objects y agregados', 'Value Objects and aggregates'), node('Proteger comportamiento', 'Protect behaviour', 'outcome')] },
  ] };
  if (id === 'incident-diagnosis-agent') return { title, description: l('Investigación con herramientas desde una traza hasta un informe. La acción final es notificar un canal explícito.', 'Tool-based investigation from trace to report. The final action notifies an explicit channel.'), groups: [
    { title: l('Evidencia', 'Evidence'), nodes: [node('traceId', 'traceId', 'source'), node('Adaptador de telemetría', 'Telemetry adapter'), node('Trazas y contexto', 'Traces and context', 'outcome')] },
    { title: l('Investigación', 'Investigation'), nodes: [node('Diagnóstico', 'Diagnosis', 'change'), node('Conocimiento documentado', 'Documented knowledge'), node('Código cuando es necesario', 'Code when needed', 'outcome')] },
    { title: l('Salida controlada', 'Controlled output'), nodes: [node('Informe estructurado', 'Structured report', 'change'), node('Canal de Teams explícito', 'Explicit Teams channel', 'outcome')], note: l('Sin remediación autónoma ni cambios automáticos en producción.', 'No autonomous remediation or automatic production changes.') },
  ] };
  return { title, description: l('Decisión cualitativa que parte de criticidad y churn esperado y elige una intervención táctica o progresiva.', 'Qualitative decision starting from criticality and expected churn and selecting a tactical or progressive intervention.'), groups: [
    { title: l('Señales cualitativas', 'Qualitative signals'), wide: true, nodes: [node('Criticidad', 'Criticality', 'source'), node('Churn esperado', 'Expected churn', 'source'), node('Intervención proporcional', 'Proportional intervention', 'change')] },
    { title: l('Vía táctica', 'Tactical path'), nodes: [node('Comportamiento legacy', 'Legacy behavior', 'source'), node('Seam', 'Seam'), node('Caracterización', 'Characterization'), node('Cambio seguro mínimo', 'Minimal safe change', 'outcome')] },
    { title: l('Vía progresiva', 'Progressive path'), nodes: [node('Implementación legacy', 'Legacy implementation', 'source'), node('Abstracción', 'Abstraction'), node('Convivencia old/new', 'Old/new coexistence'), node('Adopción controlada', 'Controlled adoption'), node('Retirada progresiva', 'Progressive retirement', 'outcome')] },
  ] };
}
