import React, { forwardRef } from 'react';
import { cx, type Size } from './utils';

export type CardVariant = 'normal' | 'border' | 'dash' | 'ghost';

/**
 * daisyUI 카드는 배경색을 스스로 갖지 않는다.
 * 따라서 표면색과 테두리/그림자를 변형별로 여기서 부여한다.
 */
const VARIANT: Record<CardVariant, string> = {
  normal: 'bg-base-100 shadow-sm',
  border: 'bg-base-100 card-border',
  dash: 'bg-base-100 card-dash',
  ghost: '',
};

const SIZE: Record<Size, string> = {
  xs: 'card-xs',
  sm: 'card-sm',
  md: 'card-md',
  lg: 'card-lg',
  xl: 'card-xl',
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 카드 변형
   * @default 'normal'
   */
  variant?: CardVariant;

  /**
   * 카드 안쪽 여백 스케일
   * @default 'md'
   */
  size?: Size;

  /**
   * 가로 배치 (이미지가 옆에 붙는다)
   * @default false
   */
  side?: boolean;

  children: React.ReactNode;
}

export interface CardFigureProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** 액션 정렬. 기본값은 center. */
  align?: CardActionsAlign;
  children: React.ReactNode;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * 제목 레벨
   * @default 'h2'
   */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  children: React.ReactNode;
}

export type CardActionsAlign = 'start' | 'center' | 'end' | 'between';

const ACTIONS_ALIGN: Record<CardActionsAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 정렬
   * @default 'end'
   */
  align?: CardActionsAlign;

  children: React.ReactNode;
}

/**
 * DOI INC Card — daisyUI `card` 기반
 *
 * Header / Body / Footer는 형제 영역으로 구성한다.
 * Header와 Footer는 필요할 때만 추가한다. Card.Actions는 기존 인라인 액션 그룹으로도 쓸 수 있다.
 *
 * @example
 * ```tsx
 * <Card className="w-96">
 *   <Card.Header><Card.Title>카드 제목</Card.Title></Card.Header>
 *   <Card.Body>
 *     <p>카드 본문입니다.</p>
 *   </Card.Body>
 *   <Card.Footer>
 *       <Button variant="surface">취소</Button>
 *       <Button color="primary">확인</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'normal', size = 'md', side = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cx('card', VARIANT[variant], SIZE[size], side && 'card-side', className)}
      {...props}
    >
      {children}
    </div>
  ),
);

Card.displayName = 'Card';

/** Card.Figure — 카드 이미지 영역 */
export const CardFigure = forwardRef<HTMLElement, CardFigureProps>(
  ({ className, children, ...props }, ref) => (
    <figure ref={ref} className={className} {...props}>
      {children}
    </figure>
  ),
);

CardFigure.displayName = 'CardFigure';

/** Card.Header — 제목과 보조 동작. 생략하면 헤더 없는 카드가 된다. */
export const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <header ref={ref} className={cx('doi-card-header', className)} {...props}>
      {children}
    </header>
  ),
);
CardHeader.displayName = 'CardHeader';

/** Card.Body — 본문 영역 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cx('card-body', className)} {...props}>
      {children}
    </div>
  ),
);

CardBody.displayName = 'CardBody';

/** Card.Title */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ level: Heading = 'h2', className, children, ...props }, ref) => (
    <Heading ref={ref} className={cx('card-title', className)} {...props}>
      {children}
    </Heading>
  ),
);

CardTitle.displayName = 'CardTitle';

/** Card.Actions — 버튼 등 액션 영역 */
export const CardActions = forwardRef<HTMLDivElement, CardActionsProps>(
  ({ align = 'end', className, children, ...props }, ref) => (
    <div ref={ref} className={cx('card-actions', ACTIONS_ALIGN[align], className)} {...props}>
      {children}
    </div>
  ),
);

CardActions.displayName = 'CardActions';

/** Card.Footer — 본문과 구분된 하단 액션. 생략하면 푸터 없는 카드가 된다. */
export const CardFooter = forwardRef<HTMLElement, CardFooterProps>(
  ({ align = 'center', className, children, ...props }, ref) => (
    <footer ref={ref} className={cx('doi-card-footer', ACTIONS_ALIGN[align], className)} {...props}>
      {children}
    </footer>
  ),
);
CardFooter.displayName = 'CardFooter';

export interface CardComponent extends React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> {
  Figure: typeof CardFigure;
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Title: typeof CardTitle;
  Actions: typeof CardActions;
  Footer: typeof CardFooter;
}

const CardWithSubcomponents = Card as CardComponent;

CardWithSubcomponents.Figure = CardFigure;
CardWithSubcomponents.Header = CardHeader;
CardWithSubcomponents.Body = CardBody;
CardWithSubcomponents.Title = CardTitle;
CardWithSubcomponents.Actions = CardActions;
CardWithSubcomponents.Footer = CardFooter;

export { CardWithSubcomponents as Card };
export default CardWithSubcomponents;
