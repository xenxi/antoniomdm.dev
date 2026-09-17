import { useEffect, useRef, useState } from 'preact/hooks';
import { copy } from './campaign';
import type { Locale } from '../i18n/core';

export default function DirectionPad({ locale, active, onStep }: { locale: Locale; active: boolean; onStep: (dx: number, dy: number) => void }) {
  const repeat = useRef<number | undefined>(undefined), step = useRef(onStep); step.current = onStep;
  const pointers = useRef(new Map<number, { key: string; dx: number; dy: number }>());
  const [pressed, setPressed] = useState('');
  const repeatLatest = () => {
    clearInterval(repeat.current); repeat.current = undefined;
    const latest = [...pointers.current.values()].at(-1);
    setPressed(latest?.key ?? '');
    if (latest) repeat.current = window.setInterval(() => step.current(latest.dx, latest.dy), 140);
  };
  const stop = () => { pointers.current.clear(); repeatLatest(); };
  const release = (pointerId: number) => { if (pointers.current.delete(pointerId)) repeatLatest(); };
  useEffect(() => { stop(); }, [active]);
  useEffect(() => { window.addEventListener('blur', stop); return () => { stop(); window.removeEventListener('blur', stop); }; }, []);
  return <div class="career-dpad" role="group" aria-label={copy.move[locale]}>{([
    ['up', '↑', 0, -1], ['left', '←', -1, 0], ['down', '↓', 0, 1], ['right', '→', 1, 0],
  ] as const).map(([key, glyph, dx, dy]) => <button key={key} class={`direction-${key} ${pressed === key ? 'is-held' : ''}`} disabled={!active} aria-label={copy[key][locale]} onPointerDown={event => {
    if (!active) return;
    pointers.current.delete(event.pointerId); pointers.current.set(event.pointerId, { key, dx, dy });
    setPressed(key); event.currentTarget.setPointerCapture(event.pointerId); step.current(dx, dy); repeatLatest();
  }} onPointerUp={event => release(event.pointerId)} onPointerCancel={event => release(event.pointerId)} onLostPointerCapture={event => release(event.pointerId)} onClick={event => { if (event.detail === 0 && active) step.current(dx, dy); }}>{glyph}</button>)}</div>;
}
