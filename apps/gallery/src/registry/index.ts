import { CATEGORIES, type Category } from './types';
import { docs, type ComponentDoc } from './stories';

export * from './types';
export type { ComponentDoc, StoryExample, GalleryMeta } from './stories';

/**
 * 전체 컴포넌트 목록.
 *
 * 예제는 `packages/bricks/src/react/*.stories.tsx`에서 그대로 읽어 온다 —
 * 갤러리가 따로 갖고 있는 예제는 없다. 스토리를 고치면 여기에도 바로 반영된다.
 */
export const registry: ComponentDoc[] = docs;

/** 카테고리 → 컴포넌트 (카테고리 순서 유지) */
export const byCategory: { category: Category; items: ComponentDoc[] }[] = CATEGORIES.map((category) => ({
  category,
  items: registry.filter((entry) => entry.category === category),
})).filter((group) => group.items.length > 0);

export function findEntry(id: string): ComponentDoc | undefined {
  const value = id.trim().toLowerCase();
  return registry.find((entry) => entry.id === value || entry.pageId.toLowerCase() === value);
}

/** 페이지 ID·이름·설명·daisyUI 클래스·예제 제목으로 검색한다. */
export function search(query: string): ComponentDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return registry;
  const exactPage = registry.find((entry) => entry.pageId.toLowerCase() === q);
  if (exactPage) return [exactPage];

  return registry.filter(
    (entry) =>
      entry.name.toLowerCase().includes(q) ||
      entry.id.includes(q) ||
      entry.pageId.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q) ||
      (entry.daisyui?.includes(q) ?? false) ||
      entry.category.toLowerCase().includes(q) ||
      entry.examples.some((example) => example.title.toLowerCase().includes(q)),
  );
}

/** 전체 예제 수 (스토리 개수와 같다) */
export const exampleCount = registry.reduce((sum, entry) => sum + entry.examples.length, 0);
