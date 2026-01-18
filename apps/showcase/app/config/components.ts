// Components Configuration
// Imports config from each component folder

import formsConfig from '../components/ui/forms/config';
import filterBarConfig from '../components/ui/filter-bar/config';

export interface ComponentVariant {
  key: string;
  label: string;
  description: string;
  tags: string[];
  preview: string;
}

export interface ComponentConfig {
  key: string;
  name: string;
  category: string;
  description?: string;
  basePath: string;
  embedPath: string;
  variants: ComponentVariant[];
}

export interface CategoryConfig {
  key: string;
  label: string;
}

// Build component configs from folder-based configs
function buildComponentConfig(config: typeof formsConfig, category: 'blocks' | 'ui'): ComponentConfig {
  return {
    key: config.key,
    name: config.name,
    category: config.category,
    description: config.description,
    basePath: `/components/${category}/${config.key}`,
    embedPath: `/embed/${category}/${config.key}`,
    variants: config.variants,
  };
}

// Component Configurations
export const components: ComponentConfig[] = [
  buildComponentConfig(formsConfig, 'ui'),
  buildComponentConfig(filterBarConfig, 'ui'),
];

// Categories (auto-generated from components)
export const categories: CategoryConfig[] = [
  { key: 'all', label: 'All Components' },
  ...Array.from(new Set(components.map(c => c.key))).map(key => ({
    key,
    label: components.find(c => c.key === key)?.name || key,
  })),
];

// Helper functions
export function getComponentByKey(key: string): ComponentConfig | undefined {
  return components.find((c) => c.key === key);
}

export function getVariantLabels(componentKey: string): Record<string, string> {
  const component = getComponentByKey(componentKey);
  if (!component) return {};
  return component.variants.reduce(
    (acc, v) => ({ ...acc, [v.key]: v.label }),
    {}
  );
}

export function getComponentTags(componentKey: string): string[] {
  const component = getComponentByKey(componentKey);
  if (!component) return [];
  return [component.key, ...new Set(component.variants.flatMap((v) => v.tags))];
}

// Generate flat samples list for components page
export function getSamplesList() {
  return components.flatMap((component) =>
    component.variants.map((variant) => ({
      name: `${component.name} - ${variant.label}`,
      desc: variant.description,
      path: `${component.basePath}?variant=${variant.key}`,
      embedPath: `${component.embedPath}?variant=${variant.key}`,
      category: component.key,
      tags: variant.tags,
      preview: variant.preview,
    }))
  );
}
