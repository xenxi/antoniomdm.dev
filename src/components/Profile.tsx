import { useLocale } from '../i18n/context';
import type { UiData } from '../data/ui';
import { profileSections, profileSectionForPath } from '../os/profile-sections';
import { registry } from '../os/registry';
import Icon from './Icon';

export function ExperienceContent({ data }: { data: UiData }) {
  return <div class="timeline">{data.portfolio.experience.map(job => <article key={job.id}><p class="eyebrow">{job.period}</p><h2>{job.role}</h2><h3>{job.company}</h3><p>{job.description}</p>{job.note && <p class="muted">{job.note}</p>}</article>)}</div>;
}
export function ProfileContent({ data, brief = false }: { data: UiData; brief?: boolean }) {
  const { profile } = data.portfolio;
  return <><h1>{profile.name}</h1><p class="role">{profile.role}</p><p class="focus-line">{profile.focusLine}</p><p class="profile-intro">{brief ? `${profile.statement.split('. ')[0]}.` : profile.statement}</p></>;
}
export function Availability({ value }: { value: string }) {
  const { t } = useLocale();
  return <span class={`availability availability-${value}`}>{value === 'available' ? t('Available') : value === 'preparing' ? t('Working on it') : t('Unavailable')}</span>;
}
export function PublicShortcuts({ data }: { data: UiData }) {
  return <div class="public-shortcuts">{data.publicLinks.filter(link => ['github', 'linkedin'].includes(link.id)).map(link => link.availability === 'available' && link.url
    ? <a key={link.id} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
    : <span key={link.id}>{link.label} <Availability value={link.availability} /></span>)}</div>;
}
export function PdfStates({ data }: { data: UiData }) {
  const { t } = useLocale();
  return <div class="pdf-states">{data.pdfs.map(pdf => <div key={pdf.language} class="pdf-state"><Icon name="cv" /><div><strong>PDF · {pdf.language === 'es' ? 'Español' : 'English'}</strong><Availability value={pdf.availability} /></div>{pdf.availability === 'available' && pdf.path && <a download href={pdf.path}>{t('Download CV')}</a>}</div>)}</div>;
}
export default function Profile({ path, data }: { path: string; data: UiData }) {
  const { t, href } = useLocale();
  const section = profileSectionForPath(path);
  const { profile } = data.portfolio;
  return <div class="profile-app">
    <nav class="profile-tabs" aria-label={t('Profile sections')}>{profileSections.map(item => <a key={item.id} href={href(item.path)} aria-current={section.id === item.id ? 'page' : undefined}>{t(item.name)}</a>)}</nav>
    <div class="profile-section" data-profile-section={section.id}>
      {section.id === 'overview' ? <>
        <p class="eyebrow profile-loaded"><span class="status-dot" />{t('Profile loaded')}<span>01 / 07</span></p>
        <ProfileContent data={data} brief />
        <nav class="professional-actions" aria-label={t('Professional access')}>{(['experience', 'projects', 'architecture', 'cv', 'contact'] as const).map((id, index) => <a key={id} class={index === 0 ? 'action-primary' : ''} href={href(registry[id].path)}><Icon name={id} /><span>{t(registry[id].name)}</span><span aria-hidden="true">↗</span></a>)}</nav>
        <div class="profile-editorial"><h2>{t('Beyond the role')}</h2><p>{data.humanNote}</p></div>
        <PublicShortcuts data={data} />
      </> : section.id === 'experience' ? <><p class="eyebrow">{t('CAREER / EXPERIENCE')}</p><h1>{t('The journey so far.')}</h1><ExperienceContent data={data} /></>
      : section.id === 'competencies' ? <><h1>{t(section.name)}</h1><div class="competency-list">{data.competencies.map(item => <article key={item.id}><h2>{item.name}</h2>{item.summary && <p>{item.summary}</p>}<div class="tags">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div></article>)}</div></>
      : section.id === 'achievements' ? <><h1>{t(section.name)}</h1><div class="achievement-list">{data.achievements.map(item => <article key={item.id}><h2>{item.title}</h2><p class="lead">{item.summary}</p><p class="muted">{item.scope}</p></article>)}</div></>
      : section.id === 'education' ? <><h1>{t(section.name)}</h1><p>{profile.education}</p></>
      : section.id === 'languages' ? <><h1>{t(section.name)}</h1><p>{profile.spokenLanguages}</p></>
      : <article class="cv-content"><p class="eyebrow">{t('CURRICULUM / PROFILE EXTRACT')}</p><h1>{t('CV')}</h1><div class="extended-cv"><strong>{t('Extended CV')}</strong><Availability value="available" /><a href={href('/cv/?view=reading')}>{t('Reading view ↗')}</a><a download href={href('/cv.txt')}>{t('Download text CV')}</a></div><PdfStates data={data} /><div class="cv-body"><ProfileContent data={data} /><h2>{t('Experience')}</h2><ExperienceContent data={data} /><h2>{t('Education')}</h2><p>{profile.education}</p><h2>{t('Languages')}</h2><p>{profile.spokenLanguages}</p><button class="no-print" onClick={() => window.print()}>{t('Print / Save PDF')}</button></div></article>}
    </div>
  </div>;
}
