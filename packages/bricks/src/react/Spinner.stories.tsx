import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Spinner, SpinnerOverlay } from './Spinner';
import { Button } from './Button';
import { Card, CardBody } from './Card';
import { Icon } from './Icon';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['circular', 'dots', 'pulse', 'bars'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'white'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="xs" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Extra Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="sm" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="md" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="lg" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Large</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner size="xl" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Extra Large</p>
      </div>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner type="circular" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Circular</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner type="dots" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Dots</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner type="pulse" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Pulse</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner type="bars" variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Bars</p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="primary" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Primary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="secondary" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Secondary</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="success" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Success</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="warning" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Warning</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="danger" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Danger</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="info" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Info</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner variant="dark" />
        <p style={{ marginTop: '10px', fontSize: '12px' }}>Dark</p>
      </div>
      <div style={{ textAlign: 'center', background: '#333', padding: '20px', borderRadius: '8px' }}>
        <Spinner variant="white" />
        <p style={{ marginTop: '10px', fontSize: '12px', color: 'white' }}>White</p>
      </div>
    </div>
  ),
};

export const TypeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      <div>
        <h4 style={{ marginBottom: '15px' }}>Dots Variations</h4>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Spinner type="dots" variant="success" />
          <Spinner type="dots" variant="warning" />
          <Spinner type="dots" variant="danger" />
          <Spinner type="dots" variant="info" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '15px' }}>Pulse Variations</h4>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Spinner type="pulse" variant="success" />
          <Spinner type="pulse" variant="warning" />
          <Spinner type="pulse" variant="danger" />
          <Spinner type="pulse" variant="info" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '15px' }}>Bars Variations</h4>
        <div style={{ display: 'flex', gap: '30px' }}>
          <Spinner type="bars" variant="success" />
          <Spinner type="bars" variant="warning" />
          <Spinner type="bars" variant="danger" />
          <Spinner type="bars" variant="info" />
        </div>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
      <Spinner size="sm" variant="dark" label="Loading..." />
      <Spinner size="sm" variant="success" label="Processing..." />
      <Spinner size="sm" variant="warning" label="Please wait..." />
      <Spinner size="sm" variant="info" label="Updating..." />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
      <div style={{ textAlign: 'center' }}>
        <Spinner label="Top Label" labelPosition="top" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner label="Right Label" labelPosition="right" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner label="Bottom Label" labelPosition="bottom" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spinner label="Left Label" labelPosition="left" />
      </div>
    </div>
  ),
};

export const IconBasedSpinner: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
      <Spinner useIcon size="sm" />
      <Spinner useIcon size="md" />
      <Spinner useIcon size="lg" variant="success" />
      <Spinner useIcon iconName="loader" size="lg" variant="info" />
    </div>
  ),
};

export const InlineSpinners: Story = {
  render: () => (
    <div>
      <p>
        This is some text with an inline <Spinner size="xs" inline /> spinner in the middle.
      </p>
      <p style={{ marginTop: '10px' }}>
        Processing your request <Spinner size="xs" inline variant="success" />
      </p>
      <p style={{ marginTop: '10px' }}>
        Saving changes <Spinner size="xs" inline type="dots" variant="info" />
      </p>
    </div>
  ),
};

export const ButtonWithSpinner: Story = {
  render: () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const handleClick = (setter: (value: boolean) => void) => {
      setter(true);
      setTimeout(() => setter(false), 2000);
    };

    return (
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          onClick={() => handleClick(setLoading1)}
          disabled={loading1}
        >
          {loading1 ? (
            <>
              <Spinner size="xs" variant="white" inline />
              Loading...
            </>
          ) : (
            'Click Me'
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={() => handleClick(setLoading2)}
          disabled={loading2}
        >
          {loading2 ? (
            <>
              <Spinner size="xs" inline />
              Processing
            </>
          ) : (
            'Process Data'
          )}
        </Button>

        <Button
          variant="success"
          onClick={() => handleClick(setLoading3)}
          disabled={loading3}
        >
          {loading3 ? (
            <>
              <Spinner size="xs" variant="white" inline />
              Saving...
            </>
          ) : (
            <>
              <Icon name="save" /> Save
            </>
          )}
        </Button>
      </div>
    );
  },
};

export const CardLoading: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Card>
        <CardBody>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 20px'
          }}>
            <Spinner size="lg" variant="dark" />
            <p style={{ marginTop: '20px', color: '#666' }}>Loading content...</p>
          </div>
        </CardBody>
      </Card>
    </div>
  ),
};

export const Overlay: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowOverlay = () => {
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 3000);
    };

    return (
      <div>
        <Button onClick={handleShowOverlay}>Show Overlay (3 seconds)</Button>

        <div style={{
          position: 'relative',
          marginTop: '20px',
          padding: '40px',
          background: '#f5f5f5',
          borderRadius: '8px',
          minHeight: '200px'
        }}>
          <h3>Content Area</h3>
          <p>This content will be covered by the overlay when loading.</p>
          <p>Click the button above to see the overlay in action.</p>

          <SpinnerOverlay
            visible={showOverlay}
            label="Loading data..."
            spinnerProps={{ variant: 'primary' }}
          />
        </div>
      </div>
    );
  },
};

export const FullScreenOverlay: Story = {
  render: () => {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleShowOverlay = () => {
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 3000);
    };

    return (
      <div>
        <Button onClick={handleShowOverlay} variant="danger">
          Show Full Screen Overlay (3 seconds)
        </Button>

        <SpinnerOverlay
          visible={showOverlay}
          fullScreen
          label="Processing your request..."
          spinnerProps={{ variant: 'dark', size: 'xl' }}
          backgroundColor="rgba(0, 0, 0, 0.8)"
        />
      </div>
    );
  },
};

export const DataTable: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);

    setTimeout(() => setLoading(false), 2000);

    return (
      <div style={{ width: '600px' }}>
        <div style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '15px',
            background: '#f5f5f5',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0 }}>User Data</h3>
            <Button size="sm" onClick={() => setLoading(true)}>
              <Icon name="refresh" /> Refresh
            </Button>
          </div>

          <div style={{ position: 'relative', minHeight: '300px' }}>
            {loading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '300px'
              }}>
                <Spinner size="lg" label="Loading users..." />
              </div>
            ) : (
              <table style={{ width: '100%' }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>John Doe</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>john@example.com</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>Active</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>Jane Smith</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>jane@example.com</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>Active</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>Bob Wilson</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>bob@example.com</td>
                    <td style={{ padding: '10px', borderTop: '1px solid #e0e0e0' }}>Inactive</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const StatusMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '400px' }}>
      <div style={{
        padding: '15px',
        background: '#e3f2fd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Spinner size="sm" variant="info" />
        <span>Checking for updates...</span>
      </div>

      <div style={{
        padding: '15px',
        background: '#fff3e0',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Spinner size="sm" variant="warning" type="dots" />
        <span>Syncing your data...</span>
      </div>

      <div style={{
        padding: '15px',
        background: '#e8f5e9',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Spinner size="sm" variant="success" type="pulse" />
        <span>Upload in progress...</span>
      </div>

      <div style={{
        padding: '15px',
        background: '#fce4ec',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Spinner size="sm" variant="danger" type="bars" />
        <span>Retrying connection...</span>
      </div>
    </div>
  ),
};