import { Icon } from './Icon';
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { cx, type Size } from './utils';

export type TableAlign = 'left' | 'center' | 'right';
export type SortDirection = 'asc' | 'desc';

const SIZE: Record<Size, string> = {
  xs: 'table-xs',
  sm: 'table-sm',
  md: 'table-md',
  lg: 'table-lg',
  xl: 'table-xl',
};

const ALIGN: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export interface TableColumn<T = Record<string, unknown>> {
  /** 컬럼 식별자. 기본 렌더에서는 행 객체의 키로도 쓰인다 */
  key: string;

  /** 헤더에 표시할 내용 */
  label: React.ReactNode;

  /** 컬럼 너비 */
  width?: string | number;

  /** 셀 정렬 */
  align?: TableAlign;

  /** 정렬 가능 여부 */
  sortable?: boolean;

  /** 셀 렌더 함수 */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;

  /** 커스텀 비교 함수 */
  sortFn?: (a: T, b: T) => number;
}

export interface SortConfig {
  key: string;
  direction: SortDirection;
}

export interface TableProps<T = Record<string, unknown>> extends Omit<
  React.TableHTMLAttributes<HTMLTableElement>,
  'onSelect'
> {
  /** 컬럼 정의 */
  columns: TableColumn<T>[];

  /** 표시할 데이터 */
  data: T[];

  /**
   * 크기
   * @default 'md'
   */
  size?: Size;

  /**
   * 줄무늬 배경
   * @default false
   */
  zebra?: boolean;

  /**
   * 행에 마우스를 올리면 강조
   * @default false
   */
  hoverable?: boolean;

  /**
   * 표 바깥 테두리
   * @default false
   */
  bordered?: boolean;

  /**
   * 스크롤해도 헤더가 붙어 있게 한다
   * @default false
   */
  pinRows?: boolean;

  /**
   * 가로 스크롤 시 첫 열을 고정한다
   * @default false
   */
  pinCols?: boolean;

  /**
   * 헤더 표시
   * @default true
   */
  showHeader?: boolean;

  /**
   * 행 선택 체크박스 표시
   * @default false
   */
  selectable?: boolean;

  /** 선택된 행 키 목록 (제어) */
  selectedRowKeys?: string[];

  /** 선택이 바뀔 때 호출된다 */
  onSelectionChange?: (selectedKeys: string[]) => void;

  /**
   * 행 키 추출 함수
   * @default (row, index) => index
   */
  rowKey?: (row: T, index: number) => string | number;

  /**
   * 로딩 상태
   * @default false
   */
  loading?: boolean;

  /** 데이터가 없을 때 표시할 내용 */
  emptyText?: React.ReactNode;

  /** 정렬 상태 (제어) */
  sortConfig?: SortConfig;

  /** 정렬이 바뀔 때 호출된다 */
  onSortChange?: (key: string, direction: SortDirection) => void;

  /** 세로 스크롤을 위한 최대 높이 */
  maxHeight?: string | number;

  /** 행 클릭 핸들러 */
  onRowClick?: (row: T, index: number) => void;

  /** 행별 추가 클래스 */
  rowClassName?: (row: T, index: number) => string;

  /** 표 아래 요약 영역 */
  footer?: React.ReactNode;
}

/**
 * DOI INC Table — daisyUI `table` 기반
 *
 * 정렬·선택 로직은 그대로 React가 담당하고, 외형만 daisyUI 클래스로 바뀌었다.
 * `stickyHeader`는 daisyUI의 `table-pin-rows`에 대응하는 `pinRows`로 이름이 바뀌었다.
 *
 * @example
 * ```tsx
 * <Table
 *   zebra
 *   columns={[
 *     { key: 'name', label: '이름' },
 *     { key: 'age', label: '나이', align: 'right', sortable: true },
 *   ]}
 *   data={rows}
 * />
 * ```
 */
