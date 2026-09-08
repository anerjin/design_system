import React, { forwardRef } from 'react';
import { cx } from './utils';

export type SwapEffect = 'none' | 'rotate' | 'flip';

const EFFECT: Record<SwapEffect, string> = {
  none: '',
  rotate: 'swap-rotate',
  flip: 'swap-flip',
};

export interface SwapProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** 켜짐 상태에 보여줄 내용 */
  on: React.ReactNode;

  /** 꺼짐 상태에 보여줄 내용 */
  off: React.ReactNode;

  /**
   * 전환 효과
   * @default 'none'
   */
  effect?: SwapEffect;

  /** 켜짐 여부 (제어) */
  checked?: boolean;

  /** 처음 상태 (비제어) */
  defaultChecked?: boolean;

  /** 상태가 바뀔 때 호출된다 */
  onChange?: (checked: boolean) => void;

  /** 스크린리더용 설명 */
  label?: string;
}

/**
 * DOI INC Swap — daisyUI `swap` 기반
 *
 * 두 내용을 자리 바꿔 보여준다. 숨은 체크박스로 동작한다.
 *
 * @example
 * ```tsx
 * <Swap
 *   effect="rotate"
 *   label="테마 전환"
 *   on={<Icon name="sun" size="1em" className="text-2xl"  />}
 *   off={<Icon name="moon" size="1em" className="text-2xl"  />}
 * />
 * ```
 */
export const Swap = forwardRef<HTMLInputElement, SwapProps>(({
  on,
  off,
  effect = 'none',
  checked,
  defaultChecked,
  onChange,
  label,
  className,
  ...props
}, ref) => (
  <label className={cx('swap', EFFECT[effect], className)} {...props}>
    <input
      ref={ref}
      type="checkbox"
      aria-label={label}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={(event) => onChange?.(event.target.checked)}
    />
    <div className="swap-on">{on}</div>
    <div className="swap-off">{off}</div>
  </label>
));

Swap.displayName = 'Swap';

export default Swap;
