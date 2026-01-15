import React from 'react';
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
export declare const Table: React.ForwardRefExoticComponent<TableProps<any> & React.RefAttributes<HTMLTableElement>>;
export default Table;
//# sourceMappingURL=Table.d.ts.map