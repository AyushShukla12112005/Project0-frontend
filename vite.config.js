import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { 
    port: 3011,
    host: true,
    proxy: { 
      '/api': { 
        target: 'https://project0-backend-1.onrender.com',
        changeOrigin: true,
        secure: false,
        ws: true
      } 
    } 
  },
});
