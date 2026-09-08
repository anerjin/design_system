import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Countdown, CountdownTimer } from './Countdown';

const meta: Meta<typeof Countdown> = {
  title: 'Data Display/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '숫자가 굴러가며 바뀌는 카운터. 목표 시각까지 세는 타이머도 함께 제공한다.',
      daisyui: 'countdown',
      props: [
        { name: 'value', type: 'number', description: '0~99만 표현할 수 있다' },
        { name: 'label', type: 'string', description: '스크린리더용 설명' },
        { name: 'target', type: 'Date', description: 'CountdownTimer가 세는 목표 시각' },
        { name: 'showDays', type: 'boolean', defaultValue: 'true', description: 'CountdownTimer 전용' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 99 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: 42 },
  render: (args) => <span className="font-mono text-5xl"><Countdown {...args} /></span>,
};

/** 숫자가 바뀔 때 굴러가는 애니메이션이 붙는다 */
export const Ticking: Story = {
  render: function TickingStory() {
    const [n, setN] = useState(10);

    useEffect(() => {
      const timer = setInterval(() => setN((v) => (v === 0 ? 60 : v - 1)), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <span className="font-mono text-6xl">
        <Countdown value={n} label={`${n}초 남음`} />
      </span>
    );
  },
};

/** 목표 시각까지 남은 시간을 센다 */
export const Timer: StoryObj<typeof CountdownTimer> = {
  parameters: { layout: 'padded' },
  render: function TimerStory() {
    const [target] = useState(() => new Date(Date.now() + 2 * 86400_000 + 3 * 3600_000 + 725_000));
    return <CountdownTimer target={target} />;
  },
};

export const TimerWithoutDays: StoryObj<typeof CountdownTimer> = {
  parameters: { layout: 'padded' },
  render: function TimerStory() {
    const [target] = useState(() => new Date(Date.now() + 3 * 3600_000 + 725_000));
    return <CountdownTimer target={target} showDays={false} />;
  },
};

/** 배경 위에 올린 구성 */
export const Styled: Story = {
  parameters: { layout: 'padded' },
  render: function StyledStory() {
    const [target] = useState(() => new Date(Date.now() + 5 * 3600_000));

    return (
      <div className="w-fit rounded-box bg-neutral p-6 text-neutral-content">
        <p className="mb-3 text-sm opacity-70">할인 종료까지</p>
        <CountdownTimer target={target} showDays={false} />
      </div>
    );
  },
};
