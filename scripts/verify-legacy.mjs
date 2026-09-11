import { execFileSync } from 'node:child_process';
const baseline = process.argv[2] ?? 'HEAD';
const originals = execFileSync('git', ['ls-tree', '-r', '--name-only', baseline], { encoding: 'utf8' }).trim().split('\n');
const selected = originals.filter(path => /^(android\/|ios\/|lib\/|test\/|web\/|assets\/|\.metadata$|analysis_options\.yaml$|pubspec\.(yaml|lock)$)/.test(path));
if (!selected.length) throw new Error('Supply a pre-migration commit as the first argument.');
for (const path of selected) {
  const before = execFileSync('git', ['rev-parse', `${baseline}:${path}`], { encoding: 'utf8' }).trim();
  // Git's configured text normalization accounts for Windows checkout CRLF.
  const after = execFileSync('git', ['hash-object', `--path=${path}`, `legacy/flutter/${path}`], { encoding: 'utf8' }).trim();
  if (before !== after) throw new Error(`Legacy file differs: ${path}`);
}
console.log(`PASS: ${selected.length} original files preserved in legacy/flutter; Git blob hashes match after configured line-ending normalization.`);
