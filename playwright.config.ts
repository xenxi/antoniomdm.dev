import { defineConfig } from '@playwright/test';

const previewUrl = `http://127.0.0.1:${process.env.ANTONIOS_E2E_PORT ?? '4321'}`;

export default defineConfig({
  testDir: './tests/e2e',
  // Each Career test starts a real Godot/WebGL renderer. Eight concurrent
  // renderers exhaust the software GPU used in CI and turn valid interactions
  // into startup/teardown timeouts; two preserve parallel coverage reliably.
  workers: 2,
  fullyParallel: true,
  use: { baseURL: previewUrl, viewport: { width: 1440, height: 1000 }, trace: 'retain-on-failure' },
  webServer: {
    command: 'node ./scripts/e2e-preview.mjs',
    url: previewUrl,
    reuseExistingServer: false,
    timeout: 30_000,
    gracefulShutdown: { signal: 'SIGTERM', timeout: 5_000 },
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
