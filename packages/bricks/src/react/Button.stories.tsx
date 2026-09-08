import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button';

const COLORS: ButtonColor[] = [
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
];
const VARIANTS: ButtonVariant[] = ['solid', 'surface', 'outline', 'dash', 'soft', 'ghost', 'link'];
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    // 갤러리가 읽어 가는 메타데이터. 설명은 여기 한 곳에만 둔다.
    gallery: {
      description:
        '알약 형태의 공통 버튼. 8가지 색상과 7가지 스타일을 제공하며, surface는 무채색 보조 동작에 사용한다. 아이콘 전용 버튼은 square와 circle 형태를 선택할 수 있다.',
      daisyui: 'btn',
      props: [
        {
          name: 'color',
          type: 'neutral | primary | secondary | accent | info | success | warning | error',
          description: '시맨틱 색상',
        },
        {
          name: 'variant',
          type: 'solid | surface | outline | dash | soft | ghost | link',
          defaultValue: 'solid',
        },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'shape', type: 'square | circle', description: '아이콘 전용 버튼' },
        {
          name: 'as',
          type: 'ElementType',
          defaultValue: "'button'",
          description: '링크에 버튼 모양을 입힐 때 "a"',
        },
        { name: 'loading', type: 'boolean', defaultValue: 'false', description: '스피너 표시 + 비활성' },
        { name: 'block', type: 'boolean', defaultValue: 'false', description: '부모 너비를 채운다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'select', options: SIZES },
    shape: { control: 'select', options: [undefined, 'square', 'circle'] },
    wide: { control: 'boolean' },
    block: { control: 'boolean' },
    active: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};

/** 8가지 시맨틱 색상 */
export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>default</Button>
      {COLORS.map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

/** 7가지 스타일. surface는 color와 무관하게 무채색 표면을 사용한다. */
export const Variants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          <span className="w-16 shrink-0 text-xs opacity-60">{variant}</span>
          {variant === 'surface' ? (
            <>
              <Button variant="surface">취소</Button>
              <Button variant="surface" disabled>
                비활성
              </Button>
            </>
          ) : (
            COLORS.map((color) => (
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))
          )}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {SIZES.map((size) => (
        <Button key={size} color="primary" size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

/** 아이콘 전용 버튼 */
export const Shapes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button shape="square" color="primary" aria-label="검색">
        <Icon name="search" size="1em" />
      </Button>
      <Button shape="circle" color="primary" aria-label="검색">
        <Icon name="search" size="1em" />
      </Button>
      <Button shape="square" variant="outline" aria-label="닫기">
        <Icon name="x" size="1em" />
      </Button>
      <Button shape="circle" variant="ghost" aria-label="더보기">
        <Icon name="ellipsis" size="1em" />
      </Button>
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button color="primary">기본</Button>
      <Button color="primary" active>
        active
      </Button>
      <Button color="primary" disabled>
        disabled
      </Button>
      <Button color="primary" loading>
        로딩 중
      </Button>
      <Button loading />
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button color="primary" leftIcon={<Icon name="save" size="1em" />}>
        저장
      </Button>
      <Button variant="outline" rightIcon={<Icon name="arrow-right" size="1em" />}>
        다음
      </Button>
      <Button color="primary" leftIcon={<Icon name="trash-2" size="1em" />}>
        삭제
      </Button>
    </div>
  ),
};

/** 너비 조절 */
export const Widths: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-96 flex-col gap-2">
      <Button color="primary">기본</Button>
      <Button color="primary" wide>
        wide
      </Button>
      <Button color="primary" block>
        block
      </Button>
    </div>
  ),
};

/**
 * daisyUI의 `btn`은 `<a>`에도 정식으로 쓰인다.
 * `as`를 주면 버튼 모양의 링크가 되고, 비활성은 `btn-disabled`로 처리된다.
 */
export const AsLink: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button as="a" href="#" color="primary">
        링크 버튼
      </Button>
      <Button as="a" href="#" variant="outline" leftIcon={<Icon name="external-link" size="1em" />}>
        새 탭에서 열기
      </Button>
      <Button as="a" href="#" variant="ghost" disabled>
        비활성 링크
      </Button>
    </div>
  ),
};

/** daisyUI 테마에 따라 색이 바뀐다 — 툴바의 Theme을 바꿔 확인 */
export const OnSurfaces: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      {(['bg-base-100', 'bg-base-200', 'bg-base-300'] as const).map((bg) => (
        <div key={bg} className={`${bg} flex flex-wrap gap-2 rounded-box p-4`}>
          <span className="w-24 shrink-0 self-center text-xs opacity-60">{bg}</span>
          <Button color="primary">primary</Button>
          <Button color="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
        </div>
      ))}
    </div>
  ),
};
