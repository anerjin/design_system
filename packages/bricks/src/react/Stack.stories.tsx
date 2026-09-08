import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import type { StackAlign } from './Stack';

const ALIGNS: StackAlign[] = ['top', 'bottom', 'start', 'end'];

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '자식들을 같은 자리에 겹쳐 쌓아 카드 더미처럼 보이게 한다.',
      daisyui: 'stack',
      props: [
        { name: 'align', type: 'top | bottom | start | end', defaultValue: 'bottom', description: '쌓이는 방향' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ALIGNS },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args} className="h-24 w-64">
      <div className="grid place-content-center rounded-box border border-base-300 bg-base-100 shadow-md">
        맨 앞
      </div>
      <div className="grid place-content-center rounded-box border border-base-300 bg-base-200 shadow">
        가운데
      </div>
      <div className="grid place-content-center rounded-box border border-base-300 bg-base-300 shadow-sm">
        맨 뒤
      </div>
    </Stack>
  ),
};

export const Alignments: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-12">
      {ALIGNS.map((align) => (
        <div key={align} className="flex flex-col items-center gap-2">
          <Stack align={align} className="h-20 w-40">
            <div className="grid place-content-center rounded-box bg-primary text-primary-content">1</div>
            <div className="grid place-content-center rounded-box bg-secondary text-secondary-content">2</div>
            <div className="grid place-content-center rounded-box bg-accent text-accent-content">3</div>
          </Stack>
          <span className="text-xs opacity-60">{align}</span>
        </div>
      ))}
    </div>
  ),
};

/** 알림이 쌓인 모습을 표현할 때 쓴다 */
export const NotificationPile: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Stack className="w-80">
      <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow-md">
        <div className="font-semibold">새 메시지 3건</div>
        <div className="text-sm opacity-60">방금 전</div>
      </div>
      <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow">
        <div className="font-semibold">배포 완료</div>
      </div>
      <div className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
        <div className="font-semibold">리뷰 요청</div>
      </div>
    </Stack>
  ),
};
