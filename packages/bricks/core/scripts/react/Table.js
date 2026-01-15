import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useState, useMemo, useRef, useEffect } from 'react';
import { Icon } from './Icon';
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
export const Table = forwardRef(({ columns, data, variant = 'default', size = 'md', showHeader = true, selectable = false, selectedRowKeys = [], onSelectionChange, rowKey = (_, index) => index, loading = false, emptyText = 'No data', sortConfig, onSortChange, responsive = true, fixed = false, stickyHeader = false, maxHeight, onRowClick, rowClassName, footer, className, ...props }, ref) => {
    const [internalSelection, setInternalSelection] = useState(selectedRowKeys);
    const [internalSort, setInternalSort] = useState(sortConfig);
    const selectAllRef = useRef(null);
    const selection = onSelectionChange ? selectedRowKeys : internalSelection;
    const sortedData = useMemo(() => {
        if (!internalSort)
            return data;
        const column = columns.find(col => col.key === internalSort.key);
        if (!column)
            return data;
        const sorted = [...data].sort((a, b) => {
            if (column.sortFn) {
                return column.sortFn(a, b);
            }
            const aVal = a[column.key];
            const bVal = b[column.key];
            if (aVal === bVal)
                return 0;
            if (aVal === null || aVal === undefined)
                return 1;
            if (bVal === null || bVal === undefined)
                return -1;
            if (typeof aVal === 'string') {
                return aVal.localeCompare(bVal);
            }
            return aVal < bVal ? -1 : 1;
        });
        return internalSort.direction === 'desc' ? sorted.reverse() : sorted;
    }, [data, columns, internalSort]);
    const handleSort = (columnKey) => {
        const column = columns.find(col => col.key === columnKey);
        if (!column?.sortable)
            return;
        const newDirection = internalSort?.key === columnKey && internalSort.direction === 'asc'
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
        }
        else {
            setInternalSelection(newSelection);
        }
    };
    const handleSelectRow = (key) => {
        const newSelection = selection.includes(key)
            ? selection.filter(k => k !== key)
            : [...selection, key];
        if (onSelectionChange) {
            onSelectionChange(newSelection);
        }
        else {
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
    const containerStyle = maxHeight ? {
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
    return (_jsx("div", { className: "table-container", style: containerStyle, children: _jsxs("table", { ref: ref, className: tableClasses, ...props, children: [showHeader && (_jsx("thead", { className: "table__head", children: _jsxs("tr", { className: "table__row", children: [selectable && (_jsx("th", { className: "table__header table__header--checkbox", children: _jsx("input", { ref: selectAllRef, type: "checkbox", className: "table__checkbox", checked: allSelected, onChange: handleSelectAll, "aria-label": "Select all rows" }) })), columns.map(column => (_jsx("th", { className: [
                                    'table__header',
                                    column.align ? `table__header--${column.align}` : '',
                                    column.sortable ? 'table__header--sortable' : '',
                                    column.sticky ? 'table__header--sticky' : ''
                                ].filter(Boolean).join(' '), style: { width: column.width }, onClick: () => column.sortable && handleSort(column.key), children: _jsxs("div", { className: "table__header-content", children: [_jsx("span", { children: column.label }), column.sortable && (_jsx("span", { className: "table__sort-icon", children: internalSort?.key === column.key ? (_jsx(Icon, { name: internalSort.direction === 'asc' ? 'chevron-up' : 'chevron-down', size: 16 })) : (_jsx(Icon, { name: "sort", size: 16 })) }))] }) }, column.key)))] }) })), _jsx("tbody", { className: "table__body", children: loading ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "table__cell table__cell--loading", children: _jsxs("div", { className: "table__loading", children: [_jsx(Icon, { name: "loader-alt", className: "bx-spin" }), " Loading..."] }) }) })) : sortedData.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "table__cell table__cell--empty", children: emptyText }) })) : (sortedData.map((row, rowIndex) => {
                        const key = String(rowKey(row, rowIndex));
                        const isSelected = selection.includes(key);
                        const customClassName = rowClassName?.(row, rowIndex);
                        return (_jsxs("tr", { className: [
                                'table__row',
                                isSelected ? 'table__row--selected' : '',
                                onRowClick ? 'table__row--clickable' : '',
                                customClassName
                            ].filter(Boolean).join(' '), onClick: () => onRowClick?.(row, rowIndex), children: [selectable && (_jsx("td", { className: "table__cell table__cell--checkbox", children: _jsx("input", { type: "checkbox", className: "table__checkbox", checked: isSelected, onChange: () => handleSelectRow(key), onClick: (e) => e.stopPropagation(), "aria-label": `Select row ${rowIndex + 1}` }) })), columns.map(column => (_jsx("td", { className: [
                                        'table__cell',
                                        column.align ? `table__cell--${column.align}` : '',
                                        column.sticky ? 'table__cell--sticky' : ''
                                    ].filter(Boolean).join(' '), children: column.render
                                        ? column.render(row[column.key], row, rowIndex)
                                        : row[column.key] }, column.key)))] }, key));
                    })) }), footer && (_jsx("tfoot", { className: "table__foot", children: _jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "table__footer", children: footer }) }) }))] }) }));
});
Table.displayName = 'Table';
export default Table;
//# sourceMappingURL=Table.js.map