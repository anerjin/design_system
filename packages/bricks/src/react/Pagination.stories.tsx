import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['default', 'rounded', 'circle'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={20}
        onPageChange={setCurrentPage}
        showFirstLast
      />
    );
  },
};

export const WithPageInfo: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(3);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={15}
        onPageChange={setCurrentPage}
        showPageInfo
      />
    );
  },
};

export const WithJumpTo: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={50}
        onPageChange={setCurrentPage}
        showJumpTo
        showFirstLast
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Pagination
          currentPage={page1}
          totalPages={10}
          onPageChange={setPage1}
          size="sm"
        />
        <Pagination
          currentPage={page2}
          totalPages={10}
          onPageChange={setPage2}
          size="md"
        />
        <Pagination
          currentPage={page3}
          totalPages={10}
          onPageChange={setPage3}
          size="lg"
        />
      </div>
    );
  },
};

export const Shapes: Story = {
  render: () => {
    const [page1, setPage1] = useState(5);
    const [page2, setPage2] = useState(5);
    const [page3, setPage3] = useState(5);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Pagination
          currentPage={page1}
          totalPages={10}
          onPageChange={setPage1}
          shape="default"
        />
        <Pagination
          currentPage={page2}
          totalPages={10}
          onPageChange={setPage2}
          shape="rounded"
        />
        <Pagination
          currentPage={page3}
          totalPages={10}
          onPageChange={setPage3}
          shape="circle"
        />
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [page1, setPage1] = useState(3);
    const [page2, setPage2] = useState(3);
    const [page3, setPage3] = useState(3);
    const [page4, setPage4] = useState(3);
    const [page5, setPage5] = useState(3);
    const [page6, setPage6] = useState(3);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Pagination currentPage={page1} totalPages={10} onPageChange={setPage1} variant="primary" />
        <Pagination currentPage={page2} totalPages={10} onPageChange={setPage2} variant="secondary" />
        <Pagination currentPage={page3} totalPages={10} onPageChange={setPage3} variant="success" />
        <Pagination currentPage={page4} totalPages={10} onPageChange={setPage4} variant="danger" />
        <Pagination currentPage={page5} totalPages={10} onPageChange={setPage5} variant="warning" />
        <Pagination currentPage={page6} totalPages={10} onPageChange={setPage6} variant="info" />
      </div>
    );
  },
};

export const ManyPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(50);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={100}
        onPageChange={setCurrentPage}
        showFirstLast
        visiblePages={7}
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />
    );
  },
};

export const NoEllipsis: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        showEllipsis={false}
        visiblePages={10}
      />
    );
  },
};

export const CustomLabels: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(5);
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={setCurrentPage}
        showFirstLast
        prevLabel="Prev"
        nextLabel="Next"
        firstLabel="<<"
        lastLabel=">>"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={() => {}}
        disabled
      />
    );
  },
};

export const CompleteExample: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = 248;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div style={{ width: '600px' }}>
        <div style={{
          padding: '20px',
          background: '#f5f5f5',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Product List</h3>
          <p style={{ margin: '0 0 10px 0', color: '#666' }}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} products
          </p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[...Array(itemsPerPage)].map((_, i) => (
              <div key={i} style={{
                padding: '10px',
                background: 'white',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}>
                Product {(currentPage - 1) * itemsPerPage + i + 1}
              </div>
            ))}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showFirstLast
          showPageInfo
          showJumpTo
        />
      </div>
    );
  },
};