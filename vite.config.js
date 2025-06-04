import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {}
  },
  
  build: {
    outDir: 'dist/js',
    emptyOutDir: false,
    lib: {
      entry: 'src/main.jsx',
      name: 'WCCartShareQuote',
      fileName: () => 'wc-cart-share-quote.js',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
        format: 'iife',
        name: 'WCCartShareQuote'
      }
    },
    sourcemap: false,
    minify: false
  },
  
  server: {
    port: 3000,
    host: true
  }
});