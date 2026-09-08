import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from './Carousel';

/**
 * 데모용 슬라이드.
 *
 * 색을 직접 박지 않고 테마 색으로 칠한다 — 툴바에서 테마를 바꾸면 함께 바뀐다.
 * 이미지 대신 요소를 넣어도 캐러셀은 그대로 동작한다.
 */
const SLIDE_COLORS = [
  'bg-primary text-primary-content',
  'bg-secondary text-secondary-content',
  'bg-base-200 text-base-content',
  'bg-base-300 text-base-content',
] as const;

const slides = SLIDE_COLORS.map((color, index) => ({
  id: `slide-${index + 1}`,
  color,
  label: String(index + 1),
}));

/** 슬라이드 한 장 */
const Slide = ({ color, label }: { color: string; label: string }) => (
  <div className={`grid min-h-48 h-full w-full place-content-center text-4xl font-semibold ${color}`}>
    {label}
  </div>
);

const meta: Meta<typeof Carousel> = {
  title: 'Data Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    gallery: {
      description: 'CSS 스크롤 스냅으로 넘기는 슬라이드. 화살표는 페이지 이동 없이 슬라이드만 전환한다.',
      daisyui: 'carousel',
      props: [
        { name: 'items', type: 'CarouselItem[]', description: 'id와 content' },
        { name: 'direction', type: 'horizontal | vertical', defaultValue: 'horizontal' },
        { name: 'snap', type: 'start | center | end', defaultValue: 'start' },
        { name: 'showControls', type: 'boolean', defaultValue: 'false', description: '앞뒤 화살표' },
        { name: 'itemClassName', type: 'string', description: '각 슬라이드의 폭 지정' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] },
    snap: { control: 'select', options: ['start', 'center', 'end'] },
    showControls: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 좌우로 스크롤한다 */
export const Default: Story = {
  render: () => (
    <Carousel
      className="w-full max-w-xl rounded-box"
      itemClassName="w-full"
      items={slides.map((s) => ({
        id: s.id,
        content: <Slide color={s.color} label={s.label} />,
      }))}
    />
  ),
};

/** 화살표로 이전·다음 슬라이드로 이동한다 */
export const WithControls: Story = {
  render: () => (
    <Carousel
      showControls
      className="w-full max-w-xl rounded-box"
      itemClassName="w-full"
      items={slides.map((s) => ({
        id: `ctl-${s.id}`,
        content: <Slide color={s.color} label={s.label} />,
      }))}
    />
  ),
};

/** 여러 장을 한 화면에 늘어놓는다 */
export const MultipleVisible: Story = {
  render: () => (
    <Carousel
      className="w-full max-w-xl gap-4 rounded-box"
      itemClassName="w-64"
      items={slides.map((s) => ({
        id: `multi-${s.id}`,
        content: <Slide color={`${s.color} rounded-box`} label={s.label} />,
      }))}
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <Carousel
      direction="vertical"
      className="h-72 w-full max-w-md rounded-box"
      itemClassName="h-full"
      items={slides.map((s) => ({
        id: `vert-${s.id}`,
        content: <Slide color={s.color} label={s.label} />,
      }))}
    />
  ),
};

export const SnapCenter: Story = {
  render: () => (
    <Carousel
      snap="center"
      className="w-full max-w-xl gap-4 rounded-box"
      itemClassName="w-64"
      items={slides.map((s) => ({
        id: `center-${s.id}`,
        content: <Slide color={`${s.color} rounded-box`} label={s.label} />,
      }))}
    />
  ),
};
