import { Button, Input, Card } from '@bricks/core/bundle';

export default function SearchExample() {
  return (
    <Card style={{ width: '100%', maxWidth: '600px', padding: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Input placeholder="Search products, categories..." leftIcon={<span>🔍</span>} />
        </div>
        <Button variant="primary">Search</Button>
      </div>
    </Card>
  );
}
