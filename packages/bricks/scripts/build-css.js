#!/usr/bin/env node
/**
 * DOI INC CSS 빌드
 *
 * 스타일은 전부 daisyUI가 제공하므로 여기서 CSS를 이어붙이지 않는다.
 * Tailwind CLI를 돌려 산출물 세 개를 만든다.
 *
 *   dist/bricks.css         Tailwind preflight + daisyUI + 테마 35종 + DOI INC 토큰
 *   dist/bricks.min.css     위와 같은 내용의 압축본
 *   dist/bricks-tokens.css  DOI INC 토큰만 (모양 + 타이포)
 *                           이미 Tailwind+daisyUI를 쓰는 소비자가 자기 엔트리에서
 *                           @import 해서 쓴다. @theme이 들어 있어 Tailwind가 필요하다.
 *
 * 사용법:
 *   node scripts/build-css.js
 */

import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ENTRY = path.join(ROOT, 'src/styles/bricks.css');
const OUT_DIR = path.join(ROOT, 'dist');

/** 소비자에게 따로 내보내는 DOI INC 토큰 파일들 */
const TOKEN_FILES = [
  path.join(ROOT, 'src/styles/shape.css'),
  path.join(ROOT, 'src/styles/type.css'),
  path.join(ROOT, 'src/styles/themes.css'),
  path.join(ROOT, 'src/styles/menu.css'),
  path.join(ROOT, 'src/styles/alert.css'),
  path.join(ROOT, 'src/styles/radial-progress.css'),
  path.join(ROOT, 'src/styles/components.css'),
  path.join(ROOT, 'src/styles/interactive.css'),
  path.join(ROOT, 'src/styles/navbar.css'),
];

/**
 * Tailwind CLI의 JS 진입점.
 *
 * `node_modules/.bin/tailwindcss`를 직접 부르지 않는다 — Windows에서는 그게
 * `.cmd` 래퍼라 셸 없이 실행할 수 없고(Node 20+ EINVAL), 셸을 끼우면 경로에
 * 공백이 있을 때 깨진다. 패키지에서 진입점을 찾아 node로 직접 돌리는 편이
 * 플랫폼을 안 탄다.
 */
const CLI = path.join(path.dirname(require.resolve('@tailwindcss/cli/package.json')), 'dist/index.mjs');

function kb(file) {
  return `${(fs.statSync(file).size / 1024).toFixed(1)} KB`;
}

function tailwind(outFile, { minify = false } = {}) {
  const args = [CLI, '-i', ENTRY, '-o', outFile];
  if (minify) args.push('--minify');

  execFileSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
}

console.log('DOI INC CSS 빌드');
console.log('='.repeat(40));

fs.mkdirSync(OUT_DIR, { recursive: true });

const full = path.join(OUT_DIR, 'bricks.css');
const min = path.join(OUT_DIR, 'bricks.min.css');
const tokens = path.join(OUT_DIR, 'bricks-tokens.css');

tailwind(full);
tailwind(min, { minify: true });

// 토큰 파일들은 가공하지 않고 이어 붙인다 — 소비자가 자기 Tailwind로 처리한다
fs.writeFileSync(
  tokens,
  TOKEN_FILES.map((file) => fs.readFileSync(file, 'utf8')).join('\n'),
);

/**
 * 안전장치.
 *
 * 컴포넌트가 클래스를 템플릿 리터럴로 조립하면 Tailwind 스캐너가 읽지 못해
 * 산출 CSS가 조용히 비어버린다. 대표 클래스 몇 개가 실제로 들어갔는지 확인해
 * 그런 실수를 빌드 단계에서 잡는다.
 */
const REQUIRED = [
  '.btn-primary',
  '.card-body',
  '.modal-box',
  '.input-error',
  '.badge-soft',
  '.tab-active',
  '.menu-title',
  '.loading-spinner',
  '--radius-field: 0.5rem',
  '[data-theme="bricks-dark"]',
  'Pretendard',
  '--text-5xl: 3rem',
];

const built = fs.readFileSync(full, 'utf8');
// CSS quote style is formatting, not a missing selector.
const normalized = built.replace(/'/g, '"');
const missing = REQUIRED.filter((needle) => !normalized.includes(needle));

console.log('');
console.log(`  dist/bricks.css         ${kb(full)}`);
console.log(`  dist/bricks.min.css     ${kb(min)}`);
console.log(`  dist/bricks-tokens.css  ${kb(tokens)}`);

if (missing.length > 0) {
  console.error('');
  console.error('빌드된 CSS에 다음 클래스가 없습니다:');
  missing.forEach((name) => console.error(`  - ${name}`));
  console.error('');
  console.error('컴포넌트에서 클래스를 `btn-${color}` 처럼 조립하지 않았는지 확인하세요.');
  console.error('Tailwind 스캐너는 템플릿 리터럴을 읽지 못합니다 — 리터럴 룩업 맵을 써야 합니다.');
  process.exit(1);
}

console.log('');
console.log('CSS 빌드 완료');
