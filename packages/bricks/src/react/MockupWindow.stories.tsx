import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockupWindow } from './Mockup';
import { Menu } from './Menu';
import { Table } from './Table';
import type { TableColumn } from './Table';

const meta: Meta<typeof MockupWindow> = {
  title: 'Mockup/Window',
  component: MockupWindow,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '데스크톱 창 틀. 주소 표시줄이 없는 앱 화면에 쓴다.',
      daisyui: 'mockup-window',
      props: [{ name: 'bordered', type: 'boolean', defaultValue: 'true' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    bordered: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupWindow className="w-full max-w-2xl">
      <div className="grid h-64 place-content-center bg-base-200">창 안의 내용</div>
    </MockupWindow>
  ),
};

export const Borderless: Story = {
  render: () => (
    <MockupWindow bordered={false} className="w-full max-w-2xl bg-base-200">
      <div className="grid h-64 place-content-center">테두리 없음</div>
    </MockupWindow>
  ),
};

/** 데스크톱 앱 화면을 표현한다 */
export const AppLayout: Story = {
  render: () => (
    <MockupWindow className="w-full max-w-3xl">
      <div className="flex h-72">
        <Menu
          size="sm"
          className="w-44 bg-base-200"
          items={[
            { id: 'all', label: '전체', href: '#', active: true, icon: <Icon name="list" size="1em" /> },
            { id: 'mine', label: '내 항목', href: '#', icon: <Icon name="user-round" size="1em" /> },
            { id: 'trash', label: '휴지통', href: '#', icon: <Icon name="trash-2" size="1em" /> },
          ]}
        />
        <div className="flex-1 overflow-auto p-4">
          <Table
            size="sm"
            zebra
            columns={
              [
                { key: 'name', label: '이름' },
                { key: 'size', label: '크기', align: 'right' },
              ] as TableColumn[]
            }
            data={[
              { name: 'report.pdf', size: '2.4MB' },
              { name: 'design.fig', size: '18MB' },
              { name: 'notes.md', size: '4KB' },
            ]}
          />
        </div>
      </div>
    </MockupWindow>
  ),
};
