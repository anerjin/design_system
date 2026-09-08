import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './Dropdown';
import type { DropdownItem, DropdownPlacement } from './Dropdown';
import { Avatar } from './Avatar';
import { Button } from './Button';
import type { Size } from './utils';

const PLACEMENTS: DropdownPlacement[] = ['top', 'bottom', 'left', 'right'];
const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const items: DropdownItem[] = [
  { key: 'profile', label: '프로필', icon: <Icon name="user-round" size="1em" /> },
  { key: 'settings', label: '설정', icon: <Icon name="settings" size="1em" /> },
  { key: 'd1', type: 'divider' },
  { key: 'logout', label: '로그아웃', icon: <Icon name="log-out" size="1em" /> },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Actions/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    gallery: {
      description: '트리거를 누르면 펼쳐지는 메뉴. :focus-within으로 동작해 바깥 클릭 감지가 필요 없다.',
      daisyui: 'dropdown',
      props: [
        { name: 'label', type: 'ReactNode', description: '트리거에 표시할 내용' },
        { name: 'items', type: 'DropdownItem[]', description: "type으로 'divider'·'title' 지정" },
        { name: 'placement', type: 'top | bottom | left | right', defaultValue: 'bottom' },
        { name: 'align', type: 'start | center | end' },
        { name: 'hover', type: 'boolean', defaultValue: 'false', description: '마우스를 올리면 열린다' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: PLACEMENTS },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end'] },
    size: { control: 'select', options: SIZES },
    hover: { control: 'boolean' },
    open: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: '메뉴', items },
};

/** 스크린샷으로 보기 위해 열어 둔 상태 */
export const Opened: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="h-64">
      <Dropdown label="메뉴" items={items} open />
    </div>
  ),
};

export const Placements: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex flex-wrap gap-4 py-24">
      {PLACEMENTS.map((placement) => (
        <Dropdown key={placement} label={placement} items={items.slice(0, 2)} placement={placement} />
      ))}
    </div>
  ),
};

/** 구획 제목과 구분선 */
export const Sections: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="h-96">
      <Dropdown
        label="계정"
        open
        menuClassName="w-64"
        items={[
          { key: 't1', type: 'title', label: '내 계정' },
          { key: 'profile', label: '프로필', icon: <Icon name="user-round" size="1em" />, active: true },
          { key: 'billing', label: '결제', icon: <Icon name="credit-card" size="1em" /> },
          { key: 'd1', type: 'divider' },
          { key: 't2', type: 'title', label: '팀' },
          { key: 'members', label: '멤버 관리', icon: <Icon name="users" size="1em" /> },
          {
            key: 'invite',
            label: '초대 (권한 없음)',
            icon: <Icon name="user-round-plus" size="1em" />,
            disabled: true,
          },
          { key: 'd2', type: 'divider' },
          { key: 'logout', label: '로그아웃', icon: <Icon name="log-out" size="1em" /> },
        ]}
      />
    </div>
  ),
};

/** 트리거를 직접 구성한다 */
export const CustomTrigger: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex gap-4">
      <Dropdown
        items={items}
        trigger={
          <div tabIndex={0} role="button">
            <Avatar initials="김" color="primary" size="sm" />
          </div>
        }
      />
      <Dropdown
        items={items}
        align="end"
        trigger={
          <Button tabIndex={0} variant="ghost" shape="circle" aria-label="더보기">
            <Icon name="ellipsis-vertical" size="1em" />
          </Button>
        }
      />
    </div>
  ),
};

export const HoverToOpen: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="h-64">
      <Dropdown label="마우스를 올려보세요" items={items} hover />
    </div>
  ),
};
