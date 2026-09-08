import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import type { TableColumn } from './Table';
import { Badge } from './Badge';
import { Button } from './Button';
import { Avatar } from './Avatar';
import type { Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

interface Member {
  id: string;
  name: string;
  role: string;
  team: string;
  status: 'active' | 'invited' | 'disabled';
  commits: number;
}

const members: Member[] = [
  { id: '1', name: '김서준', role: '프론트엔드', team: '플랫폼', status: 'active', commits: 214 },
  { id: '2', name: '이하윤', role: '백엔드', team: '결제', status: 'active', commits: 187 },
  { id: '3', name: '박도윤', role: '디자이너', team: '플랫폼', status: 'invited', commits: 0 },
  { id: '4', name: '최지우', role: 'DevOps', team: '인프라', status: 'active', commits: 96 },
  { id: '5', name: '정민서', role: '기획', team: '결제', status: 'disabled', commits: 12 },
];

const STATUS_COLOR = {
  active: 'success',
  invited: 'warning',
  disabled: 'neutral',
} as const;

const columns: TableColumn<Member>[] = [
  {
    key: 'name',
    label: '이름',
    sortable: true,
    render: (_value, row) => (
      <div className="flex items-center gap-3">
        <Avatar initials={row.name.slice(1, 3)} size="xs" color="primary" />
        <span className="font-medium">{row.name}</span>
      </div>
    ),
  },
  { key: 'role', label: '역할', sortable: true },
  { key: 'team', label: '팀', sortable: true },
  {
    key: 'status',
    label: '상태',
    render: (_value, row) => (
      <Badge color={STATUS_COLOR[row.status]} variant="soft" size="sm">
        {row.status}
      </Badge>
    ),
  },
  { key: 'commits', label: '커밋', align: 'right', sortable: true },
];

/**
 * `Table`은 행 타입을 제네릭으로 유지한다. 그래서 `render(value, row)`의 `row`가
 * 그대로 `Member`로 좁혀지고, 스토리에서 캐스팅이 필요 없다.
 */
const meta: Meta<typeof Table<Member>> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '정렬·선택·고정 헤더를 갖춘 표. 행 타입이 제네릭으로 유지된다.',
      daisyui: 'table',
      props: [
        { name: 'columns', type: 'TableColumn<T>[]', description: 'key · label · align · sortable · render' },
        { name: 'data', type: 'T[]' },
        { name: 'zebra', type: 'boolean', defaultValue: 'false', description: '줄무늬 배경' },
        { name: 'selectable', type: 'boolean', defaultValue: 'false', description: '행 선택 체크박스' },
        { name: 'pinRows', type: 'boolean', defaultValue: 'false', description: '헤더 고정' },
        { name: 'loading', type: 'boolean', defaultValue: 'false' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    zebra: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    bordered: { control: 'boolean' },
    pinRows: { control: 'boolean' },
    selectable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { columns, data: members },
};

export const Zebra: Story = {
  args: { columns, data: members, zebra: true, bordered: true },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span className="text-xs opacity-60">{size}</span>
          <Table size={size} bordered columns={columns.slice(0, 3)} data={members.slice(0, 2)} />
        </div>
      ))}
    </div>
  ),
};

/** 헤더를 눌러 정렬한다 */
export const Sortable: Story = {
  args: { columns, data: members, zebra: true, hoverable: true },
};

export const Selectable: Story = {
  render: function SelectableStory() {
    const [selected, setSelected] = useState<string[]>(['2']);

    return (
      <div className="flex flex-col gap-3">
        <Table
          selectable
          hoverable
          bordered
          rowKey={(row) => row.id}
          selectedRowKeys={selected}
          onSelectionChange={setSelected}
          columns={columns}
          data={members}
        />
        <p className="text-sm opacity-60">선택된 행: {selected.join(', ') || '없음'}</p>
      </div>
    );
  },
};

export const Loading: Story = {
  args: { columns, data: [], loading: true, bordered: true },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    bordered: true,
    emptyText: '조건에 맞는 멤버가 없습니다',
  },
};

/** 스크롤해도 헤더가 붙어 있다 */
export const PinnedHeader: Story = {
  render: () => (
    <Table
      pinRows
      zebra
      bordered
      maxHeight={240}
      rowKey={(row) => row.id}
      columns={columns}
      data={[...members, ...members, ...members].map((m, i) => ({ ...m, id: String(i) }))}
    />
  ),
};

export const WithFooterAndActions: Story = {
  render: () => (
    <Table
      bordered
      hoverable
      rowKey={(row) => row.id}
      columns={[
        ...columns,
        {
          key: 'actions',
          label: '',
          align: 'right',
          render: () => (
            <div className="flex justify-end gap-1">
              <Button size="xs" variant="surface" shape="square" aria-label="수정">
                <Icon name="pencil" size="1em" />
              </Button>
              <Button size="xs" color="primary" shape="square" aria-label="삭제">
                <Icon name="trash-2" size="1em" />
              </Button>
            </div>
          ),
        },
      ]}
      data={members}
      footer={<span className="text-sm opacity-60">전체 {members.length}명</span>}
    />
  ),
};
