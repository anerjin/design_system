'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import config from './config';
import './styles.css';

function FormsContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'search';
  const variantConfig = config.variants.find(v => v.key === variant) || config.variants[0];
  const [copied, setCopied] = useState(false);
  const [codeExample, setCodeExample] = useState('');

  useEffect(() => {
    // Load code example from file
    fetch(`/api/code-example?path=components/ui/forms/examples/${variant}.example.tsx`)
      .then(res => res.text())
      .then(setCodeExample)
      .catch(() => setCodeExample('// Code example not available'));
  }, [variant]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewWindow = () => {
    window.open(`/embed/ui/forms?variant=${variant}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bricks-detail">
      <div className="bricks-detail__breadcrumb">
        <Link href="/components">Components</Link>
        <span>/</span>
        <span>{config.name}</span>
        <span>/</span>
        <span>{variantConfig.label}</span>
      </div>

      <div className="bricks-detail__layout">
        <div className="bricks-detail__main">
          <div className="bricks-detail__header">
            <h1 className="bricks-detail__title">{config.name} - {variantConfig.label}</h1>
            <div className="bricks-detail__actions">
              <button onClick={handleOpenNewWindow} className="btn btn--secondary btn--sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open in New Window
              </button>
              <button onClick={handleCopy} className="btn btn--secondary btn--sm">
                {copied ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="bricks-detail__preview">
            <iframe
              src={`/embed/ui/forms?variant=${variant}`}
              className="bricks-detail__iframe"
              title={`${config.name} Preview`}
            />
          </div>

          <div className="bricks-detail__code-section">
            <div className="bricks-detail__code-header">
              <span className="bricks-detail__code-tab bricks-detail__code-tab--active">Code</span>
            </div>
            <div className="bricks-detail__code">
              <pre><code>{codeExample}</code></pre>
            </div>
          </div>
        </div>

        <aside className="bricks-detail__sidebar">
          <div className="bricks-detail__info">
            <h3 className="bricks-detail__info-title">Component Info</h3>
            <dl className="bricks-detail__info-list">
              <div className="bricks-detail__info-item">
                <dt>Category</dt>
                <dd><span className="bricks-detail__badge">{config.category}</span></dd>
              </div>
              <div className="bricks-detail__info-item">
                <dt>Variant</dt>
                <dd>{variantConfig.label}</dd>
              </div>
              <div className="bricks-detail__info-item">
                <dt>Framework</dt>
                <dd>React</dd>
              </div>
            </dl>
          </div>

          <div className="bricks-detail__info">
            <h3 className="bricks-detail__info-title">Tags</h3>
            <div className="bricks-detail__tags">
              {variantConfig.tags.map((tag) => (
                <span key={tag} className="bricks-detail__tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="bricks-detail__info">
            <h3 className="bricks-detail__info-title">Related</h3>
            <ul className="bricks-detail__related">
              {config.variants.filter(v => v.key !== variant).map((v) => (
                <li key={v.key}>
                  <Link href={`/components/ui/forms?variant=${v.key}`}>{v.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function FormsPage() {
  return (
    <Suspense fallback={<div className="bricks-detail__loading">Loading...</div>}>
      <FormsContent />
    </Suspense>
  );
}
