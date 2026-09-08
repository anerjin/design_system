import React, { forwardRef } from 'react';
import { cx } from './utils';

export type FooterDirection = 'vertical' | 'horizontal';

const DIRECTION: Record<FooterDirection, string> = {
  vertical: 'footer-vertical',
  horizontal: 'footer-horizontal',
};

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 열 배치 방향
   * @default 'horizontal'
   */
  direction?: FooterDirection;

  /**
   * 가운데 정렬 (저작권 한 줄짜리 푸터에 쓴다)
   * @default false
   */
  center?: boolean;

  children: React.ReactNode;
}

export interface FooterTitleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * DOI INC Footer — daisyUI `footer` 기반
 *
 * @example
 * ```tsx
 * <Footer className="bg-neutral text-neutral-content p-10">
 *   <nav>
 *     <Footer.Title>서비스</Footer.Title>
 *     <a className="link link-hover">브랜딩</a>
 *     <a className="link link-hover">디자인</a>
 *   </nav>
 * </Footer>
 * ```
 */
const Footer = forwardRef<HTMLElement, FooterProps>(({
  direction = 'horizontal',
  center = false,
  className,
  children,
  ...props
}, ref) => (
  <footer
    ref={ref}
    className={cx('footer', DIRECTION[direction], center && 'footer-center', className)}
    {...props}
  >
    {children}
  </footer>
));

Footer.displayName = 'Footer';

/** Footer.Title — 각 열의 제목 */
export const FooterTitle = forwardRef<HTMLElement, FooterTitleProps>(({
  className,
  children,
  ...props
}, ref) => (
  <h6 ref={ref as React.Ref<HTMLHeadingElement>} className={cx('footer-title', className)} {...props}>
    {children}
  </h6>
));

FooterTitle.displayName = 'FooterTitle';

export interface FooterComponent
  extends React.ForwardRefExoticComponent<FooterProps & React.RefAttributes<HTMLElement>> {
  Title: typeof FooterTitle;
}

const FooterWithSubcomponents = Footer as FooterComponent;
FooterWithSubcomponents.Title = FooterTitle;

export { FooterWithSubcomponents as Footer };
export default FooterWithSubcomponents;
