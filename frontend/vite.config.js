import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SPA built to static assets, served by FastAPI in prod. The dev proxy forwards
// /api and /health to the FastAPI dev server so the SPA talks to the real API.
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
})
