import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/products': 'http://localhost:3000',
      '/auth': 'http://localhost:3000',
      '/orders': 'http://localhost:3000',
      '/analytics': 'http://localhost:3000'
    },
    historyApiFallback: true, // Enable history fallback for client-side routing
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production'
  }
})
