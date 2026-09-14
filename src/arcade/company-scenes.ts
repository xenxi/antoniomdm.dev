import type { Locale } from '../i18n/core';
import type { LocalizedText } from '../data/professional/types';
import type { PixelMap } from './pixel-map';
import { roomDetail, furnitureDetail } from './interior-detail';
import { npcAsset, furnitureAsset } from './npc-art';
import { sceneImage } from './scene-art';

const localized = (es: string, en: string): LocalizedText => ({ es, en });
type Kind = 'bookcase' | 'lamp' | 'partition-h' | 'partition' | 'desk' | 'sofa' | 'bed' | 'plant' | 'rack' | 'coffee' | 'washer' | 'sink' | 'router' | 'phone-green' | 'phone-blue' | 'person' | 'doctor' | 'musician' | 'dancer' | 'child' | 'cat' | 'skeleton' | 'ball' | 'table' | 'board';
export interface Furnishing { x: number; y: number; kind: Kind; id?: string; label?: LocalizedText; color?: string }
interface Zone { x: number; y: number; w: number; h: number; label: LocalizedText; color: string }
export interface CompanyScene { title: LocalizedText; description: LocalizedText; width: number; height: number; accent: string; floor: string; wall: string; zones: Zone[]; furniture: Furnishing[] }
const f = (kind: Kind, x: number, y: number, id?: string, label?: LocalizedText): Furnishing => ({ kind, x, y, id, label });
const desks = (xs: number[], ys: number[]) => ys.flatMap(y => xs.map(x => f('desk', x, y)));
const zone = (x: number, y: number, w: number, h: number, es: string, en: string, color: string): Zone => ({ x, y, w, h, label: localized(es, en), color });
const work = localized('Puesto de trabajo', 'Workstation'), review = localized('Panel de revisión', 'Review board'), team = localized('Equipo', 'Team'), coffee = localized('Cocina / café', 'Kitchen / coffee');

