import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'gray', 'flat', 'outlined', 'elevated'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
    },
    clickable: {
      control: 'boolean',
    },
    horizontal: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Default Card</Card.Title>
          <Card.Subtitle>This is a default card example</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          This is the card body content. You can put any content here.
        </Card.Body>
        <Card.Footer align="right">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" style={{ marginLeft: '8px' }}>Save</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <Card.Image
          src="https://via.placeholder.com/400x200"
          alt=""
        />
        <Card.Header>
          <Card.Title>Card with Image</Card.Title>
          <Card.Subtitle>Beautiful image card</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          This card includes an image at the top. Perfect for showcasing products, articles, or any visual content.
        </Card.Body>
        <Card.Footer align="between">
          <span style={{ fontSize: '14px', color: '#666' }}>2 hours ago</span>
          <Button variant="primary" size="sm">View Details</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    variant: 'outlined',
    onCardClick: () => alert('Card clicked!'),
    children: (
      <>
        <Card.Header>
          <Card.Title>Clickable Card</Card.Title>
          <Card.Subtitle>Click anywhere on this card</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          This entire card is clickable. Hover over it to see the interactive effect.
        </Card.Body>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    variant: 'elevated',
    children: (
      <>
        <Card.Image
          src="https://via.placeholder.com/200x200"
          alt=""
          style={{ width: '200px', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <Card.Header>
            <Card.Title>Horizontal Card</Card.Title>
            <Card.Subtitle>Side-by-side layout</Card.Subtitle>
          </Card.Header>
          <Card.Body>
            This card uses a horizontal layout, perfect for list views or when you need to display content side by side.
          </Card.Body>
        </div>
      </>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(2, 300px)' }}>
      <Card variant="default">
        <Card.Body>
          <Card.Title>Default</Card.Title>
          <p>Default card style</p>
        </Card.Body>
      </Card>
      <Card variant="gray">
        <Card.Body>
          <Card.Title>Gray</Card.Title>
          <p>Gray background card</p>
        </Card.Body>
      </Card>
      <Card variant="flat">
        <Card.Body>
          <Card.Title>Flat</Card.Title>
          <p>Flat card without shadow</p>
        </Card.Body>
      </Card>
      <Card variant="outlined">
        <Card.Body>
          <Card.Title>Outlined</Card.Title>
          <p>Card with border</p>
        </Card.Body>
      </Card>
      <Card variant="elevated">
        <Card.Body>
          <Card.Title>Elevated</Card.Title>
          <p>Card with elevation shadow</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(3, 200px)' }}>
      <Card radius="none" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">None</Card.Title>
          <p style={{ fontSize: '14px' }}>Sharp corners</p>
        </Card.Body>
      </Card>
      <Card radius="sm" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">Small</Card.Title>
          <p style={{ fontSize: '14px' }}>Slight rounding</p>
        </Card.Body>
      </Card>
      <Card radius="md" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">Medium</Card.Title>
          <p style={{ fontSize: '14px' }}>Medium rounding</p>
        </Card.Body>
      </Card>
      <Card radius="lg" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">Large</Card.Title>
          <p style={{ fontSize: '14px' }}>Large rounding</p>
        </Card.Body>
      </Card>
      <Card radius="xl" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">XL (Default)</Card.Title>
          <p style={{ fontSize: '14px' }}>Extra large</p>
        </Card.Body>
      </Card>
      <Card radius="2xl" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">2XL</Card.Title>
          <p style={{ fontSize: '14px' }}>2X large</p>
        </Card.Body>
      </Card>
      <Card radius="3xl" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">3XL</Card.Title>
          <p style={{ fontSize: '14px' }}>3X large</p>
        </Card.Body>
      </Card>
      <Card radius="full" variant="outlined">
        <Card.Body>
          <Card.Title level="h6">Full</Card.Title>
          <p style={{ fontSize: '14px' }}>Maximum</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <Card.Badge position="right">
          <Badge variant="danger" shape="pill">NEW</Badge>
        </Card.Badge>
        <Card.Header>
          <Card.Title>Featured Product</Card.Title>
          <Card.Subtitle>Limited time offer</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          This card has a badge to highlight important information or status.
        </Card.Body>
        <Card.Footer align="right">
          <Button variant="primary">Shop Now</Button>
        </Card.Footer>
      </>
    ),
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '300px' }}>
      <Card.Badge>
        <Badge variant="success" size="sm">20% OFF</Badge>
      </Card.Badge>
      <Card.Image
        src="https://via.placeholder.com/300x200"
        alt=""
      />
      <Card.Header>
        <Card.Title level="h4">Premium Headphones</Card.Title>
        <Card.Subtitle>Wireless Bluetooth 5.0</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$79.99</span>
          <span style={{ fontSize: '16px', textDecoration: 'line-through', color: '#999' }}>$99.99</span>
        </div>
        <p style={{ fontSize: '14px', color: '#666' }}>
          High-quality wireless headphones with noise cancellation and 30-hour battery life.
        </p>
      </Card.Body>
      <Card.Footer align="between">
        <Button variant="ghost" size="sm"><i className="bx bx-heart"></i> Save</Button>
        <Button variant="primary" size="sm">Add to Cart</Button>
      </Card.Footer>
    </Card>
  ),
};

