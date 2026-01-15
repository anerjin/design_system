import React from 'react';
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * 체크박스 크기
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * 체크박스 변형 스타일
     */
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'dark';
    /**
     * 체크박스 레이블
     */
    label?: React.ReactNode;
    /**
     * 설명 텍스트
     */
    description?: React.ReactNode;
    /**
     * 불확정 상태 (indeterminate)
     */
    indeterminate?: boolean;
    /**
     * 체크박스 변경 이벤트
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface CheckboxGroupProps {
    /**
     * 그룹 레이블
     */
    label?: React.ReactNode;
    /**
     * 인라인 배치
     * @default false
     */
    inline?: boolean;
    /**
     * 에러 상태
     */
    error?: boolean;
    /**
     * 에러 메시지
     */
    errorMessage?: React.ReactNode;
    /**
     * 필수 선택
     */
    required?: boolean;
    /**
     * 자식 요소
     */
    children: React.ReactNode;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
}
/**
 * BRICKS 디자인 시스템 Checkbox 컴포넌트
 *
 * @example
 * ```tsx
 * <Checkbox
 *   label="동의합니다"
 *   description="개인정보 처리방침에 동의합니다"
 *   checked={agreed}
 *   onChange={(e) => setAgreed(e.target.checked)}
 * />
 * ```
 */
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
/**
 * BRICKS 디자인 시스템 CheckboxGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <CheckboxGroup
 *   label="관심 분야"
 *   error={hasError}
 *   errorMessage="최소 1개 이상 선택해주세요"
 * >
 *   <Checkbox label="프론트엔드" value="frontend" />
 *   <Checkbox label="백엔드" value="backend" />
 *   <Checkbox label="디자인" value="design" />
 * </CheckboxGroup>
 * ```
 */
export declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map