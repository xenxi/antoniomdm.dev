import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  { ignores: ['legacy/**', 'dist/**', '.astro/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'public/games/career/**', 'godot/**/.godot/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
];
