import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';
import { Button } from './Button';
import { Icon } from './Icon';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
    solid: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    dismissible: {
      control: 'boolean',
    },
    autoClose: {
      control: 'number',
    },
    accent: {
      control: 'select',
      options: [undefined, 'left', 'top'],
    },
    toast: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    title: 'Default Alert',
    children: 'This is a default alert message.',
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'Here is some important information you should know.',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }}>
      <Alert variant="primary" title="Primary Alert">
        This is a primary alert message.
      </Alert>
      <Alert variant="secondary" title="Secondary Alert">
        This is a secondary alert message.
      </Alert>
      <Alert variant="success" title="Success Alert">
        Your operation completed successfully.
      </Alert>
      <Alert variant="danger" title="Danger Alert">
        An error occurred while processing your request.
      </Alert>
      <Alert variant="warning" title="Warning Alert">
        Please review your input before continuing.
      </Alert>
      <Alert variant="info" title="Info Alert">
        This is an informational message.
      </Alert>
      <Alert variant="light" title="Light Alert">
        This is a light alert message.
      </Alert>
      <Alert variant="dark" title="Dark Alert">
        This is a dark alert message.
      </Alert>
    </div>
  ),
};

export const SolidVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }}>
      <Alert variant="primary" solid title="Primary Solid">
        Solid background primary alert.
      </Alert>
      <Alert variant="secondary" solid title="Secondary Solid">
        Solid background secondary alert.
      </Alert>
      <Alert variant="success" solid title="Success Solid">
        Solid background success alert.
      </Alert>
      <Alert variant="danger" solid title="Danger Solid">
        Solid background danger alert.
      </Alert>
      <Alert variant="warning" solid title="Warning Solid">
        Solid background warning alert.
      </Alert>
      <Alert variant="info" solid title="Info Solid">
        Solid background info alert.
      </Alert>
      <Alert variant="light" solid title="Light Solid">
        Solid background light alert.
      </Alert>
      <Alert variant="dark" solid title="Dark Solid">
        Solid background dark alert.
      </Alert>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }}>
      <Alert size="sm" variant="info" title="Small Alert">
        This is a small sized alert.
      </Alert>
      <Alert size="md" variant="info" title="Medium Alert (Default)">
        This is a medium sized alert.
      </Alert>
      <Alert size="lg" variant="info" title="Large Alert">
        This is a large sized alert.
      </Alert>
    </div>
  ),
};

export const WithAccent: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }}>
      <Alert variant="success" accent="left" title="Left Accent">
        Alert with left accent border.
      </Alert>
      <Alert variant="danger" accent="top" title="Top Accent">
        Alert with top accent border.
      </Alert>
      <Alert variant="warning" accent="left" solid title="Solid with Accent">
        Solid alert with left accent.
      </Alert>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '500px' }}>
      <Alert
        variant="success"
        title="Success"
        icon={<Icon name="check-circle" size={20} color="currentColor" />}
      >
        Operation completed successfully.
      </Alert>
      <Alert
        variant="danger"
        title="Error"
        icon={<Icon name="x-circle" size={20} color="currentColor" />}
      >
        An error has occurred.
      </Alert>
      <Alert
        variant="warning"
        title="Warning"
        icon={<Icon name="error" size={20} color="currentColor" />}
      >
        Please proceed with caution.
      </Alert>
      <Alert
        variant="info"
        title="Information"
        icon={<Icon name="info-circle" size={20} color="currentColor" />}
      >
        Here's some helpful information.
      </Alert>
    </div>
  ),
};

export const WithList: Story = {
  args: {
    variant: 'warning',
    title: 'Please fix the following errors:',
    icon: <Icon name="error" size={20} color="currentColor" />,
    list: [
      'Password must be at least 8 characters',
      'Password must contain at least one uppercase letter',
      'Password must contain at least one number',
      'Password must contain at least one special character'
    ],
  },
};

export const WithActions: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <Button onClick={() => setVisible(true)}>Show Alert</Button>
      );
    }

    return (
      <Alert
        variant="info"
        title="Update Available"
        description="A new version of the application is available."
        dismissible
        onClose={() => setVisible(false)}
        actions={
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Button size="sm" variant="primary">Update Now</Button>
            <Button size="sm" variant="secondary">Remind Me Later</Button>
          </div>
        }
      />
    );
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <Button onClick={() => setVisible(true)}>Show Dismissible Alert</Button>
      );
    }

    return (
      <Alert
        variant="info"
        title="Dismissible Alert"
        dismissible
        visible={visible}
        onClose={() => setVisible(false)}
      >
        You can close this alert by clicking the X button.
      </Alert>
    );
  },
};

