import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';
import type { Color } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof Link> = {
  title: 'Navigation/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '본문 링크. as로 라우터의 Link 컴포넌트를 끼워 넣을 수 있다.',
      daisyui: 'link',
      props: [
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'hoverOnly', type: 'boolean', defaultValue: 'false', description: '올렸을 때만 밑줄' },
        { name: 'as', type: 'ElementType', defaultValue: "'a'", description: 'Next.js Link 등' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    hoverOnly: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { href: '#', children: '문서 보기' },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Link href="#">기본</Link>
      {COLORS.map((color) => (
        <Link key={color} href="#" color={color}>{color}</Link>
      ))}
    </div>
  ),
};

/** 평소엔 밑줄을 감추고 마우스를 올렸을 때만 보여준다 */
export const HoverOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link href="#">항상 밑줄</Link>
      <Link href="#" hoverOnly>마우스를 올려야 밑줄</Link>
      <Link href="#" hoverOnly color="primary">색상 + hoverOnly</Link>
    </div>
  ),
};

/** 문장 안에 섞어 쓰기 */
export const InText: Story = {
  render: () => (
    <p className="max-w-md text-sm leading-7">
      자세한 내용은 <Link href="#" color="primary">설치 안내</Link>를 참고하세요.
      문제가 있으면 <Link href="#" color="error">이슈를 남겨</Link> 주시면 됩니다.
    </p>
  ),
};

/** `as`로 라우터의 Link 컴포넌트를 끼워 넣을 수 있다 */
export const CustomElement: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Link as="button" color="primary" onClick={() => {}}>버튼으로 렌더</Link>
      <Link as="span" color="secondary">span으로 렌더</Link>
    </div>
  ),
};
