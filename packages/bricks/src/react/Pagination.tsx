import React, { forwardRef, useMemo } from 'react';
import { Icon } from './Icon';

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
export const Pagination = forwardRef<HTMLElement, PaginationProps>(({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 5,
  showFirstLast = false,
  showPrevNext = true,
  showEllipsis = true,
  size = 'md',
  shape = 'default',
  variant = 'primary',
  align = 'center',
  showPageInfo = false,
  showJumpTo = false,
  prevLabel = <Icon name="chevron-left" />,
  nextLabel = <Icon name="chevron-right" />,
  firstLabel = <Icon name="chevrons-left" />,
  lastLabel = <Icon name="chevrons-right" />,
  disabled = false,
  className,
  'aria-label': ariaLabel = 'Pagination Navigation',
  ...props
}, ref) => {
  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const half = Math.floor(visiblePages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust if at the beginning or end
    if (currentPage <= half) {
      end = Math.min(totalPages, visiblePages);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    // Add first page and ellipsis
    if (showEllipsis && start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add page numbers
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page
    if (showEllipsis && end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, visiblePages, showEllipsis]);

  const handlePageChange = (page: number) => {
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleJumpToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const page = parseInt(input.value, 10);
      if (!isNaN(page)) {
        handlePageChange(Math.min(Math.max(1, page), totalPages));
        input.value = '';
      }
    }
  };

  const paginationClasses = [
    'pagination',
    size !== 'md' ? `pagination--${size}` : '',
    shape !== 'default' ? `pagination--${shape}` : '',
    variant !== 'primary' ? `pagination--${variant}` : '',
    align !== 'center' ? `pagination--align-${align}` : '',
    disabled ? 'pagination--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav ref={ref} className={paginationClasses} aria-label={ariaLabel} {...props}>
      {showPageInfo && (
        <div className="pagination__info">
          Page {currentPage} of {totalPages}
        </div>
      )}

      <ul className="pagination__list">
        {showFirstLast && (
          <li className="pagination__item">
            <button
              className={`pagination__link pagination__link--first ${currentPage === 1 ? 'pagination__link--disabled' : ''}`}
              onClick={() => handlePageChange(1)}
              disabled={disabled || currentPage === 1}
              aria-label="First page"
            >
              {firstLabel}
            </button>
          </li>
        )}

        {showPrevNext && (
          <li className="pagination__item">
            <button
              className={`pagination__link pagination__link--prev ${currentPage === 1 ? 'pagination__link--disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={disabled || currentPage === 1}
              aria-label="Previous page"
            >
              {prevLabel}
            </button>
          </li>
        )}

        {pageNumbers.map((page, index) => (
          <li key={index} className="pagination__item">
            {page === '...' ? (
              <span className="pagination__ellipsis">{page}</span>
            ) : (
              <button
                className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`}
                onClick={() => handlePageChange(page as number)}
                disabled={disabled}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {showPrevNext && (
          <li className="pagination__item">
            <button
              className={`pagination__link pagination__link--next ${currentPage === totalPages ? 'pagination__link--disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Next page"
            >
              {nextLabel}
            </button>
          </li>
        )}

        {showFirstLast && (
          <li className="pagination__item">
            <button
              className={`pagination__link pagination__link--last ${currentPage === totalPages ? 'pagination__link--disabled' : ''}`}
              onClick={() => handlePageChange(totalPages)}
              disabled={disabled || currentPage === totalPages}
              aria-label="Last page"
            >
              {lastLabel}
            </button>
          </li>
        )}
      </ul>

      {showJumpTo && (
        <div className="pagination__jump">
          <label className="pagination__jump-label">
            Go to:
            <input
              type="number"
              min="1"
              max={totalPages}
              className="pagination__jump-input"
              onKeyDown={handleJumpToPage}
              disabled={disabled}
              placeholder="#"
            />
          </label>
        </div>
      )}
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;