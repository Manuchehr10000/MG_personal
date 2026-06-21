import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// SPA built to static assets, served by FastAPI in prod. The dev proxy forwards
// /api and /health to the FastAPI dev server so the SPA talks to the real API.
// Vitest runs the framework's unit + component tests under jsdom.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