export const companyScenes: Record<string, CompanyScene> = {
  freelance: { title: localized('Piso compartido · alquiler y deadlines', 'Shared rental · rent and deadlines'), description: localized('Cuatro compañeros, una entrega y muy pocas superficies secas. Cocina, salón, dormitorios y rincón de trabajo.', 'Four flatmates, one delivery and very few dry surfaces. Kitchen, living room, bedrooms and a work corner.'), width: 12, height: 12, accent: '#edb97d', floor: '#9b785e', wall: '#586878', zones: [zone(0, 0, 5, 4, 'COCINA', 'KITCHEN', '#b9bcb0'), zone(6, 0, 6, 4, 'DORMITORIOS', 'BEDROOMS', '#927d91'), zone(0, 5, 6, 7, 'ESTUDIO', 'WORK CORNER', '#947863'), zone(6, 5, 6, 7, 'SALÓN', 'LIVING ROOM', '#b59475')], furniture: [f('desk', 3, 8, 'terminal', work), f('board', 1, 6, 'review', review), f('musician', 8, 7, 'team', localized('El opositor · ensayo en pausa', 'The exam candidate · rehearsal break')), f('sink', 1, 1, 'sink', localized('Fuga de agua', 'Water leak')), f('washer', 4, 1, 'washer', localized('Lavadora de espuma', 'Foam washer')), f('router', 5, 5, 'router', localized('Router y gato', 'Router and cat')), f('coffee', 1, 3, 'coffee', coffee), f('doctor', 4, 3), f('dancer', 8, 10), f('person', 3, 1), f('sofa', 9, 7), f('table', 9, 9), f('bed', 7, 1), f('bed', 10, 1), f('bed', 7, 3), f('bed', 10, 3), f('plant', 1, 10)] },
  xul: { title: localized('Estudio creativo · la cueva del fondo', 'Creative studio · the cave at the back'), description: localized('Recepción luminosa, cocina con comida y desarrolladores al fondo. Un esqueleto de utilería y pelotas hacen de compañeros de mesa.', 'Bright reception, a kitchen with food and developers at the back. A prop skeleton and exercise balls join the desks.'), width: 12, height: 11, accent: '#a7cf93', floor: '#b39f80', wall: '#607a70', zones: [zone(0, 0, 7, 4, 'LA CUEVA', 'THE CAVE', '#344656'), zone(8, 0, 4, 5, 'COCINA', 'KITCHEN', '#ad9876'), zone(0, 5, 12, 6, 'ESTUDIO CREATIVO', 'CREATIVE STUDIO', '#b1a087')], furniture: [f('desk', 2, 2, 'terminal', work), f('person', 5, 2, 'team', team), f('board', 1, 5, 'review', review), f('coffee', 10, 1, 'coffee', coffee), f('table', 9, 3), f('skeleton', 3, 2), f('ball', 3, 3), f('ball', 5, 3), f('sofa', 8, 7), f('plant', 1, 1), f('plant', 10, 8), f('desk', 6, 2)] },
  signlab: { title: localized('Laboratorio móvil · museo en miniatura', 'Mobile lab · a miniature museum'), description: localized('Un estudio pequeño con mesa de dispositivos, imágenes interactivas y una zona de pruebas para visitantes.', 'A small studio with a device bench, interactive images and a visitor testing area.'), width: 11, height: 12, accent: '#db91c4', floor: '#8a8196', wall: '#685275', zones: [zone(0, 0, 6, 5, 'LABORATORIO', 'LAB', '#4e5877'), zone(7, 0, 4, 8, 'GALERÍA TÁCTIL', 'TOUCH GALLERY', '#a291a4')], furniture: [f('desk', 3, 2, 'terminal', work), f('board', 8, 2, 'exhibit', localized('Imagen interactiva', 'Interactive image')), f('board', 8, 5, 'review', review), f('person', 5, 5, 'team', team), f('coffee', 1, 9, 'coffee', coffee), f('desk', 1, 2), f('table', 3, 5), f('sofa', 8, 9), f('plant', 1, 1), f('plant', 9, 1)] },
  'la-salle': { title: localized('El colegio · del aula al servidor', 'The school · from classroom to server'), description: localized('Cruza las aulas y el pasillo hasta la sala técnica. Diagnostica, configura y deja documentada la intervención.', 'Cross the classrooms and corridor to the technical room. Diagnose, configure and document the intervention.'), width: 14, height: 12, accent: '#87c9e0', floor: '#a2a899', wall: '#657f91', zones: [zone(0, 0, 7, 5, 'AULA', 'CLASSROOM', '#a0acac'), zone(8, 0, 6, 5, 'SERVIDORES', 'SERVERS', '#40566c'), zone(0, 8, 14, 4, 'PASILLO', 'CORRIDOR', '#b5ac95')], furniture: [f('desk', 2, 2, 'terminal', work), ...desks([4, 6], [2, 4]), f('desk', 2, 4), f('rack', 11, 2, 'server', localized('Windows Server', 'Windows Server')), f('rack', 9, 2), f('rack', 12, 2), f('board', 11, 5, 'review', review), f('person', 7, 7, 'team', team), f('coffee', 2, 9, 'coffee', coffee), f('board', 1, 1), f('plant', 12, 9)] },
  'alcatel-lucent': { title: localized('Campus telecom · destino B-12', 'Telecom campus · destination B-12'), description: localized('Un mar de mesas, un comedor enorme y un One Touch Easy verde monumental con luces de feria.', 'A sea of desks, a huge cafeteria and a monumental green One Touch Easy with fairground lights.'), width: 20, height: 16, accent: '#b8ed77', floor: '#8c98aa', wall: '#536779', zones: [zone(0, 0, 14, 10, 'INGENIERÍA', 'ENGINEERING', '#8a98aa'), zone(15, 0, 5, 16, 'COMEDOR', 'CAFETERIA', '#a5a28e'), zone(0, 11, 14, 5, 'ONE TOUCH PLAZA', 'ONE TOUCH PLAZA', '#5f7187')], furniture: [f('desk', 2, 2, 'terminal', work), ...desks([5, 8, 11], [2, 5, 8]), f('desk', 2, 5), f('desk', 2, 8), f('desk', 13, 8, 'urgent-desk', localized('Puesto B-12 · urgente', 'Desk B-12 · urgent')), f('phone-green', 8, 13, 'statue', localized('One Touch Easy · luces de feria', 'One Touch Easy · fairground lights')), f('board', 12, 1, 'review', review), f('person', 6, 10, 'team', team), f('coffee', 18, 2, 'coffee', coffee), ...[5, 8, 11, 14].map(y => f('table', 17, y)), f('plant', 1, 13), f('plant', 18, 14)] },
  nokia: { title: localized('Campus de redes · el 3310 permanece', 'Network campus · the 3310 endures'), description: localized('Gran oficina de ingeniería, laboratorio de conectividad y café gratis e infinito junto a la estatua del 3310.', 'A large engineering office, connectivity lab and free unlimited coffee beside the 3310 statue.'), width: 19, height: 17, accent: '#87baff', floor: '#8799b4', wall: '#425980', zones: [zone(0, 0, 13, 11, 'REDES Y GEOMETRÍA', 'NETWORKS & GEOMETRY', '#8092ac'), zone(14, 0, 5, 7, 'LAB', 'LAB', '#3d5672'), zone(0, 12, 19, 5, 'CAFÉ ∞', 'COFFEE ∞', '#a89c89')], furniture: [f('desk', 2, 2, 'terminal', work), ...desks([5, 8, 11], [2, 5, 8]), f('desk', 2, 5), f('desk', 2, 8), f('rack', 16, 2, 'server', localized('Banco de conectividad', 'Connectivity bench')), f('board', 15, 6, 'review', review), f('phone-blue', 12, 13, 'statue', localized('Nokia 3310 · Snake', 'Nokia 3310 · Snake')), f('coffee', 16, 13, 'coffee', coffee), f('person', 7, 11, 'team', team), f('table', 3, 14), f('table', 7, 14), f('plant', 17, 2), f('plant', 1, 11)] },
  'vector-itc': { title: localized('Centro de automatización', 'Automation center'), description: localized('Mesas de análisis, paneles de informes y un laboratorio de lenguaje y flujos automáticos.', 'Analysis desks, reporting boards and a language and workflow lab.'), width: 14, height: 13, accent: '#adabfb', floor: '#8a8ca6', wall: '#555f87', zones: [zone(0, 0, 8, 6, 'AUTOMATIZACIÓN', 'AUTOMATION', '#68788f'), zone(9, 0, 5, 9, 'DATOS', 'DATA', '#9694ac')], furniture: [f('desk', 2, 2, 'terminal', work), ...desks([5, 7], [2, 4]), f('board', 11, 3, 'review', review), f('person', 8, 7, 'team', team), f('coffee', 2, 10, 'coffee', coffee), f('rack', 11, 6), f('sofa', 10, 10), f('plant', 1, 1)] },
  anexia: { title: localized('Oficina naranja · diez puestos', 'Orange office · ten desks'), description: localized('Un equipo compacto con diez puestos: requisitos, backend, frontend, móvil, datos y entrega de producto.', 'A compact team with ten desks: requirements, backend, frontend, mobile, data and product delivery.'), width: 13, height: 12, accent: '#ffb06a', floor: '#ad927a', wall: '#a76d47', zones: [zone(0, 0, 13, 6, 'PRODUCTO', 'PRODUCT', '#a67e5f'), zone(7, 7, 6, 5, 'PRUEBAS Y ENTREGA', 'TEST & DELIVERY', '#767b89')], furniture: [f('desk', 1, 2, 'terminal', work), ...desks([3, 5, 7, 9], [2, 4]), f('desk', 1, 4), f('person', 5, 7, 'team', team), f('board', 10, 8, 'review', review), f('table', 8, 8, 'device', localized('Banco móvil · Flutter', 'Mobile bench · Flutter')), f('coffee', 1, 9, 'coffee', coffee), f('plant', 11, 2), f('plant', 11, 10)] },
  'domingo-alonso': { title: localized('Casa · arquitectura en remoto', 'Home · remote architecture'), description: localized('Un piso vivido: escritorio, videollamadas, dibujos y Marga y la peque cerca. Concentración con espacio para la familia.', 'A lived-in flat: desk, video calls, drawings, and Marga and your little one nearby. Focus with room for family.'), width: 13, height: 11, accent: '#efd294', floor: '#a6886a', wall: '#758682', zones: [zone(0, 0, 6, 6, 'DESPACHO', 'HOME OFFICE', '#677c80'), zone(7, 0, 6, 5, 'COCINA', 'KITCHEN', '#b7af95'), zone(6, 6, 7, 5, 'EN FAMILIA', 'FAMILY SPACE', '#b2987e')], furniture: [f('desk', 2, 2, 'terminal', work), f('board', 4, 2, 'review', review), f('desk', 2, 5, 'team', localized('Videollamada del equipo', 'Team video call')), f('coffee', 10, 2, 'coffee', coffee), f('person', 9, 5), f('child', 8, 8, 'family', localized('La peque y su dibujo', 'Your little one and her drawing')), f('sofa', 10, 8), f('table', 8, 2), f('bed', 11, 5), f('plant', 1, 9)] },
  'system-recovery': { title: localized('Sala de crisis · simulación final', 'Incident room · final simulation'), description: localized('Siete fases para recuperar el sistema: observa, diagnostica, prioriza y verifica con el equipo.', 'Seven phases to recover the system: observe, diagnose, prioritize and verify with the team.'), width: 14, height: 14, accent: '#ed93a8', floor: '#54617b', wall: '#384462', zones: [zone(0, 0, 14, 6, 'OBSERVABILIDAD', 'OBSERVABILITY', '#394e69'), zone(7, 7, 7, 7, 'COORDINACIÓN', 'COORDINATION', '#646479')], furniture: [f('desk', 3, 3, 'terminal', work), f('board', 7, 2, 'review', review), f('person', 10, 9, 'team', team), f('coffee', 1, 11, 'coffee', coffee), ...[2, 5, 8, 11].map(x => f('rack', x, 1)), f('table', 8, 10), f('plant', 12, 12)] },
};

