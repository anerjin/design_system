import React from 'react';
export interface NavItem {
    /**
     * 고유 식별자
     */
    id: string;
    /**
     * 표시할 레이블
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
     * 서브 메뉴
     */
    children?: NavItem[];
    /**
     * 활성 상태
     */
    active?: boolean;
    /**
     * 비활성화 상태
     */
    disabled?: boolean;
    /**
     * 클릭 핸들러
     */
    onClick?: (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}
export interface NavbarProps {
    /**
     * 네비게이션 아이템
     */
    items: NavItem[];
    /**
     * 로고/브랜드
     */
    brand?: React.ReactNode;
    /**
     * 브랜드 링크
     */
    brandHref?: string;
    /**
     * 네비게이션 바 스타일
     * @default 'default'
     */
    variant?: 'default' | 'dark' | 'light' | 'transparent';
    /**
     * 고정 위치
     * @default 'top'
     */
    fixed?: 'top' | 'bottom' | false;
    /**
     * 스티키 여부
     * @default false
     */
    sticky?: boolean;
    /**
     * 그림자
     * @default true
     */
    shadow?: boolean;
    /**
     * 모바일 메뉴 버튼 표시
     * @default true
     */
    showMobileMenu?: boolean;
    /**
     * 우측 컨텐츠 영역
     */
    rightContent?: React.ReactNode;
    /**
     * 메뉴 정렬
     * @default 'left'
     */
    align?: 'left' | 'center' | 'right';
    /**
     * 추가 CSS 클래스
     */
    className?: string;
    /**
     * 모바일 브레이크포인트
     * @default 768
     */
    mobileBreakpoint?: number;
    /**
     * 모바일 메뉴 열림 상태 변경 핸들러
     */
    onMobileMenuToggle?: (isOpen: boolean) => void;
}
/**
 * BRICKS 디자인 시스템 Navbar 컴포넌트
 *
 * @example
 * ```tsx
 * <Navbar
 *   brand="BRICKS"
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'about', label: 'About', href: '/about' },
 *     { id: 'services', label: 'Services', href: '/services' }
 *   ]}
 * />
 * ```
 */
export declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLElement>>;
export default Navbar;
//# sourceMappingURL=Navbar.d.ts.map