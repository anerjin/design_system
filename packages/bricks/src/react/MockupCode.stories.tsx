import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupCode } from './Mockup';

const meta: Meta<typeof MockupCode> = {
  title: 'Mockup/Code',
  component: MockupCode,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '터미널 출력이나 코드 조각. 줄마다 접두사와 색을 줄 수 있다.',
      daisyui: 'mockup-code',
      props: [
        { name: 'lines', type: 'MockupCodeLine[]', description: 'prefix · content · className' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupCode
      className="w-full max-w-xl"
      lines={[{ prefix: '$', content: 'npm i @bricks/core' }]}
    />
  ),
};

/** 줄마다 색을 줄 수 있다 */
export const Terminal: Story = {
  render: () => (
    <MockupCode
      className="w-full max-w-xl"
      lines={[
        { prefix: '$', content: 'npm i @bricks/core daisyui tailwindcss' },
        { prefix: '>', content: '의존성 해결 중…', className: 'text-warning' },
        { prefix: '>', content: '패키지 3개 설치됨', className: 'text-success' },
        { prefix: '$', content: 'npm run build' },
      ]}
    />
  ),
};

/** 줄 번호를 붙인다 */
export const WithLineNumbers: Story = {
  render: () => (
    <MockupCode
      className="w-full max-w-xl"
      lines={[
        { prefix: '1', content: 'import { Button } from "@bricks/core";' },
        { prefix: '2', content: 'import "@bricks/core/styles";' },
        { prefix: '3', content: '' },
        { prefix: '4', content: 'export default function App() {' },
        { prefix: '5', content: '  return <Button color="primary">저장</Button>;' },
        { prefix: '6', content: '}' },
      ]}
    />
  ),
};

/** 한 줄을 강조한다 */
export const HighlightedLine: Story = {
  render: () => (
    <MockupCode
      className="w-full max-w-xl"
      lines={[
        { prefix: '1', content: '@import "tailwindcss";' },
        { prefix: '2', content: '@source "../react";' },
        { prefix: '3', content: '@plugin "daisyui" {', className: 'bg-warning text-warning-content' },
        { prefix: '4', content: '  themes: all;', className: 'bg-warning text-warning-content' },
        { prefix: '5', content: '}', className: 'bg-warning text-warning-content' },
      ]}
    />
  ),
};

export const WithoutPrefix: Story = {
  render: () => (
    <MockupCode
      className="w-full max-w-xl"
      lines={[
        { content: '접두사 없이 코드만 보여줄 수도 있습니다.' },
        { content: 'prefix를 생략하면 됩니다.' },
      ]}
    />
  ),
};
