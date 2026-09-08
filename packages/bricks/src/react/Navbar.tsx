import { Icon } from './Icon';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { cx } from './utils';

export type NavbarVariant = 'default' | 'ghost' | 'neutral' | 'primary';
export type NavbarPosition = 'static' | 'sticky' | 'fixed-top' | 'fixed-bottom';
export type NavbarAlign = 'start' | 'center' | 'end';

const VARIANT: Record<NavbarVariant, string> = {
  default: 'bg-base-100',
  ghost: '',
  neutral: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
};

const POSITION: Record<NavbarPosition, string> = {
  static: '',
  sticky: 'sticky top-0 z-30',
  'fixed-top': 'fixed top-0 left-0 right-0 z-30',
  'fixed-bottom': 'fixed bottom-0 left-0 right-0 z-30',
};

export interface NavItem {
  /** 고유 식별자 */
  id: string;

  /** 표시할 라벨 */
  label: React.ReactNode;

  /** 링크 주소 */
  href?: string;

  /** 라벨 왼쪽 아이콘 */
  icon?: React.ReactNode;

  /** 하위 메뉴 */
  children?: NavItem[];

  /** 현재 위치로 강조 */
  active?: boolean;

  /** 비활성 여부 */
  disabled?: boolean;

  /** 클릭 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** 네비게이션 항목 */
  items?: NavItem[];

  /** 로고 / 서비스명 */
  brand?: React.ReactNode;

  /** 브랜드 링크 주소 */
  brandHref?: string;

  /**
   * 배경 스타일
   * @default 'default'
   */
  variant?: NavbarVariant;

  /**
   * 화면에 붙는 방식
   * @default 'static'
   */
  position?: NavbarPosition;

  /**
   * 그림자
   * @default true
   */
  shadow?: boolean;

  /**
   * 메뉴가 놓일 구획
   * @default 'center'
   */
  align?: NavbarAlign;

  /** 오른쪽 영역 (버튼·아바타 등) */
  actions?: React.ReactNode;

  /**
   * Navbar의 실제 너비에 메뉴가 들어가지 않으면 햄버거 메뉴로 전환한다.
   * false이면 좁은 영역에서 메뉴를 다음 줄에 배치한다.
   * @default true
   */
  collapsible?: boolean;
}

/** Portals keep submenus outside sticky/scrolling navigation containers. */
function NavbarPopup({ children, nested = false }: { children: React.ReactNode; nested?: boolean }) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="doi-navbar-positioner"
        side={nested ? 'right' : 'bottom'}
        align="start"
        sideOffset={nested ? 4 : 8}
        collisionPadding={8}
      >
        <MenuPrimitive.Popup className="doi-navbar-popup">{children}</MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function PopupItem({ item }: { item: NavItem }) {
  if (item.children?.length) {
    return (
      <MenuPrimitive.SubmenuRoot>
        <MenuPrimitive.SubmenuTrigger className="doi-navbar-popup-item" disabled={item.disabled}>
          {item.icon}
          <span>{item.label}</span>
          <Icon name="chevron-right" size={14} className="ms-auto" />
        </MenuPrimitive.SubmenuTrigger>
        <NavbarPopup nested>
          {item.children.map((child) => (
            <PopupItem key={child.id} item={child} />
          ))}
        </NavbarPopup>
      </MenuPrimitive.SubmenuRoot>
    );
  }
  return (
    <MenuPrimitive.Item
      className="doi-navbar-popup-item"
      disabled={item.disabled}
      render={
        <a
          href={item.disabled ? undefined : item.href}
          aria-current={item.active ? 'page' : undefined}
          onClick={item.onClick}
        />
      }
    >
      {item.icon}
      <span>{item.label}</span>
    </MenuPrimitive.Item>
  );
}

function NavbarMenu({
  items,
  label,
  icon,
  disabled,
  active,
  compact,
  mobile = false,
}: {
  items: NavItem[];
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  compact: boolean;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [compact]);
  return (
    <MenuPrimitive.Root open={open} onOpenChange={setOpen} modal={false}>
      <MenuPrimitive.Trigger
        className={cx('doi-navbar-link', mobile && 'doi-navbar-toggle')}
        disabled={disabled}
        aria-label={mobile ? '메뉴 열기' : undefined}
        data-active={active || undefined}
      >
        {icon}
        {label}
        {!mobile && <Icon name="chevron-down" size={14} />}
      </MenuPrimitive.Trigger>
      <NavbarPopup>
        {items.map((item) => (
          <PopupItem key={item.id} item={item} />
        ))}
      </NavbarPopup>
    </MenuPrimitive.Root>
  );
}

