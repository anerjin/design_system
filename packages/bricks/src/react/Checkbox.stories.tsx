import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxGroup } from './Checkbox';
import type { Color, Size } from './utils';

const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Checkbox> = {
  title: 'Data Input/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '네이티브 체크박스에 클래스만 얹는다. 부분 선택 상태도 지원한다.',
      daisyui: 'checkbox',
      props: [
        { name: 'label', type: 'ReactNode', description: '주면 클릭 가능한 라벨로 감싼다' },
        { name: 'description', type: 'ReactNode', description: '라벨 아래 보조 설명' },
        { name: 'indeterminate', type: 'boolean', defaultValue: 'false' },
        { name: 'color', type: 'neutral | primary | … | error' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '약관에 동의합니다', defaultChecked: true },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Checkbox defaultChecked />
      {COLORS.map((color) => (
        <Checkbox key={color} color={color} defaultChecked aria-label={color} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {SIZES.map((size) => (
        <Checkbox key={size} size={size} color="primary" defaultChecked aria-label={size} />
      ))}
    </div>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-1">
      <Checkbox label="선택 안 함" />
      <Checkbox label="선택함" defaultChecked />
      <Checkbox label="부분 선택" indeterminate />
      <Checkbox label="비활성" disabled />
      <Checkbox label="비활성 + 선택됨" defaultChecked disabled />
    </div>
  ),
};

export const WithDescription: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox
        color="primary"
        label="마케팅 정보 수신"
        description="신제품 소식과 할인 정보를 이메일로 받아봅니다."
        defaultChecked
      />
      <Checkbox
        label="위치 정보 사용"
        description="가까운 매장을 찾는 데 사용됩니다."
      />
    </div>
  ),
};

export const Group: StoryObj<typeof CheckboxGroup> = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-6">
      <CheckboxGroup label="관심 분야" required>
        <Checkbox label="프론트엔드" value="fe" defaultChecked />
        <Checkbox label="백엔드" value="be" />
        <Checkbox label="디자인" value="design" />
      </CheckboxGroup>

      <CheckboxGroup label="알림 채널" inline>
        <Checkbox label="이메일" value="email" defaultChecked />
        <Checkbox label="SMS" value="sms" />
        <Checkbox label="푸시" value="push" />
      </CheckboxGroup>

      <CheckboxGroup label="약관" error="필수 약관에 동의해야 합니다">
        <Checkbox label="이용약관 (필수)" value="tos" />
        <Checkbox label="개인정보 처리방침 (필수)" value="privacy" />
      </CheckboxGroup>
    </div>
  ),
};
