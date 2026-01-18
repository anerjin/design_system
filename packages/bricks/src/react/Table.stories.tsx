import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Table, TableColumn } from './Table';
import { Badge } from './Badge';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Table> = {
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
type Story = StoryObj<typeof meta>;

interface Person {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const sampleData: Person[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', department: 'Design', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', department: 'Management', status: 'inactive', joinDate: '2022-11-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Developer', department: 'Engineering', status: 'active', joinDate: '2023-03-05' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'QA Engineer', department: 'Engineering', status: 'pending', joinDate: '2023-04-01' },
];

const columns: TableColumn<Person>[] = [
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
    render: (status: string) => {
      const variant = status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'secondary';
      return <Badge variant={variant} size="sm">{status}</Badge>;
    },
  },
  {
    key: 'joinDate',
    label: 'Join Date',
    sortable: true,
  },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Default</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} variant="default" />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Bordered</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} variant="bordered" />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Striped</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} variant="striped" />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Hover</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} variant="hover" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Small</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="sm" />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Medium</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="md" />
      </div>
      <div>
        <h3 style={{ marginBottom: '10px' }}>Large</h3>
        <Table columns={columns} data={sampleData.slice(0, 3)} size="lg" />
      </div>
    </div>
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    return (
      <div>
        <div style={{ marginBottom: '10px' }}>
          Selected: {selectedKeys.length} row(s)
        </div>
        <Table
          columns={columns}
          data={sampleData}
          selectable
          selectedRowKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rowKey={(row) => String(row.id)}
        />
      </div>
    );
  },
};

export const Sortable: Story = {
  render: () => {
    return (
      <Table
        columns={columns}
        data={sampleData}
        sortConfig={{ key: 'name', direction: 'asc' }}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyText: 'No data available',
  },
};

export const CustomEmptyState: Story = {
  args: {
    columns,
    data: [],
    emptyText: (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Icon name="inbox" size={48} color="#ccc" />
        <p style={{ marginTop: '10px', color: '#666' }}>No records found</p>
        <Button size="sm" variant="primary" style={{ marginTop: '10px' }}>
          Add New Record
        </Button>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    columns: [
      ...columns,
      {
        key: 'actions',
        label: 'Actions',
        align: 'center',
        render: (_: any, row: Person) => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <Button size="sm" variant="ghost">
              <Icon name="edit" size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="trash" size={16} />
            </Button>
          </div>
        ),
      },
    ],
    data: sampleData,
  },
};

export const StickyHeader: Story = {
  render: () => {
    const longData = [...sampleData, ...sampleData, ...sampleData, ...sampleData];
    return (
      <Table
        columns={columns}
        data={longData}
        stickyHeader
        maxHeight={400}
      />
    );
  },
};

export const ClickableRows: Story = {
  render: () => {
    return (
      <Table
        columns={columns}
        data={sampleData}
        onRowClick={(row) => alert(`Clicked: ${row.name}`)}
      />
    );
  },
};

export const CustomColumnWidth: Story = {
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

export const WithFooter: Story = {
  args: {
    columns,
    data: sampleData,
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Total: {sampleData.length} records</span>
        <Button size="sm" variant="primary">Export Data</Button>
      </div>
    ),
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' as const });

    interface Product {
      id: number;
      name: string;
      category: string;
      price: number;
      stock: number;
      rating: number;
      sales: number;
    }

    const products: Product[] = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 45, rating: 4.5, sales: 234 },
      { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29, stock: 152, rating: 4.2, sales: 892 },
      { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 49, stock: 78, rating: 4.7, sales: 456 },
      { id: 4, name: 'Monitor 4K', category: 'Electronics', price: 699, stock: 23, rating: 4.8, sales: 123 },
      { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 149, stock: 67, rating: 4.6, sales: 345 },
      { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79, stock: 0, rating: 4.1, sales: 678 },
      { id: 7, name: 'Desk Lamp', category: 'Office', price: 39, stock: 89, rating: 4.3, sales: 234 },
      { id: 8, name: 'Chair Ergonomic', category: 'Office', price: 399, stock: 12, rating: 4.4, sales: 89 },
    ];

    const productColumns: TableColumn<Product>[] = [
      {
        key: 'name',
        label: 'Product',
        sortable: true,
        render: (name: string, row: Product) => (
          <div>
            <div style={{ fontWeight: '500' }}>{name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{row.category}</div>
          </div>
        ),
      },
      {
        key: 'price',
        label: 'Price',
        align: 'right',
        sortable: true,
        render: (price: number) => `$${price.toFixed(2)}`,
      },
      {
        key: 'stock',
        label: 'Stock',
        align: 'center',
        sortable: true,
        render: (stock: number) => (
          <Badge
            variant={stock === 0 ? 'danger' : stock < 20 ? 'warning' : 'success'}
            size="sm"
          >
            {stock === 0 ? 'Out of Stock' : stock}
          </Badge>
        ),
      },
      {
        key: 'rating',
        label: 'Rating',
        align: 'center',
        sortable: true,
        render: (rating: number) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            <Icon name="star" size={14} />
            <span>{rating}</span>
          </div>
        ),
      },
      {
        key: 'sales',
        label: 'Sales',
        align: 'right',
        sortable: true,
        render: (sales: number) => sales.toLocaleString(),
      },
      {
        key: 'actions',
        label: '',
        align: 'center',
        width: '100px',
        render: () => (
          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
            <Button size="sm" variant="ghost">
              <Icon name="edit" size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Icon name="trash" size={16} />
            </Button>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>Product Inventory</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedKeys.length > 0 && (
              <Button variant="secondary" size="sm">
                Delete ({selectedKeys.length})
              </Button>
            )}
            <Button variant="primary" size="sm">
              <Icon name="plus" /> Add Product
            </Button>
          </div>
        </div>
        <Table
          columns={productColumns}
          data={products}
          variant="hover"
          selectable
          selectedRowKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rowKey={(row) => String(row.id)}
          sortConfig={sortConfig}
          onSortChange={(key, direction) => setSortConfig({ key, direction })}
        />
      </div>
    );
  },
};