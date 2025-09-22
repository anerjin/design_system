import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'transparent'],
    },
    fixed: {
      control: 'select',
      options: [false, 'top', 'bottom'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    sticky: {
      control: 'boolean',
    },
    shadow: {
      control: 'boolean',
    },
    showMobileMenu: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
  { id: 'home', label: 'Home', href: '/', active: true },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

const itemsWithIcons = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <Icon name="home" />,
    active: true
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    icon: <Icon name="shopping-bag" />
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    icon: <Icon name="cog" />
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    icon: <Icon name="envelope" />
  },
];

const itemsWithDropdown = [
  { id: 'home', label: 'Home', href: '/', active: true },
  {
    id: 'products',
    label: 'Products',
    icon: <Icon name="shopping-bag" />,
    children: [
      { id: 'electronics', label: 'Electronics', href: '/products/electronics', icon: <Icon name="laptop" /> },
      { id: 'clothing', label: 'Clothing', href: '/products/clothing', icon: <Icon name="t-shirt" /> },
      { id: 'books', label: 'Books', href: '/products/books', icon: <Icon name="book" /> },
      { id: 'sports', label: 'Sports', href: '/products/sports', icon: <Icon name="football" /> },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: <Icon name="cog" />,
    children: [
      { id: 'consulting', label: 'Consulting', href: '/services/consulting' },
      { id: 'support', label: 'Support', href: '/services/support' },
      { id: 'training', label: 'Training', href: '/services/training' },
    ],
  },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const Default: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    brand: <><Icon name="cube" /> BRICKS</>,
    items: itemsWithIcons,
  },
};

export const WithDropdowns: Story = {
  args: {
    brand: 'BRICKS',
    items: itemsWithDropdown,
  },
};

export const DarkVariant: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
    variant: 'dark',
  },
};

export const LightVariant: Story = {
  render: () => (
    <div style={{ background: '#333', minHeight: '200px' }}>
      <Navbar
        brand="BRICKS"
        items={basicItems}
        variant="light"
      />
    </div>
  ),
};

export const TransparentVariant: Story = {
  render: () => (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '200px'
    }}>
      <Navbar
        brand={<span style={{ color: 'white', fontWeight: 'bold' }}>BRICKS</span>}
        items={basicItems.map(item => ({ ...item, style: { color: 'white' } }))}
        variant="transparent"
      />
    </div>
  ),
};

export const CenterAligned: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
    align: 'center',
  },
};

export const RightAligned: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
    align: 'right',
  },
};

