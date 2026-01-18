import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { DatePicker } from './DatePicker';
const meta = {
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
export const Default = {
    args: {
        placeholder: '날짜를 선택하세요',
    },
};
export const WithValue = {
    args: {
        value: new Date(),
        placeholder: '날짜를 선택하세요',
    },
};
export const Formats = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }, children: [_jsx(DatePicker, { format: "yyyy-MM-dd", placeholder: "yyyy-MM-dd" }), _jsx(DatePicker, { format: "MM/dd/yyyy", placeholder: "MM/dd/yyyy" }), _jsx(DatePicker, { format: "dd/MM/yyyy", placeholder: "dd/MM/yyyy" }), _jsx(DatePicker, { format: "yyyy\uB144 MM\uC6D4 dd\uC77C", placeholder: "yyyy\uB144 MM\uC6D4 dd\uC77C" })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }, children: [_jsx(DatePicker, { size: "sm", placeholder: "Small size" }), _jsx(DatePicker, { size: "md", placeholder: "Medium size (default)" }), _jsx(DatePicker, { size: "lg", placeholder: "Large size" })] })),
};
export const WithMinMax = {
    render: () => {
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() - 7); // 7 days ago
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 7); // 7 days from now
        return (_jsx(DatePicker, { minDate: minDate, maxDate: maxDate, placeholder: "Select date (\u00B17 days from today)" }));
    },
};
export const DisabledDates = {
    render: () => {
        const today = new Date();
        const disabledDates = [
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
            new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        ];
        return (_jsx(DatePicker, { disabledDates: disabledDates, placeholder: "Some dates are disabled" }));
    },
};
export const Controlled = {
    render: () => {
        const [date, setDate] = useState(null);
        return (_jsxs("div", { style: { width: '350px' }, children: [_jsx(DatePicker, { value: date, onChange: setDate, placeholder: "Select a date" }), _jsxs("div", { style: { marginTop: '20px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }, children: ["Selected: ", date ? date.toLocaleDateString('ko-KR') : 'None'] }), _jsxs("div", { style: { marginTop: '12px', display: 'flex', gap: '8px' }, children: [_jsx("button", { onClick: () => setDate(new Date()), style: {
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }, children: "Set Today" }), _jsx("button", { onClick: () => setDate(null), style: {
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                            }, children: "Clear" })] })] }));
    },
};
export const WithError = {
    args: {
        error: true,
        errorMessage: '유효한 날짜를 선택해주세요',
        placeholder: '날짜 선택',
    },
};
export const Disabled = {
    args: {
        disabled: true,
        value: new Date(),
    },
};
export const ReadOnly = {
    args: {
        readOnly: true,
        value: new Date(),
    },
};
export const Required = {
    args: {
        required: true,
        placeholder: '날짜 선택 (필수)',
    },
};
export const EnglishLocale = {
    args: {
        locale: 'en',
        placeholder: 'Select a date',
    },
};
export const NoClearButton = {
    args: {
        clearable: false,
        value: new Date(),
    },
};
export const NoTodayButton = {
    args: {
        showToday: false,
        placeholder: '날짜 선택',
    },
};
export const WithWeekNumbers = {
    args: {
        showWeekNumbers: true,
        placeholder: '주 번호 표시',
    },
};
export const WithTime = {
    args: {
        showTime: true,
        placeholder: '날짜와 시간 선택',
    },
};
export const RangeSelection = {
    args: {
        range: true,
        placeholder: '기간 선택',
    },
};
export const WeekStartsMonday = {
    args: {
        firstDayOfWeek: 1,
        placeholder: '날짜 선택 (월요일 시작)',
    },
};
export const MultipleInstances = {
    render: () => {
        const [startDate, setStartDate] = useState(null);
        const [endDate, setEndDate] = useState(null);
        return (_jsxs("div", { style: { width: '400px' }, children: [_jsx("h3", { style: { marginBottom: '16px', fontSize: '16px', fontWeight: '600' }, children: "\uAE30\uAC04 \uC120\uD0DD" }), _jsxs("div", { style: { display: 'flex', gap: '12px', alignItems: 'center' }, children: [_jsx(DatePicker, { value: startDate, onChange: setStartDate, maxDate: endDate || undefined, placeholder: "\uC2DC\uC791\uC77C" }), _jsx("span", { children: "~" }), _jsx(DatePicker, { value: endDate, onChange: setEndDate, minDate: startDate || undefined, placeholder: "\uC885\uB8CC\uC77C" })] })] }));
    },
};
export const BookingForm = {
    render: () => {
        const [checkIn, setCheckIn] = useState(null);
        const [checkOut, setCheckOut] = useState(null);
        const today = new Date();
        return (_jsxs("div", { style: { width: '450px', padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '8px' }, children: [_jsx("h3", { style: { marginBottom: '20px', fontSize: '18px', fontWeight: '600' }, children: "\uD638\uD154 \uC608\uC57D" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }, children: "\uCCB4\uD06C\uC778 \uB0A0\uC9DC" }), _jsx(DatePicker, { value: checkIn, onChange: setCheckIn, minDate: today, maxDate: checkOut || undefined, placeholder: "\uCCB4\uD06C\uC778 \uB0A0\uC9DC \uC120\uD0DD", format: "yyyy\uB144 MM\uC6D4 dd\uC77C" })] }), _jsxs("div", { children: [_jsx("label", { style: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }, children: "\uCCB4\uD06C\uC544\uC6C3 \uB0A0\uC9DC" }), _jsx(DatePicker, { value: checkOut, onChange: setCheckOut, minDate: checkIn || today, placeholder: "\uCCB4\uD06C\uC544\uC6C3 \uB0A0\uC9DC \uC120\uD0DD", format: "yyyy\uB144 MM\uC6D4 dd\uC77C" })] }), checkIn && checkOut && (_jsxs("div", { style: { padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }, children: [_jsx("strong", { children: "\uC120\uD0DD\uB41C \uAE30\uAC04:" }), " ", Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)), "\uBC15"] }))] })] }));
    },
};
export const EventScheduler = {
    render: () => {
        const [eventDate, setEventDate] = useState(null);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return (_jsxs("div", { style: { width: '400px' }, children: [_jsx("h3", { style: { marginBottom: '20px', fontSize: '18px', fontWeight: '600' }, children: "\uC774\uBCA4\uD2B8 \uC77C\uC815" }), _jsx(DatePicker, { value: eventDate, onChange: setEventDate, minDate: tomorrow, maxDate: nextMonth, placeholder: "\uC774\uBCA4\uD2B8 \uB0A0\uC9DC \uC120\uD0DD (\uB2E4\uC74C \uB2EC\uAE4C\uC9C0\uB9CC \uAC00\uB2A5)", format: "yyyy\uB144 MM\uC6D4 dd\uC77C" }), eventDate && (_jsx("div", { style: { marginTop: '20px' }, children: _jsxs("div", { style: { padding: '16px', backgroundColor: '#f0f4f8', borderRadius: '6px' }, children: [_jsx("p", { style: { margin: 0, fontSize: '14px', color: '#666' }, children: "\uC120\uD0DD\uB41C \uB0A0\uC9DC" }), _jsx("p", { style: { margin: '8px 0 0', fontSize: '16px', fontWeight: '600' }, children: eventDate.toLocaleDateString('ko-KR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) })] }) }))] }));
    },
};
//# sourceMappingURL=DatePicker.stories.js.map