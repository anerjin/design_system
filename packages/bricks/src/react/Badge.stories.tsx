import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const VARIANTS: BadgeVariant[] = ['solid', 'outline', 'dash', 'soft', 'ghost'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '상태나 개수를 나타내는 작은 표식. 5가지 스타일 × 8가지 색상.',
      daisyui: 'badge',
      props: [
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'variant', type: 'solid | outline | dash | soft | ghost', defaultValue: 'solid' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'dot', type: 'boolean', defaultValue: 'false', description: '내용 없는 점 형태' },
        { name: 'closable', type: 'boolean', defaultValue: 'false', description: '닫기 버튼 표시' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    dot: { control: 'boolean' },
    closable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>default</Badge>
      {COLORS.map((color) => <Badge key={color} color={color}>{color}</Badge>)}
    </div>
  ),
};

export const Variants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-xs opacity-60">{variant}</span>
          {COLORS.map((color) => (
            <Badge key={color} variant={variant} color={color}>{color}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map((size) => <Badge key={size} color="primary" size={size}>{size}</Badge>)}
    </div>
  ),
};

/** 내용 없이 점만 찍는 형태 — 상태 표시에 쓴다 */
export const Dots: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map((color) => (
        <span key={color} className="flex items-center gap-1.5 text-sm">
          <Badge dot color={color} size="xs" />
          {color}
        </span>
      ))}
    </div>
  ),
};

export const Closable: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge closable color="primary">React</Badge>
      <Badge closable variant="outline">TypeScript</Badge>
      <Badge closable variant="soft" color="accent">Tailwind</Badge>
    </div>
  ),
};

/** 텍스트·버튼 안에 섞어 쓰기 */
export const InContext: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <h2 className="flex items-center gap-2 text-xl font-semibold">
        받은 편지함 <Badge color="error" size="sm">12</Badge>
      </h2>
      <p className="text-sm">
        이 기능은 <Badge variant="outline" size="sm">베타</Badge> 단계입니다.
      </p>
    </div>
  ),
};
