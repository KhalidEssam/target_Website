import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'



export default defineConfig(({mode}) => {
    // Load app-level env vars to node-level env vars.
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    plugins: [react()],
    base: '/',
    server: {
      proxy: {
        '/api': {
          target:'https://target-backend-production.up.railway.app',
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: process.env.NODE_ENV === 'production', // Only secure in production
        },
      },
    },
  };
});
