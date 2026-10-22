// One-time packing of authored raster frames, not an asset generator.
// Empaquetado puntual de fotogramas dibujados; no genera ilustraciones.
import sharp from 'sharp';
import { mkdir, copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sources = process.argv.slice(2);
if (sources.length !== 3) throw new Error('Supply walk, actions and breaks PNGs / Indica los PNG de caminar, acciones y descansos');
const destination = resolve('godot/career/assets/characters');
await mkdir(destination, { recursive: true });
for (const [index, source] of sources.entries()) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // Authored rows have different whitespace, especially the seated laptop row.
  // Las filas dibujadas tienen márgenes distintos, especialmente el portátil.
  const boundaries = index === 1 ? [0, 264, 464, 681, 887] : index === 0 ? [0, 236, 466, 660, 887] : [0, 231, 450, 665, 887];
  const frames = [];
  for (let row = 0; row < 4; row++) for (let column = 0; column < 8; column++) {
    const x0 = Math.round(column * info.width / 8), x1 = Math.round((column + 1) * info.width / 8);
    const y0 = Math.round(boundaries[row] * info.height / 887), y1 = Math.round(boundaries[row + 1] * info.height / 887);
    let left = x1, right = x0, top = y1, bottom = y0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      if (data[(y * info.width + x) * 4 + 3] < 48) continue;
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    if (right <= left || bottom <= top) throw new Error(`Empty frame ${row}:${column}`);
    // Center on the head rather than props, so reaching arms cannot shift the body.
    // Centra la cabeza, no los objetos, para que los brazos no desplacen el cuerpo.
    let headLeft = right, headRight = left;
    for (let y = top; y < top + (bottom - top) * .3; y++) for (let x = left; x <= right; x++) {
      if (data[(y * info.width + x) * 4 + 3] < 96) continue;
      headLeft = Math.min(headLeft, x); headRight = Math.max(headRight, x);
    }
    const factor = 1.04;
    const width = Math.round((right - left + 1) * factor), height = Math.round((bottom - top + 1) * factor);
    const offsetX = Math.round(128 - ((headLeft + headRight) / 2 - left) * factor);
    const offsetY = 236 - height;
    if (offsetX < 8 || offsetX + width > 248 || offsetY < 8) throw new Error(`Frame exceeds safe gutter ${row}:${column}`);
    const input = await sharp(source).extract({ left, top, width: right - left + 1, height: bottom - top + 1 }).resize(width, height, { kernel: 'nearest' }).png().toBuffer();
    frames.push({ input, left: column * 256 + offsetX, top: row * 256 + offsetY });
  }
  const file = resolve(destination, `antonio-green-${['walk', 'actions', 'breaks'][index]}.webp`);
  await sharp({ create: { width: 2048, height: 1024, channels: 4, background: '#00000000' } }).composite(frames).webp({ lossless: true }).toFile(file);
  if (index === 0) await copyFile(file, resolve('public/images/job-route/antonio-green-walk.webp'));
  console.log(file);
}
