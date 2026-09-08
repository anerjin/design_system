import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mask } from './Mask';
import type { MaskShape } from './Mask';

const SHAPES: MaskShape[] = [
  'squircle', 'heart', 'hexagon', 'hexagon-2', 'decagon', 'pentagon',
  'diamond', 'circle', 'star', 'star-2',
  'triangle', 'triangle-2', 'triangle-3', 'triangle-4',
];

/**
 * 데모용 채움.
 *
 * 색을 직접 박지 않고 테마 색으로 칠한다 — 툴바에서 테마를 바꾸면 함께 바뀐다.
 * Mask는 이미지뿐 아니라 배경을 준 요소도 잘라내므로 div로 충분하다.
 */
const FILL = 'bg-primary';

/**
 * 사진 자리표시자.
 *
 * 사진은 테마 색을 따르지 않는 것이 정상이므로 중립 회색으로 둔다.
 * 외부 이미지를 받아오지 않도록 데이터 URI로 만든다.
 */
const PHOTO = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
  + '<rect width="100" height="100" fill="#9ca3af"/>'
  + '<circle cx="50" cy="38" r="16" fill="#d1d5db"/>'
  + '<path d="M14 100c0-20 16-32 36-32s36 12 36 32z" fill="#d1d5db"/></svg>',
);

const meta: Meta<typeof Mask> = {
  title: 'Layout/Mask',
  component: Mask,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '요소를 지정한 모양으로 잘라낸다. 이미지에 가장 많이 쓴다.',
      daisyui: 'mask',
      props: [
        { name: 'shape', type: 'squircle | heart | hexagon | star | triangle | …', description: '14가지' },
        { name: 'half', type: '1 | 2', description: '모양의 절반만 보여준다' },
        { name: 'as', type: 'ElementType', defaultValue: "'div'", description: 'img 등으로 바꿀 수 있다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: { control: 'select', options: SHAPES },
    half: { control: 'select', options: [undefined, 1, 2] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { shape: 'squircle' },
  render: (args) => <Mask {...args} className={`size-24 ${FILL}`} />,
};

export const Shapes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-7">
      {SHAPES.map((shape) => (
        <div key={shape} className="flex flex-col items-center gap-1">
          <Mask shape={shape} className={`size-16 ${FILL}`} />
          <span className="text-center text-xs opacity-60">{shape}</span>
        </div>
      ))}
    </div>
  ),
};

/** 모양의 절반만 잘라낸다 */
export const Halves: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Mask shape="heart" className={`size-20 ${FILL}`} />
      <Mask shape="heart" half={1} className={`size-20 ${FILL}`} />
      <Mask shape="heart" half={2} className={`size-20 ${FILL}`} />
    </div>
  ),
};

/** 단색 채움과 글자 */
export const OnColorBlock: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Mask shape="star" className="size-20 bg-warning" />
      <Mask shape="hexagon" className="size-20 bg-primary" />
      <Mask shape="squircle" className="grid size-20 place-content-center bg-accent text-accent-content">
        BR
      </Mask>
    </div>
  ),
};

/** 이미지에 씌울 때는 `as="img"`로 렌더한다 */
export const OnImage: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Mask shape="squircle" as="img" src={PHOTO} alt="" className="w-20" />
      <Mask shape="circle" as="img" src={PHOTO} alt="" className="w-20" />
      <Mask shape="hexagon" as="img" src={PHOTO} alt="" className="w-20" />
    </div>
  ),
};
