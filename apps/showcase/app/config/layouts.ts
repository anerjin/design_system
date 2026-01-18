// Layouts Configuration
// Central configuration for all showcase layouts

export interface LayoutVariant {
  key: string;
  label: string;
  description: string;
  tags: string[];
  preview: string;
  codeExample: string;
}

export interface LayoutConfig {
  key: string;
  name: string;
  category: string;
  basePath: string;
  embedPath: string;
  variants: LayoutVariant[];
}

export interface CategoryConfig {
  key: string;
  label: string;
}

// Categories
export const categories: CategoryConfig[] = [
  { key: 'all', label: 'All Layouts' },
];

// Layout Configurations
export const layouts: LayoutConfig[] = [];

// Helper functions
export function getLayoutByKey(key: string): LayoutConfig | undefined {
  return layouts.find((l) => l.key === key);
}

export function getVariantLabels(layoutKey: string): Record<string, string> {
  const layout = getLayoutByKey(layoutKey);
  if (!layout) return {};
  return layout.variants.reduce(
    (acc, v) => ({ ...acc, [v.key]: v.label }),
    {}
  );
}

export function getCodeExamples(layoutKey: string): Record<string, string> {
  const layout = getLayoutByKey(layoutKey);
  if (!layout) return {};
  return layout.variants.reduce(
    (acc, v) => ({ ...acc, [v.key]: v.codeExample }),
    {}
  );
}

export function getLayoutTags(layoutKey: string): string[] {
  const layout = getLayoutByKey(layoutKey);
  if (!layout) return [];
  return [layout.key, ...new Set(layout.variants.flatMap((v) => v.tags))];
}

// Generate flat samples list for layouts page
export function getSamplesList() {
  return layouts.flatMap((layout) =>
    layout.variants.map((variant) => ({
      name: `${layout.name} - ${variant.label}`,
      desc: variant.description,
      path: `${layout.basePath}?variant=${variant.key}`,
      embedPath: `${layout.embedPath}?variant=${variant.key}`,
      category: layout.key,
      tags: variant.tags,
      preview: variant.preview,
    }))
  );
}
