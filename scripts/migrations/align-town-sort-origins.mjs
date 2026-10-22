// ES: Migración puntual: sitúa el origen de ordenación en la base del objeto
// sin desplazar su dibujo, colisiones ni puntos de interacción.
// EN: One-off migration: move each sort origin to its footprint's bottom
// without moving art, collisions or interaction anchors.
import { readFileSync, writeFileSync } from 'node:fs';
const path = 'godot/career/worlds/city/city.tscn';
const text = readFileSync(path, 'utf8');
const sections = text.split(/(?=\[node )/);
const number = value => Math.round(value * 10000) / 10000;
let changed = 0;
for (let i = 0; i < sections.length; i++) {
  const root = sections[i].match(/^\[node name="(Object_[^"]+)" type="Node2D" parent="\."\]/);
  if (!root) continue;
  const name = root[1];
  const body = sections.find(section => section.startsWith(`[node name="CollisionPolygon2D" type="CollisionPolygon2D" parent="${name}/Body"]`));
  if (!body) continue;
  const points = body.match(/polygon = PackedVector2Array\(([^)]+)\)/)[1].split(',').map(Number);
  const bodyNode = sections.find(section => section.startsWith(`[node name="Body" type="StaticBody2D" parent="${name}"]`));
  const offset = bodyNode.match(/position = Vector2\([^,]+, ([^)]+)\)/);
  const shift = Math.max(...points.filter((_, index) => index % 2)) + Number(offset?.[1] ?? 0);
  if (Math.abs(shift) < .001) continue;
  sections[i] = sections[i].replace(/position = Vector2\(([^,]+), ([^)]+)\)/, (_, x, y) => `position = Vector2(${x}, ${number(Number(y) + shift)})`);
  for (let j = i + 1; j < sections.length && !/^\[node .*parent="\."\]/.test(sections[j]); j++) {
    if (!sections[j].split('\n')[0].includes(`parent="${name}"`)) continue;
    const position = /position = Vector2\(([^,]+), ([^)]+)\)/;
    sections[j] = position.test(sections[j])
      ? sections[j].replace(position, (_, x, y) => `position = Vector2(${x}, ${number(Number(y) - shift)})`)
      : sections[j].replace(/\]\r?\n/, `]\nposition = Vector2(0, ${number(-shift)})\n`);
  }
  changed++;
}
writeFileSync(path, sections.join(''));
console.log(`Aligned town sort origins: ${changed}`);
