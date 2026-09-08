import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import type { MenuItem, MenuProps } from './Menu';
import type { Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const items: MenuItem[] = [
  { id: 'home', label: '홈', href: '#', icon: <Icon name="house" size="1em" />, active: true },
  {
    id: 'inbox',
    label: '받은편지함',
    icon: <Icon name="mail" size="1em" />,
    trailing: <span className="bricks-menu-count">12</span>,
  },
  { id: 'files', label: '파일', href: '#', icon: <Icon name="folder" size="1em" /> },
  { id: 'settings', label: '설정', href: '#', icon: <Icon name="settings" size="1em" />, disabled: true },
];

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '사이드바·드롭다운·가로 메뉴에 두루 쓰인다. 하위 항목은 details로 접힌다.',
      daisyui: 'menu',
      props: [
        { name: 'items', type: 'MenuItem[]', description: 'label · href · icon · trailing · children' },
        { name: 'direction', type: 'vertical | horizontal', defaultValue: 'vertical' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'md' },
        { name: 'title', type: 'ReactNode', description: '목록 맨 위 제목' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: SIZES },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function activeItem(source: MenuItem[]): string | undefined {
  for (const item of source) {
    if (item.active) return item.id;
    const nested = item.children && activeItem(item.children);
    if (nested) return nested;
  }
  return undefined;
}

function DemoMenu({
  items: source = items,
  onItemChange,
  ...props
}: MenuProps & {
  onItemChange?: (item: MenuItem) => void;
}) {
  const [selected, setSelected] = useState(() => activeItem(source));
  const connect = (list: MenuItem[]): MenuItem[] =>
    list.map((item) => ({
      ...item,
      href: undefined,
      active: selected === item.id,
      children: item.children && connect(item.children),
      onClick: () => {
        setSelected(item.id);
        onItemChange?.(item);
      },
    }));
  return <Menu {...props} items={connect(source)} />;
}

export const Default: Story = {
  args: { items, title: '워크스페이스', className: 'w-80' },
  render: (args) => <DemoMenu {...args} />,
};

export const Horizontal: Story = {
  args: { items, direction: 'horizontal', className: 'w-fit' },
  render: (args) => <DemoMenu {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      {SIZES.map((size) => (
        <DemoMenu key={size} size={size} title={size} items={items.slice(0, 3)} className="w-64" />
      ))}
    </div>
  ),
};

/** 하위 항목은 `<details>`로 접히므로 JS 없이 동작한다 */
export const Nested: Story = {
  render: () => (
    <DemoMenu
      title="문서 탐색"
      className="w-80"
      items={[
        { id: 'home', label: '홈', href: '#' },
        {
          id: 'docs',
          label: '문서',
          icon: <Icon name="book" size="1em" />,
          defaultOpen: true,
          children: [
            { id: 'start', label: '시작하기', href: '#' },
            { id: 'components', label: '컴포넌트', href: '#', active: true },
            {
              id: 'themes',
              label: '테마',
              children: [
                { id: 'builtin', label: '내장 테마', href: '#' },
                { id: 'custom', label: '커스텀 테마', href: '#' },
              ],
            },
          ],
        },
        { id: 'about', label: '소개', href: '#' },
      ]}
    />
  ),
};

export const WithSectionTitles: Story = {
  render: () => (
    <DemoMenu
      className="w-80"
      items={[
        { id: 't1', type: 'title', label: '개인' },
        { id: 'profile', label: '프로필', href: '#', icon: <Icon name="user-round" size="1em" /> },
        { id: 'billing', label: '결제', href: '#', icon: <Icon name="credit-card" size="1em" /> },
        { id: 't2', type: 'title', label: '팀' },
        { id: 'members', label: '멤버', href: '#', icon: <Icon name="users" size="1em" /> },
        { id: 'invites', label: '초대', href: '#', icon: <Icon name="user-round-plus" size="1em" /> },
      ]}
    />
  ),
};

/** 사이드바로 쓰는 구성 */
export const AsSidebar: Story = {
  render: function WorkspaceStory() {
    const [current, setCurrent] = useState(items[0]);
    return (
      <div className="menu-example-workspace rounded-box">
        <DemoMenu items={items} title="워크스페이스" onItemChange={setCurrent} />
        <section className="menu-example-content" aria-label="선택한 메뉴 내용">
          <span className="menu-example-eyebrow">내 작업 공간</span>
          <h2>{current.label}</h2>
          <p role="status">선택한 메뉴의 내용을 이 영역에서 확인할 수 있습니다.</p>
          <div className="menu-example-placeholder" aria-hidden="true">
            <Icon name="folder-open" size="1em" />
          </div>
        </section>
      </div>
    );
  },
};
