/**
 * BRICKS Design System - Datepicker Component
 * 접근성을 준수하는 달력 선택기
 */

import type { AlertOptions, ToastOptions } from '../types/index';

interface LocaleConfig {
    weekdays: string[];
    months: string[];
    yearSuffix: string;
    format: string;
    placeholder: string;
}

interface DatepickerState {
    selectedDate: Date | null;
    rangeStart: Date | null;
    rangeEnd: Date | null;
    currentMonth: Date;
    isOpen: boolean;
    isRange: boolean;
    minDate: Date | null;
    maxDate: Date | null;
    format: string;
    locale: string;
    inline: boolean;
}

interface DatepickerComponent {
    instances: Map<HTMLElement, DatepickerState>;
    init(): void;
    initDatepicker(input: HTMLInputElement): void;
    createCalendar(input: HTMLInputElement): HTMLElement;
    updateCalendar(input: HTMLInputElement): void;
    renderMonth(state: DatepickerState): string;
    handleDateClick(input: HTMLInputElement, date: Date): void;
    handleKeydown(input: HTMLInputElement, e: KeyboardEvent): void;
    open(input: HTMLInputElement): void;
    close(input: HTMLInputElement): void;
    setDate(input: HTMLInputElement, date: Date | string | null): void;
    getDate(input: HTMLInputElement): Date | null;
    destroy(input: HTMLInputElement): void;
    formatDate(date: Date | null, format: string): string;
    parseDate(dateStr: string, format: string): Date | null;
    isValidDate(date: Date): boolean;
}



const DAY_MS = 24 * 60 * 60 * 1000;
const WEEK_LENGTH = 7;

// 로케일별 설정
const LOCALE_CONFIG: Record<string, LocaleConfig> = {
    'ko': {
        weekdays: ['월', '화', '수', '목', '금', '토', '일'],
        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        yearSuffix: '년',
        format: 'YYYY/MM/DD',
        placeholder: 'YYYY/MM/DD'
    },
    'en': {
        weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        yearSuffix: '',
        format: 'MM/DD/YYYY',
        placeholder: 'MM/DD/YYYY'
    },
    'zh': {
        weekdays: ['一', '二', '三', '四', '五', '六', '日'],
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        yearSuffix: '年',
        format: 'YYYY-MM-DD',
        placeholder: 'YYYY-MM-DD'
    },
    'ja': {
        weekdays: ['月', '火', '水', '木', '金', '土', '日'],
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        yearSuffix: '年',
        format: 'YYYY/MM/DD',
        placeholder: 'YYYY/MM/DD'
    }
};

// 브라우저 로케일 감지
function detectLocale(): string {
    const browserLang = navigator.language || (navigator as any).userLanguage || 'en';
    const langCode = browserLang.split('-')[0];
    return LOCALE_CONFIG[langCode] ? langCode : 'en';
}

// 현재 로케일 가져오기
function getCurrentLocale(): string {
    const savedLocale = localStorage.getItem('ds-locale');
    return savedLocale || detectLocale();
}

// 로케일 설정 가져오기
function getLocaleConfig(): LocaleConfig {
    const locale = getCurrentLocale();
    return LOCALE_CONFIG[locale] || LOCALE_CONFIG['en'];
}

function createDate(year: number, month: number, day: number): Date {
    return new Date(year, month, day, 12, 0, 0, 0);
}

function toISODate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 로케일에 맞게 날짜 포맷팅
function formatDate(date: Date | null, format: string): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return format
        .replace('YYYY', year.toString())
        .replace('MM', month)
        .replace('DD', day);
}

function isSameDate(a: Date | null, b: Date | null): boolean {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isBetween(date: Date, start: Date, end: Date): boolean {
    if (!date || !start || !end) return false;
    const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return time >= startTime && time <= endTime;
}

function addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // 월요일 시작
    return new Date(date.getFullYear(), date.getMonth(), diff);
}