// Interior partitions leave explicit doorways; all free tiles are reachability-tested.
companyScenes.freelance.furniture.push(
  ...[6, 9].flatMap(x => [0, 1, 2, 3].map(y => f('partition', x, y))),
  ...[7, 10].map(x => f('partition-h', x, 2)),
  ...[0, 1, 2, 3].map(x => f('partition-h', x, 4)),
  ...[6, 7, 8].map(y => f('partition', 6, y)),
);
companyScenes['domingo-alonso'].furniture.push(...[0, 1, 2, 4].map(y => f('partition', 6, y)), ...[0, 1, 4].map(x => f('partition-h', x, 6)));
companyScenes['la-salle'].furniture.push(...[0, 1, 2, 4].map(y => f('partition', 8, y)));

export function makeCompanyMap(id: string, locale: Locale, company: string, resolved: string[] = [], mission = 0): PixelMap {
  const scene = companyScenes[id];
  const tile = Math.min(17, 410 / (scene.width + scene.height));
  const map: PixelMap = { id, width: scene.width, height: scene.height, tile, ox: 240 - (scene.width - scene.height) * tile / 2, oy: 90, projection: 'isometric', rects: [], labels: [], blocked: [], objects: [], locale, company, sprite: '/images/job-route/antonio-atlas.webp', spriteScale: tile / 23, scene: { resolved, mission } };
  const project = (x: number, y: number) => ({ x: map.ox + (x - y) * tile, y: map.oy + (x + y) * tile / 2 });
  for (const item of scene.furniture) {
    map.blocked.push({ x: item.x, y: item.y });
    if (!item.id) continue;
    const p = project(item.x + .5, item.y + .5), tall = item.kind.startsWith('phone') ? tile * 3.5 : tile * 1.8;
    map.objects.push({ id: item.id, x: item.x, y: item.y, label: item.label![locale], hit: [p.x - tile * .9, p.y - tall, tile * 1.8, tall + tile * .4], marker: [p.x, p.y - tall - 3] });
  }
  const door = project(0.5, 7.5);
  map.objects.push({ id: 'portal', x: 0, y: 7, label: locale === 'es' ? 'Volver a la ciudad' : 'Return to town', hit: [door.x - tile, door.y - tile, tile * 2, tile * 1.5], marker: [door.x, door.y - tile] });
  const c = scene.furniture.find(f => f.id === 'coffee')!, cp = project(c.x + .5, c.y + .5);
  map.effects = { fountains: [], fans: [], lights: [], screens: [], steam: [[cp.x, cp.y - tile]] };
  if (id === 'freelance' && !resolved.includes('noise')) { const p = project(8.5, 7.5); map.effects.steam.push([p.x, p.y - tile * 2]); }
  return map;
}

