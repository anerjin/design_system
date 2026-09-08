import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';

/** daisyUI breadcrumbs는 글자 크기로 스케일을 잡는다 */
const SIZE: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export interface BreadcrumbItem {
  /** 고유 식별자 */
  id: string;

  /** 표시할 텍스트 */
  label: React.ReactNode;

  /** 링크 주소. 없으면 텍스트로 렌더된다 */
  href?: string;

  /** 라벨 왼쪽 아이콘 */
  icon?: React.ReactNode;

  /** 클릭 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** 경로 아이템 목록. 마지막 항목이 현재 페이지로 표시된다 */
  items: BreadcrumbItem[];

  /**
   * 크기
   * @default 'sm'
   */
  size?: Size;
}

/**
 * DOI INC Breadcrumb — daisyUI `breadcrumbs` 기반
 *
 * 구분자는 daisyUI CSS가 그리므로 별도로 지정하지 않는다.
 * 항목이 넘치면 가로 스크롤되며, `className`으로 `max-w-*`를 주면 폭을 제한할 수 있다.
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { id: 'home', label: '홈', href: '/' },
 *     { id: 'products', label: '상품', href: '/products' },
 *     { id: 'laptop', label: '노트북' },
 *   ]}
 * />
 * ```
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items,
  size = 'sm',
  className,
  'aria-label': ariaLabel = '경로',
  ...props
}, ref) => (
  <nav
    ref={ref}
    aria-label={ariaLabel}
    className={cx('breadcrumbs', SIZE[size], className)}
    {...props}
  >
    <ul>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = (
          <>
            {item.icon}
            {item.label}
          </>
        );

        return (
          <li key={item.id} aria-current={isLast ? 'page' : undefined}>
            {item.href && !isLast
              ? <a href={item.href} onClick={item.onClick}>{content}</a>
              : content}
          </li>
        );
      })}
    </ul>
  </nav>
));

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
