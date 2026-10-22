import { useEffect, useRef, useState } from 'preact/hooks';
import type { ArcadeProps } from './contract';
import { useLocale } from '../i18n/context';
import { localizedPath } from '../i18n/core';
import { nativeChannel, nativePortfolioPath, readNativePanel, type NativeCommand, type NativePanel } from './native-bridge';
import { worldCopy } from './world-copy';
import DirectionPad from './DirectionPad';
import CharacterActivities from './CharacterActivities';

/** Native migration host: lifecycle, accessibility and portfolio navigation only.
 * Host nativo: solo ciclo de vida, accesibilidad y navegación del portfolio. */
export default function NativeArcade({ data, exit, navigate }: ArcadeProps) {
  const { locale, href } = useLocale();
  const frame = useRef<HTMLIFrameElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [attempt, setAttempt] = useState(0);
  const [paused, setPaused] = useState(false);
  const [world, setWorld] = useState('town');
  const [dialogue, setDialogue] = useState<{ speaker: string; text: string } | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [questCompleted, setQuestCompleted] = useState(false);
  const [session, setSession] = useState<{ panel: string; feedback: string }>({ panel: '', feedback: '' });
  const [panel, setPanel] = useState<NativePanel | null>(null);
  const [gameStatus, setGameStatus] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [saveBlocked, setSaveBlocked] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const pendingExit = useRef(false);
  const current = useRef({ data, navigate, locale, exit }); current.current = { data, navigate, locale, exit };
  const text = (es: string, en: string) => locale === 'es' ? es : en;
  function send(command: NativeCommand) {
    frame.current?.contentWindow?.postMessage({ channel: nativeChannel, type: 'command', command }, location.origin);
  }
  useEffect(() => {
    if (!dialogue) return;
    const element = dialog.current;
    const previous = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => { element?.close(); if (previous?.isConnected) previous.focus(); };
  }, [Boolean(dialogue)]);
  useEffect(() => {
    let ready = false;
    const timer = window.setTimeout(() => { if (!ready) setStatus('failed'); }, 60_000);
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.channel !== nativeChannel) return;
      const value = event.data;
      if (value.type === 'ready') { ready = true; clearTimeout(timer); setStatus('ready'); send({ type: 'requestSession' }); }
      if (value.type === 'worldEntered' && typeof value.id === 'string') setWorld(value.id);
      if (value.type === 'error') { clearTimeout(timer); setStatus('failed'); }
      if (value.type === 'storageError') setStorageError(true);
      if (value.type === 'paused' && pendingExit.current) current.current.exit();
      if (value.type === 'activity' && typeof value.active === 'boolean') setPaused(!value.active);
      if (value.type === 'questCompleted' && value.id === 'first_visit') setQuestCompleted(true);
      if (value.type === 'dialogue' && typeof value.text === 'string' && typeof value.speaker === 'string') setDialogue(value.id ? { text: value.text, speaker: value.speaker } : null);
      if (value.type === 'session' && value.session && typeof value.session.panel === 'string' && typeof value.session.feedback === 'string') {
        setSession({ panel: value.session.panel, feedback: value.session.feedback });
        setPanel(readNativePanel(value.session.presentation));
        if (typeof value.session.status === 'string') setGameStatus(value.session.status);
        if (typeof value.session.storage === 'string') setSaveStatus(value.session.storage);
        setSaveBlocked(value.session.saveBlocked === true);
        if (typeof value.session.world === 'string') setWorld(value.session.world);
      }
      const path = nativePortfolioPath(value, current.current.data);
      if (path?.includes('#')) location.assign(localizedPath(path, current.current.locale));
      else if (path) current.current.navigate(path);
    };
    window.addEventListener('message', receive);
    return () => { clearTimeout(timer); window.removeEventListener('message', receive); };
  }, [attempt]);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => send({ type: 'configuration', reducedMotion: motion.matches });
    const visibility = () => { if (document.hidden) { setPaused(true); send({ type: 'pause' }); } };
    motion.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => { motion.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => { if (status === 'ready') send({ type: 'setLanguage', language: locale }); }, [locale, status]);
  function togglePause() { send({ type: paused ? 'resume' : 'pause' }); setPaused(!paused); }
  return <section class="arcade-world career-world job-route native-arcade is-playing" aria-label={text('Arcade nativo', 'Native Arcade')}>
    <header class="career-header"><span class="career-brand">JOB ROUTE <small>ANTOÑIOS / COLOR</small></span><nav aria-label={text('Navegación de Arcade', 'Arcade navigation')}>
      <a href={href('/profile/')}>{text('Perfil', 'Profile')}</a>
      <a data-language href={`${localizedPath('/arcade/', locale === 'es' ? 'en' : 'es')}?career=continue&nativeArcade=1`} lang={locale === 'es' ? 'en' : 'es'}>{locale === 'es' ? 'EN' : 'ES'}</a>
      <button onClick={() => { if (status !== 'ready') { exit(); return; } pendingExit.current = true; send({ type: 'pause' }); }}>{text('Volver al escritorio', 'Return to desktop')}</button>
    </nav></header>
    <div class="career-game-heading"><h1>{world === 'town' ? text('Villa Trayectoria', 'Career Town') : 'Freelance'}</h1><button disabled={status !== 'ready'} onClick={togglePause}>{paused ? text('Continuar', 'Resume') : text('Pausar', 'Pause')}</button></div>
    <div class="godot-world" data-engine={status} data-map={world}>
      <div class="godot-viewport" aria-busy={status === 'loading'}>
        {status !== 'ready' && <div class="godot-loading"><img src="/images/job-route/neon-city.webp" alt="" /><div role="status"><p>{worldCopy[status === 'failed' ? 'failed' : 'loading'][locale]}</p>{status === 'failed' && <button onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>{worldCopy.retry[locale]}</button>}</div></div>}
        <iframe key={attempt} ref={frame} class={`godot-frame ${status === 'ready' ? 'is-ready' : ''}`} src={`/games/career/index.html?runtime=native&lang=${locale}`} title={worldCopy.title[locale]} tabIndex={status === 'ready' && !paused ? 0 : -1} aria-hidden={status !== 'ready' || paused || undefined} onError={() => setStatus('failed')} />
      </div>
      <div class="godot-toolbar"><a class="godot-badge" href="/licenses/godot.txt" target="_blank" rel="noopener">GODOT</a></div>
    </div>
    <p class="career-controls-help">{text('Flechas o WASD para caminar. E para interactuar. Toca un objeto para acercarte.', 'Arrows or WASD to walk. E to interact. Tap an object to approach it.')}</p>
    <CharacterActivities frame={frame} locale={locale} active={status === 'ready' && !paused && !dialogue && !session.panel} />
    <div class="career-world-controls"><DirectionPad locale={locale} active={status === 'ready' && !paused && !dialogue && !session.panel} onStep={(x, y) => send({ type: 'step', direction: [x, y] })} /><button disabled={status !== 'ready' || paused} onClick={() => send({ type: 'interactNearby' })}>{text('Interactuar', 'Interact')}</button></div>
    <nav class="career-actions" aria-label={text('Acciones accesibles del juego', 'Accessible game actions')}>
      <button disabled={status !== 'ready' || paused || Boolean(dialogue)} onClick={() => send({ type: 'openMenu' })}>{text('Partida y misiones', 'Game and missions')}</button>
      {world !== 'town' && <button disabled={status !== 'ready' || paused || Boolean(dialogue)} onClick={() => send({ type: 'openMission' })}>{text('Misión actual', 'Current mission')}</button>}
      <button disabled={status !== 'ready' || paused} onClick={() => send({ type: world === 'town' ? 'enterWorld' : 'returnToHub', id: 'freelance' })}>{world === 'town' ? text('Entrar en Freelance', 'Enter Freelance') : text('Volver a la ciudad', 'Return to town')}</button>
      {world === 'freelance' && <button disabled={paused} onClick={() => send({ type: 'approach', id: 'flatmate' })}>{text('Hablar con el compañero de piso', 'Talk to the flatmate')}</button>}
      {world === 'freelance' && <><button disabled={paused || Boolean(dialogue) || Boolean(session.panel)} onClick={() => send({ type: 'approach', id: 'cape' })}>{text('Hablar con el compañero de la capa', 'Talk to the caped flatmate')}</button><button disabled={paused || Boolean(dialogue) || Boolean(session.panel)} onClick={() => send({ type: 'approach', id: 'hairy' })}>{text('Hablar con el compañero ciclista', 'Talk to the cyclist flatmate')}</button></>}
    </nav>
    {questCompleted && <p role="status">{text('Has conocido la etapa freelance.', 'You have explored the freelance chapter.')}</p>}
    {gameStatus && world !== 'town' && <p class="career-controls-help">{gameStatus}</p>}
    {saveStatus === 'migrated' && <p role="status">{text('Partida anterior importada. Conservamos el guardado original; las etapas sin mapa nativo se reanudan desde la ciudad.', 'Previous game imported. The original save is retained; chapters without a native map resume from town.')}</p>}
    {saveBlocked && <p role="alert">{text('No se pudo leer la partida. El guardado está protegido: puedes explorar sin sobrescribirlo o empezar una campaña nueva desde el menú.', 'The save could not be read. It is protected: you can explore without overwriting it or start a new campaign from the menu.')}</p>}
    {storageError && <p role="alert">{text('No se pudo guardar la partida. Puedes seguir jugando.', 'The game could not be saved. You can keep playing.')}</p>}
    {session.panel && panel && <section class="career-quest-panel" aria-labelledby="native-panel-title"><h2 id="native-panel-title">{panel.title}</h2><p style={{ whiteSpace: 'pre-wrap' }}>{panel.text}</p>{panel.board && <svg width="160" height="160" viewBox="0 0 160 160" role="img" aria-label={panel.board.label}>{panel.board.cells.map((cell, index) => <rect key={index} x={index % 8 * 20} y={Math.floor(index / 8) * 20} width="20" height="20" fill={['#bdcb9c', '#465b36', '#344924'][cell]} stroke="#a3b080" stroke-width=".5" />)}</svg>}<p role="status">{panel.feedback}</p><div class="career-choices">{panel.choices.map(choice => <button key={choice.id} data-choice={choice.id} disabled={choice.disabled} onClick={() => send(choice.command)}>{choice.label}</button>)}</div></section>}
    {dialogue && <dialog ref={dialog} class="career-dialog" aria-labelledby="native-dialogue-title" onCancel={event => { event.preventDefault(); send({ type: 'cancelDialogue' }); }}><h2 id="native-dialogue-title">{dialogue.speaker}</h2><p>{dialogue.text}</p><button onClick={() => send({ type: 'advanceDialogue' })}>{text('Continuar', 'Continue')}</button></dialog>}
  </section>;
}
