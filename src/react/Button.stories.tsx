import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'ghost', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    pill: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    iconOnly: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const WithIcon: Story = {
  args: {
    leftIcon: <i className="bx bx-rocket"></i>,
    children: 'Launch',
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: <i className="bx bx-cog"></i>,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning Button',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info Button',
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'Light Button',
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Dark Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const OutlinePrimary: Story = {
  args: {
    variant: 'outline-primary',
    children: 'Outline Primary',
  },
};

export const OutlineSecondary: Story = {
  args: {
    variant: 'outline-secondary',
    children: 'Outline Secondary',
  },
};

export const OutlineSuccess: Story = {
  args: {
    variant: 'outline-success',
    children: 'Outline Success',
  },
};

export const OutlineDanger: Story = {
  args: {
    variant: 'outline-danger',
    children: 'Outline Danger',
  },
};

export const Pill: Story = {
  args: {
    variant: 'primary',
    pill: true,
    children: 'Pill Button',
  },
};

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'XS Button',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'XL Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Solid Variants</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="light">Light</Button>
          <Button variant="dark">Dark</Button>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Outline Variants</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="outline-primary">Primary</Button>
          <Button variant="outline-secondary">Secondary</Button>
          <Button variant="outline-success">Success</Button>
          <Button variant="outline-danger">Danger</Button>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Special Variants</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button size="xs">XS Size</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XL Size</Button>
    </div>
  ),
};

export const RoundedVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Rounded Variations</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button rounded="none">No Rounding</Button>
          <Button rounded="sm">Small Rounded</Button>
          <Button rounded="md">Medium Rounded (Default)</Button>
          <Button rounded="lg">Large Rounded</Button>
          <Button rounded="xl">Extra Large Rounded</Button>
          <Button rounded="full">Full Rounded</Button>
          <Button pill>Pill Button</Button>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Different Sizes with Rounding</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button size="sm" rounded="none">Small None</Button>
          <Button size="sm" rounded="sm">Small SM</Button>
          <Button size="md" rounded="lg">Medium LG</Button>
          <Button size="lg" rounded="xl">Large XL</Button>
          <Button size="lg" rounded="full">Large Full</Button>
        </div>
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Different Variants with Rounding</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="primary" rounded="none">Primary None</Button>
          <Button variant="secondary" rounded="lg">Secondary LG</Button>
          <Button variant="success" rounded="full">Success Full</Button>
          <Button variant="danger" rounded="xl">Danger XL</Button>
          <Button variant="outline-primary" rounded="full">Outline Full</Button>
        </div>
      </div>
    </div>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button variant="outline-primary">Normal</Button>
        <Button variant="outline-primary" disabled>Disabled</Button>
        <Button variant="outline-primary" loading>Loading</Button>
      </div>
    </div>
  ),
};

export const ButtonShapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button>Default Shape</Button>
      <Button pill>Pill Shape</Button>
      <Button iconOnly><i className="bx bx-rocket"></i></Button>
      <Button iconOnly pill><i className="bx bx-heart"></i></Button>
    </div>
  ),
};