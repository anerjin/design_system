import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
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
      options: [undefined, 'primary', 'success', 'danger', 'warning', 'info', 'dark'],
    },
    disabled: {
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
    label: 'Radio Button',
    name: 'default',
    value: 'option1',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Option with description',
    description: 'This option includes additional information',
    name: 'description',
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
    name: 'disabled',
    value: 'option1',
  },
};

export const Required: Story = {
  args: {
    label: 'Required option',
    required: true,
    name: 'required',
    value: 'option1',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small radio',
    name: 'small',
    value: 'option1',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large radio',
    name: 'large',
    value: 'option1',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio label="Default" name="variants" value="default" defaultChecked />
      <Radio label="Primary" variant="primary" name="variants" value="primary" />
      <Radio label="Success" variant="success" name="variants" value="success" />
      <Radio label="Danger" variant="danger" name="variants" value="danger" />
      <Radio label="Warning" variant="warning" name="variants" value="warning" />
      <Radio label="Info" variant="info" name="variants" value="info" />
      <Radio label="Dark" variant="dark" name="variants" value="dark" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio size="sm" label="Small radio" name="sizes" value="small" />
      <Radio size="md" label="Medium radio (default)" name="sizes" value="medium" defaultChecked />
      <Radio size="lg" label="Large radio" name="sizes" value="large" />
    </div>
  ),
};

export const RadioGroupExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState('option1');

    const options = [
      { value: 'option1', label: 'Option 1', description: 'First choice' },
      { value: 'option2', label: 'Option 2', description: 'Second choice' },
      { value: 'option3', label: 'Option 3', description: 'Third choice' },
      { value: 'option4', label: 'Option 4', description: 'Fourth choice', disabled: true },
    ];

    return (
      <div>
        <h4 style={{ marginBottom: '12px' }}>Select an option:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map(option => (
            <Radio
              key={option.value}
              name="group"
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
              checked={selectedValue === option.value}
              onChange={(e) => setSelectedValue(e.target.value)}
            />
          ))}
        </div>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Selected: {selectedValue}
        </p>
      </div>
    );
  },
};

export const PaymentMethods: Story = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState('credit');

    const methods = [
      {
        value: 'credit',
        label: (<><i className="bx bx-credit-card"></i> Credit Card</>),
        description: 'Pay with Visa, MasterCard, or American Express',
      },
      {
        value: 'paypal',
        label: (<><i className="bx bxl-paypal"></i> PayPal</>),
        description: 'Fast and secure payment with PayPal',
      },
      {
        value: 'bank',
        label: (<><i className="bx bx-building"></i> Bank Transfer</>),
        description: 'Direct transfer from your bank account',
      },
      {
        value: 'crypto',
        label: (<><i className="bx bxl-bitcoin"></i> Cryptocurrency</>),
        description: 'Pay with Bitcoin, Ethereum, or other cryptocurrencies',
      },
    ];

    return (
      <div style={{ width: '350px' }}>
        <h3 style={{ marginBottom: '16px' }}>Payment Method</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {methods.map(method => (
            <div
              key={method.value}
              style={{
                padding: '12px',
                border: selectedMethod === method.value ? '2px solid #007bff' : '1px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedMethod(method.value)}
            >
              <Radio
                name="payment"
                value={method.value}
                label={method.label}
                description={method.description}
                checked={selectedMethod === method.value}
                onChange={(e) => setSelectedMethod(e.target.value)}
                variant="primary"
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const RadioGroupVertical: Story = {
  render: () => {
    const [value, setValue] = useState('option1');

    return (
      <RadioGroup
        name="vertical-group"
        label="Select your preference"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        required
      >
        <Radio value="option1" label="Option 1" description="First choice" />
        <Radio value="option2" label="Option 2" description="Second choice" />
        <Radio value="option3" label="Option 3" description="Third choice" />
        <Radio value="option4" label="Option 4" description="Fourth choice" disabled />
      </RadioGroup>
    );
  },
};

export const RadioGroupInline: Story = {
  render: () => {
    const [value, setValue] = useState('small');

    return (
      <RadioGroup
        name="inline-group"
        label="Select size"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        inline
      >
        <Radio value="small" label="S" />
        <Radio value="medium" label="M" />
        <Radio value="large" label="L" />
        <Radio value="xlarge" label="XL" />
      </RadioGroup>
    );
  },
};

export const RadioStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Radio name="states" value="unchecked" label="Unchecked" />
      <Radio name="states2" value="checked" label="Checked" defaultChecked />
      <Radio name="states" value="disabled" label="Disabled" disabled />
      <Radio name="states2" value="disabled-checked" label="Disabled Checked" disabled defaultChecked />
    </div>
  ),
};

export const CompleteExample: Story = {
  render: () => {
    const [shirtSize, setShirtSize] = useState('medium');
    const [deliverySpeed, setDeliverySpeed] = useState('standard');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: '400px' }}>
        <RadioGroup
          name="shirt-size"
          label="T-Shirt Size"
          value={shirtSize}
          onChange={(value) => setShirtSize(value)}
          inline
          required
        >
          <Radio value="xsmall" label="XS" />
          <Radio value="small" label="S" />
          <Radio value="medium" label="M" />
          <Radio value="large" label="L" />
          <Radio value="xlarge" label="XL" />
          <Radio value="xxlarge" label="XXL" />
        </RadioGroup>

        <RadioGroup
          name="delivery"
          label="Delivery Speed"
          value={deliverySpeed}
          onChange={(value) => setDeliverySpeed(value)}
        >
          <Radio
            value="express"
            label="Express Delivery"
            description="Get your order in 1-2 business days (+$15)"
            variant="primary"
          />
          <Radio
            value="standard"
            label="Standard Delivery"
            description="Get your order in 5-7 business days (Free)"
          />
          <Radio
            value="economy"
            label="Economy Delivery"
            description="Get your order in 10-14 business days (-$5)"
          />
        </RadioGroup>

        <div style={{ padding: '12px', background: '#f3f4f6', borderRadius: '8px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>Selected Options:</p>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#6b7280' }}>
            Size: {shirtSize.toUpperCase()} | Delivery: {deliverySpeed}
          </p>
        </div>
      </div>
    );
  },
};