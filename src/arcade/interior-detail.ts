// Shared materials and lighting tie the cutaway interiors to the night-time town.
import type { Furnishing, CompanyScene } from './company-scenes';
type Project = (x: number, y: number, z?: number) => [number, number];
type Polygon = (ctx: CanvasRenderingContext2D, points: number[][], color: string) => void;

export function roomDetail(ctx: CanvasRenderingContext2D, scene: CompanyScene, project: Project, poly: Polygon, tile: number, home: boolean) {
  const line = (a: number[], b: number[], color: string, width = .35) => { ctx.strokeStyle = color; ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); };
  // Fine wood grain at home; inset polished stone and carpet seams in offices.
  for (let y = 0; y < scene.height; y++) for (let x = 0; x < scene.width; x++) {
    if (home) {
      for (let i = 1; i < 5; i++) {
        const offset = ((x * 13 + y * 7 + i) % 5) / 45;
        line(project(x + .06, y + i / 5), project(x + .94, y + i / 5 + offset), i % 2 ? '#edbd8730' : '#1d223434', .22);
      }
    } else {
      line(project(x + .06, y + .94), project(x + .94, y + .94), '#d4edff20', .25);
      line(project(x + .94, y + .07), project(x + .94, y + .94), '#d4edff15', .25);
    }
  }
  // Lit plinth, skirting and wall mouldings. These surfaces have no collisions.
  for (const z of [1.4, 3.2, 31]) {
    line(project(0, 0, z), project(scene.width, 0, z), z === 3.2 ? '#80d8ed80' : '#131d37', .7);
    line(project(0, 0, z), project(0, scene.height, z), z === 3.2 ? '#efbd8d80' : '#131d37', .7);
  }
  for (let x = 1; x < scene.width - 1; x += 3) {
    // Deep window recess with distant city silhouettes and individually lit windows.
    poly(ctx, [project(x, 0, 10), project(x + 1.8, 0, 10), project(x + 1.8, 0, 29), project(x, 0, 29)], '#182438');
    poly(ctx, [project(x + .1, 0, 11), project(x + 1.7, 0, 11), project(x + 1.7, 0, 28), project(x + .1, 0, 28)], '#213953');
    for (let b = 0; b < 5; b++) {
      const bx = x + .13 + b * .3, height = 6 + (b * 7 + x) % 10;
      poly(ctx, [project(bx, 0, 11), project(bx + .27, 0, 11), project(bx + .27, 0, 11 + height), project(bx, 0, 11 + height)], '#101e36');
      for (let h = 13; h < 10 + height; h += 2.4) {
        const [px, py] = project(bx + .12, 0, h); ctx.fillStyle = (b + h + x) % 3 < 1 ? '#edbe86' : '#6c99ae'; ctx.fillRect(px, py, .5, .85);
      }
    }
    for (const xx of [x, x + .9, x + 1.8]) line(project(xx, 0, 10), project(xx, 0, 29), '#87acbb', .6);
    line(project(x, 0, 28.5), project(x + 1.8, 0, 28.5), '#bee7ed', .5);
    // Reflections lie on the floor, leaving movement and objective tiles legible.
    poly(ctx, [project(x + .1, .12), project(x + 1.7, .12), project(x + 2.8, 3), project(x + .8, 3)], '#83bed319');
    for (let r = 0; r < 7; r++) line(project(x + .3 + r * .06, .4 + r * .26), project(x + 1.6 + r * .14, .4 + r * .26), '#b3e6f019', .35);
  }
  // Warm sconces, framed prints and slatted wall panels along the opposite wall.
  for (let y = 1; y < scene.height - 1; y += 3) {
    const [px, py] = project(0, y + .5, 21);
    const glow = ctx.createRadialGradient(px, py, 0, px, py, tile * 1.5); glow.addColorStop(0, '#ffca8055'); glow.addColorStop(1, '#ffbd7000'); ctx.fillStyle = glow; ctx.fillRect(px - tile * 1.5, py - tile * 1.5, tile * 3, tile * 3);
    ctx.fillStyle = '#142033'; ctx.fillRect(px - 1.6, py - 3.5, 3.2, 7); ctx.fillStyle = '#ffdfaa'; ctx.fillRect(px - .7, py - 2.7, 1.4, 5.4);
    const a = y + 1;
    poly(ctx, [project(.02, a, 11), project(.02, a + .9, 11), project(.02, a + .9, 25), project(.02, a, 25)], '#bd9b72');
    poly(ctx, [project(.03, a + .08, 12), project(.03, a + .82, 12), project(.03, a + .82, 24), project(.03, a + .08, 24)], '#24394e');
    for (let k = 0; k < 5; k++) line(project(.04, a + .15, 14 + k * 1.6), project(.04, a + .6 + (k % 2) * .1, 14 + k * 1.6), k % 2 ? '#80aead' : '#dfa674', .7);
  }
}

