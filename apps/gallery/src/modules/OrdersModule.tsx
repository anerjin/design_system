import { useState } from 'react';
import { Badge, Icon, Input, Pagination, Select, Table, type TableColumn } from '@bricks/core';
interface Order {
  id: string;
  customer: string;
  product: string;
  status: string;
  amount: number;
}
const orders: Order[] = [
  { id: 'DOI-1048', customer: '김서준', product: '팀 플랜', status: '완료', amount: 89000 },
  { id: 'DOI-1047', customer: '이하윤', product: '스타터 플랜', status: '처리 중', amount: 29000 },
  { id: 'DOI-1046', customer: '박도윤', product: '팀 플랜', status: '완료', amount: 89000 },
  { id: 'DOI-1045', customer: '최지우', product: '워크스페이스 추가', status: '취소', amount: 15000 },
  { id: 'DOI-1044', customer: '정민서', product: '스타터 플랜', status: '완료', amount: 29000 },
  { id: 'DOI-1043', customer: '윤지호', product: '팀 플랜', status: '처리 중', amount: 89000 },
  { id: 'DOI-1042', customer: '한서연', product: '워크스페이스 추가', status: '완료', amount: 15000 },
];
const columns: TableColumn<Order>[] = [
  { key: 'id', label: '주문 번호' },
  { key: 'customer', label: '고객' },
  { key: 'product', label: '상품' },
  {
    key: 'status',
    label: '상태',
    render: (_value, row) => (
      <Badge
        size="sm"
        color={row.status === '처리 중' ? 'secondary' : undefined}
        variant={row.status === '처리 중' ? 'soft' : 'outline'}
      >
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'amount',
    label: '금액',
    align: 'right',
    render: (_value, row) => `₩${row.amount.toLocaleString()}`,
  },
];
export function OrdersModule() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('전체');
  const [page, setPage] = useState(1);
  const filtered = orders.filter(
    (order) =>
      (status === '전체' || order.status === status) &&
      `${order.id} ${order.customer} ${order.product}`.toLowerCase().includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="module-inline-fields">
        <Input
          size="sm"
          aria-label="주문 검색"
          placeholder="주문 번호 또는 고객 검색"
          leftIcon={<Icon name="search" size={16} />}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <Select
          size="sm"
          aria-label="주문 상태"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
          options={['전체', '완료', '처리 중', '취소'].map((value) => ({ value, label: value }))}
        />
      </div>
      <Table
        columns={columns}
        data={filtered.slice((page - 1) * 4, page * 4)}
        rowKey={(row) => row.id}
        bordered
        size="sm"
        emptyText="조건에 맞는 주문이 없습니다."
      />
      <div className="module-small" role="status">
        총 {filtered.length}건
      </div>
      {!!filtered.length && (
        <Pagination
          size="sm"
          currentPage={page}
          totalPages={Math.ceil(filtered.length / 4)}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