function TableImpl<T>(
  {
    columns,
    data,
    size = 'md',
    zebra = false,
    hoverable = false,
    bordered = false,
    pinRows = false,
    pinCols = false,
    showHeader = true,
    selectable = false,
    selectedRowKeys,
    onSelectionChange,
    rowKey = (_, index) => index,
    loading = false,
    emptyText = '데이터가 없습니다',
    sortConfig,
    onSortChange,
    maxHeight,
    onRowClick,
    rowClassName,
    footer,
    className,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const isSelectionControlled = selectedRowKeys !== undefined;
  const isSortControlled = sortConfig !== undefined;

  const [innerSelection, setInnerSelection] = useState<string[]>([]);
  const [innerSort, setInnerSort] = useState<SortConfig | undefined>(sortConfig);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const selection = isSelectionControlled ? selectedRowKeys : innerSelection;
  const sort = isSortControlled ? sortConfig : innerSort;

  const sortedData = useMemo(() => {
    if (!sort) return data;

    const column = columns.find((col) => col.key === sort.key);
    if (!column) return data;

    const sorted = [...data].sort((a, b) => {
      if (column.sortFn) return column.sortFn(a, b);

      const av = (a as Record<string, unknown>)[column.key];
      const bv = (b as Record<string, unknown>)[column.key];

      if (av === bv) return 0;
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (typeof av === 'string' && typeof bv === 'string') return av.localeCompare(bv);
      return av < bv ? -1 : 1;
    });

    return sort.direction === 'desc' ? sorted.reverse() : sorted;
  }, [data, columns, sort]);

  const allKeys = data.map((row, index) => String(rowKey(row, index)));
  const allSelected = data.length > 0 && selection.length === data.length;
  const someSelected = selection.length > 0 && selection.length < data.length;

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const applySelection = (next: string[]) => {
    if (!isSelectionControlled) setInnerSelection(next);
    onSelectionChange?.(next);
  };

  const toggleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    const direction: SortDirection = sort?.key === key && sort.direction === 'asc' ? 'desc' : 'asc';

    if (!isSortControlled) setInnerSort({ key, direction });
    onSortChange?.(key, direction);
  };

  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div
      className={cx('overflow-x-auto', bordered && 'rounded-box border border-base-content/10')}
      style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}
    >
      <table
        ref={ref}
        className={cx(
          'table',
          SIZE[size],
          zebra && 'table-zebra',
          pinRows && 'table-pin-rows',
          pinCols && 'table-pin-cols',
          className,
        )}
        {...props}
      >
        {showHeader && (
          <thead>
            <tr>
              {selectable && (
                <th className="w-px">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={allSelected}
                    onChange={() => applySelection(allSelected ? [] : allKeys)}
                    aria-label="전체 선택"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cx(
                    column.align && ALIGN[column.align],
                    column.sortable && 'cursor-pointer select-none',
                  )}
                  aria-sort={
                    sort?.key === column.key
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : undefined
                  }
                  onClick={() => toggleSort(column.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.label}
                    {column.sortable &&
                      (sort?.key === column.key ? (
                        <Icon name={sort.direction === 'asc' ? 'chevron-up' : 'chevron-down'} size="1em" />
                      ) : (
                        <Icon name="arrow-up-down" size="1em" className="opacity-40" />
                      ))}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {loading && (
            <tr>
              <td colSpan={colSpan} className="text-center">
                <span className="loading loading-spinner loading-md" />
              </td>
            </tr>
          )}

          {!loading && sortedData.length === 0 && (
            <tr>
              <td colSpan={colSpan} className="text-center opacity-60">
                {emptyText}
              </td>
            </tr>
          )}

          {!loading &&
            sortedData.map((row, index) => {
              const key = String(rowKey(row, index));
              const isSelected = selection.includes(key);

              return (
                <tr
                  key={key}
                  className={cx(
                    hoverable && 'hover:bg-base-300',
                    isSelected && 'bg-base-200',
                    onRowClick && 'cursor-pointer',
                    rowClassName?.(row, index),
                  )}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {selectable && (
                    <td className="w-px">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={isSelected}
                        onChange={() =>
                          applySelection(
                            isSelected ? selection.filter((k) => k !== key) : [...selection, key],
                          )
                        }
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`${index + 1}행 선택`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={cx(column.align && ALIGN[column.align])}>
                      {column.render
                        ? column.render((row as Record<string, unknown>)[column.key], row, index)
                        : String((row as Record<string, unknown>)[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>

        {footer && (
          <tfoot>
            <tr>
              <td colSpan={colSpan}>{footer}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

/**
 * `forwardRef`는 제네릭을 잃어버려 `TableProps<unknown>`으로 굳어버린다.
 * 그래서 감싼 뒤 원래의 제네릭 시그니처로 되돌린다 — 이렇게 해야 소비자가
 * `Table<Member>`처럼 행 타입을 유지할 수 있고, 스토리에서 캐스팅이 필요 없다.
 */
const TableWithRef = forwardRef(TableImpl);
TableWithRef.displayName = 'Table';

export const Table = TableWithRef as <T = Record<string, unknown>>(
  props: TableProps<T> & React.RefAttributes<HTMLTableElement>,
) => React.ReactElement | null;

export default Table;
