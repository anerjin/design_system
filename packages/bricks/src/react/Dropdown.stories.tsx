import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Data Entry/Dropdown',
  component: Dropdown,
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
      options: ['default', 'outlined', 'filled'],
    },
    placement: {
      control: 'select',
      options: ['bottom', 'top'],
    },
    disabled: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

const countryOptions = [
  { value: 'us', label: 'United States', icon: <i className="bx bx-globe"></i> },
  { value: 'kr', label: 'South Korea', icon: <i className="bx bx-globe"></i> },
  { value: 'jp', label: 'Japan', icon: <i className="bx bx-globe"></i> },
  { value: 'cn', label: 'China', icon: <i className="bx bx-globe"></i> },
  { value: 'de', label: 'Germany', icon: <i className="bx bx-globe"></i> },
  { value: 'fr', label: 'France', icon: <i className="bx bx-globe"></i> },
  { value: 'gb', label: 'United Kingdom', icon: <i className="bx bx-globe"></i> },
  { value: 'ca', label: 'Canada', icon: <i className="bx bx-globe"></i> },
];

const DropdownWithState = (args: any) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <div style={{ minHeight: '200px', padding: '20px' }}>
      <Dropdown
        {...args}
        value={value}
        onChange={setValue}
      />
      {value && (
        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          Selected: <strong>{value}</strong>
        </p>
      )}
    </div>
  );
};

const MultiDropdownWithState = (args: any) => {
  const [values, setValues] = useState<string[]>(args.values || []);

  return (
    <div style={{ minHeight: '200px', padding: '20px' }}>
      <Dropdown
        {...args}
        multiple
        values={values}
        onMultiChange={setValues}
      />
      {values.length > 0 && (
        <p style={{ marginTop: '16px', fontSize: '14px' }}>
          Selected: <strong>{values.join(', ')}</strong>
        </p>
      )}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Select a framework',
    options: basicOptions,
  },
};

export const WithValue: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Select a framework',
    options: basicOptions,
    value: 'react',
  },
};

export const Searchable: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Search and select a country',
    options: countryOptions,
    searchable: true,
  },
};

export const Multiple: Story = {
  render: (args) => <MultiDropdownWithState {...args} />,
  args: {
    placeholder: 'Select multiple frameworks',
    options: basicOptions,
  },
};

export const WithIcons: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Select a status',
    options: [
      { value: 'active', label: 'Active', icon: <i className="bx bx-check-circle"></i> },
      { value: 'pending', label: 'Pending', icon: <i className="bx bx-time"></i> },
      { value: 'inactive', label: 'Inactive', icon: <i className="bx bx-x-circle"></i> },
      { value: 'archived', label: 'Archived', icon: <i className="bx bx-folder"></i> },
    ],
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '200px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled dropdown (no value)</p>
        <DropdownWithState
          placeholder="This dropdown is disabled"
          options={basicOptions}
          disabled={true}
        />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Disabled dropdown (with value)</p>
        <DropdownWithState
          placeholder="Select a framework"
          options={basicOptions}
          value="react"
          disabled={true}
        />
      </div>
    </div>
  ),
};

export const DisabledOptions: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Some options are disabled',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
      { value: 'option5', label: 'Option 5' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '300px' }}>
      <DropdownWithState
        placeholder="Small dropdown"
        options={basicOptions}
        size="sm"
      />
      <DropdownWithState
        placeholder="Medium dropdown"
        options={basicOptions}
        size="md"
      />
      <DropdownWithState
        placeholder="Large dropdown"
        options={basicOptions}
        size="lg"
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '300px' }}>
      <DropdownWithState
        placeholder="Default variant"
        options={basicOptions}
        variant="default"
      />
      <DropdownWithState
        placeholder="Outlined variant"
        options={basicOptions}
        variant="outlined"
      />
      <DropdownWithState
        placeholder="Filled variant"
        options={basicOptions}
        variant="filled"
      />
    </div>
  ),
};

