import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://antoniomdm.dev',
  output: 'static',
  trailingSlash: 'always',
  integrations: [mdx(), preact()],
  devToolbar: { enabled: false },
});
