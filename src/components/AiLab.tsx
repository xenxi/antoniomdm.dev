import type { ComponentChildren } from 'preact';
import { useLocale } from '../i18n/context';
import { aiLabAxes, aiLabLanding, getAiLabCases } from '../data/aiLab';

type Localized = { es: string; en: string };
type CaseItem = ReturnType<typeof getAiLabCases>[number];

function Section({ id, title, children }: { id: string; title: string; children: ComponentChildren }) {
  return <section id={id} class="ai-lab-section"><h2>{title}</h2><div class="ai-lab-section-body">{children}</div></section>;
}

function State({ value, label }: { value: string; label: string }) {
  return <span class={`ai-lab-state ai-lab-state-${value.toLowerCase()}`}>{label}</span>;
}

function Architecture({ id, item }: { id: string; item: NonNullable<CaseItem['architecture']> }) {
  return <figure class="ai-lab-diagram" aria-labelledby={`${id}-architecture-title`}>
    <h2 id={`${id}-architecture-title`}>{item.title}</h2>
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

function Flow({ id, item }: { id: string; item: NonNullable<CaseItem['flow']> }) {
  return <figure class="ai-lab-diagram" aria-labelledby={`${id}-flow-title`}>
    <h2 id={`${id}-flow-title`}>{item.title}</h2>
    <figcaption>{item.caption}</figcaption>
    <ol class="ai-lab-flow">{item.steps.map(step => <li key={step.id}><strong>{step.label}</strong><span>{step.detail}</span></li>)}</ol>
  </figure>;
}

function Gallery({ items }: { items: NonNullable<CaseItem['media']> }) {
  const { locale } = useLocale();
  if (!items.length) return null;
  return <section class="ai-lab-gallery" aria-label={locale === 'es' ? 'Imágenes del caso' : 'Case images'}>
    {items.map((image, index) => <figure key={image.src}>
      <a href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${locale === 'es' ? 'Abrir imagen' : 'Open image'}: ${image.alt} ↗`}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={index ? 'lazy' : 'eager'} decoding="async" />
      </a>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>)}
  </section>;
}

function Related({ items }: { items: NonNullable<CaseItem['related']> }) {
  const { locale, href } = useLocale();
  if (!items.length) return null;
  return <nav class="actions ai-lab-related" aria-label={locale === 'es' ? 'Relacionado' : 'Related'}>
    {items.map(link => <a class="button" href={link.external ? link.href : href(link.href)} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} key={link.href}>{link.label} <span aria-hidden="true">↗</span></a>)}
  </nav>;
}

function Limits({ title, items }: { title: string; items: CaseItem['nonClaims'] }) {
  if (!items.length) return null;
  return <section class="ai-lab-non-claims" aria-labelledby="ai-lab-limits-title">
    <h2 id="ai-lab-limits-title">{title}</h2>
    <ul>{items.map(item => <li key={item.id}><span>{item.label}</span></li>)}</ul>
  </section>;
}

export default function AiLab({ path }: { path: string }) {
  const { locale } = useLocale();
  const cases = getAiLabCases(locale);
  const selected = cases.find(item => item.slug && path === `/ai-lab/${item.slug}/`);
  return selected ? <AiLabCase item={selected} /> : <AiLabLanding cases={cases} />;
}

function AiLabLanding({ cases }: { cases: CaseItem[] }) {
  const { locale, t, href } = useLocale();
  const l = (value: Localized) => value[locale];
  const professional = cases.find(item => item.type === 'PROFESSIONAL_AI');
  const historical = cases.filter(item => item.type === 'HISTORICAL_AI');
  return <article class="ai-lab ai-lab-landing" data-ai-lab>
    <header class="ai-lab-hero">
      <p class="eyebrow">{l(aiLabLanding.eyebrow)}</p>
      <h1>{l(aiLabLanding.title)}</h1>
      <div class="ai-lab-intro">{aiLabLanding.intro.map(paragraph => <p key={paragraph.es}>{l(paragraph)}</p>)}</div>
    </header>

    <section class="ai-lab-axes" aria-labelledby="ai-lab-axes-title">
      <h2 id="ai-lab-axes-title">{l(aiLabLanding.axisTitle)}</h2>
      <div class="ai-lab-axis-grid">
        {aiLabAxes.map((axis, index) => <article key={axis.id} class={`ai-lab-axis ai-lab-axis-${index + 1}`}>
          <span class="ai-lab-axis-index" aria-hidden="true">0{index + 1}</span>
          <h3>{l(axis.title)}</h3>
          <p class="ai-lab-axis-hook">{l(axis.hook)}</p>
          <p>{l(axis.detail)}</p>
          {axis.closing && <p class="ai-lab-axis-closing">{l(axis.closing)}</p>}
          <div class="ai-lab-axis-actions">
            <a class="ai-lab-open" href={href(axis.caseHref)}>{t('Open case')} <span aria-hidden="true">↗</span></a>
            <a class="ai-lab-related-link" href={axis.relatedExternal ? axis.relatedHref : href(axis.relatedHref)} target={axis.relatedExternal ? '_blank' : undefined} rel={axis.relatedExternal ? 'noopener noreferrer' : undefined}>{l(axis.relatedLabel)} <span aria-hidden="true">↗</span></a>
          </div>
        </article>)}
      </div>
    </section>

    {professional && <section class="ai-lab-professional" aria-labelledby="ai-lab-professional-title">
      <h2 id="ai-lab-professional-title">{l(aiLabLanding.professionalTitle)}</h2>
      <h3>{professional.title}</h3>
      <p>{l(aiLabLanding.professionalIntro)}</p>
      <p>{l(aiLabLanding.professionalBody)}</p>
      <p>{l(aiLabLanding.professionalDetail)}</p>
      <p class="ai-lab-professional-closing"><strong>{l(aiLabLanding.professionalClosing)}</strong></p>
      <a class="ai-lab-open" href={href(`/ai-lab/${professional.slug}/`)}>{t('Open case')} <span aria-hidden="true">↗</span></a>
    </section>}

    <section class="ai-lab-historical" aria-labelledby="ai-lab-historical-title">
      <h2 id="ai-lab-historical-title">{l(aiLabLanding.historicalTitle)}</h2>
      <div class="ai-lab-historical-intro">{aiLabLanding.historicalLead.map(paragraph => <p key={paragraph.es}>{l(paragraph)}</p>)}</div>
      <div class="ai-lab-history-grid">{historical.map(item => <article key={item.id} class="ai-lab-history">
        <p class="ai-lab-history-eyebrow">{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p>{item.lead}</p>
        <div class="tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
        <ul class="ai-lab-boundary-list">{item.nonClaims.map(nonClaim => <li key={nonClaim.id}>{nonClaim.label}</li>)}</ul>
      </article>)}</div>
    </section>
  </article>;
}

function AiLabCase({ item }: { item: CaseItem }) {
  const { locale, href } = useLocale();
  const l = (value: Localized) => value[locale];
  const related = item.related ?? [];
  return <article class="ai-lab ai-lab-case" data-ai-lab data-ai-lab-case={item.id} data-ai-lab-case-name={item.title}>
    <a class="back-link" href={href('/ai-lab/')}>{l(aiLabLanding.backToLab)}</a>
    <header class="ai-lab-case-header">
      <p class="eyebrow">{item.eyebrow}</p>
      <h1>{item.title}</h1>
      <p class="lead">{item.lead}</p>
      <p class="ai-lab-meta"><State value={item.status} label={item.statusLabel} /></p>
      {item.technologies.length > 0 && <><p class="ai-lab-label">{l(aiLabLanding.technologiesLabel)}</p><div class="tags">{item.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></>}
    </header>

    {item.media && item.media.length > 0 && <Gallery items={item.media} />}

    <Section id="problem" title={item.intentTitle}><p>{item.problem}</p></Section>

    {item.architecture && <Architecture id={item.id} item={item.architecture} />}

    {item.capabilities.length > 0 && <section class="ai-lab-capabilities" aria-labelledby="ai-lab-capabilities-title">
      <h2 id="ai-lab-capabilities-title">{l(aiLabLanding.capabilitiesLabel)}</h2>
      <div class="ai-lab-capability-grid">{item.capabilities.map(capability => <article key={capability.id}><h3>{capability.title}</h3><p>{capability.description}</p></article>)}</div>
    </section>}

    {item.flow && <Flow id={item.id} item={item.flow} />}

    {item.sections.map(section => <Section key={section.id} id={section.id} title={section.title}><p>{section.body}</p></Section>)}

    <Limits title={item.limitsTitle} items={item.nonClaims} />

    <Related items={related} />
  </article>;
}
