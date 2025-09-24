import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
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
export const Breadcrumb = forwardRef(({ items, separator = 'slash', size = 'md', background = false, dark = false, truncate = false, responsive = false, homeIcon, customSeparator, className, 'aria-label': ariaLabel = 'Breadcrumb navigation', ...props }, ref) => {
    const breadcrumbClasses = [
        'breadcrumb',
        separator !== 'slash' ? `breadcrumb--${separator}` : '',
        size !== 'md' ? `breadcrumb--${size}` : '',
        background ? 'breadcrumb--bg' : '',
        dark ? 'breadcrumb--dark' : '',
        truncate ? 'breadcrumb--truncate' : '',
        responsive ? 'breadcrumb--responsive' : '',
        className
    ].filter(Boolean).join(' ');
    const defaultHomeIcon = (_jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", children: _jsx("path", { d: "M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" }) }));
    const renderItem = (item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const showIcon = isFirst && (homeIcon || item.icon);
        const content = (_jsxs(_Fragment, { children: [showIcon && (_jsx("span", { className: "breadcrumb__icon", children: homeIcon || item.icon || defaultHomeIcon })), (!isFirst || !homeIcon || item.label) && item.label] }));
        if (item.href && !item.active) {
            return (_jsx("a", { href: item.href, className: "breadcrumb__link", onClick: item.onClick, "aria-current": isLast ? 'page' : undefined, children: content }));
        }
        return (_jsx("span", { className: "breadcrumb__link", "aria-current": isLast ? 'page' : undefined, children: content }));
    };
    return (_jsx("nav", { ref: ref, "aria-label": ariaLabel, ...props, children: _jsx("ol", { className: breadcrumbClasses, children: items.map((item, index) => (_jsxs("li", { className: `breadcrumb__item ${item.active ? 'breadcrumb__item--active' : ''}`, children: [customSeparator && index > 0 && (_jsx("span", { className: "breadcrumb__separator", "aria-hidden": "true", children: customSeparator })), renderItem(item, index)] }, item.id))) }) }));
});
Breadcrumb.displayName = 'Breadcrumb';
export default Breadcrumb;
//# sourceMappingURL=Breadcrumb.js.map