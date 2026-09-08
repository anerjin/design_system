import React, { forwardRef } from 'react';
import { cx } from './utils';

export interface DiffProps extends React.HTMLAttributes<HTMLElement> {
  /** 왼쪽(기준) 내용 */
  before: React.ReactNode;

  /** 오른쪽(비교) 내용 */
  after: React.ReactNode;

  /** 스크린리더용 설명 */
  label?: string;
}

/**
 * DOI INC Diff — daisyUI `diff` 기반
 *
 * 가운데 손잡이를 끌어 두 내용을 겹쳐 비교한다.
 * 높이는 지정하지 않으니 `className`으로 `aspect-*`나 `h-*`를 준다.
 *
 * @example
 * ```tsx
 * <Diff
 *   className="aspect-16/9"
 *   before={<img src="/before.jpg" alt="변경 전" />}
 *   after={<img src="/after.jpg" alt="변경 후" />}
 * />
 * ```
 */
export const Diff = forwardRef<HTMLElement, DiffProps>(({
  before,
  after,
  label = '변경 전후 비교',
  className,
  ...props
}, ref) => (
  <figure
    ref={ref as React.Ref<HTMLElement>}
    className={cx('diff', className)}
    tabIndex={0}
    aria-label={label}
    {...props}
  >
    <div className="diff-item-1" role="img">{before}</div>
    <div className="diff-item-2" role="img">{after}</div>
    <div className="diff-resizer" />
  </figure>
));

Diff.displayName = 'Diff';

export default Diff;
