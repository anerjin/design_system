import React, { forwardRef, useState, useMemo, useRef, useEffect } from 'react';
import { Icon } from './Icon';

export interface TableColumn<T = any> {
  /**
   * Unique key for the column
   */
  key: string;

  /**
   * Column header label
   */
  label: React.ReactNode;

  /**
   * Width of the column
   */
  width?: string | number;

  /**
   * Alignment of column content
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Whether the column is sortable
   */
  sortable?: boolean;

  /**
   * Custom render function for cell content
   */
  render?: (value: any, row: T, index: number) => React.ReactNode;

  /**
   * Custom sort function
   */
  sortFn?: (a: T, b: T) => number;

  /**
   * Whether the column is sticky
   */
  sticky?: boolean;
}

export interface TableProps<T = any> {
  /**
   * Table columns configuration
   */
  columns: TableColumn<T>[];

  /**
   * Table data
   */
  data: T[];

  /**
   * Table variant
   * @default 'default'
   */
  variant?: 'default' | 'bordered' | 'striped' | 'hover';

  /**
   * Table size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show table header
   * @default true
   */
  showHeader?: boolean;

  /**
   * Whether rows are selectable
   * @default false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedRowKeys?: string[];

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selectedKeys: string[]) => void;

  /**
   * Row key extractor
   * @default (row, index) => index
   */
  rowKey?: (row: T, index: number) => string | number;

  /**
   * Whether table is loading
   * @default false
   */
  loading?: boolean;

  /**
   * Empty state message
   * @default 'No data'
   */
  emptyText?: React.ReactNode;

  /**
   * Sort configuration
   */
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };

  /**
   * Callback when sort changes
   */
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;

  /**
   * Whether table is responsive
   * @default true
   */
  responsive?: boolean;

  /**
   * Fixed table layout
   * @default false
   */
  fixed?: boolean;

  /**
   * Sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Max height for scrollable table
   */
  maxHeight?: string | number;

  /**
   * Row click handler
   */
  onRowClick?: (row: T, index: number) => void;

  /**
   * Custom row className
   */
  rowClassName?: (row: T, index: number) => string;

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * BRICKS Table Component
 *
 * @example
 * ```tsx
 * <Table
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'age', label: 'Age', sortable: true }
 *   ]}
 *   data={[
 *     { name: 'John', age: 30 },
 *     { name: 'Jane', age: 25 }
 *   ]}
 * />
 * ```
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(({
  columns,
  data,
  variant = 'default',
  size = 'md',
  showHeader = true,
  selectable = false,
  selectedRowKeys = [],
  onSelectionChange,
  rowKey = (_, index) => index,
  loading = false,
  emptyText = 'No data',
  sortConfig,
  onSortChange,
  responsive = true,
  fixed = false,
  stickyHeader = false,
  maxHeight,
  onRowClick,
  rowClassName,
  footer,
  className,
  ...props
}, ref) => {
  const [internalSelection, setInternalSelection] = useState<string[]>(selectedRowKeys);
  const [internalSort, setInternalSort] = useState<{key: string; direction: 'asc' | 'desc'} | undefined>(sortConfig);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const selection = onSelectionChange ? selectedRowKeys : internalSelection;

  const sortedData = useMemo(() => {
    if (!internalSort) return data;

    const column = columns.find(col => col.key === internalSort.key);
    if (!column) return data;

    const sorted = [...data].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b);
      }

      const aVal = (a as any)[column.key];
      const bVal = (b as any)[column.key];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      return aVal < bVal ? -1 : 1;
    });

    return internalSort.direction === 'desc' ? sorted.reverse() : sorted;
  }, [data, columns, internalSort]);

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    const newDirection: 'asc' | 'desc' =
      internalSort?.key === columnKey && internalSort.direction === 'asc'
        ? 'desc'
        : 'asc';

    const newSortConfig = { key: columnKey, direction: newDirection };
    setInternalSort(newSortConfig);
    onSortChange?.(columnKey, newDirection);
  };

  const handleSelectAll = () => {
    const allKeys = data.map((row, index) => String(rowKey(row, index)));
    const newSelection = selection.length === allKeys.length ? [] : allKeys;

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelection(newSelection);
    }
  };

  const handleSelectRow = (key: string) => {
    const newSelection = selection.includes(key)
      ? selection.filter(k => k !== key)
      : [...selection, key];

    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelection(newSelection);
    }
  };

  const tableClasses = [
    'table',
    variant !== 'default' ? `table--${variant}` : '',
    size !== 'md' ? `table--${size}` : '',
    responsive ? 'table--responsive' : '',
    fixed ? 'table--fixed' : '',
    stickyHeader ? 'table--sticky-header' : '',
    loading ? 'table--loading' : '',
    className
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = maxHeight ? {
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    overflowY: 'auto'
  } : {};

  const allSelected = data.length > 0 && selection.length === data.length;
  const someSelected = selection.length > 0 && selection.length < data.length;

  // Set indeterminate state for checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  return (
    <div className="table-container" style={containerStyle}>
      <table ref={ref} className={tableClasses} {...props}>
        {showHeader && (
          <thead className="table__head">
            <tr className="table__row">
              {selectable && (
                <th className="table__header table__header--checkbox">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="table__checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map(column => (
                <th
                  key={column.key}
                  className={[
                    'table__header',
                    column.align ? `table__header--${column.align}` : '',
                    column.sortable ? 'table__header--sortable' : '',
                    column.sticky ? 'table__header--sticky' : ''
                  ].filter(Boolean).join(' ')}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="table__header-content">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <span className="table__sort-icon">
                        {internalSort?.key === column.key ? (
                          <Icon name={internalSort.direction === 'asc' ? 'chevron-up' : 'chevron-down'} size={16} />
                        ) : (
                          <Icon name="sort" size={16} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody className="table__body">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table__cell table__cell--loading">
                <div className="table__loading">
                  <Icon name="loader-alt" className="bx-spin" /> Loading...
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table__cell table__cell--empty">
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const key = String(rowKey(row, rowIndex));
              const isSelected = selection.includes(key);
              const customClassName = rowClassName?.(row, rowIndex);

              return (
                <tr
                  key={key}
                  className={[
                    'table__row',
                    isSelected ? 'table__row--selected' : '',
                    onRowClick ? 'table__row--clickable' : '',
                    customClassName
                  ].filter(Boolean).join(' ')}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {selectable && (
                    <td className="table__cell table__cell--checkbox">
                      <input
                        type="checkbox"
                        className="table__checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(key)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={[
                        'table__cell',
                        column.align ? `table__cell--${column.align}` : '',
                        column.sticky ? 'table__cell--sticky' : ''
                      ].filter(Boolean).join(' ')}
                    >
                      {column.render
                        ? column.render((row as any)[column.key], row, rowIndex)
                        : (row as any)[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>

        {footer && (
          <tfoot className="table__foot">
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="table__footer">
                {footer}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
});

Table.displayName = 'Table';

export default Table;