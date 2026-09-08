import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Range } from './Range';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Range> = {
  title: 'Data Input/Range',
  component: Range,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '범위를 끌어 고르는 슬라이더. 눈금과 라벨을 붙일 수 있다.',
      daisyui: 'range',
      props: [
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'showTicks', type: 'boolean', defaultValue: 'false', description: 'step과 함께 쓴다' },
        { name: 'tickLabels', type: 'ReactNode[]', description: '눈금 아래 라벨' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    showTicks: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 40 },
  render: (args) => <div className="w-80"><Range {...args} /></div>,
};

export const Colors: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Range defaultValue={30} />
      {COLORS.map((color, i) => (
        <Range key={color} color={color} defaultValue={30 + i * 8} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {SIZES.map((size) => (
        <Range key={size} size={size} color="primary" defaultValue={60} />
      ))}
    </div>
  ),
};

/** `step`과 함께 눈금을 표시한다 */
export const WithTicks: Story = {
  render: () => (
    <div className="w-80">
      <Range
        color="primary"
        min={0}
        max={100}
        step={25}
        defaultValue={50}
        showTicks
        tickLabels={['0', '25', '50', '75', '100']}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState(72);

    return (
      <div className="flex w-80 flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          <span>볼륨</span>
          <span className="tabular-nums opacity-60">{value}</span>
        </div>
        <Range
          color="primary"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Range defaultValue={40} disabled />
    </div>
  ),
};
