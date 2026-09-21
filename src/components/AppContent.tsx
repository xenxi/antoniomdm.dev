import { useLocale } from '../i18n/context';
import { useState } from 'preact/hooks';
import type { ContentData } from '../data/portfolio';
import type { UiData } from '../data/ui';
import type { AppId } from '../os/types';
import type { Preferences } from '../os/preferences';
import Icon from './Icon';
import Profile, { BackgroundProcesses } from './Profile';
import { ProjectGallery, ProjectLinks, type DisplayProject } from './ProjectMedia';
import ProjectApiReference from './ProjectApiReference';
import Architecture from './Architecture';
import Platform934 from './Platform934';
import AiLab from './AiLab';
import Contact from './Contact';
import Terminal from './Terminal';
import CareerLauncher from './CareerLauncher';
import OutOfScopePreview from './OutOfScopePreview';

interface Props { id: AppId; path: string; content: ContentData; data: UiData; enterArcade?: () => void; preferences?: Preferences; setPreferences?: (value: Preferences) => void; reset?: () => void; open?: (path: string) => void }
export default function AppContent(props: Props) {
  const { t, href } = useLocale();
  const { projects, categories } = props.data.portfolio;
  const { id, path, data } = props;
  const [category, setCategory] = useState<string>(t("All projects"));
  if (['about', 'welcome', 'experience'].includes(id)) return <Profile path={path} data={data} />;
  if (id === 'background') return <BackgroundProcesses data={data} />;
  if (id === 'projects') {
    const selected = projects.find(project => path === `/projects/${project.slug}/`);
    if (selected?.slug === 'platform934') return <Platform934 data={data} />;
     if (selected) return <ProjectDetail project={selected} />;
     const allLabel = t("All projects");
     const visible = projects.filter(project => category === allLabel || project.categoryLabel === category);
      return <><p class="eyebrow">{t("WORK / PROJECT EXPLORER")}</p><h1>{t("Things I’ve built.")}</h1><p class="lead">{t("Ideas, side quests and things that started with ‘give me five minutes’.")}</p><div class="filters" role="group" aria-label={t("Project ecosystems")}>{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div><section class="project-groups" aria-label={t("Projects by ecosystem")}>{visible.map((project, index) => <a class={index === 0 ? `project-card project-depth-${project.depth}` : 'project-card-secondary'} href={href(`/projects/${project.slug}/`)} key={project.slug}><div class={`project-art${project.logo ? " has-logo" : ""}`}>{project.logo ? <img src={project.logo.src} width={project.logo.width} height={project.logo.height} alt="" loading="lazy" decoding="async" /> : <span>{project.order.toString().padStart(2, '0')}</span>}</div><div><p class="eyebrow">{index === 0 ? t("FEATURED /") : project.categoryLabel} {index === 0 ? project.categoryLabel : ''}</p><h2>{project.name} <span class="arrow" aria-hidden="true">↗</span>{project.featured && <span class="project-featured" aria-label={t("Featured project")}>★</span>}</h2><p>{project.description}</p><p class="project-status"><strong>{project.status}</strong></p><div class="tags">{project.technologies.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div></div></a>)}</section>{category !== allLabel && visible.length === 0 && <div class="empty-state"><Icon name="projects" /><h2>{t("Room for what's next.")}</h2><p>{t("No published projects in this category yet.")}</p><button onClick={() => setCategory(allLabel)}>{t("View all projects")}</button></div>}<EcosystemDiagrams /></>;
  }
  if (id === 'blog') return <OutOfScopePreview articles={data.outOfScope} />;
  if (id === 'architecture') return <Architecture path={path} data={data} />;
  if (id === 'lab') return <AiLab path={path} />;
  if (id === 'contact') return <Contact data={data} />;
  if (id === 'terminal') return <Terminal open={props.open} data={data} />;
  if (id === 'settings') return <><p class="eyebrow">{t("SYSTEM / PREFERENCES")}</p><h1>{t("Make it your space.")}</h1><p class="muted">{t("Preferences stay in this browser.")}</p><fieldset><legend>{t("Wallpaper")}</legend>{(['nebula', 'midnight'] as const).map(value => <label class="setting" key={value}><span>{value === 'nebula' ? t("Graphite") : t("Midnight")}</span><input type="radio" name="wallpaper" value={value} checked={props.preferences?.wallpaper === value} onChange={() => props.preferences && props.setPreferences?.({ ...props.preferences, wallpaper: value })} /></label>)}</fieldset><fieldset><legend>{t("Motion & audio")}</legend>{([['effects', t("Visual effects")], ['sound', t("Enable sound")], ['music', t("Arcade music")], ['uiSounds', t("UI sounds")]] as const).map(([key,label]) => <label class="setting" key={key}><span>{label}</span><input type="checkbox" checked={props.preferences?.[key] ?? false} onChange={event => props.preferences && props.setPreferences?.({ ...props.preferences, [key]: event.currentTarget.checked })} /></label>)}</fieldset><p class="muted">{t("Arcade music is enabled by default and starts when you enter or interact with the game. Reduced motion follows your system preference.")}</p><button class="danger" onClick={props.reset}>{t("Reset desktop & preferences")}</button></>;
  return <CareerLauncher enter={props.enterArcade} data={data} />;
}
function ProjectDetail({ project }: { project: DisplayProject }) {
  const { href, locale } = useLocale();
  const es = locale === 'es';
  return <article class={`project-detail project-depth-${project.depth}`} data-project-detail data-project-id={project.id} data-project-name={project.name}>
    <a class="back-link" href={href('/projects/')}>{es ? '← Todos los proyectos' : '← All projects'}</a>
    <header class="project-detail-header">
      <p class="eyebrow">{es ? 'PROYECTOS /' : 'PROJECTS /'} {project.categoryLabel}</p>
      {project.logo && <img class="project-logo" src={project.logo.src} width={project.logo.width} height={project.logo.height} alt="" decoding="async" />}
      <h1>{project.name}</h1><p class="lead">{project.description}</p>
    </header>
    <ProjectGallery images={project.images} />
    <div class="project-facts"><p class="project-status"><span>{es ? 'Estado' : 'Status'}</span><strong>{project.status}</strong></p>
      <div><p class="eyebrow">Stack</p><div class="tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></div>
    </div>
    <ProjectLinks project={project} />
    <section><h2>{project.challengeTitle}</h2><p>{project.challenge}</p></section>
    <section><h2>{es ? 'Decisiones' : 'Decisions'}</h2><p>{project.overview}</p><p>{project.tradeoff}</p></section>
    <section><h2>{es ? 'Qué construí' : 'What I built'}</h2><ul>{project.capabilities.map(item => <li key={item}>{item}</li>)}</ul></section>
    {project.plannedCapabilities.length > 0 && <section><h2>{es ? 'Lo que viene' : 'What’s next'}</h2><ul class="project-planned">{project.plannedCapabilities.map(item => <li key={item}>{item}</li>)}</ul></section>}
    <aside class="project-scope"><h2>{es ? 'Alcance actual' : 'Current scope'}</h2><ul>{project.nonClaims.map(item => <li key={item}>{item}</li>)}</ul></aside>
    {project.id === 'platform934-api' && <ProjectApiReference />}
  </article>;
}
function EcosystemDiagrams() {
  const { t } = useLocale();
  return <section class="ecosystem-diagrams" aria-labelledby="ecosystem-diagrams-title"><h2 id="ecosystem-diagrams-title">{t('Ecosystem boundaries')}</h2><figure class="ecosystem-diagram"><figcaption>{t('Media Engineering is a conceptual support model, not one runtime request path.')}</figcaption><p>Platform934 clients → Jellyfin</p><p>Platform934 clients → Platform934 API → Agent → Semantic Kernel → LiteLLM → provider</p><p>Stream Optimizer → {t('automation and media processing')}</p><p>Devagon Alley → {t('private distribution and updates')}</p></figure><div class="commerce-diagrams"><figure class="ecosystem-diagram"><figcaption>{t('Current')}</figcaption><p>Luna Tartas → {t('structured catalogue')} → Luna Studio</p><p>Koso → {t('independent storefront')}</p></figure><figure class="ecosystem-diagram planned"><figcaption><strong>{t('DESIGNED / PLANNED')}</strong></figcaption><p>Luna Studio ↙ Luna Tartas</p><p>Luna Studio ↘ Koso</p></figure></div><figure class="ecosystem-diagram"><figcaption>{t('Personal Developer Experience is conceptual, not a runtime dependency.')}</figcaption><p>AntoñiOS ↔ bio-cli / bio-dev-card</p></figure></section>;
}
