import React, { ReactNode } from 'react';
export interface AvatarProps {
    /**
     * Avatar size
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Avatar shape
     * @default 'circle'
     */
    shape?: 'circle' | 'rounded' | 'square';
    /**
     * Image source URL
     */
    src?: string;
    /**
     * Alt text for image
     */
    alt?: string;
    /**
     * Initials to display when no image
     */
    initials?: string;
    /**
     * Color variant for initials avatar
     * @default 'default'
     */
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * Status indicator
     */
    status?: 'online' | 'away' | 'busy' | 'offline';
    /**
     * Click handler
     */
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Children for custom content
     */
    children?: ReactNode;
    /**
     * Badge content for avatar
     */
    badge?: ReactNode;
    /**
     * Badge position
     * @default 'bottom-right'
     */
    badgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /**
     * Loading state
     * @default false
     */
    loading?: boolean;
}
export interface AvatarGroupProps {
    /**
     * Maximum avatars to show
     * @default 5
     */
    max?: number;
    /**
     * Group size
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Spacing between avatars (negative for overlap)
     * @default -8
     */
    spacing?: number;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Children avatars
     */
    children: React.ReactNode;
    /**
     * Custom more indicator
     */
    renderMore?: (count: number) => React.ReactNode;
}
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
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;
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
export declare const AvatarGroup: React.ForwardRefExoticComponent<AvatarGroupProps & React.RefAttributes<HTMLDivElement>>;
export default Avatar;
//# sourceMappingURL=Avatar.d.ts.map