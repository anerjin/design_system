import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * 풀 너비 버튼
   * @default false
   */
  fullWidth?: boolean;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;

  /**
   * 아이콘 전용 버튼
   * @default false
   */
  iconOnly?: boolean;

  /**
   * 왼쪽 아이콘
   */
  leftIcon?: React.ReactNode;

  /**
   * 오른쪽 아이콘
   */
  rightIcon?: React.ReactNode;

  /**
   * 버튼 비활성화
   * @default false
   */
  disabled?: boolean;

  /**
   * 클릭 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 자식 요소
   */
  children?: React.ReactNode;
}

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
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconOnly = false,
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  children,
  className,
  ...props
}) => {
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

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="bricks-spinner" aria-label="Loading..." />}
      {!loading && leftIcon && <span className="bricks-btn-icon-left">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="bricks-btn-icon-right">{rightIcon}</span>}
    </button>
  );
};

export default Button;