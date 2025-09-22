import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
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
export const Input = forwardRef(({ size = 'md', state, leftIcon, rightIcon, prepend, append, className, disabled, readOnly, ...props }, ref) => {
    const baseClasses = 'input';
    const sizeClass = `input--${size}`;
    const stateClass = state ? `input--${state}` : '';
    const inputClasses = [
        baseClasses,
        sizeClass,
        stateClass,
        className
    ].filter(Boolean).join(' ');
    // 아이콘 및 그룹이 있는 경우
    const hasIcons = leftIcon || rightIcon;
    const hasGroup = prepend || append;
    if (hasGroup) {
        return (_jsxs("div", { className: "input-group", children: [prepend && (_jsx("div", { className: "input-group__prepend", children: prepend })), _jsx("input", { ref: ref, className: inputClasses, disabled: disabled, readOnly: readOnly, ...props }), append && (_jsx("div", { className: "input-group__append", children: append }))] }));
    }
    if (hasIcons) {
        const iconContainerClasses = [
            'input-icon',
            leftIcon ? 'input-icon--left' : '',
            rightIcon ? 'input-icon--right' : ''
        ].filter(Boolean).join(' ');
        return (_jsxs("div", { className: iconContainerClasses, children: [leftIcon && (_jsx("div", { className: "input-icon__icon input-icon__icon--left", children: leftIcon })), _jsx("input", { ref: ref, className: inputClasses, disabled: disabled, readOnly: readOnly, ...props }), rightIcon && (_jsx("div", { className: "input-icon__icon input-icon__icon--right", children: rightIcon }))] }));
    }
    return (_jsx("input", { ref: ref, className: inputClasses, disabled: disabled, readOnly: readOnly, ...props }));
});
Input.displayName = 'Input';
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
export const Textarea = forwardRef(({ state, className, disabled, readOnly, ...props }, ref) => {
    const baseClasses = 'textarea';
    const stateClass = state ? `input--${state}` : '';
    const textareaClasses = [
        baseClasses,
        stateClass,
        className
    ].filter(Boolean).join(' ');
    return (_jsx("textarea", { ref: ref, className: textareaClasses, disabled: disabled, readOnly: readOnly, ...props }));
});
Textarea.displayName = 'Textarea';
export default Input;
//# sourceMappingURL=Input.js.map