export const LongList: Story = {
  render: (args) => <DropdownWithState {...args} />,
  args: {
    placeholder: 'Select a timezone',
    searchable: true,
    options: [
      { value: 'utc-12', label: 'UTC-12:00 Baker Island' },
      { value: 'utc-11', label: 'UTC-11:00 American Samoa' },
      { value: 'utc-10', label: 'UTC-10:00 Hawaii' },
      { value: 'utc-9', label: 'UTC-09:00 Alaska' },
      { value: 'utc-8', label: 'UTC-08:00 Pacific Time (US & Canada)' },
      { value: 'utc-7', label: 'UTC-07:00 Mountain Time (US & Canada)' },
      { value: 'utc-6', label: 'UTC-06:00 Central Time (US & Canada)' },
      { value: 'utc-5', label: 'UTC-05:00 Eastern Time (US & Canada)' },
      { value: 'utc-4', label: 'UTC-04:00 Atlantic Time (Canada)' },
      { value: 'utc-3', label: 'UTC-03:00 Buenos Aires' },
      { value: 'utc-2', label: 'UTC-02:00 Mid-Atlantic' },
      { value: 'utc-1', label: 'UTC-01:00 Azores' },
      { value: 'utc0', label: 'UTC+00:00 London, Dublin' },
      { value: 'utc1', label: 'UTC+01:00 Paris, Berlin' },
      { value: 'utc2', label: 'UTC+02:00 Cairo, Athens' },
      { value: 'utc3', label: 'UTC+03:00 Moscow, Istanbul' },
      { value: 'utc4', label: 'UTC+04:00 Dubai, Baku' },
      { value: 'utc5', label: 'UTC+05:00 Karachi, Tashkent' },
      { value: 'utc5-30', label: 'UTC+05:30 Mumbai, New Delhi' },
      { value: 'utc6', label: 'UTC+06:00 Dhaka, Almaty' },
      { value: 'utc7', label: 'UTC+07:00 Bangkok, Jakarta' },
      { value: 'utc8', label: 'UTC+08:00 Beijing, Singapore' },
      { value: 'utc9', label: 'UTC+09:00 Tokyo, Seoul' },
      { value: 'utc10', label: 'UTC+10:00 Sydney, Melbourne' },
      { value: 'utc11', label: 'UTC+11:00 Solomon Islands' },
      { value: 'utc12', label: 'UTC+12:00 Auckland, Fiji' },
    ],
  },
};

export const FormExample: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('');
    const [timezone, setTimezone] = useState('');

    return (
      <div style={{ width: '400px', padding: '24px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: 600 }}>User Preferences</h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Country
          </label>
          <Dropdown
            placeholder="Select your country"
            options={countryOptions}
            value={country}
            onChange={setCountry}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Language
          </label>
          <Dropdown
            placeholder="Select your language"
            options={[
              { value: 'en', label: 'English' },
              { value: 'ko', label: '한국어' },
              { value: 'ja', label: '日本語' },
              { value: 'zh', label: '中文' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' },
              { value: 'de', label: 'Deutsch' },
            ]}
            value={language}
            onChange={setLanguage}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Timezone
          </label>
          <Dropdown
            placeholder="Select your timezone"
            searchable
            options={[
              { value: 'utc-8', label: 'UTC-08:00 Pacific Time' },
              { value: 'utc-5', label: 'UTC-05:00 Eastern Time' },
              { value: 'utc0', label: 'UTC+00:00 London' },
              { value: 'utc1', label: 'UTC+01:00 Paris' },
              { value: 'utc9', label: 'UTC+09:00 Seoul' },
            ]}
            value={timezone}
            onChange={setTimezone}
          />
        </div>

        <button
          style={{
            width: '100%',
            padding: '10px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
          onClick={() => {
            alert(`Preferences saved!\nCountry: ${country}\nLanguage: ${language}\nTimezone: ${timezone}`);
          }}
        >
          Save Preferences
        </button>
      </div>
    );
  },
};