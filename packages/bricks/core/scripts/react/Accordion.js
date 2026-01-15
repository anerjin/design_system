import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Accordion 컴포넌트
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     {
 *       id: 'item1',
 *       title: 'Section 1',
 *       content: 'Content for section 1'
 *     },
 *     {
 *       id: 'item2',
 *       title: 'Section 2',
 *       content: 'Content for section 2'
 *     }
 *   ]}
 *   defaultActiveIds={['item1']}
 *   exclusive
 * />
 * ```
 */
export const Accordion = forwardRef(({ items, defaultActiveIds = [], activeIds, exclusive = false, variant = 'default', color, size = 'md', iconPosition = 'right', onChange, className, openIcon, closeIcon, ...props }, ref) => {
    const [openItems, setOpenItems] = useState(activeIds || defaultActiveIds);
    const isControlled = activeIds !== undefined;
    const contentRefs = useRef({});
    useEffect(() => {
        if (isControlled && activeIds) {
            setOpenItems(activeIds);
        }
    }, [activeIds, isControlled]);
    const handleToggle = (itemId) => {
        let newOpenItems;
        if (exclusive) {
            newOpenItems = openItems.includes(itemId) ? [] : [itemId];
        }
        else {
            newOpenItems = openItems.includes(itemId)
                ? openItems.filter(id => id !== itemId)
                : [...openItems, itemId];
        }
        if (!isControlled) {
            setOpenItems(newOpenItems);
        }
        onChange?.(newOpenItems);
    };
    const accordionClasses = [
        'accordion',
        variant === 'flush' ? 'accordion--flush' : '',
        color ? `accordion--${color}` : '',
        size !== 'md' ? `accordion--${size}` : '',
        iconPosition === 'left' ? 'accordion--icon-left' : '',
        className
    ].filter(Boolean).join(' ');
    const defaultChevron = (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }) }));
    return (_jsx("div", { ref: ref, className: accordionClasses, ...props, children: items.map((item) => {
            const isOpen = openItems.includes(item.id);
            return (_jsxs("div", { className: "accordion__item", children: [_jsxs("button", { type: "button", className: `accordion__header ${isOpen ? 'accordion__header--active' : ''}`, onClick: () => !item.disabled && handleToggle(item.id), disabled: item.disabled, "aria-expanded": isOpen, "aria-controls": `accordion-content-${item.id}`, children: [_jsx("span", { children: item.title }), _jsx("span", { className: "accordion__icon", children: isOpen
                                    ? (openIcon || defaultChevron)
                                    : (closeIcon || defaultChevron) })] }), _jsx("div", { id: `accordion-content-${item.id}`, className: `accordion__content ${isOpen ? 'accordion__content--open' : ''}`, ref: el => { if (el)
                            contentRefs.current[item.id] = el; }, "aria-hidden": !isOpen, children: _jsx("div", { className: "accordion__body", children: item.content }) })] }, item.id));
        }) }));
});
Accordion.displayName = 'Accordion';
export default Accordion;
//# sourceMappingURL=Accordion.js.map