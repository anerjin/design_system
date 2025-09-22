import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';

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
   * 시간 선택 포함
   * @default false
   */
  showTime?: boolean;

  /**
   * 주 번호 표시
   * @default false
   */
  showWeekNumbers?: boolean;

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
   * 주 시작일
   * @default 0 (일요일)
   */
  firstDayOfWeek?: number;

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

  /**
   * 범위 선택 모드
   * @default false
   */
  range?: boolean;
}

/**
 * BRICKS 디자인 시스템 DatePicker 컴포넌트
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
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
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
  showTime = false,
  showWeekNumbers = false,
  showToday = true,
  clearable = true,
  locale = 'ko',
  firstDayOfWeek = 0,
  className,
  error,
  errorMessage,
  disabledDates = [],
  range = false,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const datePickerClasses = [
    'datepicker',
    size !== 'md' ? `datepicker--${size}` : '',
    disabled ? 'datepicker--disabled' : '',
    error ? 'datepicker--error' : '',
    isOpen ? 'datepicker--open' : '',
    className
  ].filter(Boolean).join(' ');

  const monthNames = locale === 'ko'
    ? ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayNames = locale === 'ko'
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
      'yyyy년 MM월 dd일': /^(\d{4})년\s*(\d{2})월\s*(\d{2})일$/
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
    return disabledDates.some(d =>
      d.getFullYear() === date.getFullYear() &&
      d.getMonth() === date.getMonth() &&
      d.getDate() === date.getDate()
    );
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
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
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
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
      days.push(<div key={`empty-${i}`} className="datepicker__cell datepicker__cell--muted" />);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isDisabled = isDateDisabled(date);
      const isSelected = isSameDay(date, selectedDate);
      const isToday = isSameDay(date, new Date());
      const isHovered = isSameDay(date, hoveredDate);

      days.push(
        <button
          key={day}
          type="button"
          className={[
            'datepicker__cell',
            'datepicker__cell--day',
            isDisabled ? 'datepicker__cell--disabled' : '',
            isSelected ? 'datepicker__cell--selected' : '',
            isToday ? 'datepicker__cell--today' : '',
            isHovered ? 'datepicker__cell--hovered' : ''
          ].filter(Boolean).join(' ')}
          onClick={() => handleDateSelect(date)}
          onMouseEnter={() => setHoveredDate(date)}
          onMouseLeave={() => setHoveredDate(null)}
          disabled={isDisabled}
          aria-selected={isSelected}
          aria-current={isToday ? 'date' : undefined}
        >
          {day}
        </button>
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
      <div className="datepicker__input-wrapper" ref={pickerRef}>
        <div className="datepicker__input-container">
          <input
            ref={inputRef}
            type="text"
            className="datepicker__input"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => !readOnly && !disabled && setIsOpen(true)}
            onClick={() => !readOnly && !disabled && setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          />
          <span className="datepicker__icon">
            <i className="bx bx-calendar"></i>
          </span>
          {clearable && inputValue && !disabled && !readOnly && (
            <button
              type="button"
              className="datepicker__clear"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              aria-label="Clear date"
            >
              <i className="bx bx-x"></i>
            </button>
          )}
        </div>

        <div className="datepicker__popover" aria-hidden={!isOpen}>
          <div className="datepicker__header">
            <button
              type="button"
              className="datepicker__nav"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              <i className="bx bx-chevron-left"></i>
            </button>
            <div className="datepicker__controls">
              <span className="datepicker__current">
                {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
              </span>
            </div>
            <button
              type="button"
              className="datepicker__nav"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>

          <div className="datepicker__weekdays">
            {dayNames.map((day, index) => (
              <div
                key={index}
                className="datepicker__weekday"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="datepicker__grid">
            {renderCalendar()}
          </div>

          {showToday && (
            <div className="datepicker__footer">
              <div className="datepicker__actions">
                <button
                  type="button"
                  className="datepicker__action-btn"
                  onClick={handleToday}
                >
                  {locale === 'ko' ? '오늘' : 'Today'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && errorMessage && (
        <div className="datepicker__error">
          {errorMessage}
        </div>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;