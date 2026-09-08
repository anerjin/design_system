import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, FloatingLabel } from './Fieldset';
import { Input } from './Input';
import { Select } from './Select';

const meta: Meta<typeof Label> = {
  title: 'Data Input/Label',
  component: Label,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '입력 필드의 이름. 값이 들어가면 떠오르는 FloatingLabel도 함께 제공한다.',
      daisyui: 'label',
      props: [
        { name: 'required', type: 'boolean', defaultValue: 'false', description: '필수 표시(*)' },
        { name: 'label', type: 'ReactNode', description: 'FloatingLabel에서 떠오르는 글자' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '이메일' },
};

export const Required: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1">
      <Label htmlFor="email" required>이메일</Label>
      <Input id="email" type="email" placeholder="me@example.com" />
    </div>
  ),
};

/** 입력 안쪽에 붙는 접두·접미 글자로도 쓴다 */
export const InsideInput: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <label className="input w-full">
        <span className="label">https://</span>
        <input type="text" placeholder="example.com" />
      </label>
      <label className="input w-full">
        <input type="text" placeholder="0" />
        <span className="label">원</span>
      </label>
    </div>
  ),
};

/** 값이 들어가면 라벨이 위로 떠오른다 */
export const Floating: StoryObj<typeof FloatingLabel> = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <FloatingLabel label="이름">
        <Input placeholder="이름" />
      </FloatingLabel>

      <FloatingLabel label="이메일">
        <Input type="email" placeholder="이메일" defaultValue="me@example.com" />
      </FloatingLabel>

      <FloatingLabel label="국가">
        <Select
          placeholder="국가"
          options={[
            { value: 'kr', label: '대한민국' },
            { value: 'jp', label: '일본' },
          ]}
        />
      </FloatingLabel>
    </div>
  ),
};
