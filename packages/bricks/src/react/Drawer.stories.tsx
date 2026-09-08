import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Menu } from './Menu';
import { Button } from './Button';
import { Navbar } from './Navbar';

const navItems = [
  { id: 'home', label: '홈', href: '#', icon: <Icon name="house" size="1em" />, active: true },
  { id: 'inbox', label: '받은편지함', href: '#', icon: <Icon name="mail" size="1em" /> },
  { id: 'settings', label: '설정', href: '#', icon: <Icon name="settings" size="1em" /> },
];

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description: '옆에서 나오는 서랍. 넓은 화면에서는 사이드바로 고정할 수 있다.',
      daisyui: 'drawer',
      props: [
        { name: 'sidebar', type: 'ReactNode', description: '서랍 안 내용 (보통 Menu)' },
        { name: 'open', type: 'boolean', description: '제어 컴포넌트로 쓸 때' },
        { name: 'onOpenChange', type: '(open: boolean) => void' },
        { name: 'side', type: 'start | end', defaultValue: 'start' },
        {
          name: 'alwaysOpenOnDesktop',
          type: 'boolean',
          defaultValue: 'false',
          description: 'lg 이상에서 펼쳐 둔다',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['start', 'end'] },
    alwaysOpenOnDesktop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="h-96">
        <Drawer
          {...args}
          open={open}
          onOpenChange={setOpen}
          sidebar={<Menu items={navItems} className="p-4" />}
        >
          <div className="grid h-96 place-content-center gap-4">
            <Button color="primary" onClick={() => setOpen(true)}>
              메뉴 열기
            </Button>
            <p className="text-sm opacity-60">배경을 누르면 닫힙니다.</p>
          </div>
        </Drawer>
      </div>
    );
  },
};

/** 오른쪽에서 나오는 서랍 */
export const FromEnd: Story = {
  render: function EndStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="h-96">
        <Drawer
          side="end"
          open={open}
          onOpenChange={setOpen}
          sidebar={<Menu items={navItems} className="p-4" />}
        >
          <div className="grid h-96 place-content-center">
            <Button color="primary" onClick={() => setOpen(true)}>
              오른쪽에서 열기
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

/** 넓은 화면에서는 항상 펼쳐 두는 사이드바 레이아웃 */
export const SidebarLayout: Story = {
  render: function SidebarStory() {
    const [open, setOpen] = useState(false);

    return (
      <div className="h-[30rem]">
        <Drawer
          alwaysOpenOnDesktop
          open={open}
          onOpenChange={setOpen}
          sidebarClassName="w-64 border-e border-base-300"
          sidebar={<Menu items={navItems} title="메뉴" className="p-4" />}
        >
          <Navbar
            brand="DOI INC"
            collapsible={false}
            actions={
              <Button
                variant="ghost"
                shape="square"
                className="lg:hidden"
                aria-label="메뉴 열기"
                onClick={() => setOpen(true)}
              >
                <Icon name="menu" size="1em" className="text-xl" />
              </Button>
            }
          />
          <div className="p-6">
            <p>넓은 화면에서는 사이드바가 항상 보이고, 좁아지면 서랍으로 바뀝니다.</p>
          </div>
        </Drawer>
      </div>
    );
  },
};
