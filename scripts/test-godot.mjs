import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const result = spawnSync(process.env.GODOT_BIN || 'godot', ['--headless', '--path', resolve('godot/career'), '--script', resolve('tests/godot-motion.gd')], { stdio: 'inherit' });
if (result.error) throw new Error(`Configura GODOT_BIN con el ejecutable de Godot. / Set GODOT_BIN to the Godot executable.\n${result.error.message}`);
process.exit(result.status ?? 1);
