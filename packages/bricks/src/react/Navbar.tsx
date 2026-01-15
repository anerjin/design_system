import React, { forwardRef, useState, useRef, useEffect } from 'react';

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
export const Navbar = forwardRef<HTMLElement, NavbarProps>(({
  items,
  brand,
  brandHref = '/',
  variant = 'default',
  fixed = false,
  sticky = false,
  shadow = true,
  showMobileMenu = true,
  rightContent,
  align = 'left',
  className,
  mobileBreakpoint = 768,
  onMobileMenuToggle,
  ...props
}, ref) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navbarClasses = [
    'navbar',
    variant !== 'default' ? `navbar--${variant}` : '',
    fixed ? (fixed === 'top' ? 'navbar--fixed' : `navbar--fixed-${fixed}`) : '',
    sticky ? 'navbar--sticky' : '',
    shadow ? 'navbar--shadow' : '',
    mobileMenuOpen ? 'navbar--mobile-open' : '',
    className
  ].filter(Boolean).join(' ');

  const navMenuClasses = [
    'navbar__menu',
    `navbar__menu--${align}`
  ].filter(Boolean).join(' ');

  const handleMobileMenuToggle = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    onMobileMenuToggle?.(newState);
  };

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(prev => prev === itemId ? null : itemId);
  };

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isDropdownOpen = activeDropdown === item.id;

    if (!hasChildren) {
      // Simple link item
      const linkClasses = [
        'navbar__link',
        item.active ? 'navbar__link--active' : '',
        item.disabled ? 'navbar__link--disabled' : ''
      ].filter(Boolean).join(' ');

      return (
        <li key={item.id}>
          <a
            href={item.href || '#'}
            className={linkClasses}
            onClick={item.onClick}
            aria-disabled={item.disabled}
          >
            {item.icon && <span className="navbar__link-icon">{item.icon}</span>}
            <span className="navbar__link-label">{item.label}</span>
          </a>
        </li>
      );
    }

    // Dropdown item
    return (
      <li key={item.id} className="navbar__dropdown">
        <button
          type="button"
          className={[
            'navbar__dropdown-toggle',
            item.active ? 'navbar__dropdown-toggle--active' : '',
            item.disabled ? 'navbar__dropdown-toggle--disabled' : ''
          ].filter(Boolean).join(' ')}
          onClick={(e) => {
            if (!item.disabled) {
              handleDropdownToggle(item.id);
            }
            item.onClick?.(e);
          }}
          disabled={item.disabled}
          aria-expanded={isDropdownOpen}
          aria-haspopup="menu"
        >
          {item.icon && <span className="navbar__dropdown-icon">{item.icon}</span>}
          <span className="navbar__dropdown-label">{item.label}</span>
          <i className="bx bx-chevron-down navbar__dropdown-arrow" />
        </button>

        {!item.disabled && item.children && (
          <div className={`navbar__dropdown-menu ${isDropdownOpen ? 'navbar__dropdown-menu--open' : ''}`}>
          {item.children.map(child => (
            <a
              key={child.id}
              href={child.href || '#'}
              className={[
                'navbar__dropdown-item',
                child.active ? 'navbar__dropdown-item--active' : '',
                child.disabled ? 'navbar__dropdown-item--disabled' : ''
              ].filter(Boolean).join(' ')}
              onClick={child.disabled ? (e) => e.preventDefault() : child.onClick}
              aria-disabled={child.disabled}
            >
              {child.icon && <span className="navbar__dropdown-item-icon">{child.icon}</span>}
              <span className="navbar__dropdown-item-label">{child.label}</span>
            </a>
          ))}
          {/* Divider example (can be added as needed) */}
          {/* <div className="navbar__dropdown-divider" /> */}
        </div>
        )}
      </li>
    );
  };

  // Check if mobile based on viewport width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mobileBreakpoint]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <nav ref={ref} className={navbarClasses} {...props}>
      <div className="navbar__container">
        {brand && (
          <a href={brandHref} className="navbar__brand">
            {brand}
          </a>
        )}

        {showMobileMenu && isMobile && (
          <button
            type="button"
            className="navbar__toggle"
            onClick={handleMobileMenuToggle}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`} style={{ fontSize: '24px' }} />
          </button>
        )}

        <ul className={navMenuClasses}>
          {items.map(item => renderNavItem(item))}
        </ul>

        {rightContent && (
          <div className="navbar__actions">
            {rightContent}
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;