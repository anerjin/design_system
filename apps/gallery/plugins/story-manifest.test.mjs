import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { storyManifest } from './story-manifest.ts';

test('Vite paths with forward slashes invalidate metadata on Windows too', () => {
  const directory = path.resolve('packages/bricks/src/react');
  const plugin = storyManifest(directory);
  const module = {};
  let invalidated = false;
  let reloaded = false;
  plugin.handleHotUpdate({
    file: path.join(directory, 'Button.stories.tsx').replaceAll('\\', '/'),
    server: {
      moduleGraph: {
        getModuleById: () => module,
        invalidateModule: (value) => {
          invalidated = value === module;
        },
      },
      ws: {
        send: (message) => {
          reloaded = message.type === 'full-reload';
        },
      },
    },
  });
  assert.equal(invalidated, true);
  assert.equal(reloaded, true);
});

test('metadata preserves declaration order, JSX braces, comments and referenced literals', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'doi-manifest-'));
  const file = path.join(directory, 'Fixture.stories.tsx');
  try {
    fs.writeFileSync(
      file,
      `
const gallery = { description: 'Fixture', props: [{ name: 'title', type: 'string' }] };
const meta = { title: 'Actions/Fixture', parameters: { layout: 'centered', gallery } } satisfies Meta;
export default meta;
/** Keep this description. */
export const Zebra: Story = {
  render: () => <div>{'}'}{/* a closing } brace */}{'{'}</div>,
};
export const Alpha: StoryObj<typeof Widget> = {
  name: 'Custom title', parameters: { layout: 'fullscreen' }, args: { title: 'Closing } brace' },
};
export const HELPER = ['not a story'];
`,
    );
    const plugin = storyManifest(directory);
    const source = plugin.load.call({ addWatchFile() {} }, '\0virtual:doi-stories');
    const [entry] = JSON.parse(source.replace('export default ', ''));
    assert.equal(entry.pageId, 'DOI-C-FIXTURE');
    assert.equal(entry.sourcePath, 'packages/bricks/src/react/Fixture.stories.tsx');
    assert.equal(entry.description, 'Fixture');
    assert.deepEqual(entry.props, [{ name: 'title', type: 'string' }]);
    assert.deepEqual(
      entry.examples.map((example) => example.exportName),
      ['Zebra', 'Alpha'],
    );
    assert.equal(entry.examples[0].layout, 'centered');
    assert.equal(entry.examples[0].description, 'Keep this description.');
    assert.ok(entry.examples[0].code.endsWith('};'));
    assert.ok(entry.examples[0].code.includes("{'{'}"));
    assert.equal(entry.examples[1].title, 'Custom title');
    assert.equal(entry.examples[1].layout, 'fullscreen');
    assert.ok(entry.examples[1].code.includes("title: 'Closing } brace'"));
    fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('Actions/Fixture', 'Layout/Fixture'));
    const updated = JSON.parse(
      plugin.load.call({ addWatchFile() {} }, '\0virtual:doi-stories').replace('export default ', ''),
    );
    assert.equal(updated[0].pageId, entry.pageId, 'Category changes must not change page IDs');
  } finally {
    fs.unlinkSync(file);
    fs.rmdirSync(directory);
  }
});
