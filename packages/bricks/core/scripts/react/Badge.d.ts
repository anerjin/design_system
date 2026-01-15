import React from 'react';
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
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
/**
 * BRICKS 디자인 시스템 Label 컴포넌트
 *
 * @example
 * ```tsx
 * <Label variant="primary">중요</Label>
 * ```
 */
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLSpanElement>>;
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
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLSpanElement>>;
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
export declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLSpanElement>>;
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
export declare const TagGroup: React.ForwardRefExoticComponent<TagGroupProps & React.RefAttributes<HTMLDivElement>>;
export default Badge;
//# sourceMappingURL=Badge.d.ts.map