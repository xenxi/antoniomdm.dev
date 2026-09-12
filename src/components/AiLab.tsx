import type { ComponentChildren } from 'preact';
import { useLocale } from '../i18n/context';
import { aiLabAxes, aiLabBoundaries, aiLabLanding, aiLabPrinciples, getAiLabCases } from '../data/aiLab';

type Localized = { es: string; en: string };
type CaseItem = ReturnType<typeof getAiLabCases>[number];

function Section({ id, title, children }: { id: string; title: string; children: ComponentChildren }) {
  return <section id={id} class="ai-lab-section"><h2>{title}</h2><div class="ai-lab-section-body">{children}</div></section>;
}

function State({ value, label }: { value: string; label: string }) {
  return <span class={`ai-lab-state ai-lab-state-${value.toLowerCase()}`}>{label}</span>;
}

function Architecture({ id, item, label }: { id: string; item: NonNullable<CaseItem['architecture']>; label: string }) {
  return <figure class="ai-lab-diagram" aria-labelledby={`${id}-architecture-title`}>
    <h2 id={`${id}-architecture-title`}>{label}: {item.title}</h2>
    <figcaption>{item.caption}</figcaption>
    <div class="ai-lab-architecture">
      {item.groups.map(group => <section key={group.id} class="ai-lab-architecture-group" data-parallel={group.parallel ? 'true' : undefined}>
        <h3>{group.title}</h3>
        <ol class="ai-lab-nodes">{group.nodes.map(node => <li key={node}>{node}</li>)}</ol>
        {group.note && <p class="ai-lab-note">{group.note}</p>}
      </section>)}
    </div>
  </figure>;
}

