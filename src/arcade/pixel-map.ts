import { studioWalkable, studioObjects, studioProject } from './studio-layout';
import { buildings, townCopy, townSize, townWalkable } from './town';
import type { Locale } from '../i18n/core';
import { copy } from './campaign';
import { townProjection, townProject, buildingOutline } from './town-scene';
import { sceneEffects } from './scene-effects';
import { companyArt } from './company-art';


export type PixelRect = [number, number, number, number, string];
export interface MapObject { id: string; x: number; y: number; label: string; locked?: boolean; complete?: boolean; marker?: number[]; entrance?: { anchor: number[]; width: number; height: number; color: string }; hit?: [number, number, number, number]; hitPolygon?: number[][] }
export interface PixelMap { effects?: ReturnType<typeof sceneEffects>; art?: string; sprite?: string; spriteScale?: number; signs?: CompanySign[]; company?: string; locale?: Locale; axes?: number[]; projection?: 'isometric'; entities?: { depth: number; rects: PixelRect[] }[]; id: string; width: number; height: number; tile: number; ox: number; oy: number; rects: PixelRect[]; labels: { x: number; y: number; text: string; color: string }[]; blocked: { x: number; y: number }[]; objects: MapObject[] }
export interface CompanySign { id: string; name: string; unlocked: boolean; complete: boolean }
export const playerSprite = [
  '.....hh.hh......', '....hHHhHHh.....', '...hHHLHHHHh....', '...hHHHHHHHh....',
  '...hsssssssh....', '...sKKKsKKKs....', '...sKsKKKsKs....', '....shsmhs......',
  '....shhhhs......', '.....hhhh.......', '....jjjjjj......', '...jJJzzJJj.....',
  '...sJJzzJJs.....', '...sJJJJJJs.....', '....jjjjjj......', '....pp.ppp......',
  '....pp.ppp......', '...bbb.bbb......',
];
export const spriteColors: Record<string, string> = { h: '#503325', H: '#775039', L: '#966844', s: '#efba87', K: '#263845', m: '#bd765a', j: '#315565', J: '#4d91a1', z: '#f6e5ae', p: '#414963', b: '#283844' };

export function makePixelMap(scenario: string, signs: CompanySign[], locale: Locale, company = ''): PixelMap {
  const town = scenario === 'town';
  const map: PixelMap = { id: scenario, width: town ? townSize.width : 11, height: town ? townSize.height : 11, tile: town ? 16 : 24, ox: town ? 0 : 108, oy: town ? 0 : 28, rects: [], labels: [], blocked: [], objects: [] };
  map.sprite = '/images/job-route/antonio-atlas.webp'; map.locale = locale;
  map.effects = sceneEffects(town);
  const label = (x: number, y: number, text: string, color = '#91e9df') => map.labels.push({ x, y, text, color });
  if (town) {
    map.art = '/images/job-route/company-district.webp'; map.spriteScale = .58; map.signs = signs;
    map.projection = 'isometric'; Object.assign(map, townProjection);
    map.rects = [[0, 0, 480, 320, '#101a31']];
    map.objects = buildings.map(b => {
      const polygon = buildingOutline(b), xs = polygon.map(p => p[0]), ys = polygon.map(p => p[1]);
      const sign = signs.find(s => s.id === b.id);
      const art = companyArt[b.id];
      return { id: b.id, ...b.door, label: sign?.name ?? b.id, locked: !sign?.unlocked, complete: Boolean(sign?.complete), entrance: { anchor: art.door, width: art.width, height: art.height, color: art.color }, marker: [art.door[0], art.door[1] - art.height - 8], hitPolygon: polygon, hit: [Math.min(...xs), Math.min(...ys), Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)] };
    });
    const park = townProject(7, 11), garden = townProject(23, 12);
    label(park[0], park[1], townCopy.park[locale]); label(garden[0], garden[1], townCopy.garden[locale]);
  } else {
    map.art = '/images/job-route/neon-office.webp';
    map.sprite = '/images/job-route/antonio-atlas.webp';
    map.company = company || 'JOB ROUTE'; map.locale = locale;
    map.projection = 'isometric'; map.ox = 288; map.oy = 84; map.tile = 16;
    map.rects = [[0, 0, 480, 320, '#10182a']];
    const labels = { terminal: copy.workstation[locale], team: copy.npc[locale], coffee: copy.coffee[locale], secret: copy.secret[locale], portal: townCopy.outside[locale] };
    map.objects = studioObjects.map(o => ({ ...o, hit: [...o.hit], marker: [o.hit[0] + o.hit[2] / 2, o.hit[1] - 4], label: labels[o.id] }));
    for (const o of map.objects) { const p = studioProject(o.x + .5, o.y + .5); label(p.x, p.y - 6, o.label); }
  }
  for (let y = 0; y < map.height; y++) for (let x = 0; x < map.width; x++) if (!(town ? townWalkable(x, y) : studioWalkable(x, y))) map.blocked.push({ x, y });
  return map;
}

export const mapWalkable = (map: PixelMap, x: number, y: number) => Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0 && x < map.width && y < map.height && !map.blocked.some(t => t.x === x && t.y === y);
export const mapNearby = (map: PixelMap, x: number, y: number) => map.objects.find(o => Math.abs(x - o.x) + Math.abs(y - o.y) <= 1);
export function mapProject(map: PixelMap, x: number, y: number) {
  if (map.axes) { const [ax, ay, bx, by] = map.axes; return { x: map.ox + ax * x + bx * y, y: map.oy + ay * x + by * y }; }
  return map.projection === 'isometric' ? { x: map.ox + (x - y) * map.tile, y: map.oy + (x + y) * map.tile / 2 } : { x: map.ox + x * map.tile, y: map.oy + y * map.tile };
}
export function mapTile(map: PixelMap, x: number, y: number) {
  if (map.axes) { const [ax, ay, bx, by] = map.axes, dx = x - map.ox, dy = y - map.oy, d = ax * by - ay * bx; return { x: Math.floor((dx * by - dy * bx) / d), y: Math.floor((dy * ax - dx * ay) / d) }; }
  const sx = (x - map.ox) / map.tile, sy = (y - map.oy) / map.tile;
  return map.projection === 'isometric' ? { x: Math.floor((sx + sy * 2) / 2), y: Math.floor((sy * 2 - sx) / 2) } : { x: Math.floor(sx), y: Math.floor(sy) };
}
export function mapCamera(map: PixelMap, x: number, y: number, zoom: number) {
  const p = mapProject(map, x + .5, y + .5);
  return { x: Math.round(Math.max(0, Math.min(480 - 480 / zoom, p.x - 240 / zoom))), y: Math.round(Math.max(0, Math.min(320 - 320 / zoom, p.y - 160 / zoom))) };
}
export function mapPath(map: PixelMap, from: { x: number; y: number }, to: { x: number; y: number }) {
  const queue = [[from]], seen = new Set([`${from.x},${from.y}`]);
  while (queue.length) {
    const path = queue.shift()!, p = path.at(-1)!;
    if (p.x === to.x && p.y === to.y) return path.slice(1);
    for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
      const q = { x: p.x + dx, y: p.y + dy }, key = `${q.x},${q.y}`;
      if (!seen.has(key) && mapWalkable(map, q.x, q.y)) { seen.add(key); queue.push([...path, q]); }
    }
  }
  return [];
}
