import React, { forwardRef, ReactNode } from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
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
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  size = 'md',
  shape = 'circle',
  src,
  alt,
  initials,
  variant = 'default',
  status,
  onClick,
  className,
  children,
  badge,
  badgePosition = 'bottom-right',
  loading = false,
  ...props
}, ref) => {
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
      return <div className="avatar__skeleton" />;
    }

    if (src) {
      return (
        <img
          className="avatar__image"
          src={src}
          alt={alt || 'Avatar'}
          onError={(e) => {
            // Hide broken images
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      );
    }

    if (initials) {
      return <span className="avatar__text">{initials.slice(0, 2).toUpperCase()}</span>;
    }

    if (children) {
      return <div className="avatar__content">{children}</div>;
    }

    // Default placeholder
    return <span className="avatar__text">?</span>;
  };

  return (
    <div
      ref={ref}
      className={avatarClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={alt || initials}
      {...props}
    >
      {renderContent()}

      {status && (
        <span
          className={`avatar__status avatar__status--${status}`}
          aria-label={`Status: ${status}`}
        />
      )}

      {badge && (
        <div className={`avatar__badge avatar__badge--${badgePosition}`}>
          {badge}
        </div>
      )}
    </div>
  );
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
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
  max = 5,
  size = 'md',
  spacing = -8,
  className,
  children,
  renderMore,
  ...props
}, ref) => {
  const childArray = React.Children.toArray(children);
  const visibleChildren = childArray.slice(0, max);
  const hiddenCount = childArray.length - max;

  const groupClasses = [
    'avatar-group',
    size !== 'md' ? `avatar-group--${size}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={groupClasses} {...props}>
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="avatar-group__item"
          style={{
            marginLeft: index === 0 ? 0 : spacing,
            zIndex: max - index
          }}
        >
          {React.isValidElement(child) && React.cloneElement(child as React.ReactElement<AvatarProps>, {
            size: size
          })}
        </div>
      ))}

      {hiddenCount > 0 && (
        <div
          className="avatar-group__more"
          style={{
            marginLeft: spacing,
            zIndex: 0
          }}
        >
          {renderMore ? renderMore(hiddenCount) : (
            <div className={`avatar avatar--${size} avatar--initials`}>
              <span className="avatar__text">+{hiddenCount}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;