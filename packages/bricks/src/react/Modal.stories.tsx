import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'fullscreen'],
    },
    closable: {
      control: 'boolean',
    },
    centered: {
      control: 'boolean',
    },
    scrollable: {
      control: 'boolean',
    },
    staticBackdrop: {
      control: 'boolean',
    },
    disableEscapeKeyDown: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWithButton = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    title: 'Default Modal',
    children: (
      <div>
        <p>This is the modal content. You can add any content here.</p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">Confirm</Button>
      </div>
    ),
  },
};

export const Small: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    size: 'sm',
    title: 'Small Modal',
    children: <p>This is a small modal dialog. Perfect for simple confirmations.</p>,
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm">OK</Button>
      </div>
    ),
  },
};

export const Large: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    size: 'lg',
    title: 'Large Modal',
    children: (
      <div>
        <p>This is a large modal with more content.</p>
        <p>It can contain multiple paragraphs and other elements.</p>
        <p>The modal will adjust its size accordingly.</p>
      </div>
    ),
  },
};

export const ExtraLarge: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    size: 'xl',
    title: 'Extra Large Modal',
    children: (
      <div>
        <p>This is an extra large modal.</p>
        <p>It provides more space for complex content while still maintaining modal behavior.</p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="sm">Close</Button>
        <Button variant="primary" size="sm">Save Changes</Button>
      </div>
    ),
  },
};

export const FullScreen: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    size: 'fullscreen',
    title: 'Full Screen Modal',
    children: (
      <div>
        <h3>Full Screen Experience</h3>
        <p>This modal takes up the full screen.</p>
        <p>It's useful for complex forms, detailed content, or immersive experiences.</p>
        <p>The fullscreen mode removes the backdrop and makes the modal fill the entire viewport.</p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Apply</Button>
      </div>
    ),
  },
};

export const Centered: Story = {
  render: (args) => <ModalWithButton {...args} />,
  args: {
    centered: true,
    title: 'Centered Modal',
    children: <p>This modal is vertically centered.</p>,
  },
};

export const WithoutCloseButton: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          closable={false}
          title="Required Action"
          onClose={() => setOpen(false)}
          footer={
            <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
              I Understand
            </Button>
          }
        >
          <p>This modal has no close button. You must click the button below to proceed.</p>
        </Modal>
      </>
    );
  },
};

export const StaticBackdrop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Static Modal</Button>
        <Modal
          open={open}
          staticBackdrop
          title="Important Notice"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </div>
          }
        >
          <p>This modal has a static backdrop. Clicking outside won't close it.</p>
          <p>You must use the buttons or close icon to dismiss this modal.</p>
        </Modal>
      </>
    );
  },
};

export const DisableEscapeKey: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          disableEscapeKeyDown
          title="Escape Key Disabled"
          onClose={() => setOpen(false)}
        >
          <p>Pressing the ESC key won't close this modal.</p>
          <p>Use the close button or click outside to dismiss.</p>
        </Modal>
      </>
    );
  },
};

export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Scrollable Modal</Button>
        <Modal
          open={open}
          scrollable
          title="Terms and Conditions"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
                Decline
              </Button>
              <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
                Accept
              </Button>
            </div>
          }
        >
          <div>
            <p>This modal has scrollable content.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>
                {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            ))}
          </div>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);
    const [openXl, setOpenXl] = useState(false);
    const [openFullscreen, setOpenFullscreen] = useState(false);

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenSm(true)}>Small</Button>
        <Button onClick={() => setOpenMd(true)}>Medium</Button>
        <Button onClick={() => setOpenLg(true)}>Large</Button>
        <Button onClick={() => setOpenXl(true)}>Extra Large</Button>
        <Button onClick={() => setOpenFullscreen(true)}>Fullscreen</Button>

        <Modal
          open={openSm}
          size="sm"
          title="Small Modal"
          onClose={() => setOpenSm(false)}
        >
          <p>This is a small modal (sm).</p>
        </Modal>

        <Modal
          open={openMd}
          size="md"
          title="Medium Modal"
          onClose={() => setOpenMd(false)}
        >
          <p>This is a medium modal (md). This is the default size.</p>
        </Modal>

        <Modal
          open={openLg}
          size="lg"
          title="Large Modal"
          onClose={() => setOpenLg(false)}
        >
          <p>This is a large modal (lg).</p>
        </Modal>

        <Modal
          open={openXl}
          size="xl"
          title="Extra Large Modal"
          onClose={() => setOpenXl(false)}
        >
          <p>This is an extra large modal (xl).</p>
        </Modal>

        <Modal
          open={openFullscreen}
          size="fullscreen"
          title="Fullscreen Modal"
          onClose={() => setOpenFullscreen(false)}
        >
          <p>This is a fullscreen modal.</p>
        </Modal>
      </div>
    );
  },
};

export const CompoundComponents: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Compound Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Modal.Header>
            <Modal.Title>Custom Modal with Compound Components</Modal.Title>
            <button
              type="button"
              className="modal__close"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </Modal.Header>
          <Modal.Body>
            <p>This modal uses the Compound Component pattern.</p>
            <p>You can use Modal.Header, Modal.Title, Modal.Body, and Modal.Footer components.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const ConfirmationModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete Item</Button>
        <Modal
          open={open}
          size="sm"
          centered
          title="Confirm Deletion"
          onClose={() => !loading && setOpen(false)}
          closable={!loading}
          staticBackdrop={loading}
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          }
        >
          <p>Are you sure you want to delete this item?</p>
          <p style={{ fontSize: '14px', color: '#666' }}>This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form</Button>
        <Modal
          open={open}
          size="lg"
          title="User Registration"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Submit</Button>
            </div>
          }
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>Message</label>
              <textarea
                rows={4}
                placeholder="Enter your message"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' }}
              />
            </div>
          </form>
        </Modal>
      </>
    );
  },
};