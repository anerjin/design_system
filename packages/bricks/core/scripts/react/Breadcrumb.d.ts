import React from 'react';
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
export declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.d.ts.map