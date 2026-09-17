import { spawnSync } from 'node:child_process';

const git = (args, options = {}) => spawnSync('git', args, { encoding: 'utf8', ...options });

if (git(['rev-parse', '--is-inside-work-tree'], { stdio: 'ignore' }).status !== 0) {
  console.warn('No se activaron hooks: la instalación no se ejecuta dentro de un repositorio Git. / Hooks were not enabled: installation is not running inside a Git repository.');
  process.exit(0);
}

const result = git(['config', 'core.hooksPath', '.githooks'], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status ?? 1);

console.log('Hooks de Git activados desde .githooks. / Git hooks enabled from .githooks.');
