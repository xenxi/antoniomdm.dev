import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { useLocale } from '../i18n/context';
import { localizedPath } from '../i18n/core';
import type { ArcadeProps } from './contract';
import { chapters, copy, missionById, personalEvents } from './campaign';
import { beginEvent, choose, chooseSide, tickMission, failAttempt, recoverEnergy, completeEvent, eligibleEvents, replayChapter, getProgress, hasEvent, isComplete, newGame, newQuickMission, chapterUnlocked, chapterCleared, enterCompany, parseSave, saveKey, updateProgress, type EventId, type GameState, type ObjectId } from './engine';
import { companyScenes, makeCompanyMap } from './company-scenes';
import { questCopy, sideQuests } from './quest-content';
import SnakeQuest from './SnakeQuest';
import DirectionPad from './DirectionPad';
import GameHud, { hudCopy } from './GameHud';
import GodotWorld from './GodotWorld';
import { buildings, townCopy, townSpawn } from './town';
import { makePixelMap, mapNearby, mapWalkable } from './pixel-map';
import { hiringRequirements, gameSkills } from './recruitment';
import { WorldAudio, type WorldSound } from './world-audio';

function Modal({ title, children, close }: { title: string; children: ComponentChildren; close: () => void }) {
  const { locale, href } = useLocale();
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; const before = document.activeElement as HTMLElement | null; dialog?.showModal(); return () => { dialog?.close(); if (before?.isConnected) before.focus(); }; }, []);
  return <dialog ref={ref} class="career-dialog" aria-labelledby="career-dialog-title" onCancel={event => { event.preventDefault(); close(); }}><div class="job-dialog-speaker"><img src="/images/job-route/antonio-portrait.webp" width="76" height="76" alt="" /><div><p class="eyebrow">JOB ROUTE / ANTOÑIOS</p><h2 id="career-dialog-title">{title}</h2></div></div>{children}<p><a data-native-navigation href={href('/profile/')}>{copy.profile[locale]} ↗</a></p></dialog>;
}

