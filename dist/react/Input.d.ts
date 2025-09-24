import React from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 입력 필드 크기
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * 입력 필드 상태
     */
    state?: 'success' | 'warning' | 'error';
    /**
     * 왼쪽 아이콘
     */
    leftIcon?: React.ReactNode;
    /**
     * 오른쪽 아이콘
     */
    rightIcon?: React.ReactNode;
    /**
     * 입력 필드 전 요소 (input-group)
     */
    prepend?: React.ReactNode;
    /**
     * 입력 필드 후 요소 (input-group)
     */
    append?: React.ReactNode;
}
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * 텍스트 영역 상태
     */
    state?: 'success' | 'warning' | 'error';
}
/**
 * BRICKS 디자인 시스템 Input 컴포넌트
 *
 * @example
 * ```tsx
 * <Input
 *   size="md"
 *   placeholder="이름을 입력하세요"
 *   state="success"
 *   leftIcon={<SearchIcon />}
 * />
 * ```
 */
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
/**
 * BRICKS 디자인 시스템 Textarea 컴포넌트
 *
 * @example
 * ```tsx
 * <Textarea
 *   placeholder="메시지를 입력하세요"
 *   state="error"
 *   rows={4}
 * />
 * ```
 */
export declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export default Input;
//# sourceMappingURL=Input.d.ts.map