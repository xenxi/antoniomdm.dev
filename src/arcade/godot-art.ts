import type { PixelMap } from './pixel-map';
import { officeForeground, sceneImage } from './scene-art';
import { buildings } from './town';
import { townForeground, townProject } from './town-scene';

const cachedArt = new WeakMap<PixelMap, { detailed: boolean; background: HTMLCanvasElement; sprite?: HTMLCanvasElement; entities: { depth: number; canvas: HTMLCanvasElement; bounds?: number[] }[] }>();
export function rasterize(map: PixelMap) {
  const plate = map.art ? sceneImage(map.art) : undefined;
  const sprite = map.sprite ? sceneImage(map.sprite) : undefined;
  let art = cachedArt.get(map);
  if (art && art.detailed === Boolean(plate) && Boolean(art.sprite) === Boolean(sprite)) return art;
  const paint = (rects: PixelMap['rects'], labels: PixelMap['labels'] = []) => {
    const canvas = document.createElement('canvas'); canvas.width = 480; canvas.height = 320;
    const ctx = canvas.getContext('2d')!;
    for (const [x, y, w, h, color] of rects) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }
    ctx.font = '6px monospace'; ctx.textAlign = 'center';
    for (const label of labels) { ctx.fillStyle = label.color; ctx.fillText(label.text, label.x, label.y, 110); }
    return canvas;
  };
  art = { detailed: Boolean(plate), background: paint(map.rects, map.labels), entities: (map.entities ?? []).map(e => ({ depth: e.depth, canvas: paint(e.rects) })) };
  art.detailed = Boolean(plate);
  if (plate) {
    const canvas = () => { const c = document.createElement('canvas'); c.width = 1536; c.height = 1024; return c; };
    art.background = canvas();
    const ctx = art.background.getContext('2d')!; ctx.scale(3.2, 3.2); ctx.drawImage(plate, 0, 0, 480, 320);
    if (map.id === 'town') {
      for (const [i, b] of buildings.entries()) {
        const sign = map.signs?.find(s => s.id === b.id), p = townProject(b.x + .25, b.y + b.height, 20);
        ctx.save(); ctx.translate(p[0], p[1]); ctx.transform(1, .5, 0, 1, 0, 0);
        ctx.fillStyle = '#07172aed'; ctx.fillRect(-.5, -3.5, 32, 5.3);
        ctx.font = 'bold 3px monospace'; ctx.fillStyle = sign?.complete ? '#a0ffe2' : sign?.unlocked ? '#e6fff6' : '#c7caee';
        const name = sign?.name ?? b.id;
        ctx.fillText(`${String(i + 1).padStart(2, '0')} ${name}`, 0, 0, 31);
        ctx.restore();
        const door = townProject(b.door.x + .5, b.door.y + .5);
        ctx.save(); ctx.translate(door[0], door[1]); ctx.transform(1, .5, -1, .5, 0, 0);
        ctx.strokeStyle = sign?.complete ? '#93f5c7' : sign?.unlocked ? '#7df0e4' : '#8a84b2';
        ctx.lineWidth = .6; ctx.strokeRect(-3, -3, 6, 6); ctx.restore();
      }
    } else {
    // Branding is real localized text, never baked into the scenery.
    ctx.save(); ctx.translate(345, 57); ctx.transform(1, .35, 0, 1, 0, 0);
    ctx.font = 'bold 10px monospace'; ctx.fillStyle = '#f5bcff'; ctx.shadowColor = '#d960f0'; ctx.shadowBlur = 8;
    ctx.fillText((map.company ?? 'JOB ROUTE').toUpperCase(), 0, 0, 60);
    ctx.font = '4px monospace'; ctx.fillStyle = '#d890ed'; ctx.fillText(map.locale === 'es' ? 'IDEAS · PERSONAS · IMPACTO' : 'IDEAS · PEOPLE · IMPACT', 0, 10, 60); ctx.restore();
    }
    const background = art.background;
    art.entities = (map.id === 'town' ? townForeground() : officeForeground).map(entity => {
      const xs = entity.polygon.map(p => p[0]), ys = entity.polygon.map(p => p[1]);
      const left = Math.max(0, Math.floor(Math.min(...xs))), top = Math.max(0, Math.floor(Math.min(...ys)));
      const w = Math.min(480, Math.ceil(Math.max(...xs))) - left, h = Math.min(320, Math.ceil(Math.max(...ys))) - top;
      // Tight texture bounds keep the tree-lined district inexpensive in GPU memory.
      const c = document.createElement('canvas'); c.width = Math.ceil(w * 3.2); c.height = Math.ceil(h * 3.2);
      const context = c.getContext('2d')!; context.scale(3.2, 3.2); context.translate(-left, -top); context.beginPath();
      entity.polygon.forEach(([x, y], i) => i ? context.lineTo(x, y) : context.moveTo(x, y)); context.closePath(); context.clip(); context.drawImage(background, 0, 0, 480, 320);
      return { depth: entity.depth, canvas: c, bounds: [left, top, c.width / 3.2, c.height / 3.2] };
    });
  }
  if (sprite) { art.sprite = document.createElement('canvas'); art.sprite.width = sprite.width; art.sprite.height = sprite.height; art.sprite.getContext('2d')!.drawImage(sprite, 0, 0); }
  cachedArt.set(map, art); return art;
}
