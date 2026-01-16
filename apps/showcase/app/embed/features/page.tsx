'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Badge, Typography } from '@bricks/core/bundle';

const features = [
  { icon: '🎨', title: 'Customizable', description: 'Easily customize every aspect of the components.' },
  { icon: '📱', title: 'Responsive', description: 'All components are fully responsive.' },
  { icon: '♿', title: 'Accessible', description: 'Built with accessibility in mind.' },
  { icon: '📦', title: 'TypeScript', description: 'Full TypeScript support.' },
  { icon: '🌙', title: 'Dark Mode', description: 'Support for dark mode out of the box.' },
  { icon: '⚡', title: 'Fast', description: 'Optimized for performance.' },
];

function FeaturesContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'grid';

  return (
    <div className="embed-container" style={{ minHeight: '100vh' }}>
      {variant === 'grid' && (
        <section style={{ padding: '64px 48px', background: 'var(--ds-white)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '900px', margin: '0 auto' }}>
            {features.map((feature) => (
              <div key={feature.title} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--ds-radius-lg)',
                  background: 'var(--ds-prime-alpha-10, #EEF2FF)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '28px',
                }}>
                  {feature.icon}
                </div>
                <Typography variant="h5" weight="semibold" gutterBottom>{feature.title}</Typography>
                <Typography variant="body2" color="muted">{feature.description}</Typography>
              </div>
            ))}
          </div>
        </section>
      )}

      {variant === 'cards' && (
        <section style={{ padding: '64px 48px', background: 'var(--ds-gray-50)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
            {features.slice(0, 4).map((feature, i) => (
              <Card key={feature.title} style={{ padding: '28px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--ds-radius-md)',
                  background: ['var(--ds-prime-alpha-10, #3B82F620)', 'var(--ds-color-success-alpha-10, #10B98120)', 'var(--ds-color-info-alpha-10, #8B5CF620)', 'var(--ds-color-warning-alpha-10, #F59E0B20)'][i],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '24px',
                }}>
                  {feature.icon}
                </div>
                <Typography variant="h5" weight="semibold" gutterBottom>{feature.title}</Typography>
                <Typography variant="body2" color="muted">{feature.description}</Typography>
              </Card>
            ))}
          </div>
        </section>
      )}

      {variant === 'stats' && (
        <section style={{
          padding: '64px 48px',
          background: 'linear-gradient(135deg, var(--ds-prime, #1E3A8A) 0%, #3730A3 100%)',
          color: 'var(--ds-white)',
          minHeight: '100vh',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                {[
                  { value: '10K+', label: 'Developers' },
                  { value: '500+', label: 'Companies' },
                  { value: '50+', label: 'Components' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <Typography variant="display4" weight="bold" color="inherit">{stat.value}</Typography>
                    <Typography variant="body2" style={{ opacity: 0.8 }}>{stat.label}</Typography>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {['TypeScript Native', 'Fully Accessible', 'Tree Shakeable', 'Dark Mode Ready', 'SSR Compatible', 'Well Documented'].map((item) => (
                <Badge key={item} variant="light" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 'var(--ds-radius-md)',
                  fontSize: '14px',
                  color: 'white',
                  border: 'none',
                }}>
                  ✓ {item}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function FeaturesEmbed() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <FeaturesContent />
    </Suspense>
  );
}
