import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, forwardRef } from 'react';
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
export const Tabs = forwardRef(({ items, activeKey, defaultActiveKey, variant = 'default', size = 'md', justified = false, onChange, className, navClassName, contentClassName }, ref) => {
    const [currentActiveKey, setCurrentActiveKey] = useState(activeKey || defaultActiveKey || items[0]?.key || '');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef = useRef(null);
    const isControlled = activeKey !== undefined;
    // 제어 컴포넌트에서 activeKey가 변경되면 상태 업데이트
    useEffect(() => {
        if (isControlled && activeKey) {
            setCurrentActiveKey(activeKey);
        }
    }, [activeKey, isControlled]);
    // 인디케이터 위치 업데이트
    useEffect(() => {
        updateIndicator();
    }, [currentActiveKey, variant]);
    const updateIndicator = () => {
        if (!navRef.current)
            return;
        const activeButton = navRef.current.querySelector(`[data-tab-key="${currentActiveKey}"]`);
        if (!activeButton)
            return;
        const navRect = navRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        if (variant === 'vertical') {
            setIndicatorStyle({
                top: buttonRect.top - navRect.top,
                height: buttonRect.height
            });
        }
        else {
            setIndicatorStyle({
                left: buttonRect.left - navRect.left,
                width: buttonRect.width
            });
        }
    };
    const handleTabChange = (key) => {
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
    return (_jsxs("div", { ref: ref, className: tabsClasses, children: [_jsx(TabNav, { ref: navRef, items: items, activeKey: currentActiveKey, variant: variant, size: size, justified: justified, onTabClick: handleTabChange, className: navClassName }), _jsx("div", { className: "tabs__indicator", style: indicatorStyle }), _jsx("div", { className: `tabs__content ${contentClassName || ''}`, children: items.map(item => (_jsx(TabPanel, { tabKey: item.key, activeKey: currentActiveKey, children: item.content }, item.key))) })] }));
});
Tabs.displayName = 'Tabs';
/**
 * TabNav 컴포넌트 - 탭 네비게이션
 */
export const TabNav = forwardRef(({ items, activeKey, variant = 'default', size = 'md', justified = false, onTabClick, className }, ref) => {
    const navClasses = [
        'tabs__nav',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: navClasses, role: "tablist", children: items.map(item => (_jsxs("button", { type: "button", className: `tabs__button ${activeKey === item.key ? 'tabs__button--active' : ''}`, role: "tab", "aria-selected": activeKey === item.key, "aria-controls": `panel-${item.key}`, disabled: item.disabled, "data-tab-key": item.key, onClick: () => !item.disabled && onTabClick?.(item.key), children: [item.icon && (_jsxs("span", { className: "tabs__button-icon", children: [item.icon, _jsx("span", { children: item.label })] })), !item.icon && item.label, item.badge && (_jsx("span", { className: "tabs__button-badge", children: item.badge }))] }, item.key))) }));
});
TabNav.displayName = 'TabNav';
/**
 * TabPanel 컴포넌트 - 탭 내용 패널
 */
export const TabPanel = forwardRef(({ tabKey, activeKey, children, className }, ref) => {
    const isActive = tabKey === activeKey;
    const panelClasses = [
        'tabs__panel',
        isActive ? 'tabs__panel--active' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, id: `panel-${tabKey}`, className: panelClasses, role: "tabpanel", "aria-labelledby": `tab-${tabKey}`, hidden: !isActive, children: children }));
});
TabPanel.displayName = 'TabPanel';
// Compound Component 패턴
Tabs.Nav = TabNav;
Tabs.Panel = TabPanel;
export default Tabs;
//# sourceMappingURL=Tabs.js.map