import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
/**
 * BRICKS 디자인 시스템 Badge 컴포넌트
 *
 * @example
 * ```tsx
 * <Badge variant="success" size="lg" closable onClose={handleClose}>
 *   New
 * </Badge>
 * ```
 */
export const Badge = forwardRef(({ variant = 'primary', type = 'solid', size = 'md', shape = 'pill', dot = false, closable = false, onClose, className, children, ...props }, ref) => {
    const badgeClasses = [
        'badge',
        type === 'solid' ? `badge--${variant}` : `badge--${type}-${variant}`,
        size !== 'md' ? `badge--${size}` : '',
        shape !== 'pill' ? `badge--${shape}` : '',
        dot ? 'badge--dot' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("span", { ref: ref, className: badgeClasses, ...props, children: [children, closable && (_jsx("button", { type: "button", className: "badge__close", "aria-label": "\uC81C\uAC70", onClick: onClose, children: "\u00D7" }))] }));
});
Badge.displayName = 'Badge';
/**
 * BRICKS 디자인 시스템 Label 컴포넌트
 *
 * @example
 * ```tsx
 * <Label variant="primary">중요</Label>
 * ```
 */
export const Label = forwardRef(({ variant = 'default', className, children, ...props }, ref) => {
    const labelClasses = [
        'label',
        variant !== 'default' ? `label--${variant}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("span", { ref: ref, className: labelClasses, ...props, children: children }));
});
Label.displayName = 'Label';
/**
 * BRICKS 디자인 시스템 Tag 컴포넌트
 *
 * @example
 * ```tsx
 * <Tag clickable removable onRemove={handleRemove} onTagClick={handleClick}>
 *   React
 * </Tag>
 * ```
 */
export const Tag = forwardRef(({ clickable = false, removable = false, onRemove, onTagClick, className, children, onClick, ...props }, ref) => {
    const tagClasses = [
        'tag',
        clickable ? 'tag--clickable' : '',
        className
    ].filter(Boolean).join(' ');
    const handleClick = (event) => {
        onTagClick?.(event);
        onClick?.(event);
    };
    return (_jsxs("span", { ref: ref, className: tagClasses, onClick: clickable ? handleClick : onClick, ...props, children: [children, removable && (_jsx("button", { type: "button", className: "tag__remove", "aria-label": "\uC81C\uAC70", onClick: onRemove, children: "\u00D7" }))] }));
});
Tag.displayName = 'Tag';
/**
 * BRICKS 디자인 시스템 Chip 컴포넌트
 *
 * @example
 * ```tsx
 * <Chip
 *   avatar="/user-avatar.jpg"
 *   avatarAlt="사용자"
 *   removable
 *   onRemove={handleRemove}
 * >
 *   김철수
 * </Chip>
 * ```
 */
export const Chip = forwardRef(({ avatar, avatarAlt, icon, removable = false, onRemove, className, children, ...props }, ref) => {
    const chipClasses = ['chip', className].filter(Boolean).join(' ');
    return (_jsxs("span", { ref: ref, className: chipClasses, ...props, children: [avatar && (_jsx("div", { className: "chip__avatar", children: _jsx("img", { src: avatar, alt: avatarAlt || '' }) })), icon && (_jsx("div", { className: "chip__icon", children: icon })), children, removable && (_jsx("button", { type: "button", className: "chip__remove", "aria-label": "\uC81C\uAC70", onClick: onRemove, children: "\u00D7" }))] }));
});
Chip.displayName = 'Chip';
/**
 * BRICKS 디자인 시스템 TagGroup 컴포넌트
 *
 * @example
 * ```tsx
 * <TagGroup>
 *   <Tag>React</Tag>
 *   <Tag>TypeScript</Tag>
 *   <Tag>Next.js</Tag>
 * </TagGroup>
 * ```
 */
export const TagGroup = forwardRef(({ className, children, ...props }, ref) => {
    const groupClasses = ['tag-group', className].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: groupClasses, ...props, children: children }));
});
TagGroup.displayName = 'TagGroup';
export default Badge;
//# sourceMappingURL=Badge.js.map