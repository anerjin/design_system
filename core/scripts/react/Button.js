import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export const Button = ({ variant = 'primary', size = 'md', fullWidth = false, loading = false, iconOnly = false, leftIcon, rightIcon, disabled = false, onClick, children, className, ...props }) => {
    const baseClasses = 'bricks-btn';
    const variantClass = `bricks-btn-${variant}`;
    const sizeClass = `bricks-btn-${size}`;
    const fullWidthClass = fullWidth ? 'bricks-btn-full' : '';
    const loadingClass = loading ? 'bricks-btn-loading' : '';
    const iconOnlyClass = iconOnly ? 'bricks-btn-icon' : '';
    const disabledClass = disabled || loading ? 'disabled' : '';
    const classes = [
        baseClasses,
        variantClass,
        sizeClass,
        fullWidthClass,
        loadingClass,
        iconOnlyClass,
        disabledClass,
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("button", { className: classes, disabled: disabled || loading, onClick: onClick, "aria-busy": loading, "aria-disabled": disabled || loading, ...props, children: [loading && _jsx("span", { className: "bricks-spinner", "aria-label": "Loading..." }), !loading && leftIcon && _jsx("span", { className: "bricks-btn-icon-left", children: leftIcon }), children, !loading && rightIcon && _jsx("span", { className: "bricks-btn-icon-right", children: rightIcon })] }));
};
export default Button;
//# sourceMappingURL=Button.js.map