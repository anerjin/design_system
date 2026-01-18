import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
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
export const Button = forwardRef(({ variant = 'primary', size = 'md', fullWidth = false, loading = false, iconOnly = false, pill = false, rounded = 'md', leftIcon, rightIcon, disabled = false, onClick, children, className, ...props }, ref) => {
    const baseClasses = 'btn';
    const variantClass = `btn--${variant}`;
    const sizeClass = size !== 'md' ? `btn--${size}` : '';
    const fullWidthClass = fullWidth ? 'btn--block' : '';
    const loadingClass = loading ? 'btn--loading' : '';
    const iconOnlyClass = iconOnly ? 'btn--icon-only' : '';
    const pillClass = pill ? 'btn--pill' : '';
    const roundedClass = rounded !== 'md' ? `btn--rounded-${rounded}` : '';
    const classes = [
        baseClasses,
        variantClass,
        sizeClass,
        fullWidthClass,
        loadingClass,
        iconOnlyClass,
        pillClass,
        roundedClass,
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("button", { ref: ref, className: classes, disabled: disabled || loading, onClick: onClick, "aria-busy": loading, "aria-disabled": disabled || loading, ...props, children: [!loading && leftIcon && _jsx("span", { className: "btn__icon", children: leftIcon }), children, !loading && rightIcon && _jsx("span", { className: "btn__icon btn__icon--right", children: rightIcon })] }));
});
Button.displayName = 'Button';
export default Button;
//# sourceMappingURL=Button.js.map