import React, { forwardRef } from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 뱃지 변형 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

  /**
   * 뱃지 스타일 타입
   * @default 'solid'
   */
  type?: 'solid' | 'outline' | 'soft';

  /**
   * 뱃지 크기
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * 뱃지 모양
   * @default 'pill'
   */
  shape?: 'pill' | 'square';

  /**
   * 점 표시
   * @default false
   */
  dot?: boolean;

  /**
   * 닫기 버튼 표시
   * @default false
   */
  closable?: boolean;

  /**
   * 닫기 이벤트
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 뱃지 내용
   */
  children: React.ReactNode;
}

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 레이블 변형 스타일
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

  /**
   * 레이블 내용
   */
  children: React.ReactNode;
}

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 클릭 가능 여부
   * @default false
   */
  clickable?: boolean;

  /**
   * 제거 가능 여부
   * @default false
   */
  removable?: boolean;

  /**
   * 제거 이벤트
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 태그 클릭 이벤트
   */
  onTagClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;

  /**
   * 태그 내용
   */
  children: React.ReactNode;
}

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * 아바타 이미지
   */
  avatar?: string;

  /**
   * 아바타 대체 텍스트
   */
  avatarAlt?: string;

  /**
   * 아이콘
   */
  icon?: React.ReactNode;

  /**
   * 제거 가능 여부
   * @default false
   */
  removable?: boolean;

  /**
   * 제거 이벤트
   */
  onRemove?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * 칩 내용
   */
  children: React.ReactNode;
}

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 태그 목록
   */
  children: React.ReactNode;
}

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
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({
  variant = 'primary',
  type = 'solid',
  size = 'md',
  shape = 'pill',
  dot = false,
  closable = false,
  onClose,
  className,
  children,
  ...props
}, ref) => {
  const badgeClasses = [
    'badge',
    variant ? `badge--${type === 'solid' ? '' : `${type}-`}${variant}` : '',
    size !== 'md' ? `badge--${size}` : '',
    shape === 'square' ? 'badge--square' : '',
    dot ? 'badge--dot' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={badgeClasses} {...props}>
      {children}
      {closable && (
        <button
          type="button"
          className="badge__close"
          aria-label="제거"
          onClick={onClose}
        >
          ×
        </button>
      )}
    </span>
  );
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
export const Label = forwardRef<HTMLSpanElement, LabelProps>(({
  variant = 'default',
  className,
  children,
  ...props
}, ref) => {
  const labelClasses = [
    'label',
    variant !== 'default' ? `label--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={labelClasses} {...props}>
      {children}
    </span>
  );
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
export const Tag = forwardRef<HTMLSpanElement, TagProps>(({
  clickable = false,
  removable = false,
  onRemove,
  onTagClick,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const tagClasses = [
    'tag',
    clickable ? 'tag--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    onTagClick?.(event);
    onClick?.(event);
  };

  return (
    <span
      ref={ref}
      className={tagClasses}
      onClick={clickable ? handleClick : onClick}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          className="tag__remove"
          aria-label="제거"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
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
export const Chip = forwardRef<HTMLSpanElement, ChipProps>(({
  avatar,
  avatarAlt,
  icon,
  removable = false,
  onRemove,
  className,
  children,
  ...props
}, ref) => {
  const chipClasses = ['chip', className].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={chipClasses} {...props}>
      {avatar && (
        <div className="chip__avatar">
          <img src={avatar} alt={avatarAlt || ''} />
        </div>
      )}
      {icon && (
        <div className="chip__icon">
          {icon}
        </div>
      )}
      {children}
      {removable && (
        <button
          type="button"
          className="chip__remove"
          aria-label="제거"
          onClick={onRemove}
        >
          ×
        </button>
      )}
    </span>
  );
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
export const TagGroup = forwardRef<HTMLDivElement, TagGroupProps>(({
  className,
  children,
  ...props
}, ref) => {
  const groupClasses = ['tag-group', className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={groupClasses} {...props}>
      {children}
    </div>
  );
});

TagGroup.displayName = 'TagGroup';

export default Badge;