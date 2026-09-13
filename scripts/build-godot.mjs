import { spawnSync } from 'node:child_process';
import { mkdirSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const executable = process.env.GODOT_BIN || 'godot';
const project = resolve('godot/career');
const output = resolve('public/games/career/index.html');
mkdirSync(resolve('public/games/career'), { recursive: true });
function run(args) {
  const result = spawnSync(executable, args, { stdio: 'inherit' });
  if (result.error) throw new Error(`Godot 4.7.2 is required. Set GODOT_BIN to its executable. / Se necesita Godot 4.7.2. Configura GODOT_BIN con su ejecutable.\n${result.error.message}`);
  if (result.status !== 0) process.exit(result.status ?? 1);
}
const version = spawnSync(executable, ['--version'], { encoding: 'utf8' });
if (!version.stdout?.startsWith('4.7.2.stable')) throw new Error('Expected Godot 4.7.2 stable and matching export templates. / Se necesita Godot 4.7.2 estable y sus plantillas de exportación.');
run(['--headless', '--path', project, '--editor', '--import', '--quit']);
run(['--headless', '--path', project, '--export-release', 'Web', output]);
for (const extension of ['html', 'js', 'wasm', 'pck']) {
  const file = output.replace(/html$/, extension);
  if (!existsSync(file) || !statSync(file).size) throw new Error(`Missing export / Exportación ausente: ${file}`);
}