// The same furniture definitions drive art, depth sorting, hit areas and collisions.
// Native canvas art keeps every room legible at any zoom and needs no image downloads.
export function paintCompanyScene(map: PixelMap) {
  const scene = companyScenes[map.id], s = map.tile;
  const canvas = () => { const c = document.createElement('canvas'); c.width = 1440; c.height = 960; return c; };
  const background = canvas(), ctx = background.getContext('2d')!; ctx.scale(3, 3);
  const project = (x: number, y: number, z = 0): [number, number] => [map.ox + (x - y) * s, map.oy + (x + y) * s / 2 - z];
  const poly = (c: CanvasRenderingContext2D, pts: number[][], color: string) => { c.fillStyle = color; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill(); };
  const box = (c: CanvasRenderingContext2D, x: number, y: number, w: number, d: number, h: number, top: string, front = '#485467', side = '#374353', base = 0) => {
    poly(c, [project(x, y + d, base), project(x + w, y + d, base), project(x + w, y + d, h + base), project(x, y + d, h + base)], front);
    poly(c, [project(x + w, y, base), project(x + w, y + d, base), project(x + w, y + d, h + base), project(x + w, y, h + base)], side);
    poly(c, [project(x, y, h + base), project(x + w, y, h + base), project(x + w, y + d, h + base), project(x, y + d, h + base)], top);
    // Bevel catches and ambient occlusion give every furnishing the same material depth.
    c.lineWidth = .3; c.strokeStyle = '#f3e8ca66'; c.beginPath();
    const edge = [project(x, y + d, h + base), project(x + w, y + d, h + base), project(x + w, y, h + base)];
    edge.forEach(([px, py], i) => i ? c.lineTo(px, py) : c.moveTo(px, py)); c.stroke();
    poly(c, [project(x + w, y, base), project(x + w, y + d, base), project(x + w, y + d, h + base), project(x + w, y, h + base)], '#0c153c25');
  };
  const gradient = ctx.createRadialGradient(240, 175, 20, 240, 175, 270); gradient.addColorStop(0, '#24344b'); gradient.addColorStop(1, '#0b1423'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, 480, 320);
  // Architectural plinth, back walls, window rhythm, floor tiles and room inlays.
  box(ctx, -.2, -.2, scene.width + .4, scene.height + .4, 6, '#27384c', '#29374a', '#172639', -6);
  box(ctx, -.12, 0, .12, scene.height, 34, '#8aabb6', scene.wall, '#273650');
  box(ctx, 0, -.12, scene.width, .12, 34, '#8aabb6', scene.wall, '#273650');
  for (let x = 1; x < scene.width - 1; x += 3) {
    poly(ctx, [project(x, 0, 11), project(x + 1.8, 0, 11), project(x + 1.8, 0, 28), project(x, 0, 28)], '#c5e0df');
    poly(ctx, [project(x + .1, 0, 12), project(x + 1.6, 0, 12), project(x + 1.6, 0, 26), project(x + .1, 0, 26)], '#78a9bc');
  }
  for (let y = 0; y < scene.height; y++) for (let x = 0; x < scene.width; x++) {
    const z = scene.zones.find(z => x >= z.x && x < z.x + z.w && y >= z.y && y < z.y + z.h);
    poly(ctx, [project(x, y), project(x + .97, y), project(x + .97, y + .97), project(x, y + .97)], z?.color ?? scene.floor);
    if ((x + y) % 2 === 0) poly(ctx, [project(x, y), project(x + .97, y), project(x + .97, y + .97), project(x, y + .97)], '#ffffff08');
  }
  poly(ctx, [project(0, 0), project(scene.width, 0), project(scene.width, scene.height), project(0, scene.height)], '#0e193c55');
  roomDetail(ctx, scene, project, poly, s, ['freelance', 'domingo-alonso', 'anexia'].includes(map.id));
  ctx.save(); ctx.beginPath();
  [project(0, 0), project(scene.width, 0), project(scene.width, scene.height), project(0, scene.height)].forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.clip();
  for (const item of scene.furniture) {
    if (!['desk', 'coffee', 'phone-green', 'phone-blue'].includes(item.kind)) continue;
    const [x, y] = project(item.x + .5, item.y + .5), radius = s * 1.8;
    const light = ctx.createRadialGradient(x, y, 0, x, y, radius);
    light.addColorStop(0, item.kind === 'desk' ? '#edc28535' : '#ffc77b48'); light.addColorStop(1, '#f7b56900');
    ctx.fillStyle = light; ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  ctx.restore();
  ctx.textAlign = 'center'; ctx.font = '600 5px monospace';
  for (const z of scene.zones) { const [x, y] = project(z.x + z.w / 2, z.y + z.h - .4); ctx.fillStyle = '#17273bcc'; ctx.fillRect(x - Math.min(90, z.w * s) / 2, y - 5, Math.min(90, z.w * s), 7); ctx.fillStyle = '#dfdfcd'; ctx.fillText(z.label[map.locale!], x, y, Math.min(86, z.w * s - 4)); }
  const [dx, dy] = project(.5, 7.5); ctx.fillStyle = '#8ce7c6'; ctx.font = 'bold 12px monospace'; ctx.fillText('↙', dx, dy + 3);
  if (map.id === 'freelance') {
    if (!map.scene?.resolved.includes('leak')) { ctx.fillStyle = '#7cddedaa'; const [x, y] = project(2, 2); ctx.beginPath(); ctx.ellipse(x, y, s * 2, s * .7, .25, 0, Math.PI * 2); ctx.fill(); }
    if ((map.scene?.mission ?? 0) >= 1 && !map.scene?.resolved.includes('foam')) for (let i = 0; i < 28; i++) { const [x, y] = project(3 + (i % 5) * .6, 2 + Math.floor(i / 5) * .7); ctx.fillStyle = i % 2 ? '#e8f7fb' : '#bedde9'; ctx.beginPath(); ctx.arc(x, y, 2 + i % 4, 0, Math.PI * 2); ctx.fill(); }
  }
  ctx.textAlign = 'left'; ctx.fillStyle = scene.accent; ctx.font = 'bold 11px monospace'; ctx.fillText(map.company!.toUpperCase(), 21, 298, 260);
  ctx.fillStyle = '#cad6e5'; ctx.font = '6px monospace'; ctx.fillText(scene.title[map.locale!], 21, 308, 280);
  ctx.fillStyle = '#adc0d3'; ctx.font = '5px monospace'; 
  const entities = scene.furniture.map(item => {
    const c = canvas(), g = c.getContext('2d')!; g.scale(3, 3);
    const { x, y, kind } = item, [px, py] = project(x + .5, y + .5);
    const block = (w: number, d: number, h: number, top: string, front?: string, side?: string, base = 0) => box(g, x + (1 - w) / 2, y + (1 - d) / 2, w, d, h, top, front, side, base);
    g.fillStyle = '#0d1c3638'; g.beginPath(); g.ellipse(px, py + 1, s * .8, s * .3, 0, 0, Math.PI * 2); g.fill();
    const asset = npcAsset(item, map.id), npc = asset ? sceneImage(asset) : undefined;
    const furnitureUrl = furnitureAsset(item), illustration = furnitureUrl ? sceneImage(furnitureUrl) : undefined;
    if (npc) {
      const height = (kind === 'child' ? 33 : 43) * (map.spriteScale ?? 1), width = height * npc.width / npc.height;
      g.imageSmoothingEnabled = false; g.drawImage(npc, px - width / 2, py - height, width, height);
    }
    else if (illustration) {
      const tall = kind.startsWith('phone') ? 3.6 : kind === 'bookcase' ? 2.8 : ['rack', 'skeleton', 'lamp'].includes(kind) ? 2.3 : 1.8;
      const wide = ['desk', 'table', 'sofa', 'bed'].includes(kind) ? 2.3 : kind.startsWith('phone') ? 3.2 : 1.8;
      const scale = Math.min(s * wide / illustration.width, s * tall / illustration.height);
      const w = illustration.width * scale, h = illustration.height * scale;
      g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
      g.drawImage(illustration, px - w / 2, py + s * .25 - h, w, h);
      if (kind === 'router' && !map.scene?.resolved.includes('cat')) {
        g.fillStyle = '#d8aa76'; g.beginPath(); g.ellipse(px + s * .4, py - s * .3, s * .26, s * .14, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#f2c58c'; g.fillRect(px + s * .45, py - s * .6, s * .2, s * .2); g.fillRect(px + s * .45, py - s * .66, s * .05, s * .1); g.fillRect(px + s * .6, py - s * .66, s * .05, s * .1);
      }
    }
    else if (kind === 'partition' || kind === 'partition-h') { block(kind === 'partition' ? .18 : 1, kind === 'partition' ? 1 : .18, s * 1.2, '#dfd9c7', '#9caaa7', '#7d8d92'); }
    else if (kind === 'desk' || kind === 'table') {
      box(g, x + .12, y + .12, .12, .12, s * .65, '#788795'); box(g, x + .85, y + .65, .12, .12, s * .65, '#788795'); block(1.25, .85, 3, '#e4cbaa', '#b79980', '#8b7771', s * .65);
      if (kind === 'desk') { g.fillStyle = '#213749'; g.fillRect(px - s * .42, py - s * 1.5, s * .82, s * .6); g.fillStyle = '#8cdbd4'; g.fillRect(px - s * .35, py - s * 1.43, s * .66, s * .43); g.fillStyle = '#e2c7f0'; g.fillRect(px - s * .28, py - s * 1.3, s * .35, 1); g.fillStyle = '#e8e5d5'; g.fillRect(px + s * .3, py - s * .7, 3, 3); box(g, x + .28, y + .45, .4, .2, 1, '#526b79', '#526b79', '#526b79', s * .7); g.fillStyle = '#f6e1ad'; g.fillRect(px + s * .4, py - s * .81, 2, 1); }
      else { g.fillStyle = '#f1e5c5'; g.beginPath(); g.ellipse(px, py - s * .7, s * .3, s * .16, 0, 0, Math.PI * 2); g.fill(); }
    } else if (kind === 'phone-green' || kind === 'phone-blue') {
      const green = kind === 'phone-green'; block(1.8, 1.5, 6, '#ccd2c7', '#718795', '#506579');
      g.fillStyle = green ? '#426c35' : '#233e72'; g.beginPath(); g.roundRect(px - s * .7, py - s * 3.4, s * 1.4, s * 3, s * .3); g.fill();
      g.fillStyle = green ? '#82c557' : '#91a5c8'; g.beginPath(); g.roundRect(px - s * .58, py - s * 3.15, s * 1.16, s * 2.55, s * .22); g.fill();
      g.fillStyle = '#a4bc81'; g.fillRect(px - s * .43, py - s * 2.8, s * .86, s * .67);
      g.fillStyle = '#273e44'; g.font = `bold ${s * .23}px monospace`; g.textAlign = 'center'; g.fillText(green ? 'EASY' : '3310', px, py - s * 2.35);
      for (let row = 0; row < 4; row++) for (let col = 0; col < 3; col++) { g.fillStyle = '#e0e4d6'; g.fillRect(px - s * .4 + col * s * .29, py - s * 1.83 + row * s * .25, s * .2, s * .12); }
      if (green) for (let i = 0; i < 12; i++) { g.fillStyle = ['#fff0a0', '#fd9bd1', '#98efdb'][i % 3]; g.beginPath(); g.arc(px + Math.cos(i * Math.PI / 6) * s, py - s * 1.9 + Math.sin(i * Math.PI / 6) * s * 1.7, 1.6, 0, Math.PI * 2); g.fill(); }
    } else if (kind === 'rack' || kind === 'board') {
      block(.9, .45, s * 1.6, '#a5b9c6', '#334c62', '#24374d');
      for (let i = 0; i < 4; i++) { g.fillStyle = kind === 'rack' ? '#83e5b8' : ['#d9afce', '#d3ce93'][i % 2]; g.fillRect(px - s * .35, py - s * 1.5 + i * s * .27, kind === 'rack' ? s * .5 : s * .6, kind === 'rack' ? 2 : s * .16); }
    } else if (kind === 'sofa' || kind === 'bed') {
      block(1.6, .9, s * .35, kind === 'sofa' ? '#a8b6b5' : '#ece0ca', '#7f9297'); block(1.6, .2, s * .65, '#798d9a');
      if (kind === 'bed') { g.fillStyle = '#fff4db'; g.fillRect(px - s * .7, py - s * .4, s * .55, s * .27); }
    } else if (kind === 'coffee' || kind === 'washer' || kind === 'sink' || kind === 'router') {
      block(.9, .75, s * .8, '#d9dacf', '#a3b1b3', '#6c838c');
      g.fillStyle = '#314b62'; g.fillRect(px - s * .3, py - s * .92, s * .6, s * .45);
      if (kind === 'washer') { g.fillStyle = '#93c6d3'; g.beginPath(); g.arc(px, py - s * .57, s * .22, 0, Math.PI * 2); g.fill(); }
      if (kind === 'coffee') { g.fillStyle = '#fff4de'; g.fillRect(px - 2, py - s * .55, 4, 4); }
      if (kind === 'router' && !map.scene?.resolved.includes('cat')) { g.fillStyle = '#e4b27e'; g.fillRect(px + 3, py - 4, 8, 5); g.fillRect(px + 8, py - 8, 4, 5); g.fillRect(px + 8, py - 10, 1, 3); g.fillRect(px + 11, py - 10, 1, 3); }
    } else if (kind === 'plant') { block(.5, .5, s * .4, '#d9b792', '#9f7c65'); for (let i = 0; i < 5; i++) { g.fillStyle = i % 2 ? '#93ba82' : '#578f77'; g.beginPath(); g.ellipse(px + (i % 3 - 1) * 4, py - s * .6 - i * 2, 3, 6, i - 2, 0, Math.PI * 2); g.fill(); } }
    else if (kind === 'ball') { g.fillStyle = '#ddab8f'; g.beginPath(); g.arc(px, py - s * .35, s * .4, 0, Math.PI * 2); g.fill(); }
    else {
      const scale = kind === 'child' ? .65 : kind === 'dancer' ? .8 : 1;
      g.save(); g.translate(px, py); g.scale(s / 16 * scale, s / 16 * scale);
      if (kind === 'doctor') { poly(g, [[-5, -18], [5, -18], [10, -3], [-9, -3]], '#bc6271'); }
      g.fillStyle = kind === 'skeleton' ? '#e7dfbe' : '#efbe91'; g.fillRect(-4, -25, 8, 8);
      g.fillStyle = '#513f40'; g.fillRect(-3, -21, 1, 1); g.fillRect(2, -21, 1, 1); g.fillRect(-1, -18, 2, 1);
      g.fillStyle = kind === 'musician' ? '#c89979' : '#6b493e'; g.fillRect(-4, -25, 8, kind === 'musician' ? 1 : 3);
      g.fillStyle = kind === 'doctor' ? '#edbf9b' : kind === 'skeleton' ? '#dcd9c2' : kind === 'musician' ? '#bbae84' : '#90bec1'; g.fillRect(kind === 'musician' ? -7 : -5, -17, kind === 'musician' ? 14 : 10, 11);
      g.fillStyle = kind === 'doctor' ? '#f1f1e5' : '#44546d'; g.fillRect(-5, -7, 10, 4); g.fillStyle = '#323f50'; g.fillRect(-5, -3, 3, 3); g.fillRect(2, -3, 3, 3);
      if (kind === 'skeleton') { g.fillStyle = '#435263'; g.fillRect(-3, -22, 2, 2); g.fillRect(1, -22, 2, 2); for (let rib = 0; rib < 3; rib++) g.fillRect(-4, -15 + rib * 3, 8, 1); g.fillRect(-1, -16, 2, 9); }
      if (kind === 'doctor') { g.fillStyle = '#a86b4b'; g.fillRect(5, -20, 7, 3); }
      if (kind === 'musician') { g.fillStyle = '#dfbd6f'; g.fillRect(3, -19, 11, 2); g.fillRect(12, -22, 3, 7); g.fillStyle = '#a47144'; g.beginPath(); g.ellipse(-10, -6, 4, 6, -.3, 0, Math.PI * 2); g.fill(); g.fillRect(-11, -20, 2, 10); }
      if (kind === 'dancer') { g.fillStyle = '#efbe91'; g.fillRect(-10, -20, 6, 3); g.fillRect(5, -23, 6, 3); }
      if (kind === 'child') { g.fillStyle = '#fff1d4'; g.fillRect(4, -14, 11, 9); g.fillStyle = '#dc779a'; g.fillRect(7, -12, 4, 4); }
      g.restore();
    }
    if (!illustration) furnitureDetail(g, item, s, project, poly);
    const left = Math.max(0, Math.floor(px - s * 2)), top = Math.max(0, Math.floor(py - s * 4));
    const width = Math.min(480 - left, Math.ceil(s * 4)), height = Math.min(320 - top, Math.ceil(s * 4.7));
    const cropped = document.createElement('canvas'); cropped.width = width * 3; cropped.height = height * 3;
    cropped.getContext('2d')!.drawImage(c, left * 3, top * 3, width * 3, height * 3, 0, 0, width * 3, height * 3);
    const motion = kind === 'doctor' ? [s * .55, s * .27, 1] : kind === 'dancer' && !map.scene?.resolved.includes('foam') ? [2, 1, 6] : kind === 'child' && !map.scene?.resolved.includes('family-visit') ? [s * .3, s * .15, 2] : [];
    return { depth: x + y + 1.5, canvas: cropped, bounds: [left, top, width, height], motion };
  });
  return { background, entities: entities.sort((a, b) => a.depth - b.depth), detailed: false };
}
