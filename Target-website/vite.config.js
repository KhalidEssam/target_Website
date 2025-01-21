import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'



// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
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


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Optional rewrite
//         ws: true, // Optional WebSocket support
//       },
//     },
//   },
// });
