import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

// This replicates __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  // Use path.resolve to find the .env file in the project root
  const env = loadEnv(mode, path.resolve(__dirname, '..'), ''); 

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Now '@' points correctly to your client/src folder
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // Logic for AI Studio environment
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
  };
});