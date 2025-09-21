import React from 'react';
import { ButtonProps } from '../react/Button';

/**
 * Next.js Server Component Button
 * 서버 사이드에서 렌더링되는 정적 버튼
 *
 * @note onClick 등 클라이언트 이벤트는 지원하지 않음
 */
export const ServerButton: React.FC<Omit<ButtonProps, 'onClick' | 'loading'>> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  children,
  className,
  ...props
}) => {
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

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="bricks-btn-icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="bricks-btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default ServerButton;