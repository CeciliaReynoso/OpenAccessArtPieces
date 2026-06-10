import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/met': {
        target: 'https://collectionapi.metmuseum.org/public/collection/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/met/, '')
      }
    }
  }
})
