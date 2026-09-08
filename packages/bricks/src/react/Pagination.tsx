import { Icon } from './Icon';
import React, { forwardRef, useMemo } from 'react';
import { cx, type Color, type Size } from './utils';

export type PaginationAlign = 'start' | 'center' | 'end';

const BTN_SIZE: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

const ACTIVE_COLOR: Record<Color, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

const ALIGN: Record<PaginationAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
};

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /** 현재 페이지 (1부터 시작) */
  currentPage: number;

  /** 전체 페이지 수 */
  totalPages: number;

  /** 페이지가 바뀔 때 호출된다 */
  onPageChange: (page: number) => void;

  /**
   * 한 번에 보여줄 페이지 버튼 수
   * @default 5
   */
  visiblePages?: number;

  /**
   * 처음/마지막 버튼 표시
   * @default false
   */
  showFirstLast?: boolean;

  /**
   * 이전/다음 버튼 표시
   * @default true
   */
  showPrevNext?: boolean;

  /**
   * 생략 부호 표시
   * @default true
   */
  showEllipsis?: boolean;

  /**
   * 버튼 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 현재 페이지 버튼의 색상
   * @default 'primary'
   */
  color?: Color;

  /**
   * 정렬
   * @default 'center'
   */
  align?: PaginationAlign;

  /**
   * "N / M" 형태의 안내 표시
   * @default false
   */
  showPageInfo?: boolean;

  /**
   * 페이지 번호 직접 입력 칸 표시
   * @default false
   */
  showJumpTo?: boolean;

  /** 이전 버튼 내용 */
  prevLabel?: React.ReactNode;

  /** 다음 버튼 내용 */
  nextLabel?: React.ReactNode;

  /** 처음 버튼 내용 */
  firstLabel?: React.ReactNode;

  /** 마지막 버튼 내용 */
  lastLabel?: React.ReactNode;

  /**
   * 전체 비활성
   * @default false
   */
  disabled?: boolean;
}

/**
 * DOI INC Pagination — daisyUI `join` + `btn` 기반
 *
 * daisyUI에는 전용 pagination 클래스가 없다. 버튼을 `join`으로 묶는 것이 공식 방식이다.
 *
 * @example
 * ```tsx
 * <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
 * ```
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      visiblePages = 5,
      showFirstLast = false,
      showPrevNext = true,
      showEllipsis = true,
      size = 'md',
      color = 'primary',
      align = 'center',
      showPageInfo = false,
      showJumpTo = false,
      prevLabel = <Icon name="chevron-left" size="1em" />,
      nextLabel = <Icon name="chevron-right" size="1em" />,
      firstLabel = <Icon name="chevrons-left" size="1em" />,
      lastLabel = <Icon name="chevrons-right" size="1em" />,
      disabled = false,
      className,
      'aria-label': ariaLabel = '페이지 이동',
      ...props
    },
    ref,
  ) => {
    const pages = useMemo(() => {
      const result: (number | 'ellipsis')[] = [];
      const half = Math.floor(visiblePages / 2);

      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, currentPage + half);

      if (currentPage <= half) {
        end = Math.min(totalPages, visiblePages);
      } else if (currentPage + half >= totalPages) {
        start = Math.max(1, totalPages - visiblePages + 1);
      }

      if (showEllipsis && start > 1) {
        result.push(1);
        if (start > 2) result.push('ellipsis');
      }

      for (let i = start; i <= end; i += 1) result.push(i);

      if (showEllipsis && end < totalPages) {
        if (end < totalPages - 1) result.push('ellipsis');
        result.push(totalPages);
      }

      return result;
    }, [currentPage, totalPages, visiblePages, showEllipsis]);

    const go = (page: number) => {
      if (disabled || page === currentPage || page < 1 || page > totalPages) return;
      onPageChange(page);
    };

    const btn = cx('join-item btn', BTN_SIZE[size]);

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        className={cx(
          'bricks-pagination flex w-full flex-wrap items-center gap-3',
          showPrevNext && pages.length > 5 && 'pagination-compactable',
          ALIGN[align],
          className,
        )}
        {...props}
      >
        {showPageInfo && (
          <span className="pagination-page-info text-sm opacity-60">
            {currentPage} / {totalPages}
          </span>
        )}

        <div className="join max-w-full overflow-x-auto">
          {showFirstLast && (
            <button
              type="button"
              className={cx(btn, 'pagination-first-last')}
              onClick={() => go(1)}
              disabled={disabled || currentPage === 1}
              aria-label="첫 페이지"
            >
              {firstLabel}
            </button>
          )}

          {showPrevNext && (
            <button
              type="button"
              className={btn}
              onClick={() => go(currentPage - 1)}
              disabled={disabled || currentPage === 1}
              aria-label="이전 페이지"
            >
              {prevLabel}
            </button>
          )}

          {pages.map((page, index) =>
            page === 'ellipsis' ? (
              <button
                key={`ellipsis-${index}`}
                type="button"
                className={cx(btn, 'btn-disabled pagination-number')}
                aria-hidden="true"
                tabIndex={-1}
              >
                …
              </button>
            ) : (
              <button
                key={page}
                type="button"
                className={cx(btn, 'pagination-number', page === currentPage && ACTIVE_COLOR[color])}
                onClick={() => go(page)}
                disabled={disabled}
                aria-label={`${page} 페이지`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ),
          )}

          <span className={cx('pagination-compact-count join-item btn', BTN_SIZE[size], ACTIVE_COLOR[color], disabled && 'btn-disabled')} aria-live="polite">
            <strong>{currentPage}</strong>
            <span className="opacity-60">/ {totalPages}</span>
          </span>

          {showPrevNext && (
            <button
              type="button"
              className={btn}
              onClick={() => go(currentPage + 1)}
              disabled={disabled || currentPage === totalPages}
              aria-label="다음 페이지"
            >
              {nextLabel}
            </button>
          )}

          {showFirstLast && (
            <button
              type="button"
              className={cx(btn, 'pagination-first-last')}
              onClick={() => go(totalPages)}
              disabled={disabled || currentPage === totalPages}
              aria-label="마지막 페이지"
            >
              {lastLabel}
            </button>
          )}
        </div>

        {showJumpTo && (
          <label className="flex items-center gap-2 text-sm">
            이동
            <input
              type="number"
              min={1}
              max={totalPages}
              className={cx('input w-20', size === 'lg' || size === 'xl' ? 'input-md' : 'input-sm')}
              disabled={disabled}
              placeholder="#"
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                const input = event.currentTarget;
                const page = Number.parseInt(input.value, 10);
                if (!Number.isNaN(page)) {
                  go(Math.min(Math.max(1, page), totalPages));
                  input.value = '';
                }
              }}
            />
          </label>
        )}
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';

export default Pagination;
