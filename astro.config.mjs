// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourdomain.com', // 本番環境のURLに変更してください
  output: 'hybrid', // SSGとSSRの混在を許可
  
  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare(),
  
  integrations: [sitemap()],
  
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});