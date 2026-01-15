import React from 'react';
export interface SelectOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /**
     * 선택 필드 크기
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * 선택 필드 상태
     */
    state?: 'success' | 'warning' | 'error';
    /**
     * 옵션 목록
     */
    options?: SelectOption[];
    /**
     * 플레이스홀더 옵션
     */
    placeholder?: string;
    /**
     * 선택 필드 전 요소 (select-group)
     */
    prepend?: React.ReactNode;
    /**
     * 선택 필드 후 요소 (select-group)
     */
    append?: React.ReactNode;
    /**
     * 자식 요소 (options 대신 직접 작성하는 경우)
     */
    children?: React.ReactNode;
}
/**
 * BRICKS 디자인 시스템 Select 컴포넌트
 *
 * @example
 * ```tsx
 * <Select
 *   size="md"
 *   placeholder="국가를 선택하세요"
 *   options={[
 *     { value: 'kr', label: '대한민국' },
 *     { value: 'us', label: '미국' },
 *     { value: 'jp', label: '일본' }
 *   ]}
 *   value={selectedCountry}
 *   onChange={(e) => setSelectedCountry(e.target.value)}
 * />
 * ```
 */
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
/**
 * SelectOption 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export declare const Option: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>>;
/**
 * OptGroup 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export declare const OptGroup: React.FC<React.OptgroupHTMLAttributes<HTMLOptGroupElement>>;
export default Select;
//# sourceMappingURL=Select.d.ts.map