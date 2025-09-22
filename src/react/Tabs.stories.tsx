import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './Tabs';
import { Badge } from './Badge';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    justified: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultTabs = [
  {
    key: 'tab1',
    label: 'Tab 1',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Tab 1 Content</h3>
        <p>This is the content for the first tab.</p>
      </div>
    ),
  },
  {
    key: 'tab2',
    label: 'Tab 2',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Tab 2 Content</h3>
        <p>This is the content for the second tab.</p>
      </div>
    ),
  },
  {
    key: 'tab3',
    label: 'Tab 3',
    content: (
      <div style={{ padding: '20px' }}>
        <h3>Tab 3 Content</h3>
        <p>This is the content for the third tab.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: defaultTabs,
    defaultActiveKey: 'tab1',
  },
};

export const Pills: Story = {
  args: {
    variant: 'pills',
    items: defaultTabs,
    defaultActiveKey: 'tab1',
  },
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    items: [
      {
        key: 'general',
        label: 'General',
        content: (
          <div style={{ padding: '20px', minHeight: '200px' }}>
            <h3>General Settings</h3>
            <p>Configure your general preferences here.</p>
          </div>
        ),
      },
      {
        key: 'security',
        label: 'Security',
        content: (
          <div style={{ padding: '20px', minHeight: '200px' }}>
            <h3>Security Settings</h3>
            <p>Manage your security and privacy settings.</p>
          </div>
        ),
      },
      {
        key: 'notifications',
        label: 'Notifications',
        content: (
          <div style={{ padding: '20px', minHeight: '200px' }}>
            <h3>Notification Preferences</h3>
            <p>Control how and when you receive notifications.</p>
          </div>
        ),
      },
      {
        key: 'advanced',
        label: 'Advanced',
        content: (
          <div style={{ padding: '20px', minHeight: '200px' }}>
            <h3>Advanced Settings</h3>
            <p>Advanced configuration options for power users.</p>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'general',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Small</h4>
        <Tabs
          size="sm"
          items={defaultTabs}
          defaultActiveKey="tab1"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Medium (Default)</h4>
        <Tabs
          size="md"
          items={defaultTabs}
          defaultActiveKey="tab1"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Large</h4>
        <Tabs
          size="lg"
          items={defaultTabs}
          defaultActiveKey="tab1"
        />
      </div>
    </div>
  ),
};

export const Justified: Story = {
  args: {
    justified: true,
    items: [
      {
        key: 'short',
        label: 'Short',
        content: <div style={{ padding: '20px' }}>Short label tab</div>,
      },
      {
        key: 'medium',
        label: 'Medium Label',
        content: <div style={{ padding: '20px' }}>Medium length label tab</div>,
      },
      {
        key: 'long',
        label: 'Very Long Label Here',
        content: <div style={{ padding: '20px' }}>Long label tab</div>,
      },
    ],
    defaultActiveKey: 'short',
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: 'home',
        label: 'Home',
        icon: <span style={{ marginRight: '6px' }}>🏠</span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Home</h3>
            <p>Welcome to the home tab.</p>
          </div>
        ),
      },
      {
        key: 'profile',
        label: 'Profile',
        icon: <span style={{ marginRight: '6px' }}><i className="bx bx-user"></i></span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Profile</h3>
            <p>View and edit your profile information.</p>
          </div>
        ),
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <span style={{ marginRight: '6px' }}>⚙️</span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Settings</h3>
            <p>Manage your application settings.</p>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'home',
  },
};

export const WithBadges: Story = {
  args: {
    variant: 'pills',
    items: [
      {
        key: 'inbox',
        label: 'Inbox',
        badge: <Badge variant="danger" size="sm">24</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Inbox</h3>
            <p>You have 24 unread messages.</p>
          </div>
        ),
      },
      {
        key: 'sent',
        label: 'Sent',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Sent Messages</h3>
            <p>View your sent messages.</p>
          </div>
        ),
      },
      {
        key: 'drafts',
        label: 'Drafts',
        badge: <Badge variant="secondary" size="sm">3</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Drafts</h3>
            <p>You have 3 draft messages.</p>
          </div>
        ),
      },
      {
        key: 'spam',
        label: 'Spam',
        badge: <Badge variant="warning" size="sm">!</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Spam</h3>
            <p>Spam messages are kept here.</p>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'inbox',
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      {
        key: 'active',
        label: 'Active Tab',
        content: (
          <div style={{ padding: '20px' }}>
            <p>This tab is active and clickable.</p>
          </div>
        ),
      },
      {
        key: 'disabled',
        label: 'Disabled Tab',
        disabled: true,
        content: (
          <div style={{ padding: '20px' }}>
            <p>This content is not accessible.</p>
          </div>
        ),
      },
      {
        key: 'another',
        label: 'Another Tab',
        content: (
          <div style={{ padding: '20px' }}>
            <p>This is another active tab.</p>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'active',
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeKey, setActiveKey] = useState('tab1');

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={() => setActiveKey('tab1')}
            style={{ marginRight: '8px', padding: '4px 12px' }}
          >
            Go to Tab 1
          </button>
          <button
            onClick={() => setActiveKey('tab2')}
            style={{ marginRight: '8px', padding: '4px 12px' }}
          >
            Go to Tab 2
          </button>
          <button
            onClick={() => setActiveKey('tab3')}
            style={{ padding: '4px 12px' }}
          >
            Go to Tab 3
          </button>
        </div>
        <Tabs
          items={defaultTabs}
          activeKey={activeKey}
          onChange={setActiveKey}
        />
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Active tab: {activeKey}
        </p>
      </div>
    );
  },
};

