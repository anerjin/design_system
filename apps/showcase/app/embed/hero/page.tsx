'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Badge, Input, Card, Typography } from '@bricks/core/bundle';

function HeroContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'centered';

  return (
    <div className="embed-container" style={{ minHeight: '100vh' }}>
      {variant === 'centered' && (
        <section style={{
          padding: '80px 48px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, var(--ds-prime, #667EEA) 0%, #764BA2 100%)',
          color: 'var(--ds-white)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Badge variant="light">Now in Beta</Badge>
            </div>
            <Typography variant="display2" weight="bold" color="inherit" align="center" style={{
              maxWidth: '700px',
              margin: '0 auto 20px',
              lineHeight: '1.1',
            }}>
              Build Beautiful Apps Faster with BRICKS
            </Typography>
            <Typography variant="body1" color="inherit" align="center" style={{
              opacity: 0.9,
              maxWidth: '560px',
              margin: '0 auto 36px',
              lineHeight: '1.7',
            }}>
              A comprehensive design system with 50+ components, built for React.
            </Typography>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <Button variant="light" size="lg">Get Started</Button>
              <Button variant="ghost" size="lg" style={{ color: 'white' }}>View on GitHub</Button>
            </div>
          </div>
        </section>
      )}

      {variant === 'split' && (
        <section style={{ display: 'flex', minHeight: '100vh' }}>
          <div style={{
            flex: 1,
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'var(--ds-white)',
          }}>
            <div style={{ marginBottom: '20px' }}>
              <Badge variant="primary">New Release v2.0</Badge>
            </div>
            <Typography variant="display3" weight="bold" gutterBottom>
              The Modern Design System for Teams
            </Typography>
            <Typography variant="body1" color="muted" style={{ marginBottom: '32px', lineHeight: '1.7' }}>
              Build consistent, accessible, and beautiful user interfaces with our comprehensive component library.
            </Typography>
            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="primary" size="lg">Start Free Trial</Button>
              <Button variant="outline-secondary" size="lg">Watch Demo</Button>
            </div>
          </div>
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, var(--ds-prime, #3B82F6) 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}>
            <Card style={{ width: '100%', maxWidth: '360px', padding: '32px' }}>
              <Typography variant="h4" weight="semibold" gutterBottom>Create your account</Typography>
              <div style={{ marginBottom: '16px' }}>
                <Input placeholder="Full name" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Input type="email" placeholder="Email address" />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <Input type="password" placeholder="Password" />
              </div>
              <Button variant="primary" fullWidth>Get started for free</Button>
            </Card>
          </div>
        </section>
      )}

      {variant === 'minimal' && (
        <section style={{
          padding: '100px 48px',
          textAlign: 'center',
          background: 'var(--ds-gray-50)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <Typography variant="display3" weight="bold" gutterBottom>
              Simple, Beautiful Components
            </Typography>
            <Typography variant="body1" color="muted" style={{ marginBottom: '36px', lineHeight: '1.7' }}>
              Everything you need to build modern web applications. No complexity, just clean design.
            </Typography>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', maxWidth: '400px', margin: '0 auto' }}>
              <div style={{ flex: 1 }}>
                <Input placeholder="Enter your email" />
              </div>
              <Button variant="dark">Subscribe</Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function HeroEmbed() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <HeroContent />
    </Suspense>
  );
}
