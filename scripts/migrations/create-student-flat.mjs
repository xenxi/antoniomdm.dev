// ES: Exportación puntual del piso; conserva el resto de escenas y actores.
// EN: One-time apartment export; preserves every other scene and actor.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const root = 'godot/career';
const directory = `${root}/assets/environments/freelance`;
const number = n => Math.round(n * 10000) / 10000;
const vec = p => `Vector2(${p.map(number).join(', ')})`;
const poly = p => `PackedVector2Array(${p.flat().map(number).join(', ')})`;
const quote = JSON.stringify;
mkdirSync(directory, {recursive:true});
const browser = await chromium.launch();
let captured;
try {
  const page=await browser.newPage();
  await page.goto(`${process.env.FLAT_CAPTURE_URL || 'http://127.0.0.1:4322'}/profile/?view=reading`,{waitUntil:'networkidle'});
  for(const locale of ['es','en']){
    const result=await page.evaluate(async locale=>{
      const {makeStudentFlat,flatBoundary,flatObstacles,flatForeground,flatObjects,residentLines,flatDoors}=await import('/src/arcade/student-flat.ts');
      const {prepareSceneArt}=await import('/src/arcade/scene-art.ts');
      const {rasterize}=await import('/src/arcade/godot-art.ts');
      const {occlusionEdgeAt}=await import('/src/arcade/town-scene.ts');
      const map=makeStudentFlat(locale,'freelance',[],0);await prepareSceneArt(map);
      const art=rasterize(map,false), foreground=flatForeground();
      return {map,boundary:flatBoundary,obstacles:flatObstacles,objects:flatObjects,residentLines,doors:flatDoors,
        background:art.background.toDataURL(),entities:art.entities.map((e,index)=>{
          const profile=[];for(let col=0;col<e.canvas.width;col+=12.8)profile.push([col,occlusionEdgeAt(foreground[index].footprint,e.bounds[0]+(col+6.4)/3.2)]);
          return {bounds:e.bounds,profile,image:e.canvas.toDataURL()};
        })};
    },locale);
    writeFileSync(`${directory}/background-${locale}.png`,Buffer.from(result.background.split(',')[1],'base64'));
    if(locale==='es'){
      captured=result;
      for(const [i,e] of result.entities.entries())writeFileSync(`${directory}/flat-entity-${i}.png`,Buffer.from(e.image.split(',')[1],'base64'));
    }
  }
} finally {await browser.close();}
let external=`[ext_resource type="Script" path="res://worlds/world.gd" id="World"]
[ext_resource type="Script" path="res://components/navigation/world_grid.gd" id="Grid"]
[ext_resource type="Script" path="res://components/interaction/interactable.gd" id="Interaction"]
[ext_resource type="Script" path="res://components/animation/apartment_doors.gd" id="Doors"]
[ext_resource type="Script" path="res://components/ambience/student_residents.gd" id="Residents"]
[ext_resource type="PackedScene" path="res://actors/player/player.tscn" id="Player"]
[ext_resource type="PackedScene" path="res://actors/npc/npc.tscn" id="NPC"]
[ext_resource type="Resource" path="res://data/npcs/flatmate.tres" id="Flatmate"]
[ext_resource type="Texture2D" path="res://assets/environments/freelance/background-es.png" id="Es"]
[ext_resource type="Texture2D" path="res://assets/environments/freelance/background-en.png" id="En"]
`;
const spawn=[(captured.map.spawn.x+.5)*6,(captured.map.spawn.y+.5)*6];
let nodes=`[node name="Freelance" type="Node2D"]
y_sort_enabled = true
script = ExtResource("World")
world_id = "freelance"
layout = SubResource("Layout")
background_es = ExtResource("Es")
background_en = ExtResource("En")
[node name="Background" type="Sprite2D" parent="."]
z_index = -10
texture = ExtResource("Es")
centered = false
scale = Vector2(0.3125, 0.3125)
[node name="WalkableArea" type="Polygon2D" parent="."]
visible = false
polygon = ${poly(captured.boundary)}
[node name="Spawns" type="Node2D" parent="."]
[node name="Entry" type="Marker2D" parent="Spawns"]
position = ${vec(spawn)}
[node name="Player" parent="." instance=ExtResource("Player")]
position = ${vec(spawn)}
[node name="Residents" type="Node2D" parent="."]
y_sort_enabled = true
script = ExtResource("Residents")
[node name="Doors" type="Node2D" parent="."]
z_index = -1
script = ExtResource("Doors")
doorways = Array[Dictionary](${quote(captured.doors)})
`;
for(const [index,points] of captured.obstacles.entries()){

  nodes+=`[node name="Furniture${index}" type="Node2D" parent="."]
y_sort_enabled = true
[node name="Body" type="StaticBody2D" parent="Furniture${index}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="Furniture${index}/Body"]
polygon = ${poly(points)}
`;
}
for(const object of captured.objects){
  const name=`Object_${object.id}`, point=object.point;
  const hit=object.hit, shape=[[hit[0],hit[1]],[hit[0]+hit[2],hit[1]],[hit[0]+hit[2],hit[1]+hit[3]],[hit[0],hit[1]+hit[3]]].map(p=>[p[0]-point[0],p[1]-point[1]]);
  if(object.id==='team'){
    nodes+=`[node name="${name}" parent="." instance=ExtResource("NPC")]
position = ${vec(point)}
configuration = ExtResource("Flatmate")
[node name="Body" parent="${name}" index="1"]
collision_layer = 0
[node name="CollisionPolygon2D" parent="${name}/Body" index="0"]
disabled = true
`;
  }else{
    const resident=object.id==='cape'||object.id==='hairy';
    if(resident){
      const lines=captured.residentLines[object.id];
      writeFileSync(`${root}/data/dialogues/${object.id}.tres`,`[gd_resource type="Resource" script_class="ArcadeDialogue" load_steps=2 format=3]
[ext_resource type="Script" path="res://components/dialogue/dialogue_data.gd" id="1"]
[resource]
script = ExtResource("1")
id = ${quote(object.id)}
speaker = ${quote(object.label)}
lines = Array[Dictionary]([${quote(lines)}])
`);
    }
    nodes+=`[node name="${name}" type="Node2D" parent="."]
position = ${vec(point)}
script = ExtResource("Interaction")
interaction_id = ${quote(object.id)}
label = ${quote(object.label)}
action = "${resident?'dialogue':object.id==='portal'?'world':'campaign'}"
destination = "town"
${resident?`dialogue_path = "res://data/dialogues/${object.id}.tres"\n`:''}[node name="Approach" type="Marker2D" parent="${name}"]
[node name="HitArea" type="Area2D" parent="${name}"]
[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${name}/HitArea"]
polygon = ${poly(shape)}
`;
  }
}
writeFileSync(`${root}/worlds/freelance/freelance.tscn`,`[gd_scene format=3]\n${external}
[sub_resource type="Resource" id="Layout"]
script = ExtResource("Grid")
size = Vector2i(80, 54)
origin = Vector2(0, 0)
axis_x = Vector2(6, 0)
axis_y = Vector2(0, 6)
${nodes}
[editable path="Object_team"]
`);
for(const e of captured.entities)delete e.image;
delete captured.background;
writeFileSync(`${directory}/student-flat-capture.json`,quote(captured));
