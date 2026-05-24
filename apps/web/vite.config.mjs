import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  root: 'src/canvas',
  build: {
    outDir: '../../public/canvas',
    emptyOutDir: true,
    lib: {
      entry: 'main.ts',
      name: 'CanvasApp',
      fileName: 'index',
      formats: ['es'],
    },
  },
});
