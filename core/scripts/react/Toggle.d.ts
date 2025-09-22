import React from 'react';
export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    /**
     * 토글 스위치 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 토글 스위치 변형 스타일
     */
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'pink' | 'mint' | 'yellow' | 'green' | 'lightblue' | 'blue' | 'dark';
    /**
     * 토글 스위치 활성화 상태
     */
    checked?: boolean;
    /**
     * 기본 활성화 상태 (비제어 컴포넌트)
     */
    defaultChecked?: boolean;
    /**
     * 토글 스위치 레이블
     */
    label?: React.ReactNode;
    /**
     * 아이콘 표시 여부
     */
    showIcons?: boolean;
    /**
     * 켜짐 상태 아이콘
     */
    onIcon?: React.ReactNode;
    /**
     * 꺼짐 상태 아이콘
     */
    offIcon?: React.ReactNode;
    /**
     * 토글 상태 변경 이벤트
     */
    onChange?: (checked: boolean, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
}
/**
 * BRICKS 디자인 시스템 Toggle 컴포넌트
 *
 * @example
 * ```tsx
 * <Toggle
 *   label="알림 설정"
 *   checked={notificationEnabled}
 *   onChange={(checked) => setNotificationEnabled(checked)}
 *   variant="success"
 * />
 * ```
 */
export declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;
export default Toggle;
//# sourceMappingURL=Toggle.d.ts.map