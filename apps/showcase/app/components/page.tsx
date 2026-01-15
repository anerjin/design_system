'use client';

import { useState } from 'react';
import { Button, Input, Alert, Card, Modal, Badge, Tabs, Toggle, Checkbox } from 'bricks/src/react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ComponentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const tabItems = [
    {
      key: 'buttons',
      label: 'Buttons',
      content: (
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      ),
    },
    {
      key: 'forms',
      label: 'Form Elements',
      content: (
        <div className="space-y-4 p-4">
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <div className="space-y-2">
            <Toggle
              label="Enable notifications"
              checked={toggleChecked}
              onChange={(e) => setToggleChecked(e.target.checked)}
            />
            <Checkbox
              label="I agree to the terms"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'feedback',
      label: 'Feedback',
      content: (
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">BRICKS Components in Next.js</h1>
        <ThemeToggle />
      </div>

      {/* Alert */}
      {alertVisible && (
        <Alert
          variant="info"
          title="Welcome!"
          dismissible
          onDismiss={() => setAlertVisible(false)}
          className="mb-6"
        >
          These are BRICKS Design System components integrated with Next.js App Router.
        </Alert>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <Card.Header>
            <h3 className="text-lg font-semibold">Card Example</h3>
          </Card.Header>
          <Card.Body>
            <p>This is a basic card component from BRICKS.</p>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" variant="primary">Learn More</Button>
          </Card.Footer>
        </Card>

        <Card variant="bordered">
          <Card.Body>
            <h3 className="text-lg font-semibold mb-2">Bordered Card</h3>
            <p>This card has a border variant applied.</p>
          </Card.Body>
        </Card>

        <Card variant="shadow">
          <Card.Body>
            <h3 className="text-lg font-semibold mb-2">Shadow Card</h3>
            <p>This card has a shadow for depth effect.</p>
          </Card.Body>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs items={tabItems} defaultActiveKey="buttons" />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <p>This is a modal dialog from BRICKS Design System.</p>
        <p className="mt-2">It works seamlessly with Next.js!</p>
      </Modal>
    </div>
  );
}