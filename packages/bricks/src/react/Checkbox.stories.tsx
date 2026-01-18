import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Data Entry/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: [undefined, 'primary', 'success', 'danger', 'warning', 'info', 'dark'],
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWithState = (args: any) => {
  const [checked, setChecked] = useState(args.checked || false);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        args.onChange?.(e);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    label: 'Default Checkbox',
  },
};

export const Checked: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    label: 'Checked by default',
    checked: true,
  },
};

export const WithDescription: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    label: 'Accept terms and conditions',
    description: 'You must accept the terms to continue',
  },
};

export const Required: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    label: 'Required checkbox',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    disabled: true,
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox size="xs" label="Extra small checkbox" defaultChecked />
      <Checkbox size="sm" label="Small checkbox" defaultChecked />
      <Checkbox size="md" label="Medium checkbox (default)" defaultChecked />
      <Checkbox size="lg" label="Large checkbox" defaultChecked />
      <Checkbox size="xl" label="Extra large checkbox" defaultChecked />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Default" defaultChecked />
      <Checkbox label="Primary" variant="primary" defaultChecked />
      <Checkbox label="Success" variant="success" defaultChecked />
      <Checkbox label="Danger" variant="danger" defaultChecked />
      <Checkbox label="Warning" variant="warning" defaultChecked />
      <Checkbox label="Info" variant="info" defaultChecked />
      <Checkbox label="Dark" variant="dark" defaultChecked />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    const handleChange = (item: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedItems([...selectedItems, item]);
      } else {
        setSelectedItems(selectedItems.filter(i => i !== item));
      }
    };

    return (
      <div>
        <h4 style={{ marginBottom: '12px' }}>Select multiple options:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => (
            <Checkbox
              key={item}
              label={item}
              checked={selectedItems.includes(item)}
              onChange={handleChange(item)}
            />
          ))}
        </div>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Selected: {selectedItems.join(', ') || 'None'}
        </p>
      </div>
    );
  },
};

export const CheckboxGroupDefault: Story = {
  render: () => (
    <CheckboxGroup label="Select your interests" required>
      <Checkbox label="Frontend Development" value="frontend" />
      <Checkbox label="Backend Development" value="backend" />
      <Checkbox label="UI/UX Design" value="design" />
      <Checkbox label="DevOps" value="devops" />
    </CheckboxGroup>
  ),
};

export const CheckboxGroupInline: Story = {
  render: () => (
    <CheckboxGroup label="Select options" inline>
      <Checkbox label="Option A" />
      <Checkbox label="Option B" />
      <Checkbox label="Option C" />
      <Checkbox label="Option D" />
    </CheckboxGroup>
  ),
};

export const CheckboxGroupError: Story = {
  render: () => (
    <CheckboxGroup
      label="Terms and Conditions"
      error
      errorMessage="You must accept at least one condition"
      required
    >
      <Checkbox label="I accept the Terms of Service" />
      <Checkbox label="I accept the Privacy Policy" />
      <Checkbox label="I agree to receive marketing emails" />
    </CheckboxGroup>
  ),
};

export const CheckboxStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Email notifications"
        description="Receive email updates about your account activity"
      />
      <Checkbox
        label="SMS notifications"
        description="Get text messages for important security alerts"
      />
      <Checkbox
        label="Push notifications"
        description="Allow browser push notifications for real-time updates"
        defaultChecked
      />
    </div>
  ),
};

export const CompleteExample: Story = {
  render: () => {
    const [selectAll, setSelectAll] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelected(options);
        setSelectAll(true);
      } else {
        setSelected([]);
        setSelectAll(false);
      }
    };

    const handleOptionChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const newSelected = [...selected, option];
        setSelected(newSelected);
        setSelectAll(newSelected.length === options.length);
      } else {
        const newSelected = selected.filter(item => item !== option);
        setSelected(newSelected);
        setSelectAll(false);
      }
    };

    return (
      <div style={{ minWidth: '300px' }}>
        <Checkbox
          label="Select All"
          checked={selectAll}
          indeterminate={selected.length > 0 && selected.length < options.length}
          onChange={handleSelectAll}
          variant="primary"
        />
        <hr style={{ margin: '12px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
        <CheckboxGroup>
          {options.map(option => (
            <Checkbox
              key={option}
              label={option}
              checked={selected.includes(option)}
              onChange={handleOptionChange(option)}
            />
          ))}
        </CheckboxGroup>
      </div>
    );
  },
};