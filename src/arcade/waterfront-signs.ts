import { waterfrontSites, waterfrontDecor } from './waterfront-layout';
import type { Locale } from '../i18n/core';
// ES: Rótulos reales por idioma; el fondo no contiene texto.
// EN: Real localized signage; the background contains no text.
export function paintWaterfrontSigns(ctx: CanvasRenderingContext2D, locale: Locale) {
  for (const site of [...waterfrontSites, ...waterfrontDecor]) {
    ctx.save(); ctx.translate(site.sign[0], site.sign[1]); ctx.transform(1, site.slope, 0, 1, 0, 0);
    const main = site.id === 'freelance';
    ctx.fillStyle = site.id === 'system-recovery' ? '#30384f' : site.color; ctx.shadowColor = site.color; ctx.shadowBlur = site.id === 'system-recovery' ? 0 : main ? 5 : 2;
    ctx.textAlign = 'left'; ctx.font = `bold ${main ? 12 : site.signWidth < 20 ? 3.2 : 7}px monospace`;
    ctx.fillText(site.name, 0, main ? 5 : 0, site.signWidth);
    if (main) {
      ctx.shadowBlur = 0; ctx.font = '2.9px monospace'; ctx.fillStyle = '#c7ebf3';
      ctx.fillText(locale === 'es' ? 'CONSTRUYE TU SIGUIENTE PASO' : 'BUILD YOUR NEXT CHAPTER', 0, 11, site.signWidth);
    }
    ctx.restore();
  }
  ctx.save(); ctx.translate(162, 280); ctx.transform(1, .46, 0, 1, 0, 0);
  ctx.fillStyle = '#ffc96c'; ctx.font = 'bold 6px monospace'; ctx.fillText('AntoñiOS', 0, 0);
  ctx.font = '2.8px monospace'; ctx.fillText(locale === 'es' ? 'VILLA TRAYECTORIA' : 'CAREER TOWN', 0, 5);
  ctx.restore();
}
