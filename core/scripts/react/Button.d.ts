import React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * 버튼 변형 스타일
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * 버튼 크기
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * 풀 너비 버튼
     * @default false
     */
    fullWidth?: boolean;
    /**
     * 로딩 상태
     * @default false
     */
    loading?: boolean;
    /**
     * 아이콘 전용 버튼
     * @default false
     */
    iconOnly?: boolean;
    /**
     * 왼쪽 아이콘
     */
    leftIcon?: React.ReactNode;
    /**
     * 오른쪽 아이콘
     */
    rightIcon?: React.ReactNode;
    /**
     * 버튼 비활성화
     * @default false
     */
    disabled?: boolean;
    /**
     * 클릭 핸들러
     */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * 자식 요소
     */
    children?: React.ReactNode;
}
/**
 * BRICKS 디자인 시스템 Button 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export declare const Button: React.FC<ButtonProps>;
export default Button;
//# sourceMappingURL=Button.d.ts.map