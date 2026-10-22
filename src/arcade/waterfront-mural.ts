// ES: El mural reutiliza el fondo original de la web, sin recrear a la familia.
// EN: The mural reuses the site's original wallpaper without recreating the family.
export const waterfrontMuralAsset = '/wallpaper-midnight.webp';

export function paintWaterfrontMural(ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  ctx.save();
  // ES: Coordenadas del muro lateral, medidas sobre el escenario original.
  // EN: Side-wall coordinates measured against the original scenery.
  ctx.translate(1120 / 3.2, 268 / 3.2);
  ctx.transform(1, -.46, 0, 1, 0, 0);
  const width = 204 / 3.2, height = 228 / 3.2;
  ctx.beginPath(); ctx.rect(0, 0, width, height); ctx.clip();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, 500, 190, 620, 650, 0, 0, width, height);
  // ES: Una veladura integra la ilustración en la iluminación del edificio.
  // EN: A light glaze blends the illustration into the building's lighting.
  ctx.fillStyle = 'rgba(19, 32, 57, .12)'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(123, 151, 186, .3)'; ctx.lineWidth = .35;
  ctx.strokeRect(0, 0, width, height);
  ctx.restore();
}
