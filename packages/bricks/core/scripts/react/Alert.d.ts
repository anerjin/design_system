import React from 'react';
export interface AlertProps {
    /**
     * 알림 변형 스타일
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
    /**
     * 솔리드 스타일 사용 여부
     * @default false
     */
    solid?: boolean;
    /**
     * 알림 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 닫기 가능 여부
     * @default false
     */
    dismissible?: boolean;
    /**
     * 자동 닫기 시간 (밀리초)
     */
    autoClose?: number;
    /**
     * 강조선 위치
     */
    accent?: 'left' | 'top';
    /**
     * 토스트 모드 (플로팅)
     * @default false
     */
    toast?: boolean;
    /**
     * 토스트 위치
     */
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    /**
     * 알림 제목
     */
    title?: React.ReactNode;
    /**
     * 알림 설명
     */
    description?: React.ReactNode;
    /**
     * 왼쪽 아이콘
     */
    icon?: React.ReactNode;
    /**
     * 액션 버튼들
     */
    actions?: React.ReactNode;
    /**
     * 리스트 아이템들
     */
    list?: React.ReactNode[];
    /**
     * 알림 닫기 이벤트
     */
    onClose?: () => void;
    /**
     * 알림 내용
     */
    children?: React.ReactNode;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 표시 여부 (제어 컴포넌트용)
     */
    visible?: boolean;
}
/**
 * BRICKS 디자인 시스템 Alert 컴포넌트
 *
 * @example
 * ```tsx
 * <Alert
 *   variant="success"
 *   title="성공"
 *   description="작업이 성공적으로 완료되었습니다."
 *   dismissible
 *   onClose={() => setAlertVisible(false)}
 *   icon={<CheckIcon />}
 * />
 * ```
 */
export declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
/**
 * 토스트 알림을 생성하는 유틸리티 함수
 */
export declare const toast: {
    show: (props: Omit<AlertProps, "toast">) => {
        id: string;
        close: () => void;
    };
    success: (message: string, options?: Partial<AlertProps>) => {
        id: string;
        close: () => void;
    };
    error: (message: string, options?: Partial<AlertProps>) => {
        id: string;
        close: () => void;
    };
    warning: (message: string, options?: Partial<AlertProps>) => {
        id: string;
        close: () => void;
    };
    info: (message: string, options?: Partial<AlertProps>) => {
        id: string;
        close: () => void;
    };
    closeAll: () => void;
};
export default Alert;
//# sourceMappingURL=Alert.d.ts.map