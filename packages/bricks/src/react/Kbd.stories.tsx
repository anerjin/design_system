import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd, KbdGroup } from './Kbd';
import type { Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Kbd> = {
  title: 'Data Display/Kbd',
  component: Kbd,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '키보드 키를 표현한다. 조합은 KbdGroup으로 묶는다.',
      daisyui: 'kbd',
      props: [
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'keys', type: 'ReactNode[]', description: 'KbdGroup에서 키 조합' },
        { name: 'separator', type: 'ReactNode', defaultValue: "'+'", description: 'KbdGroup의 구분자' },
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

export const Default: Story = {
  args: { children: 'K' },
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((size) => <Kbd key={size} size={size}>{size}</Kbd>)}
    </div>
  ),
};

export const Combinations: StoryObj<typeof KbdGroup> = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <KbdGroup keys={['⌘', 'K']} />
      <KbdGroup keys={['Ctrl', 'Shift', 'P']} size="sm" />
      <KbdGroup keys={['⌥', '⇧', 'F']} size="lg" />
      <KbdGroup keys={['Ctrl', 'C']} separator="then" size="sm" />
    </div>
  ),
};

/** 문장 안에 섞어 쓰기 */
export const InText: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <p className="max-w-md text-sm leading-7">
      명령 팔레트를 열려면 <KbdGroup keys={['⌘', 'K']} size="sm" />를 누르세요.
      저장은 <Kbd size="sm">⌘</Kbd> <Kbd size="sm">S</Kbd>입니다.
    </p>
  ),
};

/** 방향키 배치 */
export const ArrowKeys: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col items-center gap-1">
      <Kbd>▲</Kbd>
      <div className="flex gap-1">
        <Kbd>◀</Kbd>
        <Kbd>▼</Kbd>
        <Kbd>▶</Kbd>
      </div>
    </div>
  ),
};
