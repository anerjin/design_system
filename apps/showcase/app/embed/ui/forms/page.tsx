'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchExample from '../../../components/ui/forms/examples/search.example';
import '../../../components/ui/forms/styles.css';

function FormsEmbed() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'search';

  return (
    <div className="embed-container" style={{
      minHeight: '100vh',
      background: 'var(--ds-gray-50)',
      padding: '48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      {variant === 'search' && <SearchExample />}
    </div>
  );
}

export default function FormsEmbedPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <FormsEmbed />
    </Suspense>
  );
}
