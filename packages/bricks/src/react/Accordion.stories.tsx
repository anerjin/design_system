import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flush'],
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    exclusive: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'item1',
    title: 'What is BRICKS Design System?',
    content: 'BRICKS is a modern, accessible, and flexible design system built for creating consistent user interfaces across all platforms.',
  },
  {
    id: 'item2',
    title: 'How do I get started?',
    content: 'Getting started with BRICKS is easy! Simply install the package via npm or yarn, import the components you need, and start building your application.',
  },
  {
    id: 'item3',
    title: 'Is BRICKS accessible?',
    content: 'Yes! BRICKS is built with accessibility in mind. All components follow WCAG 2.1 AA standards and include proper ARIA attributes, keyboard navigation, and screen reader support.',
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const DefaultOpen: Story = {
  args: {
    items: defaultItems,
    defaultActiveIds: ['item1'],
  },
};

export const Exclusive: Story = {
  args: {
    items: defaultItems,
    exclusive: true,
    defaultActiveIds: ['item1'],
  },
};

export const MultipleOpen: Story = {
  args: {
    items: defaultItems,
    defaultActiveIds: ['item1', 'item2'],
  },
};

export const Flush: Story = {
  args: {
    items: defaultItems,
    variant: 'flush',
    defaultActiveIds: ['item1'],
  },
};

export const Colored: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }}>
      <Accordion
        items={[
          {
            id: 'primary',
            title: 'Primary Color',
            content: 'This accordion uses the primary color theme.',
          },
        ]}
        color="primary"
        defaultActiveIds={['primary']}
      />
      <Accordion
        items={[
          {
            id: 'success',
            title: 'Success Color',
            content: 'This accordion uses the success color theme.',
          },
        ]}
        color="success"
        defaultActiveIds={['success']}
      />
      <Accordion
        items={[
          {
            id: 'warning',
            title: 'Warning Color',
            content: 'This accordion uses the warning color theme.',
          },
        ]}
        color="warning"
        defaultActiveIds={['warning']}
      />
      <Accordion
        items={[
          {
            id: 'danger',
            title: 'Danger Color',
            content: 'This accordion uses the danger color theme.',
          },
        ]}
        color="danger"
        defaultActiveIds={['danger']}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '600px' }}>
      <Accordion
        items={[
          {
            id: 'small',
            title: 'Small Size Accordion',
            content: 'This is a small sized accordion with compact padding.',
          },
        ]}
        size="sm"
        defaultActiveIds={['small']}
      />
      <Accordion
        items={[
          {
            id: 'medium',
            title: 'Medium Size Accordion (Default)',
            content: 'This is a medium sized accordion, which is the default size.',
          },
        ]}
        size="md"
        defaultActiveIds={['medium']}
      />
      <Accordion
        items={[
          {
            id: 'large',
            title: 'Large Size Accordion',
            content: 'This is a large sized accordion with more spacious padding.',
          },
        ]}
        size="lg"
        defaultActiveIds={['large']}
      />
    </div>
  ),
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        id: 'item1',
        title: 'Enabled Item',
        content: 'This item can be toggled.',
      },
      {
        id: 'item2',
        title: 'Disabled Item',
        content: 'This content cannot be accessed.',
        disabled: true,
      },
      {
        id: 'item3',
        title: 'Another Enabled Item',
        content: 'This item can also be toggled.',
      },
    ],
  },
};

export const IconLeft: Story = {
  args: {
    items: defaultItems,
    iconPosition: 'left',
    defaultActiveIds: ['item1'],
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeIds, setActiveIds] = useState<string[]>(['item1']);

    return (
      <div style={{ width: '600px' }}>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveIds(['item1', 'item2', 'item3'])}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Open All
          </button>
          <button
            onClick={() => setActiveIds([])}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Close All
          </button>
          <button
            onClick={() => setActiveIds(['item2'])}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
          >
            Open Second Only
          </button>
        </div>
        <Accordion
          items={defaultItems}
          activeIds={activeIds}
          onChange={setActiveIds}
        />
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div style={{ width: '700px' }}>
      <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '600' }}>
        Frequently Asked Questions
      </h2>
      <Accordion
        items={[
          {
            id: 'faq1',
            title: <><i className="bx bx-book"></i> How do I install BRICKS?</>,
            content: (
              <div>
                <p>You can install BRICKS using npm or yarn:</p>
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '12px' }}>
                  npm install @bricks/design-system
                </pre>
              </div>
            ),
          },
          {
            id: 'faq2',
            title: <><i className="bx bx-palette"></i> Can I customize the theme?</>,
            content: (
              <div>
                <p>Yes! BRICKS supports extensive theming options:</p>
                <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                  <li>Custom color palettes</li>
                  <li>Typography scales</li>
                  <li>Spacing systems</li>
                  <li>Border radius values</li>
                  <li>Shadow presets</li>
                </ul>
              </div>
            ),
          },
          {
            id: 'faq3',
            title: <><i className="bx bx-accessibility"></i> Is BRICKS accessible?</>,
            content: (
              <div>
                <p>Absolutely! All components are built with accessibility as a priority:</p>
                <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                  <li>WCAG 2.1 AA compliance</li>
                  <li>Keyboard navigation support</li>
                  <li>Screen reader friendly</li>
                  <li>Focus management</li>
                  <li>ARIA attributes</li>
                </ul>
              </div>
            ),
          },
          {
            id: 'faq4',
            title: <><i className="bx bx-rocket"></i> What frameworks are supported?</>,
            content: (
              <div>
                <p>BRICKS currently supports:</p>
                <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                  <li>React (16.8+)</li>
                  <li>Vue (3.0+)</li>
                  <li>Angular (12+)</li>
                  <li>Vanilla JavaScript</li>
                </ul>
                <p style={{ marginTop: '12px' }}>
                  Support for other frameworks is coming soon!
                </p>
              </div>
            ),
          },
          {
            id: 'faq5',
            title: <><i className="bx bx-briefcase"></i> Is BRICKS free for commercial use?</>,
            content: (
              <div>
                <p>
                  BRICKS is licensed under the MIT License, which means it's free for both personal and commercial use.
                  You can use it in your projects without any restrictions.
                </p>
              </div>
            ),
          },
        ]}
        exclusive
        variant="flush"
      />
    </div>
  ),
};