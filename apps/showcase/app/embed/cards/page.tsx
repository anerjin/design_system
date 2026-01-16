'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, Button, Avatar, Badge, Typography } from '@bricks/core/bundle';

const products = [
  { name: 'Wireless Headphones', price: '$299', rating: 4.8 },
  { name: 'Smart Watch Pro', price: '$449', rating: 4.9, sale: true, originalPrice: '$549' },
  { name: 'Laptop Stand', price: '$79', rating: 4.5 },
];

const profiles = [
  { name: 'Sarah Johnson', role: 'Product Designer', followers: '12.5k' },
  { name: 'Mike Chen', role: 'Frontend Developer', followers: '8.2k' },
];

const stats = [
  { title: 'Total Revenue', value: '$45,231', change: '+20.1%', positive: true },
  { title: 'Active Users', value: '2,350', change: '+15.3%', positive: true },
  { title: 'Bounce Rate', value: '24.5%', change: '-5.2%', positive: false },
  { title: 'Avg. Session', value: '3m 42s', change: '+8.1%', positive: true },
];

function CardsContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'product';

  return (
    <div className="embed-container" style={{ minHeight: '100vh', background: 'var(--ds-gray-50)', padding: '48px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {variant === 'product' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 280px)', gap: '24px' }}>
          {products.map((product, index) => (
            <Card key={index} style={{ overflow: 'hidden' }}>
              <div style={{ height: '180px', background: `hsl(${index * 60}, 70%, 90%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px' }}>📦</span>
              </div>
              <Card.Body>
                <Typography variant="body1" weight="semibold" gutterBottom>{product.name}</Typography>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ color: 'var(--ds-color-warning)' }}>★</span>
                  <Typography variant="body2">{product.rating}</Typography>
                  {product.sale && <Badge variant="danger" size="sm">SALE</Badge>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="h5" weight="bold" display="inline">{product.price}</Typography>
                    {product.originalPrice && (
                      <Typography variant="body2" color="muted" decoration="line-through" display="inline" style={{ marginLeft: '8px' }}>
                        {product.originalPrice}
                      </Typography>
                    )}
                  </div>
                  <Button variant="primary" size="sm">Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {variant === 'profile' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 280px)', gap: '24px' }}>
          {profiles.map((person, index) => (
            <Card key={index} style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <Avatar
                  size="xl"
                  initials={person.name.split(' ').map(n => n[0]).join('')}
                  style={{ background: `hsl(${index * 60}, 70%, 60%)` }}
                />
              </div>
              <Typography variant="h5" weight="semibold">{person.name}</Typography>
              <Typography variant="body2" color="muted" gutterBottom>{person.role}</Typography>
              <Typography variant="h4" weight="bold">{person.followers}</Typography>
              <Typography variant="caption" color="muted" style={{ marginBottom: '20px', display: 'block' }}>Followers</Typography>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button variant="primary" fullWidth>Follow</Button>
                <Button variant="outline-secondary" fullWidth>Message</Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {variant === 'stat' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 220px)', gap: '20px' }}>
          {stats.map((stat, index) => (
            <Card key={index} style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <Typography variant="body2" color="muted">{stat.title}</Typography>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: stat.positive ? 'var(--ds-color-success-alpha-10, rgba(16, 185, 129, 0.1))' : 'var(--ds-color-danger-alpha-10, rgba(239, 68, 68, 0.1))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  📊
                </div>
              </div>
              <Typography variant="h3" weight="bold" gutterBottom>{stat.value}</Typography>
              <Badge variant={stat.positive ? 'success' : 'danger'}>
                {stat.change}
              </Badge>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CardsEmbed() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <CardsContent />
    </Suspense>
  );
}
