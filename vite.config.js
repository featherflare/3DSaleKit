import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePluginFonts } from 'vite-plugin-fonts'
import glsl from 'vite-plugin-glsl'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    glsl(),
    VitePluginFonts({
      google: {
        families: ['Roboto'],
      },
      custom: {
        families: [{ name: 'DBHeaven', src: './src/assets/fonts/*.ttf' }],
      },
    }),
  ],
  assetsInclude: ['**/*.glb'],
  root: 'src/',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  base: './',
})
