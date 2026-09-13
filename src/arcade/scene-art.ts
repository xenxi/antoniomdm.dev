import type { PixelMap } from './pixel-map';

const images = new Map<string, HTMLImageElement>();
const pending = new Map<string, Promise<void>>();
export const sceneImage = (url: string) => images.get(url);
export function prepareSceneArt(map: PixelMap) {
  return Promise.all([map.art, map.sprite].filter((url): url is string => Boolean(url)).map(url => {
    if (!pending.has(url)) pending.set(url, new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => { images.set(url, img); resolve(); };
      img.onerror = () => { pending.delete(url); reject(new Error('Scene asset unavailable')); };
      img.src = url;
    }));
    return pending.get(url)!;
  }));
}

// Precise silhouettes restore foreground furniture over the moving character.
export const officeForeground = [
  { depth: 14.5, polygon: [[103, 179], [166, 147], [216, 172], [216, 207], [179, 222], [174, 271], [106, 243]] },
  { depth: 22, polygon: [[178, 228], [257, 196], [278, 235], [278, 285], [215, 306], [179, 276]] },
  { depth: 21, polygon: [[348, 155], [392, 174], [392, 247], [348, 225]] },
];
