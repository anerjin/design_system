import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
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
const Card = forwardRef(({ variant = 'default', radius = 'xl', clickable = false, horizontal = false, onCardClick, className, children, onClick, ...props }, ref) => {
    const cardClasses = [
        'card',
        variant !== 'default' ? `card--${variant}` : '',
        radius !== 'xl' ? `card--radius-${radius}` : '',
        clickable ? 'card--clickable' : '',
        horizontal ? 'card--horizontal' : '',
        className
    ].filter(Boolean).join(' ');
    const handleClick = (event) => {
        onCardClick?.(event);
        onClick?.(event);
    };
    return (_jsx("div", { ref: ref, className: cardClasses, onClick: clickable ? handleClick : onClick, ...props, children: children }));
});
Card.displayName = 'Card';
/**
 * Card.Image 컴포넌트
 */
export const CardImage = forwardRef(({ position = 'top', overlay = false, overlayContent, className, alt, ...props }, ref) => {
    const imageClasses = [
        'card__image',
        position ? `card__image--${position}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsxs("div", { ref: ref, className: imageClasses, children: [_jsx("img", { alt: alt, ...props }), overlay && overlayContent && (_jsx("div", { className: "card__image--overlay", children: overlayContent }))] }));
});
CardImage.displayName = 'CardImage';
/**
 * Card.Header 컴포넌트
 */
export const CardHeader = forwardRef(({ dense = false, noBorder = false, className, children, ...props }, ref) => {
    const headerClasses = [
        'card__header',
        dense ? 'card__header--dense' : '',
        noBorder ? 'card__header--no-border' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: headerClasses, ...props, children: children }));
});
CardHeader.displayName = 'CardHeader';
/**
 * Card.Body 컴포넌트
 */
export const CardBody = forwardRef(({ dense = false, noPadding = false, className, children, ...props }, ref) => {
    const bodyClasses = [
        'card__body',
        dense ? 'card__body--dense' : '',
        noPadding ? 'card__body--no-padding' : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: bodyClasses, ...props, children: children }));
});
CardBody.displayName = 'CardBody';
/**
 * Card.Footer 컴포넌트
 */
export const CardFooter = forwardRef(({ dense = false, noBorder = false, align = 'left', className, children, ...props }, ref) => {
    const footerClasses = [
        'card__footer',
        dense ? 'card__footer--dense' : '',
        noBorder ? 'card__footer--no-border' : '',
        align !== 'left' ? `card__footer--${align}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: footerClasses, ...props, children: children }));
});
CardFooter.displayName = 'CardFooter';
/**
 * Card.Title 컴포넌트
 */
export const CardTitle = forwardRef(({ level = 'h3', className, children, ...props }, ref) => {
    const titleClasses = ['card__title', className].filter(Boolean).join(' ');
    const Tag = level;
    return (_jsx(Tag, { ref: ref, className: titleClasses, ...props, children: children }));
});
CardTitle.displayName = 'CardTitle';
/**
 * Card.Subtitle 컴포넌트
 */
export const CardSubtitle = forwardRef(({ className, children, ...props }, ref) => {
    const subtitleClasses = ['card__subtitle', className].filter(Boolean).join(' ');
    return (_jsx("p", { ref: ref, className: subtitleClasses, ...props, children: children }));
});
CardSubtitle.displayName = 'CardSubtitle';
/**
 * Card.Actions 컴포넌트
 */
export const CardActions = forwardRef(({ align = 'start', className, children, ...props }, ref) => {
    const actionsClasses = [
        'card__actions',
        align !== 'start' ? `card__actions--${align}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: actionsClasses, ...props, children: children }));
});
CardActions.displayName = 'CardActions';
/**
 * Card.Badge 컴포넌트
 */
export const CardBadge = forwardRef(({ position = 'right', className, children, ...props }, ref) => {
    const badgeClasses = [
        'card__badge',
        position !== 'right' ? `card__badge--${position}` : '',
        className
    ].filter(Boolean).join(' ');
    return (_jsx("div", { ref: ref, className: badgeClasses, ...props, children: children }));
});
CardBadge.displayName = 'CardBadge';
// Card를 CardComponent 타입으로 캐스팅
const CardWithSubcomponents = Card;
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
//# sourceMappingURL=Card.js.map