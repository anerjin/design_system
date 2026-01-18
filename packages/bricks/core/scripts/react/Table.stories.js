import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from './Table';
import { Badge } from './Badge';
import { Button } from './Button';
import { Icon } from './Icon';
const meta = {
    title: 'Data Display/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'striped', 'hover'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};
export default meta;
const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Management', status: 'inactive', joinDate: '2022-11-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-03-05' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'QA Engineer', department: 'Engineering', status: 'pending', joinDate: '2023-04-01' },
];
const columns = [
    {
        key: 'name',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'role',
        label: 'Role',
        sortable: true,
    },
    {
        key: 'department',
        label: 'Department',
        sortable: true,
    },
    {
        key: 'status',
        label: 'Status',
        render: (status) => {
            const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'secondary';
            return _jsx(Badge, { variant: variant, size: "sm", children: status });
        },
    },
    {
        key: 'joinDate',
        label: 'Join Date',
        sortable: true,
    },
];
export const Default = {
    args: {
        columns,
        data: sampleData,
    },
};
export const Variants = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '40px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Default" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), variant: "default" })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Bordered" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), variant: "bordered" })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Striped" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), variant: "striped" })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Hover" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), variant: "hover" })] })] })),
};
export const Sizes = {
    render: () => (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '40px' }, children: [_jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Small" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), size: "sm" })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Medium" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), size: "md" })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginBottom: '10px' }, children: "Large" }), _jsx(Table, { columns: columns, data: sampleData.slice(0, 3), size: "lg" })] })] })),
};
export const WithSelection = {
    render: () => {
        const [selectedKeys, setSelectedKeys] = useState([]);
        return (_jsxs("div", { children: [_jsxs("div", { style: { marginBottom: '10px' }, children: ["Selected: ", selectedKeys.length, " row(s)"] }), _jsx(Table, { columns: columns, data: sampleData, selectable: true, selectedRowKeys: selectedKeys, onSelectionChange: setSelectedKeys, rowKey: (row) => String(row.id) })] }));
    },
};
export const Sortable = {
    render: () => {
        return (_jsx(Table, { columns: columns, data: sampleData, sortConfig: { key: 'name', direction: 'asc' } }));
    },
};
export const Loading = {
    args: {
        columns,
        data: [],
        loading: true,
    },
};
export const Empty = {
    args: {
        columns,
        data: [],
        emptyText: 'No data available',
    },
};
export const CustomEmptyState = {
    args: {
        columns,
        data: [],
        emptyText: (_jsxs("div", { style: { padding: '40px', textAlign: 'center' }, children: [_jsx(Icon, { name: "inbox", size: 48, color: "#ccc" }), _jsx("p", { style: { marginTop: '10px', color: '#666' }, children: "No records found" }), _jsx(Button, { size: "sm", variant: "primary", style: { marginTop: '10px' }, children: "Add New Record" })] })),
    },
};
export const WithActions = {
    args: {
        columns: [
            ...columns,
            {
                key: 'actions',
                label: 'Actions',
                align: 'center',
                render: (_, row) => (_jsxs("div", { style: { display: 'flex', gap: '4px', justifyContent: 'center' }, children: [_jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Icon, { name: "edit", size: 16 }) }), _jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Icon, { name: "trash", size: 16 }) })] })),
            },
        ],
        data: sampleData,
    },
};
export const StickyHeader = {
    render: () => {
        const longData = [...sampleData, ...sampleData, ...sampleData, ...sampleData];
        return (_jsx(Table, { columns: columns, data: longData, stickyHeader: true, maxHeight: 400 }));
    },
};
export const ClickableRows = {
    render: () => {
        return (_jsx(Table, { columns: columns, data: sampleData, onRowClick: (row) => alert(`Clicked: ${row.name}`) }));
    },
};
export const CustomColumnWidth = {
    args: {
        columns: [
            { key: 'id', label: 'ID', width: '60px' },
            { key: 'name', label: 'Name', width: '200px' },
            { key: 'email', label: 'Email', width: '250px' },
            { key: 'role', label: 'Role' },
            { key: 'status', label: 'Status', width: '100px' },
        ],
        data: sampleData,
        fixed: true,
    },
};
export const WithFooter = {
    args: {
        columns,
        data: sampleData,
        footer: (_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsxs("span", { children: ["Total: ", sampleData.length, " records"] }), _jsx(Button, { size: "sm", variant: "primary", children: "Export Data" })] })),
    },
};
export const ComplexExample = {
    render: () => {
        const [selectedKeys, setSelectedKeys] = useState([]);
        const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
        const products = [
            { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 45, rating: 4.5, sales: 234 },
            { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29, stock: 152, rating: 4.2, sales: 892 },
            { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 49, stock: 78, rating: 4.7, sales: 456 },
            { id: 4, name: 'Monitor 4K', category: 'Electronics', price: 699, stock: 23, rating: 4.8, sales: 123 },
            { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 149, stock: 67, rating: 4.6, sales: 345 },
            { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79, stock: 0, rating: 4.1, sales: 678 },
            { id: 7, name: 'Desk Lamp', category: 'Office', price: 39, stock: 89, rating: 4.3, sales: 234 },
            { id: 8, name: 'Chair Ergonomic', category: 'Office', price: 399, stock: 12, rating: 4.4, sales: 89 },
        ];
        const productColumns = [
            {
                key: 'name',
                label: 'Product',
                sortable: true,
                render: (name, row) => (_jsxs("div", { children: [_jsx("div", { style: { fontWeight: '500' }, children: name }), _jsx("div", { style: { fontSize: '12px', color: '#666' }, children: row.category })] })),
            },
            {
                key: 'price',
                label: 'Price',
                align: 'right',
                sortable: true,
                render: (price) => `$${price.toFixed(2)}`,
            },
            {
                key: 'stock',
                label: 'Stock',
                align: 'center',
                sortable: true,
                render: (stock) => (_jsx(Badge, { variant: stock === 0 ? 'danger' : stock < 20 ? 'warning' : 'success', size: "sm", children: stock === 0 ? 'Out of Stock' : stock })),
            },
            {
                key: 'rating',
                label: 'Rating',
                align: 'center',
                sortable: true,
                render: (rating) => (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }, children: [_jsx(Icon, { name: "star", size: 14 }), _jsx("span", { children: rating })] })),
            },
            {
                key: 'sales',
                label: 'Sales',
                align: 'right',
                sortable: true,
                render: (sales) => sales.toLocaleString(),
            },
            {
                key: 'actions',
                label: '',
                align: 'center',
                width: '100px',
                render: () => (_jsxs("div", { style: { display: 'flex', gap: '4px', justifyContent: 'center' }, children: [_jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Icon, { name: "edit", size: 16 }) }), _jsx(Button, { size: "sm", variant: "ghost", children: _jsx(Icon, { name: "trash", size: 16 }) })] })),
            },
        ];
        return (_jsxs("div", { children: [_jsxs("div", { style: {
                        marginBottom: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }, children: [_jsx("h2", { style: { margin: 0 }, children: "Product Inventory" }), _jsxs("div", { style: { display: 'flex', gap: '8px' }, children: [selectedKeys.length > 0 && (_jsxs(Button, { variant: "secondary", size: "sm", children: ["Delete (", selectedKeys.length, ")"] })), _jsxs(Button, { variant: "primary", size: "sm", children: [_jsx(Icon, { name: "plus" }), " Add Product"] })] })] }), _jsx(Table, { columns: productColumns, data: products, variant: "hover", selectable: true, selectedRowKeys: selectedKeys, onSelectionChange: setSelectedKeys, rowKey: (row) => String(row.id), sortConfig: sortConfig, onSortChange: (key, direction) => setSortConfig({ key, direction }) })] }));
    },
};
//# sourceMappingURL=Table.stories.js.map