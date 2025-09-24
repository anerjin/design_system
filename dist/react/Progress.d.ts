import React from 'react';
export interface ProgressProps {
    /**
     * Progress value (0-100)
     * @default 0
     */
    value?: number;
    /**
     * Maximum value
     * @default 100
     */
    max?: number;
    /**
     * Minimum value
     * @default 0
     */
    min?: number;
    /**
     * Progress bar size
     * @default 'md'
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * Color variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    /**
     * Whether to show stripes
     * @default false
     */
    striped?: boolean;
    /**
     * Whether to animate stripes
     * @default false
     */
    animated?: boolean;
    /**
     * Whether progress is indeterminate
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Label to display
     */
    label?: React.ReactNode;
    /**
     * Whether to show label inside bar
     * @default false
     */
    showLabel?: boolean;
    /**
     * Label position
     * @default 'inside'
     */
    labelPosition?: 'inside' | 'outside';
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Bar CSS class
     */
    barClassName?: string;
    /**
     * Custom formatter for label
     */
    formatLabel?: (value: number, max: number) => React.ReactNode;
    /**
     * ARIA label
     */
    'aria-label'?: string;
}
export interface CircularProgressProps {
    /**
     * Progress value (0-100)
     * @default 0
     */
    value?: number;
    /**
     * Circle size
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Stroke width
     * @default 3
     */
    strokeWidth?: number;
    /**
     * Color variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    /**
     * Whether to show percentage label
     * @default true
     */
    showLabel?: boolean;
    /**
     * Custom label
     */
    label?: React.ReactNode;
    /**
     * Whether progress is indeterminate
     * @default false
     */
    indeterminate?: boolean;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Custom formatter for label
     */
    formatLabel?: (value: number) => React.ReactNode;
}
export interface MultiStepProgressProps {
    /**
     * Current step (0-indexed)
     */
    currentStep: number;
    /**
     * Step labels
     */
    steps: string[];
    /**
     * Progress bar variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark';
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * Whether to show step numbers
     * @default false
     */
    showStepNumbers?: boolean;
}
/**
 * BRICKS Progress Component
 *
 * @example
 * ```tsx
 * <Progress value={60} />
 * ```
 */
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
/**
 * BRICKS Circular Progress Component
 *
 * @example
 * ```tsx
 * <CircularProgress value={75} />
 * ```
 */
export declare const CircularProgress: React.ForwardRefExoticComponent<CircularProgressProps & React.RefAttributes<HTMLDivElement>>;
/**
 * BRICKS Multi-Step Progress Component
 *
 * @example
 * ```tsx
 * <MultiStepProgress
 *   currentStep={1}
 *   steps={['Step 1', 'Step 2', 'Step 3', 'Step 4']}
 * />
 * ```
 */
export declare const MultiStepProgress: React.ForwardRefExoticComponent<MultiStepProgressProps & React.RefAttributes<HTMLDivElement>>;
export default Progress;
//# sourceMappingURL=Progress.d.ts.map