/**
 * DOI INC Navbar — daisyUI `navbar` + `menu` 기반
 *
 * 실제 컨테이너와 메뉴의 너비를 비교해 반응형으로 전환한다.
 * Base UI 메뉴가 포커스·키보드·중첩 메뉴·화면 경계 처리를 담당한다.
 *
 * @example
 * ```tsx
 * <Navbar
 *   brand="DOI INC"
 *   items={[
 *     { id: 'home', label: '홈', href: '/', active: true },
 *     { id: 'docs', label: '문서', children: [
 *       { id: 'start', label: '시작하기', href: '/start' },
 *     ] },
 *   ]}
 *   actions={<Button color="primary" size="sm">로그인</Button>}
 * />
 * ```
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      items = [],
      brand,
      brandHref = '#',
      variant = 'default',
      position = 'static',
      shadow = true,
      align = 'center',
      actions,
      collapsible = true,
      className,
      ...props
    },
    ref,
  ) => {
    const hasItems = items.length > 0;
    const rootRef = useRef<HTMLElement | null>(null);
    const brandRef = useRef<HTMLAnchorElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const [compact, setCompact] = useState(false);
    useEffect(() => {
      const root = rootRef.current;
      if (!root || !hasItems) {
        setCompact(false);
        return;
      }
      const measure = () => {
        const style = getComputedStyle(root);
        const available = root.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const brandWidth = brandRef.current?.scrollWidth ?? 0;
        const actionsWidth = actionsRef.current?.scrollWidth ?? 0;
        const menuWidth = menuRef.current?.scrollWidth ?? 0;
        const rails = align === 'center' ? 2 * Math.max(brandWidth, actionsWidth) : brandWidth + actionsWidth;
        setCompact(available < rails + menuWidth + 48);
      };
      const observer = new ResizeObserver(measure);
      [root, brandRef.current, actionsRef.current, menuRef.current].forEach(
        (el) => el && observer.observe(el),
      );
      measure();
      return () => observer.disconnect();
    }, [hasItems, align, brand, actions, items]);

    return (
      <nav
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cx(
          'navbar doi-navbar',
          VARIANT[variant],
          POSITION[position],
          shadow && 'shadow-sm',
          className,
        )}
        data-variant={variant}
        data-align={align}
        data-compact={compact || undefined}
        data-collapsible={collapsible}
        {...props}
      >
        <div className="doi-navbar-inner">
          <div className="doi-navbar-start">
            {collapsible && hasItems && (
              <NavbarMenu mobile items={items} label={<Icon name="menu" size={20} />} compact={compact} />
            )}

            {brand && (
              <a ref={brandRef} href={brandHref} className="doi-navbar-brand">
                {brand}
              </a>
            )}
          </div>

          {hasItems && (
            <div className="doi-navbar-desktop">
              <ul ref={menuRef} className="doi-navbar-menu">
                {items.map((item) => (
                  <li key={item.id}>
                    {item.children?.length ? (
                      <NavbarMenu
                        items={item.children}
                        label={item.label}
                        icon={item.icon}
                        active={item.active}
                        disabled={item.disabled}
                        compact={compact}
                      />
                    ) : (
                      <a
                        href={item.disabled ? undefined : item.href}
                        className="doi-navbar-link"
                        aria-current={item.active ? 'page' : undefined}
                        aria-disabled={item.disabled || undefined}
                        role={!item.href ? 'button' : undefined}
                        tabIndex={item.disabled ? -1 : !item.href ? 0 : undefined}
                        onKeyDown={(event) => {
                          if (!item.href && !item.disabled && (event.key === 'Enter' || event.key === ' ')) {
                            event.preventDefault();
                            event.currentTarget.click();
                          }
                        }}
                        onClick={(event) => {
                          if (item.disabled) event.preventDefault();
                          else item.onClick?.(event);
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div ref={actionsRef} className="doi-navbar-actions">
            {actions}
          </div>
        </div>
      </nav>
    );
  },
);

Navbar.displayName = 'Navbar';

export default Navbar;
