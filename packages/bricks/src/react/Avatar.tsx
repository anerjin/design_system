import React, { forwardRef } from 'react';
import { cx, type Color, type Size } from './utils';

export type AvatarShape = 'circle' | 'rounded' | 'square' | 'squircle';

/** daisyUI 아바타는 크기를 Tailwind 너비 유틸리티로 지정한다 */
const SIZE: Record<Size, string> = {
  xs: 'w-8',
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-20',
  xl: 'w-24',
};

const TEXT_SIZE: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-3xl',
};

const SHAPE: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-none',
  squircle: 'mask mask-squircle',
};

/** 이니셜 아바타의 배경/전경 색 */
const PLACEHOLDER_COLOR: Record<Color, string> = {
  neutral: 'bg-neutral text-neutral-content',
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
  info: 'bg-info text-info-content',
  success: 'bg-success text-success-content',
  warning: 'bg-warning text-warning-content',
  error: 'bg-error text-error-content',
};

const STATUS: Record<'online' | 'offline', string> = {
  online: 'avatar-online',
  offline: 'avatar-offline',
};

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 아바타 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 아바타 모양
   * @default 'circle'
   */
  shape?: AvatarShape;

  /** 이미지 주소 */
  src?: string;

  /** 이미지 대체 텍스트 */
  alt?: string;

  /** 이미지가 없을 때 표시할 이니셜 (앞 2글자만 사용) */
  initials?: string;

  /**
   * 이니셜 아바타의 색상
   * @default 'neutral'
   */
  color?: Color;

  /**
   * 접속 상태 표시.
   * daisyUI가 지원하는 것은 online / offline 두 가지다.
   */
  status?: 'online' | 'offline';

  /** 커스텀 내용 (이미지·이니셜 대신) */
  children?: React.ReactNode;
}

/**
 * DOI INC Avatar — daisyUI `avatar` 기반
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="김철수" status="online" />
 * <Avatar initials="KC" color="primary" size="lg" />
 * ```
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  size = 'md',
  shape = 'circle',
  src,
  alt,
  initials,
  color = 'neutral',
  status,
  className,
  children,
  ...props
}, ref) => {
  const isPlaceholder = !src && Boolean(initials || children);

  return (
    <div
      ref={ref}
      className={cx(
        'avatar',
        isPlaceholder && 'avatar-placeholder',
        status && STATUS[status],
        className,
      )}
      {...props}
    >
      <div
        className={cx(
          SIZE[size],
          SHAPE[shape],
          isPlaceholder && PLACEHOLDER_COLOR[color],
        )}
      >
        {src
          ? <img src={src} alt={alt || ''} />
          : children ?? (
            <span className={TEXT_SIZE[size]}>
              {(initials ?? '?').slice(0, 2).toUpperCase()}
            </span>
          )}
      </div>
    </div>
  );
});

Avatar.displayName = 'Avatar';

/** 아바타가 겹치는 정도 */
const SPACING: Record<Size, string> = {
  xs: '-space-x-2',
  sm: '-space-x-3',
  md: '-space-x-4',
  lg: '-space-x-5',
  xl: '-space-x-6',
};

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 표시할 최대 개수. 초과분은 `+N` 아바타로 접힌다.
   * @default 5
   */
  max?: number;

  /**
   * 그룹 전체에 적용할 크기. 자식 Avatar의 size를 덮어쓴다.
   * @default 'md'
   */
  size?: Size;

  children: React.ReactNode;
}

/**
 * DOI INC AvatarGroup — daisyUI `avatar-group` 기반
 *
 * @example
 * ```tsx
 * <AvatarGroup max={3}>
 *   <Avatar src="/1.jpg" />
 *   <Avatar src="/2.jpg" />
 *   <Avatar src="/3.jpg" />
 *   <Avatar src="/4.jpg" />
 * </AvatarGroup>
 * ```
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
  max = 5,
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;

  return (
    <div
      ref={ref}
      className={cx('avatar-group', SPACING[size], className)}
      {...props}
    >
      {visible.map((child, i) =>
        React.isValidElement<AvatarProps>(child)
          ? React.cloneElement(child, { key: i, size })
          : child)}
      {hidden > 0 && (
        <Avatar size={size}>
          <span className={TEXT_SIZE[size]}>+{hidden}</span>
        </Avatar>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default Avatar;
