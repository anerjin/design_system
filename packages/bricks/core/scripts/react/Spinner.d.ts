import React from 'react';
export interface SpinnerProps {
    /**
     * Spinner size
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Spinner type
     * @default 'circular'
     */
    type?: 'circular' | 'dots' | 'pulse' | 'bars';
    /**
     * Color variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'white';
    /**
     * Label text
     */
    label?: React.ReactNode;
    /**
     * Label position
     * @default 'bottom'
     */
    labelPosition?: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Whether to use Icon-based spinner
     * @default false
     */
    useIcon?: boolean;
    /**
     * Icon name for Icon-based spinner
     * @default 'loader-alt'
     */
    iconName?: string;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Inline display
     * @default false
     */
    inline?: boolean;
    /**
     * ARIA label
     */
    'aria-label'?: string;
}
export interface SpinnerOverlayProps {
    /**
     * Whether to show overlay
     * @default true
     */
    visible?: boolean;
    /**
     * Spinner props
     */
    spinnerProps?: SpinnerProps;
    /**
     * Label text
     */
    label?: React.ReactNode;
    /**
     * Whether overlay is fullscreen
     * @default false
     */
    fullScreen?: boolean;
    /**
     * Background color
     */
    backgroundColor?: string;
    /**
     * Z-index
     * @default 9999
     */
    zIndex?: number;
    /**
     * Additional CSS class
     */
    className?: string;
}
/**
 * BRICKS Spinner Component
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner type="dots" variant="success" />
 * <Spinner size="lg" label="Loading..." />
 * ```
 */
export declare const Spinner: React.ForwardRefExoticComponent<SpinnerProps & React.RefAttributes<HTMLDivElement>>;
/**
 * BRICKS Spinner Overlay Component
 *
 * @example
 * ```tsx
 * <SpinnerOverlay visible={loading} label="Processing..." />
 * ```
 */
export declare const SpinnerOverlay: React.ForwardRefExoticComponent<SpinnerOverlayProps & React.RefAttributes<HTMLDivElement>>;
export default Spinner;
//# sourceMappingURL=Spinner.d.ts.map