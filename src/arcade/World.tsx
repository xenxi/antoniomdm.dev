import { useEffect, useRef } from 'preact/hooks';
import { copy, type Chapter } from './campaign';
import { objects, nearby, pathTo, type ObjectId } from './engine';
import type { Locale } from '../i18n/core';

const project = (x: number, y: number) => ({ x: 360 + (x - y) * 27, y: 70 + (x + y) * 14 });
export function drawWorld(ctx: CanvasRenderingContext2D, scenario: Chapter['scenario'], px: number, py: number, personal = false) {
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, 720, 440);
  const accent = personal ? '#ffb1c9' : scenario === 'bedroom' ? '#cba5ff' : '#79f5d4';
  const polygon = (points: number[][], color: string, stroke?: string) => {
    ctx.beginPath(); points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.fillStyle = color; ctx.fill(); if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1; ctx.stroke(); }
  };
  const block = (x: number, y: number, w: number, d: number, h: number, top: string, left = '#262638', right = '#191c2a') => {
    const a = project(x, y), b = project(x + w, y), c = project(x + w, y + d), e = project(x, y + d);
    polygon([[e.x, e.y - h], [c.x, c.y - h], [c.x, c.y], [e.x, e.y]], left);
    polygon([[b.x, b.y - h], [c.x, c.y - h], [c.x, c.y], [b.x, b.y]], right);
    polygon([[a.x, a.y - h], [b.x, b.y - h], [c.x, c.y - h], [e.x, e.y - h]], top);
  };
  // Everything is drawn on a low-resolution canvas with crisp, integer-aligned pixels.
  for (let i = 0; i < 50; i++) { ctx.fillStyle = i % 3 ? '#323548' : '#746b8e'; ctx.fillRect((i * 137 + 17) % 720, (i * 53) % 165, 2, 2); }
  if (scenario === 'city' || scenario === 'network') {
    for (let i = 0; i < 9; i++) {
      const x = i * 80 + 6, h = 28 + (i * 37) % 95;
      ctx.fillStyle = '#151725'; ctx.fillRect(x, 155 - h, 50, h + 85);
      for (let row = 0; row < h / 12; row++) for (let col = 0; col < 3; col++) { ctx.fillStyle = (col + row + i) % 4 ? '#343347' : '#72668f'; ctx.fillRect(x + col * 14 + 7, 162 - h + row * 12, 5, 3); }
    }
  }
  block(0, 0, 10, 10, 12, '#232535', '#302b42', '#1a2030');
  for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) {
    const p = project(x, y); polygon([[p.x, p.y], [p.x + 27, p.y + 14], [p.x, p.y + 28], [p.x - 27, p.y + 14]], (x + y) % 2 ? '#292a3d' : '#262738', '#38374b');
  }
  // Walls and neon rails.
  block(0, 0, 10, .18, 44, '#514361'); block(0, 0, .18, 10, 44, '#574465');
  const a = project(.2, .3), b = project(9.8, .3), c = project(.2, 9.8);
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(c.x, c.y - 37); ctx.lineTo(a.x, a.y - 37); ctx.lineTo(b.x, b.y - 37); ctx.stroke();
  if (scenario === 'bedroom') {
    block(1, 1, 1.8, 2.7, 17, '#ae91c6', '#655178', '#403953'); block(1, 1, 1.8, .65, 22, '#e0c8e8');
    block(6, .6, 2.5, .7, 45, '#4b3b59');
  } else {
    for (let y = 1; y < 4; y++) { block(1, y, 1, .8, 49, '#48435d'); const p = project(1.6, y + .82); ctx.fillStyle = accent; for (let n = 0; n < 4; n++) ctx.fillRect(p.x - 7, p.y - 42 + n * 8, 9, 2); }
  }
  const drawPerson = (x: number, y: number, shirt: string, player = false) => {
    const p = project(x + .5, y + .5); ctx.fillStyle = '#10132099'; ctx.fillRect(p.x - 11, p.y - 1, 23, 5);
    if (player) { ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.strokeRect(p.x - 13, p.y - 5, 26, 9); }
    ctx.fillStyle = '#121721'; ctx.fillRect(p.x - 7, p.y - 13, 5, 14); ctx.fillRect(p.x + 3, p.y - 13, 5, 14);
    ctx.fillStyle = shirt; ctx.fillRect(p.x - 8, p.y - 31, 17, 21); ctx.fillRect(p.x - 12, p.y - 28, 5, 14); ctx.fillRect(p.x + 9, p.y - 28, 5, 14);
    ctx.fillStyle = '#e6aa86'; ctx.fillRect(p.x - 7, p.y - 45, 15, 15); ctx.fillRect(p.x - 12, p.y - 15, 5, 5); ctx.fillRect(p.x + 9, p.y - 15, 5, 5);
    ctx.fillStyle = '#332636'; ctx.fillRect(p.x - 8, p.y - 48, 17, 7); ctx.fillRect(p.x - 8, p.y - 41, 3, 7);
    ctx.fillStyle = '#211d31'; ctx.fillRect(p.x - 5, p.y - 38, 5, 3); ctx.fillRect(p.x + 3, p.y - 38, 5, 3); ctx.fillRect(p.x, p.y - 37, 3, 1);
    if (player) { ctx.fillStyle = '#dbccfa'; ctx.fillRect(p.x - 4, p.y - 25, 9, 3); }
  };
  const entities = [
    { depth: 7, draw: () => { block(3.5, 2.8, 2, 1.3, 19, '#6a567a'); const p = project(4.3, 3.3); ctx.fillStyle = '#141a28'; ctx.fillRect(p.x - 18, p.y - 54, 38, 27); ctx.fillStyle = accent; ctx.fillRect(p.x - 15, p.y - 51, 32, 20); ctx.fillStyle = '#244753'; ctx.fillRect(p.x - 11, p.y - 45, 18, 2); ctx.fillRect(p.x - 11, p.y - 39, 11, 2); ctx.fillStyle = '#8b779f'; ctx.fillRect(p.x - 3, p.y - 27, 7, 7); } },
    { depth: 8, draw: () => { block(2, 6, 1, 1, 18, '#92718c'); const p = project(2.5, 6.5); ctx.fillStyle = '#eee0e0'; ctx.fillRect(p.x - 3, p.y - 29, 8, 9); ctx.fillStyle = '#65425d'; ctx.fillRect(p.x - 2, p.y - 30, 6, 2); } },
    { depth: 10, draw: () => { block(8, 2, .75, .7, 13, '#171925'); const p = project(8.4, 2.4); ctx.fillStyle = '#eb687b'; ctx.fillRect(p.x, p.y - 18, 3, 3); } },
    { depth: 12, draw: () => drawPerson(7, 5, '#55bdaa') },
    { depth: px + py, draw: () => drawPerson(px, py, '#a77ce4', true) },
    ...(scenario !== 'bedroom' ? [{ depth: 16, draw: () => { for (let x = 7; x < 9; x++) { block(x, 7, .85, 2.4, scenario === 'city' ? 90 : 45, '#625879'); const p = project(x + .7, 9.4); ctx.fillStyle = accent; for (let n = 0; n < 5; n++) ctx.fillRect(p.x - 10, p.y - 39 + n * 6, 12, 2); } } }] : []),
  ];
  entities.sort((a, b) => a.depth - b.depth).forEach(entity => entity.draw());
  // A small in-world mission beacon; all semantic labels live in accessible HTML.
  const terminal = project(4.5, 3.5); ctx.fillStyle = '#ffe3a1'; ctx.fillRect(terminal.x - 2, terminal.y - 77, 4, 10); ctx.fillRect(terminal.x - 2, terminal.y - 64, 4, 3);
}

