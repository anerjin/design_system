import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
};

export interface RadialProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 진행 값 (0~100). @default 0 */
  value?: number;
  /** 진행 링 색상. @default 'primary' */
  color?: Color;
  /** 지름 (CSS 길이). @default '5rem' */
  size?: string;
  /** 링 두께 (CSS 길이). 기본값은 지름의 1/14. */
  thickness?: string;
  /** 가운데 퍼센트 표시 여부. children이 우선한다. @default true */
  showValue?: boolean;
  /** 가운데 표시할 내용 */
  children?: React.ReactNode;
}

/** 둥근 SVG 선과 회색 배경 링으로 진행률을 표시한다. */
export const RadialProgress = forwardRef<HTMLDivElement, RadialProgressProps>(
  (
    {
      value = 0,
      color = 'primary',
      size = '5rem',
      thickness,
      showValue = true,
      className,
      style,
      children,
      'aria-label': ariaLabel = '진행률',
      ...props
    },
    ref,
  ) => {
    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, 0), 100) : 0;
    return (
      <div
        ref={ref}
        className={cx('radial-progress bricks-radial-progress', COLOR[color], className)}
        style={
          {
            '--value': clamped,
            '--size': size,
            '--thickness': thickness ?? 'calc(var(--size) / 14)',
            ...style,
          } as React.CSSProperties
        }
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <svg className="bricks-radial-ring" aria-hidden="true" focusable="false">
          <circle className="bricks-radial-track" cx="50%" cy="50%" />
          {clamped > 0 && (
            <circle
              className="bricks-radial-fill"
              cx="50%"
              cy="50%"
              data-complete={clamped === 100 ? '' : undefined}
              strokeLinecap="round"
            />
          )}
        </svg>
        {(children != null || showValue) && (
          <span className="bricks-radial-value">{children ?? `${Math.round(clamped)}%`}</span>
        )}
      </div>
    );
  },
);
RadialProgress.displayName = 'RadialProgress';
export default RadialProgress;
