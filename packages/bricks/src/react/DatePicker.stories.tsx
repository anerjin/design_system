import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Data Entry/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['yyyy-MM-dd', 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy년 MM월 dd일'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    locale: {
      control: 'select',
      options: ['ko', 'en'],
    },
    firstDayOfWeek: {
      control: 'number',
      min: 0,
      max: 6,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '날짜를 선택하세요',
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(),
    placeholder: '날짜를 선택하세요',
  },
};

export const Formats: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <DatePicker
        format="yyyy-MM-dd"
        placeholder="yyyy-MM-dd"
      />
      <DatePicker
        format="MM/dd/yyyy"
        placeholder="MM/dd/yyyy"
      />
      <DatePicker
        format="dd/MM/yyyy"
        placeholder="dd/MM/yyyy"
      />
      <DatePicker
        format="yyyy년 MM월 dd일"
        placeholder="yyyy년 MM월 dd일"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
      <DatePicker
        size="sm"
        placeholder="Small size"
      />
      <DatePicker
        size="md"
        placeholder="Medium size (default)"
      />
      <DatePicker
        size="lg"
        placeholder="Large size"
      />
    </div>
  ),
};

export const WithMinMax: Story = {
  render: () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() - 7); // 7 days ago
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7); // 7 days from now

    return (
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select date (±7 days from today)"
      />
    );
  },
};

export const DisabledDates: Story = {
  render: () => {
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
      new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    ];

    return (
      <DatePicker
        disabledDates={disabledDates}
        placeholder="Some dates are disabled"
      />
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | null>(null);

    return (
      <div style={{ width: '350px' }}>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Select a date"
        />
        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
          Selected: {date ? date.toLocaleDateString('ko-KR') : 'None'}
        </div>
        <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setDate(new Date())}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Set Today
          </button>
          <button
            onClick={() => setDate(null)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: '유효한 날짜를 선택해주세요',
    placeholder: '날짜 선택',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: new Date(),
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: new Date(),
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: '날짜 선택 (필수)',
  },
};

export const EnglishLocale: Story = {
  args: {
    locale: 'en',
    placeholder: 'Select a date',
  },
};

export const NoClearButton: Story = {
  args: {
    clearable: false,
    value: new Date(),
  },
};

export const NoTodayButton: Story = {
  args: {
    showToday: false,
    placeholder: '날짜 선택',
  },
};

export const WithWeekNumbers: Story = {
  args: {
    showWeekNumbers: true,
    placeholder: '주 번호 표시',
  },
};

export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: '날짜와 시간 선택',
  },
};

export const RangeSelection: Story = {
  args: {
    range: true,
    placeholder: '기간 선택',
  },
};

export const WeekStartsMonday: Story = {
  args: {
    firstDayOfWeek: 1,
    placeholder: '날짜 선택 (월요일 시작)',
  },
};

export const MultipleInstances: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600' }}>
          기간 선택
        </h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            maxDate={endDate || undefined}
            placeholder="시작일"
          />
          <span>~</span>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            minDate={startDate || undefined}
            placeholder="종료일"
          />
        </div>
      </div>
    );
  },
};

export const BookingForm: Story = {
  render: () => {
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const today = new Date();

    return (
      <div style={{ width: '450px', padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
          호텔 예약
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              체크인 날짜
            </label>
            <DatePicker
              value={checkIn}
              onChange={setCheckIn}
              minDate={today}
              maxDate={checkOut || undefined}
              placeholder="체크인 날짜 선택"
              format="yyyy년 MM월 dd일"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
              체크아웃 날짜
            </label>
            <DatePicker
              value={checkOut}
              onChange={setCheckOut}
              minDate={checkIn || today}
              placeholder="체크아웃 날짜 선택"
              format="yyyy년 MM월 dd일"
            />
          </div>
          {checkIn && checkOut && (
            <div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
              <strong>선택된 기간:</strong> {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))}박
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const EventScheduler: Story = {
  render: () => {
    const [eventDate, setEventDate] = useState<Date | null>(null);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>
          이벤트 일정
        </h3>
        <DatePicker
          value={eventDate}
          onChange={setEventDate}
          minDate={tomorrow}
          maxDate={nextMonth}
          placeholder="이벤트 날짜 선택 (다음 달까지만 가능)"
          format="yyyy년 MM월 dd일"
        />
        {eventDate && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '16px', backgroundColor: '#f0f4f8', borderRadius: '6px' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>선택된 날짜</p>
              <p style={{ margin: '8px 0 0', fontSize: '16px', fontWeight: '600' }}>
                {eventDate.toLocaleDateString('ko-KR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
};