import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/gh_pages_MUNDOLOCO/',
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL), // Esto asegura que la variable de entorno se utilice correctamente
  },
})