export const FixedTop: Story = {
  render: () => (
    <div>
      <Navbar
        brand="BRICKS"
        items={basicItems}
        fixed="top"
      />
      <div style={{ paddingTop: '80px', height: '1000px', background: '#f5f5f5' }}>
        <div style={{ padding: '20px' }}>
          <h2>Fixed Top Navbar</h2>
          <p>Scroll down to see the navbar stay at the top.</p>
          {[...Array(50)].map((_, i) => (
            <p key={i}>Content line {i + 1}</p>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Sticky: Story = {
  render: () => (
    <div>
      <div style={{ height: '100px', background: '#e0e0e0', padding: '20px' }}>
        <h2>Header Content</h2>
        <p>Scroll down and the navbar will stick to the top</p>
      </div>
      <Navbar
        brand="BRICKS"
        items={basicItems}
        sticky
      />
      <div style={{ height: '1000px', background: '#f5f5f5', padding: '20px' }}>
        {[...Array(50)].map((_, i) => (
          <p key={i}>Content line {i + 1}</p>
        ))}
      </div>
    </div>
  ),
};

export const WithRightContent: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
    rightContent: (
      <>
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search..."
          />
          <Icon name="search" className="navbar__search-icon" />
        </div>
        <button className="navbar__icon-btn">
          <Icon name="bell" />
        </button>
        <div className="navbar__user">
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="navbar__avatar"
          />
        </div>
      </>
    ),
  },
};

export const NoShadow: Story = {
  args: {
    brand: 'BRICKS',
    items: basicItems,
    shadow: false,
  },
};

export const WithDisabledItems: Story = {
  args: {
    brand: 'BRICKS',
    items: [
      { id: 'home', label: 'Home', href: '/', active: true },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'services', label: 'Services (Coming Soon)', disabled: true },
      {
        id: 'products',
        label: 'Products (Disabled)',
        icon: <Icon name="shopping-bag" />,
        disabled: true,
        children: [
          { id: 'electronics', label: 'Electronics', href: '/products/electronics' },
          { id: 'clothing', label: 'Clothing', href: '/products/clothing' },
        ],
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: <Icon name="book-open" />,
        children: [
          { id: 'docs', label: 'Documentation', href: '/docs' },
          { id: 'api', label: 'API (Coming Soon)', disabled: true },
          { id: 'blog', label: 'Blog', href: '/blog' },
        ],
      },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
};

export const ComplexNavbar: Story = {
  args: {
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon name="cube" size={28} />
        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>BRICKS</span>
      </div>
    ),
    items: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
        icon: <Icon name="home" />,
        active: true,
      },
      {
        id: 'products',
        label: 'Products',
        icon: <Icon name="shopping-bag" />,
        children: [
          {
            id: 'all',
            label: 'All Products',
            href: '/products',
            icon: <Icon name="grid-alt" />
          },
          {
            id: 'featured',
            label: 'Featured',
            href: '/products/featured',
            icon: <Icon name="star" />
          },
          {
            id: 'new',
            label: 'New Arrivals',
            href: '/products/new',
            icon: <Icon name="badge" />
          },
          {
            id: 'sale',
            label: 'On Sale',
            href: '/products/sale',
            icon: <Icon name="purchase-tag" />
          },
        ],
      },
      {
        id: 'solutions',
        label: 'Solutions',
        icon: <Icon name="bulb" />,
        children: [
          {
            id: 'enterprise',
            label: 'Enterprise',
            href: '/solutions/enterprise',
            icon: <Icon name="building" />,
          },
          {
            id: 'small-business',
            label: 'Small Business',
            href: '/solutions/small-business',
            icon: <Icon name="store" />,
          },
          {
            id: 'startup',
            label: 'Startups',
            href: '/solutions/startup',
            icon: <Icon name="rocket" />,
          },
        ],
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: <Icon name="book-open" />,
        children: [
          { id: 'docs', label: 'Documentation', href: '/docs', icon: <Icon name="file" /> },
          { id: 'blog', label: 'Blog', href: '/blog', icon: <Icon name="news" /> },
          { id: 'tutorials', label: 'Tutorials', href: '/tutorials', icon: <Icon name="video" /> },
          { id: 'api', label: 'API Reference', href: '/api', icon: <Icon name="code-alt" /> },
        ],
      },
      {
        id: 'pricing',
        label: 'Pricing',
        href: '/pricing',
        icon: <Icon name="dollar" />,
      },
    ],
    rightContent: (
      <>
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search..."
          />
          <Icon name="search" className="navbar__search-icon" />
        </div>
        <button className="navbar__icon-btn">
          <Icon name="bell" />
        </button>
        <div className="navbar__user">
          <img
            src="https://via.placeholder.com/32"
            alt="User"
            className="navbar__avatar"
          />
        </div>
        <Button variant="primary" size="sm">Get Started</Button>
      </>
    ),
    variant: 'default',
  },
};

export const ECommerce: Story = {
  args: {
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon name="store" size={24} />
        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Shop</span>
      </div>
    ),
    items: [
      {
        id: 'shop',
        label: 'Shop',
        children: [
          { id: 'men', label: "Men's", href: '/shop/men', icon: <Icon name="male" /> },
          { id: 'women', label: "Women's", href: '/shop/women', icon: <Icon name="female" /> },
          { id: 'kids', label: "Kids", href: '/shop/kids', icon: <Icon name="child" /> },
          { id: 'accessories', label: 'Accessories', href: '/shop/accessories', icon: <Icon name="glasses" /> },
        ],
      },
      { id: 'new', label: 'New Arrivals', href: '/new' },
      { id: 'sale', label: 'Sale', href: '/sale' },
      { id: 'brands', label: 'Brands', href: '/brands' },
    ],
    rightContent: (
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Button variant="ghost" size="sm">
          <Icon name="search" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="heart" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="cart" />
          <span style={{ marginLeft: '4px' }}>3</span>
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="user" />
        </Button>
      </div>
    ),
  },
};

export const Documentation: Story = {
  args: {
    brand: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon name="book" size={24} />
        <span style={{ fontWeight: 'bold' }}>Docs</span>
      </div>
    ),
    items: [
      {
        id: 'getting-started',
        label: 'Getting Started',
        href: '/docs/getting-started',
        icon: <Icon name="rocket" />
      },
      {
        id: 'components',
        label: 'Components',
        icon: <Icon name="cube" />,
        children: [
          { id: 'buttons', label: 'Buttons', href: '/docs/components/buttons' },
          { id: 'forms', label: 'Forms', href: '/docs/components/forms' },
          { id: 'navigation', label: 'Navigation', href: '/docs/components/navigation' },
          { id: 'layout', label: 'Layout', href: '/docs/components/layout' },
        ],
      },
      {
        id: 'guides',
        label: 'Guides',
        icon: <Icon name="compass" />,
        children: [
          { id: 'installation', label: 'Installation', href: '/guides/installation' },
          { id: 'customization', label: 'Customization', href: '/guides/customization' },
          { id: 'migration', label: 'Migration', href: '/guides/migration' },
        ],
      },
      {
        id: 'api',
        label: 'API',
        href: '/api',
        icon: <Icon name="code-alt" />
      },
    ],
    rightContent: (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="ghost" size="sm">
          <Icon name="search" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="moon" />
        </Button>
        <Button variant="ghost" size="sm">
          <Icon name="github" name-type="logo" />
        </Button>
      </div>
    ),
    variant: 'light',
  },
};