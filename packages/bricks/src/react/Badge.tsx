import { Icon } from './Icon';
import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

export type BadgeVariant = 'solid' | 'outline' | 'dash' | 'soft' | 'ghost';

const COLOR: Record<Color, string> = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

const VARIANT: Record<BadgeVariant, string> = {
  solid: '',
  outline: 'badge-outline',
  dash: 'badge-dash',
  soft: 'badge-soft',
  ghost: 'badge-ghost',
};

const SIZE: Record<Size, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
  xl: 'badge-xl',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 시맨틱 색상. 생략하면 기본 뱃지 */
  color?: Color;

  /**
   * 뱃지 스타일. `color`와 조합해서 쓴다.
   * @default 'solid'
   */
  variant?: BadgeVariant;

  /**
   * 뱃지 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 내용 없는 점 형태로 렌더한다. `children`은 무시된다.
   * @default false
   */
  dot?: boolean;

  /**
   * 닫기 버튼 표시
   * @default false
   */
  closable?: boolean;

  /** 닫기 이벤트 */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  children?: React.ReactNode;
}

/**
 * DOI INC Badge — daisyUI `badge` 기반
 *
 * @example
 * ```tsx
 * <Badge color="success">완료</Badge>
 * <Badge variant="outline" color="error" size="sm">실패</Badge>
 * <Badge dot color="warning" size="xs" />
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      color,
      variant = 'solid',
      size = 'md',
      dot = false,
      closable = false,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = cx('badge', color && COLOR[color], VARIANT[variant], SIZE[size], className);

    if (dot) {
      return <span ref={ref} className={classes} {...props} />;
    }

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
        {closable && (
          <button
            type="button"
            className="cursor-pointer opacity-60 hover:opacity-100"
            aria-label="제거"
            onClick={onClose}
          >
            <Icon name="x" size="1em" />
          </button>
        )}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
