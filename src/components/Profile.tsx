import { useLocale } from '../i18n/context';
import type { UiData } from '../data/ui';
import { profileSections, profileSectionForPath } from '../os/profile-sections';
import { registry } from '../os/registry';
import Icon from './Icon';
import PixelAvatar from './PixelAvatar';
import { useEffect, useRef } from 'preact/hooks';

export function ExperienceContent({ data }: { data: UiData }) {
  const { href, locale } = useLocale();
  const timeline = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reveal = () => {
      const id = location.hash.slice(1);
      const target = [...(timeline.current?.querySelectorAll<HTMLDetailsElement>('details[id]') ?? [])].find(item => item.id === id);
      if (target) { target.open = true; target.scrollIntoView({ block: 'start' }); }
    };
    reveal(); window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);
  const byId = new Map(data.competencies.map(item => [item.id, item]));
  return <div ref={timeline} class="timeline">{data.professionalExperience.map(job => <details key={job.id} class="timeline-item" id={job.id} open={job.id === 'domingo-alonso'}><summary><span class="eyebrow">{job.period}</span><h2>{job.role}</h2><h3>{job.company}</h3><p>{job.summary}</p></summary><div class="tags">{job.competencyIds.map(id => byId.get(id)).filter(Boolean).slice(0, 6).map(item => <a key={item!.id} href={href(`/profile/competencies/#${item!.id}`)}>{item!.name}</a>)}</div>{job.sections.map(section => <section key={section.id}><h4>{section.title}</h4><p>{section.content}</p></section>)}{job.caseStudyIds.length > 0 && <section><h4>{locale === 'es' ? 'Decisiones y resultados' : 'Decisions and outcomes'}</h4>{job.caseStudyIds.map(id => { const item = data.architectureCases.find(value => value.id === id); return item ? <p key={id}><a data-native-navigation href={href(`/architecture/${item.slug}/`)}>{item.title}</a> — {item.summary}</p> : null; })}</section>}</details>)}</div>;
}

function EvidenceLinks({ ids, data, kind }: { ids: string[]; data: UiData; kind: 'experience' | 'case' | 'project' }) {
  const { href } = useLocale();
  const labels = kind === 'experience' ? new Map(data.professionalExperience.map(x => [x.id, x.company])) : kind === 'case' ? new Map(data.architectureCases.map(x => [x.id, x.title])) : new Map(data.portfolio.projects.map(x => [x.slug, x.name]));
  return <div class="evidence-links">{ids.map(id => labels.get(id) ? <a data-native-navigation={kind === 'case' || undefined} key={id} href={kind === 'experience' ? href(`/experience/#${id}`) : kind === 'case' ? href(`/architecture/${id}/`) : href(`/projects/${id}/`)}>{labels.get(id)}</a> : null)}</div>;
}