(function(global: Window) {
    "use strict";

    global.BRICKS = global.BRICKS || {} as any;

    /**
     * Datepicker Component
     */
    global.BRICKS.Datepicker = {
        instances: new Map<HTMLElement, DatepickerState>(),

        init: function(): void {
            // 모든 데이트피커 초기화
            document.querySelectorAll('[data-datepicker]').forEach((input: Element) => {
                const inputEl = input as HTMLInputElement;
                if (!inputEl.hasAttribute('data-datepicker-initialized')) {
                    this.initDatepicker(inputEl);
                    inputEl.setAttribute('data-datepicker-initialized', 'true');
                }
            });
        },

        initDatepicker: function(input: HTMLInputElement): void {
            const localeConfig = getLocaleConfig();
            const isRange = input.hasAttribute('data-range');
            const isInline = input.hasAttribute('data-inline');
            const format = input.getAttribute('data-format') || localeConfig.format;

            // 초기 상태 설정
            const state: DatepickerState = {
                selectedDate: null,
                rangeStart: null,
                rangeEnd: null,
                currentMonth: new Date(),
                isOpen: false,
                isRange: isRange,
                minDate: input.getAttribute('data-min-date') ? new Date(input.getAttribute('data-min-date')!) : null,
                maxDate: input.getAttribute('data-max-date') ? new Date(input.getAttribute('data-max-date')!) : null,
                format: format,
                locale: getCurrentLocale(),
                inline: isInline
            };

            this.instances.set(input, state);

            // 플레이스홀더 설정
            if (!input.placeholder) {
                input.placeholder = localeConfig.placeholder;
            }

            // 달력 생성
            const calendar = this.createCalendar(input);

            if (isInline) {
                // 인라인 모드
                input.style.display = 'none';
                input.parentElement?.appendChild(calendar);
                state.isOpen = true;
                this.updateCalendar(input);
            } else {
                // 드롭다운 모드
                document.body.appendChild(calendar);

                // 입력 필드 이벤트
                input.addEventListener('click', () => {
                    this.open(input);
                });

                input.addEventListener('keydown', (e: KeyboardEvent) => {
                    if (e.key === 'Enter' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        this.open(input);
                    }
                });

                input.addEventListener('input', (e: Event) => {
                    const target = e.target as HTMLInputElement;
                    const date = this.parseDate(target.value, state.format);
                    if (date && this.isValidDate(date)) {
                        state.selectedDate = date;
                        state.currentMonth = date;
                        this.updateCalendar(input);
                    }
                });

                // 외부 클릭 시 닫기
                document.addEventListener('click', (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (!input.contains(target) && !calendar.contains(target)) {
                        this.close(input);
                    }
                });
            }

            // 초기값 설정
            if (input.value) {
                const initialDate = this.parseDate(input.value, state.format);
                if (initialDate && this.isValidDate(initialDate)) {
                    state.selectedDate = initialDate;
                    state.currentMonth = initialDate;
                }
            }

            this.updateCalendar(input);
        },

        createCalendar: function(input: HTMLInputElement): HTMLElement {
            const calendar = document.createElement('div');
            calendar.className = 'datepicker';
            calendar.setAttribute('role', 'dialog');
            calendar.setAttribute('aria-label', '날짜 선택');

            const state = this.instances.get(input);
            if (state?.inline) {
                calendar.classList.add('datepicker--inline');
            }

            return calendar;
        },

        updateCalendar: function(input: HTMLInputElement): void {
            const state = this.instances.get(input);
            if (!state) return;

            const calendar = this.getCalendarElement(input);
            if (!calendar) return;

            calendar.innerHTML = this.renderMonth(state);

            // 이벤트 바인딩
            this.bindCalendarEvents(input, calendar);
        },

        renderMonth: function(state: DatepickerState): string {
            const localeConfig = getLocaleConfig();
            const monthStart = startOfMonth(state.currentMonth);
            const monthEnd = endOfMonth(state.currentMonth);
            const calendarStart = startOfWeek(monthStart);

            let html = '<div class="datepicker__header">';
            html += `<button type="button" class="datepicker__nav datepicker__nav--prev" aria-label="이전 달">‹</button>`;
            html += `<div class="datepicker__title">${state.currentMonth.getFullYear()}${localeConfig.yearSuffix} ${localeConfig.months[state.currentMonth.getMonth()]}</div>`;
            html += `<button type="button" class="datepicker__nav datepicker__nav--next" aria-label="다음 달">›</button>`;
            html += '</div>';

            html += '<div class="datepicker__calendar">';
            html += '<div class="datepicker__weekdays">';
            localeConfig.weekdays.forEach(day => {
                html += `<div class="datepicker__weekday">${day}</div>`;
            });
            html += '</div>';

            html += '<div class="datepicker__days">';

            let currentDate = new Date(calendarStart);
            for (let i = 0; i < 42; i++) { // 6주 * 7일
                const isCurrentMonth = currentDate.getMonth() === state.currentMonth.getMonth();
                const isSelected = state.selectedDate && isSameDate(currentDate, state.selectedDate);
                const isToday = isSameDate(currentDate, new Date());
                const isDisabled = this.isDateDisabled(currentDate, state);

                let classes = 'datepicker__day';
                if (!isCurrentMonth) classes += ' datepicker__day--other-month';
                if (isSelected) classes += ' datepicker__day--selected';
                if (isToday) classes += ' datepicker__day--today';
                if (isDisabled) classes += ' datepicker__day--disabled';

                if (state.isRange && state.rangeStart && state.rangeEnd) {
                    if (isSameDate(currentDate, state.rangeStart)) classes += ' datepicker__day--range-start';
                    if (isSameDate(currentDate, state.rangeEnd)) classes += ' datepicker__day--range-end';
                    if (isBetween(currentDate, state.rangeStart, state.rangeEnd)) classes += ' datepicker__day--in-range';
                }

                html += `<button type="button" class="${classes}" data-date="${toISODate(currentDate)}" ${isDisabled ? 'disabled' : ''}>`;
                html += currentDate.getDate();
                html += '</button>';

                currentDate = addDays(currentDate, 1);
            }

            html += '</div>';
            html += '</div>';

            return html;
        },

        bindCalendarEvents: function(input: HTMLInputElement, calendar: HTMLElement): void {
            const state = this.instances.get(input);
            if (!state) return;

            // 네비게이션 버튼
            const prevBtn = calendar.querySelector('.datepicker__nav--prev') as HTMLElement;
            const nextBtn = calendar.querySelector('.datepicker__nav--next') as HTMLElement;

            prevBtn?.addEventListener('click', () => {
                state.currentMonth = addMonths(state.currentMonth, -1);
                this.updateCalendar(input);
            });

            nextBtn?.addEventListener('click', () => {
                state.currentMonth = addMonths(state.currentMonth, 1);
                this.updateCalendar(input);
            });

            // 날짜 버튼
            const dayButtons = calendar.querySelectorAll('.datepicker__day:not(.datepicker__day--disabled)') as NodeListOf<HTMLElement>;
            dayButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const dateStr = btn.getAttribute('data-date');
                    if (dateStr) {
                        const date = new Date(dateStr + 'T12:00:00');
                        this.handleDateClick(input, date);
                    }
                });
            });

            // 키보드 네비게이션
            calendar.addEventListener('keydown', (e: KeyboardEvent) => {
                this.handleKeydown(input, e);
            });
        },

        handleDateClick: function(input: HTMLInputElement, date: Date): void {
            const state = this.instances.get(input);
            if (!state) return;

            if (state.isRange) {
                if (!state.rangeStart || (state.rangeStart && state.rangeEnd)) {
                    // 범위 시작
                    state.rangeStart = date;
                    state.rangeEnd = null;
                } else {
                    // 범위 끝
                    if (date < state.rangeStart) {
                        state.rangeEnd = state.rangeStart;
                        state.rangeStart = date;
                    } else {
                        state.rangeEnd = date;
                    }

                    // 입력 필드 업데이트
                    const startStr = this.formatDate(state.rangeStart, state.format);
                    const endStr = this.formatDate(state.rangeEnd, state.format);
                    input.value = `${startStr} - ${endStr}`;

                    // 이벤트 발생
                    const event = new CustomEvent('dateRangeSelect', {
                        detail: { start: state.rangeStart, end: state.rangeEnd }
                    });
                    input.dispatchEvent(event);

                    if (!state.inline) {
                        this.close(input);
                    }
                }
            } else {
                // 단일 날짜
                state.selectedDate = date;
                input.value = this.formatDate(date, state.format);

                // 이벤트 발생
                const event = new CustomEvent('dateSelect', {
                    detail: { date: date }
                });
                input.dispatchEvent(event);

                if (!state.inline) {
                    this.close(input);
                }
            }

            this.updateCalendar(input);
        },

        handleKeydown: function(input: HTMLInputElement, e: KeyboardEvent): void {
            if (e.key === 'Escape') {
                this.close(input);
                input.focus();
            }
        },

        open: function(input: HTMLInputElement): void {
            const state = this.instances.get(input);
            if (!state || state.isOpen || state.inline) return;

            const calendar = this.getCalendarElement(input);
            if (!calendar) return;

            state.isOpen = true;
            calendar.style.display = 'block';

            // 위치 조정
            this.positionCalendar(input, calendar);

            // 포커스 설정
            const selectedDay = calendar.querySelector('.datepicker__day--selected') as HTMLElement;
            const todayDay = calendar.querySelector('.datepicker__day--today') as HTMLElement;
            const firstDay = calendar.querySelector('.datepicker__day:not(.datepicker__day--disabled)') as HTMLElement;

            (selectedDay || todayDay || firstDay)?.focus();
        },

        close: function(input: HTMLInputElement): void {
            const state = this.instances.get(input);
            if (!state || !state.isOpen || state.inline) return;

            const calendar = this.getCalendarElement(input);
            if (calendar) {
                calendar.style.display = 'none';
            }

            state.isOpen = false;
        },

        setDate: function(input: HTMLInputElement, date: Date | string | null): void {
            const state = this.instances.get(input);
            if (!state) return;

            if (typeof date === 'string') {
                date = this.parseDate(date, state.format);
            }

            if (date && this.isValidDate(date)) {
                state.selectedDate = date;
                state.currentMonth = date;
                input.value = this.formatDate(date, state.format);
                this.updateCalendar(input);
            } else {
                state.selectedDate = null;
                input.value = '';
                this.updateCalendar(input);
            }
        },

        getDate: function(input: HTMLInputElement): Date | null {
            const state = this.instances.get(input);
            return state?.selectedDate || null;
        },

        destroy: function(input: HTMLInputElement): void {
            const calendar = this.getCalendarElement(input);
            if (calendar) {
                calendar.remove();
            }

            this.instances.delete(input);
            input.removeAttribute('data-datepicker-initialized');
        },

        formatDate: function(date: Date | null, format: string): string {
            return formatDate(date, format);
        },

        parseDate: function(dateStr: string, format: string): Date | null {
            if (!dateStr) return null;

            // 간단한 파싱 (실제로는 더 정교한 파싱이 필요)
            const parts = dateStr.replace(/[^\d]/g, ' ').split(/\s+/).filter(Boolean);
            if (parts.length !== 3) return null;

            let year: number, month: number, day: number;

            if (format.includes('YYYY/MM/DD') || format.includes('YYYY-MM-DD')) {
                [year, month, day] = parts.map(Number);
            } else if (format.includes('MM/DD/YYYY')) {
                [month, day, year] = parts.map(Number);
            } else {
                return null;
            }

            const date = new Date(year, month - 1, day);
            return this.isValidDate(date) ? date : null;
        },

        isValidDate: function(date: Date): boolean {
            return date instanceof Date && !isNaN(date.getTime());
        },

        isDateDisabled: function(date: Date, state: DatepickerState): boolean {
            if (state.minDate && date < state.minDate) return true;
            if (state.maxDate && date > state.maxDate) return true;
            return false;
        },

        getCalendarElement: function(input: HTMLInputElement): HTMLElement | null {
            const state = this.instances.get(input);
            if (!state) return null;

            if (state.inline) {
                return input.parentElement?.querySelector('.datepicker') as HTMLElement | null;
            } else {
                return document.querySelector(`.datepicker[data-input-id="${input.id}"]`) as HTMLElement | null ||
                       document.body.querySelector('.datepicker') as HTMLElement | null;
            }
        },

        positionCalendar: function(input: HTMLInputElement, calendar: HTMLElement): void {
            const rect = input.getBoundingClientRect();
            const calendarRect = calendar.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            let top = rect.bottom + window.scrollY;
            let left = rect.left + window.scrollX;

            // 화면 하단을 벗어나는 경우 위쪽에 표시
            if (top + calendarRect.height > window.scrollY + viewportHeight) {
                top = rect.top + window.scrollY - calendarRect.height;
            }

            // 화면 오른쪽을 벗어나는 경우 조정
            if (left + calendarRect.width > window.innerWidth) {
                left = window.innerWidth - calendarRect.width - 10;
            }

            calendar.style.position = 'absolute';
            calendar.style.top = top + 'px';
            calendar.style.left = left + 'px';
            calendar.style.zIndex = '9999';
        }
    };

})(window);

export { DatepickerComponent, DatepickerState, LocaleConfig };