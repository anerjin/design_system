import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'toggle-neutral',
  primary: 'toggle-primary',
  secondary: 'toggle-secondary',
  accent: 'toggle-accent',
  info: 'toggle-info',
  success: 'toggle-success',
  warning: 'toggle-warning',
  error: 'toggle-error',
};

const SIZE: Record<Size, string> = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: 'toggle-md',
  lg: 'toggle-lg',
  xl: 'toggle-xl',
};

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** 색상 */
  color?: Color;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 라벨 텍스트. 주면 클릭 가능한 라벨로 감싼다 */
  label?: React.ReactNode;

  /** 켜짐 상태 아이콘. `offIcon`과 함께 스위치 안에 표시된다 */
  onIcon?: React.ReactNode;

  /** 꺼짐 상태 아이콘 */
  offIcon?: React.ReactNode;
}

/**
 * DOI INC Toggle — daisyUI `toggle` 기반
 *
 * 이전 구현은 `<button role="switch">`였지만, daisyUI 토글은
 * 네이티브 `<input type="checkbox">`다. 따라서 상태는 `e.target.checked`로 읽는다.
 *
 * @example
 * ```tsx
 * <Toggle label="알림 받기" color="success" defaultChecked />
 * <Toggle
 *   onIcon={<Icon name="sun" size="1em"  />}
 *   offIcon={<Icon name="moon" size="1em"  />}
 * />
 * ```
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(({
  color,
  size = 'md',
  label,
  onIcon,
  offIcon,
  className,
  ...props
}, ref) => {
  const classes = cx('toggle', color && COLOR[color], SIZE[size], className);

  // 아이콘을 쓰면 daisyUI 방식대로 label.toggle이 껍데기가 되고 input은 안에 들어간다
  if (onIcon || offIcon) {
    return (
      <label className={classes}>
        <input ref={ref} type="checkbox" {...props} />
        {offIcon}
        {onIcon}
      </label>
    );
  }

  const input = <input ref={ref} type="checkbox" className={classes} {...props} />;

  if (!label) return input;

  return (
    <label className="label cursor-pointer justify-start gap-3">
      {input}
      <span>{label}</span>
    </label>
  );
});

Toggle.displayName = 'Toggle';

export default Toggle;
