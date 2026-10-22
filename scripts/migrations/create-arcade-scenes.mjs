// One-time conversion; edit the resulting scenes in Godot afterwards.
// Conversión puntual; después se editan las escenas resultantes en Godot.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
const root = 'godot/career';
const number = value => Math.round(value * 10000) / 10000;
const vec = point => `Vector2(${point.map(number).join(', ')})`;
const polygon = points => `PackedVector2Array(${points.flat().map(number).join(', ')})`;
const quote = JSON.stringify;
mkdirSync(`${root}/assets/characters`, { recursive: true });
copyFileSync('public/images/job-route/antonio-atlas.webp', `${root}/assets/characters/antonio-atlas.webp`);
const frames = ['down', 'right', 'up', 'left'];
writeFileSync(`${root}/actors/player/player.tscn`, `[gd_scene load_steps=10 format=3]
[ext_resource type="Script" path="res://actors/player/player.gd" id="1"]
[ext_resource type="Script" path="res://components/animation/actor_visual.gd" id="2"]
[ext_resource type="Texture2D" path="res://assets/characters/antonio-atlas.webp" id="3"]
${frames.map((_, i) => `[sub_resource type="AtlasTexture" id="Frame${i}"]
atlas = ExtResource("3")
region = Rect2(${i * 96}, 0, 96, 176)`).join('\n')}
[sub_resource type="SpriteFrames" id="Frames"]
animations = [${frames.map((name, i) => `{"frames": [{"duration": 1.0, "texture": SubResource("Frame${i}")}], "loop": true, "name": &"${name}", "speed": 5.0}`).join(', ')}]
[sub_resource type="CircleShape2D" id="Shape"]
radius = 3.0
[node name="Player" type="CharacterBody2D"]
script = ExtResource("1")
collision_layer = 2
collision_mask = 1
[node name="CollisionShape2D" type="CollisionShape2D" parent="."]
shape = SubResource("Shape")
[node name="Visual" type="Node2D" parent="."]
script = ExtResource("2")
[node name="AnimatedSprite2D" type="AnimatedSprite2D" parent="Visual"]
position = Vector2(0, -12.76)
scale = Vector2(0.145, 0.145)
sprite_frames = SubResource("Frames")
animation = &"down"
[node name="InteractionArea" type="Area2D" parent="."]
collision_layer = 0
collision_mask = 4
[node name="CollisionShape2D" type="CollisionShape2D" parent="InteractionArea"]
shape = SubResource("Shape")
`);

