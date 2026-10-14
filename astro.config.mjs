import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL;
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
