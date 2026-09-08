#!/usr/bin/env node
/**
 * DOI INC JS 번들 빌드
 *
 * Vite 라이브러리 모드로 실행 코드를 번들로 만든다.
 * 타입 선언은 `npm run build`(tsc)가 따로 내보내므로 여기서는 JS만 다룬다.
 *
 *   dist/index.js      ES Module (기본 진입점)
 *   dist/index.cjs     CommonJS
 *   dist/bricks.umd.js UMD (CDN용, React는 전역에서 가져온다)
 *
 * 사용법:
 *   node scripts/build-js.js
 */

import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

/**
 * Vite의 JS 진입점.
 *
 * `node_modules/.bin/vite`를 직접 부르지 않는다 — Windows에서는 `.cmd` 래퍼라
 * 셸 없이 실행할 수 없다(Node 20+ EINVAL).
 *
 * `vite/bin/vite.js`를 바로 resolve할 수도 없다 — vite의 exports 맵에 그 경로가
 * 없어서 막힌다. 그래서 패키지 루트를 찾아 bin 경로를 이어 붙인다.
 */
const VITE = path.join(path.dirname(require.resolve('vite/package.json')), 'bin/vite.js');

console.log('DOI INC JS 번들 빌드');
console.log('='.repeat(40));

execFileSync(
  process.execPath,
  [VITE, 'build', '--config', 'vite.config.lib.js'],
  { cwd: ROOT, stdio: 'inherit' },
);

const OUTPUTS = ['dist/index.js', 'dist/index.cjs', 'dist/bricks.umd.js'];
const missing = OUTPUTS.filter((file) => !fs.existsSync(path.join(ROOT, file)));

if (missing.length > 0) {
  console.error('\n다음 산출물이 만들어지지 않았습니다:');
  missing.forEach((file) => console.error(`  - ${file}`));
  process.exit(1);
}

console.log('');
OUTPUTS.forEach((file) => {
  const size = fs.statSync(path.join(ROOT, file)).size / 1024;
  console.log(`  ${file.padEnd(22)} ${size.toFixed(1)} KB`);
});
console.log('');
console.log('JS 번들 빌드 완료');
