import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from './Input';
import type { FieldColor } from './Input';
import type { Size } from './utils';

const COLORS: FieldColor[] = [
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
  'ghost',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Input> = {
  title: 'Data Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '한 줄 텍스트 입력. 아이콘을 주면 daisyUI v5 방식대로 label이 껍데기가 된다.',
      daisyui: 'input',
      props: [
        { name: 'color', type: 'neutral | … | error | ghost', description: '검증 결과 표시에도 쓴다' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'leftIcon', type: 'ReactNode', description: '필드 안쪽 왼쪽' },
        { name: 'rightIcon', type: 'ReactNode', description: '필드 안쪽 오른쪽' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: '입력하세요' },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Input placeholder="default" />
      {COLORS.map((color) => (
        <Input key={color} color={color} placeholder={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      {SIZES.map((size) => (
        <Input key={size} size={size} placeholder={size} />
      ))}
    </div>
  ),
};

/** 아이콘을 주면 `<label class="input">`이 껍데기가 된다 */
export const WithIcons: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Input leftIcon={<Icon name="search" size="1em" />} placeholder="검색" />
      <Input leftIcon={<Icon name="mail" size="1em" />} type="email" placeholder="이메일" />
      <Input rightIcon={<kbd className="kbd kbd-sm">⌘K</kbd>} placeholder="명령 실행" />
      <Input
        leftIcon={<Icon name="banknote" size="1em" />}
        rightIcon={<span className="opacity-60">원</span>}
        type="number"
        placeholder="0"
      />
    </div>
  ),
};

/** 검증 상태는 색상으로 표현한다 */
export const Validation: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Input color="success" defaultValue="사용 가능한 아이디" />
      <Input color="warning" defaultValue="보안이 약한 비밀번호" />
      <Input color="error" defaultValue="이미 사용 중인 이메일" />
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Input placeholder="기본" />
      <Input placeholder="비활성" disabled />
      <Input defaultValue="읽기 전용" readOnly />
    </div>
  ),
};

/** 버튼·접두사를 붙일 때는 `join`으로 감싼다 */
export const Joined: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="join">
        <span className="btn join-item no-animation">https://</span>
        <Input className="join-item" placeholder="example.com" />
      </div>
      <div className="join">
        <Input className="join-item" placeholder="검색어" />
        <button className="btn btn-primary join-item">검색</button>
      </div>
    </div>
  ),
};

export const TextareaSizes: StoryObj<typeof Textarea> = {
  name: 'Textarea',
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-3">
      <Textarea placeholder="기본" rows={3} />
      <Textarea color="primary" placeholder="primary" rows={3} />
      <Textarea color="error" defaultValue="내용을 입력해주세요" rows={3} />
      <Textarea placeholder="비활성" rows={2} disabled />
    </div>
  ),
};
