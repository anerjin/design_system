import { lazy, type ComponentType } from 'react';
import manifest from 'virtual:doi-stories';
import type { Category, PropDoc } from './types';
import type { PreviewLayout } from '../components/PreviewFrame';

export interface GalleryMeta {
  description: string;
  daisyui?: string;
  props?: PropDoc[];
}
export interface StoryExample {
  exportName: string;
  title: string;
  description?: string;
  Story: ComponentType;
  code: string;
  layout: PreviewLayout;
}
export interface ComponentDoc {
  id: string;
  /** Shareable page identifier, independent of category and list order. */
  pageId: string;
  sourcePath: string;
  componentPath?: string;
  name: string;
  category: Category;
  description: string;
  daisyui?: string;
  props?: PropDoc[];
  storyId: string;
  examples: StoryExample[];
}
export interface StoryManifest extends Omit<ComponentDoc, 'examples'> {
  path: string;
  examples: Omit<StoryExample, 'Story'>[];
}

const modules = import.meta.glob<Record<string, unknown>>(
  '../../../../packages/bricks/src/react/*.stories.tsx',
);
const cache = new Map<string, Promise<Record<string, ComponentType>>>();
function loadStories(path: string) {
  let result = cache.get(path);
  if (!result) {
    result = Promise.all([modules[path](), import('@storybook/react')]).then(
      ([module, { composeStories }]) =>
        composeStories(module as never) as unknown as Record<string, ComponentType>,
    );
    cache.set(path, result);
  }
  return result;
}
export const docs: ComponentDoc[] = manifest.map(({ path, ...entry }) => ({
  ...entry,
  examples: entry.examples.map((example) => ({
    ...example,
    Story: lazy(async () => {
      const stories = await loadStories(path);
      if (!stories[example.exportName]) throw new Error('Unknown story: ' + example.exportName);
      return { default: stories[example.exportName] };
    }),
  })),
}));
