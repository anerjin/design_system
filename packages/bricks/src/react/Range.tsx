import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'range-neutral',
  primary: 'range-primary',
  secondary: 'range-secondary',
  accent: 'range-accent',
  info: 'range-info',
  success: 'range-success',
  warning: 'range-warning',
  error: 'range-error',
};

const SIZE: Record<Size, string> = {
  xs: 'range-xs',
  sm: 'range-sm',
  md: 'range-md',
  lg: 'range-lg',
  xl: 'range-xl',
};

export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** 색상 */
  color?: Color;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 눈금을 표시한다. `step`이 지정돼 있어야 의미가 있다.
   * @default false
   */
  showTicks?: boolean;

  /** 눈금 아래 표시할 라벨. 개수는 눈금 수와 맞춰야 한다 */
  tickLabels?: React.ReactNode[];
}

/**
 * DOI INC Range — daisyUI `range` 기반
 *
 * @example
 * ```tsx
 * <Range defaultValue={40} color="primary" />
 * <Range min={0} max={100} step={25} showTicks tickLabels={['0', '25', '50', '75', '100']} />
 * ```
 */
export const Range = forwardRef<HTMLInputElement, RangeProps>(({
  color,
  size = 'md',
  showTicks = false,
  tickLabels,
  min = 0,
  max = 100,
  step,
  className,
  ...props
}, ref) => {
  const tickCount = step
    ? Math.floor((Number(max) - Number(min)) / Number(step)) + 1
    : 0;

  return (
    <div className="w-full">
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        className={cx('range', color && COLOR[color], SIZE[size], className)}
        {...props}
      />

      {showTicks && tickCount > 1 && (
        <div className="mt-2 flex justify-between px-2.5 text-xs">
          {Array.from({ length: tickCount }, (_, i) => (
            <span key={i} aria-hidden="true">|</span>
          ))}
        </div>
      )}

      {tickLabels && tickLabels.length > 0 && (
        <div className="mt-1 flex justify-between px-2.5 text-xs opacity-60">
          {tickLabels.map((label, i) => <span key={i}>{label}</span>)}
        </div>
      )}
    </div>
  );
});

Range.displayName = 'Range';

export default Range;
