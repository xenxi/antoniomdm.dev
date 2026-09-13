import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useLocale } from '../i18n/context';
import { localizedPath } from '../i18n/core';
import type { ArcadeProps } from './contract';
import { chapters, copy, missionById, personalEvents } from './campaign';
import { beginEvent, choose, completeEvent, eligibleEvents, replayChapter, getProgress, hasEvent, isComplete, newGame, chapterUnlocked, chapterCleared, enterCompany, parseSave, saveKey, updateProgress, type EventId, type GameState, type ObjectId } from './engine';
import DirectionPad from './DirectionPad';
import GameHud, { hudCopy } from './GameHud';
import GodotWorld from './GodotWorld';
import { buildings, townCopy, townSpawn } from './town';
import { makePixelMap, mapNearby, mapWalkable } from './pixel-map';
import { hiringRequirements, gameSkills } from './recruitment';

function Modal({ title, children, close }: { title: string; children: ComponentChildren; close: () => void }) {
  const { locale, href } = useLocale();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; const before = document.activeElement as HTMLElement | null; dialog?.showModal(); return () => { dialog?.close(); if (before?.isConnected) before.focus(); }; }, []);
  return <dialog ref={ref} class="career-dialog" aria-labelledby="career-dialog-title" onCancel={event => { event.preventDefault(); close(); }}><div class="job-dialog-speaker"><img src="/images/job-route/antonio-portrait.webp" width="76" height="76" alt="" /><div><p class="eyebrow">JOB ROUTE / ANTOÑIOS</p><h2 id="career-dialog-title">{title}</h2></div></div>{children}<p><a data-native-navigation href={href('/cv/')}>{copy.cv[locale]} ↗</a></p></dialog>;
}

