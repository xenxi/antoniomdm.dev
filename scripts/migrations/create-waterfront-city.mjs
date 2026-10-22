// ES: Captura y conversión puntual de la ciudad; no modifica actores ni interiores.
// EN: One-off city capture and conversion; leaves actors and interiors untouched.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';
const directory = 'godot/career/assets/environments/waterfront';
mkdirSync(directory, { recursive: true });
const browser = await chromium.launch();
let capture;
try {
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4321/profile/?view=reading', { waitUntil: 'networkidle' });
  for (const locale of ['es', 'en']) {
    const value = await page.evaluate(async locale => {
      const { makePixelMap, mapPath, mapWalkable, prepareSceneArt, rasterize, townForeground, occlusionEdgeAt, townSpawn, layout } = await import('/scripts/migrations/waterfront-capture.ts');
      const map = makePixelMap('town', [], locale);
      const routes = map.objects.map(object => ({ id: object.id, walkable: mapWalkable(map, object.x, object.y), steps: mapPath(map, townSpawn, object).length }));
      await prepareSceneArt(map);
      const art = rasterize(map, false);
      if (!art.detailed) throw Error('Waterfront illustration did not load');
      const layers = townForeground(false);
      const profiles = layers.map((layer, i) => Array.from({ length: Math.ceil(art.entities[i].bounds[2] / 4) }, (_, column) => [column * 12.8, occlusionEdgeAt(layer.footprint, art.entities[i].bounds[0] + column * 4 + 2)]));
      return { map, spawn: townSpawn, routes, boundary: layout.waterfrontBoundary, sites: layout.waterfrontSites.concat(layout.waterfrontDecor), gardens: layout.waterfrontGardens, stops: layout.waterfrontStops, layers, profiles, background: art.background.toDataURL(), entities: art.entities.map(entity => ({ bounds: entity.bounds, data: entity.canvas.toDataURL() })) };
    }, locale);
    console.log(locale, value.routes);
    if (value.routes.some(route => !route.walkable || !route.steps)) throw Error('Unreachable entrance / Entrada inaccesible');
    writeFileSync(`${directory}/background-${locale}.png`, Buffer.from(value.background.split(',')[1], 'base64'));
    await sharp(Buffer.from(value.background.split(',')[1], 'base64')).webp({ quality: 92 }).toFile(`public/images/job-route/waterfront-map-${locale}.webp`);
    value.entities.forEach((entity, index) => writeFileSync(`${directory}/entity-${index}-${locale}.png`, Buffer.from(entity.data.split(',')[1], 'base64')));
    capture = value;
  }
} finally { await browser.close(); }
const { map, spawn, sites, layers, profiles, entities, boundary, gardens, stops } = capture;
const n = value => Math.round(value * 10000) / 10000;
const v = point => `Vector2(${point.map(n).join(', ')})`;
const poly = points => `PackedVector2Array(${points.flat().map(n).join(', ')})`;
const relative = (points, origin) => points.map(point => point.map((p, i) => p - origin[i]));
const project = (x, y) => [map.ox + map.axes[0] * x + map.axes[2] * y, map.oy + map.axes[1] * x + map.axes[3] * y];
let resources = `[ext_resource type="Script" path="res://worlds/world.gd" id="World"]
[ext_resource type="Script" path="res://components/navigation/world_grid.gd" id="Grid"]
[ext_resource type="Script" path="res://components/interaction/interactable.gd" id="Interaction"]
[ext_resource type="Script" path="res://components/animation/localized_sprite.gd" id="Localized"]
[ext_resource type="Script" path="res://components/animation/occlusion_art.gd" id="Occlusion"]
[ext_resource type="Script" path="res://components/ambience/living_town.gd" id="LivingTown"]
[ext_resource type="PackedScene" path="res://actors/player/player.tscn" id="Player"]
[ext_resource type="Texture2D" path="res://assets/environments/waterfront/background-es.png" id="BackgroundEs"]
[ext_resource type="Texture2D" path="res://assets/environments/waterfront/background-en.png" id="BackgroundEn"]
`;
let nodes = `[node name="City" type="Node2D"]
y_sort_enabled = true
script = ExtResource("World")
world_id = "town"
layout = SubResource("Layout")
background_es = ExtResource("BackgroundEs")
background_en = ExtResource("BackgroundEn")
[node name="Background" type="Sprite2D" parent="."]
z_index = -10
texture = ExtResource("BackgroundEs")
centered = false
scale = Vector2(0.3125, 0.3125)
[node name="WalkableArea" type="Polygon2D" parent="."]
visible = false
polygon = ${poly(boundary)}
[node name="Spawns" type="Node2D" parent="."]
[node name="Entry" type="Marker2D" parent="Spawns"]
position = ${v(project(spawn.x + .5, spawn.y + .5))}
[node name="Player" parent="." instance=ExtResource("Player")]
position = ${v(project(spawn.x + .5, spawn.y + .5))}
`;
for (const [i, layer] of layers.entries()) {
  const site = sites.find(site => site.id === layer.id);
  const footprint = site?.footprint ?? gardens[Number(layer.id.split('-')[1])];
  const origin = footprint.reduce((a, b) => a[1] > b[1] ? a : b);
  const object = map.objects.find(object => object.id === layer.id);
  const name = `Object_${layer.id}`;
  for (const locale of ['es', 'en']) resources += `[ext_resource type="Texture2D" path="res://assets/environments/waterfront/entity-${i}-${locale}.png" id="Art${i}${locale}"]\n`;
  nodes += `[node name="${name}" type="Node2D" parent="."]
position = ${v(origin)}
y_sort_enabled = true
`;
  if (object) nodes += `script = ExtResource("Interaction")
interaction_id = "${object.id}"
label = {"es": "${site.name}", "en": "${site.name}"}
action = "${object.id === 'freelance' ? 'world' : 'portfolio'}"
destination = "freelance"
content_id = "${object.id}"
[node name="Approach" type="Marker2D" parent="${name}"]
position = ${v(relative([project(object.x + .5, object.y + .5)], origin)[0])}
[node name="HitArea" type="Area2D" parent="${name}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${name}/HitArea"]
polygon = ${poly(relative(layer.polygon, origin))}
`;
  nodes += `[node name="Body" type="StaticBody2D" parent="${name}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${name}/Body"]
polygon = ${poly(relative(footprint, origin))}
[node name="Art" type="Node2D" parent="${name}"]
y_sort_enabled = true
script = ExtResource("Occlusion")
bounds = Rect2(${entities[i].bounds.map(n).join(', ')})
depth_profile = ${poly(profiles[i])}
texture_es = ExtResource("Art${i}es")
texture_en = ExtResource("Art${i}en")
`;
}
nodes += `[node name="LivingTown" type="Node2D" parent="."]
y_sort_enabled = true
script = ExtResource("LivingTown")
population = 12
`;
writeFileSync('godot/career/worlds/city/city.tscn', `[gd_scene format=3]\n${resources}
[sub_resource type="Resource" id="Layout"]
script = ExtResource("Grid")
size = Vector2i(${map.width}, ${map.height})
origin = ${v([map.ox, map.oy])}
axis_x = ${v(map.axes.slice(0, 2))}
axis_y = ${v(map.axes.slice(2, 4))}
${nodes}`);
writeFileSync(`${directory}/navigation.json`, JSON.stringify({ blocked: map.blocked, spawn, stops, entrances: map.objects.map(({ id, x, y }) => ({ id, x, y })) }, null, 2));
console.log('Waterfront scene and localized layers saved. / Escena y capas bilingües guardadas.');
