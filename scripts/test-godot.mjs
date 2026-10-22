import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const project = ['--headless', '--path', resolve('godot/career')];
// Register resource classes on a fresh checkout before loading standalone tests.
// Registra las clases de recursos en una copia limpia antes de cargar los tests.
const runs = [
  [...project, '--editor', '--import', '--quit'],
  ...['tests/godot-motion.gd', 'godot/career/tests/architecture.gd', 'godot/career/tests/campaign_rules.gd', 'godot/career/tests/character_actions.gd', 'godot/career/tests/save_sessions.gd', 'godot/career/tests/town_life.gd', 'godot/career/tests/student_flat.gd'].map(script => [...project, '--script', resolve(script)]),
];
for (const args of runs) {
  const result = spawnSync(process.env.GODOT_BIN || 'godot', args, { encoding: 'utf8', timeout: 60_000 });
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  if (result.error) throw new Error(`No se pudo completar Godot / Godot could not complete: ${result.error.message}`);
  // Godot can return zero after script errors; fail the runner on those too.
  // Godot puede devolver cero tras errores de script; también deben fallar.
  if (result.status !== 0 || /SCRIPT ERROR:|^ERROR:/m.test(result.stderr ?? '')) process.exit(result.status || 1);
}
