import React, { forwardRef } from 'react';
const variantMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h6',
    subtitle2: 'h6',
    body1: 'p',
    body2: 'p',
    caption: 'span',
    overline: 'span',
    display1: 'h1',
    display2: 'h2',
    display3: 'h3',
    display4: 'h4',
};
/**
 * BRICKS Typography Component
 *
 * @example
 * ```tsx
 * <Typography variant="h1">Heading 1</Typography>
 * <Typography variant="body1" color="primary">Primary body text</Typography>
 * <Typography variant="caption" italic>Italic caption</Typography>
 * ```
 */
export const Typography = forwardRef(({ variant = 'body1', as, align = 'left', weight, color, transform, decoration, truncate = false, clamp, italic = false, display = 'block', noSelect = false, gutterBottom = false, children, className, ...props }, ref) => {
    const Component = as || variantMapping[variant] || 'p';
    const typographyClasses = [
        'typography',
        `typography--${variant}`,
        align !== 'left' ? `typography--align-${align}` : '',
        weight ? `typography--weight-${weight}` : '',
        color ? `typography--color-${color}` : '',
        transform && transform !== 'none' ? `typography--transform-${transform}` : '',
        decoration && decoration !== 'none' ? `typography--decoration-${decoration}` : '',
        truncate ? 'typography--truncate' : '',
        clamp ? `typography--clamp-${clamp}` : '',
        italic ? 'typography--italic' : '',
        display !== 'block' ? `typography--display-${display}` : '',
        noSelect ? 'typography--no-select' : '',
        gutterBottom ? 'typography--gutter-bottom' : '',
        className
    ].filter(Boolean).join(' ');
    const style = {
        ...(clamp && {
            display: '-webkit-box',
            WebkitLineClamp: clamp,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
        }),
    };
    return React.createElement(Component, {
        ref,
        className: typographyClasses,
        style,
        ...props,
    }, children);
});
Typography.displayName = 'Typography';
export default Typography;
//# sourceMappingURL=Typography.js.map