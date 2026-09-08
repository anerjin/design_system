import { Icon } from './Icon';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Navbar } from './Navbar';
import type { NavItem, NavbarProps, NavbarVariant } from './Navbar';
import { Button } from './Button';
import { Avatar } from './Avatar';
import { Badge } from './Badge';
import { Dropdown } from './Dropdown';

const VARIANTS: NavbarVariant[] = ['default', 'ghost', 'neutral', 'primary'];

const items: NavItem[] = [
  { id: 'home', label: '홈', href: '#', active: true },
  { id: 'products', label: '제품', href: '#' },
  {
    id: 'docs',
    label: '문서',
    children: [
      { id: 'start', label: '시작하기', href: '#' },
      { id: 'components', label: '컴포넌트', href: '#' },
      { id: 'themes', label: '테마', href: '#' },
    ],
  },
  { id: 'pricing', label: '가격', href: '#' },
];

function useDemoNavigation() {
  const [selected, setSelected] = useState('home');
  const [message, setMessage] = useState('홈을 보고 있습니다.');
  const prepare = (entries: NavItem[]): NavItem[] =>
    entries.map((item) => ({
      ...item,
      active: item.id === selected || !!item.children?.some((child) => child.id === selected),
      children: item.children ? prepare(item.children) : undefined,
      onClick: (event) => {
        event.preventDefault();
        setSelected(item.id);
        setMessage(`${item.label} 메뉴를 선택했습니다.`);
      },
    }));
  return { items: prepare(items), message, setMessage };
}

function NavigationExample(props: NavbarProps) {
  const navigation = useDemoNavigation();
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className={'grid gap-4' + (props.position === 'sticky' ? ' sticky top-0 z-30' : '')}>
      <Navbar
        brand="doi ui/ux"
        items={navigation.items}
        actions={
          <Button color="primary" size="sm" onClick={() => setSignedIn((value) => !value)}>
            {signedIn ? '로그아웃' : '로그인'}
          </Button>
        }
        {...props}
      />
      <p role="status" className="px-4 text-sm text-base-content/65">
        {navigation.message}
      </p>
    </div>
  );
}

const meta: Meta<typeof Navbar> = {
  title: 'Navigation/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    gallery: {
      description:
        '브랜드·메뉴·액션을 분리한 내비게이션. 실제 컨테이너 너비에 맞춰 메뉴가 접히며, 라이트·다크·반전 배경에서 버튼 대비를 유지합니다. 하위 메뉴는 클릭과 키보드로 탐색할 수 있습니다.',
      daisyui: 'navbar',
      props: [
        { name: 'brand', type: 'ReactNode', description: '로고 · 서비스명' },
        { name: 'items', type: 'NavItem[]', description: '중첩 가능' },
        { name: 'actions', type: 'ReactNode', description: '오른쪽 영역' },
        { name: 'variant', type: 'default | ghost | neutral | primary', defaultValue: 'default' },
        { name: 'position', type: 'static | sticky | fixed-top | fixed-bottom', defaultValue: 'static' },
        { name: 'align', type: 'start | center | end', defaultValue: 'center', description: '메뉴 정렬' },
        {
          name: 'collapsible',
          type: 'boolean',
          defaultValue: 'true',
          description: '너비 부족 시 메뉴 버튼으로 전환. false이면 메뉴를 다음 줄에 배치',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    position: { control: 'select', options: ['static', 'sticky', 'fixed-top', 'fixed-bottom'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    shadow: { control: 'boolean' },
    collapsible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '기본 내비게이션',
  render: (args) => <NavigationExample {...args} />,
};

export const Variants: Story = {
  name: '배경별 메뉴와 버튼 대비',
  render: () => (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div key={variant} className="grid gap-2">
          <p className="px-4 text-xs font-medium text-base-content/65">{variant}</p>
          <NavigationExample variant={variant} aria-label={`${variant} 내비게이션`} />
        </div>
      ))}
    </div>
  ),
};

/** 브랜드만 두는 최소 구성 */
export const BrandOnly: Story = {
  name: '브랜드만 사용',
  args: { brand: 'doi ui/ux' },
};

export const WithUserMenu: Story = {
  name: '알림과 사용자 메뉴',
  render: function UserNavigation() {
    const navigation = useDemoNavigation();
    return (
      <div className="grid gap-4">
        <Navbar
          brand="doi ui/ux"
          items={navigation.items}
          actions={
            <>
              <Button
                variant="ghost"
                shape="circle"
                size="sm"
                aria-label="알림"
                onClick={() => navigation.setMessage('새로운 알림이 3개 있습니다.')}
              >
                <div className="indicator">
                  <Icon name="bell" size="1em" className="text-xl" />
                  <Badge dot color="error" size="xs" className="indicator-item" />
                </div>
              </Button>
              <Dropdown
                align="end"
                items={[
                  {
                    key: 'profile',
                    label: '프로필',
                    icon: <Icon name="user-round" size="1em" />,
                    onClick: () => navigation.setMessage('프로필 메뉴를 선택했습니다.'),
                  },
                  {
                    key: 'settings',
                    label: '설정',
                    icon: <Icon name="settings" size="1em" />,
                    onClick: () => navigation.setMessage('설정 메뉴를 선택했습니다.'),
                  },
                  { key: 'd', type: 'divider' },
                  {
                    key: 'logout',
                    label: '로그아웃',
                    icon: <Icon name="log-out" size="1em" />,
                    onClick: () => navigation.setMessage('로그아웃 메뉴를 선택했습니다.'),
                  },
                ]}
                trigger={
                  <button
                    type="button"
                    aria-label="사용자 메뉴"
                    className="btn btn-sm btn-ghost btn-circle avatar"
                  >
                    <Avatar initials="김" color="primary" size="xs" />
                  </button>
                }
              />
            </>
          }
        />
        <p role="status" className="px-4 text-sm text-base-content/65">
          {navigation.message}
        </p>
      </div>
    );
  },
};

export const MenuAlignment: Story = {
  name: '메뉴 정렬',
  render: () => (
    <div className="flex flex-col gap-4">
      {(['start', 'center', 'end'] as const).map((align) => (
        <NavigationExample key={align} align={align} brand={align} collapsible={false} />
      ))}
    </div>
  ),
};

/** 스크롤해도 위에 붙어 있다 */
export const Sticky: Story = {
  name: '스크롤 영역에 고정',
  render: () => (
    <div className="h-96 overflow-y-auto bg-base-200">
      <NavigationExample position="sticky" />
      <div className="p-6">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-4">
            스크롤 내용 {i + 1}
          </p>
        ))}
      </div>
    </div>
  ),
};

export const NarrowContainer: Story = {
  name: '좁은 컨테이너',
  render: () => (
    <div className="max-w-sm">
      <NavigationExample />
    </div>
  ),
};

export const DisabledItems: Story = {
  name: '비활성 메뉴',
  render: () => (
    <NavigationExample
      items={[
        { id: 'home', label: '홈', href: '#', active: true, onClick: (event) => event.preventDefault() },
        { id: 'soon', label: '준비 중', href: '#', disabled: true },
        {
          id: 'locked',
          label: '관리자',
          disabled: true,
          children: [{ id: 'settings', label: '설정', href: '#' }],
        },
        {
          id: 'docs',
          label: '문서',
          children: [
            { id: 'intro', label: '시작하기', href: '#', onClick: (event) => event.preventDefault() },
            { id: 'coming', label: '출시 예정', href: '#', disabled: true },
          ],
        },
      ]}
    />
  ),
};
