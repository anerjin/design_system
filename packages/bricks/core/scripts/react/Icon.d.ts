import React from 'react';
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Icon name from Boxicons regular set
     */
    name: string;
    /**
     * Icon size
     * @default 24
     */
    size?: number | string;
    /**
     * Icon color
     * @default 'currentColor'
     */
    color?: string;
    /**
     * Additional CSS class
     */
    className?: string;
}
/**
 * Icon component using Boxicons
 *
 * @example
 * ```tsx
 * <Icon name="home" size={24} />
 * <Icon name="user" color="#333" />
 * ```
 */
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLElement>>;
export default Icon;
//# sourceMappingURL=Icon.d.ts.map