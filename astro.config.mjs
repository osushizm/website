// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tokisudeniosushi.com', // 本番環境のURLに変更してください
  output: 'static', // SSGを利用
  
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],
  
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
