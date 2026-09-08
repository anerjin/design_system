import { Icon } from './Icon';
import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { usePopupBounds } from './usePopupBounds';

export interface DatePickerProps {
  /**
   * 선택된 날짜
   */
  value?: Date | null;

  /**
   * 날짜 변경 핸들러
   */
  onChange?: (date: Date | null) => void;

  /**
   * 표시 형식
   * @default 'yyyy-MM-dd'
   */
  format?: 'yyyy-MM-dd' | 'MM/dd/yyyy' | 'dd/MM/yyyy' | 'yyyy년 MM월 dd일';

  /**
   * 최소 날짜
   */
  minDate?: Date;

  /**
   * 최대 날짜
   */
  maxDate?: Date;

  /**
   * 플레이스홀더
   */
  placeholder?: string;

  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;

  /**
   * 읽기 전용
   * @default false
   */
  readOnly?: boolean;

  /**
   * 필수 입력
   * @default false
   */
  required?: boolean;

  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 오늘 버튼 표시
   * @default true
   */
  showToday?: boolean;

  /**
   * 클리어 버튼 표시
   * @default true
   */
  clearable?: boolean;

  /**
   * 언어
   * @default 'ko'
   */
  locale?: 'ko' | 'en';

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 에러 상태
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorMessage?: string;

  /**
   * 비활성화할 날짜 배열
   */
  disabledDates?: Date[];
}

