import React, { forwardRef } from 'react';
import { cx, type Color } from './utils';

const COLOR: Record<Color, string> = {
  neutral: 'link-neutral',
  primary: 'link-primary',
  secondary: 'link-secondary',
  accent: 'link-accent',
  info: 'link-info',
  success: 'link-success',
  warning: 'link-warning',
  error: 'link-error',
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 색상 */
  color?: Color;

  /**
   * 평소엔 밑줄을 감추고 마우스를 올렸을 때만 보여준다
   * @default false
   */
  hoverOnly?: boolean;

  /**
   * 렌더할 컴포넌트. Next.js의 `Link` 등을 끼워 넣을 때 쓴다.
   * @default 'a'
   */
  as?: React.ElementType;

  children: React.ReactNode;
}

/**
 * DOI INC Link — daisyUI `link` 기반
 *
 * @example
 * ```tsx
 * <Link href="/docs">문서 보기</Link>
 * <Link href="/pricing" color="primary" hoverOnly>가격</Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({
  color,
  hoverOnly = false,
  as: Component = 'a',
  className,
  children,
  ...props
}, ref) => (
  <Component
    ref={ref}
    className={cx('link', color && COLOR[color], hoverOnly && 'link-hover', className)}
    {...props}
  >
    {children}
  </Component>
));

Link.displayName = 'Link';

export default Link;
