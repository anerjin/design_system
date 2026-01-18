import React, { forwardRef } from 'react';

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
export const Icon = forwardRef<HTMLElement, IconProps>(({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  ...props
}, ref) => {
  return (
    <i
      ref={ref}
      className={`bx bx-${name} ${className}`}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        color,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      {...props}
    />
  );
});

Icon.displayName = 'Icon';

export default Icon;