/**
 * DOI INC 디자인 시스템 DatePicker 컴포넌트
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={selectedDate}
 *   onChange={setSelectedDate}
 *   format="yyyy-MM-dd"
 * />
 * ```
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      format = 'yyyy-MM-dd',
      minDate,
      maxDate,
      placeholder = '날짜를 선택하세요',
      disabled = false,
      readOnly = false,
      required = false,
      size = 'md',
      showToday = true,
      clearable = true,
      locale = 'ko',
      className,
      error,
      errorMessage,
      disabledDates = [],
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => value || new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    usePopupBounds(popupRef, isOpen);

    // daisyUI에는 날짜 선택기가 없다. 입력 줄은 `input`/`btn`을 빌려 쓰고
    // 달력 격자는 Tailwind 유틸리티로 짠다 — 전용 CSS 파일은 두지 않는다.
    const INPUT_SIZE = { sm: 'input-sm', md: 'input-md', lg: 'input-lg' } as const;
    const CELL_SIZE = { sm: 'btn-xs', md: 'btn-sm', lg: 'btn-md' } as const;

    const datePickerClasses = ['relative inline-block', className].filter(Boolean).join(' ');

    const monthNames =
      locale === 'ko'
        ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayNames =
      locale === 'ko'
        ? ['일', '월', '화', '수', '목', '금', '토']
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const formatDate = (date: Date | null): string => {
      if (!date) return '';

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      switch (format) {
        case 'MM/dd/yyyy':
          return `${month}/${day}/${year}`;
        case 'dd/MM/yyyy':
          return `${day}/${month}/${year}`;
        case 'yyyy년 MM월 dd일':
          return `${year}년 ${month}월 ${day}일`;
        default:
          return `${year}-${month}-${day}`;
      }
    };

    const parseDate = (dateString: string): Date | null => {
      if (!dateString) return null;

      const patterns = {
        'yyyy-MM-dd': /^(\d{4})-(\d{2})-(\d{2})$/,
        'MM/dd/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
        'dd/MM/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
        'yyyy년 MM월 dd일': /^(\d{4})년\s*(\d{2})월\s*(\d{2})일$/,
      };

      const match = dateString.match(patterns[format]);
      if (!match) return null;

      let year, month, day;
      switch (format) {
        case 'MM/dd/yyyy':
          [, month, day, year] = match;
          break;
        case 'dd/MM/yyyy':
          [, day, month, year] = match;
          break;
        case 'yyyy년 MM월 dd일':
          [, year, month, day] = match;
          break;
        default:
          [, year, month, day] = match;
      }

      const date = new Date(Number(year), Number(month) - 1, Number(day));
      if (isNaN(date.getTime())) return null;

      return date;
    };

    const getDaysInMonth = (date: Date): number => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date): number => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateDisabled = (date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some(
        (d) =>
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate(),
      );
    };

    const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
      if (!date1 || !date2) return false;
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date)) return;

      setSelectedDate(date);
      setInputValue(formatDate(date));
      setIsOpen(false);
      onChange?.(date);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const date = parseDate(value);
      if (date && !isDateDisabled(date)) {
        setSelectedDate(date);
        setCurrentMonth(date);
        onChange?.(date);
      }
    };

    const handlePrevMonth = () => {
      setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
      setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleToday = () => {
      const today = new Date();
      if (!isDateDisabled(today)) {
        handleDateSelect(today);
      }
    };

    const handleClear = () => {
      setSelectedDate(null);
      setInputValue('');
      onChange?.(null);
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      // Empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isDisabled = isDateDisabled(date);
        const isSelected = isSameDay(date, selectedDate);
        const isToday = isSameDay(date, new Date());

        days.push(
          <button
            key={day}
            type="button"
            className={[
              'btn btn-square min-w-0 max-w-full p-0',
              CELL_SIZE[size],
              // btn-ghost와 btn-primary를 함께 주면 ghost가 배경을 지워버린다
              isSelected ? 'btn-primary' : 'btn-ghost',
              !isSelected && isToday ? 'ring-1 ring-primary/50' : '',
              isDisabled ? 'btn-disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => handleDateSelect(date)}
            disabled={isDisabled}
            aria-selected={isSelected}
            aria-current={isToday ? 'date' : undefined}
          >
            {day}
          </button>,
        );
      }

      return days;
    };

    // Close calendar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    // Sync input value with value prop
    useEffect(() => {
      setInputValue(formatDate(value || null));
      setSelectedDate(value || null);
      if (value) {
        setCurrentMonth(value);
      }
    }, [value]);

    return (
      <div ref={ref} className={datePickerClasses} {...props}>
        <div ref={pickerRef}>
          <label
            className={['input w-full', INPUT_SIZE[size], error ? 'input-error' : '']
              .filter(Boolean)
              .join(' ')}
          >
            <Icon name="calendar" size="1em" className="opacity-60" />
            <input
              ref={inputRef}
              type="text"
              className="grow"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => !readOnly && !disabled && setIsOpen(true)}
              onClick={() => !readOnly && !disabled && setIsOpen(true)}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
            />
            {clearable && inputValue && !disabled && !readOnly && (
              <button
                type="button"
                className="cursor-pointer opacity-60 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                aria-label={locale === 'ko' ? '날짜 지우기' : 'Clear date'}
              >
                <Icon name="x" size="1em" />
              </button>
            )}
          </label>

          {isOpen && (
            <div
              ref={popupRef}
              className="bricks-popup absolute z-20 mt-2 w-72 rounded-box border border-base-300 bg-base-100 p-3 shadow-lg"
            >
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={handlePrevMonth}
                  aria-label={locale === 'ko' ? '이전 달' : 'Previous month'}
                >
                  <Icon name="chevron-left" size="1em" />
                </button>
                <span className="text-sm font-semibold">
                  {locale === 'ko'
                    ? `${currentMonth.getFullYear()}년 ${monthNames[currentMonth.getMonth()]}`
                    : `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={handleNextMonth}
                  aria-label={locale === 'ko' ? '다음 달' : 'Next month'}
                >
                  <Icon name="chevron-right" size="1em" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-0.5 text-center text-xs opacity-60">
                {dayNames.map((day, index) => (
                  <div key={index} className="py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 place-items-center gap-0.5">{renderCalendar()}</div>

              {showToday && (
                <div className="mt-2 flex justify-end border-t border-base-300 pt-2">
                  <button type="button" className="btn btn-ghost btn-sm" onClick={handleToday}>
                    {locale === 'ko' ? '오늘' : 'Today'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {error && errorMessage && (
          <p className="mt-1 text-xs text-error" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;
