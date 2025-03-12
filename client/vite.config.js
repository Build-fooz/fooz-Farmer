import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-bootstrap': 'react-bootstrap/dist/react-bootstrap.esm.js',
    },
  },
});