function Metric({ metric, t }: { metric: NonNullable<UiData['achievements'][number]['metric']>; t: (v: string) => string }) {
  return <div class="metric"><strong>{metric.before ?? metric.range}</strong>{metric.after && <><span aria-hidden="true">↓</span><strong>{metric.after}</strong></>}<span>{metric.unit}</span><small>{metric.approximate ? t('Approximate') : ''}{metric.derivation ? ` · ${t('Derived')}` : ''}</small></div>;
}
export function ProfileContent({ data, brief = false }: { data: UiData; brief?: boolean }) {
  const { profile } = data.portfolio;
  return <><h1>{profile.name}</h1><p class="role">{profile.role}</p><p class="focus-line">{profile.focusLine}</p><p class="profile-intro">{brief ? `${profile.introduction}` : profile.statement}</p></>;
}
export function Availability({ value }: { value: string }) {
  const { t } = useLocale();
  return <span class={`availability availability-${value}`}>{value === 'available' ? t('Available') : value === 'preparing' ? t('Working on it') : t('Unavailable')}</span>;
}
export function PublicShortcuts({ data }: { data: UiData }) {
  const { t } = useLocale();
  return <div class="public-shortcuts">
    <a href={data.contactMailto}>{t('Email')}</a>
    <a href={data.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
    <a href={data.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
    <a href={data.contact.website} target="_blank" rel="noreferrer">{t('Website')} ↗</a>
  </div>;
}
export function PdfStates({ data }: { data: UiData }) {
  const { locale, t } = useLocale();
  const languageName = (language: 'es' | 'en') => locale === 'es' ? (language === 'es' ? 'Español' : 'Inglés') : (language === 'es' ? 'Spanish' : 'English');
  return <div class="pdf-states">{data.pdfs.map(pdf => <div key={pdf.language} class="pdf-state"><Icon name="cv" /><div><strong>PDF · {languageName(pdf.language)}</strong><Availability value={pdf.availability} /></div>{pdf.availability === 'available' && pdf.path && <a download href={pdf.path} aria-label={`${t('Download CV')} — ${languageName(pdf.language)} — PDF`}>{t('Download CV')} — {languageName(pdf.language)} — PDF</a>}</div>)}</div>;
}

function RichText({ value }: { value: string }) {
  const parts = value.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return <>{parts.map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part.startsWith('*') && part.endsWith('*') ? <em key={index}>{part.slice(1, -1)}</em> : part)}</>;
}

function PersonalProcessSprites() {
  return <div class="personal-processes" aria-hidden="true">
    <svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M9 1h3v2h-1v2H9v2H7v6H5v2H2v-2H1v-3h1V8h3v1h2V5h2zM3 10v3h2v-3z" /></svg>
    <svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M1 3h6v1h2V3h6v10H9v1H7v-1H1zm2 2v6h4V5zm6 0v6h4V5z" /></svg>
    <svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M5 1h6v2h2v2h2v8h-2v2H3v-2H1V5h2V3h2zm0 2v2h6V3zM3 7v5h10V7h-2v2H5V7zm3 3v3h4v-3z" /></svg>
    <svg viewBox="0 0 16 16" shape-rendering="crispEdges"><path d="M3 2h3v3H3zm7 0h3v3h-3zM1 7h7v2h1V7h6v7h-3v-4h-2v4H6v-4H4v4H1z" /></svg>
  </div>;
}

function InterestTokens({ interests }: { interests: string[] }) {
  return <div class="personal-interests">{interests.map(interest => <span key={interest}><i aria-hidden="true" />{interest}</span>)}</div>;
}

function PersonalNote({ note }: { note: UiData['humanNote'] }) {
  const { t, href } = useLocale();
  return <section class="profile-editorial" aria-labelledby="personal-note-title">
      <div class="personal-note-heading"><h2 id="personal-note-title">{t('Beyond the role')}</h2><PersonalProcessSprites /></div>
      <p>{note.teaser}</p>
      <InterestTokens interests={note.interests} />
      <a class="personal-note-cta" href={href('/background-processes/')}>{t('View my background processes')} <span aria-hidden="true">→</span></a>
    </section>;
}

export function BackgroundProcesses({ data }: { data: UiData }) {
  const { t } = useLocale();
  const note = data.humanNote;
  return <div class="background-processes-app"><div class="personal-window-status"><span>{t('Personal processes currently running')}</span><PersonalProcessSprites /></div><article tabIndex={0} aria-label={t('Personal background story')}>{note.paragraphs.map((paragraph, index) => <p key={index}><RichText value={paragraph} /></p>)}<InterestTokens interests={note.interests} /></article></div>;
}

export default function Profile({ path, data }: { path: string; data: UiData }) {
  const { locale, t, href } = useLocale();
  const section = profileSectionForPath(path);
  const { profile } = data.portfolio;
  return <div class="profile-app">
    <nav class="profile-tabs" aria-label={t('Profile sections')}>{profileSections.map(item => <a key={item.id} href={href(item.path)} aria-current={section.id === item.id ? 'page' : undefined}>{t(item.name)}</a>)}</nav>
    <div class="profile-section" data-profile-section={section.id}>
      {section.id === 'overview' ? <>
        <div class="profile-overview"><div class="profile-main">
        <p class="eyebrow profile-loaded"><span class="status-dot" />{t('PROFILE.EXE / ONLINE')}</p>
        <div class="profile-copy"><h1 aria-label={profile.name}><span>{profile.shortName.split(' ')[0]}</span><span>{profile.shortName.split(' ').slice(1).join(' ')}<i aria-hidden="true">_</i></span></h1><p class="role">{profile.role}</p><p class="focus-line">{profile.focusLine}</p><p class="profile-intro">{profile.statement.split('. ')[0]}.</p></div>
        <PixelAvatar />
        <nav class="professional-actions" aria-label={t('Professional access')}>{(['experience', 'projects', 'architecture', 'cv', 'contact'] as const).map((id, index) => <a key={id} class={index === 0 ? 'action-primary' : ''} href={href(registry[id].path)}><Icon name={id} /><span>{t(registry[id].name)}</span><span aria-hidden="true">↗</span></a>)}</nav>
        <p class="contact-summary">{data.contact.location[locale]} · {data.contact.availability[locale]}</p>
        <PublicShortcuts data={data} />
        </div><aside class="system-profile" aria-label={t('System profile')}><h2>SYSTEM.SYS</h2><dl>
          {data.systemFacts.map(fact => <div key={fact.id}><dt><Icon name={fact.id === 'experience' ? 'experience' : 'architecture'} />{t(fact.label)}</dt><dd>{fact.value}</dd></div>)}
        </dl></aside>
         <div class="profile-bottom"><section class="profile-impact" aria-labelledby="profile-impact-title"><div><p class="eyebrow">{t('IMPACT / EVIDENCE')}</p><h2 id="profile-impact-title">{t('Results that show the work.')}</h2></div><div class="impact-grid">{data.achievements.map(item => <article key={item.id}><h3>{item.title}</h3><p>{item.summary}</p><p class="muted">{item.scope}</p><EvidenceLinks ids={item.caseStudyIds} data={data} kind="case" />{item.metric && <Metric metric={item.metric} t={t} />}</article>)}</div></section><section class="profile-stack"><h2>{t('Tech stack')}</h2><div class="tags">{data.overviewSkills.map(skill => <span key={skill}>{skill}</span>)}</div><a href={href('/profile/competencies/')}>{t('View full stack')} <span aria-hidden="true">→</span></a></section>
        <PersonalNote note={data.humanNote} /></div></div>
      </> : section.id === 'experience' ? <><p class="eyebrow">{t('CAREER / EXPERIENCE')}</p><h1>{t('The journey so far.')}</h1><ExperienceContent data={data} /></>
      : section.id === 'competencies' ? <><h1>{t(section.name)}</h1><div class="competency-list">{data.competencies.map(item => <article id={item.id} key={item.id}><h2>{item.name}</h2><p class="classification">{item.classification} · {item.recency}</p>{item.summary && <p>{item.summary}</p>}<div class="tags">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div><h3>{t('Evidence')}</h3><EvidenceLinks ids={item.experienceIds} data={data} kind="experience" /><EvidenceLinks ids={item.caseStudyIds} data={data} kind="case" /><EvidenceLinks ids={item.projectIds} data={data} kind="project" /></article>)}</div></>
      : section.id === 'achievements' ? <><h1>{t(section.name)}</h1><div class="achievement-list">{data.achievements.map(item => <article id={item.id} key={item.id}><h2>{item.title}</h2><p class="lead">{item.summary}</p><p class="muted">{item.scope}</p>{item.metric && <Metric metric={item.metric} t={t} />}<h3>{t('Evidence')}</h3><EvidenceLinks ids={item.experienceIds} data={data} kind="experience" /><EvidenceLinks ids={item.caseStudyIds} data={data} kind="case" /></article>)}</div></>
      : section.id === 'languages' ? <><h1>{t(section.name)}</h1><p>{profile.spokenLanguages}</p></>
      : <article class="cv-content"><p class="eyebrow">{t('CURRICULUM / PROFILE EXTRACT')}</p><h1>{t('CV')}</h1><div class="extended-cv"><strong>{t('Extended CV')}</strong><Availability value="available" /><a href={href('/cv/?view=reading')}>{t('Reading view ↗')}</a>{data.cvAssets.filter(asset => asset.format === 'txt').map(asset => <a key={asset.id} download href={asset.publicPath}>{asset.label[locale]}</a>)}</div><PdfStates data={data} /><div class="cv-body"><ProfileContent data={data} /><h2>{t('Experience')}</h2><ExperienceContent data={data} /><h2>{t('Education')}</h2><p>{profile.education}</p><h2>{t('Languages')}</h2><p>{profile.spokenLanguages}</p><button class="no-print" onClick={() => window.print()}>{t('Print / Save PDF')}</button></div></article>}
    </div>
  </div>;
}
