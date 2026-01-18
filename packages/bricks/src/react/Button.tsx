import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | 'ghost' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger';

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
   * 둥근 버튼 (pill shape)
   * @default false
   */
  pill?: boolean;

  /**
   * 버튼 모서리 라운딩
   * @default 'md'
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

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
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  iconOnly = false,
  pill = false,
  rounded = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  onClick,
  children,
  className,
  ...props
}, ref) => {
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

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {!loading && leftIcon && <span className="btn__icon">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;