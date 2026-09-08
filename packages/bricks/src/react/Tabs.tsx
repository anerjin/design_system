import React, { forwardRef, useEffect, useState } from 'react';
import { cx, type Size } from './utils';

export type TabsVariant = 'plain' | 'box' | 'border' | 'lift';
export type TabsPlacement = 'top' | 'bottom';

const VARIANT: Record<TabsVariant, string> = {
  plain: '',
  box: 'tabs-box',
  border: 'tabs-border',
  lift: 'tabs-lift',
};

const SIZE: Record<Size, string> = {
  xs: 'tabs-xs',
  sm: 'tabs-sm',
  md: 'tabs-md',
  lg: 'tabs-lg',
  xl: 'tabs-xl',
};

const PLACEMENT: Record<TabsPlacement, string> = {
  top: 'tabs-top',
  bottom: 'tabs-bottom',
};

export interface TabItem {
  /** 탭 식별자 */
  key: string;

  /** 탭 라벨 */
  label: React.ReactNode;

  /** 탭 내용 */
  content: React.ReactNode;

  /** 비활성 여부 */
  disabled?: boolean;

  /** 라벨 왼쪽 아이콘 */
  icon?: React.ReactNode;

  /** 라벨 오른쪽 뱃지 */
  badge?: React.ReactNode;
}

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 탭 목록 */
  items: TabItem[];

  /** 활성 탭 키 (제어) */
  activeKey?: string;

  /** 처음 활성화될 탭 키 (비제어) */
  defaultActiveKey?: string;

  /**
   * 탭 외형
   * @default 'border'
   */
  variant?: TabsVariant;

  /**
   * 탭 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 탭 줄의 위치
   * @default 'top'
   */
  placement?: TabsPlacement;

  /**
   * 탭을 가로로 균등 분할한다
   * @default false
   */
  justified?: boolean;

  /** 탭이 바뀔 때 호출된다 */
  onChange?: (activeKey: string) => void;

  /** 탭 줄에 적용할 추가 클래스 */
  navClassName?: string;

  /** 내용 영역에 적용할 추가 클래스 */
  contentClassName?: string;
}

/**
 * DOI INC Tabs — daisyUI `tabs` 기반
 *
 * 이전 구현은 활성 탭 위치를 `getBoundingClientRect()`로 재서 인디케이터를 움직였다.
 * daisyUI는 이걸 CSS로 처리하므로 측정 코드와 resize 리스너가 모두 사라졌다.
 *
 * @example
 * ```tsx
 * <Tabs
 *   variant="box"
 *   items={[
 *     { key: 'a', label: '개요', content: <p>개요 내용</p> },
 *     { key: 'b', label: '설정', content: <p>설정 내용</p> },
 *   ]}
 * />
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  items,
  activeKey,
  defaultActiveKey,
  variant = 'border',
  size = 'md',
  placement = 'top',
  justified = false,
  onChange,
  className,
  navClassName,
  contentClassName,
  ...props
}, ref) => {
  const isControlled = activeKey !== undefined;
  const [currentKey, setCurrentKey] = useState(
    activeKey ?? defaultActiveKey ?? items[0]?.key ?? '',
  );

  useEffect(() => {
    if (isControlled && activeKey) setCurrentKey(activeKey);
  }, [activeKey, isControlled]);

  const select = (key: string) => {
    if (!isControlled) setCurrentKey(key);
    onChange?.(key);
  };

  const nav = (
    <div
      role="tablist"
      className={cx(
        'tabs',
        VARIANT[variant],
        SIZE[size],
        PLACEMENT[placement],
        justified && 'w-full [&>*]:flex-1',
        navClassName,
      )}
    >
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          role="tab"
          id={`tab-${item.key}`}
          aria-selected={currentKey === item.key}
          aria-controls={`tabpanel-${item.key}`}
          disabled={item.disabled}
          className={cx(
            'tab',
            currentKey === item.key && 'tab-active',
            item.disabled && 'tab-disabled',
          )}
          onClick={() => !item.disabled && select(item.key)}
        >
          {item.icon && <span className="me-1.5">{item.icon}</span>}
          {item.label}
          {item.badge && <span className="ms-1.5">{item.badge}</span>}
        </button>
      ))}
    </div>
  );

  const panels = (
    <div className={cx('py-4', contentClassName)}>
      {items.map((item) => (
        <div
          key={item.key}
          id={`tabpanel-${item.key}`}
          role="tabpanel"
          aria-labelledby={`tab-${item.key}`}
          hidden={currentKey !== item.key}
        >
          {item.content}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={className} {...props}>
      {placement === 'bottom' ? <>{panels}{nav}</> : <>{nav}{panels}</>}
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
