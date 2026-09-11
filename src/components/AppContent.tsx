import { useLocale } from '../i18n/context';
import { useState } from 'preact/hooks';
import { getPortfolio, type ContentData } from '../data/portfolio';
import type { AppId } from '../os/types';
import type { Preferences } from '../os/preferences';
import Icon from './Icon';

interface Props { id: AppId; path: string; content: ContentData; enterArcade?: () => void; preferences?: Preferences; setPreferences?: (value: Preferences) => void; reset?: () => void; open?: (path: string) => void }
export function ExperienceContent() {
  const { locale } = useLocale();
  const { experience } = getPortfolio(locale);
  return <div class="timeline">{experience.map(job => <article key={job.id}><p class="eyebrow">{job.period}</p><h2>{job.role}</h2><h3>{job.company}</h3><p>{job.description}</p><p class="muted">{job.note}</p></article>)}</div>;
}
export function ProfileContent() {
  const { locale } = useLocale();
  const { profile } = getPortfolio(locale);
  return <><h1>{profile.shortName}</h1><p class="role">{profile.role}</p><p>{profile.statement}</p><div class="tags">{profile.skills.map(skill => <span key={skill}>{skill}</span>)}</div></>;
}
export default function AppContent(props: Props) {
  const { locale, t, href } = useLocale();
  const { profile, projects, categories, labs } = getPortfolio(locale);
  const { id, path, content } = props;
  const [category, setCategory] = useState<string>(t("All projects"));
  const [lab, setLab] = useState<string | null>(null);
  if (id === 'welcome') return <div class="welcome-content">
    <p class="eyebrow"><span class="status-dot" /> {t("HELLO, WORLD. WELCOME TO MY SPACE.")}</p>
    <h1>Antonio M.<br /><span>Díaz Moreno.</span></h1>
    <p class="role">{t("Software Architect")}{' '}<span class="muted">{t("/ builder / curious human")}</span></p>
    <p class="statement">{profile.statement}</p>
    <div class="tags">{profile.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
    <div class="actions"><a class="button primary" href={href("/projects/")}>{t("Explore projects")}{' '}<span>↗</span></a><a class="button" href={href("/experience/")}>{t("Experience")}</a></div>
    <div class="welcome-footer"><a href={href("/cv/")}>{t("View CV ↗")}</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><span class="muted">{t("Built with curiosity.")}</span></div>
  </div>;
  if (id === 'projects') {
    const selected = projects.find(project => path === `/projects/${project.slug}/`);
    if (selected) return <article><a class="back-link" href={href("/projects/")}>{t("← All projects")}</a><p class="eyebrow">{t("FEATURED PROJECT /")}{' '}{selected.category}</p><div class="project-mark">9¾</div><h1>{selected.name}</h1><p class="lead">{selected.description}</p><div class="tags">{selected.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><h2>{t("Overview")}</h2><p>{selected.overview}</p><h2>{t("Behind the architecture")}</h2><p class="muted">{selected.status}</p></article>;
    return <><p class="eyebrow">{t("WORK / PROJECT EXPLORER")}</p><h1>{t("Things I've built.")}</h1><p class="muted">{t("Software, experiments and side quests.")}</p><div class="filters" aria-label={t("Project categories")}>{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div>{projects.filter(project => category === t("All projects") || project.category === category).map(project => <a class="project-card" href={href(`/projects/${project.slug}/`)} key={project.slug}><div class="project-art"><span>9¾</span><small>PLATFORM</small></div><div><p class="eyebrow">{t("FEATURED /")}{' '}{project.category}</p><h2>{project.name} <span class="arrow">↗</span></h2><p>{project.description}</p><div class="tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></a>)}{category !== t("All projects") && !projects.some(project => project.category === category) && <div class="empty-state"><Icon name="projects" /><h2>{t("Room for what's next.")}</h2><p>{t("No published projects in this category yet.")}</p><button onClick={() => setCategory(t("All projects"))}>{t("View all projects")}</button></div>}</>;
  }
  if (id === 'experience') return <><p class="eyebrow">{t("CAREER / EXPERIENCE")}</p><h1>{t("The journey so far.")}</h1><ExperienceContent /></>;
  if (id === 'notes') {
    const note = content.notes.find(note => path === `/notes/${note.slug}/`);
    return note ? <article class="prose"><a class="back-link" href={href("/notes/")}>{t("← All notes")}</a><p class="eyebrow">{note.date.slice(0, 10)} / {note.readingTime} {t("MIN READ")}</p><h1>{note.title}</h1><div class="tags">{note.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div dangerouslySetInnerHTML={{ __html: note.html }} /></article> : <><p class="eyebrow">{t("NOTES / THE OPEN NOTEBOOK")}</p><h1>{t("Thinking out loud.")}</h1><p class="muted">{t("Notes on software and the things I build.")}</p>{content.notes.map(note => <a class="note-card" key={note.slug} href={href(`/notes/${note.slug}/`)}><p class="eyebrow">{note.date.slice(0, 10)} / {note.readingTime} {t("MIN READ")}</p><h2>{note.title} ↗</h2><p>{note.description}</p><div class="tags">{note.tags.map(tag => <span key={tag}>{tag}</span>)}</div></a>)}<a class="back-link" href={href("/rss.xml")}>{t("Subscribe via RSS ↗")}</a></>;
  }
  if (id === 'lab') return <><p class="eyebrow">{t("LAB / WORK IN PROGRESS")}</p><h1>{t("Stay curious.")}</h1><p class="muted">{t("Small spaces for exploring how software behaves.")}</p><div class="lab-list">{labs.map(item => <article key={item.id}><Icon name="lab" /><h2>{item.name}</h2><p>{item.description}</p><button aria-expanded={lab === item.id} onClick={() => setLab(lab === item.id ? null : item.id)}>{lab === item.id ? t("Close concept") : t("Explore concept")} ↗</button>{lab === item.id && <div class="lab-concept"><p>{item.concept}</p><small>{t("Concept preview. Interactive simulation planned for a future milestone.")}</small></div>}</article>)}</div></>;
  if (id === 'about') return <><p class="eyebrow">{t("ABOUT / WHOAMI")}</p><ProfileContent /><h2>{t("A software architect's playground.")}</h2><p>{t("This is my corner of the web: a place for the software I build, the things I learn and the ideas still taking shape.")}</p><h2>{t("Education")}</h2><p>{profile.education}</p><h2>{t("Languages")}</h2><p>{profile.spokenLanguages}</p><h2>{t("Languages & tools")}</h2><div class="tags">{profile.languages.map(skill => <span key={skill}>{skill}</span>)}</div><p><a href={profile.github}>{t("Find me on GitHub ↗")}</a></p></>;
  if (id === 'cv') return <article class="cv-content"><p class="eyebrow">{t("CURRICULUM / PROFILE EXTRACT")}</p><ProfileContent /><h2>{t("Experience")}</h2><ExperienceContent /><h2>{t("Education")}</h2><p>{profile.education}</p><h2>{t("Languages")}</h2><p>{profile.spokenLanguages}</p><div class="actions no-print"><button onClick={() => window.print()}>{t("Print / Save PDF")}</button><a class="button" download href={href("/cv.txt")}>{t("Download text CV")}</a><a href={href("/cv/?view=reading")}>{t("Reading view ↗")}</a></div></article>;
  if (id === 'terminal') return <Terminal open={props.open} />;
  if (id === 'settings') return <><p class="eyebrow">{t("SYSTEM / PREFERENCES")}</p><h1>{t("Make it your space.")}</h1><p class="muted">{t("Preferences stay in this browser.")}</p><fieldset><legend>{t("Wallpaper")}</legend>{(['nebula', 'midnight'] as const).map(value => <label class="setting" key={value}><span>{value === 'nebula' ? t("Nebula") : t("Midnight")}</span><input type="radio" name="wallpaper" value={value} checked={props.preferences?.wallpaper === value} onChange={() => props.preferences && props.setPreferences?.({ ...props.preferences, wallpaper: value })} /></label>)}</fieldset><fieldset><legend>{t("Motion & audio")}</legend>{([['effects', t("Visual effects")], ['sound', t("Enable sound")], ['music', t("Arcade music")], ['uiSounds', t("UI sounds")]] as const).map(([key,label]) => <label class="setting" key={key}><span>{label}</span><input type="checkbox" checked={props.preferences?.[key] ?? false} onChange={event => props.preferences && props.setPreferences?.({ ...props.preferences, [key]: event.currentTarget.checked })} /></label>)}</fieldset><p class="muted">{t("Music starts only after pressing Play inside Arcade. Reduced motion follows your system preference.")}</p><button class="danger" onClick={props.reset}>{t("Reset desktop & preferences")}</button></>;
  return <div class="arcade-launcher"><Icon name="arcade" /><p class="eyebrow">{t("A PORTAL TO THE OTHER SIDE")}</p><h1>{t("ARCADE MODE")}</h1><p class="lead">{t("Same person. Different reality.")}</p><button class="button primary" onClick={props.enterArcade}>{t("ENTER")}{' '}<span>↗</span></button><p class="muted">{t("A new world is taking shape.")}<br />{t("Step inside the first preview.")}</p></div>;
}
function Terminal({ open }: { open?: (path: string) => void }) {
  const { locale, t } = useLocale();
  const { profile } = getPortfolio(locale);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState([t('ANTONIOMDM OS [version 1.0]'), t("Type help to explore.")]);
  const commands: Record<string, string> = { projects: '/projects/', experience: '/experience/', notes: '/notes/', lab: '/lab/', arcade: '/arcade/', cv: '/cv/', theme: '/settings/' };
  function execute(event: Event) {
    event.preventDefault(); const command = input.trim().toLowerCase(); setInput('');
    if (command === 'clear') { setLines([]); return; }
    let response = t("Command not found. Type help.");
    if (command === 'help') response = 'help · whoami · projects · experience · notes · lab · arcade · clear · theme · github · cv';
    if (command === 'whoami') response = `${profile.name} — ${profile.role}`;
    if (command === 'sudo') response = t("Nice try. Curiosity needs no root access.");
    if (commands[command]) { open?.(commands[command]); response = `${t("Opening")} ${command}…`; }
    if (command === 'github') response = profile.github;
    setLines(previous => [...previous, `antonio@os ~ $ ${command}`, response].slice(-100));
  }
  return <div class="terminal"><div role="log" aria-live="polite" aria-label={t("Terminal output")}>{lines.map((line,index) => <p key={index}>{line === profile.github ? <a href={profile.github} target="_blank" rel="noreferrer">{line} ↗</a> : line}</p>)}</div><form onSubmit={execute}><label for="terminal-input">antonio@os <span>~ $</span></label><input id="terminal-input" aria-label={t("Terminal command")} value={input} onInput={event => setInput(event.currentTarget.value)} autoComplete="off" spellcheck={false} /></form></div>;
}
