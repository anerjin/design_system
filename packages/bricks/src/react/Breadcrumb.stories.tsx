import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'arrow', 'chevron', 'dot', 'pipe'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    background: {
      control: 'boolean',
    },
    dark: {
      control: 'boolean',
    },
    truncate: {
      control: 'boolean',
    },
    responsive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'products', label: 'Products', href: '/products' },
  { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
  { id: 'laptops', label: 'Laptops', active: true },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithHomeIcon: Story = {
  args: {
    items: [
      { id: 'home', label: '', href: '/' },
      { id: 'docs', label: 'Documentation', href: '/docs' },
      { id: 'components', label: 'Components', href: '/docs/components' },
      { id: 'breadcrumb', label: 'Breadcrumb', active: true },
    ],
    homeIcon: <i className="bx bx-home"></i>,
  },
};

export const Separators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }}>
      <Breadcrumb
        items={basicItems}
        separator="slash"
      />
      <Breadcrumb
        items={basicItems}
        separator="arrow"
      />
      <Breadcrumb
        items={basicItems}
        separator="chevron"
      />
      <Breadcrumb
        items={basicItems}
        separator="dot"
      />
      <Breadcrumb
        items={basicItems}
        separator="pipe"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }}>
      <Breadcrumb
        items={basicItems}
        size="sm"
      />
      <Breadcrumb
        items={basicItems}
        size="md"
      />
      <Breadcrumb
        items={basicItems}
        size="lg"
      />
    </div>
  ),
};

export const WithBackground: Story = {
  args: {
    items: basicItems,
    background: true,
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
      <Breadcrumb
        items={basicItems}
        dark
        background
      />
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'long1', label: 'Very Long Category Name That Should Be Truncated', href: '/category' },
      { id: 'long2', label: 'Another Extremely Long Subcategory Name', href: '/subcategory' },
      { id: 'product', label: 'Final Product with Long Name', active: true },
    ],
    truncate: true,
    background: true,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: 'home',
        label: 'Dashboard',
        href: '/',
        icon: <i className="bx bx-home"></i>
      },
      {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: <i className="bx bx-cog"></i>
      },
      {
        id: 'security',
        label: 'Security',
        href: '/settings/security',
        icon: <i className="bx bx-lock-alt"></i>
      },
      {
        id: 'password',
        label: 'Password',
        active: true,
        icon: <i className="bx bx-key"></i>
      },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: basicItems,
    customSeparator: '→',
  },
};

export const ResponsiveExample: Story = {
  args: {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'category1', label: 'Main Category', href: '/category1' },
      { id: 'category2', label: 'Sub Category', href: '/category2' },
      { id: 'category3', label: 'Deep Category', href: '/category3' },
      { id: 'product', label: 'Product Name', active: true },
    ],
    responsive: true,
    background: true,
  },
};

export const ECommerce: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <h3 style={{ marginBottom: '16px' }}>E-Commerce Navigation</h3>
      <Breadcrumb
        items={[
          { id: 'home', label: '', href: '/' },
          { id: 'shop', label: 'Shop', href: '/shop' },
          { id: 'mens', label: "Men's Fashion", href: '/shop/mens' },
          { id: 'shoes', label: 'Shoes', href: '/shop/mens/shoes' },
          { id: 'sneakers', label: 'Sneakers', href: '/shop/mens/shoes/sneakers' },
          { id: 'product', label: 'Nike Air Max 90', active: true },
        ]}
        homeIcon={<i className="bx bx-store"></i>}
        separator="chevron"
        background
      />
    </div>
  ),
};

export const Documentation: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <h3 style={{ marginBottom: '16px' }}>Documentation Navigation</h3>
      <Breadcrumb
        items={[
          { id: 'docs', label: 'Docs', href: '/docs' },
          { id: 'guides', label: 'Guides', href: '/docs/guides' },
          { id: 'advanced', label: 'Advanced', href: '/docs/guides/advanced' },
          { id: 'performance', label: 'Performance Optimization', active: true },
        ]}
        separator="arrow"
        size="sm"
      />
    </div>
  ),
};

export const FileSystem: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <h3 style={{ marginBottom: '16px' }}>File System Path</h3>
      <Breadcrumb
        items={[
          { id: 'root', label: '/', href: '/' },
          { id: 'users', label: 'Users', href: '/users' },
          { id: 'documents', label: 'Documents', href: '/users/documents' },
          { id: 'projects', label: 'Projects', href: '/users/documents/projects' },
          { id: 'design', label: 'design-system', active: true },
        ]}
        separator="slash"
        background
        dark
      />
    </div>
  ),
};

export const WithCustomClickHandler: Story = {
  render: () => {
    const handleClick = (label: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      alert(`Navigating to: ${label}`);
    };

    return (
      <Breadcrumb
        items={[
          {
            id: 'home',
            label: 'Home',
            href: '/',
            onClick: handleClick('Home')
          },
          {
            id: 'about',
            label: 'About',
            href: '/about',
            onClick: handleClick('About')
          },
          {
            id: 'team',
            label: 'Team',
            href: '/about/team',
            onClick: handleClick('Team')
          },
          {
            id: 'member',
            label: 'John Doe',
            active: true
          },
        ]}
        separator="chevron"
      />
    );
  },
};