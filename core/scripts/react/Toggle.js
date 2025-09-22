import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useEffect } from 'react';
/**
 * BRICKS 디자인 시스템 Toggle 컴포넌트
 *
 * @example
 * ```tsx
 * <Toggle
 *   label="알림 설정"
 *   checked={notificationEnabled}
 *   onChange={(checked) => setNotificationEnabled(checked)}
 *   variant="success"
 * />
 * ```
 */
export const Toggle = forwardRef(({ size = 'md', variant, checked, defaultChecked = false, label, showIcons = false, onIcon, offIcon, className, id, disabled, onChange, onKeyDown, onClick, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked ?? defaultChecked);
    const isControlled = checked !== undefined;
    // 제어 컴포넌트에서 checked prop이 변경되면 상태 업데이트
    useEffect(() => {
        if (isControlled) {
            setIsChecked(checked);
        }
    }, [checked, isControlled]);
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;
    const containerClasses = [
        'toggle',
        size !== 'md' ? `toggle--${size}` : '',
        variant ? `toggle--${variant}` : '',
        isChecked ? 'toggle--active' : '',
        showIcons ? 'toggle--icons' : '',
        className
    ].filter(Boolean).join(' ');
    const handleToggle = (event) => {
        if (disabled)
            return;
        const newChecked = !isChecked;
        if (!isControlled) {
            setIsChecked(newChecked);
        }
        onChange?.(newChecked, event);
    };
    const handleClick = (event) => {
        handleToggle(event);
        onClick?.(event);
    };
    const handleKeyDown = (event) => {
        // Space, Enter, ArrowRight, ArrowLeft 키 처리
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            handleToggle(event);
        }
        else if (event.key === 'ArrowRight' && !isChecked) {
            event.preventDefault();
            handleToggle(event);
        }
        else if (event.key === 'ArrowLeft' && isChecked) {
            event.preventDefault();
            handleToggle(event);
        }
        onKeyDown?.(event);
    };
    return (_jsxs("div", { className: "toggle-container", children: [_jsx("button", { ref: ref, id: toggleId, className: containerClasses, role: "switch", "aria-checked": isChecked, "aria-disabled": disabled, disabled: disabled, onClick: handleClick, onKeyDown: handleKeyDown, ...props, children: _jsx("div", { className: "toggle__track", children: _jsx("div", { className: "toggle__thumb", children: showIcons && (_jsxs(_Fragment, { children: [onIcon && (_jsx("div", { className: "toggle__icon toggle__icon--on", children: onIcon })), offIcon && (_jsx("div", { className: "toggle__icon toggle__icon--off", children: offIcon }))] })) }) }) }), label && (_jsx("label", { htmlFor: toggleId, className: "toggle__label", children: label }))] }));
});
Toggle.displayName = 'Toggle';
export default Toggle;
//# sourceMappingURL=Toggle.js.map