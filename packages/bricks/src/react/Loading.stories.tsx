import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading, LoadingOverlay } from './Loading';
import type { LoadingVariant } from './Loading';
import type { Color, Size } from './utils';

const VARIANTS: LoadingVariant[] = ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof Loading> = {
  title: 'Feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '불러오는 중임을 나타낸다. 여섯 가지 형태를 제공한다.',
      daisyui: 'loading',
      props: [
        { name: 'variant', type: 'spinner | dots | ring | ball | bars | infinity', defaultValue: 'spinner' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'label', type: 'ReactNode', description: '함께 보여줄 문구' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    labelPosition: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Variants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <Loading variant={variant} size="lg" color="primary" />
          <span className="text-xs opacity-60">{variant}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {SIZES.map((size) => (
        <Loading key={size} size={size} color="primary" />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Loading />
      {COLORS.map((color) => <Loading key={color} color={color} />)}
    </div>
  ),
};

export const WithLabel: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {(['top', 'right', 'bottom', 'left'] as const).map((pos) => (
        <Loading key={pos} label={pos} labelPosition={pos} color="primary" />
      ))}
    </div>
  ),
};

/** 부모 영역을 덮는 오버레이 */
export const Overlay: StoryObj<typeof LoadingOverlay> = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="relative h-56 w-full max-w-96 overflow-hidden rounded-box border border-base-300 p-4">
      <h3 className="mb-2 font-semibold">주문 내역</h3>
      <p className="text-sm opacity-70">
        아래 내용은 오버레이에 가려집니다. 부모에 `relative`가 있어야 합니다.
      </p>
      <LoadingOverlay label="불러오는 중" />
    </div>
  ),
};
