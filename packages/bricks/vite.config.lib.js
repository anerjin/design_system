import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** 포맷별 산출 파일명 */
const FILE_NAME = {
  es: 'index.js',
  cjs: 'index.cjs',
  umd: 'bricks.umd.js',
};

/**
 * 라이브러리 번들 설정
 *
 * tsc가 타입 선언만 내보내고, 실행 코드는 여기서 번들로 만든다.
 * 파일별로 내보내면 `export * from './react'` 같은 확장자 없는 경로가 그대로
 * 남아 Node ESM에서 깨지기 때문이다.
 *
 * 사용법: npx vite build --config vite.config.lib.js
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'BricksCore',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => FILE_NAME[format],
    },
    outDir: 'dist',
    // tsc가 먼저 내보낸 .d.ts와 build:css가 만든 CSS를 지우지 않도록 한다
    emptyOutDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
    minify: 'esbuild',
    sourcemap: true,
  },
});
