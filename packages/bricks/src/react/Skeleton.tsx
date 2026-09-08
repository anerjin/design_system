import React, { forwardRef } from 'react';
import { cx } from './utils';

// `as`로 어떤 태그든 렌더할 수 있으므로 속성도 넓게 받는다.
// AllHTMLAttributes에도 `as`(=<link as>)가 있어 이름이 겹치므로 걷어낸다.
export interface SkeletonProps extends Omit<React.AllHTMLAttributes<HTMLDivElement>, 'as'> {
  /**
   * 렌더할 태그
   * @default 'div'
   */
  as?: React.ElementType;

  children?: React.ReactNode;
}

/**
 * DOI INC Skeleton — daisyUI `skeleton` 기반
 *
 * 크기는 스스로 정하지 않는다. `className`으로 `h-*` / `w-*`를 준다.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-32 w-full" />
 * <Skeleton className="size-16 rounded-full" />
 * ```
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  as: Component = 'div',
  className,
  children,
  ...props
}, ref) => (
  <Component
    ref={ref}
    aria-hidden="true"
    className={cx('skeleton', className)}
    {...props}
  >
    {children}
  </Component>
));

Skeleton.displayName = 'Skeleton';

export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 줄 수
   * @default 3
   */
  lines?: number;

  /**
   * 마지막 줄을 짧게 만들어 문단처럼 보이게 한다
   * @default true
   */
  shortLastLine?: boolean;
}

/**
 * DOI INC SkeletonText — 여러 줄짜리 글 자리 표시
 *
 * @example
 * ```tsx
 * <SkeletonText lines={4} />
 * ```
 */
export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(({
  lines = 3,
  shortLastLine = true,
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cx('flex flex-col gap-2', className)} {...props}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        className={cx('h-4', shortLastLine && i === lines - 1 ? 'w-2/3' : 'w-full')}
      />
    ))}
  </div>
));

SkeletonText.displayName = 'SkeletonText';

export default Skeleton;
