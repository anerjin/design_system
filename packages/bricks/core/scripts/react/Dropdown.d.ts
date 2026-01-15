import React from 'react';
export interface DropdownOption {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}
export interface DropdownProps {
    /**
     * 드롭다운 옵션 목록
     */
    options: DropdownOption[];
    /**
     * 선택된 값
     */
    value?: string;
    /**
     * 플레이스홀더
     */
    placeholder?: string;
    /**
     * 드롭다운 크기
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * 드롭다운 변형
     * @default 'default'
     */
    variant?: 'default' | 'outlined' | 'filled';
    /**
     * 비활성화 여부
     */
    disabled?: boolean;
    /**
     * 값 변경 이벤트
     */
    onChange?: (value: string) => void;
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 드롭다운 방향
     * @default 'bottom'
     */
    placement?: 'bottom' | 'top';
    /**
     * 검색 가능 여부
     */
    searchable?: boolean;
    /**
     * 다중 선택 가능 여부
     */
    multiple?: boolean;
    /**
     * 선택된 값들 (다중 선택 시)
     */
    values?: string[];
    /**
     * 다중 선택 시 값 변경 이벤트
     */
    onMultiChange?: (values: string[]) => void;
}
/**
 * BRICKS 디자인 시스템 Dropdown 컴포넌트
 *
 * @example
 * ```tsx
 * <Dropdown
 *   placeholder="Select an option"
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' },
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 * ```
 */
export declare const Dropdown: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map