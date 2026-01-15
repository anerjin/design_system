import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Next.js Server Component Button
 * 서버 사이드에서 렌더링되는 정적 버튼
 *
 * @note onClick 등 클라이언트 이벤트는 지원하지 않음
 */
export const ServerButton = ({ variant = 'primary', size = 'md', fullWidth = false, iconOnly = false, leftIcon, rightIcon, disabled = false, children, className, ...props }) => {
    const baseClasses = 'bricks-btn';
    const variantClass = `bricks-btn-${variant}`;
    const sizeClass = `bricks-btn-${size}`;
    const fullWidthClass = fullWidth ? 'bricks-btn-full' : '';
    const iconOnlyClass = iconOnly ? 'bricks-btn-icon' : '';
    const disabledClass = disabled ? 'disabled' : '';
    const classes = [
        baseClasses,
        variantClass,
        sizeClass,
        fullWidthClass,
        iconOnlyClass,
        disabledClass,
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("button", { className: classes, disabled: disabled, "aria-disabled": disabled, ...props, children: [leftIcon && _jsx("span", { className: "bricks-btn-icon-left", children: leftIcon }), children, rightIcon && _jsx("span", { className: "bricks-btn-icon-right", children: rightIcon })] }));
};
export default ServerButton;
//# sourceMappingURL=ServerButton.js.map