function Flow({ id, item, label }: { id: string; item: NonNullable<CaseItem['flow']>; label: string }) {
  return <figure class="ai-lab-diagram" aria-labelledby={`${id}-flow-title`}>
    <h2 id={`${id}-flow-title`}>{label}: {item.title}</h2>
    <figcaption>{item.caption}</figcaption>
    <ol class="ai-lab-flow">{item.steps.map(step => <li key={step.id}><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol>
  </figure>;
}

function ClaimList({ title, items, stateLabel }: { title: string; items: CaseItem['nonClaims']; stateLabel: (state: string) => string }) {
  return <section class="ai-lab-non-claims" aria-labelledby="ai-lab-non-claims-title">
    <h2 id="ai-lab-non-claims-title">{title}</h2>
    <ul>{items.map(item => <li key={item.id}><State value={item.state} label={stateLabel(item.state)} /><span>{item.label}</span></li>)}</ul>
  </section>;
}

export default function AiLab({ path }: { path: string }) {
  const { locale, t } = useLocale();
  const cases = getAiLabCases(locale);
  const stateLabel = (state: string) => state === 'NOT_CLAIMED' ? t('NOT CLAIMED') : state === 'DESIGNED' ? t('DESIGNED') : t('IN PROGRESS');
  const selected = cases.find(item => item.slug && path === `/ai-lab/${item.slug}/`);
  return selected ? <AiLabCase item={selected} stateLabel={stateLabel} /> : <AiLabLanding cases={cases} stateLabel={stateLabel} />;
}

function AiLabLanding({ cases, stateLabel }: { cases: CaseItem[]; stateLabel: (state: string) => string }) {
  const { locale, t, href } = useLocale();
  const l = (value: Localized) => value[locale];
  const professional = cases.find(item => item.type === 'PROFESSIONAL_AI');
  const historical = cases.filter(item => item.type === 'HISTORICAL_AI');
  return <article class="ai-lab ai-lab-landing" data-ai-lab>
    <header class="ai-lab-hero">
      <p class="eyebrow">{l(aiLabLanding.eyebrow)}</p>
      <h1>{l(aiLabLanding.title)}</h1>
      <p class="lead">{l(aiLabLanding.lead)}</p>
    </header>

    <section class="ai-lab-axes" aria-labelledby="ai-lab-axes-title">
      <h2 id="ai-lab-axes-title">{l(aiLabLanding.axisTitle)}</h2>
      <div class="ai-lab-axis-grid">
        {aiLabAxes.map((axis, index) => <a key={axis.id} class={`ai-lab-axis ai-lab-axis-${index + 1}`} href={href(axis.href)}>
          <span class="ai-lab-axis-index" aria-hidden="true">0{index + 1}</span>
          <h3>{l(axis.title)}</h3>
          <p class="ai-lab-axis-question">{l(axis.question)}</p>
          <p>{l(axis.summary)}</p>
          <small>{l(axis.evidence)}</small>
          <span class="ai-lab-open">{t('Open case')} <span aria-hidden="true">↗</span></span>
        </a>)}
      </div>
    </section>

    {professional && <section class="ai-lab-professional" aria-labelledby="ai-lab-professional-title">
      <p class="eyebrow">{l(aiLabLanding.professionalTitle)}</p>
      <a class="ai-lab-feature" href={href(`/ai-lab/${professional.slug}/`)}>
        <div><h2 id="ai-lab-professional-title">{professional.title}</h2><p>{professional.summary}</p></div>
        <span class="ai-lab-open">{t('Open case')} <span aria-hidden="true">↗</span></span>
      </a>
    </section>}

    <section class="ai-lab-historical" aria-labelledby="ai-lab-historical-title">
      <p class="eyebrow">{l(aiLabLanding.historicalTitle)}</p>
      <h2 id="ai-lab-historical-title">{l(aiLabLanding.historicalTitle)}</h2>
      <p class="muted">{l(aiLabLanding.historicalLead)}</p>
      <div class="ai-lab-history-grid">{historical.map(item => <article key={item.id} class="ai-lab-history">
        <p class="ai-lab-history-eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p>{item.lead}</p>
        <div class="tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
        <ul class="ai-lab-boundary-list">{item.nonClaims.map(nonClaim => <li key={nonClaim.id}>{nonClaim.label}</li>)}</ul>
      </article>)}</div>
    </section>

    <section class="ai-lab-principles" aria-labelledby="ai-lab-principles-title">
      <h2 id="ai-lab-principles-title">{l(aiLabLanding.principlesTitle)}</h2>
      <ul>{aiLabPrinciples.map(principle => <li key={principle.id}><strong>{l(principle.title)}</strong><span>{l(principle.text)}</span></li>)}</ul>
    </section>

    <section class="ai-lab-boundaries" aria-labelledby="ai-lab-boundaries-title">
      <h2 id="ai-lab-boundaries-title">{l(aiLabLanding.boundariesTitle)}</h2>
      <ul>{aiLabBoundaries.map(boundary => <li key={boundary.id}><State value="NOT_CLAIMED" label={stateLabel('NOT_CLAIMED')} /><strong>{l(boundary.label)}</strong><span>{l(boundary.detail)}</span></li>)}</ul>
    </section>
  </article>;
}

function AiLabCase({ item, stateLabel }: { item: CaseItem; stateLabel: (state: string) => string }) {
  const { locale, t, href } = useLocale();
  const l = (value: Localized) => value[locale];
  return <article class="ai-lab ai-lab-case" data-ai-lab data-ai-lab-case={item.id}>
    <a class="back-link" href={href('/ai-lab/')}>{l(aiLabLanding.backToLab)}</a>
    <header class="ai-lab-case-header">
      <p class="eyebrow">{item.eyebrow}</p>
      <h1>{item.title}</h1>
      <p class="lead">{item.lead}</p>
      <p class="ai-lab-meta"><State value={item.status} label={item.statusLabel} /></p>
      {item.technologies.length > 0 && <><p class="ai-lab-label">{l(aiLabLanding.technologiesLabel)}</p><div class="tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></>}
    </header>

    <Section id="problem" title={t('Problem / intent')}><p>{item.problem}</p></Section>

    {item.architecture && <Architecture id={item.id} item={item.architecture} label={l(aiLabLanding.architectureLabel)} />}

    {item.capabilities.length > 0 && <section class="ai-lab-capabilities" aria-labelledby="ai-lab-capabilities-title">
      <h2 id="ai-lab-capabilities-title">{l(aiLabLanding.capabilitiesLabel)}</h2>
      <div class="ai-lab-capability-grid">{item.capabilities.map(capability => <article key={capability.id}><h3>{capability.title}</h3><p>{capability.description}</p></article>)}</div>
    </section>}

    {item.flow && <Flow id={item.id} item={item.flow} label={l(aiLabLanding.flowLabel)} />}

    {item.sections.map(section => <Section key={section.id} id={section.id} title={section.title}><p>{section.body}</p></Section>)}

    {item.boundaries.length > 0 && <section class="ai-lab-case-boundaries" aria-labelledby="ai-lab-case-boundaries-title">
      <h2 id="ai-lab-case-boundaries-title">{l(aiLabLanding.boundariesSectionTitle)}</h2>
      <ul>{item.boundaries.map(boundary => <li key={boundary.id}><strong>{boundary.label}</strong><span>{boundary.detail}</span></li>)}</ul>
    </section>}

    {item.nonClaims.length > 0 && <ClaimList title={l(aiLabLanding.nonClaimsTitle)} items={item.nonClaims} stateLabel={stateLabel} />}

    <p class="ai-lab-evidence"><strong>{l(aiLabLanding.evidenceLabel)}:</strong> {item.evidence}</p>
  </article>;
}
