import { companyScenes, paintCompanyScene } from './company-scenes';
import { npcAsset, furnitureAsset } from './npc-art';
import type { PixelMap } from './pixel-map';
import { officeForeground, sceneImage } from './scene-art';
import { paintWaterfrontSigns } from './waterfront-signs';
import { townForeground } from './town-scene';
import { paintWaterfrontMural, waterfrontMuralAsset } from './waterfront-mural';


const cachedArt = new WeakMap<PixelMap, { detailed: boolean; background: HTMLCanvasElement; sprite?: HTMLCanvasElement; entities: { depth: number; canvas: HTMLCanvasElement; bounds?: number[]; motion?: number[] }[] }>();
const cachedAssets = new WeakMap<PixelMap, number>();
const cachedWholeTownArt = new WeakMap<PixelMap, ReturnType<typeof cachedArt.get>>();
export function rasterize(map: PixelMap, slicedTown = true) {
  const cache = slicedTown ? cachedArt : cachedWholeTownArt;
  const plate = map.art ? sceneImage(map.art) : undefined;
  const sprite = map.sprite ? sceneImage(map.sprite) : undefined;
  let art = cache.get(map);
  const loadedAssets = map.scene ? companyScenes[map.id].furniture.flatMap(item => [npcAsset(item, map.id), furnitureAsset(item)]).filter(url => url && sceneImage(url)).length : Number(map.id === 'town' && Boolean(sceneImage(waterfrontMuralAsset)));
  if (art && cachedAssets.get(map) === loadedAssets && art.detailed === Boolean(plate) && Boolean(art.sprite) === Boolean(sprite)) return art;
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
      const mural = sceneImage(waterfrontMuralAsset);
      if (mural) paintWaterfrontMural(ctx, mural);
      paintWaterfrontSigns(ctx, map.locale ?? 'es');
    } else {
    // Branding is real localized text, never baked into the scenery.
    ctx.save(); ctx.translate(345, 57); ctx.transform(1, .35, 0, 1, 0, 0);
    ctx.font = 'bold 10px monospace'; ctx.fillStyle = '#f5bcff'; ctx.shadowColor = '#d960f0'; ctx.shadowBlur = 8;
    ctx.fillText((map.company ?? 'JOB ROUTE').toUpperCase(), 0, 0, 60);
    ctx.font = '4px monospace'; ctx.fillStyle = '#d890ed'; ctx.fillText(map.locale === 'es' ? 'IDEAS · PERSONAS · IMPACTO' : 'IDEAS · PEOPLE · IMPACT', 0, 10, 60); ctx.restore();
    }
    const background = art.background;
    art.entities = (map.id === 'town' ? townForeground(slicedTown) : officeForeground).map(entity => {
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
  if (map.scene) art = paintCompanyScene(map);
  if (sprite) { art.sprite = document.createElement('canvas'); art.sprite.width = sprite.width; art.sprite.height = sprite.height; art.sprite.getContext('2d')!.drawImage(sprite, 0, 0); }
  cache.set(map, art); cachedAssets.set(map, loadedAssets); return art;
}
