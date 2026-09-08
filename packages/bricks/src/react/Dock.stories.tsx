import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dock } from './Dock';
import type { Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Dock> = {
  title: 'Navigation/Dock',
  component: Dock,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description: '화면 아래에 고정되는 모바일 탭바. position: fixed가 이미 들어 있다.',
      daisyui: 'dock',
      props: [
        { name: 'items', type: 'DockItem[]', description: 'icon · label · active · onClick' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems = [
  { id: 'home', icon: <Icon name="house" size="1em" className="text-xl" />, label: '홈' },
  { id: 'search', icon: <Icon name="search" size="1em" className="text-xl" />, label: '검색' },
  { id: 'saved', icon: <Icon name="bookmark" size="1em" className="text-xl" />, label: '저장됨' },
  { id: 'me', icon: <Icon name="user-round" size="1em" className="text-xl" />, label: '내 정보' },
];

/**
 * `position: fixed`가 이미 들어 있어 화면 아래에 붙는다.
 * 본문 아래쪽에 그만큼 여백을 줘야 가려지지 않는다.
 */
export const Default: Story = {
  render: function DefaultStory() {
    const [active, setActive] = useState('home');

    return (
      <div className="relative h-72 overflow-hidden bg-base-200">
        <div className="p-6 pb-24 text-sm opacity-60">본문 영역</div>
        <Dock
          className="absolute"
          items={baseItems.map((item) => ({
            ...item,
            active: item.id === active,
            onClick: () => setActive(item.id),
          }))}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      {SIZES.map((size) => (
        <div key={size} className="relative h-24 overflow-hidden rounded-box bg-base-200">
          <span className="absolute left-3 top-2 text-xs opacity-60">{size}</span>
          <Dock
            size={size}
            className="absolute"
            items={baseItems.map((item, i) => ({ ...item, active: i === 0 }))}
          />
        </div>
      ))}
    </div>
  ),
};

/** 글자 없이 아이콘만 */
export const IconsOnly: Story = {
  render: () => (
    <div className="relative h-40 overflow-hidden bg-base-200">
      <Dock
        className="absolute"
        items={baseItems.map(({ id, icon }, i) => ({ id, icon, active: i === 0 }))}
      />
    </div>
  ),
};