for (const id of ['town', 'freelance']) {
  const capture = JSON.parse(readFileSync(`${root}/assets/environments/${id}/capture.json`, 'utf8'));
  const { map, entities } = capture;
  const axes = map.axes ?? [map.tile, map.tile / 2, -map.tile, map.tile / 2];
  const project = (x, y) => [map.ox + axes[0] * x + axes[2] * y, map.oy + axes[1] * x + axes[3] * y];
  const relative = (point, origin) => point.map((v, i) => v - origin[i]);
  const cell = (x, y, w = 1, h = 1) => [project(x, y), project(x + w, y), project(x + w, y + h), project(x, y + h)];
  let external = `[ext_resource type="Script" path="res://worlds/world.gd" id="World"]
[ext_resource type="Script" path="res://components/navigation/world_grid.gd" id="Grid"]
[ext_resource type="Script" path="res://components/interaction/interactable.gd" id="Interaction"]
[ext_resource type="Script" path="res://components/animation/localized_sprite.gd" id="Localized"]
[ext_resource type="PackedScene" path="res://actors/player/player.tscn" id="Player"]
[ext_resource type="PackedScene" path="res://actors/npc/npc.tscn" id="NPC"]
[ext_resource type="Resource" path="res://data/npcs/flatmate.tres" id="Flatmate"]
[ext_resource type="Texture2D" path="res://assets/environments/${id}/background-es.png" id="BackgroundEs"]
[ext_resource type="Texture2D" path="res://assets/environments/${id}/background-en.png" id="BackgroundEn"]
`;
  let nodes = `[node name="${id === 'town' ? 'City' : 'Freelance'}" type="Node2D"]
y_sort_enabled = true
script = ExtResource("World")
world_id = "${id}"
layout = SubResource("Layout")
background_es = ExtResource("BackgroundEs")
background_en = ExtResource("BackgroundEn")
[node name="Background" type="Sprite2D" parent="."]
z_index = -10
texture = ExtResource("BackgroundEs")
centered = false
scale = ${vec([id === 'town' ? 1 / 3.2 : 1 / 3, id === 'town' ? 1 / 3.2 : 1 / 3])}
[node name="Spawns" type="Node2D" parent="."]
[node name="Entry" type="Marker2D" parent="Spawns"]
position = ${vec(project(4.5, id === 'town' ? 6.5 : 7.5))}
[node name="Player" parent="." instance=ExtResource("Player")]
position = ${vec(project(4.5, id === 'town' ? 6.5 : 7.5))}
`;
  let layers;
  if (id === 'town') layers = [...capture.buildings.map(b => ({ ...b, depth: b.x + b.y + b.width + b.height })), ...capture.trees.map(t => ({ ...t, width: 2, height: 2, depth: t.x + t.y + 2 }))].sort((a, b) => a.depth - b.depth);
  else layers = capture.furniture.map(f => ({ ...f, width: 1, height: 1, depth: f.x + f.y + 1.5 })).sort((a, b) => a.depth - b.depth);
  const covered = new Set();
  const collision = (parent, points) => `[node name="Body" type="StaticBody2D" parent="${parent}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${parent}/Body"]
polygon = ${polygon(points)}
`;
  for (const [index, layer] of layers.entries()) {
    const entity = entities[index];
    const nodeName = `Object_${layer.id ?? index}`;
    const origin = project(layer.x + .5, layer.y + .5);
    const object = map.objects.find(o => o.id === layer.id);
    const isNpc = id === 'freelance' && layer.id === 'team';
    external += `[ext_resource type="Texture2D" path="res://assets/environments/${id}/entity-${index}.png" id="Art${index}"]\n`;
    nodes += isNpc ? `[node name="${nodeName}" parent="." instance=ExtResource("NPC")]
position = ${vec(origin)}
configuration = ExtResource("Flatmate")
` : `[node name="${nodeName}" type="Node2D" parent="."]
position = ${vec(origin)}
`;
    if (object && !isNpc) {
      const es = layer.label?.es ?? object.label;
      const en = layer.label?.en ?? object.label;
      nodes += `script = ExtResource("Interaction")
interaction_id = ${quote(object.id)}
label = {"es": ${quote(es)}, "en": ${quote(en)}}
action = "${id === 'town' ? (object.id === 'freelance' ? 'world' : 'portfolio') : 'campaign'}"
destination = "freelance"
content_id = ${quote(id === 'town' ? object.id : 'freelance')}
`;
      nodes += `[node name="Approach" type="Marker2D" parent="${nodeName}"]
position = ${vec(relative(project(object.x + .5, object.y + .5), origin))}
[node name="HitArea" type="Area2D" parent="${nodeName}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${nodeName}/HitArea"]
polygon = ${polygon((object.hitPolygon ?? [[object.hit[0], object.hit[1]], [object.hit[0] + object.hit[2], object.hit[1]], [object.hit[0] + object.hit[2], object.hit[1] + object.hit[3]], [object.hit[0], object.hit[1] + object.hit[3]]]).map(point => relative(point, origin)))}
`;
    }
    if (!isNpc) nodes += collision(nodeName, cell(layer.x, layer.y, layer.width, layer.height).map(point => relative(point, origin)));
    const bounds = entity.bounds;
    if (!isNpc) nodes += `[node name="Art" type="Sprite2D" parent="${nodeName}"]
position = ${vec(relative([bounds[0], bounds[1]], origin))}
texture = ExtResource("Art${index}")
centered = false
scale = ${vec([id === 'town' ? 1 / 3.2 : 1 / 3, id === 'town' ? 1 / 3.2 : 1 / 3])}
`;
    if (!isNpc && existsSync(`${root}/assets/environments/${id}/entity-${index}-en.png`)) {
      external += `[ext_resource type="Texture2D" path="res://assets/environments/${id}/entity-${index}-en.png" id="ArtEn${index}"]\n`;
      nodes += `script = ExtResource("Localized")\ntexture_es = ExtResource("Art${index}")\ntexture_en = ExtResource("ArtEn${index}")\n`;
    }
    for (let y = layer.y; y < layer.y + layer.height; y++) for (let x = layer.x; x < layer.x + layer.width; x++) covered.add(`${x},${y}`);
  }
  nodes += '[node name="Boundaries" type="Node2D" parent="."]\n';
  for (const [index, tile] of map.blocked.filter(tile => !covered.has(`${tile.x},${tile.y}`)).entries()) {
    nodes += `[node name="Tile${index}" type="Node2D" parent="Boundaries"]\n` + collision(`Boundaries/Tile${index}`, cell(tile.x, tile.y));
  }
  if (id !== 'town') {
    const exit = map.objects.find(o => o.id === 'portal');
    nodes += `[node name="Exit" type="Node2D" parent="."]
position = ${vec(project(exit.x + .5, exit.y + .5))}
script = ExtResource("Interaction")
interaction_id = "portal"
label = {"es": "Volver a la ciudad", "en": "Return to town"}
action = "world"
destination = "town"
[node name="HitArea" type="Area2D" parent="Exit"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="Exit/HitArea"]
polygon = PackedVector2Array(-15, -15, 15, -15, 15, 10, -15, 10)
[node name="Sign" type="Label" parent="Exit"]
offset_left = -10.0
offset_top = -22.0
text = "↗"
`;
  }
  const directory = `${root}/worlds/${id === 'town' ? 'city' : id}`;
  mkdirSync(directory, { recursive: true });
  writeFileSync(`${directory}/${id === 'town' ? 'city' : id}.tscn`, `[gd_scene format=3]\n${external}
[sub_resource type="Resource" id="Layout"]
script = ExtResource("Grid")
size = Vector2i(${map.width}, ${map.height})
origin = ${vec([map.ox, map.oy])}
axis_x = ${vec(axes.slice(0, 2))}
axis_y = ${vec(axes.slice(2, 4))}
${nodes}`);
}
