import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';
import type { AvatarShape } from './Avatar';
import type { Color, Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const SHAPES: AvatarShape[] = ['circle', 'rounded', 'square', 'squircle'];
const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

/**
 * 사진 자리표시자.
 *
 * 사진은 테마 색을 따르지 않는 것이 정상이라 중립 회색으로 둔다.
 * 색이 필요한 데모는 이미지 대신 `initials` + `color`를 써서 테마를 따르게 한다.
 */
const PHOTO = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
  + '<rect width="64" height="64" fill="#9ca3af"/>'
  + '<circle cx="32" cy="25" r="11" fill="#e5e7eb"/>'
  + '<path d="M9 64c0-13 10-21 23-21s23 8 23 21z" fill="#e5e7eb"/></svg>',
);

/** 데모용 이름 — 이니셜 아바타의 시드로 쓴다 */
const NAMES = ['서준', '하윤', '도윤', '지우', '민서', '예린'];

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '사용자를 나타내는 이미지 또는 이니셜. 그룹으로 겹쳐 놓을 수 있다.',
      daisyui: 'avatar',
      props: [
        { name: 'src', type: 'string', description: '이미지 주소' },
        { name: 'initials', type: 'string', description: '이미지가 없을 때 표시할 글자' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'shape', type: 'circle | rounded | square | squircle', defaultValue: 'circle' },
        { name: 'status', type: 'online | offline', description: 'daisyUI가 지원하는 두 가지' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: SHAPES },
    color: { control: 'select', options: COLORS },
    status: { control: 'select', options: [undefined, 'online', 'offline'] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { initials: '서준', color: 'primary', alt: '김서준' },
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <Avatar initials="서준" color="primary" size={size} />
          <span className="text-xs opacity-60">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const Shapes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      {SHAPES.map((shape) => (
        <div key={shape} className="flex flex-col items-center gap-1">
          <Avatar initials="서준" color="accent" shape={shape} />
          <span className="text-xs opacity-60">{shape}</span>
        </div>
      ))}
    </div>
  ),
};

/** `src`를 주면 이미지가 들어간다. 사진은 테마 색을 따르지 않는다 */
export const WithImage: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SHAPES.map((shape) => (
        <Avatar key={shape} src={PHOTO} shape={shape} alt="사용자" />
      ))}
    </div>
  ),
};

/** 이미지가 없을 때 이니셜로 대체된다 */
export const Placeholder: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {COLORS.map((color) => (
        <Avatar key={color} initials={color.slice(0, 2)} color={color} />
      ))}
    </div>
  ),
};

/** daisyUI가 지원하는 접속 상태는 online / offline 두 가지다 */
export const Status: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar initials="서준" color="primary" status="online" alt="접속 중" />
      <Avatar initials="하윤" color="neutral" status="offline" alt="오프라인" />
      <Avatar src={PHOTO} status="online" alt="접속 중" />
    </div>
  ),
};

export const Group: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      <AvatarGroup>
        {NAMES.slice(0, 3).map((name, i) => (
          <Avatar key={name} initials={name} color={COLORS[i + 1]} />
        ))}
      </AvatarGroup>

      <AvatarGroup max={3} size="sm">
        {NAMES.map((name, i) => (
          <Avatar key={name} initials={name} color={COLORS[i + 1]} />
        ))}
      </AvatarGroup>

      <AvatarGroup max={2} size="lg">
        {NAMES.slice(0, 4).map((name, i) => (
          <Avatar key={name} initials={name} color={COLORS[i + 1]} />
        ))}
      </AvatarGroup>
    </div>
  ),
};
