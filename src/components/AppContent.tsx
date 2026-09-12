import { useLocale } from '../i18n/context';
import { useState } from 'preact/hooks';
import type { ContentData } from '../data/portfolio';
import type { UiData } from '../data/ui';
import type { AppId } from '../os/types';
import type { Preferences } from '../os/preferences';
import Icon from './Icon';
import Profile from './Profile';
import ProjectThumbnail from './ProjectThumbnail';
import Architecture from './Architecture';
import Platform934 from './Platform934';
export { ProfileContent, ExperienceContent } from './Profile';

interface Props { id: AppId; path: string; content: ContentData; data: UiData; enterArcade?: () => void; preferences?: Preferences; setPreferences?: (value: Preferences) => void; reset?: () => void; open?: (path: string) => void }
export default function AppContent(props: Props) {
  const { locale, t, href } = useLocale();
  const { projects, categories, labs } = props.data.portfolio;
  const { publicLinks } = props.data;
  const { id, path, content, data } = props;
  const [category, setCategory] = useState<string>(t("All projects"));
  const [lab, setLab] = useState<string | null>(null);
  if (['about', 'welcome', 'experience', 'cv'].includes(id)) return <Profile path={path} data={data} />;
  if (id === 'projects') {
    const selected = projects.find(project => path === `/projects/${project.slug}/`);
    if (selected?.slug === 'platform934') return <Platform934 data={data} />;
     if (selected) return <ProjectDetail project={selected} />;
     const allLabel = t("All projects");
     const visible = projects.filter(project => category === allLabel || project.categoryLabel === category);
     return <><p class="eyebrow">{t("WORK / PROJECT EXPLORER")}</p><h1>{t("Things I've built.")}</h1><p class="lead">{t("A professional project portfolio grouped by engineering ecosystem.")}</p><div class="filters" role="group" aria-label={t("Project ecosystems")}>{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div><section class="project-groups" aria-label={t("Projects by ecosystem")}>{visible.map((project, index) => <a class={index === 0 ? `project-card project-depth-${project.depth}` : 'project-card-secondary'} href={href(`/projects/${project.slug}/`)} key={project.slug}><div class="project-art">{index === 0 && <ProjectThumbnail />}<span>{project.order.toString().padStart(2, '0')}</span></div><div><p class="eyebrow">{index === 0 ? t("FEATURED /") : project.categoryLabel} {index === 0 ? project.categoryLabel : `/ ${project.depth}`}</p><h2>{project.name} <span class="arrow" aria-hidden="true">↗</span>{project.featured && <span class="project-featured" aria-label={t("Featured project")}>★</span>}</h2><p>{project.description}</p><p class="project-status"><strong>{project.status}</strong></p><div class="tags">{project.technologies.slice(0, 5).map(tech => <span key={tech}>{tech}</span>)}</div></div></a>)}</section>{category !== allLabel && visible.length === 0 && <div class="empty-state"><Icon name="projects" /><h2>{t("Room for what's next.")}</h2><p>{t("No published projects in this category yet.")}</p><button onClick={() => setCategory(allLabel)}>{t("View all projects")}</button></div>}<EcosystemDiagrams /></>;
  }
  if (id === 'notes') {
    const note = content.notes.find(note => path === `/notes/${note.slug}/`);
    return note ? <article class="prose"><a class="back-link" href={href("/notes/")}>{t("← All notes")}</a><p class="eyebrow">{note.date.slice(0, 10)} / {note.readingTime} {t("MIN READ")}</p><h1>{note.title}</h1><div class="tags">{note.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div data-note-body dangerouslySetInnerHTML={{ __html: note.html || `<p>${t("Loading article…")}</p>` }} />{!note.html && <a href={href(`${path}?view=reading`)}>{t("Reading view ↗")}</a>}</article> : <><p class="eyebrow">{t("NOTES / THE OPEN NOTEBOOK")}</p><h1>{t("Thinking out loud.")}</h1><p class="muted">{t("Notes on software and the things I build.")}</p>{content.notes.map(note => <a class="note-card" key={note.slug} href={href(`/notes/${note.slug}/`)}><p class="eyebrow">{note.date.slice(0, 10)} / {note.readingTime} {t("MIN READ")}</p><h2>{note.title} ↗</h2><p>{note.description}</p><div class="tags">{note.tags.map(tag => <span key={tag}>{tag}</span>)}</div></a>)}<a class="back-link" href={href("/rss.xml")}>{t("Subscribe via RSS ↗")}</a></>;
  }
  if (id === 'architecture') return <Architecture path={path} data={data} />;
  if (id === 'lab') return <><p class="eyebrow">AI LAB</p><h1>{locale === 'es' ? 'Dos ámbitos, una frontera clara.' : 'Two scopes, one clear boundary.'}</h1><p class="muted">{locale === 'es' ? 'IA para ingeniería e IA dentro del software se presentan por separado.' : 'AI for engineering and AI inside software are represented separately.'}</p><div class="lab-list">{labs.map(item => <article key={item.id}><Icon name="lab" /><h2>{item.name}</h2><p>{item.description}</p><button aria-expanded={lab === item.id} onClick={() => setLab(lab === item.id ? null : item.id)}>{lab === item.id ? t("Close concept") : t("Explore concept")} ↗</button>{lab === item.id && <div class="lab-concept"><p>{item.concept}</p></div>}</article>)}</div></>;
  if (id === 'contact') return <><p class="eyebrow">{locale === 'es' ? 'CONTACTO / DISPONIBILIDAD VERIFICADA' : 'CONTACT / VERIFIED AVAILABILITY'}</p><h1>{locale === 'es' ? 'Canales profesionales.' : 'Professional channels.'}</h1><div class="lab-list">{publicLinks.map(link => <article key={link.id}><h2>{link.label}</h2>{link.availability === 'available' && link.url ? <a href={link.url}>{locale === 'es' ? 'Abrir enlace ↗' : 'Open link ↗'}</a> : <p class="muted">{link.availability === 'preparing' ? (locale === 'es' ? 'En preparación' : 'Working on it') : (locale === 'es' ? 'No disponible' : 'Unavailable')}</p>}</article>)}</div></>;
  if (id === 'terminal') return <Terminal open={props.open} data={data} />;
  if (id === 'settings') return <><p class="eyebrow">{t("SYSTEM / PREFERENCES")}</p><h1>{t("Make it your space.")}</h1><p class="muted">{t("Preferences stay in this browser.")}</p><fieldset><legend>{t("Wallpaper")}</legend>{(['nebula', 'midnight'] as const).map(value => <label class="setting" key={value}><span>{value === 'nebula' ? t("Graphite") : t("Midnight")}</span><input type="radio" name="wallpaper" value={value} checked={props.preferences?.wallpaper === value} onChange={() => props.preferences && props.setPreferences?.({ ...props.preferences, wallpaper: value })} /></label>)}</fieldset><fieldset><legend>{t("Motion & audio")}</legend>{([['effects', t("Visual effects")], ['sound', t("Enable sound")], ['music', t("Arcade music")], ['uiSounds', t("UI sounds")]] as const).map(([key,label]) => <label class="setting" key={key}><span>{label}</span><input type="checkbox" checked={props.preferences?.[key] ?? false} onChange={event => props.preferences && props.setPreferences?.({ ...props.preferences, [key]: event.currentTarget.checked })} /></label>)}</fieldset><p class="muted">{t("Music starts only after pressing Play inside Arcade. Reduced motion follows your system preference.")}</p><button class="danger" onClick={props.reset}>{t("Reset desktop & preferences")}</button></>;
  return <div class="arcade-launcher"><Icon name="arcade" /><p class="eyebrow">{t("A PORTAL TO THE OTHER SIDE")}</p><h1>{t("ARCADE MODE")}</h1><p class="lead">{t("Same person. Different reality.")}</p><button class="button primary" onClick={props.enterArcade}>{t("ENTER")}{' '}<span>↗</span></button><p class="muted">{t("A new world is taking shape.")}<br />{t("Step inside the first preview.")}</p></div>;
}
function ProjectDetail({ project }: { project: (ReturnType<typeof import('../data/portfolio').getPortfolio>)['projects'][number] }) {
  const { href, t } = useLocale();
  const isPlatform = project.slug === 'platform934';
  return <article class={`project-detail project-depth-${project.depth}`}><a class="back-link" href={href('/projects/')}>{t('← All projects')}</a><p class="eyebrow">{project.categoryLabel} / {project.depth}</p><div class="project-mark">{project.order.toString().padStart(2, '0')}</div><h1>{project.name}</h1><p class="lead">{project.description}</p><p class="project-status"><strong>{project.status}</strong></p><div class="tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>{isPlatform && <p class="project-note">{t('This project reuses the existing Platform934 case study.')}</p>}<h2>{t('What it is')}</h2><p>{project.description}</p><h2>{t('Engineering story')}</h2><p>{project.overview}</p><h2>{t('Implemented capabilities')}</h2><ul>{project.capabilities.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>{project.plannedCapabilities.length > 0 && <><h2>{t('Designed / planned')}</h2><ul class="project-planned">{project.plannedCapabilities.map((item: string, index: number) => <li key={index}><strong>{t('DESIGNED / PLANNED')}</strong> {item}</li>)}</ul></>}<h2>{t('What it demonstrates')}</h2><p>{project.demonstration}</p>{project.nonClaims.length > 0 && <><h2>{t('Boundaries')}</h2><ul>{project.nonClaims.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul></>}<h2>{t('Links')}</h2><div class="actions">{project.links.map(link => <a class={link.kind === 'live' ? 'button primary' : 'button'} href={link.kind === 'detail' ? href(link.url) : link.url} target={link.kind === 'live' ? '_blank' : undefined} rel={link.kind === 'live' ? 'noreferrer' : undefined} key={link.url}>{link.label} ↗</a>)}</div></article>;
}
function EcosystemDiagrams() {
  const { t } = useLocale();
  return <section class="ecosystem-diagrams" aria-labelledby="ecosystem-diagrams-title"><h2 id="ecosystem-diagrams-title">{t('Ecosystem boundaries')}</h2><figure class="ecosystem-diagram"><figcaption>{t('Media Engineering is a conceptual support model, not one runtime request path.')}</figcaption><p>Platform934 clients → Jellyfin</p><p>Platform934 clients → Platform934 API → Agent → Semantic Kernel → LiteLLM → provider</p><p>Stream Optimizer → {t('automation and media processing')}</p><p>Devagon Alley → {t('private distribution and updates')}</p></figure><div class="commerce-diagrams"><figure class="ecosystem-diagram"><figcaption>{t('Current')}</figcaption><p>Luna Tartas → {t('structured catalogue')} → Luna Studio</p><p>Koso → {t('independent storefront')}</p></figure><figure class="ecosystem-diagram planned"><figcaption><strong>{t('DESIGNED / PLANNED')}</strong></figcaption><p>Luna Studio ↙ Luna Tartas</p><p>Luna Studio ↘ Koso</p></figure></div><figure class="ecosystem-diagram"><figcaption>{t('Personal Developer Experience is conceptual, not a runtime dependency.')}</figcaption><p>AntoñiOS ↔ bio-cli / bio-dev-card</p></figure></section>;
}
function Terminal({ open, data }: { open?: (path: string) => void; data: UiData }) {
  const { t } = useLocale();
  const { profile } = data.portfolio;
  const { terminalIndex } = data;
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([t('AntoñiOS [version 1.0]'), 'antonio@antonios:~$ whoami', profile.role, '', t("Type help to explore.")]);
  const commands = Object.fromEntries(terminalIndex.filter(item => item.route).map(item => [item.id, item.route])) as Record<string, string>;
  function execute(event: Event) {
    event.preventDefault(); const command = input.trim().toLowerCase(); setInput('');
    if (command === 'clear') { setLines([]); return; }
    let response = t("Command not found. Type help.");
    if (command === 'help') response = `help · whoami · ${terminalIndex.map(item => item.id).join(' · ')} · clear · theme · arcade · reboot`;
    if (command === 'whoami') response = `${profile.name} — ${profile.role}`;
    if (command === 'sudo') response = t("Nice try. Curiosity needs no root access.");
    if (command === 'reboot') response = t('Have you tried turning it off and on again?');
    if (command === 'theme' || command === 'arcade') { open?.(command === 'theme' ? '/settings/' : '/arcade/'); response = `${t('Opening')} ${command}…`; }
    if (commands[command]) { open?.(commands[command]); response = `${t("Opening")} ${command}…`; }
    const external = terminalIndex.find(item => item.id === command)?.url; if (external) response = external;
    setLines(previous => [...previous, `antonio@antonios:~$ ${command}`, response].slice(-100));
  }
  return <div class="terminal"><div role="log" aria-live="polite" aria-label={t("Terminal output")}>{lines.map((line,index) => <p key={index}>{line === profile.github ? <a href={profile.github} target="_blank" rel="noreferrer">{line} ↗</a> : line}</p>)}</div><form onSubmit={execute}><label for="terminal-input">antonio@antonios:<span>~$</span></label><input id="terminal-input" aria-label={t("Terminal command")} value={input} onInput={event => setInput(event.currentTarget.value)} autoComplete="off" spellcheck={false} /></form></div>;
}
