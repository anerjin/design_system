import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Extras/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '날짜 선택기. daisyUI에 없어 DOI INC가 만들되 input·btn은 daisyUI에서 빌려 쓴다.',
      props: [
        { name: 'value', type: 'Date | null' },
        { name: 'onChange', type: '(date: Date | null) => void' },
        { name: 'format', type: "'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy년 MM월 dd일'", defaultValue: 'yyyy-MM-dd' },
        { name: 'locale', type: 'ko | en', defaultValue: 'ko' },
        { name: 'minDate / maxDate', type: 'Date', description: '선택 범위 제한' },
        { name: 'clearable', type: 'boolean', defaultValue: 'true' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    locale: { control: 'select', options: ['ko', 'en'] },
    format: {
      control: 'select',
      options: ['yyyy-MM-dd', 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy년 MM월 dd일'],
    },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    clearable: { control: 'boolean' },
    showToday: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * daisyUI에는 날짜 선택기가 없다. DOI INC 고유 컴포넌트로 남기되,
 * 입력 줄은 daisyUI `input`, 날짜 칸은 `btn`을 빌려 쓰고 격자는 Tailwind로 짰다.
 * 전용 CSS 파일은 없다.
 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [date, setDate] = useState<Date | null>(null);
    return (
      <div className="h-96">
        <DatePicker {...args} value={date} onChange={setDate} />
      </div>
    );
  },
};

/** 달력이 펼쳐진 모습 — 입력 칸에 포커스를 주면 열린다 */
export const Opened: Story = {
  render: function OpenedStory() {
    const [date, setDate] = useState<Date | null>(new Date(2026, 8, 4));
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
      wrapper.current?.querySelector('input')?.focus();
    }, []);

    return (
      <div className="h-[26rem]" ref={wrapper}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DatePicker key={size} size={size} placeholder={`${size} 크기`} />
      ))}
    </div>
  ),
};

export const Formats: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['yyyy-MM-dd', 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy년 MM월 dd일'] as const).map((format) => (
        <DatePicker key={format} format={format} value={new Date(2026, 8, 4)} placeholder={format} />
      ))}
    </div>
  ),
};

export const Locales: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DatePicker locale="ko" placeholder="한국어" />
      <DatePicker locale="en" format="MM/dd/yyyy" placeholder="English" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <DatePicker placeholder="기본" />
      <DatePicker placeholder="비활성" disabled />
      <DatePicker value={new Date()} readOnly />
      <DatePicker
        placeholder="오류 상태"
        error
        errorMessage="날짜를 선택해주세요"
      />
    </div>
  ),
};

/** 선택 가능한 범위를 제한한다 */
export const Constrained: Story = {
  render: function ConstrainedStory() {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), 1);
    const max = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return (
      <div className="h-96">
        <DatePicker
          minDate={min}
          maxDate={max}
          placeholder="이번 달만 선택 가능"
        />
      </div>
    );
  },
};
