import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const theme = create({
  base: 'light',

  // Brand
  brandTitle: 'BRICKS Design System',
  brandUrl: 'https://github.com/anerjin/private_project_design_system',
  brandTarget: '_self',

  // UI
  appBg: '#f8f9fa',
  appContentBg: '#ffffff',
  appBorderColor: '#e9ecef',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',

  // Text colors
  textColor: '#1f2937',
  textInverseColor: '#ffffff',
  textMutedColor: '#6b7280',

  // Toolbar default and active colors
  barTextColor: '#6b7280',
  barSelectedColor: '#1f2937',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputTextColor: '#1f2937',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
});