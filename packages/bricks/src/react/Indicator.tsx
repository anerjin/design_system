import React, { forwardRef } from 'react';
import { cx } from './utils';

export type IndicatorPlacement =
  | 'top-start' | 'top-center' | 'top-end'
  | 'middle-start' | 'middle-center' | 'middle-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end';

const PLACEMENT: Record<IndicatorPlacement, string> = {
  'top-start': 'indicator-top indicator-start',
  'top-center': 'indicator-top indicator-center',
  'top-end': 'indicator-top indicator-end',
  'middle-start': 'indicator-middle indicator-start',
  'middle-center': 'indicator-middle indicator-center',
  'middle-end': 'indicator-middle indicator-end',
  'bottom-start': 'indicator-bottom indicator-start',
  'bottom-center': 'indicator-bottom indicator-center',
  'bottom-end': 'indicator-bottom indicator-end',
};

export interface IndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 모서리에 띄울 내용 (보통 `Badge`) */
  item?: React.ReactNode;

  /**
   * 붙는 위치
   * @default 'top-end'
   */
  placement?: IndicatorPlacement;

  children: React.ReactNode;
}

/**
 * DOI INC Indicator — daisyUI `indicator` 기반
 *
 * 자식 요소의 모서리에 뱃지나 점을 겹쳐 놓는다.
 *
 * @example
 * ```tsx
 * <Indicator item={<Badge color="primary" size="sm">99+</Badge>}>
 *   <Button variant="surface">받은편지함</Button>
 * </Indicator>
 * ```
 */
export const Indicator = forwardRef<HTMLDivElement, IndicatorProps>(({
  item,
  placement = 'top-end',
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('indicator', className)} {...props}>
    {item && (
      <span className={cx('indicator-item', PLACEMENT[placement])}>{item}</span>
    )}
    {children}
  </div>
));

Indicator.displayName = 'Indicator';

export default Indicator;
