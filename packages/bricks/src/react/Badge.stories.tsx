import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'square'],
    },
    type: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const Rounded: Story = {
  args: {
    shape: 'pill',
    children: 'Rounded',
  },
};

export const Outline: Story = {
  args: {
    type: 'outline',
    variant: 'primary',
    children: 'Outline',
  },
};

export const Soft: Story = {
  args: {
    type: 'soft',
    variant: 'primary',
    children: 'Soft',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const TypeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '14px', color: '#6B7280' }}>Primary:</span>
        <Badge variant="primary">Solid</Badge>
        <Badge variant="primary" type="outline">Outline</Badge>
        <Badge variant="primary" type="soft">Soft</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '14px', color: '#6B7280' }}>Success:</span>
        <Badge variant="success">Solid</Badge>
        <Badge variant="success" type="outline">Outline</Badge>
        <Badge variant="success" type="soft">Soft</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '14px', color: '#6B7280' }}>Danger:</span>
        <Badge variant="danger">Solid</Badge>
        <Badge variant="danger" type="outline">Outline</Badge>
        <Badge variant="danger" type="soft">Soft</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '14px', color: '#6B7280' }}>Warning:</span>
        <Badge variant="warning">Solid</Badge>
        <Badge variant="warning" type="outline">Outline</Badge>
        <Badge variant="warning" type="soft">Soft</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '14px', color: '#6B7280' }}>Info:</span>
        <Badge variant="info">Solid</Badge>
        <Badge variant="info" type="outline">Outline</Badge>
        <Badge variant="info" type="soft">Soft</Badge>
      </div>
    </div>
  ),
};

export const WithNumber: Story = {
  args: {
    variant: 'danger',
    shape: 'pill',
    children: '99+',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Inactive</Badge>
      <Badge variant="info">New</Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button className="btn btn--primary">
          Messages
        </button>
        <Badge
          variant="danger"
          shape="pill"
          size="sm"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          }}
        >
          5
        </Badge>
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button className="btn btn--secondary">
          Notifications
        </button>
        <Badge
          variant="warning"
          shape="pill"
          size="sm"
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
          }}
        >
          12
        </Badge>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Solid (Default)</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="dark">Dark</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Outline</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="primary" type="outline">Primary</Badge>
          <Badge variant="secondary" type="outline">Secondary</Badge>
          <Badge variant="success" type="outline">Success</Badge>
          <Badge variant="danger" type="outline">Danger</Badge>
          <Badge variant="warning" type="outline">Warning</Badge>
          <Badge variant="info" type="outline">Info</Badge>
          <Badge variant="light" type="outline">Light</Badge>
          <Badge variant="dark" type="outline">Dark</Badge>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Soft</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge variant="primary" type="soft">Primary</Badge>
          <Badge variant="secondary" type="soft">Secondary</Badge>
          <Badge variant="success" type="soft">Success</Badge>
          <Badge variant="danger" type="soft">Danger</Badge>
          <Badge variant="warning" type="soft">Warning</Badge>
          <Badge variant="info" type="soft">Info</Badge>
          <Badge variant="light" type="soft">Light</Badge>
          <Badge variant="dark" type="soft">Dark</Badge>
        </div>
      </div>
    </div>
  ),
};