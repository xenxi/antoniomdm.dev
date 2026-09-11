import { useLocale } from '../i18n/context';
import { LocaleContext } from '../i18n/context';
import { basePath, localeForPath, localizedPath } from '../i18n/core';
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'preact/hooks';
import type { ComponentType, TargetedMouseEvent, TargetedKeyboardEvent } from 'preact';
import type { ContentData } from '../data/portfolio';
import type { UiData } from '../data/ui';
import { launcherApplications as applications, desktopApplications, appForPath, normalizePath, registry } from '../os/registry';
import { initialState, windowReducer } from '../os/window-manager';
import { defaults, parsePreferences, storageKey, type Preferences } from '../os/preferences';
import type { Size, WindowAction } from '../os/types';
import type { ArcadeProps } from '../arcade/contract';
import AppContent from './AppContent';
import Window from './Window';
import Icon from './Icon';
import { PublicShortcuts, Availability } from './Profile';

const initialViewport = { width: 1440, height: 850 };
export default function Desktop({ path, content, data }: { path: string; content: ContentData; data: UiData }) {
  return <LocaleContext.Provider value={localeForPath(path)}><DesktopContent path={basePath(path)} content={content} data={data} /></LocaleContext.Provider>;
}
function DesktopContent({ path, content, data }: { path: string; content: ContentData; data: UiData }) {
  const { locale, t, href } = useLocale();
  const initialApp = appForPath(path) ?? 'about';
  const [state, dispatch] = useReducer(windowReducer, windowReducer(initialState, { type: 'open', id: initialApp, path, viewport: initialViewport }));
  const [viewport, setViewport] = useState<Size>(initialViewport);
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [ready, setReady] = useState(false);
  const [launcher, setLauncher] = useState(false);
  const [search, setSearch] = useState('');
  const [clock, setClock] = useState('');
  const [online, setOnline] = useState(true);
  const [Arcade, setArcade] = useState<ComponentType<ArcadeProps> | null>(null);
  const [mode, setMode] = useState<'desktop' | 'loading' | 'arcade'>('desktop');
  const [notice, setNotice] = useState('');
  const [loadedContent, setLoadedContent] = useState(content);
  const pendingNotes = useRef(new Set<string>());
  async function loadNote(value: string) {
    const note = loadedContent.notes.find(note => value === `/notes/${note.slug}/`);
    if (!note || note.html || pendingNotes.current.has(value)) return;
    pendingNotes.current.add(value);
    try {
      const response = await fetch(href(value));
      if (!response.ok) throw new Error('Note request failed');
      const html = new DOMParser().parseFromString(await response.text(), 'text/html').querySelector('[data-note-body]')?.innerHTML;
      if (!html) throw new Error('Missing note body');
      setLoadedContent(previous => ({ notes: previous.notes.map(item => item.slug === note.slug ? { ...item, html } : item) }));
    } catch { setNotice(t('This article could not load. Open reading view or try again.')); }
    finally { pendingNotes.current.delete(value); }
  }
  const workspace = useRef<HTMLDivElement>(null);
  const launcherButton = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const viewportRef = useRef(viewport); viewportRef.current = viewport;
  const initialLayout = useRef(true);
  const audioContext = useRef<AudioContext | null>(null);
  const modeGeneration = useRef(0);
  const knownPath = (value: string) => data.knownPaths.includes(value);
  function syncMetadata(value: string) {
    const metadata = data.metadata[value]; if (!metadata) return;
    document.title = `${metadata.title} · AntoñiOS`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.canonical);
    for (const [selector, value] of [
      ['meta[name="description"]', metadata.description], ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description], ['meta[property="og:url"]', metadata.canonical],
      ['meta[property="og:type"]', metadata.note ? 'article' : 'website'],
      ['meta[name="twitter:title"]', metadata.title], ['meta[name="twitter:description"]', metadata.description],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    for (const lang of ['es', 'en', 'x-default'] as const) document.querySelector(`link[hreflang="${lang}"]`)?.setAttribute('href', `https://antoniomdm.dev${localizedPath(value, lang === 'x-default' ? 'es' : lang)}`);
  }
  function syncUrl(value: string) {
    if (normalizePath(location.pathname) !== href(value)) history.pushState({}, '', href(value));
    syncMetadata(value);
  }
  function sound() {
    if (!preferences.sound || !preferences.uiSounds) return;
    try {
      const context = audioContext.current ??= new AudioContext();
      void context.resume(); const oscillator = context.createOscillator(); const gain = context.createGain();
      oscillator.frequency.value = 480; gain.gain.setValueAtTime(0.018, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.07);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.08);
    } catch { /* Audio is optional on unsupported browsers. */ }
  }
  function open(value: string) {
    const next = normalizePath(value); const id = appForPath(next);
    if (!id || !knownPath(next)) return;
    void loadNote(next); dispatch({ type: 'open', id, path: next, viewport: viewportRef.current });
    syncUrl(next); setLauncher(false); setSearch(''); sound();
  }
  function act(action: WindowAction) {
    const next = windowReducer(state, action); dispatch(action);
    if ('id' in action && ['focus', 'restore', 'maximize', 'close', 'minimize'].includes(action.type)) {
      syncUrl(next.openWindows.find(win => win.id === next.activeWindowId)?.path ?? '/');
    }
    if (action.type === 'close' || action.type === 'minimize') {
      requestAnimationFrame(() => {
        if (next.activeWindowId) document.querySelector<HTMLElement>(`[data-window="${next.activeWindowId}"]`)?.focus();
        else (document.querySelector<HTMLElement>(`[data-desktop-app="${action.id}"]`) ?? launcherButton.current)?.focus();
      });
    }
  }
  async function enterArcade() {
    const generation = ++modeGeneration.current; setMode('loading'); setNotice('');
    try {
      const module = await import('../arcade/Arcade');
      if (generation !== modeGeneration.current) return;
      setArcade(() => module.default); setMode('arcade');
    } catch { if (generation === modeGeneration.current) { setMode('desktop'); setNotice(t("Arcade could not load. Please try Enter again.")); } }
  }
  function exitArcade() { modeGeneration.current++; setMode('desktop'); requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-window="arcade"]')?.focus()); }
  useEffect(() => {
    try { setPreferences(parsePreferences(localStorage.getItem(storageKey))); } catch { /* Storage may be disabled. */ }
    setReady(true);
    const resize = () => {
      const rect = workspace.current?.getBoundingClientRect(); if (!rect) return;
      const size = { width: rect.width, height: rect.height }; setViewport(size); dispatch({ type: 'viewport', viewport: size });
      if (initialLayout.current && size.width >= 1100 && initialApp === 'about') {
        const width = size.width >= 1280 ? Math.floor((size.width - 164) * .65) : size.width - 270;
        dispatch({ type: 'geometry', id: 'about', viewport: size, rect: { x: 140, y: 30, width, height: Math.min(810, size.height - 60) } });
        if (size.width >= 1280 && ['/', '/profile/'].includes(path) && !document.documentElement.classList.contains('reading')) {
          const x = 158 + width; const sideWidth = size.width - x - 22;
          const terminalHeight = Math.min(285, Math.floor(size.height * .36));
          for (const [id, y, height] of [['terminal', 62, terminalHeight], ['projects', 62 + terminalHeight + 14, Math.min(380, size.height - terminalHeight - 108)]] as const) {
            dispatch({ type: 'open', id, viewport: size });
            dispatch({ type: 'geometry', id, viewport: size, rect: { x, y, width: sideWidth, height } });
          }
          dispatch({ type: 'focus', id: 'about' });
        }
      }
      initialLayout.current = false;
    };
    resize(); const observer = new ResizeObserver(resize); if (workspace.current) observer.observe(workspace.current);
    const tick = () => setClock(new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date()));
    tick(); const interval = window.setInterval(tick, 15000);
    const connectivity = () => setOnline(navigator.onLine);
    connectivity(); window.addEventListener('online', connectivity); window.addEventListener('offline', connectivity);
    const pop = () => {
      modeGeneration.current++; setMode('desktop'); setLauncher(false);
      const next = normalizePath(basePath(location.pathname)); const id = appForPath(next);
      if (id) { dispatch({ type: 'open', id, path: next, viewport: viewportRef.current }); syncMetadata(next); }
    };
    window.addEventListener('popstate', pop);
    // Retire the old Flutter cache without touching unrelated origin caches.
    if ('serviceWorker' in navigator) void navigator.serviceWorker.getRegistrations().then(registrations => Promise.all(registrations.filter(reg => [reg.active, reg.waiting, reg.installing].some(worker => worker?.scriptURL.includes('/flutter_service_worker.js'))).map(reg => reg.unregister()))).catch(() => {});
    return () => { observer.disconnect(); clearInterval(interval); window.removeEventListener('popstate', pop); window.removeEventListener('online', connectivity); window.removeEventListener('offline', connectivity); void audioContext.current?.close(); };
  }, []);
  useEffect(() => { if (ready) { try { localStorage.setItem(storageKey, JSON.stringify(preferences)); } catch { /* Session preferences still work. */ } } }, [preferences, ready]);
  useLayoutEffect(() => { if (launcher) searchInput.current?.focus(); }, [launcher]);
  function links(event: TargetedMouseEvent<HTMLElement>) {
    const anchor = (event.target as HTMLElement).closest('a');
    if (!anchor || anchor.target || anchor.hasAttribute('download') || anchor.hasAttribute('data-language') || anchor.hasAttribute('data-native-navigation') || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const url = new URL(anchor.href, location.href); const next = normalizePath(basePath(url.pathname));
    if (url.origin === location.origin && !url.search && !url.hash && knownPath(next)) { event.preventDefault(); open(next); }
  }
  function reset() { dispatch({ type: 'reset' }); dispatch({ type: 'open', id: 'about', viewport }); setPreferences({ ...defaults }); syncUrl('/'); setNotice(t("Desktop and preferences reset.")); }
  function keys(event: TargetedKeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && launcher) { event.stopPropagation(); setLauncher(false); launcherButton.current?.focus(); }
    if (event.altKey && event.key.toLowerCase() === 'l') { event.preventDefault(); setLauncher(value => !value); }
  }
  const desktopApps = desktopApplications;
  const activePath = state.openWindows.find(win => win.id === state.activeWindowId)?.path ?? '/';
  return <div class={`os wallpaper-${preferences.wallpaper} ${preferences.effects ? '' : 'effects-off'}`} data-ready={ready} data-shell={viewport.width < 720 ? "mobile" : viewport.width < 1100 ? "tablet" : "desktop"} onClick={links} onKeyDown={keys}>
    <div class="desktop-surface" inert={mode !== 'desktop'}>
    <header class="system-bar"><a class="brand" href={href("/")}><span class="brand-symbol" aria-hidden="true"><img src="/favicon.svg" alt="" width="36" height="36" /></span><strong>Antoñi<span>OS</span></strong><small>v1.0</small></a><nav class="system-menu" aria-label={t("System menu")}><button aria-expanded={launcher} onClick={() => setLauncher(!launcher)}>{t("Apps")}</button></nav><span class="system-tagline">{t("Personal operating system")}</span><div class="system-right"><button class="system-audio" aria-label={preferences.sound ? t("Mute system audio") : t("Enable system audio")} aria-pressed={preferences.sound} onClick={() => setPreferences({ ...preferences, sound: !preferences.sound })}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 9h4l5-4v14l-5-4H3z" />{preferences.sound ? <path d="M16 8q5 4 0 8 M19 4q8 8 0 16" /> : <path d="m16 9 6 6m0-6-6 6" />}</svg></button><nav class="language-switch" aria-label={locale === 'es' ? 'Idioma' : 'Language'}>{(['es', 'en'] as const).map(language => <a key={language} data-language={language} href={localizedPath(activePath, language)} lang={language} hrefLang={language} aria-current={locale === language ? 'page' : undefined} aria-label={language === 'es' ? 'Español' : 'English'} onClick={event => { event.currentTarget.href = localizedPath(activePath, language) + location.search + location.hash; }}>{language.toUpperCase()}</a>)}</nav><span class="system-ready" aria-label={online ? t("Network online") : t("Network offline")}><span class="status-dot" />{online ? t("ONLINE") : t("OFFLINE")}</span><time>{clock || 'AntoñiOS'}</time></div></header>
    <main id="desktop" ref={workspace} class="workspace" inert={launcher} aria-label={t("Desktop workspace")}>
      <nav inert={viewport.width < 1100 && Boolean(state.activeWindowId)} class="desktop-icons" aria-label={t("Desktop applications")}>{desktopApps.map(id => <a key={id} data-desktop-app={id} class={`desktop-icon icon-${id}`} href={href(registry[id].path)} onDblClick={() => open(registry[id].path)}><span class="icon-tile"><Icon name={id} /></span><span>{t(registry[id].name)}</span></a>)}</nav>
      <div hidden={Boolean(state.activeWindowId)} class="desktop-signature" aria-hidden="true"><p>AntoñiOS</p><span>{t("Architecture, in practice.")}</span><small>{t("PERSONAL OPERATING SYSTEM")}</small></div>
      <aside class="desktop-hint"><span class="keycap">↵</span> {t("Open an app. Make yourself at home.")}<br /><small>{t("Alt + arrows: move · Alt + Shift + arrows: resize · Esc: minimize")}</small></aside>
      {state.openWindows.map(win => <Window key={win.id} instance={win} active={state.activeWindowId === win.id} zIndex={10 + state.zOrder.indexOf(win.id)} viewport={viewport} dispatch={act}><AppContent id={registry[win.id].component} path={win.path} content={loadedContent} data={data} open={open} preferences={preferences} setPreferences={setPreferences} reset={reset} enterArcade={enterArcade} /></Window>)}
    </main>
    {launcher && <><button class="launcher-dismiss" aria-label={t("Close launcher")} onClick={() => setLauncher(false)} /><section class="launcher" role="region" aria-label={t("Application launcher")}><div class="launcher-heading"><strong>AntoñiOS / {t("Apps")}</strong><button aria-label={t("Close launcher panel")} onClick={() => { setLauncher(false); launcherButton.current?.focus(); }}>×</button></div><label class="launcher-search"><span>⌕</span><input ref={searchInput} aria-label={t("Find an application")} placeholder={t("Find an application…")} value={search} onInput={event => setSearch(event.currentTarget.value)} /></label><nav aria-label={t("All applications")}>{applications.filter(app => `${t(app.name)} ${t(app.description)}`.toLowerCase().includes(search.toLowerCase())).map(app => <a key={app.id} href={href(app.path)}><Icon name={app.id} /><span><strong>{t(app.name)}</strong><small>{t(app.description)}</small></span><span>↗</span></a>)}</nav>{!applications.some(app => `${t(app.name)} ${t(app.description)}`.toLowerCase().includes(search.toLowerCase())) && <p>{t("No matching applications.")}</p>}<div class="launcher-extras"><a href={href("/cv/")}><Icon name="cv" />{t("CV")}</a>{data.pdfs.find(pdf => pdf.language === locale)?.availability === "available" ? <a download href={data.pdfs.find(pdf => pdf.language === locale)?.path}>{t("Download CV")}</a> : <span>{t("Download CV")} <Availability value={data.pdfs.find(pdf => pdf.language === locale)?.availability ?? "unavailable"} /></span>}<PublicShortcuts data={data} /></div><small class="muted">AntoñiOS / {locale === 'es' ? 'EDICIÓN PERSONAL' : 'PERSONAL EDITION'}</small></section></>}
    <footer class="taskbar"><button ref={launcherButton} class={`launcher-toggle ${launcher ? 'selected' : ''}`} aria-label={t("Open launcher")} aria-expanded={launcher} onClick={() => setLauncher(!launcher)}><span class="launcher-glyph" aria-hidden="true"><img src="/favicon.svg" alt="" width="36" height="36" /></span><span>{t("Apps")}</span></button><a class="dock-pin" aria-label={t("Open Profile")} title={t("Open Profile")} href={href("/profile/")}><Icon name="about" /></a><span class="dock-divider" /><nav class="dock-apps" aria-label={t("Running applications")}>{state.openWindows.map(win => <button key={win.id} class={`dock-app ${state.activeWindowId === win.id ? 'selected' : ''} ${win.state === 'minimized' ? 'is-minimized' : ''}`} aria-label={`${t("Restore")} ${t(registry[win.id].name)}`} aria-pressed={state.activeWindowId === win.id} title={`${t(registry[win.id].name)}${win.state === 'minimized' ? t(" (minimized)") : ''}`} onClick={() => { act({ type: 'restore', id: win.id }); }}><Icon name={win.id} /><span>{t(registry[win.id].name)}</span><i /></button>)}</nav><div class="dock-utilities"><a aria-label={t("Open Arcade")} title={t("Open Arcade")} href={href("/arcade/")}><Icon name="arcade" /></a><button aria-label={preferences.sound ? t("Mute sound") : t("Enable sound")} aria-pressed={preferences.sound} onClick={() => setPreferences({ ...preferences, sound: !preferences.sound })}>{preferences.sound ? '♪' : '♪̸'}</button><a aria-label={t("Open Settings")} href={href("/settings/")}><Icon name="settings" /></a><a class="reading-link" href={href(`${state.openWindows.find(win => win.id === state.activeWindowId)?.path ?? '/'}?view=reading`)}>{t("Reading view ↗")}</a><time class="dock-time">{clock || "AntoñiOS"}</time></div></footer>
    <div class="system-notice" role="status">{notice}</div>
    </div>
    {mode === 'loading' && <div class="arcade-loading" role="status">{t("Opening the portal…")}<button onClick={exitArcade}>{t("Cancel")}</button></div>}
    {mode === 'arcade' && Arcade && <Arcade content={loadedContent} portfolio={data.portfolio} preferences={preferences} exit={exitArcade} navigate={value => { exitArcade(); open(value); }} />}
  </div>;
}
