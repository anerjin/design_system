import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useRef, useEffect } from 'react';
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
export const DatePicker = forwardRef(({ value, onChange, format = 'yyyy-MM-dd', minDate, maxDate, placeholder = '날짜를 선택하세요', disabled = false, readOnly = false, required = false, size = 'md', showTime = false, showWeekNumbers = false, showToday = true, clearable = true, locale = 'ko', firstDayOfWeek = 0, className, error, errorMessage, disabledDates = [], range = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(() => value || new Date());
    const [selectedDate, setSelectedDate] = useState(value || null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const pickerRef = useRef(null);
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
    const formatDate = (date) => {
        if (!date)
            return '';
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
    const parseDate = (dateString) => {
        if (!dateString)
            return null;
        const patterns = {
            'yyyy-MM-dd': /^(\d{4})-(\d{2})-(\d{2})$/,
            'MM/dd/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
            'dd/MM/yyyy': /^(\d{2})\/(\d{2})\/(\d{4})$/,
            'yyyy년 MM월 dd일': /^(\d{4})년\s*(\d{2})월\s*(\d{2})일$/
        };
        const match = dateString.match(patterns[format]);
        if (!match)
            return null;
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
        if (isNaN(date.getTime()))
            return null;
        return date;
    };
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    const isDateDisabled = (date) => {
        if (minDate && date < minDate)
            return true;
        if (maxDate && date > maxDate)
            return true;
        return disabledDates.some(d => d.getFullYear() === date.getFullYear() &&
            d.getMonth() === date.getMonth() &&
            d.getDate() === date.getDate());
    };
    const isSameDay = (date1, date2) => {
        if (!date1 || !date2)
            return false;
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };
    const handleDateSelect = (date) => {
        if (isDateDisabled(date))
            return;
        setSelectedDate(date);
        setInputValue(formatDate(date));
        setIsOpen(false);
        onChange?.(date);
    };
    const handleInputChange = (e) => {
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
            days.push(_jsx("div", { className: "datepicker__cell datepicker__cell--muted" }, `empty-${i}`));
        }
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isDisabled = isDateDisabled(date);
            const isSelected = isSameDay(date, selectedDate);
            const isToday = isSameDay(date, new Date());
            const isHovered = isSameDay(date, hoveredDate);
            days.push(_jsx("button", { type: "button", className: [
                    'datepicker__cell',
                    'datepicker__cell--day',
                    isDisabled ? 'datepicker__cell--disabled' : '',
                    isSelected ? 'datepicker__cell--selected' : '',
                    isToday ? 'datepicker__cell--today' : '',
                    isHovered ? 'datepicker__cell--hovered' : ''
                ].filter(Boolean).join(' '), onClick: () => handleDateSelect(date), onMouseEnter: () => setHoveredDate(date), onMouseLeave: () => setHoveredDate(null), disabled: isDisabled, "aria-selected": isSelected, "aria-current": isToday ? 'date' : undefined, children: day }, day));
        }
        return days;
    };
    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
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
    return (_jsxs("div", { ref: ref, className: datePickerClasses, ...props, children: [_jsxs("div", { className: "datepicker__input-wrapper", ref: pickerRef, children: [_jsxs("div", { className: "datepicker__input-container", children: [_jsx("input", { ref: inputRef, type: "text", className: "datepicker__input", value: inputValue, onChange: handleInputChange, onFocus: () => !readOnly && !disabled && setIsOpen(true), onClick: () => !readOnly && !disabled && setIsOpen(true), placeholder: placeholder, disabled: disabled, readOnly: readOnly, required: required }), _jsx("span", { className: "datepicker__icon", children: _jsx("i", { className: "bx bx-calendar" }) }), clearable && inputValue && !disabled && !readOnly && (_jsx("button", { type: "button", className: "datepicker__clear", onClick: (e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }, "aria-label": "Clear date", children: _jsx("i", { className: "bx bx-x" }) }))] }), _jsxs("div", { className: "datepicker__popover", "aria-hidden": !isOpen, children: [_jsxs("div", { className: "datepicker__header", children: [_jsx("button", { type: "button", className: "datepicker__nav", onClick: handlePrevMonth, "aria-label": "Previous month", children: _jsx("i", { className: "bx bx-chevron-left" }) }), _jsx("div", { className: "datepicker__controls", children: _jsxs("span", { className: "datepicker__current", children: [currentMonth.getFullYear(), "\uB144 ", monthNames[currentMonth.getMonth()]] }) }), _jsx("button", { type: "button", className: "datepicker__nav", onClick: handleNextMonth, "aria-label": "Next month", children: _jsx("i", { className: "bx bx-chevron-right" }) })] }), _jsx("div", { className: "datepicker__weekdays", children: dayNames.map((day, index) => (_jsx("div", { className: "datepicker__weekday", children: day }, index))) }), _jsx("div", { className: "datepicker__grid", children: renderCalendar() }), showToday && (_jsx("div", { className: "datepicker__footer", children: _jsx("div", { className: "datepicker__actions", children: _jsx("button", { type: "button", className: "datepicker__action-btn", onClick: handleToday, children: locale === 'ko' ? '오늘' : 'Today' }) }) }))] })] }), error && errorMessage && (_jsx("div", { className: "datepicker__error", children: errorMessage }))] }));
});
DatePicker.displayName = 'DatePicker';
export default DatePicker;
//# sourceMappingURL=DatePicker.js.map