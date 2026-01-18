// Filter Bar Component Configuration

export const config = {
  key: 'filter-bar',
  name: 'Filter Bar',
  category: 'ui',
  description: 'Filter bar with search, dropdowns, and view toggle',
  variants: [
    {
      key: 'default',
      label: 'Default Filter Bar',
      description: 'Filter bar with search, status filter, tag filter, and view toggle',
      tags: ['React', 'Filter', 'Search', 'Toolbar'],
      preview: '/previews/filter-bar-default.png',
    },
  ],
};

export default config;
