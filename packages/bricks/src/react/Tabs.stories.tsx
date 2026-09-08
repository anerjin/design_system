import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';
import type { TabsVariant } from './Tabs';
import { Badge } from './Badge';
import type { Size } from './utils';

const VARIANTS: TabsVariant[] = ['plain', 'box', 'border', 'lift'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const items = [
  { key: 'overview', label: '개요', content: <p>서비스 전반을 요약해 보여줍니다.</p> },
  { key: 'settings', label: '설정', content: <p>알림·테마·언어를 바꿀 수 있습니다.</p> },
  { key: 'billing', label: '결제', content: <p>구독 상태와 결제 수단을 관리합니다.</p> },
];

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '내용을 나눠 보여주는 탭. 활성 표시가 CSS라 위치를 재는 JS가 없다.',
      daisyui: 'tabs',
      props: [
        { name: 'items', type: 'TabItem[]', description: 'key · label · content · icon · badge' },
        { name: 'variant', type: 'plain | box | border | lift', defaultValue: 'border' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'placement', type: 'top | bottom', defaultValue: 'top' },
        { name: 'activeKey', type: 'string', description: '제어 컴포넌트로 쓸 때' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    placement: { control: 'select', options: ['top', 'bottom'] },
    justified: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { items },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="text-xs opacity-60">{variant}</span>
          <Tabs variant={variant} items={items} />
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {SIZES.map((size) => (
        <Tabs key={size} variant="box" size={size} items={items} />
      ))}
    </div>
  ),
};

export const WithIconsAndBadges: Story = {
  render: () => (
    <Tabs
      variant="box"
      items={[
        {
          key: 'inbox',
          label: '받은편지함',
          icon: <Icon name="mail" size="1em" />,
          badge: (
            <Badge color="error" size="sm">
              12
            </Badge>
          ),
          content: <p>읽지 않은 메일 12통</p>,
        },
        {
          key: 'sent',
          label: '보낸편지함',
          icon: <Icon name="send" size="1em" />,
          content: <p>보낸 메일 목록</p>,
        },
        {
          key: 'trash',
          label: '휴지통',
          icon: <Icon name="trash-2" size="1em" />,
          content: <p>비어 있습니다</p>,
        },
      ]}
    />
  ),
};

export const Justified: Story = {
  args: { items, variant: 'box', justified: true },
};

export const BottomPlacement: Story = {
  args: { items, variant: 'lift', placement: 'bottom' },
};

export const Disabled: Story = {
  args: {
    items: [
      ...items.slice(0, 2),
      { key: 'admin', label: '관리자', content: <p>권한이 없습니다</p>, disabled: true },
    ],
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [key, setKey] = useState('settings');

    return (
      <div className="flex flex-col gap-3">
        <Tabs variant="border" items={items} activeKey={key} onChange={setKey} />
        <p className="text-sm opacity-60">활성 탭: {key}</p>
      </div>
    );
  },
};
