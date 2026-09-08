import React, { forwardRef } from 'react';
import { cx } from './utils';

export type StackAlign = 'top' | 'bottom' | 'start' | 'end';

const ALIGN: Record<StackAlign, string> = {
  top: 'stack-top',
  bottom: 'stack-bottom',
  start: 'stack-start',
  end: 'stack-end',
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 쌓이는 방향
   * @default 'bottom'
   */
  align?: StackAlign;

  children: React.ReactNode;
}

/**
 * DOI INC Stack — daisyUI `stack` 기반
 *
 * 자식들을 같은 자리에 겹쳐 쌓아 카드 더미처럼 보이게 한다.
 * 맨 앞 자식이 가장 위에 온다.
 *
 * @example
 * ```tsx
 * <Stack className="w-64">
 *   <Card variant="border"><Card.Body>맨 앞</Card.Body></Card>
 *   <Card variant="border"><Card.Body>가운데</Card.Body></Card>
 *   <Card variant="border"><Card.Body>맨 뒤</Card.Body></Card>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(({
  align = 'bottom',
  className,
  children,
  ...props
}, ref) => (
  <div ref={ref} className={cx('stack', ALIGN[align], className)} {...props}>
    {children}
  </div>
));

Stack.displayName = 'Stack';

export default Stack;
