import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://openagi.ai',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
