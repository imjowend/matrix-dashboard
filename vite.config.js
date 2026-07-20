import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/login': 'http://localhost:3000',
      '/process-matrix': 'http://localhost:3000',
      '/rotate-matrix': 'http://localhost:3000',
    },
  },
})
