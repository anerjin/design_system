import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'progress-neutral',
  primary: 'progress-primary',
  secondary: 'progress-secondary',
  accent: 'progress-accent',
  info: 'progress-info',
  success: 'progress-success',
  warning: 'progress-warning',
  error: 'progress-error',
};

/** daisyUI progress에는 크기 클래스가 없어 높이 유틸리티로 조절한다 */
const SIZE: Record<Size, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
};

export interface ProgressProps extends Omit<React.ProgressHTMLAttributes<HTMLProgressElement>, 'value' | 'max'> {
  /**
   * 진행 값
   * @default 0
   */
  value?: number;

  /**
   * 최대 값
   * @default 100
   */
  max?: number;

  /**
   * 굵기
   * @default 'md'
   */
  size?: Size;

  /** 색상 */
  color?: Color;

  /**
   * 진행률을 알 수 없는 상태. 좌우로 움직이는 애니메이션이 된다.
   * @default false
   */
  indeterminate?: boolean;

  /** 막대 위에 표시할 설명 */
  label?: React.ReactNode;

  /**
   * 오른쪽에 퍼센트를 표시한다
   * @default false
   */
  showValue?: boolean;

  /** 퍼센트 표시 형식을 바꾼다 */
  formatValue?: (value: number, max: number) => React.ReactNode;
}

/**
 * DOI INC Progress — daisyUI `progress` 기반
 *
 * 네이티브 `<progress>` 요소를 쓴다. daisyUI에는 줄무늬(striped) 스타일이 없어
 * 이전의 `striped` / `animated` 속성은 사라졌고, 값을 주지 않으면 자동으로
 * 진행률 미상 애니메이션이 된다.
 *
 * @example
 * ```tsx
 * <Progress value={60} color="primary" />
 * <Progress indeterminate />
 * <Progress value={80} label="업로드 중" showValue />
 * ```
 */
export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(({
  value = 0,
  max = 100,
  size = 'md',
  color,
  indeterminate = false,
  label,
  showValue = false,
  formatValue,
  className,
  ...props
}, ref) => {
  const percentage = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const bar = (
    <progress
      ref={ref}
      className={cx('progress w-full', color && COLOR[color], SIZE[size], className)}
      // value를 주지 않으면 daisyUI가 진행률 미상 애니메이션을 보여준다
      value={indeterminate ? undefined : value}
      max={max}
      {...props}
    />
  );

  if (!label && !showValue) return bar;

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        {showValue && (
          <span className="opacity-60 tabular-nums">
            {formatValue ? formatValue(value, max) : `${Math.round(percentage)}%`}
          </span>
        )}
      </div>
      {bar}
    </div>
  );
});

Progress.displayName = 'Progress';

export default Progress;
