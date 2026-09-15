import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import type { Locale } from '../i18n/core';
import { bridgeChannel, readMapAction } from './godot-bridge';
import { mapNearby, type PixelMap } from './pixel-map';
import { rasterize } from './godot-art';
import { avatarFrames } from './avatar';
import { copy } from './campaign';
import { prepareSceneArt } from './scene-art';
import { townCopy } from './town';

export const worldCopy = {
  loading: { es: 'Preparando el mundo…', en: 'Preparing the world…' },
  failed: { es: 'No se pudo iniciar el juego. Tu progreso está guardado. Reintenta la carga.', en: 'The game could not start. Your progress is saved. Try loading again.' },
  retry: { es: 'Reintentar', en: 'Try again' },
  title: { es: 'Ciudad pixel art: camina con flechas e interactúa con E', en: 'Pixel art town: walk with arrows and interact with E' },
  license: { es: 'Licencia de Godot', en: 'Godot license' },
  zoom: { es: 'Acercar al personaje', en: 'Follow the character' },
  overview: { es: 'Ver mapa completo', en: 'View full map' },
};
interface Props { onReady?: () => void; map: PixelMap; x: number; y: number; locale: Locale; active: boolean; objective?: string; onMove: (x: number, y: number) => void; onInteract: (id: string) => void; onPause: () => void }
export default function GodotWorld(props: Props) {
  const { x, y, locale, map, active } = props;
  const frame = useRef<HTMLIFrameElement>(null), current = useRef(props); current.current = props;
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading');
  const [attempt, setAttempt] = useState(0), ready = useRef(false), lastMap = useRef<PixelMap | null>(null);
  const prepared = useRef<PixelMap | null>(null);
  const [preparing, setPreparing] = useState(true);
  const [zoom, setZoom] = useState(() => map.art ? 1 : typeof matchMedia === 'function' && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 2 : 1), currentZoom = useRef(zoom); currentZoom.current = zoom;
  useEffect(() => { if (map.art) setZoom(1); }, [map.id]);
  useEffect(() => {
    let alive = true;
    setPreparing(prepared.current?.id !== map.id);
    void prepareSceneArt(map).then(() => { if (alive) { prepared.current = map; encoded.current = null; lastMap.current = null; if (ready.current) sync(); setPreparing(false); } }).catch(() => { if (alive) { ready.current = false; setStatus('failed'); } });
    return () => { alive = false; };
  }, [map, attempt]);
  const held = useRef<number[] | null>(null);
  const heldKeys = useRef(new Map<string, number[]>());
  function releaseKeys() { held.current = null; heldKeys.current.clear(); }
  useEffect(() => {
    releaseKeys();
    if (!active || status !== 'ready') return;
    const stop = releaseKeys;
    window.addEventListener('blur', stop);
    const timer = window.setInterval(() => { const p = current.current; if (held.current) p.onMove(p.x + held.current[0], p.y + held.current[1]); }, 140);
    return () => { clearInterval(timer); window.removeEventListener('blur', stop); releaseKeys(); };
  }, [active, map.id, status]);
  const c = (key: keyof typeof worldCopy) => worldCopy[key][locale];
  const encoded = useRef<{ map: PixelMap; data: object } | null>(null);
  function sync() {
    const p = current.current, changed = lastMap.current !== p.map;
    if (changed && prepared.current !== p.map) return;
    if (changed && encoded.current?.map !== p.map) {
      const art = rasterize(p.map);
      encoded.current = { map: p.map, data: { ...p.map, rects: [], labels: [], image: art.background.toDataURL('image/png').split(',')[1], spriteImage: art.sprite?.toDataURL('image/png').split(',')[1], entities: art.entities.map(e => ({ depth: e.depth, bounds: e.bounds, motion: e.motion ?? [], image: e.canvas.toDataURL('image/png').split(',')[1] })) } };
    }
    frame.current?.contentWindow?.postMessage({ channel: bridgeChannel, type: 'state', state: {
      x: p.x, y: p.y, chapterId: p.map.id, active: p.active, locale: p.locale,
      zoom: currentZoom.current, objective: p.objective ?? '',
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      ...(changed ? { map: encoded.current!.data, frames: avatarFrames } : {}),
    } }, location.origin);
    lastMap.current = p.map;
  }
  useEffect(() => {
    ready.current = false; lastMap.current = null;
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.channel !== bridgeChannel) return;
      if (event.data.type === 'ready') {
        const requestedMap = current.current.map;
        void prepareSceneArt(requestedMap).then(() => {
          if (event.source !== frame.current?.contentWindow) return;
          if (requestedMap === current.current.map) prepared.current = requestedMap;
          ready.current = true; encoded.current = null; lastMap.current = null; sync(); setStatus('ready'); current.current.onReady?.(); clearTimeout(timer);
        }).catch(() => { if (event.source === frame.current?.contentWindow) { ready.current = false; setStatus('failed'); clearTimeout(timer); } });
        return;
      }
      if (event.data.type === 'error') { ready.current = false; setStatus('failed'); clearTimeout(timer); return; }
      if (!ready.current) return;
      const p = current.current;
      if (event.data.chapterId !== p.map.id) { sync(); return; }
      const action = readMapAction(event.data, p);
      if (action?.type === 'move') p.onMove(action.x, action.y);
      else if (action?.type === 'interact') p.onInteract(action.id);
      else if (action?.type === 'pause') p.onPause();
      else if (event.data.type === 'shortcut' && ['I', 'J', 'O'].includes(event.data.key) && p.active) frame.current?.dispatchEvent(new KeyboardEvent('keydown', { key: event.data.key.toLowerCase(), bubbles: true }));
      else if (action?.type === 'map') setZoom(value => value === 1 ? 2 : 1);
      else sync();
    };
    window.addEventListener('message', receive);
    const timer = window.setTimeout(() => { if (!ready.current) setStatus(value => value === 'loading' ? 'failed' : value); }, 60000);
    return () => { clearTimeout(timer); window.removeEventListener('message', receive); };
  }, [attempt]);
  useLayoutEffect(() => { if (ready.current) sync(); }, [x, y, locale, map, active, zoom, props.objective]);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => { if (ready.current) sync(); };
    motion.addEventListener('change', changed);
    return () => motion.removeEventListener('change', changed);
  }, []);
  return <div class="godot-world" tabIndex={0} role="group" aria-label={c('title')} data-player={`${x},${y}`} data-map={map.id} data-zoom={zoom} data-engine={status} onKeyUp={event => { heldKeys.current.delete(event.key.toLowerCase()); held.current = [...heldKeys.current.values()].at(-1) ?? null; }} onBlur={releaseKeys} onKeyDown={event => {
    if (!active || status !== 'ready') return;
    if (event.key.toLowerCase() === 'm' && (event.target === event.currentTarget || (event.target as HTMLElement).tagName === 'CANVAS')) { event.preventDefault(); setZoom(value => value === 1 ? 2 : 1); return; }
    if (event.target !== event.currentTarget) return;
    const direction = ({ ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] } as Record<string, number[]>)[event.key.length === 1 ? event.key.toLowerCase() : event.key];
    if (direction) { event.preventDefault(); if (event.repeat) return; heldKeys.current.set(event.key.toLowerCase(), direction); held.current = direction; props.onMove(x + direction[0], y + direction[1]); }
    if (event.key.toLowerCase() === 'e' || event.key === ' ') { event.preventDefault(); const object = mapNearby(map, x, y); if (object) props.onInteract(object.id); }
  }}>
    <div class="godot-viewport" aria-busy={preparing || status === 'loading'}><div key={`${map.id}-${preparing}`} class={`world-transition ${preparing ? 'is-preparing' : ''}`} aria-hidden="true" />
      {status !== 'ready' && <div class="godot-loading"><img src={map.art ?? '/images/job-route/neon-city.webp'} alt="" /><div role="status"><span class="godot-loading-icon" aria-hidden="true">◇</span><p>{c(status === 'loading' ? 'loading' : 'failed')}</p>{status === 'failed' && <button onClick={() => { setStatus('loading'); setAttempt(value => value + 1); }}>{c('retry')}</button>}</div></div>}
      {(status === 'loading' || status === 'ready') && <iframe key={attempt} ref={frame} class={`godot-frame ${status === 'ready' ? 'is-ready' : ''}`} src={`/games/career/index.html?lang=${locale}`} title={c('title')} tabIndex={status === 'ready' && active ? 0 : -1} aria-hidden={status !== 'ready' || !active || undefined} onError={() => setStatus('failed')} />}
      {active && status === 'ready' && mapNearby(map, x, y) && <div class="world-interaction-hint"><kbd>E</kbd><span>{mapNearby(map, x, y)!.locked ? townCopy.requirements[locale] : copy.interact[locale]} · {mapNearby(map, x, y)!.label}</span></div>}
    </div>
    <div class="godot-toolbar"><a class="godot-badge" href="/licenses/godot.txt" target="_blank" rel="noopener" aria-label={c('license')}>GODOT</a><button class="godot-zoom" disabled={status !== 'ready'} aria-pressed={zoom === 2} onClick={() => setZoom(value => value === 1 ? 2 : 1)}>{c(zoom === 1 ? 'zoom' : 'overview')}</button></div>
  </div>;
}
