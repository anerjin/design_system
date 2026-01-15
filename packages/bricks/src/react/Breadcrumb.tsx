import React, { forwardRef } from 'react';

export interface BreadcrumbItem {
  /**
   * 고유 식별자
   */
  id: string;

  /**
   * 표시할 텍스트
   */
  label: React.ReactNode;

  /**
   * 링크 URL
   */
  href?: string;

  /**
   * 아이콘
   */
  icon?: React.ReactNode;

  /**
   * 활성 상태 (현재 페이지)
   */
  active?: boolean;

  /**
   * 클릭 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BreadcrumbProps {
  /**
   * Breadcrumb 아이템 목록
   */
  items: BreadcrumbItem[];

  /**
   * 구분자 스타일
   * @default 'slash'
   */
  separator?: 'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe';

  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 배경 표시 여부
   * @default false
   */
  background?: boolean;

  /**
   * 다크 테마
   * @default false
   */
  dark?: boolean;

  /**
   * 긴 텍스트 자르기
   * @default false
   */
  truncate?: boolean;

  /**
   * 모바일 반응형
   * @default false
   */
  responsive?: boolean;

  /**
   * 홈 아이콘 (첫 번째 아이템에 적용)
   */
  homeIcon?: React.ReactNode;

  /**
   * 커스텀 구분자
   */
  customSeparator?: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * aria-label
   */
  'aria-label'?: string;
}

/**
 * BRICKS 디자인 시스템 Breadcrumb 컴포넌트
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'products', label: 'Products', href: '/products' },
 *     { id: 'category', label: 'Electronics', href: '/products/electronics' },
 *     { id: 'product', label: 'Laptop', active: true }
 *   ]}
 *   separator="chevron"
 * />
 * ```
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(({
  items,
  separator = 'slash',
  size = 'md',
  background = false,
  dark = false,
  truncate = false,
  responsive = false,
  homeIcon,
  customSeparator,
  className,
  'aria-label': ariaLabel = 'Breadcrumb navigation',
  ...props
}, ref) => {
  const breadcrumbClasses = [
    'breadcrumb',
    separator !== 'slash' ? `breadcrumb--${separator}` : '',
    size !== 'md' ? `breadcrumb--${size}` : '',
    background ? 'breadcrumb--bg' : '',
    dark ? 'breadcrumb--dark' : '',
    truncate ? 'breadcrumb--truncate' : '',
    responsive ? 'breadcrumb--responsive' : '',
    className
  ].filter(Boolean).join(' ');

  const defaultHomeIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
    </svg>
  );

  const renderItem = (item: BreadcrumbItem, index: number) => {
    const isFirst = index === 0;
    const isLast = index === items.length - 1;
    const showIcon = isFirst && (homeIcon || item.icon);

    const content = (
      <>
        {showIcon && (
          <span className="breadcrumb__icon">
            {homeIcon || item.icon || defaultHomeIcon}
          </span>
        )}
        {(!isFirst || !homeIcon || item.label) && item.label}
      </>
    );

    if (item.href && !item.active) {
      return (
        <a
          href={item.href}
          className="breadcrumb__link"
          onClick={item.onClick}
          aria-current={isLast ? 'page' : undefined}
        >
          {content}
        </a>
      );
    }

    return (
      <span
        className="breadcrumb__link"
        aria-current={isLast ? 'page' : undefined}
      >
        {content}
      </span>
    );
  };

  return (
    <nav ref={ref} aria-label={ariaLabel} {...props}>
      <ol className={breadcrumbClasses}>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`breadcrumb__item ${item.active ? 'breadcrumb__item--active' : ''}`}
          >
            {customSeparator && index > 0 && (
              <span className="breadcrumb__separator" aria-hidden="true">
                {customSeparator}
              </span>
            )}
            {renderItem(item, index)}
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;