export default function CareerGame({ data, preferences, exit }: ArcadeProps) {
  const { locale, href, t } = useLocale();
  const c = (key: keyof typeof copy) => copy[key][locale];
  const [game, setGame] = useState<GameState>(newGame);
  const [screen, setScreen] = useState<'menu' | 'game' | 'paused' | 'tour'>('menu');
  const [modal, setModal] = useState<'mission' | 'event' | 'info' | 'reset' | 'inventory' | 'jobs' | 'hiring' | null>(null);
  const [lockedCompany, setLockedCompany] = useState('');
  const [event, setEvent] = useState<EventId | null>(null);
  const [eventPhase, setEventPhase] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [notice, setNotice] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [hasSave, setHasSave] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [music, setMusic] = useState(false);
  const [tourSeconds, setTourSeconds] = useState(0);
  const [hidden, setHidden] = useState(false);
  const host = useRef<HTMLElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const disposed = useRef(false);
  const interruptedMission = useRef(false);
  const current = useRef(game); current.current = game;
  const chapter = chapters.find(chapter => chapter.id === game.chapterId)!;
  const p = getProgress(game);
  const inside = game.world?.inside ?? true;
  const position = inside ? p : game.world ?? townSpawn;
  const tc = (key: keyof typeof townCopy) => townCopy[key][locale];
  const signKey = chapters.map(item => Number(chapterUnlocked(game, item.id)) + ':' + Number(chapterCleared(game, item.id))).join(',');
  const signs = useMemo(() => chapters.map(item => ({ id: item.id, name: item.id === 'system-recovery' ? 'System Recovery' : data.professionalExperience.find(job => job.id === item.experienceId)!.company, unlocked: chapterUnlocked(game, item.id), complete: chapterCleared(game, item.id) })), [signKey, data, locale]);
  const townMap = useMemo(() => makePixelMap('town', signs, locale), [signs, locale]);
  const interiorMap = useMemo(() => ({ ...makePixelMap(chapter.scenario, signs, locale, signs.find(sign => sign.id === chapter.id)?.name), id: chapter.id }), [chapter.id, signs, locale]);
  const map = inside ? interiorMap : townMap;
  const job = data.professionalExperience.find(job => job.id === chapter.experienceId)!;
  const mission = missionById[chapter.missions[p.mission]];
  const completed = isComplete(game);
  const completedCount = chapters.filter(chapter => chapterCleared(game, chapter.id)).length;
  const last = chapter.id === 'system-recovery';
  const abilityIds = new Set(chapters.filter(chapter => chapterCleared(game, chapter.id)).flatMap(chapter => data.professionalExperience.find(job => job.id === chapter.experienceId)?.competencyIds ?? []));
  const abilities = data.competencies.filter(item => abilityIds.has(item.id));
  const eventText = event === 'wedding' || event === 'emma-born' ? personalEvents.find(item => item.id === event) : undefined;
  const pending = p.seen.find(id => !p.completedEvents.includes(id));
  const canAdvance = completed && !pending && eligibleEvents(game).length === 0 && !p.pendingPipeline;
  const hiring = hiringRequirements(game, lockedCompany);
  const nextTraining = hiring[0];
  useEffect(() => {
    disposed.current = false;
    try {
      const raw = localStorage.getItem(saveKey); const saved = parseSave(raw);
      if (saved) { setGame(saved); setHasSave(true); if (new URLSearchParams(location.search).get('career') === 'continue') setScreen('game'); }
      else if (raw) setStorageNotice(c('invalidSave'));
    } catch { setStorageNotice(c('saveError')); }
    setLoaded(true); host.current?.focus();
    const visibility = () => { setHidden(document.hidden); if (document.hidden) setScreen(value => value === 'game' ? 'paused' : value); };
    document.addEventListener('visibilitychange', visibility);
    return () => { disposed.current = true; document.removeEventListener('visibilitychange', visibility); audio.current?.pause(); if (audio.current) { audio.current.removeAttribute('src'); audio.current.load(); } };
  }, []);
  useEffect(() => {
    if (!loaded || !hasSave) return;
    try { localStorage.setItem(saveKey, JSON.stringify(game)); } catch { setStorageNotice(c('saveError')); }
  }, [game, loaded, hasSave]);
  useEffect(() => {
    if (audio.current) {
      if (screen === 'paused' || hidden || eventText || !music) audio.current.pause();
      else if (music) void audio.current.play().catch(() => { if (!disposed.current) { setMusic(false); setNotice(t('Music could not play. You can still explore.')); } });
    }
  }, [screen, hidden, music, eventText?.id]);
  useEffect(() => {
    if (screen !== 'tour' || hidden) return;
    const timer = window.setInterval(() => setTourSeconds(value => Math.min(30, value + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [screen, hidden]);
  useEffect(() => { if (screen === 'tour' && tourSeconds === 30) setScreen('menu'); }, [tourSeconds, screen]);
  function openEvent(id: EventId) { interruptedMission.current = modal === 'mission'; setGame(value => beginEvent(value, id)); setEvent(id); setEventPhase(0); setFeedback(''); setModal('event'); }
  useLayoutEffect(() => {
    if (!inside || !loaded || screen !== 'game' || (modal && modal !== 'mission') || hidden) return;
    const savedPending = getProgress(current.current).seen.find(id => !getProgress(current.current).completedEvents.includes(id));
    if (savedPending) { openEvent(savedPending); return; }
    if (!eligibleEvents(current.current).length) return;
    const timer = window.setTimeout(() => { const next = eligibleEvents(current.current)[0]; if (next) openEvent(next); }, completed ? 200 : 16000);
    return () => window.clearTimeout(timer);
  }, [inside, loaded, screen, modal, hidden, chapter.id, p.mission, completed, p.completedEvents.length]);
  function start(id = chapters[0].id, reset = false) {
    if (!reset && !chapterUnlocked(game, id)) { inspectHiring(id); return; }
    interruptedMission.current = false;
    setGame(value => reset ? newGame() : enterCompany(value, id)); setHasSave(true); setScreen('game'); setModal(null); setEvent(null); setFeedback(''); setNotice(reset ? tc('hint') : c('terminalHint'));
    requestAnimationFrame(() => host.current?.querySelector<HTMLElement>('.godot-world')?.focus());
  }
  function returnToTown() {
    const building = buildings.find(b => b.id === chapter.id)!;
    setGame(value => ({ ...value, world: { x: building.door.x, y: building.door.y + 1, inside: false } }));
    setModal(null); setEvent(null); setNotice(tc('hint'));
    requestAnimationFrame(() => host.current?.querySelector<HTMLElement>('.godot-world')?.focus());
  }
  function worldInteract(id: string) {
    if (screen !== 'game' || modal) return;
    if (!inside) { if (chapterUnlocked(game, id)) start(id); else inspectHiring(id); }
    else if (id === 'portal') returnToTown();
    else interact(id as ObjectId);
  }
  function inspectHiring(id: string) {
    if (!chapters.some(chapter => chapter.id === id)) return;
    setLockedCompany(id); setNotice(tc('locked')); setModal('hiring');
  }
  function interact(id: ObjectId) {
    if (screen !== 'game' || modal) return;
    if (id === 'terminal') { if (mission) { setFeedback(''); setModal('mission'); } else setNotice(c('complete')); }
    if (id === 'team') { setFeedback(c('npcLine')); setModal('info'); }
    if (id === 'coffee') { setGame(value => ({ ...value, coffee: true })); setFeedback(c('coffeeLine')); setModal('info'); }
    if (id === 'secret') { setGame(value => ({ ...value, secret: true })); setFeedback(c('secretLine')); setModal('info'); }
  }
  function walk(x: number, y: number) {
    if (screen !== 'game' || modal) return;
    if (Math.abs(x - position.x) + Math.abs(y - position.y) !== 1 || !mapWalkable(map, x, y)) return;
    setGame(value => inside ? updateProgress(value, { x, y }) : { ...value, world: { x, y, inside: false } });
  }
  function answer(id: string) {
    const result = choose(game, id); const selected = mission.choices.find(choice => choice.id === id)!;
    setFeedback(!result.accepted && mission.sequence && selected.accepted ? c('retry') : selected.feedback[locale]);
    if (result.accepted) setGame(result.state);
    if (result.completed) setModal('info');
  }
  function finishEvent(message: string) {
    if (event) setGame(value => completeEvent(value, event));
    setEvent(null); setFeedback(message); setModal('info');
  }
  async function toggleMusic() {
    if (music) { setMusic(false); audio.current?.pause(); return; }
    try {
      const element = audio.current ??= new Audio('/audio/arcade_01.mp3'); element.loop = true; element.volume = .2;
      await element.play(); if (disposed.current) { element.pause(); return; } setMusic(true);
    } catch { if (!disposed.current) setNotice(t('Music could not play. You can still explore.')); }
  }
  function pause() { setScreen('paused'); }
  function hudAction(key: string) {
    if (key === 'O') pause();
    if (key === 'M') host.current?.querySelector<HTMLButtonElement>('.godot-zoom')?.click();
    if (key === 'I' || key === 'J') setModal(key === 'I' ? 'inventory' : 'jobs');
  }
  function dismissInfo() { setModal(interruptedMission.current && mission ? 'mission' : null); interruptedMission.current = false; }
  const closeModal = () => { if (modal === 'event') pause(); else setModal(null); };
  const nextChapter = chapters[chapters.findIndex(item => item.id === chapter.id) + 1];
  const title = last ? 'AntoñiOS System Recovery' : job.company;
  return <section ref={host} class={`arcade-world career-world job-route ${screen === 'game' || screen === 'paused' ? 'is-playing' : 'is-menu'}`} tabIndex={-1} aria-label="AntoñiOS Career Mode" onKeyDown={e => {
    if (screen === 'game' && !modal && ['i', 'j', 'o'].includes(e.key.toLowerCase()) && !['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes((e.target as HTMLElement).tagName)) { e.preventDefault(); hudAction(e.key.toUpperCase()); }
    if (e.key === 'Escape' && !modal) { e.preventDefault(); e.stopPropagation(); if (screen === 'game') pause(); else if (screen === 'paused') setScreen('game'); else exit(); }
  }}>
    <header class="career-header"><span class="career-brand">JOB ROUTE <span aria-hidden="true">»</span><small>ANTOÑIOS / COLOR</small></span><nav aria-label={locale === 'es' ? 'Navegación de Career Mode' : 'Career Mode navigation'}>
      <a data-native-navigation href={href('/cv/')}>{c('cv')} ↗</a><a data-language href={`${localizedPath('/arcade/', locale === 'es' ? 'en' : 'es')}?career=continue`} lang={locale === 'es' ? 'en' : 'es'} aria-label={locale === 'es' ? 'English' : 'Español'}>{locale === 'es' ? 'EN' : 'ES'}</a><button onClick={exit}>{c('exit')}</button>
    </nav></header>
    {screen === 'menu' && <>
      <div class="career-hero"><img class="job-cover-art" src="/images/job-route/neon-city.webp" width="1536" height="1024" alt="" /><div class="career-hero-copy"><p class="eyebrow">{hudCopy.edition[locale]}</p><h1 class="job-title">JOB<br />ROUTE<span aria-hidden="true">»</span></h1><p class="job-tagline">{hudCopy.tagline[locale]}</p><p class="career-lead">{c('intro')}</p><div class="career-start"><button class="career-primary" onClick={() => hasSave ? setModal('reset') : start(chapters[0].id, true)}>{c('start')} <span aria-hidden="true">↗</span></button><button disabled={!hasSave} onClick={() => { setScreen('game'); setNotice(inside ? c('terminalHint') : tc('hint')); }}>{c('continue')}</button><button onClick={() => { setTourSeconds(0); setScreen('tour'); }}>{c('tour')}</button></div><p class="career-premise">{c('premise')}</p></div><div class="career-hero-scene"><div class="job-cover-id"><img src="/images/job-route/antonio-portrait.webp" width="96" height="96" alt="" /><span><strong>ANTONIO</strong><small>{tc('avatar')}</small></span></div></div></div>
      <section class="career-chapters" aria-labelledby="career-chapters-title"><div class="career-section-heading"><h2 id="career-chapters-title">{c('chapters')}</h2><p>{c('independent')}</p></div><div class="career-chapter-grid">{chapters.map((item, index) => {
        const experience = data.professionalExperience.find(job => job.id === item.experienceId)!;
        return <button key={item.id} data-chapter={item.id} disabled={!chapterUnlocked(game, item.id)} class={`career-chapter ${chapterCleared(game, item.id) ? 'is-complete' : ''}`} onClick={() => start(item.id)}><span class="career-chapter-number">{chapterCleared(game, item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><strong>{item.id === 'system-recovery' ? 'System Recovery' : experience.company}</strong><small>{item.id === 'system-recovery' ? c('ongoing') : experience.period}</small><span class="career-chapter-role">{item.id === 'system-recovery' ? c('perspective') : experience.role}</span>{index === 0 && <small>{c('prologue')}</small>}<span class="career-chapter-play">{chapterUnlocked(game, item.id) ? c('play') : tc('locked')} →</span></button>;
      })}</div></section>
    </>}
    {screen === 'tour' && <div class="career-tour"><p class="eyebrow">{c('tour')} · {tourSeconds} / 30</p><img class="career-tour-art" src="/images/job-route/neon-office.webp" width="1536" height="1024" alt="" /><h1>{tourSeconds < 10 ? c('tourIntro') : tourSeconds < 20 ? c('tourMiddle') : c('tourEnd')}</h1><progress value={tourSeconds} max={30} aria-label={c('tour')} /><div class="career-actions"><button onClick={() => setScreen('menu')}>{c('tourSkip')}</button><a class="button" data-native-navigation href={href('/cv/')}>{c('cv')} ↗</a></div></div>}
    {(screen === 'game' || screen === 'paused') && <>
      {inside && <nav class="career-route" aria-label={locale === 'es' ? 'Ruta de la campaña' : 'Campaign route'}>{chapters.map((item, index) => <button key={item.id} disabled={!chapterUnlocked(game, item.id)} class={chapterCleared(game, item.id) ? 'is-complete' : ''} aria-current={item.id === chapter.id ? 'step' : undefined} onClick={() => start(item.id)}><span>{chapterCleared(game, item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><small>{item.id === 'system-recovery' ? 'System Recovery' : data.professionalExperience.find(job => job.id === item.experienceId)!.company}</small></button>)}</nav>}
      <div class="career-game-heading"><div><p class="eyebrow">{!inside ? tc('district') : last ? (locale === 'es' ? 'DESAFÍO FINAL' : 'FINAL BOSS') : `${String(chapters.indexOf(chapter)).padStart(2, '0')} / CAREER MODE`}</p><h1>{inside ? title : tc('title')}</h1><p>{inside ? `${job.period} · ${job.role}` : tc('intro')}</p></div><div class="career-actions">{inside && <button onClick={returnToTown}>{tc('outside')}</button>}<button onClick={() => { setScreen('menu'); setModal(null); setEvent(null); }}>{c('menu')}</button><button onClick={screen === 'paused' ? () => setScreen('game') : pause}>{screen === 'paused' ? c('resume') : c('pause')}</button></div></div>
      {screen === 'paused' && <div class="career-paused"><span aria-hidden="true">Ⅱ</span><h2>{c('paused')}</h2><p>{c('saved')}</p><button class="career-primary" onClick={() => setScreen('game')}>{c('resume')}</button></div>}<div class="career-play-layout" hidden={screen === 'paused'}>
        <div class="career-stage"><div class="career-scene"><GameHud locale={locale} map={inside ? interiorMap : townMap} signs={signs} x={position.x} y={position.y} inside={inside} currentId={chapter.id} mission={mission?.title[locale]} completed={completedCount} missionProgress={p.mission} missionTotal={chapter.missions.length} onAction={hudAction} /><div class="career-stage-top"><span>{inside ? c('main') : tc('district')}</span><span>{inside ? Math.min(p.mission + 1, chapter.missions.length) : completedCount} / {inside ? chapter.missions.length : chapters.length}</span></div><GodotWorld objective={inside ? (mission ? 'terminal' : canAdvance ? 'portal' : 'team') : undefined} map={map} x={position.x} y={position.y} locale={locale} active={!modal && screen === 'game'} onMove={walk} onInteract={worldInteract} onPause={pause} /></div>
          <p class="career-controls-help">{c('controls')}</p><div class="career-world-controls"><DirectionPad locale={locale} active={!modal && screen === 'game'} onStep={(dx, dy) => walk(position.x + dx, position.y + dy)} /><button onClick={() => { const object = mapNearby(map, position.x, position.y); if (object) worldInteract(object.id); else setNotice(c('walkCloser')); }}>{c('interact')} <kbd>E</kbd></button></div>
          {inside && <details class="career-direct"><summary>{c('accessible')}</summary><div class="career-actions"><button onClick={() => interact('terminal')}>{c('workstation')}</button><button onClick={() => interact('team')}>{c('npc')}</button><button onClick={() => interact('coffee')}>{c('coffee')}</button><button onClick={() => interact('secret')}>{c('secret')}</button></div></details>}
        </div>
        <aside class="career-quest-panel">{!inside ? <><p class="eyebrow">{tc('destination')}</p><h2>{hudCopy.journal[locale]}</h2><p>{tc('hint')}</p><p>{tc('route')}</p><div class="town-directory">{signs.map((sign, index) => <button key={sign.id} data-company={sign.id} disabled={!sign.unlocked} onClick={() => start(sign.id)}><span>{sign.complete ? '✓' : sign.unlocked ? '→' : '×'} {String(index + 1).padStart(2, '0')}</span><strong>{sign.name}</strong><small>{sign.unlocked ? tc('enter') : tc('locked')}</small></button>)}</div><p class="town-avatar">{tc('avatar')}</p></> : <><p class="eyebrow">{c('main')}</p><h2>{mission ? mission.title[locale] : last ? c('recovered') : c('complete')}</h2>{mission ? <><p>{mission.briefing[locale]}</p><button class="career-primary" onClick={() => interact('terminal')}>{c('workstation')} →</button></> : <><p>{last ? c('ongoing') : job.summary}</p>{last && <><p class="eyebrow">{c('current')}</p><strong>{data.portfolio.profile.role}</strong><p>{c('perspective')}</p></>}<p class="career-success">✓ {c('complete')}</p></>}
          <progress value={p.mission} max={chapter.missions.length} aria-label={c('main')} />
          {p.pendingPipeline && <div class="career-pending"><strong>{c('pipelinePending')}</strong><button onClick={() => { setGame(value => updateProgress(value, { pendingPipeline: false })); setNotice(c('coverResult')); }}>{c('repair')}</button></div>}
          {chapter.id === 'nokia' && <p class="career-silence">{c('silence')}</p>}
          {canAdvance && nextChapter && <><p class="godot-portal is-open">{tc('unlocked')}</p><button class="career-primary" onClick={returnToTown}>{tc('outside')} →</button></>}
          {canAdvance && <button onClick={() => { setGame(replayChapter); setNotice(c('terminalHint')); }}>{c('replay')}</button>}
          <a class="career-experience-link" data-native-navigation href={href(`/experience/#${chapter.experienceId}`)}>{c('experience')} ↗</a>
          <details class="career-journal"><summary>{c('journal')} · {completedCount}/{chapters.length}</summary><h3>{c('abilities')}</h3>{abilities.length ? <ul>{abilities.map(ability => <li key={ability.id}>{ability.name}</li>)}</ul> : <p>{c('noAbilities')}</p>}<h3>{c('achievements')}</h3><ul>{completedCount > 0 && <li>{locale === 'es' ? 'Primer commit · primera etapa completada' : 'First commit · first chapter completed'}</li>}{Object.values(game.chapters).some(progress => progress.choices.some(value => value.startsWith('mobile:') || value.startsWith('button:') || value.startsWith('validation:'))) && <li>{locale === 'es' ? 'Cazador de bugs' : 'Bug hunter'}</li>}{isComplete(game, 'nokia') && <li>{locale === 'es' ? 'Silencio · 22:47' : 'Silence · 22:47'}</li>}{hasEvent(game, 'wedding') && <li>{c('weddingDone')}</li>}{hasEvent(game, 'emma-born') && <li>{c('familyDone')}</li>}{Object.values(game.chapters).some(progress => progress.choices.includes('prioritize:team')) && <li>{locale === 'es' ? 'Hacer equipo' : 'Team builder'}</li>}{isComplete(game, 'domingo-alonso') && <li>{locale === 'es' ? 'Arquitecto del sistema · logro del juego' : 'System architect · game achievement'}</li>}{isComplete(game, 'system-recovery') && <li>{c('recovered')}</li>}{game.secret && <li>THE INTERNET</li>}</ul></details>
        </>}</aside>
      </div>
      <div class="career-inventory"><strong>{c('inventory')}</strong><span>▣ {c('phone')}</span><span>◇ {c('knowledge')}</span>{game.coffee && <button onClick={() => { setFeedback(c('coffeeLine')); setModal('info'); }}>☕ {c('coffee')}</button>}{hasEvent(game, 'wedding') && <span>♢ {c('ring')}</span>}{hasEvent(game, 'emma-born') && <span>♡ {c('family')}</span>}</div>
    </>}
    <footer class="career-footer"><span>{c('simulation')}</span><div>{preferences.sound && preferences.music ? <button onClick={toggleMusic}>{music ? t('Pause music') : t('Play music')}</button> : <span>{t('Sound off · Enable sound and music in Settings')}</span>}<small>{storageNotice || c('saved')}</small></div></footer><p class="career-status" role="status">{notice}</p>
    {screen === 'game' && modal === 'inventory' && <Modal title={c('inventory')} close={() => setModal(null)}><div class="job-inventory-grid"><span>▣ {c('phone')}</span><span>◇ {c('knowledge')}</span>{game.coffee && <span>☕ {c('coffee')}</span>}{hasEvent(game, 'wedding') && <span>♢ {c('ring')}</span>}{hasEvent(game, 'emma-born') && <span>♡ {c('family')}</span>}</div><h3>{c('abilities')}</h3>{abilities.length ? <ul>{abilities.map(ability => <li key={ability.id}>{ability.name}</li>)}</ul> : <p>{c('noAbilities')}</p>}<button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'jobs' && <Modal title={hudCopy.jobs[locale]} close={() => setModal(null)}>{inside && mission && <><p class="eyebrow">{hudCopy.objective[locale]}</p><h3>{mission.title[locale]}</h3><p>{mission.briefing[locale]}</p><button class="career-primary" onClick={() => { setFeedback(''); setModal('mission'); }}>{c('workstation')}</button></>}<div class="career-choices">{signs.map(sign => <button key={sign.id} onClick={() => start(sign.id)}>{sign.complete ? '✓' : sign.unlocked ? '→' : '×'} {sign.name}</button>)}</div><button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'hiring' && <Modal title={tc('hiring')} close={() => setModal(null)}><div class="job-hiring-status"><span aria-hidden="true">▣</span><div><p class="eyebrow">{tc('requirements')}</p><h3>{signs.find(sign => sign.id === lockedCompany)?.name}</h3></div></div><p>{tc('hiringBody')}</p><p>{tc('chaptersNeeded')}: <strong>{hiring.length}</strong></p>{nextTraining && <section class="job-hiring-requirements"><p class="eyebrow">{tc('nextStep')}</p><h3>{signs.find(sign => sign.id === nextTraining.id)?.name}</h3>{nextTraining.skills.length > 0 && <><h4>{tc('skillsNeeded')}</h4><ul class="job-skill-chips">{nextTraining.skills.map(skill => <li key={skill}>{gameSkills[skill][locale]}</li>)}</ul></>}<h4>{tc('challenges')}</h4><ul class="job-hiring-checklist">{nextTraining.missions.map(m => <li key={m.id} class={m.done ? 'is-earned' : ''}><span aria-hidden="true">{m.done ? '✓' : '◇'}</span><span>{m.title[locale]}<small>{tc(m.done ? 'earned' : 'outstanding')}</small></span></li>)}{nextTraining.events > 0 && <li>◇ {tc('eventsNeeded')}: {nextTraining.events}</li>}{nextTraining.repair && <li>◇ {tc('repairNeeded')}</li>}</ul></section>}<div class="career-actions">{nextTraining && <button class="career-primary" onClick={() => start(nextTraining.id)}>{tc('continueTraining')} →</button>}<button onClick={() => setModal(null)}>{c('close')}</button></div></Modal>}
    {modal === 'reset' && <Modal title={c('start')} close={() => setModal(null)}><p>{c('reset')}</p><div class="career-actions"><button onClick={() => start(chapters[0].id, true)}>{c('confirmReset')}</button><button onClick={() => setModal(null)}>{c('cancel')}</button></div></Modal>}
    {screen === 'game' && modal === 'mission' && mission && <Modal title={mission.title[locale]} close={closeModal}><p class="eyebrow">{c(`${mission.mechanic}Label` as keyof typeof copy)}</p><p>{mission.briefing[locale]}</p>{mission.evidence && <pre><code>{mission.evidence}</code></pre>}{mission.metrics && <div class="career-metrics">{mission.metrics.map(metric => <div key={metric.label}><label>{metric.label} <strong>{metric.value}%</strong><meter min={0} max={100} value={metric.value} /></label></div>)}</div>}{mission.sequence && <><p>{c('step')} {p.sequence.length + 1} / {mission.sequence.length}</p><div class="career-flow" aria-label={c('progress')}>{p.sequence.map(id => <span key={id}>✓ {mission.choices.find(choice => choice.id === id)!.label[locale]}</span>)}</div></>}<div class={`career-choices mechanic-${mission.mechanic}`}>{mission.choices.map(choice => <button key={choice.id} data-choice={choice.id} disabled={p.sequence.includes(choice.id)} onClick={() => answer(choice.id)}>{choice.label[locale]}</button>)}</div><p class="career-feedback" role="status">{feedback}</p><button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'info' && <Modal title={c('journal')} close={dismissInfo}><p class="career-result">{feedback}</p><button class="career-primary" onClick={dismissInfo}>{c('returnMission')}</button></Modal>}
    {screen === 'game' && modal === 'event' && event && <Modal title={eventText ? c('personal') : c('event')} close={closeModal}>
      {event === 'freelance' && <><p class="eyebrow">{c('freelance')}</p><p>{eventPhase === 0 ? c('call') : c('sideFix')}</p>{eventPhase === 0 ? <div class="career-choices"><button onClick={() => setEventPhase(1)}>{c('accept')}</button><button onClick={() => setEventPhase(1)}>{c('acceptAnyway')}</button></div> : <><pre>PUBLIC_URL=http://localhost:3000</pre><button class="career-primary" onClick={() => finishEvent(c('sideDone'))}>{c('fixConfig')}</button></>}</>}
      {event === 'incident' && <><p>{c('incident')}</p><div class="career-choices"><button onClick={() => { setGame(value => updateProgress(value, { pendingPipeline: true })); finishEvent(c('investigateResult')); }}>{c('investigate')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('delegate')}</button><button onClick={() => setFeedback(c('deferResult'))}>{c('defer')}</button></div><p role="status">{feedback}</p></>}
      {eventText && <div class="career-personal-event"><span aria-hidden="true">{event === 'wedding' ? '♢' : '♡'}</span><h3>{eventText.title[locale]}</h3><p>{eventText.description[locale]}</p><button class="career-primary" onClick={() => finishEvent(c(event === 'wedding' ? 'weddingDone' : 'familyDone'))}>{c(event === 'wedding' ? 'weddingAction' : 'welcomeEmma')}</button></div>}
      {event === 'friday' && <><p>{c('friday')}</p><div class="career-choices"><button onClick={() => finishEvent(c('homeResult'))}>{c('home')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('deploy')}</button></div></>}
      {event === 'family' && <><p>{c('baby')}</p><div class="career-choices"><button onClick={() => { setGame(value => completeEvent(value, 'family')); setEvent(null); setModal(null); setScreen('paused'); setNotice(c('coverResult')); }}>{c('pause')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('delegate')}</button></div></>}
    </Modal>}
  </section>;
}
