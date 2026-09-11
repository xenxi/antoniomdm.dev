import { useLocale } from '../i18n/context';
import { useEffect, useRef, useState } from 'preact/hooks';
import { getPortfolio } from '../data/portfolio';
import type { ArcadeProps } from './contract';
import '../styles/arcade.css';

export default function Arcade({ content, preferences, exit, navigate }: ArcadeProps) {
  const { locale, t } = useLocale();
  const { profile, projects, experience } = getPortfolio(locale);
  const ref = useRef<HTMLElement>(null); const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false); const [error, setError] = useState('');
  useEffect(() => { ref.current?.focus(); return () => { audio.current?.pause(); if (audio.current) { audio.current.removeAttribute('src'); audio.current.load(); } }; }, []);
  async function toggleMusic() {
    if (playing) { audio.current?.pause(); setPlaying(false); return; }
    try { audio.current ??= new Audio('/audio/arcade_01.mp3'); audio.current.loop = true; audio.current.volume = 0.25; await audio.current.play(); setPlaying(true); } catch { setError(t("Music could not play. You can still explore.")); }
  }
  return <section ref={ref} tabIndex={-1} class="arcade-world" aria-label={t("Arcade preview")} onKeyDown={event => { if (event.key === 'Escape') exit(); }}>
    <header><span>{t("ANTONIOMDM / OTHER REALITY")}</span><button onClick={exit}>{t("← Return to desktop")}</button></header>
    <div class="arcade-intro"><p class="eyebrow">{t("WORLD 01 / FOUNDATION PREVIEW")}</p><h1>{t("A world of")}<br /><span>{t("possibilities.")}</span></h1><p>{t("Same person. Different reality.")}</p><p class="muted">{profile.shortName}{t("'s future portfolio world.")}<br />{t("Choose a destination to return to its desktop app.")}</p></div>
    <nav class="world-destinations" aria-label={t("World destinations")}><button onClick={() => navigate('/projects/')}>{t("01 / Projects")}{' '}<small>{projects[0].name}</small></button><button onClick={() => navigate('/experience/')}>{t("02 / Career")}{' '}<small>{experience[0].company}</small></button><button onClick={() => navigate('/notes/')}>{t("03 / Library")}{' '}<small>{content.notes.length} {t("note to discover")}</small></button><button onClick={() => navigate('/lab/')}>{t("04 / Lab")}{' '}<small>{t("Ideas in progress")}</small></button></nav>
    <footer><span>{t("WORLD UNDER CONSTRUCTION / WALKABLE MAP PLANNED")}</span>{preferences.sound && preferences.music ? <button onClick={toggleMusic}>{playing ? t("Pause music") : t("Play music")}</button> : <span>{t("Sound off · Enable sound and music in Settings")}</span>}<span role="status">{error}</span></footer>
  </section>;
}
