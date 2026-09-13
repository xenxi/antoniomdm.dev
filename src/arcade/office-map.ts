import type { Locale } from '../i18n/core';
import type { PixelMap, PixelRect } from './pixel-map';
import { avatarFrames } from './avatar';
import { copy } from './campaign';

export const officeProject = (x: number, y: number) => ({ x: 240 + (x - y) * 20, y: 64 + (x + y) * 10 });

// Scanline polygons produce identical, crisp artwork in Canvas and Godot.
export function drawOffice(map: PixelMap, scenario: string, locale: Locale, company: string) {
  map.projection = 'isometric'; map.ox = 240; map.oy = 64; map.tile = 20; map.entities = [];
  let rects = map.rects;
  const r = (x: number, y: number, w: number, h: number, c: string) => rects.push([Math.round(x), Math.round(y), Math.ceil(w), Math.ceil(h), c]);
  const poly = (points: { x: number; y: number }[], c: string) => {
    const min = Math.floor(Math.min(...points.map(p => p.y))), max = Math.ceil(Math.max(...points.map(p => p.y)));
    for (let y = min; y < max; y++) {
      const xs: number[] = [];
      for (let i = 0; i < points.length; i++) { const a = points[i], b = points[(i + 1) % points.length]; if ((a.y <= y + .5 && b.y > y + .5) || (b.y <= y + .5 && a.y > y + .5)) xs.push(a.x + (y + .5 - a.y) / (b.y - a.y) * (b.x - a.x)); }
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) r(Math.ceil(xs[i]), y, Math.max(1, Math.floor(xs[i + 1]) - Math.ceil(xs[i])), 1, c);
    }
  };
  const block = (x: number, y: number, w: number, d: number, h: number, top: string, left = '#30314a', right = '#1c263d') => {
    const a = officeProject(x, y), b = officeProject(x + w, y), c = officeProject(x + w, y + d), e = officeProject(x, y + d);
    const up = (p: { x: number; y: number }) => ({ x: p.x, y: p.y - h });
    poly([up(e), up(c), c, e], left); poly([up(b), up(c), c, b], right); poly([up(a), up(b), up(c), up(e)], top);
  };
  const beam = (x: number, y: number, ex: number, ey: number, h: number, color: string) => {
    const a = officeProject(x, y), b = officeProject(ex, ey);
    poly([{ x: a.x, y: a.y - h }, { x: b.x, y: b.y - h }, { x: b.x, y: b.y - h + 2 }, { x: a.x, y: a.y - h + 2 }], color);
  };
  const layer = (depth: number, paint: () => void) => { const list: PixelRect[] = []; rects = list; paint(); map.entities!.push({ depth, rects: list }); rects = map.rects; };
  const plant = (x: number, y: number, size = 1) => {
    const p = officeProject(x + .5, y + .5);
    block(x + .28, y + .28, .45, .45, 9, '#b3a3a1', '#6d7282', '#4a5267');
    r(p.x, p.y - 28 * size, 2, 20 * size, '#4e7668');
    for (let i = 0; i < 5; i++) { const dy = p.y - 14 - i * 4 * size; poly([{ x: p.x, y: dy + 3 }, { x: p.x - 10 * size + i, y: dy - 4 }, { x: p.x - 9 * size, y: dy - 8 }, { x: p.x - 3, y: dy - 6 }], i % 2 ? '#476f60' : '#345f55'); poly([{ x: p.x + 1, y: dy + 3 }, { x: p.x + 10 * size - i, y: dy - 6 }, { x: p.x + 7 * size, y: dy - 10 }, { x: p.x + 2, y: dy - 5 }], i % 2 ? '#729174' : '#497f65'); }
  };
  const monitor = (x: number, y: number, tint = '#71ccc9') => {
    r(x - 1, y, 2, 8, '#51667a'); r(x - 7, y + 7, 13, 2, '#9da7b5');
    poly([{ x: x - 10, y: y - 17 }, { x: x + 8, y: y - 12 }, { x: x + 8, y: y + 1 }, { x: x - 10, y: y - 4 }], '#080f20');
    poly([{ x: x - 8, y: y - 15 }, { x: x + 6, y: y - 11 }, { x: x + 6, y: y - 1 }, { x: x - 8, y: y - 5 }], '#243c56');
    for (let i = 0; i < 4; i++) { r(x - 6, y - 12 + i * 2, 2, 1, tint); r(x - 2, y - 11 + i * 2, 4 + i % 2 * 2, 1, i % 2 ? '#c38ace' : '#7ba7c2'); }
    r(x + 5, y, 1, 1, '#94f7d1');
  };
  const chair = (x: number, y: number) => {
    const p = officeProject(x, y); block(x - .18, y - .18, .42, .42, 8, '#4c556e', '#232e43', '#192339');
    r(p.x - 1, p.y - 7, 2, 8, '#62697b'); r(p.x - 7, p.y + 1, 14, 2, '#0a1526');
    r(p.x - 6, p.y - 20, 12, 11, '#101b2d'); r(p.x - 4, p.y - 18, 8, 7, '#3c4c64');
  };
  const desk = (x: number, y: number, dual = true, occupied = false) => {
    block(x, y, .12, .8, 12, '#596076'); block(x + .85, y, .12, .8, 12, '#596076');
    block(x - .12, y - .08, 1.26, 1, 14, '#a08c91', '#61576e', '#50546b');
    const p = officeProject(x + .5, y + .4); monitor(p.x + 5, p.y - 21);
    if (dual) monitor(p.x - 11, p.y - 18, '#bf8dde');
    block(x + .3, y + .63, .52, .17, 15, '#b1b8bc', '#818da0', '#677487');
    r(p.x + 10, p.y - 10, 2, 3, '#d7c2ac'); r(p.x + 11, p.y - 12, 2, 2, '#766b70');
    if (occupied) {
      const q = officeProject(x + .5, y + .8);
      for (const [sx, sy, w, h, color] of avatarFrames.up[0]) if (sy < 26) r(q.x - 12 + sx, q.y - 22 + sy, w, h, color === '#29465f' ? '#4b4165' : color);
    }
  };
  r(0, 0, 480, 320, '#090f20');
  // A city silhouette sits beyond the cutaway; glass rooms reflect the skyline.
  for (let i = 0; i < 24; i++) { const x = i * 21, h = 25 + i * 17 % 48; r(x, 88 - h, 18, h + 29, '#141d34'); for (let j = 0; j < 6; j++) for (let k = 0; k < 2; k++) if ((i + j + k) % 3) r(x + 4 + k * 7, 93 - h + j * 8, 2, 3, (i + j) % 4 ? '#354763' : '#816891'); }
  block(0, 0, 11, 11, 0, '#182039', '#0a1122', '#0a1122');
  for (let y = 0; y < 11; y++) for (let x = 0; x < 11; x++) {
    block(x, y, .98, .98, 1, ['#3a4059', '#41445f', '#383d57'][(x + y * 2) % 3]);
    const p = officeProject(x + .2, y + .8); r(p.x, p.y - 1, 9, 1, '#6b6c8140');
  }
  // Rear walls and edge lighting never cover the player.
  block(0, 0, 11, .15, 48, '#636386', '#343550', '#202a44');
  block(0, 0, .15, 11, 48, '#5a6484', '#2c334c', '#253249');
  beam(.2, .2, 10.8, .2, 45, '#81e4df');
  beam(.2, .2, .2, 10.8, 45, '#c589d2');
  for (let x = 3; x < 10; x += 2) {
    const a = officeProject(x, .22), b = officeProject(x + 1.7, .22);
    poly([{ x: a.x, y: a.y - 37 }, { x: b.x, y: b.y - 37 }, { x: b.x, y: b.y - 7 }, { x: a.x, y: a.y - 7 }], '#17283e');
    for (let i = 0; i < 4; i++) { const p = officeProject(x + i * .4, .25); r(p.x, p.y - 31, 3, 13 + i % 2 * 6, i % 2 ? '#ba8f8f' : '#426785'); }
    const mid = officeProject(x + .8, .25); r(mid.x, mid.y - 36, 1, 30, '#6b7e94');
  }
  // Glass meeting room / freelance studio occupies the existing blocked corner.
  layer(5.8, () => {
    block(.85, .8, 2.1, 2.4, 2, '#78656a');
    chair(1.4, 1.8); desk(1, 1, scenario !== 'bedroom');
    if (scenario === 'bedroom') { block(1.3, 2, 1.4, .8, 9, '#68587d', '#4e4465', '#383a54'); block(1.3, 2, .45, .8, 11, '#c3b8ba'); }
    else { chair(2.2, 2.6); block(1.8, 1.8, .8, .8, 13, '#a89a99', '#756d7b'); }
    for (const x of [.9, 2.9]) {
      const a = officeProject(x, .8), b = officeProject(x, 3.2);
      poly([{ x: a.x, y: a.y - 40 }, { x: b.x, y: b.y - 40 }, b, a], '#7db1cb24');
      poly([{ x: a.x + 4, y: a.y - 36 }, { x: a.x + 9, y: a.y - 33 }, { x: b.x + 7, y: b.y - 5 }, { x: b.x + 2, y: b.y - 8 }], '#b4cdce22');
      r(a.x, a.y - 43, 2, 44, '#101d30'); r(b.x, b.y - 43, 2, 44, '#101d30');
      beam(x, .8, x, 3.2, 42, '#607995');
    }
    block(.9, 3.2, 2, .08, 40, '#778298', '#4d586a55', '#4d586a55');
  });
  layer(7.4, () => { chair(4.1, 3.6); desk(4, 3); const p = officeProject(4.5, 3.5); r(p.x - 2, p.y - 50, 4, 7, '#f3d498'); r(p.x - 2, p.y - 40, 4, 2, '#f3d498'); });
  // Reception: a colleague behind a counter, highlighted by a cyan strip.
  layer(12.2, () => {
    const p = officeProject(7.5, 5.5);
    for (const [sx, sy, w, h, color] of avatarFrames.down[0]) if (sy < 24) r(p.x - 12 + sx, p.y - 33 + sy, w, h, color === '#30516b' ? '#6b5376' : color);
    block(7, 5.4, .95, .6, 17, '#b0a09f', '#51516d', '#373e59');
    block(7, 5.98, .95, .03, 5, '#75eee2', '#75eee2');
    monitor(p.x + 7, p.y - 25); r(p.x + 12, p.y - 15, 4, 5, '#37546b'); r(p.x + 13, p.y - 14, 2, 2, '#74d7cd');
  });
  layer(8.5, () => {
    block(2, 6, .9, .9, 18, '#92859a', '#40405c', '#34384f');
    const p = officeProject(2.5, 6.5); r(p.x - 8, p.y - 38, 14, 20, '#172333'); r(p.x - 6, p.y - 36, 10, 5, '#566477'); r(p.x - 3, p.y - 29, 5, 2, '#75dccd'); r(p.x - 2, p.y - 24, 5, 5, '#e3d2b8'); r(p.x - 3, p.y - 19, 9, 2, '#546b80');
  });
  layer(10.5, () => { block(8, 2, .8, .8, 18, '#716486', '#32344d'); const p = officeProject(8.5, 2.5); r(p.x - 6, p.y - 36, 12, 17, '#10192d'); r(p.x - 4, p.y - 34, 8, 12, '#9a4d87'); r(p.x - 2, p.y - 31, 4, 2, '#eeb1dc'); });
  if (scenario !== 'bedroom') {
    for (let i = 0; i < 3; i++) layer(16.5 + i, () => {
      const x = 7 + i;
      if (scenario === 'network') {
        block(x, 7.1, .8, 2.4, 33, '#63708a', '#35435b', '#202f47'); const p = officeProject(x + .8, 9.4);
        for (let row = 0; row < 5; row++) { r(p.x - 12, p.y - 29 + row * 5, 11, 3, '#101c32'); r(p.x - 11, p.y - 28 + row * 5, 2, 1, row % 2 ? '#8be6c7' : '#ca9ad1'); }
      } else {
        block(x, 7, .08, 2.9, 27, '#8890a3', '#49556c', '#2f3c54'); desk(x, 7.2, true, true); chair(x + .5, 8.9);
        const p = officeProject(x + .05, 9.7); r(p.x - 1, p.y - 23, 1, 21, i % 2 ? '#84dbd3' : '#d795dc');
      }
    });
  }
  for (const [x, y] of [[.1, 5], [.1, 9], [5.5, .1], [9.8, .2]]) layer(x + y + 1, () => plant(x, y, .9));
  layer(14.8, () => {
    block(9, 5, .9, .9, 2, '#8e82ad', '#45455f'); const p = officeProject(9.5, 5.5);
    r(p.x - 10, p.y - 27, 21, 25, '#19283d'); r(p.x - 8, p.y - 25, 17, 22, '#438487'); r(p.x - 6, p.y - 24, 6, 18, '#568ca0'); r(p.x + 1, p.y - 24, 6, 18, '#71b1b1'); r(p.x, p.y - 25, 1, 23, '#203249'); r(p.x - 2, p.y - 14, 1, 4, '#c5e8d6');
  });
  map.labels.push({ x: 353, y: 101, text: company.length > 26 ? company.slice(0, 24) + '..' : company, color: '#d3a1e6' });
  map.entities.sort((a, b) => a.depth - b.depth);
  const objectLabels = { terminal: copy.workstation[locale], team: copy.npc[locale], coffee: copy.coffee[locale], secret: copy.secret[locale], portal: locale === 'es' ? 'Volver a la ciudad' : 'Return to town' };
  for (const object of map.objects) {
    const p = officeProject(object.x + .5, object.y + .5);
    object.hit = [p.x - 16, p.y - (object.id === 'terminal' ? 42 : 36), 32, object.id === 'terminal' ? 49 : 43];
    object.label = objectLabels[object.id as keyof typeof objectLabels] ?? object.label;
  }
}
