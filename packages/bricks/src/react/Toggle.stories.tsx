import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';
import type { Color, Size } from './utils';

const COLORS: Color[] = ['neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Toggle> = {
  title: 'Data Input/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '켜고 끄는 스위치. 네이티브 체크박스라 상태는 e.target.checked로 읽는다.',
      daisyui: 'toggle',
      props: [
        { name: 'label', type: 'ReactNode' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'onIcon', type: 'ReactNode', description: '스위치 안 아이콘 (켜짐)' },
        { name: 'offIcon', type: 'ReactNode', description: '스위치 안 아이콘 (꺼짐)' },
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
  args: { label: '알림 받기', defaultChecked: true },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle defaultChecked />
      {COLORS.map((color) => (
        <Toggle key={color} color={color} defaultChecked aria-label={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((size) => (
        <Toggle key={size} size={size} color="primary" defaultChecked aria-label={size} />
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Toggle label="꺼짐" />
      <Toggle label="켜짐" defaultChecked />
      <Toggle label="비활성" disabled />
      <Toggle label="비활성 + 켜짐" defaultChecked disabled />
    </div>
  ),
};

/** 스위치 안에 아이콘을 넣을 수 있다 */
export const WithIcons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="lg" offIcon={<Icon name="moon" size="1em" />} onIcon={<Icon name="sun" size="1em" />} />
      <Toggle
        size="lg"
        color="success"
        defaultChecked
        offIcon={<Icon name="x" size="1em" />}
        onIcon={<Icon name="check" size="1em" />}
      />
    </div>
  ),
};

/** 상태는 네이티브 체크박스처럼 `e.target.checked`로 읽는다 */
export const Controlled: Story = {
  parameters: { layout: 'padded' },
  render: function ControlledStory() {
    const [on, setOn] = useState(false);

    return (
      <div className="flex flex-col gap-3">
        <Toggle color="primary" label="다크 모드" checked={on} onChange={(e) => setOn(e.target.checked)} />
        <p className="text-sm opacity-60">현재 상태: {on ? '켜짐' : '꺼짐'}</p>
      </div>
    );
  },
};
