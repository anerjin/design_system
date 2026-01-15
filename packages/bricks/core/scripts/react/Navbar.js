import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useRef, useEffect } from 'react';
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
export const Navbar = forwardRef(({ items, brand, brandHref = '/', variant = 'default', fixed = false, sticky = false, shadow = true, showMobileMenu = true, rightContent, align = 'left', className, mobileBreakpoint = 768, onMobileMenuToggle, ...props }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const navRef = useRef(null);
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
    const handleDropdownToggle = (itemId) => {
        setActiveDropdown(prev => prev === itemId ? null : itemId);
    };
    const renderNavItem = (item) => {
        const hasChildren = item.children && item.children.length > 0;
        const isDropdownOpen = activeDropdown === item.id;
        if (!hasChildren) {
            // Simple link item
            const linkClasses = [
                'navbar__link',
                item.active ? 'navbar__link--active' : '',
                item.disabled ? 'navbar__link--disabled' : ''
            ].filter(Boolean).join(' ');
            return (_jsx("li", { children: _jsxs("a", { href: item.href || '#', className: linkClasses, onClick: item.onClick, "aria-disabled": item.disabled, children: [item.icon && _jsx("span", { className: "navbar__link-icon", children: item.icon }), _jsx("span", { className: "navbar__link-label", children: item.label })] }) }, item.id));
        }
        // Dropdown item
        return (_jsxs("li", { className: "navbar__dropdown", children: [_jsxs("button", { type: "button", className: [
                        'navbar__dropdown-toggle',
                        item.active ? 'navbar__dropdown-toggle--active' : '',
                        item.disabled ? 'navbar__dropdown-toggle--disabled' : ''
                    ].filter(Boolean).join(' '), onClick: (e) => {
                        if (!item.disabled) {
                            handleDropdownToggle(item.id);
                        }
                        item.onClick?.(e);
                    }, disabled: item.disabled, "aria-expanded": isDropdownOpen, "aria-haspopup": "menu", children: [item.icon && _jsx("span", { className: "navbar__dropdown-icon", children: item.icon }), _jsx("span", { className: "navbar__dropdown-label", children: item.label }), _jsx("i", { className: "bx bx-chevron-down navbar__dropdown-arrow" })] }), !item.disabled && item.children && (_jsx("div", { className: `navbar__dropdown-menu ${isDropdownOpen ? 'navbar__dropdown-menu--open' : ''}`, children: item.children.map(child => (_jsxs("a", { href: child.href || '#', className: [
                            'navbar__dropdown-item',
                            child.active ? 'navbar__dropdown-item--active' : '',
                            child.disabled ? 'navbar__dropdown-item--disabled' : ''
                        ].filter(Boolean).join(' '), onClick: child.disabled ? (e) => e.preventDefault() : child.onClick, "aria-disabled": child.disabled, children: [child.icon && _jsx("span", { className: "navbar__dropdown-item-icon", children: child.icon }), _jsx("span", { className: "navbar__dropdown-item-label", children: child.label })] }, child.id))) }))] }, item.id));
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
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
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
        const handleEscape = (event) => {
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
    return (_jsx("nav", { ref: ref, className: navbarClasses, ...props, children: _jsxs("div", { className: "navbar__container", children: [brand && (_jsx("a", { href: brandHref, className: "navbar__brand", children: brand })), showMobileMenu && isMobile && (_jsx("button", { type: "button", className: "navbar__toggle", onClick: handleMobileMenuToggle, "aria-expanded": mobileMenuOpen, "aria-label": "Toggle navigation menu", children: _jsx("i", { className: `bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'}`, style: { fontSize: '24px' } }) })), _jsx("ul", { className: navMenuClasses, children: items.map(item => renderNavItem(item)) }), rightContent && (_jsx("div", { className: "navbar__actions", children: rightContent }))] }) }));
});
Navbar.displayName = 'Navbar';
export default Navbar;
//# sourceMappingURL=Navbar.js.map