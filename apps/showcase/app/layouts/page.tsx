'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { categories, getSamplesList } from '../config/layouts';

const samples = getSamplesList();

export default function LayoutsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSamples = activeCategory === 'all'
    ? samples
    : samples.filter(s => s.category === activeCategory);

  const handleOpenNewWindow = (e: React.MouseEvent, embedPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(embedPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bricks-list">
      {/* Sidebar */}
      <aside className="bricks-list__sidebar">
        <div className="bricks-list__sidebar-section">
          <h3 className="bricks-list__sidebar-title">Categories</h3>
          <ul className="bricks-list__sidebar-menu">
            {categories.map((cat) => (
              <li key={cat.key}>
                <button
                  onClick={() => setActiveCategory(cat.key)}
                  className={`bricks-list__sidebar-item ${activeCategory === cat.key ? 'bricks-list__sidebar-item--active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="bricks-list__sidebar-count">
                    {cat.key === 'all' ? samples.length : samples.filter(s => s.category === cat.key).length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="bricks-list__sidebar-section">
          <h3 className="bricks-list__sidebar-title">Framework</h3>
          <ul className="bricks-list__sidebar-menu">
            <li>
              <label className="bricks-list__checkbox">
                <input type="checkbox" defaultChecked />
                <span>React</span>
              </label>
            </li>
            <li>
              <label className="bricks-list__checkbox">
                <input type="checkbox" defaultChecked />
                <span>TypeScript</span>
              </label>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="bricks-list__main">
        <div className="bricks-list__header">
          <h1 className="bricks-list__title">
            {activeCategory === 'all' ? 'All Layouts' : categories.find(c => c.key === activeCategory)?.label}
          </h1>
          <span className="bricks-list__count">{filteredSamples.length} layouts</span>
        </div>

        {filteredSamples.length === 0 ? (
          <div className="bricks-list__empty">
            <div className="bricks-list__empty-icon">📐</div>
            <h3 className="bricks-list__empty-title">No layouts yet</h3>
            <p className="bricks-list__empty-desc">Layout templates will be added soon.</p>
          </div>
        ) : (
          <div className="bricks-list__grid">
            {filteredSamples.map((sample) => (
              <div key={sample.path} className="bricks-list__card-wrapper">
                <Link href={sample.path} className="bricks-list__card">
                  <div className="bricks-list__card-preview">
                    <Image
                      src={sample.preview}
                      alt={sample.name}
                      width={400}
                      height={225}
                      className="bricks-list__card-image"
                    />
                    <button
                      className="bricks-list__card-newwindow"
                      onClick={(e) => handleOpenNewWindow(e, sample.embedPath)}
                      title="Open in new window"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </button>
                  </div>
                  <div className="bricks-list__card-content">
                    <h3 className="bricks-list__card-name">{sample.name}</h3>
                    <p className="bricks-list__card-desc">{sample.desc}</p>
                    <div className="bricks-list__card-tags">
                      {sample.tags.map((tag) => (
                        <span key={tag} className="bricks-list__card-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
