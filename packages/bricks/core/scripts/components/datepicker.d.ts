/**
 * BRICKS Design System - Datepicker Component
 * 접근성을 준수하는 달력 선택기
 */
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
export { DatepickerComponent, DatepickerState, LocaleConfig };
//# sourceMappingURL=datepicker.d.ts.map