import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Update this to match your server port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
