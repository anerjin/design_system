import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useEffect, useRef } from 'react';
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
export const Checkbox = forwardRef(({ size = 'md', variant, label, description, indeterminate = false, className, id, disabled, onChange, ...props }, ref) => {
    const inputRef = useRef(null);
    const finalRef = ref || inputRef;
    // indeterminate 상태 설정
    useEffect(() => {
        if (finalRef.current) {
            finalRef.current.indeterminate = indeterminate;
            if (indeterminate) {
                finalRef.current.setAttribute('aria-checked', 'mixed');
            }
            else {
                finalRef.current.removeAttribute('aria-checked');
            }
        }
    }, [indeterminate, finalRef]);
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const descriptionId = description ? `${checkboxId}-description` : undefined;
    const containerClasses = [
        'checkbox',
        size !== 'md' ? `checkbox--${size}` : '',
        variant ? `checkbox--${variant}` : '',
        className
    ].filter(Boolean).join(' ');
    const handleChange = (event) => {
        // indeterminate 상태에서 변경 시 indeterminate 해제
        if (indeterminate && finalRef.current) {
            finalRef.current.indeterminate = false;
            finalRef.current.removeAttribute('aria-checked');
        }
        onChange?.(event);
    };
    return (_jsxs("label", { className: containerClasses, children: [_jsx("input", { ref: finalRef, type: "checkbox", id: checkboxId, className: "checkbox__input", disabled: disabled, "aria-describedby": descriptionId, onChange: handleChange, ...props }), _jsx("div", { className: "checkbox__box", children: _jsx("div", { className: "checkbox__checkmark" }) }), label && (_jsxs("span", { className: "checkbox__label", children: [label, description && (_jsx("span", { id: descriptionId, className: "checkbox__description", children: description }))] }))] }));
});
Checkbox.displayName = 'Checkbox';
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
export const CheckboxGroup = ({ label, inline = false, error = false, errorMessage, required = false, children, className }) => {
    const groupClasses = [
        'checkbox-group',
        inline ? 'checkbox-group--inline' : '',
        error ? 'checkbox-group--error' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("fieldset", { className: groupClasses, "data-required": required || undefined, children: [label && (_jsxs("legend", { className: "checkbox-group__label", children: [label, required && _jsx("span", { className: "required-mark", children: "*" })] })), children, error && errorMessage && (_jsx("div", { className: "checkbox-group__error", role: "alert", children: errorMessage }))] }));
};
CheckboxGroup.displayName = 'CheckboxGroup';
export default Checkbox;
//# sourceMappingURL=Checkbox.js.map