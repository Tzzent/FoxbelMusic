import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    // https: true,
    proxy: {
      '/api': {
        target: 'https://api.deezer.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/auth': {
        target: 'https://connect.deezer.com/oauth',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      },
    }
  }
})
