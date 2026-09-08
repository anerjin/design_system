import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';

const SIZE: Record<Size, string> = {
  xs: 'dock-xs',
  sm: 'dock-sm',
  md: 'dock-md',
  lg: 'dock-lg',
  xl: 'dock-xl',
};

export interface DockItem {
  /** 고유 식별자 */
  id: string;

  /** 아이콘 */
  icon: React.ReactNode;

  /** 아이콘 아래 글자 */
  label?: React.ReactNode;

  /** 현재 위치로 강조 */
  active?: boolean;

  /** 클릭 핸들러 */
  onClick?: () => void;
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 항목 목록 */
  items: DockItem[];

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;
}

/**
 * DOI INC Dock — daisyUI `dock` 기반
 *
 * 화면 아래에 고정되는 모바일용 탭바다. `position: fixed`가 이미 들어 있으므로
 * 본문 아래쪽에 그만큼 여백을 줘야 가려지지 않는다.
 *
 * @example
 * ```tsx
 * <Dock
 *   items={[
 *     { id: 'home', icon: <Icon name="house" size="1em"  />, label: '홈', active: true },
 *     { id: 'search', icon: <Icon name="search" size="1em"  />, label: '검색' },
 *   ]}
 * />
 * ```
 */
export const Dock = forwardRef<HTMLDivElement, DockProps>(({
  items,
  size = 'md',
  className,
  ...props
}, ref) => (
  <div ref={ref} className={cx('dock', SIZE[size], className)} {...props}>
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={cx(item.active && 'dock-active')}
        aria-current={item.active ? 'page' : undefined}
        onClick={item.onClick}
      >
        {item.icon}
        {item.label && <span className="dock-label">{item.label}</span>}
      </button>
    ))}
  </div>
));

Dock.displayName = 'Dock';

export default Dock;
