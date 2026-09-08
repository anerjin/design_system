import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress } from './Progress';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '네이티브 progress 요소. 값을 주지 않으면 진행률 미상 애니메이션이 된다.',
      daisyui: 'progress',
      props: [
        { name: 'value', type: 'number', defaultValue: '0' },
        { name: 'max', type: 'number', defaultValue: '100' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md', description: '막대 굵기' },
        { name: 'indeterminate', type: 'boolean', defaultValue: 'false' },
        { name: 'showValue', type: 'boolean', defaultValue: 'false', description: '퍼센트 표시' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 60 },
  render: (args) => <div className="w-full max-w-96"><Progress {...args} /></div>,
};

export const Colors: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      <Progress value={40} />
      {COLORS.map((color) => (
        <Progress key={color} value={40 + COLORS.indexOf(color) * 7} color={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      {SIZES.map((size) => (
        <Progress key={size} value={65} size={size} color="primary" />
      ))}
    </div>
  ),
};

/** 값을 주지 않으면 진행률 미상 애니메이션이 된다 */
export const Indeterminate: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      <Progress indeterminate />
      <Progress indeterminate color="primary" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-5">
      <Progress value={72} label="업로드 중" showValue color="primary" />
      <Progress value={30} label="디스크 사용량" showValue color="warning" />
      <Progress
        value={3}
        max={5}
        label="진행 단계"
        showValue
        color="success"
        formatValue={(v, m) => `${v} / ${m}`}
      />
    </div>
  ),
};

export const Steps_: Story = {
  name: 'Value range',
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-3">
      {[0, 25, 50, 75, 100].map((v) => (
        <Progress key={v} value={v} color="primary" showValue label={`${v}%`} />
      ))}
    </div>
  ),
};
