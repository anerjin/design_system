import type { Meta, StoryObj } from '@storybook/react-vite';
import { Validator } from './Validator';
import { Input } from './Input';
import { Select } from './Select';
import { Fieldset, Label } from './Fieldset';
import { Button } from './Button';

const meta: Meta<typeof Validator> = {
  title: 'Data Input/Validator',
  component: Validator,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '브라우저 기본 폼 검증에 기대는 안내. 별도 상태가 없다.',
      daisyui: 'validator',
      props: [
        { name: 'hint', type: 'ReactNode', description: '검증 실패 시 보여줄 안내' },
        { name: 'reserveSpace', type: 'boolean', defaultValue: 'true', description: '안내 자리를 미리 비워 둔다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    reserveSpace: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 브라우저 기본 검증(HTML5)에 기댄다. 입력하고 포커스를 옮기면 안내가 뜬다.
 * 안쪽 입력에 `className="validator"`를 반드시 붙여야 한다.
 */
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Validator hint="올바른 이메일을 입력하세요">
        <Input className="validator" type="email" required placeholder="me@example.com" />
      </Validator>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Validator hint="올바른 이메일을 입력하세요">
        <Input className="validator" type="email" required placeholder="이메일" />
      </Validator>

      <Validator hint="https:// 로 시작하는 주소를 입력하세요">
        <Input className="validator" type="url" required placeholder="https://example.com" />
      </Validator>

      <Validator hint="1에서 10 사이의 숫자를 입력하세요">
        <Input className="validator" type="number" min={1} max={10} required placeholder="1-10" />
      </Validator>

      <Validator hint="영문 소문자와 숫자만, 3~16자">
        <Input
          className="validator"
          pattern="[a-z0-9]{3,16}"
          required
          placeholder="아이디"
        />
      </Validator>
    </div>
  ),
};

/** `reserveSpace`를 끄면 오류일 때만 자리를 차지한다 */
export const SpaceReservation: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <div className="rounded-box border border-base-300 p-3">
        <p className="mb-2 text-xs opacity-60">reserveSpace (기본) — 자리를 미리 비워 둔다</p>
        <Validator hint="올바른 이메일을 입력하세요">
          <Input className="validator" type="email" required placeholder="이메일" />
        </Validator>
      </div>

      <div className="rounded-box border border-base-300 p-3">
        <p className="mb-2 text-xs opacity-60">reserveSpace 끔 — 오류일 때만 나타난다</p>
        <Validator reserveSpace={false} hint="올바른 이메일을 입력하세요">
          <Input className="validator" type="email" required placeholder="이메일" />
        </Validator>
      </div>
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <form className="w-80" onSubmit={(e) => e.preventDefault()}>
      <Fieldset bordered legend="가입">
        <Label required>이메일</Label>
        <Validator hint="올바른 이메일을 입력하세요">
          <Input className="validator" type="email" required placeholder="me@example.com" />
        </Validator>

        <Label required>비밀번호</Label>
        <Validator hint="8자 이상, 영문과 숫자를 섞어주세요">
          <Input
            className="validator"
            type="password"
            required
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
            placeholder="********"
          />
        </Validator>

        <Label required>국가</Label>
        <Validator hint="국가를 선택하세요">
          <Select
            className="validator"
            required
            placeholder="선택하세요"
            options={[
              { value: 'kr', label: '대한민국' },
              { value: 'jp', label: '일본' },
            ]}
          />
        </Validator>

        <Button type="submit" color="primary" className="mt-2">가입</Button>
      </Fieldset>
    </form>
  ),
};
