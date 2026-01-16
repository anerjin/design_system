import Link from "next/link";
import Image from "next/image";

const isProd = process.env.NODE_ENV === "production";
const STORYBOOK_URL = isProd ? "/private_project_design_system/storybook" : "http://localhost:6006";

const featuredSamples = [
  {
    name: 'Hero - Centered',
    path: '/components/blocks/hero?variant=centered',
    preview: '/previews/hero-centered.png',
    tags: ['Hero', 'Landing'],
  },
  {
    name: 'Hero - Split Layout',
    path: '/components/blocks/hero?variant=split',
    preview: '/previews/hero-split.png',
    tags: ['Hero', 'Landing'],
  },
  {
    name: 'Hero - Minimal',
    path: '/components/blocks/hero?variant=minimal',
    preview: '/previews/hero-minimal.png',
    tags: ['Hero', 'Landing'],
  },
  {
    name: 'Features - Icon Grid',
    path: '/components/blocks/features?variant=grid',
    preview: '/previews/features-grid.png',
    tags: ['Features', 'Marketing'],
  },
];

const formSamples = [
  {
    name: 'Search Bar',
    path: '/components/ui/forms?variant=search',
    preview: '/previews/forms-search.png',
    tags: ['Forms', 'Input'],
  },
  {
    name: 'Filter Form',
    path: '/components/ui/forms?variant=filter',
    preview: '/previews/forms-filter.png',
    tags: ['Forms', 'Input'],
  },
  {
    name: 'Contact Form',
    path: '/components/ui/forms?variant=contact',
    preview: '/previews/forms-contact.png',
    tags: ['Forms', 'Input'],
  },
  {
    name: 'Features - Card Grid',
    path: '/components/blocks/features?variant=cards',
    preview: '/previews/features-cards.png',
    tags: ['Features', 'Marketing'],
  },
];

const cardSamples = [
  {
    name: 'Product Card',
    path: '/components/ui/cards?variant=product',
    preview: '/previews/cards-product.png',
    tags: ['Cards', 'E-commerce'],
  },
  {
    name: 'Profile Card',
    path: '/components/ui/cards?variant=profile',
    preview: '/previews/cards-profile.png',
    tags: ['Cards', 'Social'],
  },
  {
    name: 'Stat Card',
    path: '/components/ui/cards?variant=stat',
    preview: '/previews/cards-stat.png',
    tags: ['Cards', 'Dashboard'],
  },
  {
    name: 'Features - With Stats',
    path: '/components/blocks/features?variant=stats',
    preview: '/previews/features-stats.png',
    tags: ['Features', 'Marketing'],
  },
];

