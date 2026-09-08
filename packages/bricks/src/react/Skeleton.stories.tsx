import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonText } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '내용이 오기 전 자리를 표시한다. 크기는 직접 지정한다.',
      daisyui: 'skeleton',
      props: [
        { name: 'className', type: 'string', description: 'h-* / w-* 로 크기를 준다' },
        { name: 'as', type: 'ElementType', defaultValue: "'div'" },
        { name: 'lines', type: 'number', defaultValue: '3', description: 'SkeletonText의 줄 수' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 크기는 스스로 정하지 않는다. `className`으로 준다 */
export const Default: Story = {
  render: () => <Skeleton className="h-32 w-full max-w-sm" />,
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Skeleton className="size-16 rounded-full" />
      <Skeleton className="size-16 rounded-box" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-24 w-40 rounded-box" />
    </div>
  ),
};

export const Text: StoryObj<typeof SkeletonText> = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-6">
      <SkeletonText lines={3} />
      <SkeletonText lines={5} shortLastLine={false} />
    </div>
  ),
};

/** 카드 하나가 불러와지는 동안의 모습 */
export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-4 rounded-box border border-base-300 p-4">
      <Skeleton className="h-40 w-full rounded-box" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  ),
};

/** 목록이 불러와지는 동안의 모습 */
export const ListPlaceholder: Story = {
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-12 shrink-0 rounded-full" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  ),
};
