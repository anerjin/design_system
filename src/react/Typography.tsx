import React, { forwardRef } from 'react';

export interface TypographyProps {
  /**
   * Typography variant
   * @default 'body1'
   */
  variant?:
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'subtitle1' | 'subtitle2'
    | 'body1' | 'body2'
    | 'caption' | 'overline'
    | 'display1' | 'display2' | 'display3' | 'display4';

  /**
   * HTML element to render
   */
  as?: keyof JSX.IntrinsicElements;

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

const variantMapping: Record<string, keyof JSX.IntrinsicElements> = {
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
export const Typography = forwardRef<HTMLElement, TypographyProps>(({
  variant = 'body1',
  as,
  align = 'left',
  weight,
  color,
  transform,
  decoration,
  truncate = false,
  clamp,
  italic = false,
  display = 'block',
  noSelect = false,
  gutterBottom = false,
  children,
  className,
  ...props
}, ref) => {
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

  const style: React.CSSProperties = {
    ...(clamp && {
      display: '-webkit-box',
      WebkitLineClamp: clamp,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
  };

  return React.createElement(
    Component,
    {
      ref,
      className: typographyClasses,
      style,
      ...props,
    },
    children
  );
});

Typography.displayName = 'Typography';

export default Typography;