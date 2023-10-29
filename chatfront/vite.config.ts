import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './build',
    assetsDir: './',
    rollupOptions: {
      output: {
        entryFileNames: 'syro.js',
        assetFileNames: 'syro.css',
        chunkFileNames: 'syro-chunk.js',
        manualChunks: undefined,
      },
    },
  },
})
