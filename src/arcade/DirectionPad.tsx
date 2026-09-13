import { useEffect, useRef } from 'preact/hooks';
import { copy } from './campaign';
import type { Locale } from '../i18n/core';

export default function DirectionPad({ locale, active, onStep }: { locale: Locale; active: boolean; onStep: (dx: number, dy: number) => void }) {
  const repeat = useRef<number | undefined>(undefined), step = useRef(onStep); step.current = onStep;
  const stop = () => { clearInterval(repeat.current); repeat.current = undefined; };
  useEffect(() => { stop(); }, [active]);
  useEffect(() => { window.addEventListener('blur', stop); return () => { stop(); window.removeEventListener('blur', stop); }; }, []);
  return <div class="career-dpad" role="group" aria-label={copy.move[locale]}>{([
    ['up', '↑', 0, -1], ['left', '←', -1, 0], ['down', '↓', 0, 1], ['right', '→', 1, 0],
  ] as const).map(([key, glyph, dx, dy]) => <button key={key} class={`direction-${key}`} disabled={!active} aria-label={copy[key][locale]} onPointerDown={event => {
    if (!active) return;
    stop(); event.currentTarget.setPointerCapture(event.pointerId); step.current(dx, dy);
    repeat.current = window.setInterval(() => step.current(dx, dy), 140);
  }} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onClick={event => { if (event.detail === 0 && active) step.current(dx, dy); }}>{glyph}</button>)}</div>;
}