export default function CareerGame({ data, preferences, exit }: ArcadeProps) {
  const { locale, href, t } = useLocale();
  const c = (key: keyof typeof copy) => copy[key][locale];
  const [campaignGame, setCampaignGame] = useState<GameState>(newGame);
  const [quickGame, setQuickGame] = useState<GameState | null>(null);
  const [quickId, setQuickId] = useState('');
  const [menuMode, setMenuMode] = useState<'campaign' | 'quick'>('campaign');
  const [selectedChapter, setSelectedChapter] = useState(chapters[0].id);
  const [selectedMission, setSelectedMission] = useState(chapters[0].missions[0]);
  const game = quickGame ?? campaignGame;
  function setGame(value: GameState | ((state: GameState) => GameState)) {
    if (quickGame) setQuickGame(previous => previous === null ? null : typeof value === 'function' ? value(previous) : value);
    else setCampaignGame(value);
  }
  const quickDone = Boolean(quickGame && getProgress(quickGame).mission > chapters.find(chapter => chapter.id === quickGame.chapterId)!.missions.indexOf(quickId));
  const [screen, setScreen] = useState<'menu' | 'game' | 'paused' | 'tour'>('menu');
  const [modal, setModal] = useState<'mission' | 'event' | 'info' | 'reset' | 'inventory' | 'jobs' | 'hiring' | 'side' | null>(null);
  const [sideId, setSideId] = useState('');
  const [lockedCompany, setLockedCompany] = useState('');
  const [event, setEvent] = useState<EventId | null>(null);
  const [eventPhase, setEventPhase] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [notice, setNotice] = useState('');
  const [storageNotice, setStorageNotice] = useState('');
  const [hasSave, setHasSave] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [worldReady, setWorldReady] = useState(false);
  useEffect(() => { if (screen === 'menu') setWorldReady(false); }, [screen]);
  const [music, setMusic] = useState(true);
  const [tourSeconds, setTourSeconds] = useState(0);
  const [hidden, setHidden] = useState(false);
  const host = useRef<HTMLElement>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const effects = useRef<WorldAudio | null>(null);
  const [foley, setFoley] = useState(true);
  function worldSound(kind: WorldSound) {
    if (!preferences.sound || !foley || hidden || screen === 'paused') return;
    const player = effects.current ??= new WorldAudio();
    player.setEnabled(true); player.play(kind);
  }
  function unlockEffects() {
    if (!preferences.sound || !foley) return;
    const player = effects.current ??= new WorldAudio();
    player.setEnabled(true); player.unlock();
  }
  useEffect(() => {
    effects.current?.setEnabled(preferences.sound && foley && !hidden && screen !== 'paused');
    if (screen !== 'game' || hidden) effects.current?.stop();
  }, [preferences.sound, foley, hidden, screen]);
  useEffect(() => () => effects.current?.dispose(), []);
  const disposed = useRef(false);
  const interruptedMission = useRef(false);
  const current = useRef(game); current.current = game;
  const chapter = chapters.find(chapter => chapter.id === game.chapterId)!;
  const p = getProgress(game);
  const inside = game.world?.inside ?? true;
  const position = inside ? p : game.world ?? townSpawn;
  const dpadPosition = useRef(position); dpadPosition.current = position;
  const tc = (key: keyof typeof townCopy) => townCopy[key][locale];
  const signKey = chapters.map(item => Number(chapterUnlocked(game, item.id)) + ':' + Number(chapterCleared(game, item.id))).join(',');
  const signs = useMemo(() => chapters.map(item => ({ id: item.id, name: item.id === 'system-recovery' ? 'System Recovery' : data.professionalExperience.find(job => job.id === item.experienceId)!.company, unlocked: chapterUnlocked(game, item.id), complete: chapterCleared(game, item.id) })), [signKey, data, locale]);
  const townMap = useMemo(() => makePixelMap('town', signs, locale), [signs, locale]);
  const interiorMap = useMemo(() => makeCompanyMap(chapter.id, locale, signs.find(sign => sign.id === chapter.id)?.name ?? '', p.side, p.mission), [chapter.id, signs, locale, p.side?.join(','), p.mission]);
  const map = inside ? interiorMap : townMap;
  const job = data.professionalExperience.find(job => job.id === chapter.experienceId)!;
  const mission = missionById[chapter.missions[p.mission]];
  const scene = companyScenes[chapter.id];
  const objective = mission?.target ?? 'terminal';
  const seconds = mission?.seconds ?? 90;
  const remaining = p.remaining ?? seconds;
  const timedOut = game.timed !== false && remaining === 0;
  const exhausted = p.energy === 0;
  const side = sideQuests.find(q => q.id === sideId);
  const chapterSides = sideQuests.filter(q => q.chapter === chapter.id);
  const availableSides = chapterSides.filter(q => !p.side?.includes(q.id) && p.mission >= (q.after ?? 0));
  const qc = (key: keyof typeof questCopy) => questCopy[key][locale];
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
    if (quickDone || !inside || !loaded || !worldReady || screen !== 'game' || hidden || (modal && modal !== 'mission') || !mission || game.timed === false) return;
    const timer = window.setInterval(() => setGame(tickMission), 1000);
    return () => window.clearInterval(timer);
  }, [inside, loaded, worldReady, screen, hidden, modal, chapter.id, p.mission, game.timed, quickDone]);
  useEffect(() => {
    if (!inside || chapter.id !== 'freelance' || screen !== 'game' || hidden || modal || !availableSides.length) return;
    const timer = window.setInterval(() => setGame(value => updateProgress(value, { energy: Math.max(0, (getProgress(value).energy ?? 100) - 3) })), 12000);
    return () => window.clearInterval(timer);
  }, [inside, chapter.id, screen, hidden, modal, availableSides.length]);
  useEffect(() => {
    disposed.current = false;
    try {
      const raw = localStorage.getItem(saveKey); const saved = parseSave(raw);
      if (saved) { setCampaignGame(saved); setHasSave(true); if (new URLSearchParams(location.search).get('career') === 'continue') setScreen('game'); }
      else if (raw) setStorageNotice(c('invalidSave'));
    } catch { setStorageNotice(c('saveError')); }
    const missionId = new URLSearchParams(location.search).get('mission');
    if (missionId) {
      const initial = newQuickMission(missionId, new URLSearchParams(location.search).get('chapter') ?? undefined);
      if (initial) {
        let saved: GameState | null = null;
        try { const raw = JSON.parse(sessionStorage.getItem('antonios:quick-mission:v1') ?? 'null'); if (raw?.id === missionId) saved = parseSave(JSON.stringify(raw.state)); } catch { /* A fresh run is always available. */ }
        setQuickGame(saved?.chapterId === initial.chapterId ? saved : initial); setQuickId(missionId); setSelectedChapter(initial.chapterId); setSelectedMission(missionId); setMenuMode('quick'); setScreen('game'); setModal('mission');
      }
    }
    setLoaded(true); host.current?.focus();
    const visibility = () => { setHidden(document.hidden); if (document.hidden) setScreen(value => value === 'game' ? 'paused' : value); };
    document.addEventListener('visibilitychange', visibility);
    return () => { disposed.current = true; document.removeEventListener('visibilitychange', visibility); audio.current?.pause(); if (audio.current) { audio.current.removeAttribute('src'); audio.current.load(); } };
  }, []);
  useEffect(() => {
    if (!loaded || !hasSave) return;
    try { localStorage.setItem(saveKey, JSON.stringify(campaignGame)); } catch { setStorageNotice(c('saveError')); }
  }, [campaignGame, loaded, hasSave]);
  useEffect(() => {
    if (!quickGame) return;
    try { sessionStorage.setItem('antonios:quick-mission:v1', JSON.stringify({ id: quickId, state: quickGame })); } catch { /* Quick play works without storage. */ }
  }, [quickGame, quickId]);
  function playMusic() {
    if (!music || !preferences.sound || !preferences.music || hidden || screen === 'paused' || eventText) return;
    const element = audio.current ??= new Audio('/audio/arcade_01.mp3');
    element.loop = true; element.volume = .2;
    if (element.paused) void element.play().catch(() => { /* Retry on the next user gesture if autoplay is blocked. */ });
  }
  useEffect(() => {
    if (screen === 'paused' || hidden || eventText || !music || !preferences.sound || !preferences.music) audio.current?.pause();
    else playMusic();
  }, [screen, hidden, music, eventText?.id, preferences.sound, preferences.music]);
  useEffect(() => {
    if (screen !== 'tour' || hidden) return;
    const timer = window.setInterval(() => setTourSeconds(value => Math.min(30, value + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [screen, hidden]);
  useEffect(() => { if (screen === 'tour' && tourSeconds === 30) setScreen('menu'); }, [tourSeconds, screen]);
  function openEvent(id: EventId) { interruptedMission.current = modal === 'mission'; setGame(value => beginEvent(value, id)); setEvent(id); setEventPhase(0); setFeedback(''); setModal('event'); }
  useLayoutEffect(() => {
    if (quickGame || !inside || !loaded || screen !== 'game' || (modal && modal !== 'mission') || hidden) return;
    const savedPending = getProgress(current.current).seen.find(id => !getProgress(current.current).completedEvents.includes(id));
    if (savedPending) { openEvent(savedPending); return; }
    if (!eligibleEvents(current.current).length) return;
    const timer = window.setTimeout(() => { const next = eligibleEvents(current.current)[0]; if (next) openEvent(next); }, completed ? 200 : 16000);
    return () => window.clearTimeout(timer);
  }, [inside, loaded, screen, modal, hidden, chapter.id, p.mission, completed, p.completedEvents.length, quickId]);
  function menu() { setQuickGame(null); setQuickId(''); setScreen('menu'); setModal(null); setEvent(null); setFeedback(''); }
  function launchQuick(id: string) {
    const run = newQuickMission(id, selectedChapter); if (!run) return;
    unlockEffects(); playMusic(); interruptedMission.current = false;
    setQuickGame(run); setQuickId(id); setSelectedChapter(run.chapterId); setSelectedMission(id);
    setEvent(null); setFeedback(''); setNotice(''); setScreen('game'); setModal('mission');
  }
  function start(id = chapters[0].id, reset = false) {
    unlockEffects();
    if (screen === 'menu') setWorldReady(false);
    if (!reset && !chapterUnlocked(game, id)) { inspectHiring(id); return; }
    if (!reset) worldSound('open');
    interruptedMission.current = false;
    setGame(value => reset ? newGame() : enterCompany(value, id)); setHasSave(true); setScreen('game'); setModal(null); setEvent(null); setFeedback(''); setNotice(reset ? tc('hint') : c('terminalHint'));
    requestAnimationFrame(() => host.current?.querySelector<HTMLElement>('.godot-world')?.focus());
  }
  function returnToTown() {
    if (quickGame) { menu(); return; }
    worldSound('close');
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
    worldSound('locked');
    setLockedCompany(id); setNotice(tc('locked')); setModal('hiring');
  }
  function openMission() { if (!mission) { setNotice(c('complete')); return; } setFeedback(''); setModal('mission'); }
  function openSide(id: string) { setSideId(id); setFeedback(''); setModal('side'); }
  function interact(id: ObjectId | string) {
    if (screen !== 'game' || modal) return;
    if (mission && id === objective) { openMission(); return; }
    const encounter = availableSides.find(q => q.target === id);
    if (encounter) { openSide(encounter.id); return; }
    if (id === 'secret') { setGame(value => ({ ...value, secret: true })); setFeedback(c('secretLine')); setModal('info'); return; }
    if (id === 'terminal') { setNotice(mission ? qc('reach') : c('complete')); return; }
    if (id === 'coffee') { setGame(value => recoverEnergy({ ...value, coffee: true })); setFeedback(qc(chapter.id === 'nokia' ? 'infinite' : 'coffee')); setModal('info'); return; }
    setFeedback(id === 'team' ? c('npcLine') : scene.description[locale]); setModal('info');
  }
  function solveSide(index: number) {
    if (!side || exhausted) return;
    const result = chooseSide(game, side.id, index);
    if (result.state === game) return;
    setGame(result.state);
    if (!result.accepted) { setFeedback(`${side.failures[index]![locale]} ${qc('penalty')}`); return; }
    setFeedback(`${side.result[locale]} +${result.reward} ${qc('energy')}.${p.failedSide?.includes(side.id) ? ' ' + qc('noReward') : ''}`); setModal('info');
  }

  function walk(x: number, y: number) {
    if (screen !== 'game' || modal) return;
    if (Math.abs(x - position.x) + Math.abs(y - position.y) !== 1 || !mapWalkable(map, x, y)) return;
    worldSound(inside ? 'step-inside' : 'step-outside');
    setGame(value => inside ? updateProgress(value, { x, y }) : { ...value, world: { x, y, inside: false } });
  }
  function dpadStep(dx: number, dy: number) {
    if (screen !== 'game' || modal) return;
    const next = { x: dpadPosition.current.x + dx, y: dpadPosition.current.y + dy };
    if (!mapWalkable(map, next.x, next.y)) return;
    dpadPosition.current = next;
    worldSound(inside ? 'step-inside' : 'step-outside');
    setGame(value => inside ? updateProgress(value, next) : { ...value, world: { ...next, inside: false } });
  }
  function answer(id: string) {
    if (timedOut || exhausted || quickDone) return;
    const result = choose(game, id); const selected = mission.choices.find(choice => choice.id === id)!;
    if (result.state === game) return;
    const explanation = !result.accepted && mission.sequence && selected.accepted ? c('retry') : selected.feedback[locale];
    setFeedback(result.accepted ? explanation : `${explanation} ${qc('penalty')}`);
    setGame(result.state);
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
    if (key === 'J' && quickGame) { menu(); return; }
    if (key === 'I' || key === 'J') setModal(key === 'I' ? 'inventory' : 'jobs');
  }
  function dismissInfo() { setModal(interruptedMission.current && mission ? 'mission' : null); interruptedMission.current = false; }
  const closeModal = () => { if (modal === 'event') pause(); else setModal(null); };
  const nextChapter = chapters[chapters.findIndex(item => item.id === chapter.id) + 1];
  const title = last ? 'AntoñiOS System Recovery' : job.company;
  return <section ref={host} class={`arcade-world career-world job-route ${screen === 'game' || screen === 'paused' ? 'is-playing' : 'is-menu'}`} tabIndex={-1} aria-label="AntoñiOS Career Mode" onPointerDown={() => { unlockEffects(); playMusic(); }} onKeyDown={e => {
    unlockEffects(); playMusic();
    if (screen === 'game' && !modal && ['i', 'j', 'o'].includes(e.key.toLowerCase()) && !['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes((e.target as HTMLElement).tagName)) { e.preventDefault(); hudAction(e.key.toUpperCase()); }
    if (e.key === 'Escape' && !modal) { e.preventDefault(); e.stopPropagation(); if (screen === 'game') pause(); else if (screen === 'paused') setScreen('game'); else exit(); }
  }}>
    <header class="career-header"><span class="career-brand">JOB ROUTE <span aria-hidden="true">»</span><small>ANTOÑIOS / COLOR</small></span><nav aria-label={locale === 'es' ? 'Navegación de Career Mode' : 'Career Mode navigation'}>
      <a data-native-navigation href={href('/profile/')}>{c('profile')} ↗</a><a data-language href={`${localizedPath('/arcade/', locale === 'es' ? 'en' : 'es')}?career=continue${quickId ? `&mission=${encodeURIComponent(quickId)}&chapter=${encodeURIComponent(game.chapterId)}` : ''}`} lang={locale === 'es' ? 'en' : 'es'} aria-label={locale === 'es' ? 'English' : 'Español'}>{locale === 'es' ? 'EN' : 'ES'}</a><button onClick={exit}>{c('exit')}</button>
    </nav></header>
    {screen === 'menu' && <>
      <div class="career-hero"><img class="job-cover-art" src="/images/job-route/neon-city.webp" width="1536" height="1024" alt="" /><div class="career-hero-copy"><p class="eyebrow">{hudCopy.edition[locale]}</p><h1 class="job-title">JOB<br />ROUTE<span aria-hidden="true">»</span></h1><p class="job-tagline">{hudCopy.tagline[locale]}</p><p class="career-lead">{c('intro')}</p><div class="career-start"><button class="career-primary" onClick={() => hasSave ? setModal('reset') : start(chapters[0].id, true)}>{c('start')} <span aria-hidden="true">↗</span></button><button disabled={!hasSave} onClick={() => { setScreen('game'); setNotice(inside ? c('terminalHint') : tc('hint')); }}>{c('continue')}</button><button onClick={() => { setMenuMode('quick'); requestAnimationFrame(() => host.current?.querySelector('.career-mission-select')?.scrollIntoView({ block: 'center' })); }}>{c('quickMode')} →</button><button onClick={() => { setTourSeconds(0); setScreen('tour'); }}>{c('tour')}</button></div><p class="career-premise">{c('premise')}</p></div><div class="career-hero-scene"><div class="job-cover-id"><img src="/images/job-route/antonio-portrait.webp" width="96" height="96" alt="" /><span><strong>ANTONIO</strong><small>{tc('avatar')}</small></span></div></div></div>
      <div class="career-mode-switch" role="group" aria-label={c('selectMission')}><button aria-pressed={menuMode === 'campaign'} onClick={() => setMenuMode('campaign')}>{c('campaignMode')}</button><button aria-pressed={menuMode === 'quick'} onClick={() => setMenuMode('quick')}>{c('quickMode')}</button></div>
      {menuMode === 'quick' && <section class="career-mission-select" aria-labelledby="quick-title"><div><p class="eyebrow">ARCADE</p><h2 id="quick-title">{c('quickMode')}</h2><p>{c('quickIntro')}</p><label><span id="quick-company-label">{c('selectCompany')}</span><select aria-labelledby="quick-company-label" value={selectedChapter} onChange={e => { const id = e.currentTarget.value; setSelectedChapter(id); setSelectedMission(chapters.find(chapter => chapter.id === id)!.missions[0]); }}>{chapters.map(chapter => <option key={chapter.id} value={chapter.id}>{chapter.id === 'system-recovery' ? 'System Recovery' : data.professionalExperience.find(job => job.id === chapter.experienceId)!.company}</option>)}</select></label><div class="quick-mission-list" role="group" aria-label={c('selectMission')}>{chapters.find(chapter => chapter.id === selectedChapter)!.missions.map((id, index) => <button key={id} data-quick-mission={id} aria-pressed={id === selectedMission} onClick={() => setSelectedMission(id)}><span>{String(index + 1).padStart(2, '0')}</span>{missionById[id].title[locale]}</button>)}</div></div><aside><p class="eyebrow">{companyScenes[selectedChapter].title[locale]}</p><h3>{missionById[selectedMission].title[locale]}</h3><p>{missionById[selectedMission].briefing[locale]}</p><p class="quick-duration">◷ {missionById[selectedMission].seconds ?? 90}s · {qc('timer')}</p><button class="career-primary" onClick={() => launchQuick(selectedMission)}>{c('launchMission')} →</button></aside></section>}
      {menuMode === 'campaign' && <section class="career-chapters" aria-labelledby="career-chapters-title"><div class="career-section-heading"><h2 id="career-chapters-title">{c('chapters')}</h2><p>{c('independent')}</p></div><div class="career-chapter-grid">{chapters.map((item, index) => {
        const experience = data.professionalExperience.find(job => job.id === item.experienceId)!;
        return <button key={item.id} data-chapter={item.id} disabled={!chapterUnlocked(game, item.id)} class={`career-chapter ${chapterCleared(game, item.id) ? 'is-complete' : ''}`} onClick={() => start(item.id)}><span class="career-chapter-number">{chapterCleared(game, item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><strong>{item.id === 'system-recovery' ? 'System Recovery' : experience.company}</strong><small>{item.id === 'system-recovery' ? c('ongoing') : experience.period}</small><span class="career-chapter-role">{item.id === 'system-recovery' ? c('perspective') : experience.role}</span>{index === 0 && <small>{c('prologue')}</small>}<span class="career-chapter-play">{chapterUnlocked(game, item.id) ? c('play') : tc('locked')} →</span></button>;
      })}</div></section>}
    </>}
    {screen === 'tour' && <div class="career-tour"><p class="eyebrow">{c('tour')} · {tourSeconds} / 30</p><img class="career-tour-art" src="/images/job-route/neon-office.webp" width="1536" height="1024" alt="" /><h1>{tourSeconds < 10 ? c('tourIntro') : tourSeconds < 20 ? c('tourMiddle') : c('tourEnd')}</h1><progress value={tourSeconds} max={30} aria-label={c('tour')} /><div class="career-actions"><button onClick={() => setScreen('menu')}>{c('tourSkip')}</button><a class="button" data-native-navigation href={href('/profile/')}>{c('profile')} ↗</a></div></div>}
    {(screen === 'game' || screen === 'paused') && <>
      {inside && !quickGame && <nav class="career-route" aria-label={locale === 'es' ? 'Ruta de la campaña' : 'Campaign route'}>{chapters.map((item, index) => <button key={item.id} disabled={!chapterUnlocked(game, item.id)} class={chapterCleared(game, item.id) ? 'is-complete' : ''} aria-current={item.id === chapter.id ? 'step' : undefined} onClick={() => start(item.id)}><span>{chapterCleared(game, item.id) ? '✓' : String(index + 1).padStart(2, '0')}</span><small>{item.id === 'system-recovery' ? 'System Recovery' : data.professionalExperience.find(job => job.id === item.experienceId)!.company}</small></button>)}</nav>}
      <div class="career-game-heading"><div><p class="eyebrow">{!inside ? tc('district') : last ? (locale === 'es' ? 'DESAFÍO FINAL' : 'FINAL BOSS') : `${String(chapters.indexOf(chapter)).padStart(2, '0')} / CAREER MODE`}</p><h1>{inside ? title : tc('title')}</h1><p>{inside ? `${job.period} · ${job.role}` : tc('intro')}</p></div><div class="career-actions">{inside && <button onClick={returnToTown}>{quickGame ? c('quickBack') : tc('outside')}</button>}<button onClick={menu}>{c('menu')}</button><button onClick={screen === 'paused' ? () => setScreen('game') : pause}>{screen === 'paused' ? c('resume') : c('pause')}</button></div></div>
      {screen === 'paused' && <div class="career-paused"><span aria-hidden="true">Ⅱ</span><h2>{c('paused')}</h2><p>{c('saved')}</p><button class="career-primary" onClick={() => setScreen('game')}>{c('resume')}</button></div>}<div class="career-play-layout" hidden={screen === 'paused'}>
        <div class="career-stage"><div class="career-scene"><GameHud locale={locale} map={inside ? interiorMap : townMap} signs={signs} x={position.x} y={position.y} inside={inside} currentId={chapter.id} objective={objective} energy={p.energy ?? 100} seconds={remaining} timed={game.timed !== false} mission={mission?.title[locale]} completed={completedCount} missionProgress={p.mission} missionTotal={chapter.missions.length} onAction={hudAction} /><div class="career-stage-top"><span>{inside ? c('main') : tc('district')}</span><span>{inside ? Math.min(p.mission + 1, chapter.missions.length) : completedCount} / {inside ? chapter.missions.length : chapters.length}</span></div><GodotWorld onReady={() => setWorldReady(true)} objective={inside ? (mission ? objective : canAdvance ? 'portal' : 'team') : undefined} map={map} x={position.x} y={position.y} locale={locale} active={!modal && screen === 'game'} onMove={walk} onInteract={worldInteract} onPause={pause} /></div>
          <p class="career-controls-help">{c('controls')}</p><div class="career-world-controls"><DirectionPad locale={locale} active={!modal && screen === 'game'} onStep={dpadStep} /><button onClick={() => { const object = mapNearby(map, position.x, position.y); if (object) worldInteract(object.id); else setNotice(c('walkCloser')); }}>{c('interact')} <kbd>E</kbd></button></div>
          {inside && <details class="career-direct"><summary>{c('accessible')}</summary><div class="career-actions"><button onClick={openMission}>{c('workstation')}</button><button onClick={() => interact('team')}>{c('npc')}</button><button onClick={() => interact('coffee')}>{c('coffee')}</button><button onClick={() => interact('secret')}>{c('secret')}</button></div></details>}
        </div>
        <aside class="career-quest-panel">{!inside ? <><p class="eyebrow">{tc('destination')}</p><h2>{hudCopy.journal[locale]}</h2><p>{tc('hint')}</p><p>{tc('route')}</p><div class="town-directory">{signs.map((sign, index) => <button key={sign.id} data-company={sign.id} disabled={!sign.unlocked} onClick={() => start(sign.id)}><span>{sign.complete ? '✓' : sign.unlocked ? '→' : '×'} {String(index + 1).padStart(2, '0')}</span><strong>{sign.name}</strong><small>{sign.unlocked ? tc('enter') : tc('locked')}</small></button>)}</div><p class="town-avatar">{tc('avatar')}</p></> : <><div class="chapter-setting"><p class="eyebrow">{scene.title[locale]}</p><p>{scene.description[locale]}</p></div><div class="quest-resources"><label>{qc('energy')} <strong>{p.energy ?? 100}/100</strong><meter min={0} max={100} low={25} high={70} optimum={100} value={p.energy ?? 100} /></label><label class="quest-timing-toggle"><input type="checkbox" checked={game.timed !== false} onChange={e => setGame(value => ({ ...value, timed: e.currentTarget.checked }))} />{qc('timer')}</label>{mission && game.timed !== false && <div class={timedOut ? 'quest-clock is-expired' : 'quest-clock'}><span>{remaining}s</span><progress value={remaining} max={seconds} aria-label={qc('timer')} />{timedOut && <><p role="status">{qc('timeout')}</p><button onClick={() => setGame(value => updateProgress(value, { remaining: seconds }))}>{qc('retry')}</button></>}</div>}{exhausted ? <><p role="status">{qc('exhausted')}</p><button onClick={() => { setGame(recoverEnergy); setFeedback(''); }}>{qc('rest')}</button></> : (p.energy ?? 100) < 25 && <p>{qc('tired')}</p>}</div><p class="eyebrow">{c('main')}</p><h2>{mission ? mission.title[locale] : last ? c('recovered') : c('complete')}</h2>{mission ? <><p>{mission.briefing[locale]}</p><button class="career-primary" onClick={openMission}>{c('workstation')} →</button><small>{qc('shortcut')}</small><p>{qc('reach')}</p></> : <><p>{last ? c('ongoing') : job.summary}</p>{last && <><p class="eyebrow">{c('current')}</p><strong>{data.portfolio.profile.role}</strong><p>{c('perspective')}</p></>}<p class="career-success">✓ {c('complete')}</p></>}
          <ol class="chapter-missions" aria-label={qc('route')}>{chapter.missions.map((id, index) => <li key={id} class={index < p.mission ? 'is-done' : index === p.mission ? 'is-current' : ''} aria-current={index === p.mission ? 'step' : undefined}><span aria-hidden="true">{index < p.mission ? '✓' : String(index + 1).padStart(2, '0')}</span><span>{missionById[id].title[locale]}<small>{interiorMap.objects.find(o => o.id === (missionById[id].target ?? 'terminal'))?.label}</small></span></li>)}</ol>
          {chapterSides.length > 0 && <details class="chapter-sidequests" open><summary>{qc('optional')} · {p.side?.length ?? 0}/{chapterSides.length}</summary>{chapter.id === 'freelance' && <p>{qc('focus')}</p>}{chapterSides.map(q => <button key={q.id} data-side={q.id} disabled={p.side?.includes(q.id) || p.mission < (q.after ?? 0)} onClick={() => openSide(q.id)}><span>{p.side?.includes(q.id) ? '✓' : '◇'}</span> {q.title[locale]}{p.side?.includes(q.id) && <small>{qc('sideDone')}</small>}</button>)}</details>}
          <progress value={p.mission} max={chapter.missions.length} aria-label={c('main')} />
          {p.pendingPipeline && <div class="career-pending"><strong>{c('pipelinePending')}</strong><button onClick={() => { setGame(value => updateProgress(value, { pendingPipeline: false })); setNotice(c('coverResult')); }}>{c('repair')}</button></div>}
          {chapter.id === 'nokia' && <p class="career-silence">{c('silence')}</p>}
          {canAdvance && nextChapter && <><p class="godot-portal is-open">{tc('unlocked')}</p><button class="career-primary" onClick={returnToTown}>{tc('outside')} →</button></>}
          {canAdvance && <button onClick={() => { setGame(replayChapter); setNotice(c('terminalHint')); }}>{c('replay')}</button>}
          <a class="career-experience-link" data-native-navigation href={href(`/experience/#${chapter.experienceId}`)}>{c('experience')} ↗</a>
          <details class="career-evidence"><summary>{locale === 'es' ? 'Decisiones y evidencia de esta etapa' : 'Decisions and evidence for this chapter'}</summary>{data.representativeDecisions.filter(item => item.experienceIds.includes(chapter.experienceId)).map(item => <article key={item.id}><a data-native-navigation href={href(`/architecture/#${item.id}`)}>{item.title}</a><p>{item.problem}</p><details class="career-decision-encounter"><summary>{locale === 'es' ? '¿Qué decidirías? Explorar la decisión' : 'What would you decide? Explore the decision'}</summary><p>{item.decision}</p><p>{item.principle}</p></details></article>)}{data.achievements.filter(item => item.experienceIds.includes(chapter.experienceId)).map(item => <p key={item.id}>{item.summary} {item.scope}</p>)}<h3>{locale === 'es' ? 'Misiones opcionales · laboratorios personales' : 'Optional missions · personal labs'}</h3>{data.portfolio.projects.map(item => <p key={item.id}><a data-native-navigation href={href(`/projects/${item.slug}/`)}>{item.name}</a> · {item.challenge}</p>)}</details><details class="career-journal"><summary>{c('journal')} · {completedCount}/{chapters.length}</summary><h3>{c('abilities')}</h3>{abilities.length ? <ul>{abilities.map(ability => <li key={ability.id}>{ability.name}</li>)}</ul> : <p>{c('noAbilities')}</p>}<h3>{c('achievements')}</h3><ul>{completedCount > 0 && <li>{locale === 'es' ? 'Primer commit · primera etapa completada' : 'First commit · first chapter completed'}</li>}{Object.values(game.chapters).some(progress => progress.choices.some(value => value.startsWith('mobile:') || value.startsWith('button:') || value.startsWith('validation:'))) && <li>{locale === 'es' ? 'Cazador de bugs' : 'Bug hunter'}</li>}{isComplete(game, 'nokia') && <li>{locale === 'es' ? 'Silencio · 22:47' : 'Silence · 22:47'}</li>}{hasEvent(game, 'wedding') && <li>{c('weddingDone')}</li>}{hasEvent(game, 'emma-born') && <li>{c('familyDone')}</li>}{Object.values(game.chapters).some(progress => progress.choices.includes('prioritize:team')) && <li>{locale === 'es' ? 'Hacer equipo' : 'Team builder'}</li>}{isComplete(game, 'domingo-alonso') && <li>{locale === 'es' ? 'Arquitecto del sistema · logro del juego' : 'System architect · game achievement'}</li>}{isComplete(game, 'system-recovery') && <li>{c('recovered')}</li>}{game.secret && <li>THE INTERNET</li>}</ul></details>
        </>}</aside>
      </div>
      <div class="career-inventory"><strong>{c('inventory')}</strong><span>▣ {c('phone')}</span><span>◇ {c('knowledge')}</span>{game.coffee && <button onClick={() => { setFeedback(c('coffeeLine')); setModal('info'); }}>☕ {c('coffee')}</button>}{hasEvent(game, 'wedding') && <span>♢ {c('ring')}</span>}{hasEvent(game, 'emma-born') && <span>♡ {c('family')}</span>}</div>
    </>}
    <footer class="career-footer"><span>{qc('fiction')}</span><div>{preferences.sound && <button aria-pressed={foley} onClick={() => { effects.current?.stop(); setFoley(value => !value); }}>{locale === 'es' ? `Pasos y puertas: ${foley ? 'activados' : 'desactivados'}` : `Footsteps and doors: ${foley ? 'on' : 'off'}`}</button>}{preferences.sound && preferences.music ? <button onClick={toggleMusic}>{music ? t('Pause music') : t('Play music')}</button> : <span>{preferences.sound ? (locale === 'es' ? 'Música desactivada en Ajustes' : 'Music disabled in Settings') : (locale === 'es' ? 'Activa el sonido en Ajustes para oír pasos y puertas' : 'Enable sound in Settings to hear footsteps and doors')}</span>}<small>{quickGame ? c('quickMode') : storageNotice || c('saved')}</small></div></footer><p class="career-status" role="status">{notice}</p>
    {screen === 'game' && modal === 'inventory' && <Modal title={c('inventory')} close={() => setModal(null)}><div class="job-inventory-grid"><span>▣ {c('phone')}</span><span>◇ {c('knowledge')}</span>{game.coffee && <span>☕ {c('coffee')}</span>}{hasEvent(game, 'wedding') && <span>♢ {c('ring')}</span>}{hasEvent(game, 'emma-born') && <span>♡ {c('family')}</span>}</div><h3>{c('abilities')}</h3>{abilities.length ? <ul>{abilities.map(ability => <li key={ability.id}>{ability.name}</li>)}</ul> : <p>{c('noAbilities')}</p>}<button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'jobs' && <Modal title={hudCopy.jobs[locale]} close={() => setModal(null)}>{inside && mission && <><p class="eyebrow">{hudCopy.objective[locale]}</p><h3>{mission.title[locale]}</h3><p>{mission.briefing[locale]}</p><button class="career-primary" onClick={() => { setFeedback(''); setModal('mission'); }}>{c('workstation')}</button></>}<div class="career-choices">{signs.map(sign => <button key={sign.id} onClick={() => start(sign.id)}>{sign.complete ? '✓' : sign.unlocked ? '→' : '×'} {sign.name}</button>)}</div><button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'hiring' && <Modal title={tc('hiring')} close={() => setModal(null)}><div class="job-hiring-status"><span aria-hidden="true">▣</span><div><p class="eyebrow">{tc('requirements')}</p><h3>{signs.find(sign => sign.id === lockedCompany)?.name}</h3></div></div><p>{tc('hiringBody')}</p><p>{tc('chaptersNeeded')}: <strong>{hiring.length}</strong></p>{nextTraining && <section class="job-hiring-requirements"><p class="eyebrow">{tc('nextStep')}</p><h3>{signs.find(sign => sign.id === nextTraining.id)?.name}</h3>{nextTraining.skills.length > 0 && <><h4>{tc('skillsNeeded')}</h4><ul class="job-skill-chips">{nextTraining.skills.map(skill => <li key={skill}>{gameSkills[skill][locale]}</li>)}</ul></>}<h4>{tc('challenges')}</h4><ul class="job-hiring-checklist">{nextTraining.missions.map(m => <li key={m.id} class={m.done ? 'is-earned' : ''}><span aria-hidden="true">{m.done ? '✓' : '◇'}</span><span>{m.title[locale]}<small>{tc(m.done ? 'earned' : 'outstanding')}</small></span></li>)}{nextTraining.events > 0 && <li>◇ {tc('eventsNeeded')}: {nextTraining.events}</li>}{nextTraining.repair && <li>◇ {tc('repairNeeded')}</li>}</ul></section>}<div class="career-actions">{nextTraining && <button class="career-primary" onClick={() => start(nextTraining.id)}>{tc('continueTraining')} →</button>}<button onClick={() => setModal(null)}>{c('close')}</button></div></Modal>}
    {modal === 'reset' && <Modal title={c('start')} close={() => setModal(null)}><p>{c('reset')}</p><div class="career-actions"><button onClick={() => start(chapters[0].id, true)}>{c('confirmReset')}</button><button onClick={() => setModal(null)}>{c('cancel')}</button></div></Modal>}
    {screen === 'game' && modal === 'mission' && mission && !quickDone && <Modal title={mission.title[locale]} close={closeModal}><p class="eyebrow">{c(`${mission.mechanic}Label` as keyof typeof copy)}</p><p>{mission.briefing[locale]}</p><p class="mission-rules">{qc('rules')}</p><p>{qc('energy')}: {p.energy ?? 100}/100</p>{exhausted && <div class="career-pending"><p role="status">{qc('exhausted')}</p><button onClick={() => { setGame(recoverEnergy); setFeedback(''); }}>{qc('rest')}</button></div>}<div class="mission-timer"><span>{game.timed !== false ? remaining + 's' : qc('untimed')}</span><button onClick={() => setGame(value => ({ ...value, timed: value.timed === false }))}>{game.timed !== false ? qc('untimed') : qc('timer')}</button></div>{timedOut && <div class="career-pending"><p role="status">{qc('timeout')}</p><button onClick={() => setGame(value => updateProgress(value, { remaining: seconds }))}>{qc('retry')}</button></div>}{mission.challenge === 'snake' && <SnakeQuest value={p.snake} locale={locale} disabled={timedOut || exhausted} onChange={snake => { const failed = snake.failed && !p.snake?.failed; setGame(value => updateProgress(failed ? failAttempt(value) : value, { snake })); if (failed) setFeedback(qc('penalty')); }} />}{mission.evidence && <pre><code>{mission.evidence}</code></pre>}{mission.metrics && <div class="career-metrics">{mission.metrics.map(metric => <div key={metric.label}><label>{metric.label} <strong>{metric.value}%</strong><meter min={0} max={100} value={metric.value} /></label></div>)}</div>}{mission.sequence && <><p>{c('step')} {p.sequence.length + 1} / {mission.sequence.length}</p><div class="career-flow" aria-label={c('progress')}>{p.sequence.map(id => <span key={id}>✓ {mission.choices.find(choice => choice.id === id)!.label[locale]}</span>)}</div></>}<div class={`career-choices mechanic-${mission.mechanic}`}>{mission.choices.map(choice => <button key={choice.id} data-choice={choice.id} disabled={timedOut || exhausted || p.sequence.includes(choice.id) || (mission.challenge === 'snake' && p.snake?.score !== 4)} onClick={() => answer(choice.id)}>{choice.label[locale]}</button>)}</div><p class="career-feedback" role="status">{feedback}</p><button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'side' && side && <Modal title={side.title[locale]} close={() => setModal(null)}><p class="eyebrow">{qc('optional')}</p><p>{side.briefing[locale]}</p>{feedback && <p class="career-feedback" role="status">{feedback}</p>}<p class="mission-rules">{p.failedSide?.includes(side.id) ? qc('noReward') : qc('sideRules')}</p><p>{qc('energy')}: {p.energy ?? 100}/100{game.timed !== false && mission ? ` · ${remaining}s` : ''}</p>{exhausted && <div class="career-pending"><p role="status">{qc('exhausted')}</p><button onClick={() => { setGame(recoverEnergy); setFeedback(''); }}>{qc('rest')}</button></div>}<div class="career-choices">{side.options.map((option, index) => <button key={index} data-side-choice={index} disabled={exhausted} onClick={() => solveSide(index)}>{option[locale]}</button>)}</div><button onClick={() => setModal(null)}>{c('close')}</button></Modal>}
    {screen === 'game' && modal === 'info' && !quickDone && <Modal title={c('journal')} close={dismissInfo}><p class="career-result">{feedback}</p><button class="career-primary" onClick={dismissInfo}>{c('returnMission')}</button></Modal>}
    {screen === 'game' && quickDone && <Modal title={c('quickDone')} close={menu}><p class="career-result">{feedback || missionById[quickId].title[locale]}</p><div class="career-actions"><button class="career-primary" onClick={() => launchQuick(quickId)}>{c('quickAgain')}</button>{mission && <button onClick={() => launchQuick(mission.id)}>{c('quickNext')} →</button>}<button onClick={menu}>{c('quickBack')}</button></div></Modal>}
    {screen === 'game' && modal === 'event' && event && <Modal title={eventText ? c('personal') : c('event')} close={closeModal}>
      {event === 'freelance' && <><p class="eyebrow">{c('freelance')}</p><p>{eventPhase === 0 ? c('call') : c('sideFix')}</p>{eventPhase === 0 ? <div class="career-choices"><button onClick={() => setEventPhase(1)}>{c('accept')}</button><button onClick={() => setEventPhase(1)}>{c('acceptAnyway')}</button></div> : <><pre>PUBLIC_URL=http://localhost:3000</pre><button class="career-primary" onClick={() => finishEvent(c('sideDone'))}>{c('fixConfig')}</button></>}</>}
      {event === 'incident' && <><p>{c('incident')}</p><div class="career-choices"><button onClick={() => { setGame(value => updateProgress(value, { pendingPipeline: true })); finishEvent(c('investigateResult')); }}>{c('investigate')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('delegate')}</button><button disabled={exhausted} onClick={() => { setGame(failAttempt); setFeedback(`${c('deferResult')} ${qc('penalty')}`); }}>{c('defer')}</button></div><p role="status">{feedback}</p></>}
      {eventText && <div class="career-personal-event"><span aria-hidden="true">{event === 'wedding' ? '♢' : '♡'}</span><h3>{eventText.title[locale]}</h3><p>{eventText.description[locale]}</p><button class="career-primary" onClick={() => finishEvent(c(event === 'wedding' ? 'weddingDone' : 'familyDone'))}>{c(event === 'wedding' ? 'weddingAction' : 'welcomeEmma')}</button></div>}
      {event === 'friday' && <><p>{c('friday')}</p><div class="career-choices"><button onClick={() => finishEvent(c('homeResult'))}>{c('home')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('deploy')}</button></div></>}
      {event === 'family' && <><p>{c('baby')}</p><div class="career-choices"><button onClick={() => { setGame(value => completeEvent(value, 'family')); setEvent(null); setModal(null); setScreen('paused'); setNotice(c('coverResult')); }}>{c('pause')}</button><button onClick={() => finishEvent(c('coverResult'))}>{c('delegate')}</button></div></>}
    </Modal>}
  </section>;
}
