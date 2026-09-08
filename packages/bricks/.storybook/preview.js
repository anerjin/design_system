import '../src/styles/bricks.css';
import '../src/styles/examples.css';
import { createElement } from 'react';

/** daisyUI 내장 테마 35종 */
const THEMES = [
  'bricks-light', 'bricks-dark',
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
  'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk',
  'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim',
  'nord', 'sunset', 'caramellatte', 'abyss', 'silk',
];

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  globalTypes: {
    theme: {
      description: 'daisyUI 테마',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEMES,
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    // DOI INC 기본 테마 (src/styles/bricks.css의 --default와 맞춰 둔다)
    theme: 'bricks-light',
  },

  decorators: [
    (Story, context) => {
      // daisyUI는 data-theme 속성으로 테마를 결정한다.
      document.documentElement.setAttribute('data-theme', context.globals.theme);
      return createElement(
        'div',
        { className: 'bricks-example-boxes', style: { display: 'contents' } },
        createElement(Story),
      );
    },
  ],
};

export default preview;
