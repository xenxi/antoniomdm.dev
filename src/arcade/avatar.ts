import type { PixelRect } from './pixel-map';

export type Facing = 'down' | 'left' | 'right' | 'up';
export const avatarSize = { width: 24, height: 32 };
const ink = '#111528', hair = '#392631', brown = '#674335', lightHair = '#94614a';
export function avatarFrame(facing: Facing, frame: number): PixelRect[] {
  const rects: PixelRect[] = [];
  const r = (x: number, y: number, w: number, h: number, c: string) => rects.push([x, y, w, h, c]);
  const stride = [0, -2, 0, 2][frame], bob = frame % 2;
  // Separately animated boots, arms and backpack; feet stay anchored to the tile.
  r(7, 24, 5, 6 + stride, ink); r(13, 24, 5, 6 - stride, ink);
  r(8, 25, 3, 4 + stride, '#3f536a'); r(14, 25, 3, 4 - stride, '#304259');
  r(6, 29 + stride, 6, 2, '#091522'); r(13, 29 - stride, 7, 2, '#091522');
  r(7, 30 + stride, 5, 1, '#a4d6d4'); r(14, 30 - stride, 5, 1, '#80aaa9');
  r(6, 15 + bob, 13, 12, ink); r(7, 16 + bob, 11, 10, '#1d344c');
  r(8, 17 + bob, 4, 8, '#30516b'); r(8, 18 + bob, 1, 6, '#548397');
  r(13, 16 + bob, 2, 10, '#447584'); r(14, 19 + bob, 1, 5, '#77a5a4');
  if (facing === 'left' || facing === 'right') {
    r(4, 15 + bob, 6, 11, ink); r(5, 16 + bob, 4, 8, '#273a56'); r(5, 18 + bob, 1, 5, '#4b6b82');
    r(14, 18 + bob - stride, 4, 8, ink); r(15, 19 + bob - stride, 2, 5, '#365870'); r(15, 24 + bob - stride, 2, 2, '#d5a17f');
    r(7, 2 + bob, 12, 13, ink); r(9, 5 + bob, 10, 9, '#c88e70'); r(12, 5 + bob, 7, 6, '#e7b48a');
    r(19, 8 + bob, 2, 3, '#e7b48a');
    r(7, 2 + bob, 12, 5, hair); r(9, 1 + bob, 8, 2, hair); r(7, 5 + bob, 3, 5, hair);
    r(9, 3 + bob, 4, 2, brown); r(13, 2 + bob, 3, 2, brown); r(15, 4 + bob, 3, 2, lightHair); r(10, 6 + bob, 2, 2, lightHair);
    r(12, 7 + bob, 8, 1, ink); r(14, 7 + bob, 5, 4, ink); r(15, 8 + bob, 3, 2, '#a2bbb0'); r(17, 8 + bob, 1, 2, '#273243');
    r(11, 11 + bob, 8, 4, hair); r(14, 12 + bob, 5, 1, '#94654e'); r(12, 14 + bob, 5, 2, brown);
  } else {
    r(4, 17 + bob + stride, 3, 8, ink); r(5, 18 + bob + stride, 2, 5, '#355a70'); r(5, 23 + bob + stride, 2, 2, '#d5a17f');
    r(19, 17 + bob - stride, 3, 8, ink); r(19, 18 + bob - stride, 2, 5, '#243b54'); r(19, 23 + bob - stride, 2, 2, '#b87e64');
    r(5, 3 + bob, 16, 11, ink); r(7, 1 + bob, 12, 15, ink);
    r(7, 5 + bob, 12, 9, '#e7b48a'); r(6, 8 + bob, 2, 4, '#c38d71'); r(18, 8 + bob, 2, 4, '#c38d71');
    r(6, 3 + bob, 14, 4, hair); r(8, 1 + bob, 9, 3, hair); r(5, 5 + bob, 3, 3, hair);
    r(7, 3 + bob, 4, 2, brown); r(11, 2 + bob, 3, 2, lightHair); r(15, 3 + bob, 4, 2, brown); r(9, 5 + bob, 3, 2, brown); r(17, 5 + bob, 2, 2, lightHair);
    r(7, 8 + bob, 5, 4, ink); r(14, 8 + bob, 5, 4, ink); r(12, 9 + bob, 2, 1, ink);
    r(8, 9 + bob, 3, 2, '#a6c6ba'); r(15, 9 + bob, 3, 2, '#a6c6ba'); r(10, 9 + bob, 1, 2, '#1e2b35'); r(16, 9 + bob, 1, 2, '#1e2b35');
    r(8, 12 + bob, 10, 3, hair); r(10, 15 + bob, 6, 1, hair); r(11, 12 + bob, 4, 1, '#ce9779'); r(11, 14 + bob, 4, 1, brown);
    if (facing === 'up') {
      r(6, 4 + bob, 14, 10, hair); r(7, 5 + bob, 12, 7, brown); r(8, 4 + bob, 4, 2, lightHair); r(14, 7 + bob, 4, 2, lightHair);
      r(7, 15 + bob, 12, 12, ink); r(8, 16 + bob, 10, 9, '#29465f'); r(9, 17 + bob, 8, 2, '#42657a'); r(9, 21 + bob, 8, 4, '#20364f'); r(10, 22 + bob, 6, 1, '#567c8c');
    }
  }
  return facing === 'left' ? rects.map(([x, y, w, h, c]) => [24 - x - w, y, w, h, c]) : rects;
}
export const avatarFrames = Object.fromEntries((['down', 'left', 'right', 'up'] as Facing[]).map(direction => [direction, [0, 1, 2, 3].map(frame => avatarFrame(direction, frame))])) as Record<Facing, PixelRect[][]>;

export interface Motion { x: number; y: number; facing: Facing; travel: number }
export function advanceMotion(m: Motion, target: { x: number; y: number }, delta: number, reduced: boolean): Motion {
  const dx = target.x - m.x, dy = target.y - m.y, distance = Math.hypot(dx, dy);
  if (distance < .001) return { ...m, x: target.x, y: target.y };
  const facing: Facing = Math.abs(dx) > Math.abs(dy) ? dx < 0 ? 'left' : 'right' : dy < 0 ? 'up' : 'down';
  const step = reduced || distance > 3 ? distance : Math.min(distance, Math.min(delta, .05) * 8);
  return { x: m.x + dx / distance * step, y: m.y + dy / distance * step, facing, travel: m.travel + step };
}
