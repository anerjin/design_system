import React, { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 카드 변형 스타일
   * @default 'default'
   */
  variant?: 'default' | 'gray' | 'flat' | 'outlined' | 'elevated';

  /**
   * 테두리 둥글기
   * @default 'xl'
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

  /**
   * 클릭 가능한 카드
   * @default false
   */
  clickable?: boolean;

  /**
   * 수평 레이아웃
   * @default false
   */
  horizontal?: boolean;

  /**
   * 카드 클릭 이벤트
   */
  onCardClick?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * 자식 요소
   */
  children: React.ReactNode;
}

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * 이미지 위치
   * @default 'top'
   */
  position?: 'top';

  /**
   * 오버레이 사용 여부
   * @default false
   */
  overlay?: boolean;

  /**
   * 오버레이 내용
   */
  overlayContent?: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 조밀한 패딩
   * @default false
   */
  dense?: boolean;

  /**
   * 테두리 제거
   * @default false
   */
  noBorder?: boolean;

  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 조밀한 패딩
   * @default false
   */
  dense?: boolean;

  /**
   * 패딩 제거
   * @default false
   */
  noPadding?: boolean;

  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 조밀한 패딩
   * @default false
   */
  dense?: boolean;

  /**
   * 테두리 제거
   * @default false
   */
  noBorder?: boolean;

  /**
   * 정렬 방식
   * @default 'left'
   */
  align?: 'left' | 'center' | 'right' | 'between';

  children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * 제목 레벨
   * @default 'h3'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  children: React.ReactNode;
}

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 정렬 방식
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end' | 'between';

  children: React.ReactNode;
}

export interface CardBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 뱃지 위치
   * @default 'right'
   */
  position?: 'left' | 'right';

  children: React.ReactNode;
}

/**
 * BRICKS 디자인 시스템 Card 컴포넌트
 *
 * @example
 * ```tsx
 * <Card variant="elevated" clickable onCardClick={handleClick}>
 *   <Card.Header>
 *     <Card.Title>카드 제목</Card.Title>
 *     <Card.Subtitle>카드 부제목</Card.Subtitle>
 *   </Card.Header>
 *   <Card.Body>
 *     카드 내용입니다.
 *   </Card.Body>
 *   <Card.Footer>
 *     <Card.Actions align="end">
 *       <Button variant="secondary">취소</Button>
 *       <Button variant="primary">확인</Button>
 *     </Card.Actions>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({
  variant = 'default',
  radius = 'xl',
  clickable = false,
  horizontal = false,
  onCardClick,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  const cardClasses = [
    'card',
    variant !== 'default' ? `card--${variant}` : '',
    radius !== 'xl' ? `card--radius-${radius}` : '',
    clickable ? 'card--clickable' : '',
    horizontal ? 'card--horizontal' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    onCardClick?.(event);
    onClick?.(event);
  };

  return (
    <div
      ref={ref}
      className={cardClasses}
      onClick={clickable ? handleClick : onClick}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card.Image 컴포넌트
 */
export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(({
  position = 'top',
  overlay = false,
  overlayContent,
  className,
  alt,
  ...props
}, ref) => {
  const imageClasses = [
    'card__image',
    position ? `card__image--${position}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={imageClasses}>
      <img alt={alt} {...props} />
      {overlay && overlayContent && (
        <div className="card__image--overlay">
          {overlayContent}
        </div>
      )}
    </div>
  );
});

CardImage.displayName = 'CardImage';

/**
 * Card.Header 컴포넌트
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({
  dense = false,
  noBorder = false,
  className,
  children,
  ...props
}, ref) => {
  const headerClasses = [
    'card__header',
    dense ? 'card__header--dense' : '',
    noBorder ? 'card__header--no-border' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={headerClasses} {...props}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

/**
 * Card.Body 컴포넌트
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({
  dense = false,
  noPadding = false,
  className,
  children,
  ...props
}, ref) => {
  const bodyClasses = [
    'card__body',
    dense ? 'card__body--dense' : '',
    noPadding ? 'card__body--no-padding' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={bodyClasses} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

/**
 * Card.Footer 컴포넌트
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({
  dense = false,
  noBorder = false,
  align = 'left',
  className,
  children,
  ...props
}, ref) => {
  const footerClasses = [
    'card__footer',
    dense ? 'card__footer--dense' : '',
    noBorder ? 'card__footer--no-border' : '',
    align !== 'left' ? `card__footer--${align}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={footerClasses} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

/**
 * Card.Title 컴포넌트
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({
  level = 'h3',
  className,
  children,
  ...props
}, ref) => {
  const titleClasses = ['card__title', className].filter(Boolean).join(' ');
  const Tag = level;

  return (
    <Tag ref={ref} className={titleClasses} {...props}>
      {children}
    </Tag>
  );
});

CardTitle.displayName = 'CardTitle';

/**
 * Card.Subtitle 컴포넌트
 */
export const CardSubtitle = forwardRef<HTMLParagraphElement, CardSubtitleProps>(({
  className,
  children,
  ...props
}, ref) => {
  const subtitleClasses = ['card__subtitle', className].filter(Boolean).join(' ');

  return (
    <p ref={ref} className={subtitleClasses} {...props}>
      {children}
    </p>
  );
});

CardSubtitle.displayName = 'CardSubtitle';

/**
 * Card.Actions 컴포넌트
 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(({
  align = 'start',
  className,
  children,
  ...props
}, ref) => {
  const actionsClasses = [
    'card__actions',
    align !== 'start' ? `card__actions--${align}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={actionsClasses} {...props}>
      {children}
    </div>
  );
});

CardActions.displayName = 'CardActions';

/**
 * Card.Badge 컴포넌트
 */
export const CardBadge = forwardRef<HTMLDivElement, CardBadgeProps>(({
  position = 'right',
  className,
  children,
  ...props
}, ref) => {
  const badgeClasses = [
    'card__badge',
    position !== 'right' ? `card__badge--${position}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={badgeClasses} {...props}>
      {children}
    </div>
  );
});

CardBadge.displayName = 'CardBadge';

// Compound Component 패턴을 위한 타입 확장
export interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Image: typeof CardImage;
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
  Title: typeof CardTitle;
  Subtitle: typeof CardSubtitle;
  Actions: typeof CardActions;
  Badge: typeof CardBadge;
}

// Card를 CardComponent 타입으로 캐스팅
const CardWithSubcomponents = Card as CardComponent;

// Subcomponents 할당
CardWithSubcomponents.Image = CardImage;
CardWithSubcomponents.Header = CardHeader;
CardWithSubcomponents.Body = CardBody;
CardWithSubcomponents.Footer = CardFooter;
CardWithSubcomponents.Title = CardTitle;
CardWithSubcomponents.Subtitle = CardSubtitle;
CardWithSubcomponents.Actions = CardActions;
CardWithSubcomponents.Badge = CardBadge;

export { CardWithSubcomponents as Card };
export default CardWithSubcomponents;