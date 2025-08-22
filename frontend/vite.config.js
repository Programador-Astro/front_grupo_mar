import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Adicione o endereço do seu servidor à lista de hosts permitidos
    allowedHosts: ['localhost', 'gestor-docker-1.onrender.com'],
    watch: {
      usePolling: true
    },
    proxy: {
      '/auth': {
        target: 'https://gestor-docker.onrender.com/',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