export default function World({ scenario, x, y, locale, personal, decorative, active = true, onMove, onInteract }: { scenario: Chapter['scenario']; x: number; y: number; locale: Locale; personal?: boolean; decorative?: boolean; active?: boolean; onMove?: (x: number, y: number) => void; onInteract?: (id: ObjectId) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const path = useRef<{ x: number; y: number }[]>([]);
  const goal = useRef<ObjectId | undefined>(undefined);
  const callback = useRef({ onMove, onInteract }); callback.current = { onMove, onInteract };
  useEffect(() => { const context = ref.current?.getContext('2d'); if (context) drawWorld(context, scenario, x, y, personal); }, [scenario, x, y, personal]);
  useEffect(() => {
    if (decorative || !active) { path.current = []; goal.current = undefined; return; }
    const timer = window.setInterval(() => {
      const next = path.current.shift();
      if (next) callback.current.onMove?.(next.x, next.y);
      if (!path.current.length && goal.current) { callback.current.onInteract?.(goal.current); goal.current = undefined; }
    }, 100);
    return () => window.clearInterval(timer);
  }, [active, decorative]);
  useEffect(() => { path.current = []; goal.current = undefined; }, [scenario]);
  return <canvas ref={ref} width="720" height="440" class="career-canvas" tabIndex={decorative ? undefined : 0} aria-hidden={decorative || undefined} role={decorative ? undefined : 'img'} aria-label={copy.map[locale]} data-player={`${x},${y}`} onKeyDown={event => {
    const direction = ({ ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0] } as Record<string, number[]>)[event.key] ?? ({ W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0] } as Record<string, number[]>)[event.key];
    if (direction) { event.preventDefault(); path.current = []; goal.current = undefined; onMove?.(x + direction[0], y + direction[1]); }
    if (event.key.toLowerCase() === 'e') { event.preventDefault(); const id = nearby(x, y); if (id) onInteract?.(id); }
  }} onClick={event => {
    if (decorative) return;
    ref.current?.focus(); const rect = event.currentTarget.getBoundingClientRect();
    const screenX = (event.clientX - rect.left) * 720 / rect.width, screenY = (event.clientY - rect.top) * 440 / rect.height;
    const sx = screenX - 360, sy = screenY - 70;
    let tx = Math.floor((sx / 27 + sy / 14) / 2), ty = Math.floor((sy / 14 - sx / 27) / 2);
    const object = [...objects].sort((a, b) => b.x + b.y - a.x - a.y).find(object => {
      const anchor = project(object.x + .5, object.y + .5);
      const height = object.id === 'terminal' ? 62 : object.id === 'team' ? 50 : 32;
      return Math.abs(screenX - anchor.x) < (object.id === 'terminal' ? 32 : 19) && screenY >= anchor.y - height && screenY <= anchor.y + 8;
    }) ?? objects.find(object => object.x === tx && object.y === ty);
    if (object) { tx = object.x; ty = object.y; }
    const targets = object ? [[tx - 1, ty], [tx + 1, ty], [tx, ty - 1], [tx, ty + 1]] : [[tx, ty]];
    if (object && nearby(x, y) === object.id) { onInteract?.(object.id); return; }
    const routes = targets.map(([x1, y1]) => pathTo({ x, y }, { x: x1, y: y1 }, scenario)).filter(route => route.length).sort((a, b) => a.length - b.length);
    path.current = routes[0] ?? []; goal.current = path.current.length ? object?.id : undefined;
  }} />;
}
