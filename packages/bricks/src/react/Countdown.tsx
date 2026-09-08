import React, { forwardRef, useEffect, useState } from 'react';
import { cx } from './utils';

export interface CountdownProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 표시할 숫자 (0~99). daisyUI가 CSS 카운터로 굴려서 보여준다.
   */
  value: number;

  /** 스크린리더용 설명 */
  label?: string;
}

/**
 * DOI INC Countdown — daisyUI `countdown` 기반
 *
 * 숫자가 바뀔 때 굴러가는 애니메이션이 붙는다. 0~99만 표현할 수 있다.
 * 여러 자리를 이어붙이려면 `CountdownTimer`를 쓴다.
 *
 * @example
 * ```tsx
 * <Countdown value={42} label="42초 남음" />
 * ```
 */
export const Countdown = forwardRef<HTMLSpanElement, CountdownProps>(({
  value,
  label,
  className,
  style,
  ...props
}, ref) => {
  const clamped = Math.min(Math.max(Math.trunc(value), 0), 99);

  return (
    <span ref={ref} className={cx('countdown', className)} {...props}>
      <span
        style={{ '--value': clamped, ...style } as React.CSSProperties}
        aria-live="polite"
        aria-label={label ?? String(clamped)}
      >
        {clamped}
      </span>
    </span>
  );
});

Countdown.displayName = 'Countdown';

export interface CountdownTimerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 목표 시각. 이 시점까지 남은 시간을 센다 */
  target: Date;

  /**
   * 일 단위까지 보여준다
   * @default true
   */
  showDays?: boolean;

  /** 다 셌을 때 호출된다 */
  onComplete?: () => void;
}

const UNIT_LABEL: Record<'days' | 'hours' | 'minutes' | 'seconds', string> = {
  days: '일',
  hours: '시간',
  minutes: '분',
  seconds: '초',
};

function remaining(target: Date) {
  const diff = Math.max(target.getTime() - Date.now(), 0);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    done: diff === 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

/**
 * DOI INC CountdownTimer — 목표 시각까지 남은 시간
 *
 * @example
 * ```tsx
 * <CountdownTimer target={new Date(Date.now() + 3 * 3600_000)} />
 * ```
 */
export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(({
  target,
  showDays = true,
  onComplete,
  className,
  ...props
}, ref) => {
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    setLeft(remaining(target));
    const timer = setInterval(() => {
      const next = remaining(target);
      setLeft(next);
      if (next.done) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onComplete]);

  const units = (showDays
    ? (['days', 'hours', 'minutes', 'seconds'] as const)
    : (['hours', 'minutes', 'seconds'] as const));

  return (
    <div ref={ref} className={cx('flex gap-4', className)} {...props}>
      {units.map((unit) => (
        <div key={unit} className="flex flex-col items-center">
          <span className="countdown font-mono text-4xl">
            <span
              style={{ '--value': left[unit] } as React.CSSProperties}
              aria-live="polite"
            >
              {left[unit]}
            </span>
          </span>
          <span className="text-xs opacity-60">{UNIT_LABEL[unit]}</span>
        </div>
      ))}
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

export default Countdown;
