import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
