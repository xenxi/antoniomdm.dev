import type { ComponentChildren } from 'preact';
import type { UiData } from '../data/ui';
import { useLocale } from '../i18n/context';

type CaseStudy = UiData['architectureCases'][number];

const sectionOrder = ['context', 'problem', 'constraints', 'decision', 'implementation', 'tradeoffs', 'result', 'learning'] as const;

function DiagramNode({ children, tone }: { children: ComponentChildren; tone?: 'source' | 'change' | 'outcome' }) {
  return <li class={tone ? `diagram-node diagram-node-${tone}` : 'diagram-node'}>{children}</li>;
}

function Flow({ children }: { children: ComponentChildren }) {
  return <ol class="diagram-flow">{children}</ol>;
}

function ArchitectureDiagram({ item }: { item: CaseStudy }) {
  if (!item.diagram) return null;
  const titleId = `${item.id}-diagram-title`;
  const descriptionId = `${item.id}-diagram-description`;
  return <figure class={`architecture-diagram diagram-${item.id}`} role="group" aria-labelledby={titleId} aria-describedby={descriptionId}>
    <h2 id={titleId}>{item.diagram.title}</h2>
    <figcaption id={descriptionId}>{item.diagram.description}</figcaption>
    <div class="diagram-stages">{item.diagram.groups.map(group => <section class={group.wide ? 'diagram-wide' : undefined} key={group.title}>
      <h3>{group.title}</h3><Flow>{group.nodes.map(value => <DiagramNode key={value.label} tone={value.tone}>{value.label}</DiagramNode>)}</Flow>
      {group.note && <p class="diagram-note">{group.note}</p>}
    </section>)}</div>
  </figure>;
}

function Relations({ item, data }: { item: CaseStudy; data: UiData }) {
  const { locale, href } = useLocale();
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  const experiences = new Map(data.professionalExperience.map(value => [value.id, value.company]));
  const competencies = new Map(data.competencies.map(value => [value.id, value.name]));
  const achievements = new Map(data.achievements.map(value => [value.id, value.title]));
  return <section class="architecture-relations" aria-labelledby="relations-title">
    <h2 id="relations-title">{l('Evidencia y relaciones', 'Evidence and relations')}</h2>
    <div class="relation-groups">
      {item.experienceIds.length > 0 && <div><h3>{l('Experiencia', 'Experience')}</h3>{item.experienceIds.map(id => <a key={id} href={href(`/experience/#${id}`)}>{experiences.get(id)}</a>)}</div>}
      {item.competencyIds.length > 0 && <div><h3>{l('Competencias', 'Competencies')}</h3>{item.competencyIds.map(id => <a key={id} href={href(`/profile/competencies/#${id}`)}>{competencies.get(id)}</a>)}</div>}
      {item.achievementIds.length > 0 && <div><h3>{l('Logros', 'Achievements')}</h3>{item.achievementIds.map(id => <a key={id} href={href(`/profile/achievements/#${id}`)}>{achievements.get(id)}</a>)}</div>}
    </div>
  </section>;
}

export default function Architecture({ path, data }: { path: string; data: UiData }) {
  const { locale, href } = useLocale();
  const l = (es: string, en: string) => locale === 'es' ? es : en;
  const selected = data.architectureCases.find(item => path === `/architecture/${item.slug}/`);
  const competencies = new Map(data.competencies.map(item => [item.id, item.name]));
  if (!selected) return <div class="architecture-app architecture-index">
    <header class="architecture-index-header"><p class="eyebrow">{l('ARQUITECTURA / DECISIONES REALES', 'ARCHITECTURE / REAL DECISIONS')}</p><h1>{l('Decisiones de ingeniería, bajo restricciones.', 'Engineering decisions, under constraints.')}</h1><p>{l('Cuatro casos reales sobre comportamiento operativo, transición y ownership. No son tutoriales, certificaciones ni descripciones genéricas de patrones.', 'Four real cases about operational behavior, transition and ownership. They are not tutorials, certifications or generic pattern descriptions.')}</p></header>
    <div class="architecture-grid">{data.architectureCases.map((item, index) => <a class={`architecture-card architecture-card-${index + 1}`} data-native-navigation href={href(`/architecture/${item.slug}/`)} key={item.id}>
      <span class="case-number" aria-hidden="true">0{index + 1}</span><div><h2>{item.title}</h2><p>{item.summary}</p><ul class="case-themes" aria-label={l('Temas de arquitectura', 'Architecture themes')}>{item.competencyIds.map(id => <li key={id}>{competencies.get(id)}</li>)}</ul><span class="case-open">{l('Abrir caso', 'Open case')} <span aria-hidden="true">↗</span></span></div>
    </a>)}</div>
  </div>;

  const sectionLabels: Record<typeof sectionOrder[number], string> = {
    context: l('Contexto', 'Context'), problem: l('Problema', 'Problem'), constraints: l('Restricciones', 'Constraints'),
    decision: l('Decisión y evolución', 'Decision and evolution'), implementation: l('Implementación', 'Implementation'),
    tradeoffs: 'Trade-offs', result: l('Resultado', 'Result'), learning: l('Lo que aprendí', 'What I learned'),
  };
  const sections = new Map(selected.sections.map(section => [section.id, section.content]));
  return <article class="architecture-app architecture-case" data-architecture-case={selected.id}>
    <a class="back-link" data-native-navigation href={href('/architecture/')}>← {l('Todos los casos', 'All cases')}</a>
    <header class="case-header"><p class="eyebrow">{l('CASO DE ARQUITECTURA', 'ARCHITECTURE CASE STUDY')}</p><h1>{selected.title}</h1><p class="lead">{selected.summary}</p><ul class="case-themes" aria-label={l('Competencias relacionadas', 'Related competencies')}>{selected.competencyIds.map(id => <li key={id}>{competencies.get(id)}</li>)}</ul></header>
    <div class="case-sections">
      {sectionOrder.slice(0, 5).map(id => sections.get(id) && <section id={id} key={id}><h2>{sectionLabels[id]}</h2><p>{sections.get(id)}</p></section>)}
      <ArchitectureDiagram item={selected} />
      {sectionOrder.slice(5).map(id => sections.get(id) && <section id={id} key={id}><h2>{sectionLabels[id]}</h2><p>{sections.get(id)}</p></section>)}
    </div>
    <Relations item={selected} data={data} />
  </article>;
}
