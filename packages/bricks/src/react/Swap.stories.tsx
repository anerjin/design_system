import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Swap } from './Swap';
import type { SwapEffect } from './Swap';

const EFFECTS: SwapEffect[] = ['none', 'rotate', 'flip'];

const meta: Meta<typeof Swap> = {
  title: 'Actions/Swap',
  component: Swap,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '두 내용을 자리 바꿔 보여준다. 숨은 체크박스로 동작한다.',
      daisyui: 'swap',
      props: [
        { name: 'on', type: 'ReactNode', description: '켜짐 상태에 보여줄 내용' },
        { name: 'off', type: 'ReactNode', description: '꺼짐 상태에 보여줄 내용' },
        { name: 'effect', type: 'none | rotate | flip', defaultValue: 'none' },
        { name: 'checked', type: 'boolean', description: '제어 컴포넌트로 쓸 때' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    effect: { control: 'select', options: EFFECTS },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '전환',
    on: <Icon name="smile" size={24} />,
    off: <Icon name="moon" size={24} />,
  },
};

export const Effects: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      {EFFECTS.map((effect) => (
        <div key={effect} className="flex flex-col items-center gap-2">
          <Swap
            effect={effect}
            label={effect}
            on={<Icon name="sun" size="1em" className="text-3xl" />}
            off={<Icon name="moon" size="1em" className="text-3xl" />}
          />
          <span className="text-xs opacity-60">{effect}</span>
        </div>
      ))}
    </div>
  ),
};

/** 텍스트도 바꿀 수 있다 */
export const TextSwap: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Swap label="켜짐/꺼짐" className="btn btn-wide" on={<span>ON</span>} off={<span>OFF</span>} />
  ),
};

/** 햄버거 ↔ 닫기 아이콘 */
export const MenuIcon: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Swap
      effect="rotate"
      label="메뉴 열기"
      className="btn btn-circle btn-ghost"
      on={<Icon name="x" size="1em" className="text-2xl" />}
      off={<Icon name="menu" size="1em" className="text-2xl" />}
    />
  ),
};

export const Controlled: Story = {
  parameters: { layout: 'padded' },
  render: function ControlledStory() {
    const [on, setOn] = useState(false);

    return (
      <div className="flex flex-col items-center gap-3">
        <Swap
          effect="flip"
          label="좋아요"
          checked={on}
          onChange={setOn}
          on={<Icon name="heart" size="1em" className="text-3xl text-error" fill="currentColor" />}
          off={<Icon name="heart" size="1em" className="text-3xl" />}
        />
        <span className="text-sm opacity-60">{on ? '좋아요 누름' : '아직 안 누름'}</span>
      </div>
    );
  },
};
