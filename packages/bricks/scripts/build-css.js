#!/usr/bin/env node
/**
 * BRICKS CSS Bundler
 *
 * Combines all CSS files into a single bundled file.
 * Preserves the order defined in bundle.css imports.
 *
 * Usage:
 *   node scripts/build-css.js          # Build bundle.built.css
 *   node scripts/build-css.js --minify # Build minified version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STYLES_DIR = path.join(__dirname, '../core/styles');
const OUTPUT_FILE = path.join(STYLES_DIR, 'bundle.built.css');
const OUTPUT_MIN_FILE = path.join(STYLES_DIR, 'bundle.min.css');

// CSS file order (same as bundle.css imports)
const CSS_FILES = [
  // Base Styles
  'base/reset.css',
  'base/base.css',

  // Design System Tokens
  'tokens/colors.css',
  'tokens/typography.css',
  'tokens/spacing.css',
  'tokens/shadows.css',
  'tokens/borders.css',

  // Layout Components
  'layout/container.css',
  'layout/grid.css',
  'layout/flexbox.css',

  // Atom Components
  'atoms/button.css',
  'atoms/input.css',
  'atoms/checkbox.css',
  'atoms/radio.css',
  'atoms/toggle.css',
  'atoms/avatar.css',
  'atoms/badge.css',
  'atoms/spinner.css',
  'atoms/progress.css',
  'atoms/select.css',

  // Molecule Components
  'molecules/card.css',
  'molecules/modal.css',
  'molecules/alert.css',
  'molecules/dropdown.css',
  'molecules/tabs.css',
  'molecules/accordion.css',
  'molecules/pagination.css',
  'molecules/breadcrumb.css',
  'molecules/table.css',
  'molecules/navbar.css',
  'molecules/tooltip.css',
  'molecules/chart.css',
  'molecules/datepicker.css',

  // Utility Classes
  'utilities/display.css',
  'utilities/position.css',
  'utilities/overflow.css',
  'utilities/text.css',
];

/**
 * Simple CSS minifier (removes comments, extra whitespace)
 */
function minifyCSS(css) {
  return css
    // Remove comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove newlines and extra spaces
    .replace(/\s+/g, ' ')
    // Remove spaces around special characters
    .replace(/\s*([{};:,>~+])\s*/g, '$1')
    // Remove trailing semicolons before closing braces
    .replace(/;}/g, '}')
    // Remove leading/trailing whitespace
    .trim();
}

/**
 * Build the CSS bundle
 */
function buildCSS(options = {}) {
  const { minify = false } = options;

  console.log('🎨 BRICKS CSS Bundler');
  console.log('='.repeat(40));

  const header = `/**
 * BRICKS Design System - Combined Bundle
 * Generated: ${new Date().toISOString()}
 * Files: ${CSS_FILES.length}
 *
 * This file is auto-generated. Do not edit directly.
 * Edit individual CSS files and run: npm run build:css
 */

`;

  let combinedCSS = header;
  let totalSize = 0;
  let errors = [];

  CSS_FILES.forEach((file, index) => {
    const filePath = path.join(STYLES_DIR, file);

    try {
      if (!fs.existsSync(filePath)) {
        errors.push(`❌ File not found: ${file}`);
        return;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const size = Buffer.byteLength(content, 'utf8');
      totalSize += size;

      // Add section comment
      const sectionName = file.split('/')[0].toUpperCase();
      if (index === 0 || CSS_FILES[index - 1].split('/')[0] !== file.split('/')[0]) {
        combinedCSS += `\n/* ========================================\n   ${sectionName}\n======================================== */\n`;
      }

      combinedCSS += `\n/* --- ${file} --- */\n`;
      combinedCSS += content;
      combinedCSS += '\n';

      console.log(`  ✓ ${file} (${(size / 1024).toFixed(2)} KB)`);
    } catch (err) {
      errors.push(`❌ Error reading ${file}: ${err.message}`);
    }
  });

  if (errors.length > 0) {
    console.log('\n⚠️  Errors:');
    errors.forEach(err => console.log(`  ${err}`));
  }

  // Write full bundle
  fs.writeFileSync(OUTPUT_FILE, combinedCSS, 'utf8');
  const builtSize = Buffer.byteLength(combinedCSS, 'utf8');
  console.log(`\n📦 Output: bundle.built.css (${(builtSize / 1024).toFixed(2)} KB)`);

  // Write minified version if requested
  if (minify) {
    const minifiedCSS = minifyCSS(combinedCSS);
    fs.writeFileSync(OUTPUT_MIN_FILE, minifiedCSS, 'utf8');
    const minSize = Buffer.byteLength(minifiedCSS, 'utf8');
    const savings = ((1 - minSize / builtSize) * 100).toFixed(1);
    console.log(`📦 Output: bundle.min.css (${(minSize / 1024).toFixed(2)} KB, ${savings}% smaller)`);
  }

  console.log('\n✅ CSS build complete!');

  return { success: errors.length === 0, errors };
}

// Run if called directly
const args = process.argv.slice(2);
const shouldMinify = args.includes('--minify') || args.includes('-m');

buildCSS({ minify: shouldMinify });
