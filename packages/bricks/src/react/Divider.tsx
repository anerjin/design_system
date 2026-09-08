import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

/**
 * daisyUI의 이름을 그대로 따른다. 헷갈리기 쉬우니 주의:
 * - `vertical`  : 위아래로 쌓인 요소 사이의 **가로선** (기본값)
 * - `horizontal`: 좌우로 놓인 요소 사이의 **세로선**
 */
export type DividerDirection = 'vertical' | 'horizontal';
export type DividerPlacement = 'start' | 'center' | 'end';

const DIRECTION: Record<DividerDirection, string> = {
  vertical: 'divider-vertical',
  horizontal: 'divider-horizontal',
};

const PLACEMENT: Record<DividerPlacement, string> = {
  start: 'divider-start',
  center: '',
  end: 'divider-end',
};

const COLOR: Record<Color, string> = {
  neutral: 'divider-neutral',
  primary: 'divider-primary',
  secondary: 'divider-secondary',
  accent: 'divider-accent',
  info: 'divider-info',
  success: 'divider-success',
  warning: 'divider-warning',
  error: 'divider-error',
};

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 선의 방향
   * @default 'vertical'
   */
  direction?: DividerDirection;

  /**
   * 가운데 글자의 위치
   * @default 'center'
   */
  placement?: DividerPlacement;

  /** 선 색상 */
  color?: Color;

  /** 가운데에 넣을 글자. 없으면 선만 그린다 */
  children?: React.ReactNode;
}

/**
 * DOI INC Divider — daisyUI `divider` 기반
 *
 * @example
 * ```tsx
 * <Divider>또는</Divider>
 * <div className="flex"><div>왼쪽</div><Divider direction="horizontal" /><div>오른쪽</div></div>
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(({
  direction = 'vertical',
  placement = 'center',
  color,
  className,
  children,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cx(
      'divider',
      DIRECTION[direction],
      PLACEMENT[placement],
      color && COLOR[color],
      className,
    )}
    {...props}
  >
    {children}
  </div>
));

Divider.displayName = 'Divider';

export default Divider;
