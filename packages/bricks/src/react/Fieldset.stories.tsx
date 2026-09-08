import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset, Label } from './Fieldset';
import { Input, Textarea } from './Input';
import { Select } from './Select';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Fieldset> = {
  title: 'Data Input/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '라벨·입력·설명을 한 묶음으로 감싼다. daisyUI에서 폼을 짜는 표준 방식이다.',
      daisyui: 'fieldset',
      props: [
        { name: 'legend', type: 'ReactNode', description: '묶음 제목' },
        { name: 'hint', type: 'ReactNode', description: '아래쪽 보조 설명' },
        { name: 'bordered', type: 'boolean', defaultValue: 'false', description: '테두리와 배경' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 제목, 입력 라벨, 보조 설명의 위계를 갖춘 계정 입력 예제 */
export const Default: Story = {
  args: { bordered: true },
  render: function AccountStory(args) {
    const id = useId();
    return (
      <Fieldset {...args} className="w-full max-w-lg" legend="계정">
        <Label htmlFor={id + '-email'} required>
          이메일
        </Label>
        <Input
          id={id + '-email'}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="me@example.com"
          aria-describedby={id + '-hint'}
        />
        <Fieldset.Hint id={id + '-hint'}>로그인과 계정 알림에 사용됩니다.</Fieldset.Hint>
      </Fieldset>
    );
  },
};

export const Bordered: Story = {
  render: function ProfileStory() {
    const id = useId();
    return (
      <Fieldset bordered className="w-full max-w-lg" legend="프로필">
        <div className="fieldset-field">
          <Label htmlFor={id + '-name'}>이름</Label>
          <Input id={id + '-name'} name="name" autoComplete="name" placeholder="홍길동" />
        </div>
        <div className="fieldset-field">
          <Label htmlFor={id + '-bio'}>소개</Label>
          <Textarea
            id={id + '-bio'}
            name="bio"
            placeholder="간단한 소개를 작성해 주세요."
            rows={3}
            aria-describedby={id + '-hint'}
          />
          <Fieldset.Hint id={id + '-hint'}>공개 프로필에 표시됩니다.</Fieldset.Hint>
        </div>
      </Fieldset>
    );
  },
};

export const FullForm: Story = {
  render: function ShippingStory() {
    const id = useId();
    return (
      <form className="flex w-full max-w-lg flex-col gap-6" onSubmit={(event) => event.preventDefault()}>
        <Fieldset bordered legend="배송 정보">
          <div className="fieldset-field">
            <Label htmlFor={id + '-name'} required>
              받는 분
            </Label>
            <Input
              id={id + '-name'}
              name="recipient"
              autoComplete="shipping name"
              required
              placeholder="이름"
            />
          </div>
          <div className="fieldset-field">
            <Label htmlFor={id + '-phone'} required>
              연락처
            </Label>
            <Input
              id={id + '-phone'}
              name="phone"
              autoComplete="shipping tel"
              required
              type="tel"
              placeholder="010-0000-0000"
            />
          </div>
          <div className="fieldset-field">
            <Label htmlFor={id + '-method'}>배송 방법</Label>
            <Select
              id={id + '-method'}
              name="delivery"
              placeholder="선택하세요"
              options={[
                { value: 'std', label: '일반 배송' },
                { value: 'exp', label: '빠른 배송' },
              ]}
            />
          </div>
        </Fieldset>

        <Fieldset bordered legend="동의">
          <Checkbox
            name="terms"
            required
            label="이용약관에 동의합니다 (필수)"
            aria-describedby={id + '-terms-hint'}
          />
          <Checkbox name="marketing" label="마케팅 정보 수신에 동의합니다 (선택)" />
          <Fieldset.Hint id={id + '-terms-hint'}>마케팅 수신 동의는 선택 사항입니다.</Fieldset.Hint>
        </Fieldset>
      </form>
    );
  },
};

export const WithoutLegend: Story = {
  parameters: { gallery: { description: '제목과 박스 없이 라벨과 입력만 묶는 기본형입니다.' } },
  render: function SearchStory() {
    const id = useId();
    return (
      <Fieldset className="w-full max-w-lg">
        <Label htmlFor={id}>검색어</Label>
        <Input id={id} name="query" type="search" placeholder="무엇을 찾으시나요?" />
      </Fieldset>
    );
  },
};
