#!/usr/bin/env node
/**
 * BRICKS JS Bundler
 *
 * Builds bundled JavaScript files using Vite library mode.
 * Generates both ES module and UMD formats.
 *
 * Usage:
 *   node scripts/build-js.js     # Build bundled JS files
 *   npm run build:js             # Same via npm script
 */

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

console.log('📦 BRICKS JS Bundler');
console.log('='.repeat(40));
console.log('Building bundled JavaScript files...\n');

// Run vite build with library config
const vite = spawn('npx', ['vite', 'build', '--config', 'vite.config.lib.js'], {
  cwd: ROOT_DIR,
  stdio: 'inherit',
  shell: true,
});

vite.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ JS bundle build complete!');
    console.log('📁 Output files:');
    console.log('   dist/bundle/bricks.es.js      (ES Module)');
    console.log('   dist/bundle/bricks.umd.js     (UMD)');
  } else {
    console.error(`\n❌ Build failed with code ${code}`);
    process.exit(code);
  }
});
