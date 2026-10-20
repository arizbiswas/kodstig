import { defineConfig } from 'vite';

// BASE_PATH sätts vid bygget för GitHub Pages (t.ex. /kodstig/). Lokalt är det /.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
});
