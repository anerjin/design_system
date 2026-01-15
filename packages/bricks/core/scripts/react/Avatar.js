import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
/**
 * BRICKS Avatar Component
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="user.jpg"
 *   alt="John Doe"
 *   status="online"
 * />
 * ```
 */
export const Avatar = forwardRef(({ size = 'md', shape = 'circle', src, alt, initials, variant = 'default', status, onClick, className, children, badge, badgePosition = 'bottom-right', loading = false, ...props }, ref) => {
    const avatarClasses = [
        'avatar',
        size !== 'md' ? `avatar--${size}` : '',
        shape !== 'circle' ? `avatar--${shape}` : '',
        !src && (initials || children) ? 'avatar--initials' : '',
        variant !== 'default' && !src ? `avatar--${variant}` : '',
        status ? 'avatar--status' : '',
        onClick ? 'avatar--clickable' : '',
        loading ? 'avatar--loading' : '',
        className
    ].filter(Boolean).join(' ');
    const renderContent = () => {
        if (loading) {
            return _jsx("div", { className: "avatar__skeleton" });
        }
        if (src) {
            return (_jsx("img", { className: "avatar__image", src: src, alt: alt || 'Avatar', onError: (e) => {
                    // Hide broken images
                    e.target.style.display = 'none';
                } }));
        }
        if (initials) {
            return _jsx("span", { className: "avatar__text", children: initials.slice(0, 2).toUpperCase() });
        }
        if (children) {
            return _jsx("div", { className: "avatar__content", children: children });
        }
        // Default placeholder
        return _jsx("span", { className: "avatar__text", children: "?" });
    };
    return (_jsxs("div", { ref: ref, className: avatarClasses, onClick: onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, "aria-label": alt || initials, ...props, children: [renderContent(), status && (_jsx("span", { className: `avatar__status avatar__status--${status}`, "aria-label": `Status: ${status}` })), badge && (_jsx("div", { className: `avatar__badge avatar__badge--${badgePosition}`, children: badge }))] }));
});
Avatar.displayName = 'Avatar';
/**
 * BRICKS Avatar Group Component
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="user1.jpg" />
 *   <Avatar src="user2.jpg" />
 *   <Avatar src="user3.jpg" />
 *   <Avatar src="user4.jpg" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef(({ max = 5, size = 'md', spacing = -8, className, children, renderMore, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const hiddenCount = childArray.length - max;
    const groupClasses = [
        'avatar-group',
        size !== 'md' ? `avatar-group--${size}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { ref: ref, className: groupClasses, ...props, children: [visibleChildren.map((child, index) => (_jsx("div", { className: "avatar-group__item", style: {
                    marginLeft: index === 0 ? 0 : spacing,
                    zIndex: max - index
                }, children: React.isValidElement(child) && React.cloneElement(child, {
                    size: size
                }) }, index))), hiddenCount > 0 && (_jsx("div", { className: "avatar-group__more", style: {
                    marginLeft: spacing,
                    zIndex: 0
                }, children: renderMore ? renderMore(hiddenCount) : (_jsx("div", { className: `avatar avatar--${size} avatar--initials`, children: _jsxs("span", { className: "avatar__text", children: ["+", hiddenCount] }) })) }))] }));
});
AvatarGroup.displayName = 'AvatarGroup';
export default Avatar;
//# sourceMappingURL=Avatar.js.map