export const BlogCard: Story = {
  render: () => (
    <Card variant="flat" clickable style={{ width: '400px' }}>
      <Card.Image
        src="https://via.placeholder.com/400x200"
        alt=""
        overlay
        overlayContent={
          <div style={{ padding: '16px', color: 'white' }}>
            <Badge variant="primary" type="soft">Technology</Badge>
          </div>
        }
      />
      <Card.Header dense>
        <Card.Title level="h3">The Future of Web Development</Card.Title>
        <Card.Subtitle>Understanding modern web frameworks</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
          Explore the latest trends in web development, from server components to edge computing. Learn how modern frameworks are shaping the future of web applications...
        </p>
      </Card.Body>
      <Card.Footer dense align="between">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
          <span>John Doe</span>
          <span>•</span>
          <span>5 min read</span>
        </div>
        <Button variant="link" size="sm">Read More →</Button>
      </Card.Footer>
    </Card>
  ),
};

export const FooterAlignments: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <Card variant="outlined">
        <Card.Header>
          <Card.Title level="h5">Left Alignment (Default)</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Footer content aligned to the left.</p>
        </Card.Body>
        <Card.Footer align="left">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" style={{ marginLeft: '8px' }}>Submit</Button>
        </Card.Footer>
      </Card>

      <Card variant="outlined">
        <Card.Header>
          <Card.Title level="h5">Center Alignment</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Footer content centered.</p>
        </Card.Body>
        <Card.Footer align="center">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" style={{ marginLeft: '8px' }}>Submit</Button>
        </Card.Footer>
      </Card>

      <Card variant="outlined">
        <Card.Header>
          <Card.Title level="h5">Right Alignment</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Footer content aligned to the right.</p>
        </Card.Body>
        <Card.Footer align="right">
          <Button variant="secondary" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" style={{ marginLeft: '8px' }}>Submit</Button>
        </Card.Footer>
      </Card>

      <Card variant="outlined">
        <Card.Header>
          <Card.Title level="h5">Between Alignment</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>Footer content spaced between edges.</p>
        </Card.Body>
        <Card.Footer align="between">
          <Button variant="ghost" size="sm">← Back</Button>
          <Button variant="primary" size="sm">Next →</Button>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <Card variant="gray">
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Total Users</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>2,543</p>
              <p style={{ fontSize: '14px', color: '#10b981', margin: '0' }}>↑ 12% from last month</p>
            </div>
            <Badge variant="success" type="soft">Active</Badge>
          </div>
        </Card.Body>
      </Card>
      <Card variant="gray">
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Revenue</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>$45,231</p>
              <p style={{ fontSize: '14px', color: '#10b981', margin: '0' }}>↑ 8% from last month</p>
            </div>
            <Badge variant="info" type="soft">Monthly</Badge>
          </div>
        </Card.Body>
      </Card>
      <Card variant="gray">
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>Orders</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', margin: '4px 0' }}>439</p>
              <p style={{ fontSize: '14px', color: '#ef4444', margin: '0' }}>↓ 3% from last month</p>
            </div>
            <Badge variant="warning" type="soft">Pending</Badge>
          </div>
        </Card.Body>
      </Card>
    </div>
  ),
};