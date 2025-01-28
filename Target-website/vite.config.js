import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: process.env.NODE_ENV === 'production',
        },
      },
    },
  };
});