export const ComplexContent: Story = {
  args: {
    variant: 'pills',
    size: 'lg',
    items: [
      {
        key: 'overview',
        label: 'Overview',
        icon: <span style={{ marginRight: '6px' }}>📊</span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Project Overview</h3>
            <p>This is a comprehensive overview of your project.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginTop: '20px' }}>
              <div style={{ padding: '16px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>42</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Total Tasks</div>
              </div>
              <div style={{ padding: '16px', background: '#d4edda', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#155724' }}>28</div>
                <div style={{ fontSize: '14px', color: '#155724' }}>Completed</div>
              </div>
              <div style={{ padding: '16px', background: '#cce5ff', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#004085' }}>10</div>
                <div style={{ fontSize: '14px', color: '#004085' }}>In Progress</div>
              </div>
              <div style={{ padding: '16px', background: '#fff3cd', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>4</div>
                <div style={{ fontSize: '14px', color: '#856404' }}>Pending</div>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'analytics',
        label: 'Analytics',
        icon: <span style={{ marginRight: '6px' }}>📈</span>,
        badge: <Badge variant="success" size="sm">New</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Analytics Dashboard</h3>
            <p>View your project metrics and performance.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
              <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
                <strong>Total Views</strong>
                <p style={{ fontSize: '32px', margin: '8px 0' }}>12,543</p>
                <small style={{ color: '#666' }}>+23% from last month</small>
              </div>
              <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
                <strong>Engagement Rate</strong>
                <p style={{ fontSize: '32px', margin: '8px 0' }}>87%</p>
                <small style={{ color: '#666' }}>+5% from last month</small>
              </div>
            </div>
          </div>
        ),
      },
      {
        key: 'reports',
        label: 'Reports',
        icon: <span style={{ marginRight: '6px' }}>📑</span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Monthly Reports</h3>
            <p>Download and view your monthly reports.</p>
            <div style={{ marginTop: '16px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Report</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '8px' }}>Q1 Performance</td>
                    <td style={{ padding: '8px' }}>Apr 1, 2024</td>
                    <td style={{ padding: '8px' }}><Badge variant="success" size="sm">Ready</Badge></td>
                    <td style={{ padding: '8px' }}><a href="#">Download</a></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '8px' }}>March Summary</td>
                    <td style={{ padding: '8px' }}>Mar 31, 2024</td>
                    <td style={{ padding: '8px' }}><Badge variant="success" size="sm">Ready</Badge></td>
                    <td style={{ padding: '8px' }}><a href="#">Download</a></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '8px' }}>February Summary</td>
                    <td style={{ padding: '8px' }}>Feb 29, 2024</td>
                    <td style={{ padding: '8px' }}><Badge variant="success" size="sm">Ready</Badge></td>
                    <td style={{ padding: '8px' }}><a href="#">Download</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <span style={{ marginRight: '6px' }}>⚙️</span>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Project Settings</h3>
            <form style={{ marginTop: '16px', maxWidth: '500px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Project Name
                </label>
                <input
                  type="text"
                  defaultValue="My Project"
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  defaultValue="Project description..."
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px', resize: 'vertical' }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                  Visibility
                </label>
                <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                  <option>Public</option>
                  <option>Private</option>
                  <option>Team Only</option>
                </select>
              </div>
              <button
                type="button"
                style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Save Changes
              </button>
            </form>
          </div>
        ),
      },
    ],
    defaultActiveKey: 'overview',
  },
};

export const NavigationTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('products');

    const navigationTabs = [
      {
        key: 'products',
        label: 'Products',
        badge: <Badge variant="primary" size="sm">120</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Product Catalog</h3>
            <p>Browse through our extensive product collection.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
              {['Product A', 'Product B', 'Product C'].map(product => (
                <div key={product} style={{ padding: '12px', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                  <h4>{product}</h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>Sample product description</p>
                  <button style={{ marginTop: '8px', padding: '4px 12px', fontSize: '12px' }}>View Details</button>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        key: 'customers',
        label: 'Customers',
        badge: <Badge variant="success" size="sm">1.2K</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Customer Management</h3>
            <p>Manage your customer relationships and data.</p>
          </div>
        ),
      },
      {
        key: 'orders',
        label: 'Orders',
        badge: <Badge variant="warning" size="sm">45</Badge>,
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Order Management</h3>
            <p>Track and manage customer orders.</p>
          </div>
        ),
      },
      {
        key: 'analytics',
        label: 'Analytics',
        content: (
          <div style={{ padding: '20px' }}>
            <h3>Business Analytics</h3>
            <p>View insights and performance metrics.</p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Tabs
          variant="default"
          size="lg"
          items={navigationTabs}
          activeKey={activeTab}
          onChange={setActiveTab}
          justified
        />
      </div>
    );
  },
};