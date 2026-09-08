import { Icon } from './Icon';
import React, { forwardRef, useRef } from 'react';
import { usePopupBounds } from './usePopupBounds';
import { cx, type Size } from './utils';

export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right';
export type DropdownAlign = 'start' | 'center' | 'end';

const PLACEMENT: Record<DropdownPlacement, string> = {
  top: 'dropdown-top',
  bottom: 'dropdown-bottom',
  left: 'dropdown-left',
  right: 'dropdown-right',
};

const ALIGN: Record<DropdownAlign, string> = {
  start: 'dropdown-start',
  center: 'dropdown-center',
  end: 'dropdown-end',
};

const MENU_SIZE: Record<Size, string> = {
  xs: 'menu-xs',
  sm: 'menu-sm',
  md: 'menu-md',
  lg: 'menu-lg',
  xl: 'menu-xl',
};

export interface DropdownItem {
  /** 고유 식별자 */
  key: string;

  /**
   * 항목 종류. `title`은 구획 제목, `divider`는 구분선이다.
   * @default 'item'
   */
  type?: 'item' | 'title' | 'divider';

  /** 표시할 내용 */
  label?: React.ReactNode;

  /** 라벨 왼쪽 아이콘 */
  icon?: React.ReactNode;

  /** 링크 주소. 주면 `<a href>`로 렌더된다 */
  href?: string;

  /** 비활성 여부 */
  disabled?: boolean;

  /** 선택된 항목으로 강조 */
  active?: boolean;

  /** 클릭 핸들러 */
  onClick?: () => void;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 트리거에 표시할 내용. `trigger`를 주면 무시된다 */
  label?: React.ReactNode;

  /** 트리거 전체를 직접 구성할 때 쓴다 */
  trigger?: React.ReactNode;

  /** 메뉴 항목 목록. 주지 않으면 `children`을 메뉴 내용으로 쓴다 */
  items?: DropdownItem[];

  /**
   * 메뉴가 열리는 방향
   * @default 'bottom'
   */
  placement?: DropdownPlacement;

  /** 트리거 기준 정렬 */
  align?: DropdownAlign;

  /**
   * 마우스를 올리면 열린다
   * @default false
   */
  hover?: boolean;

  /**
   * 항상 열어 둔다 (제어용)
   * @default false
   */
  open?: boolean;

  /**
   * 메뉴 크기
   * @default 'md'
   */
  size?: Size;

  /** 메뉴에 적용할 추가 클래스 (폭 조절 등) */
  menuClassName?: string;

  children?: React.ReactNode;
}

/** 항목을 고른 뒤 포커스를 풀어 메뉴를 닫는다 (daisyUI는 :focus-within으로 열림을 판단한다) */
function closeMenu() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
}

/**
 * DOI INC Dropdown — daisyUI `dropdown` + `menu` 기반
 *
 * daisyUI 드롭다운은 `:focus-within`으로 열림을 판단하므로 바깥 클릭 감지가 CSS로 해결된다.
 * 이전 구현에 있던 document 클릭 리스너와 폭 측정 로직은 사라졌다.
 *
 * 검색·다중 선택이 필요하면 이 컴포넌트가 아니라 `Select`를 쓴다.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="메뉴"
 *   items={[
 *     { key: 'profile', label: '프로필', icon: <Icon name="user-round" size="1em"  /> },
 *     { key: 'd1', type: 'divider' },
 *     { key: 'logout', label: '로그아웃', onClick: signOut },
 *   ]}
 * />
 * ```
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      label,
      trigger,
      items,
      placement = 'bottom',
      align,
      hover = false,
      open = false,
      size = 'md',
      className,
      menuClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const menuRef = useRef<HTMLUListElement>(null);
    usePopupBounds(menuRef, true, placement);
    return (
      <div
        ref={ref}
        className={cx(
          'dropdown',
          PLACEMENT[placement],
          align && ALIGN[align],
          hover && 'dropdown-hover',
          open && 'dropdown-open',
          className,
        )}
        {...props}
      >
        {trigger ?? (
          <div tabIndex={0} role="button" className="btn">
            {label}
            <Icon name="chevron-down" size="1em" />
          </div>
        )}

        <ul
          ref={menuRef}
          tabIndex={0}
          className={cx(
            'dropdown-content bricks-popup menu',
            MENU_SIZE[size],
            'bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm',
            menuClassName,
          )}
        >
          {items
            ? items.map((item) => {
                if (item.type === 'divider') {
                  return <li key={item.key} className="my-1 border-t border-base-300" />;
                }
                if (item.type === 'title') {
                  return (
                    <li key={item.key} className="menu-title">
                      {item.label}
                    </li>
                  );
                }

                const content = (
                  <>
                    {item.icon}
                    {item.label}
                  </>
                );

                return (
                  <li key={item.key} className={cx(item.disabled && 'menu-disabled')}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cx(item.active && 'menu-active')}
                        onClick={() => {
                          item.onClick?.();
                          closeMenu();
                        }}
                      >
                        {content}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className={cx(item.active && 'menu-active')}
                        disabled={item.disabled}
                        onClick={() => {
                          item.onClick?.();
                          closeMenu();
                        }}
                      >
                        {content}
                      </button>
                    )}
                  </li>
                );
              })
            : children}
        </ul>
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
