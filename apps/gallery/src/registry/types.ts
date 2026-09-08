/** daisyUI의 카테고리 체계 + DOI INC 고유 컴포넌트를 담는 Extras */
export const CATEGORIES = [
  'Actions',
  'Data Display',
  'Data Input',
  'Navigation',
  'Feedback',
  'Layout',
  'Mockup',
  'Extras',
] as const;

export type Category = (typeof CATEGORIES)[number];

/** 카테고리별 아이콘 (Lucide) */
export const CATEGORY_ICON: Record<Category, string> = {
  Actions: 'mouse-pointer-2',
  'Data Display': 'list',
  'Data Input': 'pencil',
  Navigation: 'compass',
  Feedback: 'message-square-more',
  Layout: 'panels-top-left',
  Mockup: 'monitor-smartphone',
  Extras: 'puzzle',
};

export interface PropDoc {
  name: string;
  type: string;
  defaultValue?: string;
  description?: string;
}
