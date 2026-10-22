import { useEffect, useState } from 'preact/hooks';
import type { RefObject } from 'preact';
import type { Locale } from '../i18n/core';
import { nativeChannel } from './native-bridge';
import './character-activities.css';

const actions = {
  door: ['Abrir puerta', 'Open door'], work: ['Trabajar', 'Work'], talk: ['Hablar', 'Talk'],
  guitar: ['Tocar la guitarra', 'Play guitar'], study: ['Estudiar', 'Study'],
  idle: ['Gesto de reposo', 'Idle gesture'], coffee: ['Beber café', 'Drink coffee'],
};
interface Coffee { phase: string; cups: number; hits: number; misses: number; remaining: number; cursor: number; untimed: boolean }
interface Props { frame: RefObject<HTMLIFrameElement>; locale: Locale; active: boolean }

export default function CharacterActivities({ frame, locale, active }: Props) {
  const [coffee, setCoffee] = useState<Coffee>({ phase: 'idle', cups: 0, hits: 0, misses: 0, remaining: 12, cursor: 0, untimed: false });
  const [untimed, setUntimed] = useState(false);
  const [action, setAction] = useState('');
  const text = (es: string, en: string) => locale === 'es' ? es : en;
  const send = (type: string, values = {}) => frame.current?.contentWindow?.postMessage({ channel: nativeChannel, type: 'command', command: { type, ...values } }, location.origin);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== location.origin || event.source !== frame.current?.contentWindow || event.data?.channel !== nativeChannel || event.data.type !== 'characterState') return;
      const value = event.data.value, state = value?.coffee;
      if (!state || !['idle', 'ready', 'playing', 'won', 'lost'].includes(state.phase) || !['cups', 'hits', 'misses', 'remaining', 'cursor'].every(key => Number.isFinite(state[key])) || typeof state.untimed !== 'boolean') return;
      setCoffee(state);
      if (typeof value.action === 'string') setAction(value.action);
    };
    window.addEventListener('message', receive);
    if (active) send('characterStatus');
    return () => window.removeEventListener('message', receive);
  }, [active]);
  const playing = coffee.phase === 'playing';
  return <details class="character-activities">
    <summary>{text('Acciones del personaje y café', 'Character actions and coffee')}</summary>
    <div class="character-action-buttons" aria-label={text('Animaciones del personaje', 'Character animations')}>
      {Object.entries(actions).map(([id, labels]) => <button key={id} disabled={!active || playing || (id === 'coffee' && action === 'coffee')} aria-pressed={action === id} onClick={() => send('characterAction', { id })}>{labels[locale === 'es' ? 0 : 1]}</button>)}
    </div>
    <section class="coffee-challenge" aria-label={text('Instante de café', 'Coffee moment')} data-phase={coffee.phase}>
      <h2>{text('Instante de café', 'Coffee moment')} <small>☕ {coffee.cups} / 3</small></h2>
      <p>{text('Tres cafés virtuales desbloquean un instante de concentración. Pulsa cuando el indicador esté en el centro para atrapar cinco momentos.', 'Three virtual coffees unlock a moment of focus. Press when the indicator is in the centre to capture five moments.')}</p>
      {!playing && <label><input type="checkbox" checked={untimed} onChange={event => setUntimed(event.currentTarget.checked)} /> {text('Sin límite de tiempo ni precisión', 'No time limit or precision requirement')}</label>}
      {!playing && <button disabled={!active || coffee.cups < 3} onClick={() => send('coffeeStart', { untimed })}>{text('Iniciar reto', 'Start challenge')}</button>}
      {playing && <>
        <p>{coffee.untimed ? text('Modo tranquilo: pulsa cinco veces, a tu ritmo.', 'Relaxed mode: press five times at your own pace.') : text('El mundo se ralentiza. Busca el centro.', 'The world slows down. Aim for the centre.')}</p>
        <div class="coffee-track" aria-hidden="true"><span class="coffee-target" /><span class="coffee-cursor" style={{ left: `${Math.max(0, Math.min(1, coffee.cursor)) * 100}%` }} /></div>
        <p>{text('Aciertos', 'Hits')}: {coffee.hits} / 5 · {text('Fallos', 'Misses')}: {coffee.misses}{!coffee.untimed && <> · {Math.ceil(coffee.remaining)} s</>}</p>
        <button disabled={!active} onClick={() => send('coffeeHit')}>{text('Atrapar momento', 'Capture moment')}</button>
        <button disabled={!active} onClick={() => send('coffeeCancel')}>{text('Salir del reto', 'Leave challenge')}</button>
      </>}
      <p role="status">{coffee.phase === 'won' ? text('¡Cinco momentos! El mundo vuelve a su ritmo.', 'Five moments! The world returns to its pace.') : coffee.phase === 'lost' ? text('Se acabó el instante. Puedes volver a intentarlo.', 'The moment is over. You can try again.') : coffee.phase === 'ready' ? text('Reto disponible.', 'Challenge ready.') : ''}</p>
    </section>
  </details>;
}
