import type { Meta, StoryObj } from '@storybook/react-vite';
import { Diff } from './Diff';

/**
 * 데모용 판.
 *
 * 색을 직접 박지 않고 테마 색으로 칠한다 — 툴바에서 테마를 바꾸면 함께 바뀐다.
 *
 * 크기는 지정하지 않는다. daisyUI가 `.diff-item-* > *`에 `width: 100cqi`를 줘서
 * 컨테이너 전체 폭으로 늘려 놓는데, 여기서 `w-full`을 주면 그게 덮여
 * 칸 너비에만 그려지고 반대쪽 판에 가려진다.
 */
const Panel = ({ className, label, align }: {
  className: string;
  label: string;
  /* 두 판 모두 전체 폭을 차지하므로 글자를 가운데 두면 서로 겹친다 */
  align: 'start' | 'end';
}) => (
  <div
    className={[
      'grid items-center text-3xl font-bold',
      align === 'start' ? 'justify-items-start ps-8' : 'justify-items-end pe-8',
      className,
    ].join(' ')}
  >
    {label}
  </div>
);

const meta: Meta<typeof Diff> = {
  title: 'Data Display/Diff',
  component: Diff,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '손잡이를 끌어 두 내용을 겹쳐 비교한다.',
      daisyui: 'diff',
      props: [
        { name: 'before', type: 'ReactNode', description: '왼쪽(기준) 내용' },
        { name: 'after', type: 'ReactNode', description: '오른쪽(비교) 내용' },
        { name: 'className', type: 'string', description: '높이를 직접 줘야 한다 (aspect-* 등)' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 가운데 손잡이를 좌우로 끌어 비교한다 */
export const Default: Story = {
  render: () => (
    <Diff
      className="aspect-16/9 w-full max-w-xl rounded-box"
      before={<Panel align="start" className="bg-base-300 text-base-content" label="BEFORE" />}
      after={<Panel align="end" className="bg-primary text-primary-content" label="AFTER" />}
    />
  ),
};

/** 이미지가 아니어도 된다 */
export const TextComparison: Story = {
  render: () => (
    <Diff
      className="aspect-16/9 w-full max-w-xl rounded-box"
      label="글꼴 비교"
      before={(
        <div className="grid place-content-center bg-base-200 text-6xl font-black">
          DOI INC
        </div>
      )}
      after={(
        <div className="grid place-content-center bg-primary text-6xl font-black text-primary-content">
          DOI INC
        </div>
      )}
    />
  ),
};
