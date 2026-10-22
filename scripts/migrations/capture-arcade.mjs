// One-time capture of existing artwork, not part of the build or authoring workflow.
// Captura puntual del arte existente; no forma parte del build ni de la autoría.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';

const output = 'godot/career';
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4322/profile/?view=reading', { waitUntil: 'networkidle' });
  const content = await page.evaluate(async () => {
    const campaign = await import('/src/arcade/campaign.ts');
    const quests = await import('/src/arcade/quest-content.ts');
    return { chapters: campaign.chapters, missions: campaign.missions, personalEvents: campaign.personalEvents, copy: campaign.copy, sideQuests: quests.sideQuests, questCopy: quests.questCopy, freelanceChapterIds: campaign.freelanceChapterIds };
  });
  mkdirSync(`${output}/data/campaign`, { recursive: true });
  const resource = ['[gd_resource type="Resource" script_class="CampaignCatalog" load_steps=2 format=3]', '[ext_resource type="Script" path="res://systems/quest/campaign_catalog.gd" id="1"]', '[resource]', 'script = ExtResource("1")'];
  for (const [property, source] of Object.entries({ chapters: 'chapters', missions: 'missions', side_quests: 'sideQuests', personal_events: 'personalEvents' })) resource.push(`${property} = Array[Dictionary](${JSON.stringify(content[source], null, '\t')})`);
  resource.push(`copy = ${JSON.stringify(content.copy, null, '\t')}`, `quest_copy = ${JSON.stringify(content.questCopy, null, '\t')}`, `freelance_chapter_ids = Array[String](${JSON.stringify(content.freelanceChapterIds)})`);
  writeFileSync(`${output}/data/campaign/catalog.tres`, resource.join('\n') + '\n');
  for (const id of ['town', 'freelance']) {
    for (const locale of ['es', 'en']) {
      const captured = await page.evaluate(async ({ id, locale }) => {
        const { makePixelMap } = await import('/src/arcade/pixel-map.ts');
        const { makeCompanyMap, companyScenes } = await import('/src/arcade/company-scenes.ts');
        const { chapters } = await import('/src/arcade/campaign.ts');
        const { prepareSceneArt } = await import('/src/arcade/scene-art.ts');
        const { rasterize } = await import('/src/arcade/godot-art.ts');
        const { buildings, trees } = await import('/src/arcade/town.ts');
        const { townForeground } = await import('/src/arcade/town-scene.ts');
        const signs = chapters.map(chapter => ({ id: chapter.id, name: chapter.id, unlocked: chapter.id === 'freelance', complete: false }));
        const map = id === 'town' ? makePixelMap('town', signs, locale) : makeCompanyMap(id, locale, id);
        await prepareSceneArt(map);
        const art = rasterize(map);
        if (id === 'town') {
          const context = art.background.getContext('2d');
          context.save(); context.resetTransform(); context.scale(3.2, 3.2); context.fillStyle = '#162838';
          for (const layer of townForeground()) {
            context.beginPath(); layer.polygon.forEach(([x, y], i) => i ? context.lineTo(x, y) : context.moveTo(x, y)); context.closePath(); context.fill();
          }
          context.restore();
        }
        return { map, buildings: id === 'town' ? buildings : undefined, trees: id === 'town' ? trees : undefined, furniture: companyScenes[id]?.furniture, background: art.background.toDataURL(), entities: art.entities.map(entity => ({ ...entity, canvas: entity.canvas.toDataURL() })) };
      }, { id, locale });
      const directory = `${output}/assets/environments/${id}`;
      mkdirSync(directory, { recursive: true });
      writeFileSync(`${directory}/background-${locale}.png`, Buffer.from(captured.background.split(',')[1], 'base64'));
      if (locale === 'en') {
        for (const [index, entity] of captured.entities.entries()) {
          const bytes = Buffer.from(entity.canvas.split(',')[1], 'base64');
          if (!bytes.equals(readFileSync(`${directory}/entity-${index}.png`))) writeFileSync(`${directory}/entity-${index}-en.png`, bytes);
        }
      }
      if (locale === 'es') {
        for (const [index, entity] of captured.entities.entries()) {
          writeFileSync(`${directory}/entity-${index}.png`, Buffer.from(entity.canvas.split(',')[1], 'base64'));
          delete entity.canvas;
        }
        delete captured.background;
        writeFileSync(`${directory}/capture.json`, JSON.stringify(captured, null, 2) + '\n');
      }
    }
  }
} finally {
  await browser.close();
}
