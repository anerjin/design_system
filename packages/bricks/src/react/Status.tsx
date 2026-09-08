import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'status-neutral',
  primary: 'status-primary',
  secondary: 'status-secondary',
  accent: 'status-accent',
  info: 'status-info',
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
};

const SIZE: Record<Size, string> = {
  xs: 'status-xs',
  sm: 'status-sm',
  md: 'status-md',
  lg: 'status-lg',
  xl: 'status-xl',
};

export interface StatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 색상 */
  color?: Color;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 숨 쉬듯 깜박이게 한다 (진행 중·연결됨 표현)
   * @default false
   */
  pulse?: boolean;

  /** 스크린리더용 설명. 점만 있으면 의미가 전달되지 않으므로 넣어주는 편이 좋다 */
  label?: string;
}

/**
 * DOI INC Status — daisyUI `status` 기반
 *
 * 작은 점 하나로 상태를 나타낸다. 글자를 곁들이려면 `Badge`를 쓴다.
 *
 * @example
 * ```tsx
 * <Status color="success" label="온라인" />
 * <Status color="warning" pulse label="배포 중" />
 * ```
 */
export const Status = forwardRef<HTMLSpanElement, StatusProps>(({
  color,
  size = 'md',
  pulse = false,
  label,
  className,
  ...props
}, ref) => (
  <span
    ref={ref}
    role="status"
    aria-label={label}
    className={cx(
      'status',
      color && COLOR[color],
      SIZE[size],
      pulse && 'animate-pulse',
      className,
    )}
    {...props}
  />
));

Status.displayName = 'Status';

export default Status;
