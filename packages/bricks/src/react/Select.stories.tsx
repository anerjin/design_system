import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, Option, OptGroup } from './Select';
import type { FieldColor } from './Input';
import type { Size } from './utils';

const COLORS: FieldColor[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost',
];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const countries = [
  { value: 'kr', label: '대한민국' },
  { value: 'jp', label: '일본' },
  { value: 'us', label: '미국' },
  { value: 'de', label: '독일', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Data Input/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '네이티브 선택 기능을 유지하며 목록이 부드럽게 나타난다. options 배열이나 자식으로 작성할 수 있다. 펼침 애니메이션은 커스텀 선택창을 지원하는 브라우저에서 적용되며, 모션 감소 설정에서는 생략된다.',
      daisyui: 'select',
      props: [
        { name: 'options', type: 'SelectOption[]', description: 'value · label · disabled' },
        { name: 'placeholder', type: 'string', description: '비활성 안내 옵션' },
        { name: 'color', type: 'neutral | … | error | ghost' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
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
  args: { placeholder: '국가를 선택하세요', options: countries },
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Select placeholder="default" options={countries} />
      {COLORS.map((color) => (
        <Select key={color} color={color} placeholder={color} options={countries} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col items-start gap-2">
      {SIZES.map((size) => (
        <Select key={size} size={size} placeholder={size} options={countries} />
      ))}
    </div>
  ),
};

/** `options` 대신 자식으로 직접 작성할 수도 있다 */
export const WithOptGroups: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <Select placeholder="도시를 선택하세요">
      <OptGroup label="한국">
        <Option value="seoul">서울</Option>
        <Option value="busan">부산</Option>
      </OptGroup>
      <OptGroup label="일본">
        <Option value="tokyo">도쿄</Option>
        <Option value="osaka">오사카</Option>
      </OptGroup>
    </Select>
  ),
};

export const States: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-col gap-2">
      <Select options={countries} defaultValue="kr" />
      <Select options={countries} placeholder="비활성" disabled />
      <Select options={countries} color="error" placeholder="선택이 필요합니다" />
    </div>
  ),
};
