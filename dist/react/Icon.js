import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Icon component using Boxicons
 *
 * @example
 * ```tsx
 * <Icon name="home" size={24} />
 * <Icon name="user" color="#333" />
 * ```
 */
export const Icon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
    return (_jsx("i", { className: `bx bx-${name} ${className}`, style: {
            fontSize: typeof size === 'number' ? `${size}px` : size,
            color,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        } }));
};
export default Icon;
//# sourceMappingURL=Icon.js.map