import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'danger', 'warning', 'info', 'purple', 'pink', 'mint', 'yellow', 'green', 'lightblue', 'blue', 'dark'],
    },
    disabled: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ToggleWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);

  return (
    <Toggle
      {...args}
      checked={checked}
      onChange={(newChecked) => {
        setChecked(newChecked);
        args.onChange?.(newChecked);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: 'Toggle Switch',
  },
};

export const Checked: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: 'Enabled by default',
    checked: true,
  },
};

export const WithDescription: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    label: 'Enable notifications',
    description: 'Receive email notifications for important updates',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledOn: Story = {
  args: {
    label: 'Disabled (On)',
    disabled: true,
    checked: true,
  },
};

export const Small: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    size: 'sm',
    label: 'Small toggle',
  },
};

export const Large: Story = {
  render: (args) => <ToggleWithState {...args} />,
  args: {
    size: 'lg',
    label: 'Large toggle',
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        <Toggle label="Default" defaultChecked />
        <Toggle label="Primary" variant="primary" defaultChecked />
        <Toggle label="Success" variant="success" defaultChecked />
        <Toggle label="Danger" variant="danger" defaultChecked />
        <Toggle label="Warning" variant="warning" defaultChecked />
        <Toggle label="Info" variant="info" defaultChecked />
        <Toggle label="Purple" variant="purple" defaultChecked />
        <Toggle label="Pink" variant="pink" defaultChecked />
        <Toggle label="Mint" variant="mint" defaultChecked />
        <Toggle label="Yellow" variant="yellow" defaultChecked />
        <Toggle label="Green" variant="green" defaultChecked />
        <Toggle label="Light Blue" variant="lightblue" defaultChecked />
        <Toggle label="Blue" variant="blue" defaultChecked />
        <Toggle label="Dark" variant="dark" defaultChecked />
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle
        label="Default Icons"
        showIcons
        defaultChecked
      />
      <Toggle
        label="Custom Icons"
        showIcons
        onIcon="✓"
        offIcon="✕"
        variant="success"
        defaultChecked
      />
      <Toggle
        label="Emoji Icons"
        showIcons
        onIcon="🌞"
        offIcon="🌙"
        variant="info"
        defaultChecked
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle size="sm" label="Small toggle" defaultChecked />
      <Toggle size="md" label="Medium toggle (default)" defaultChecked />
      <Toggle size="lg" label="Large toggle" defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Toggle label="Unchecked" />
      <Toggle label="Checked" defaultChecked />
      <Toggle label="Disabled" disabled />
      <Toggle label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};

export const Settings: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [analytics, setAnalytics] = useState(false);

    return (
      <div style={{ width: '300px' }}>
        <h3 style={{ marginBottom: '16px' }}>Application Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Toggle
            label="Auto-save"
            checked={autoSave}
            onChange={setAutoSave}
            variant="success"
          />
          <Toggle
            label="Notifications"
            checked={notifications}
            onChange={setNotifications}
            variant="info"
          />
          <Toggle
            label="Analytics"
            checked={analytics}
            onChange={setAnalytics}
            variant="warning"
          />
        </div>
      </div>
    );
  },
};