export default function Home() {
  return (
    <div className="bricks-home">
      {/* Header */}
      <header className="bricks-header">
        <div className="bricks-header__inner">
          <Link href="/" className="bricks-header__logo">
            <span className="bricks-header__logo-icon">B</span>
            <span className="bricks-header__logo-text">BRICKS</span>
          </Link>
          <nav className="bricks-header__nav">
            <Link href="/components" className="bricks-header__link">Components</Link>
            <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className="bricks-header__link">
              Storybook
            </a>
          </nav>
          <div className="bricks-header__actions">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bricks-header__icon-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bricks-hero">
        <div className="bricks-hero__bg"></div>
        <div className="bricks-hero__inner">
          <span className="bricks-hero__badge">BRICKS DESIGN SYSTEM</span>
          <h1 className="bricks-hero__title">Beautiful React<br/>UI Components</h1>
          <p className="bricks-hero__desc">
            High-quality React components for your next project.<br/>
            Browse, preview, and integrate with a single command.
          </p>
          <div className="bricks-hero__actions">
            <Link href="/components" className="bricks-hero__btn bricks-hero__btn--primary">
              Browse Components
            </Link>
            <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className="bricks-hero__btn bricks-hero__btn--outline">
              View Storybook
            </a>
          </div>
          <div className="bricks-hero__tags">
            <Link href="/components?category=hero" className="bricks-hero__tag">Hero</Link>
            <Link href="/components?category=features" className="bricks-hero__tag">Features</Link>
            <Link href="/components?category=forms" className="bricks-hero__tag">Forms</Link>
            <Link href="/components?category=cards" className="bricks-hero__tag">Cards</Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bricks-section">
        <div className="bricks-section__inner">
          <div className="bricks-section__header">
            <h2 className="bricks-section__title">Hero Sections</h2>
            <Link href="/components?category=hero" className="bricks-section__link">See all →</Link>
          </div>
          <div className="bricks-section__grid">
            {featuredSamples.map((sample) => (
              <Link key={sample.path} href={sample.path} className="bricks-card bricks-card--sm">
                <div className="bricks-card__preview bricks-card__preview--sm">
                  <Image
                    src={sample.preview}
                    alt={sample.name}
                    width={400}
                    height={225}
                    className="bricks-card__image"
                  />
                </div>
                <div className="bricks-card__content">
                  <h3 className="bricks-card__name">{sample.name}</h3>
                  <div className="bricks-card__tags">
                    {sample.tags.map((tag) => (
                      <span key={tag} className="bricks-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="bricks-section">
        <div className="bricks-section__inner">
          <div className="bricks-section__header">
            <h2 className="bricks-section__title">Form Patterns</h2>
            <Link href="/components?category=forms" className="bricks-section__link">See all →</Link>
          </div>
          <div className="bricks-section__grid">
            {formSamples.map((sample) => (
              <Link key={sample.path} href={sample.path} className="bricks-card bricks-card--sm">
                <div className="bricks-card__preview bricks-card__preview--sm">
                  <Image
                    src={sample.preview}
                    alt={sample.name}
                    width={400}
                    height={225}
                    className="bricks-card__image"
                  />
                </div>
                <div className="bricks-card__content">
                  <h3 className="bricks-card__name">{sample.name}</h3>
                  <div className="bricks-card__tags">
                    {sample.tags.map((tag) => (
                      <span key={tag} className="bricks-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bricks-section">
        <div className="bricks-section__inner">
          <div className="bricks-section__header">
            <h2 className="bricks-section__title">Card Components</h2>
            <Link href="/components?category=cards" className="bricks-section__link">See all →</Link>
          </div>
          <div className="bricks-section__grid">
            {cardSamples.map((sample) => (
              <Link key={sample.path} href={sample.path} className="bricks-card bricks-card--sm">
                <div className="bricks-card__preview bricks-card__preview--sm">
                  <Image
                    src={sample.preview}
                    alt={sample.name}
                    width={400}
                    height={225}
                    className="bricks-card__image"
                  />
                </div>
                <div className="bricks-card__content">
                  <h3 className="bricks-card__name">{sample.name}</h3>
                  <div className="bricks-card__tags">
                    {sample.tags.map((tag) => (
                      <span key={tag} className="bricks-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bricks-cta">
        <div className="bricks-cta__inner">
          <h2 className="bricks-cta__title">Ready to build faster?</h2>
          <p className="bricks-cta__desc">
            Browse our component library and start building beautiful interfaces today.
          </p>
          <div className="bricks-cta__actions">
            <Link href="/components" className="bricks-cta__btn bricks-cta__btn--primary">
              Browse Components
            </Link>
            <a href={STORYBOOK_URL} target="_blank" rel="noopener noreferrer" className="bricks-cta__btn bricks-cta__btn--outline">
              View Storybook
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bricks-footer">
        <div className="bricks-footer__inner">
          <div className="bricks-footer__logo">
            <span className="bricks-footer__logo-icon">B</span>
            <span>BRICKS Design System</span>
          </div>
          <p className="bricks-footer__text">Built with React & TypeScript</p>
        </div>
      </footer>
    </div>
  );
}
