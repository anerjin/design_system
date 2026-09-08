import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Radio> = {
  title: 'Data Input/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '하나만 고르는 선택지. 그룹이 name과 선택값을 컨텍스트로 내려준다.',
      daisyui: 'radio',
      props: [
        { name: 'label', type: 'ReactNode' },
        { name: 'description', type: 'ReactNode' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '베이직', name: 'plan-default', defaultChecked: true },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {COLORS.map((color) => (
        <Radio key={color} color={color} name={`c-${color}`} defaultChecked aria-label={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((size) => (
        <Radio key={size} size={size} color="primary" name={`s-${size}`} defaultChecked aria-label={size} />
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-1">
      <Radio name="st" label="선택 안 함" />
      <Radio name="st" label="선택함" defaultChecked />
      <Radio name="st2" label="비활성" disabled />
      <Radio name="st3" label="비활성 + 선택됨" defaultChecked disabled />
    </div>
  ),
};

/** RadioGroup이 name과 선택값을 컨텍스트로 내려준다 */
export const Group: StoryObj<typeof RadioGroup> = {
  parameters: { layout: 'padded' },
  render: function GroupStory() {
    const [plan, setPlan] = useState('pro');

    return (
      <div className="flex flex-col gap-6">
        <RadioGroup
          label="요금제"
          name="plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          required
        >
          <Radio value="basic" label="베이직" description="월 9,900원" color="primary" />
          <Radio value="pro" label="프로" description="월 19,900원" color="primary" />
          <Radio value="team" label="팀" description="월 49,000원" color="primary" />
        </RadioGroup>
        <p className="text-sm opacity-60">선택된 값: {plan}</p>

        <RadioGroup label="정렬" name="sort" inline>
          <Radio value="new" label="최신순" defaultChecked />
          <Radio value="pop" label="인기순" />
          <Radio value="price" label="가격순" />
        </RadioGroup>

        <RadioGroup label="배송 방법" name="ship" error="배송 방법을 선택하세요">
          <Radio value="std" label="일반 배송" />
          <Radio value="exp" label="빠른 배송" />
        </RadioGroup>
      </div>
    );
  },
};
