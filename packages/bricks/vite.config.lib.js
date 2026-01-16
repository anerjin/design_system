import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration for library bundling
 *
 * Builds a single bundled JS file with all React components
 * Usage: npx vite build --config vite.config.lib.js
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@core': path.resolve(__dirname, './core'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/react/index.ts'),
      name: 'BricksCore',
      formats: ['es', 'umd'],
      fileName: (format) => `bricks.${format}.js`,
    },
    outDir: 'dist/bundle',
    rollupOptions: {
      // Externalize peer dependencies
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Global variables for UMD build
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // Preserve module structure for tree-shaking
        preserveModules: false,
      },
    },
    // Enable minification (using esbuild, built into Vite)
    minify: 'esbuild',
    // Generate source maps
    sourcemap: true,
  },
});
