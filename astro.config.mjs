import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://antoniomdm.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [preact()],
  devToolbar: { enabled: false },
});
