import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Radio 컴포넌트
 *
 * @example
 * ```tsx
 * <Radio
 *   name="gender"
 *   value="male"
 *   label="남성"
 *   checked={gender === 'male'}
 *   onChange={(e) => setGender(e.target.value)}
 * />
 * ```
 */
export const Radio = forwardRef(({ size = 'md', variant, label, className, id, disabled, onChange, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const containerClasses = [
        'radio',
        size !== 'md' ? `radio--${size}` : '',
        variant ? `radio--${variant}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("label", { className: containerClasses, children: [_jsx("input", { ref: ref, type: "radio", id: radioId, className: "radio__input", disabled: disabled, onChange: onChange, ...props }), _jsx("div", { className: "radio__circle", children: _jsx("div", { className: "radio__dot" }) }), label && (_jsx("span", { className: "radio__label", children: label }))] }));
});
Radio.displayName = 'Radio';
/**
 * BRICKS 디자인 시스템 RadioGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   name="theme"
 *   label="테마 선택"
 *   value={theme}
 *   onChange={(value) => setTheme(value)}
 * >
 *   <Radio value="light" label="라이트 모드" />
 *   <Radio value="dark" label="다크 모드" />
 *   <Radio value="auto" label="시스템 설정" />
 * </RadioGroup>
 * ```
 */
export const RadioGroup = ({ name, label, inline = false, value, onChange, children, className, required = false, disabled = false }) => {
    const groupClasses = [
        'radio-group',
        inline ? 'radio-group--inline' : '',
        className
    ].filter(Boolean).join(' ');
    const handleChange = (event) => {
        if (onChange) {
            onChange(event.target.value, event);
        }
    };
    // children을 순회하면서 props 추가
    const enhancedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Radio) {
            return React.cloneElement(child, {
                name,
                checked: child.props.value === value,
                onChange: handleChange,
                disabled: disabled || child.props.disabled,
                ...child.props
            });
        }
        return child;
    });
    return (_jsxs("fieldset", { className: groupClasses, children: [label && (_jsxs("legend", { className: "radio-group__label", children: [label, required && _jsx("span", { className: "required-mark", children: "*" })] })), enhancedChildren] }));
};
RadioGroup.displayName = 'RadioGroup';
export default Radio;
//# sourceMappingURL=Radio.js.map