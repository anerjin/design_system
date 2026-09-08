/** Rebuild the standalone HTML icon bundle from the installed official Lucide package. */
const fs = require('node:fs');
const path = require('node:path');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const lucide = require('lucide-react');
const root = path.resolve(__dirname, '../../..');
const names = new Set(['code-xml', 'chevron-down']);
function scan(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (/\.(html|js)$/.test(file) && entry.name !== 'lucide-icons.js') {
      const text = fs.readFileSync(file, 'utf8');
      for (const match of text.matchAll(/data-lucide=["']([a-z0-9-]+)["']/g)) names.add(match[1]);
    }
  }
}
scan(path.join(root, 'html_markup'));
const overrides = { 'grid-2x2': 'Grid2X2' };
const icons = {};
for (const name of [...names].sort()) {
  const exported =
    overrides[name] ||
    name
      .split('-')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join('');
  if (!lucide[exported]) throw new Error(`Unknown Lucide icon: ${name}`);
  icons[name] = renderToStaticMarkup(React.createElement(lucide[exported], { size: 24, strokeWidth: 2 }));
}
const license = fs.readFileSync(require.resolve('lucide-react/LICENSE'), 'utf8');
const runtime = `/*! Lucide icons - ${license.replace(/\*\//g, '* /')} */
(function () {
  'use strict';
  var icons = ${JSON.stringify(icons)};
  function hydrate() {
    document.querySelectorAll('i[data-lucide]').forEach(function (placeholder) {
      var name = placeholder.getAttribute('data-lucide');
      if (!icons[name]) return;
      var template = document.createElement('template');
      template.innerHTML = icons[name];
      var svg = template.content.firstElementChild;
      Array.from(placeholder.attributes).forEach(function (attribute) {
        if (attribute.name === 'class') svg.setAttribute('class', svg.getAttribute('class') + ' ' + attribute.value);
        else svg.setAttribute(attribute.name, attribute.value);
      });
      if (svg.hasAttribute('aria-label') || svg.hasAttribute('aria-labelledby')) {
        svg.removeAttribute('aria-hidden'); svg.setAttribute('role', 'img');
      } else svg.setAttribute('aria-hidden', 'true');
      placeholder.replaceWith(svg);
    });
  }
  function start() {
    hydrate();
    new MutationObserver(function (changes) {
      if (changes.some(function (change) { return Array.from(change.addedNodes).some(function (node) {
        return node.nodeType === 1 && (node.matches('i[data-lucide]') || node.querySelector('i[data-lucide]'));
      }); })) hydrate();
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
`;
fs.writeFileSync(path.join(root, 'html_markup/assets/js/lucide-icons.js'), runtime);
const css = `.lucide { display:inline-block; width:1em; height:1em; flex-shrink:0; vertical-align:middle; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }
.lucide.icon { width:24px; height:24px; }
.lucide.icon--xs { width:12px; height:12px; } .lucide.icon--sm { width:16px; height:16px; } .lucide.icon--md { width:20px; height:20px; } .lucide.icon--lg { width:24px; height:24px; } .lucide.icon--xl { width:32px; height:32px; } .lucide.icon--2xl { width:48px; height:48px; }
.lucide.icon--primary { color:var(--color-primary, currentColor); } .lucide.icon--success { color:var(--color-success, #15803d); } .lucide.icon--warning { color:var(--color-warning, #a16207); } .lucide.icon--danger { color:var(--color-danger, #b91c1c); } .lucide.icon--info { color:var(--color-info, #0369a1); }
.lucide.icon--spin { animation:lucide-spin 1.5s linear infinite; } .lucide.icon--pulse { animation:lucide-pulse 1.5s ease-in-out infinite; } .lucide.icon--bounce { animation:lucide-bounce 1s ease-in-out infinite; }
@keyframes lucide-spin { to { transform:rotate(360deg); } } @keyframes lucide-pulse { 50% { opacity:.35; } } @keyframes lucide-bounce { 50% { transform:translateY(-3px); } }
@media(prefers-reduced-motion:reduce) { .lucide { animation:none !important; } }
.code-summary::before { background-image:none; background-color:currentColor; mask:url("data:image/svg+xml,${encodeURIComponent(icons['code-xml'])}") center / contain no-repeat; }
.code-summary::after { background-image:none; background-color:currentColor; mask:url("data:image/svg+xml,${encodeURIComponent(icons['chevron-down'])}") center / contain no-repeat; }
`;
fs.writeFileSync(path.join(root, 'html_markup/assets/css/lucide.css'), css);
console.log(`Built ${names.size} Lucide icons for legacy HTML.`);
