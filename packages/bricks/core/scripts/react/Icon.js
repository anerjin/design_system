import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
/**
 * Icon component using Boxicons
 *
 * @example
 * ```tsx
 * <Icon name="home" size={24} />
 * <Icon name="user" color="#333" />
 * ```
 */
export const Icon = forwardRef(({ name, size = 24, color = 'currentColor', className = '', ...props }, ref) => {
    return (_jsx("i", { ref: ref, className: `bx bx-${name} ${className}`, style: {
            fontSize: typeof size === 'number' ? `${size}px` : size,
            color,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        }, ...props }));
});
Icon.displayName = 'Icon';
export default Icon;
//# sourceMappingURL=Icon.js.map