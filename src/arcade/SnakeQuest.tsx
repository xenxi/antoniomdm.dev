import type { Locale } from '../i18n/core';
import { newSnake, packets, stepSnake, type SnakeState } from './snake';
import { questCopy } from './quest-content';

export default function SnakeQuest({ value, locale, onChange, disabled }: { value?: SnakeState; locale: Locale; onChange: (state: SnakeState) => void; disabled: boolean }) {
  const state = value ?? newSnake(), food = packets[state.score];
  const step = (dx: number, dy: number) => { if (!disabled) onChange(stepSnake(state, dx, dy)); };
  return <div class="snake-quest">
    <p>{questCopy.snake[locale]}</p>
    <div tabIndex={0} role="group" aria-label={questCopy.snakeBoard[locale]} onKeyDown={e => {
      const dir = ({ ArrowUp: [0, -1], ArrowRight: [1, 0], ArrowDown: [0, 1], ArrowLeft: [-1, 0] } as Record<string, number[]>)[e.key];
      if (dir) { e.preventDefault(); e.stopPropagation(); if (!e.repeat) step(dir[0], dir[1]); }
      if (e.key.toLowerCase() === 'r' && !disabled) onChange(newSnake());
    }}>
      <svg viewBox="0 0 160 160" role="img" aria-label={`${questCopy.snakeBoard[locale]} · ${state.score}/4`}><rect width="160" height="160" fill="#bdcb9c" />{Array.from({ length: 64 }, (_, i) => <rect key={i} x={i % 8 * 20} y={Math.floor(i / 8) * 20} width="20" height="20" fill="none" stroke="#a3b080" stroke-width=".5" />)}{state.body.map((p, i) => <rect key={i} x={p.x * 20 + 2} y={p.y * 20 + 2} width="16" height="16" rx={i ? 2 : 4} fill={i ? '#465b36' : '#233b28'} />)}{food && <circle cx={food.x * 20 + 10} cy={food.y * 20 + 10} r="5" fill="#344924" />}</svg>
    </div>
    <div class="snake-controls">{[[0, -1, '↑', 'Arriba', 'Up'], [-1, 0, '←', 'Izquierda', 'Left'], [0, 1, '↓', 'Abajo', 'Down'], [1, 0, '→', 'Derecha', 'Right']].map(([dx, dy, arrow, es, en]) => <button key={String(arrow)} disabled={disabled || state.failed || state.score === 4} aria-label={String(locale === 'es' ? es : en)} onClick={() => step(Number(dx), Number(dy))}>{arrow}</button>)}</div>
    <p role="status">{state.failed ? questCopy.snakeFail[locale] : state.score === 4 ? questCopy.snakeDone[locale] : `${state.score} / 4`}</p>
    <button disabled={disabled} onClick={() => onChange(newSnake())}>{questCopy.snakeRestart[locale]}</button>
  </div>;
}
