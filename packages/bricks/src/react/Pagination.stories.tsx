import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';
import type { Color, Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const COLORS: Color[] = [
  'neutral', 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error',
];

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '페이지 이동. daisyUI에 전용 클래스가 없어 join으로 버튼을 묶는다.',
      daisyui: 'join',
      props: [
        { name: 'currentPage', type: 'number', description: '1부터 시작' },
        { name: 'totalPages', type: 'number' },
        { name: 'onPageChange', type: '(page: number) => void' },
        { name: 'showFirstLast', type: 'boolean', defaultValue: 'false' },
        { name: 'showJumpTo', type: 'boolean', defaultValue: 'false', description: '페이지 직접 입력' },
        { name: 'color', type: 'neutral | primary | … | error', defaultValue: 'primary', description: '현재 페이지 색' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    showFirstLast: { control: 'boolean' },
    showPrevNext: { control: 'boolean' },
    showEllipsis: { control: 'boolean' },
    showPageInfo: { control: 'boolean' },
    showJumpTo: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제로 눌러 페이지가 바뀌는지 확인할 수 있다 */
export const Default: Story = {
  render: function DefaultStory(args) {
    const [page, setPage] = useState(3);
    return <Pagination {...args} currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {SIZES.map((size) => (
        <Pagination
          key={size}
          size={size}
          align="start"
          currentPage={3}
          totalPages={10}
          onPageChange={() => {}}
        />
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {COLORS.map((color) => (
        <Pagination
          key={color}
          color={color}
          size="sm"
          align="start"
          currentPage={3}
          totalPages={7}
          onPageChange={() => {}}
        />
      ))}
    </div>
  ),
};

export const WithFirstLast: Story = {
  render: function FirstLastStory() {
    const [page, setPage] = useState(12);
    return (
      <Pagination
        showFirstLast
        currentPage={page}
        totalPages={25}
        onPageChange={setPage}
      />
    );
  },
};

export const WithInfoAndJump: Story = {
  render: function InfoStory() {
    const [page, setPage] = useState(5);
    return (
      <Pagination
        showPageInfo
        showJumpTo
        showFirstLast
        currentPage={page}
        totalPages={40}
        onPageChange={setPage}
      />
    );
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['start', 'center', 'end'] as const).map((align) => (
        <Pagination
          key={align}
          align={align}
          size="sm"
          currentPage={2}
          totalPages={5}
          onPageChange={() => {}}
        />
      ))}
    </div>
  ),
};

export const FewPages: Story = {
  render: () => (
    <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Pagination disabled currentPage={3} totalPages={10} onPageChange={() => {}} />
  ),
};
