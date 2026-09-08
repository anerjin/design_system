import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';

export type MenuDirection = 'vertical' | 'horizontal';

const DIRECTION: Record<MenuDirection, string> = {
  vertical: 'menu-vertical',
  horizontal: 'menu-horizontal',
};

const SIZE: Record<Size, string> = {
  xs: 'menu-xs',
  sm: 'menu-sm',
  md: 'menu-md',
  lg: 'menu-lg',
  xl: 'menu-xl',
};

export interface MenuItem {
  /** 고유 식별자 */
  id: string;

  /**
   * 항목 종류. `title`은 구획 제목이다.
   * @default 'item'
   */
  type?: 'item' | 'title';

  /** 표시할 내용 */
  label: React.ReactNode;

  /** 라벨 왼쪽 아이콘 */
  icon?: React.ReactNode;

  /** 라벨 오른쪽에 붙일 내용 (뱃지 등) */
  trailing?: React.ReactNode;

  /** 링크 주소 */
  href?: string;

  /** 하위 항목. 주면 접을 수 있는 묶음이 된다 */
  children?: MenuItem[];

  /** 하위 항목을 처음부터 펼쳐 둔다 */
  defaultOpen?: boolean;

  /** 현재 위치로 강조 */
  active?: boolean;

  /** 비활성 여부 */
  disabled?: boolean;

  /** 클릭 핸들러 */
  onClick?: () => void;
}

// `title`은 HTML의 툴팁 속성과 이름이 겹치므로 걷어내고 새로 정의한다
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'title'> {
  /** 항목 목록. 주지 않으면 `children`을 그대로 렌더한다 */
  items?: MenuItem[];

  /**
   * 배치 방향
   * @default 'vertical'
   */
  direction?: MenuDirection;

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /** 목록 맨 위 제목 */
  title?: React.ReactNode;

  children?: React.ReactNode;
}

function renderItem(item: MenuItem): React.ReactNode {
  if (item.type === 'title') {
    return (
      <li key={item.id} className="menu-title">
        {item.label}
      </li>
    );
  }

  const body = (
    <>
      {item.icon && (
        <span className="bricks-menu-icon" aria-hidden="true">
          {item.icon}
        </span>
      )}
      <span className="bricks-menu-label">{item.label}</span>
      {item.trailing && <span className="bricks-menu-trailing">{item.trailing}</span>}
    </>
  );

  if (item.children?.length) {
    return (
      <li key={item.id} className={cx(item.disabled && 'menu-disabled')}>
        <details open={item.defaultOpen}>
          <summary
            className={cx(item.active && 'menu-active')}
            aria-disabled={item.disabled || undefined}
            tabIndex={item.disabled ? -1 : undefined}
            onClick={(event) => {
              if (item.disabled) event.preventDefault();
            }}
          >
            {body}
          </summary>
          <ul>{item.children.map(renderItem)}</ul>
        </details>
      </li>
    );
  }

  return (
    <li key={item.id} className={cx(item.disabled && 'menu-disabled')}>
      {item.href ? (
        <a
          href={item.href}
          className={cx(item.active && 'menu-active')}
          aria-current={item.active ? 'page' : undefined}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.disabled ? -1 : undefined}
          onClick={(event) => {
            if (item.disabled) {
              event.preventDefault();
              return;
            }
            item.onClick?.();
          }}
        >
          {body}
        </a>
      ) : (
        <button
          type="button"
          className={cx(item.active && 'menu-active')}
          aria-current={item.active ? 'page' : undefined}
          disabled={item.disabled}
          onClick={item.onClick}
        >
          {body}
        </button>
      )}
    </li>
  );
}

/**
 * DOI INC Menu — daisyUI `menu` 기반
 *
 * 사이드바 · 드롭다운 · 가로 네비게이션에 두루 쓴다.
 * 하위 항목은 `<details>`로 접히므로 JS 없이 동작한다.
 *
 * @example
 * ```tsx
 * <Menu
 *   className="w-80"
 *   items={[
 *     { id: 'home', label: '홈', href: '#', active: true },
 *     { id: 'docs', label: '문서', defaultOpen: true, children: [
 *       { id: 'start', label: '시작하기', href: '#' },
 *     ] },
 *   ]}
 * />
 * ```
 */
export const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ items, direction = 'vertical', size = 'md', title, className, children, ...props }, ref) => (
    <ul ref={ref} className={cx('menu bricks-menu', DIRECTION[direction], SIZE[size], className)} {...props}>
      {title && <li className="menu-title">{title}</li>}
      {items ? items.map(renderItem) : children}
    </ul>
  ),
);

Menu.displayName = 'Menu';

export default Menu;
