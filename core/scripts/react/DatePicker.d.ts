import React from 'react';
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
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLDivElement>>;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map