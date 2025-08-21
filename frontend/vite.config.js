import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['localhost'], // 👈 corrigido
    watch: {
      usePolling: true
    },
    proxy: {
      '/auth': {
        target: 'http://localhost:5000/',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
