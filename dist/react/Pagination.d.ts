import React from 'react';
export interface PaginationProps {
    /**
     * Current active page
     */
    currentPage: number;
    /**
     * Total number of pages
     */
    totalPages: number;
    /**
     * Callback when page changes
     */
    onPageChange: (page: number) => void;
    /**
     * Number of visible page buttons (excluding prev/next)
     * @default 5
     */
    visiblePages?: number;
    /**
     * Show first and last page buttons
     * @default false
     */
    showFirstLast?: boolean;
    /**
     * Show previous and next buttons
     * @default true
     */
    showPrevNext?: boolean;
    /**
     * Show ellipsis for hidden pages
     * @default true
     */
    showEllipsis?: boolean;
    /**
     * Size variant
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Shape variant
     * @default 'default'
     */
    shape?: 'default' | 'rounded' | 'circle';
    /**
     * Color variant
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
    /**
     * Alignment
     * @default 'center'
     */
    align?: 'left' | 'center' | 'right';
    /**
     * Show page info (e.g., "Page 1 of 10")
     * @default false
     */
    showPageInfo?: boolean;
    /**
     * Show jump to page input
     * @default false
     */
    showJumpTo?: boolean;
    /**
     * Previous button label
     * @default 'Previous'
     */
    prevLabel?: React.ReactNode;
    /**
     * Next button label
     * @default 'Next'
     */
    nextLabel?: React.ReactNode;
    /**
     * First button label
     * @default 'First'
     */
    firstLabel?: React.ReactNode;
    /**
     * Last button label
     * @default 'Last'
     */
    lastLabel?: React.ReactNode;
    /**
     * Disabled state
     * @default false
     */
    disabled?: boolean;
    /**
     * Additional CSS class
     */
    className?: string;
    /**
     * aria-label for navigation
     */
    'aria-label'?: string;
}
/**
 * BRICKS Pagination Component
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
export declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
export default Pagination;
//# sourceMappingURL=Pagination.d.ts.map