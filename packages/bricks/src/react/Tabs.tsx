import React, { useState, useEffect, useRef, forwardRef } from 'react';

export interface TabItem {
  /**
   * 탭 식별자
   */
  key: string;

  /**
   * 탭 레이블
   */
  label: React.ReactNode;

  /**
   * 탭 내용
   */
  content: React.ReactNode;

  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 아이콘
   */
  icon?: React.ReactNode;

  /**
   * 뱃지
   */
  badge?: React.ReactNode;
}

export interface TabsProps {
  /**
   * 탭 목록
   */
  items: TabItem[];

  /**
   * 활성 탭 키
   */
  activeKey?: string;

  /**
   * 기본 활성 탭 키
   */
  defaultActiveKey?: string;

  /**
   * 탭 스타일
   * @default 'default'
   */
  variant?: 'default' | 'pills' | 'vertical';

  /**
   * 탭 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 균등 분할
   * @default false
   */
  justified?: boolean;

  /**
   * 탭 변경 이벤트
   */
  onChange?: (activeKey: string) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 탭 네비게이션 추가 CSS 클래스
   */
  navClassName?: string;

  /**
   * 탭 내용 추가 CSS 클래스
   */
  contentClassName?: string;
}

export interface TabNavProps {
  /**
   * 탭 목록
   */
  items: TabItem[];

  /**
   * 활성 탭 키
   */
  activeKey: string;

  /**
   * 탭 스타일
   */
  variant?: 'default' | 'pills' | 'vertical';

  /**
   * 탭 크기
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 균등 분할
   */
  justified?: boolean;

  /**
   * 탭 클릭 이벤트
   */
  onTabClick?: (key: string) => void;

  /**
   * 추가 CSS 클래스
   */
  className?: string;

  /**
   * 인디케이터 스타일
   */
  indicatorStyle?: React.CSSProperties;
}

export interface TabPanelProps {
  /**
   * 패널 키
   */
  tabKey: string;

  /**
   * 활성 탭 키
   */
  activeKey: string;

  /**
   * 패널 내용
   */
  children: React.ReactNode;

  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

/**
 * BRICKS 디자인 시스템 Tabs 컴포넌트
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     {
 *       key: 'tab1',
 *       label: '첫 번째 탭',
 *       content: <div>첫 번째 탭 내용</div>,
 *       icon: <HomeIcon />
 *     },
 *     {
 *       key: 'tab2',
 *       label: '두 번째 탭',
 *       content: <div>두 번째 탭 내용</div>,
 *       badge: <Badge>3</Badge>
 *     }
 *   ]}
 *   activeKey={activeTab}
 *   onChange={setActiveTab}
 *   variant="pills"
 * />
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  items,
  activeKey,
  defaultActiveKey,
  variant = 'default',
  size = 'md',
  justified = false,
  onChange,
  className,
  navClassName,
  contentClassName
}, ref) => {
  const [currentActiveKey, setCurrentActiveKey] = useState(
    activeKey || defaultActiveKey || items[0]?.key || ''
  );
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const isControlled = activeKey !== undefined;

  // 제어 컴포넌트에서 activeKey가 변경되면 상태 업데이트
  useEffect(() => {
    if (isControlled && activeKey) {
      setCurrentActiveKey(activeKey);
    }
  }, [activeKey, isControlled]);

  // 인디케이터 위치 업데이트
  useEffect(() => {
    const timer = setTimeout(() => {
      updateIndicator();
    }, 0);
    return () => clearTimeout(timer);
  }, [currentActiveKey, variant]);

  const updateIndicator = () => {
    if (!navRef.current) return;

    const activeButton = navRef.current.querySelector(
      `[data-tab-key="${currentActiveKey}"]`
    ) as HTMLElement;

    if (!activeButton) return;

    const navRect = navRef.current.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    if (variant === 'vertical') {
      setIndicatorStyle({
        top: buttonRect.top - navRect.top,
        height: buttonRect.height
      });
    } else {
      setIndicatorStyle({
        left: buttonRect.left - navRect.left,
        width: buttonRect.width
      });
    }
  };

  // 윈도우 리사이즈 시 인디케이터 위치 재계산
  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentActiveKey, variant]);

  const handleTabChange = (key: string) => {
    if (!isControlled) {
      setCurrentActiveKey(key);
    }
    onChange?.(key);
  };

  const tabsClasses = [
    'tabs',
    variant !== 'default' ? `tabs--${variant}` : '',
    size !== 'md' ? `tabs--${size}` : '',
    justified ? 'tabs--justified' : '',
    className
  ].filter(Boolean).join(' ');

  const activeItem = items.find(item => item.key === currentActiveKey);

  return (
    <div ref={ref} className={tabsClasses}>
      <TabNav
        ref={navRef}
        items={items}
        activeKey={currentActiveKey}
        variant={variant}
        size={size}
        justified={justified}
        onTabClick={handleTabChange}
        className={navClassName}
        indicatorStyle={indicatorStyle}
      />

      <div className={`tabs__content ${contentClassName || ''}`}>
        {items.map(item => (
          <TabPanel
            key={item.key}
            tabKey={item.key}
            activeKey={currentActiveKey}
          >
            {item.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

/**
 * TabNav 컴포넌트 - 탭 네비게이션
 */
export const TabNav = forwardRef<HTMLDivElement, TabNavProps>(({
  items,
  activeKey,
  variant = 'default',
  size = 'md',
  justified = false,
  onTabClick,
  className,
  indicatorStyle
}, ref) => {
  const navClasses = [
    'tabs__nav',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={navClasses} role="tablist">
      {items.map(item => (
        <button
          key={item.key}
          type="button"
          className={`tabs__button ${activeKey === item.key ? 'tabs__button--active' : ''}`}
          role="tab"
          aria-selected={activeKey === item.key}
          aria-controls={`panel-${item.key}`}
          disabled={item.disabled}
          data-tab-key={item.key}
          onClick={() => !item.disabled && onTabClick?.(item.key)}
        >
          {item.icon && (
            <span className="tabs__button-icon">
              {item.icon}
              <span>{item.label}</span>
            </span>
          )}
          {!item.icon && item.label}
          {item.badge && (
            <span className="tabs__button-badge">
              {item.badge}
            </span>
          )}
        </button>
      ))}
      <div className="tabs__indicator" style={indicatorStyle} />
    </div>
  );
});

TabNav.displayName = 'TabNav';

/**
 * TabPanel 컴포넌트 - 탭 내용 패널
 */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(({
  tabKey,
  activeKey,
  children,
  className
}, ref) => {
  const isActive = tabKey === activeKey;

  const panelClasses = [
    'tabs__panel',
    isActive ? 'tabs__panel--active' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      id={`panel-${tabKey}`}
      className={panelClasses}
      role="tabpanel"
      aria-labelledby={`tab-${tabKey}`}
      hidden={!isActive}
    >
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';

// Compound Component 패턴을 위한 타입 확장
export const TabsComponent = Object.assign(Tabs, {
  Nav: TabNav,
  Panel: TabPanel
});

export default Tabs;