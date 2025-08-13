import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    },
    // Configuração do proxy ajustada para não precisar do prefixo '/api'
    proxy: {
      // Agora, requisições para '/auth' serão redirecionadas diretamente
      // para o seu back-end Flask. Adicione outras rotas do seu back-end aqui,
      // se necessário (por exemplo: '/users', '/products', etc.).
      '/auth': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
