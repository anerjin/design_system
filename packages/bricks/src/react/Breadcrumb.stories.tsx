import { Icon } from './Icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';
import type { Size } from './utils';

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    gallery: {
      description: '현재 위치를 나타내는 경로. 구분자는 daisyUI CSS가 그린다.',
      daisyui: 'breadcrumbs',
      props: [
        { name: 'items', type: 'BreadcrumbItem[]', description: 'id · label · href · icon' },
        { name: 'size', type: 'xs | sm | md | lg | xl', defaultValue: 'sm' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: 'home', label: '홈', href: '/' },
  { id: 'products', label: '상품', href: '/products' },
  { id: 'laptop', label: '노트북' },
];

export const Default: Story = {
  args: { items },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {SIZES.map((size) => (
        <Breadcrumb key={size} items={items} size={size} />
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { id: 'home', label: '홈', href: '/', icon: <Icon name="house" size="1em" className="mr-1" /> },
        {
          id: 'docs',
          label: '문서',
          href: '/docs',
          icon: <Icon name="folder" size="1em" className="mr-1" />,
        },
        { id: 'add', label: '문서 추가', icon: <Icon name="file" size="1em" className="mr-1" /> },
      ]}
    />
  ),
};

/** 항목이 넘치면 가로 스크롤된다. `className`으로 폭을 제한한다 */
export const Overflow: Story = {
  render: () => (
    <Breadcrumb
      className="max-w-xs"
      items={[
        { id: '1', label: '아주 긴 최상위 경로', href: '/' },
        { id: '2', label: '두 번째 단계', href: '/2' },
        { id: '3', label: '세 번째 단계', href: '/3' },
        { id: '4', label: '네 번째 단계', href: '/4' },
        { id: '5', label: '현재 페이지' },
      ]}
    />
  ),
};

export const SingleItem: Story = {
  args: { items: [{ id: 'home', label: '홈' }] },
};
