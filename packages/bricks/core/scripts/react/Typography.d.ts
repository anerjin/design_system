import React from 'react';
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Typography variant
     * @default 'body1'
     */
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline' | 'display1' | 'display2' | 'display3' | 'display4';
    /**
     * HTML element to render
     */
    as?: keyof React.JSX.IntrinsicElements;
    /**
     * Text alignment
     * @default 'left'
     */
    align?: 'left' | 'center' | 'right' | 'justify';
    /**
     * Font weight
     */
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'black';
    /**
     * Text color
     */
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'muted' | 'inherit';
    /**
     * Text transform
     */
    transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    /**
     * Text decoration
     */
    decoration?: 'none' | 'underline' | 'line-through' | 'overline';
    /**
     * Truncate text with ellipsis
     * @default false
     */
    truncate?: boolean;
    /**
     * Maximum lines to display (with ellipsis)
     */
    clamp?: number;
    /**
     * Font style
     */
    italic?: boolean;
    /**
     * Display as inline or block
     * @default 'block'
     */
    display?: 'inline' | 'inline-block' | 'block';
    /**
     * Disable text selection
     * @default false
     */
    noSelect?: boolean;
    /**
     * Add margin bottom
     * @default false
     */
    gutterBottom?: boolean;
    /**
     * Children content
     */
    children?: React.ReactNode;
    /**
     * Additional CSS class
     */
    className?: string;
}
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
export declare const Typography: React.ForwardRefExoticComponent<TypographyProps & React.RefAttributes<HTMLElement>>;
export default Typography;
//# sourceMappingURL=Typography.d.ts.map