export function furnitureDetail(g: CanvasRenderingContext2D, item: Furnishing, s: number, project: Project, poly: Polygon) {
  const { x, y, kind } = item, [px, py] = project(x + .5, y + .5);
  const line = (a: number[], b: number[], color: string, width = .3) => { g.strokeStyle = color; g.lineWidth = width; g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); };
  if (kind === 'desk' || kind === 'table') {
    for (let i = 0; i < 8; i++) line(project(x, y + .16 + i * .085, s * .65 + 3.1), project(x + 1, y + .18 + i * .085, s * .65 + 3.1), i % 2 ? '#6e4b4930' : '#fff1c735', .2);
    // Open notebook, spine, page rules, pen and a saucer.
    poly(g, [project(x + .64, y + .18, s * .65 + 3.2), project(x + 1, y + .18, s * .65 + 3.2), project(x + 1, y + .52, s * .65 + 3.2), project(x + .64, y + .52, s * .65 + 3.2)], '#ecdec5');
    for (let i = 0; i < 4; i++) line(project(x + .7, y + .23 + i * .06, s * .65 + 3.3), project(x + .94, y + .23 + i * .06, s * .65 + 3.3), '#6d7c9177', .22);
    if (kind === 'desk') {
      const glow = g.createRadialGradient(px, py - s, .2, px, py - s, s * 1.15); glow.addColorStop(0, '#5ddde521'); glow.addColorStop(1, '#5ddde500'); g.fillStyle = glow; g.fillRect(px - s * 1.2, py - s * 2.2, s * 2.4, s * 2.4);
      g.fillStyle = '#17273d'; g.fillRect(px - s * .34, py - s * 1.42, s * .65, s * .42);
      g.fillStyle = '#43576e'; g.fillRect(px - s * .34, py - s * 1.42, s * .65, s * .055);
      for (let row = 0; row < 6; row++) { g.fillStyle = ['#74d9d6', '#b9abd7', '#dfc598'][row % 3]; g.fillRect(px - s * .28 + (row % 2) * s * .035, py - s * 1.31 + row * s * .043, s * (.17 + (row % 3) * .085), .3); }
      for (let row = 0; row < 3; row++) for (let col = 0; col < 7; col++) { const [kx, ky] = project(x + .3 + col * .045, y + .48 + row * .045, s * .7 + 1.2); g.fillStyle = '#a6c4cd'; g.fillRect(kx, ky, .4, .25); }
      line([px, py - s * .98], [px, py - s * .8], '#647788', 1.1);
      line(project(x + .28, y + .3, s * .65), project(x + .22, y + .3, 1), '#202d40', .5);
    }
  }
  if (kind === 'rack') {
    for (let row = 0; row < 5; row++) {
      const yy = py - s * 1.48 + row * s * .24;
      g.fillStyle = '#152a3d'; g.fillRect(px - s * .3, yy, s * .62, s * .14);
      for (let k = 0; k < 6; k++) { g.fillStyle = k > 3 ? '#e8bb75' : '#81dbc4'; g.fillRect(px - s * .26 + k * s * .08, yy + s * .03, .5, .5); }
      for (let k = 0; k < 6; k++) { g.fillStyle = '#8a9eae'; g.fillRect(px - s * .26 + k * s * .08, yy + s * .09, .5, .2); }
    }
  }
  if (kind === 'board') {
    for (let i = 0; i < 4; i++) { const yy = py - s * 1.47 + i * s * .27; g.fillStyle = '#364755'; g.fillRect(px - s * .28, yy + s * .04, s * .35, .4); g.fillRect(px - s * .28, yy + s * .08, s * .23, .3); }
    line([px - s * .25, py - s * .8], [px + s * .25, py - s * .65], '#84c3c2', .55);
  }
  if (kind === 'sofa' || kind === 'bed') {
    for (let i = 0; i < 3; i++) {
      const xx = x - .2 + i * .48;
      poly(g, [project(xx, y + .25, s * .38), project(xx + .43, y + .25, s * .38), project(xx + .43, y + .8, s * .38), project(xx, y + .8, s * .38)], kind === 'bed' ? ['#586d8b', '#617d9a', '#7391a8'][i] : ['#6a7f91', '#7b92a0', '#718a97'][i]);
      line(project(xx + .04, y + .28, s * .39), project(xx + .39, y + .28, s * .39), '#d9d5cc88', .25);
    }
  }
  if (kind === 'coffee' || kind === 'washer' || kind === 'sink') {
    for (let i = 0; i < 4; i++) { g.fillStyle = ['#87dccb', '#ecbc78', '#354c62', '#354c62'][i]; g.fillRect(px - s * .26 + i * s * .15, py - s * .85, .7, .7); }
    if (kind === 'sink') { g.strokeStyle = '#dce9e3'; g.lineWidth = 1; g.beginPath(); g.arc(px, py - s, s * .13, Math.PI, 0); g.lineTo(px + s * .13, py - s * .82); g.stroke(); }
    if (kind === 'washer') { g.strokeStyle = '#dae4df'; g.lineWidth = .6; g.beginPath(); g.arc(px, py - s * .57, s * .24, 0, Math.PI * 2); g.stroke(); }
  }
  if (kind === 'plant') {
    for (let i = 0; i < 23; i++) {
      const angle = i * 2.399, radius = s * (.12 + (i % 5) * .055), lx = px + Math.cos(angle) * radius, ly = py - s * .85 + Math.sin(angle) * radius * .9;
      line([px, py - s * .4], [lx, ly], '#3d725d', .35);
      g.fillStyle = ['#3a6857', '#497f63', '#679974', '#87b08a'][i % 4]; g.beginPath(); g.ellipse(lx, ly, s * .11, s * .045, angle, 0, Math.PI * 2); g.fill();
      line([lx, ly], [lx + Math.cos(angle) * s * .08, ly + Math.sin(angle) * s * .08], '#abd09677', .2);
    }
  }
}
