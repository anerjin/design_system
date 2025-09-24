import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
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
export const Select = forwardRef(({ size = 'md', state, options, placeholder, prepend, append, children, className, disabled, multiple, ...props }, ref) => {
    const baseClasses = 'select';
    const sizeClass = `select--${size}`;
    const stateClass = state ? `select--${state}` : '';
    const selectClasses = [
        baseClasses,
        sizeClass,
        stateClass,
        className
    ].filter(Boolean).join(' ');
    // 그룹이 있는 경우
    const hasGroup = prepend || append;
    const selectElement = (_jsxs("select", { ref: ref, className: selectClasses, disabled: disabled, multiple: multiple, ...props, children: [placeholder && !multiple && (_jsx("option", { value: "", disabled: true, children: placeholder })), options ? (options.map((option) => (_jsx("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value)))) : (children)] }));
    if (hasGroup) {
        return (_jsxs("div", { className: "select-group", children: [prepend && (_jsx("div", { className: "select-group__prepend", children: prepend })), selectElement, append && (_jsx("div", { className: "select-group__append", children: append }))] }));
    }
    return selectElement;
});
Select.displayName = 'Select';
/**
 * SelectOption 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export const Option = ({ children, ...props }) => {
    return _jsx("option", { ...props, children: children });
};
Option.displayName = 'Option';
/**
 * OptGroup 컴포넌트 - Select 컴포넌트 내부에서 사용
 */
export const OptGroup = ({ children, ...props }) => {
    return _jsx("optgroup", { ...props, children: children });
};
OptGroup.displayName = 'OptGroup';
export default Select;
//# sourceMappingURL=Select.js.map