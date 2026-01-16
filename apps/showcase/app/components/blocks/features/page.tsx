'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { getComponentByKey, getVariantLabels, getCodeExamples, getComponentTags } from '../../../config/components';

const component = getComponentByKey('features')!;
const variantLabels = getVariantLabels('features');
const codeExamples = getCodeExamples('features');
const componentTags = getComponentTags('features');

function FeaturesContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'grid';
  const label = variantLabels[variant] || 'Icon Grid';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[variant] || codeExamples.grid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewWindow = () => {
    window.open(`${component.embedPath}?variant=${variant}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bricks-detail">
      <div className="bricks-detail__breadcrumb">
        <Link href="/components">Components</Link>
        <span>/</span>
        <span>{component.name}</span>
        <span>/</span>
        <span>{label}</span>
      </div>

      <div className="bricks-detail__layout">
        <div className="bricks-detail__main">
          <div className="bricks-detail__header">
            <h1 className="bricks-detail__title">{component.name} - {label}</h1>
            <div className="bricks-detail__actions">
              <button onClick={handleOpenNewWindow} className="bricks-detail__btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Open in New Window
              </button>
              <button onClick={handleCopy} className="bricks-detail__btn">
                {copied ? '✓ Copied' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="bricks-detail__preview">
            <iframe
              src={`${component.embedPath}?variant=${variant}`}
              className="bricks-detail__iframe"
              title={`${component.name} Preview`}
            />
          </div>

          <div className="bricks-detail__code-section">
            <div className="bricks-detail__code-header">
              <span className="bricks-detail__code-tab bricks-detail__code-tab--active">Code</span>
            </div>
            <div className="bricks-detail__code">
              <pre><code>{codeExamples[variant] || codeExamples.grid}</code></pre>
            </div>
          </div>
        </div>

        <aside className="bricks-detail__sidebar">
          <div className="bricks-detail__info">
            <h3 className="bricks-detail__info-title">Component Info</h3>
            <dl className="bricks-detail__info-list">
              <div className="bricks-detail__info-item">
                <dt>Category</dt>
                <dd><span className="bricks-detail__badge">{component.name}</span></dd>
              </div>
              <div className="bricks-detail__info-item">
                <dt>Variant</dt>
                <dd>{label}</dd>
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
              {componentTags.map((tag) => (
                <span key={tag} className="bricks-detail__tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="bricks-detail__info">
            <h3 className="bricks-detail__info-title">Related</h3>
            <ul className="bricks-detail__related">
              {Object.entries(variantLabels).filter(([key]) => key !== variant).map(([key, val]) => (
                <li key={key}>
                  <Link href={`${component.basePath}?variant=${key}`}>{val}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function FeaturesSamplePage() {
  return (
    <Suspense fallback={<div className="bricks-detail__loading">Loading...</div>}>
      <FeaturesContent />
    </Suspense>
  );
}
