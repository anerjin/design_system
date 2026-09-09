import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storyManifest } from '../plugins/story-manifest.ts';
import { moduleCatalog } from '../src/modules/catalog.ts';
import { layoutCatalog } from '../src/layouts/catalog.ts';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const plugin = storyManifest(path.join(root, 'packages/bricks/src/react'));
const source = plugin.load.call({ addWatchFile() {} }, '\0virtual:doi-stories');
const entries = JSON.parse(source.replace('export default ', '')).map((entry) => ({
  pageId: entry.pageId,
  name: entry.name,
  url: 'http://localhost:5180/#/c/' + entry.id,
  route: '#/c/' + entry.id,
  component: entry.componentPath,
  stories: entry.sourcePath,
  page: 'apps/gallery/src/pages/Detail.tsx',
}));
entries.push(
  ...moduleCatalog.map((module) => ({
    pageId: module.pageId,
    name: module.title,
    url: 'http://localhost:5180/#/modules?module=' + module.id,
    route: '#/modules?module=' + module.id,
    component: 'apps/gallery/src/modules/' + module.source,
    page: 'apps/gallery/src/pages/Modules.tsx',
  })),
);
const requested = process.argv[2]?.trim().toUpperCase();
entries.push(
  ...layoutCatalog.map((layout) => ({
    pageId: layout.pageId,
    name: layout.title,
    url: 'http://localhost:5180/#/layout?layout=' + layout.pageId,
    route: '#/layout?layout=' + layout.pageId,
    component: 'apps/gallery/src/layouts/' + layout.source,
    page: 'apps/gallery/src/pages/Layout.tsx',
  })),
);
const matches = requested === '--LIST' ? entries : entries.filter((entry) => entry.pageId === requested);
if (!matches.length) {
  console.error('페이지 ID를 찾을 수 없습니다. 예: DOI-C-BUTTON 또는 DOI-M-TEAM');
  process.exitCode = 1;
} else console.log(JSON.stringify(matches, null, 2));
