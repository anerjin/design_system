'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Select, Card, Textarea, Typography } from '@bricks/core/bundle';

function FormsContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'search';

  return (
    <div className="embed-container" style={{ minHeight: '100vh', background: 'var(--ds-gray-50)', padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {variant === 'search' && (
        <Card style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Input placeholder="Search products, categories..." leftIcon={<span>🔍</span>} />
            </div>
            <Button variant="primary">Search</Button>
          </div>
        </Card>
      )}

      {variant === 'filter' && (
        <Card style={{ width: '320px', padding: '24px' }}>
          <Typography variant="h4" gutterBottom>Filters</Typography>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
              Category
            </Typography>
            <Select
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
              ]}
              placeholder="Select category"
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
              Price Range
            </Typography>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Input type="number" placeholder="Min" />
              <Typography variant="body2" color="muted">-</Typography>
              <Input type="number" placeholder="Max" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="outline-secondary" fullWidth>Reset</Button>
            <Button variant="primary" fullWidth>Apply</Button>
          </div>
        </Card>
      )}

      {variant === 'contact' && (
        <Card style={{ width: '480px', padding: '32px' }}>
          <Typography variant="h3" gutterBottom>Contact Us</Typography>
          <form>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div className="form-group">
                <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
                  First Name *
                </Typography>
                <Input placeholder="John" />
              </div>
              <div className="form-group">
                <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
                  Last Name *
                </Typography>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
                Email *
              </Typography>
              <Input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <Typography variant="body2" weight="medium" as="label" style={{ display: 'block', marginBottom: '8px' }}>
                Message *
              </Typography>
              <Textarea rows={4} placeholder="How can we help you?" />
            </div>
            <Button type="button" variant="primary" fullWidth size="lg">Send Message</Button>
          </form>
        </Card>
      )}
    </div>
  );
}

export default function FormsEmbed() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <FormsContent />
    </Suspense>
  );
}
