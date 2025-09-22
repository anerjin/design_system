import React from 'react';
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
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Image 컴포넌트
 */
export declare const CardImage: React.ForwardRefExoticComponent<CardImageProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Header 컴포넌트
 */
export declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Body 컴포넌트
 */
export declare const CardBody: React.ForwardRefExoticComponent<CardBodyProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Footer 컴포넌트
 */
export declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Title 컴포넌트
 */
export declare const CardTitle: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
/**
 * Card.Subtitle 컴포넌트
 */
export declare const CardSubtitle: React.ForwardRefExoticComponent<CardSubtitleProps & React.RefAttributes<HTMLParagraphElement>>;
/**
 * Card.Actions 컴포넌트
 */
export declare const CardActions: React.ForwardRefExoticComponent<CardActionsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card.Badge 컴포넌트
 */
export declare const CardBadge: React.ForwardRefExoticComponent<CardBadgeProps & React.RefAttributes<HTMLDivElement>>;
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
declare const CardWithSubcomponents: CardComponent;
export { CardWithSubcomponents as Card };
export default CardWithSubcomponents;
//# sourceMappingURL=Card.d.ts.map