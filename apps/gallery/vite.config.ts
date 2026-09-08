import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storyManifest } from './plugins/story-manifest';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [storyManifest(path.resolve(dirname, '../../packages/bricks/src/react')), react(), tailwindcss()],
  resolve: {
    alias: {
      // 빌드된 dist가 아니라 소스를 직접 본다.
      // 컴포넌트를 고치면 갤러리에 바로 반영되고, 매번 빌드할 필요가 없다.
      '@bricks/core': path.resolve(dirname, '../../packages/bricks/src/index.ts'),
    },
  },
  server: {
    port: 5180,
  },
});