export const AutoClose: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <div>
        <Button onClick={() => setVisible(true)}>Show Auto-Close Alert</Button>
        {visible && (
          <div style={{ marginTop: '12px' }}>
            <Alert
              variant="success"
              title="Auto-closing Alert"
              autoClose={3000}
              dismissible
              onClose={() => setVisible(false)}
            >
              This alert will close automatically in 3 seconds.
            </Alert>
          </div>
        )}
      </div>
    );
  },
};

export const ToastPositions: Story = {
  render: () => {
    const [toasts, setToasts] = useState<string[]>([]);

    const showToast = (position: string) => {
      const id = `${position}-${Date.now()}`;
      setToasts(prev => [...prev, id]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t !== id));
      }, 5000);
    };

    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <Button size="sm" onClick={() => showToast('top-left')}>Top Left</Button>
          <Button size="sm" onClick={() => showToast('top-center')}>Top Center</Button>
          <Button size="sm" onClick={() => showToast('top-right')}>Top Right</Button>
          <Button size="sm" onClick={() => showToast('bottom-left')}>Bottom Left</Button>
          <Button size="sm" onClick={() => showToast('bottom-center')}>Bottom Center</Button>
          <Button size="sm" onClick={() => showToast('bottom-right')}>Bottom Right</Button>
        </div>

        {toasts.map(id => {
          const position = id.split('-').slice(0, 2).join('-') as any;
          return (
            <Alert
              key={id}
              toast
              position={position}
              variant="success"
              title="Toast Notification"
              dismissible
              autoClose={4000}
            >
              This is a toast at {position}
            </Alert>
          );
        })}
      </div>
    );
  },
};

export const ComplexExample: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return <Button onClick={() => setVisible(true)}>Show Complex Alert</Button>;
    }

    return (
      <Alert
        variant="danger"
        solid
        size="lg"
        accent="left"
        dismissible
        icon={<Icon name="lock-alt" size={24} color="currentColor" />}
        title="Security Alert"
        description="We've detected unusual activity on your account"
        onClose={() => setVisible(false)}
        actions={
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Button size="sm" variant="light">Review Activity</Button>
            <Button size="sm" variant="danger">Secure Account</Button>
          </div>
        }
      >
        <div style={{ marginTop: '12px' }}>
          <p style={{ margin: '8px 0' }}>Suspicious login attempts detected from:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Unknown device in New York, USA</li>
            <li>Unknown device in London, UK</li>
            <li>Unknown device in Tokyo, Japan</li>
          </ul>
        </div>
      </Alert>
    );
  },
};

export const NotificationExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '600px' }}>
      <Alert
        variant="success"
        icon={<Icon name="check-circle" size={20} color="currentColor" />}
        title="Payment Successful"
        description="Your payment of $99.99 has been processed successfully."
        dismissible
      />

      <Alert
        variant="warning"
        icon={<Icon name="error" size={20} color="currentColor" />}
        title="Low Storage Space"
        description="You have less than 10% storage space remaining. Consider deleting unused files."
        actions={
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" variant="warning">Manage Storage</Button>
            <Button size="sm" variant="secondary">Ignore</Button>
          </div>
        }
        dismissible
      />

      <Alert
        variant="info"
        solid
        icon={<Icon name="bell" size={20} color="currentColor" />}
        title="New Feature Available"
        description="Dark mode is now available! You can enable it in settings."
        actions={
          <Button size="sm" variant="light">Go to Settings</Button>
        }
        dismissible
      />

      <Alert
        variant="danger"
        accent="left"
        icon={<Icon name="error-circle" size={20} color="currentColor" />}
        title="Action Required"
        description="Your subscription will expire in 3 days. Update your payment method to continue."
        actions={
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="sm" variant="danger">Update Payment</Button>
            <Button size="sm" variant="secondary">Cancel Subscription</Button>
          </div>
        }
      />
    </div>
  ),
};