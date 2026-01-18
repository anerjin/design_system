import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Textarea } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Data Entry/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    state: {
      control: 'select',
      options: [undefined, 'success', 'warning', 'error'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
    },
    disabled: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
      <Input size="xs" placeholder="Extra small input" />
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
      <Input size="xl" placeholder="Extra large input" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
      <Input placeholder="Default state" />
      <Input state="success" placeholder="Success state" defaultValue="Valid input" />
      <Input state="warning" placeholder="Warning state" defaultValue="Check this" />
      <Input state="error" placeholder="Error state" defaultValue="Invalid input" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
      <Input leftIcon={<i className="bx bx-search"></i>} type="search" placeholder="Search..." />
      <Input rightIcon={<i className="bx bx-check"></i>} placeholder="Verified input" />
      <Input leftIcon={<i className="bx bx-envelope"></i>} rightIcon={<i className="bx bx-right-arrow-alt"></i>} type="email" placeholder="Email with icons" />
    </div>
  ),
};

export const InputGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '400px' }}>
      <Input prepend="https://" placeholder="website.com" />
      <Input append=".com" placeholder="domain" />
      <Input prepend="$" append=".00" type="number" placeholder="0" />
      <Input
        prepend={<button className="btn btn--sm btn--secondary">Search</button>}
        placeholder="Search with button"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Cannot edit',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Read only value',
  },
};

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'This field is required',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    leftIcon: <i className="bx bx-envelope"></i>,
    placeholder: 'john@example.com',
  },
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
    min: 0,
    max: 100,
  },
};

export const DateInput: Story = {
  args: {
    type: 'date',
  },
};

export const TimeInput: Story = {
  args: {
    type: 'time',
  },
};

export const SearchInput: Story = {
  args: {
    type: 'search',
    leftIcon: <i className="bx bx-search"></i>,
    placeholder: 'Search...',
  },
};

export const TextareaDefault: Story = {
  render: () => (
    <div style={{ minWidth: '300px' }}>
      <Textarea placeholder="Enter your message..." rows={4} />
    </div>
  ),
};

export const TextareaStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
      <Textarea placeholder="Default textarea" rows={3} />
      <Textarea state="success" placeholder="Success state" rows={3} defaultValue="Valid input" />
      <Textarea state="warning" placeholder="Warning state" rows={3} defaultValue="Check this" />
      <Textarea state="error" placeholder="Error state" rows={3} defaultValue="Invalid input" />
    </div>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '400px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Name</label>
        <Input placeholder="John Doe" required />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Email</label>
        <Input type="email" leftIcon={<i className="bx bx-envelope"></i>} placeholder="john@example.com" state="success" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Password</label>
        <Input type="password" placeholder="Enter password" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Website</label>
        <Input prepend="https://" placeholder="example.com" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Message</label>
        <Textarea placeholder="Enter your message..." rows={4} />
      </div>
    </div>
  ),
};