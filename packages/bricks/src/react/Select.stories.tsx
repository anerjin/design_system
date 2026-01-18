import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Select, SelectOption } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Data Entry/Select',
  component: Select,
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
    multiple: {
      control: 'boolean',
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

const defaultOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }}>
      <Select
        size="xs"
        options={defaultOptions}
        placeholder="Extra small select"
      />
      <Select
        size="sm"
        options={defaultOptions}
        placeholder="Small select"
      />
      <Select
        size="md"
        options={defaultOptions}
        placeholder="Medium select (default)"
      />
      <Select
        size="lg"
        options={defaultOptions}
        placeholder="Large select"
      />
      <Select
        size="xl"
        options={defaultOptions}
        placeholder="Extra large select"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }}>
      <Select
        options={defaultOptions}
        placeholder="Normal state"
        defaultValue="option1"
      />
      <Select
        state="success"
        options={defaultOptions}
        placeholder="Success state"
        defaultValue="option2"
      />
      <Select
        state="warning"
        options={defaultOptions}
        placeholder="Warning state"
        defaultValue="option3"
      />
      <Select
        state="error"
        options={defaultOptions}
        placeholder="Error state"
        defaultValue="option4"
      />
    </div>
  ),
};

export const WithPrependAppend: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '350px' }}>
      <Select
        prepend={<span style={{ padding: '0 12px', color: '#666' }}>Country:</span>}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
        ]}
        placeholder="Select a country"
      />
      <Select
        append={<span style={{ padding: '0 12px', color: '#666' }}>.com</span>}
        options={[
          { value: 'www', label: 'www' },
          { value: 'blog', label: 'blog' },
          { value: 'shop', label: 'shop' },
          { value: 'api', label: 'api' },
        ]}
        placeholder="Select subdomain"
      />
      <Select
        prepend={<span style={{ padding: '0 12px', color: '#666' }}>$</span>}
        append={<span style={{ padding: '0 12px', color: '#666' }}>USD</span>}
        options={[
          { value: '10', label: '10' },
          { value: '25', label: '25' },
          { value: '50', label: '50' },
          { value: '100', label: '100' },
        ]}
        placeholder="Select amount"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '250px' }}>
      <Select
        options={defaultOptions}
        disabled
        placeholder="Disabled select"
      />
      <Select
        options={defaultOptions}
        disabled
        value="option1"
      />
      <Select
        options={defaultOptions}
        disabled
        multiple
        value={['option1', 'option2']}
      />
    </div>
  ),
};

export const Multiple: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    return (
      <div style={{ minWidth: '300px' }}>
        <Select
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'solid', label: 'Solid' },
            { value: 'qwik', label: 'Qwik' },
          ]}
          multiple
          value={selected}
          onChange={(e) => {
            const options = e.target.options;
            const values: string[] = [];
            for (let i = 0; i < options.length; i++) {
              if (options[i].selected) {
                values.push(options[i].value);
              }
            }
            setSelected(values);
          }}
        />
        <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Available Option 1' },
      { value: 'option2', label: 'Available Option 2', disabled: false },
      { value: 'option3', label: 'Disabled Option 3', disabled: true },
      { value: 'option4', label: 'Available Option 4' },
      { value: 'option5', label: 'Disabled Option 5', disabled: true },
    ],
    placeholder: 'Some options are disabled',
  },
};

export const Required: Story = {
  render: () => (
    <form onSubmit={(e) => { e.preventDefault(); alert('Form submitted!'); }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '300px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            Department <span style={{ color: 'red' }}>*</span>
          </span>
          <Select
            options={[
              { value: '', label: '-- Select Department --' },
              { value: 'eng', label: 'Engineering' },
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'hr', label: 'Human Resources' },
            ]}
            required
          />
        </label>
        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit
        </button>
      </div>
    </form>
  ),
};

export const CountrySelect: Story = {
  render: () => {
    const [country, setCountry] = useState('');

    const countries: SelectOption[] = [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'au', label: 'Australia' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'kr', label: 'South Korea' },
      { value: 'cn', label: 'China' },
      { value: 'in', label: 'India' },
    ];

    return (
      <div style={{ minWidth: '300px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Select Your Country</span>
          <Select
            options={countries}
            placeholder="Choose a country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        {country && (
          <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
            Selected: {countries.find(c => c.value === country)?.label}
          </p>
        )}
      </div>
    );
  },
};

export const UsingOptionElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '300px' }}>
      <Select placeholder="Select a fruit">
        <optgroup label="Citrus">
          <option value="orange">Orange</option>
          <option value="lemon">Lemon</option>
          <option value="lime">Lime</option>
        </optgroup>
        <optgroup label="Berries">
          <option value="strawberry">Strawberry</option>
          <option value="blueberry">Blueberry</option>
          <option value="raspberry">Raspberry</option>
        </optgroup>
        <optgroup label="Tropical">
          <option value="mango">Mango</option>
          <option value="pineapple">Pineapple</option>
          <option value="coconut">Coconut</option>
        </optgroup>
      </Select>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      size: 'md',
      priority: '',
      assignee: '',
    });

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '350px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>T-Shirt Size</label>
          <Select
            size="sm"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          >
            <option value="xs">XS - Extra Small</option>
            <option value="sm">S - Small</option>
            <option value="md">M - Medium</option>
            <option value="lg">L - Large</option>
            <option value="xl">XL - Extra Large</option>
          </Select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Priority Level</label>
          <Select
            state={!formData.priority ? 'error' : undefined}
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            placeholder="Select priority"
          >
            <option value="">-- Select Priority --</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🟠 High</option>
            <option value="critical">🔴 Critical</option>
          </Select>
          {!formData.priority && (
            <span style={{ fontSize: '12px', color: '#dc3545' }}>Priority is required</span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '14px', fontWeight: '500' }}>Assign To</label>
          <Select
            prepend={<span style={{ padding: '0 8px' }}><i className="bx bx-user"></i></span>}
            value={formData.assignee}
            onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
            placeholder="Select team member"
          >
            <option value="">-- Unassigned --</option>
            <optgroup label="Development Team">
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="bob">Bob Johnson</option>
            </optgroup>
            <optgroup label="Design Team">
              <option value="alice">Alice Brown</option>
              <option value="charlie">Charlie Wilson</option>
            </optgroup>
            <optgroup label="QA Team">
              <option value="david">David Lee</option>
              <option value="emma">Emma Davis</option>
            </optgroup>
          </Select>
        </div>

        <div style={{ padding: '12px', background: '#f8f9fa', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>Form Data:</p>
          <pre style={{ margin: '8px 0 0', fontSize: '12px' }}>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    );
  },
};