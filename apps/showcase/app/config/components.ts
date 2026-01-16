// Components Configuration
// Central configuration for all showcase components

export interface ComponentVariant {
  key: string;
  label: string;
  description: string;
  tags: string[];
  preview: string;
  codeExample: string;
}

export interface ComponentConfig {
  key: string;
  name: string;
  category: 'blocks' | 'ui';
  basePath: string;
  embedPath: string;
  variants: ComponentVariant[];
}

export interface CategoryConfig {
  key: string;
  label: string;
}

// Categories
export const categories: CategoryConfig[] = [
  { key: 'all', label: 'All Components' },
  { key: 'hero', label: 'Hero' },
  { key: 'features', label: 'Features' },
  { key: 'forms', label: 'Forms' },
  { key: 'cards', label: 'Cards' },
];

// Component Configurations
export const components: ComponentConfig[] = [
  // Hero
  {
    key: 'hero',
    name: 'Hero',
    category: 'blocks',
    basePath: '/components/blocks/hero',
    embedPath: '/embed/hero',
    variants: [
      {
        key: 'centered',
        label: 'Centered',
        description: 'Centered hero section with CTA buttons',
        tags: ['React', 'Landing'],
        preview: '/previews/hero-centered.png',
        codeExample: `<section className="hero hero--centered">
  <div className="hero__inner">
    <span className="badge badge--light">Now in Beta</span>
    <h1 className="hero__title">Build Beautiful Apps</h1>
    <p className="hero__desc">A comprehensive design system...</p>
    <div className="hero__actions">
      <button className="btn btn--light btn--lg">Get Started</button>
      <button className="btn btn--ghost btn--lg">Learn More</button>
    </div>
  </div>
</section>`,
      },
      {
        key: 'split',
        label: 'Split Layout',
        description: 'Two-column hero with form or media',
        tags: ['React', 'Landing'],
        preview: '/previews/hero-split.png',
        codeExample: `<section className="hero hero--split">
  <div className="hero__content">
    <span className="badge badge--primary">New Release</span>
    <h1>The Modern Design System</h1>
    <p>Build consistent, accessible interfaces...</p>
    <button className="btn btn--primary btn--lg">Start Free Trial</button>
  </div>
  <div className="hero__media">
    <div className="card">
      <h3>Create your account</h3>
      <input className="input" placeholder="Email" />
      <input className="input" type="password" placeholder="Password" />
      <button className="btn btn--primary btn--block">Sign Up</button>
    </div>
  </div>
</section>`,
      },
      {
        key: 'minimal',
        label: 'Minimal',
        description: 'Simple hero with email subscription',
        tags: ['React', 'Landing'],
        preview: '/previews/hero-minimal.png',
        codeExample: `<section className="hero hero--minimal">
  <h1>Simple, Beautiful Components</h1>
  <p>Everything you need to build modern web apps.</p>
  <div className="hero__form">
    <input className="input" placeholder="Enter your email" />
    <button className="btn btn--dark">Subscribe</button>
  </div>
</section>`,
      },
    ],
  },

  // Features
  {
    key: 'features',
    name: 'Features',
    category: 'blocks',
    basePath: '/components/blocks/features',
    embedPath: '/embed/features',
    variants: [
      {
        key: 'grid',
        label: 'Icon Grid',
        description: 'Feature grid with icons',
        tags: ['React', 'Marketing'],
        preview: '/previews/features-grid.png',
        codeExample: `<section className="features">
  <div className="features__header">
    <h2>Everything you need to build</h2>
    <p>Our comprehensive design system includes all the components.</p>
  </div>
  <div className="features__grid">
    {features.map((feature) => (
      <div className="feature-item">
        <div className="feature-item__icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </div>
</section>`,
      },
      {
        key: 'cards',
        label: 'Card Grid',
        description: 'Feature cards with shadows',
        tags: ['React', 'Marketing'],
        preview: '/previews/features-cards.png',
        codeExample: `<section className="features features--cards">
  <div className="features__header">
    <span className="badge badge--primary">Features</span>
    <h2>A better way to build</h2>
  </div>
  <div className="features__grid">
    {features.map((feature) => (
      <div className="card feature-card">
        <div className="feature-card__icon">{feature.icon}</div>
        <h3>{feature.title}</h3>
        <p>{feature.description}</p>
      </div>
    ))}
  </div>
</section>`,
      },
      {
        key: 'stats',
        label: 'With Stats',
        description: 'Features with statistics',
        tags: ['React', 'Marketing'],
        preview: '/previews/features-stats.png',
        codeExample: `<section className="features features--stats">
  <div className="features__content">
    <h2>Trusted by developers worldwide</h2>
    <p>Join thousands of developers building with BRICKS.</p>
    <div className="stats-grid">
      <div className="stat"><span>10K+</span>Developers</div>
      <div className="stat"><span>500+</span>Companies</div>
    </div>
  </div>
  <div className="features__list">
    {features.map((item) => (
      <div className="feature-badge">✓ {item}</div>
    ))}
  </div>
</section>`,
      },
    ],
  },

  // Forms
  {
    key: 'forms',
    name: 'Forms',
    category: 'ui',
    basePath: '/components/ui/forms',
    embedPath: '/embed/forms',
    variants: [
      {
        key: 'search',
        label: 'Search Bar',
        description: 'Search input with button',
        tags: ['React', 'Input'],
        preview: '/previews/forms-search.png',
        codeExample: `<div className="search-form">
  <div className="search-form__wrapper">
    <span className="search-form__icon">🔍</span>
    <input
      type="text"
      className="input"
      placeholder="Search products..."
    />
    <button className="btn btn--primary">Search</button>
  </div>
</div>`,
      },
      {
        key: 'filter',
        label: 'Filter Form',
        description: 'Product filter with selects',
        tags: ['React', 'Input'],
        preview: '/previews/forms-filter.png',
        codeExample: `<div className="card filter-form">
  <h3>Filters</h3>

  <div className="form-group">
    <label>Category</label>
    <select className="select">
      <option>All Categories</option>
      <option>Electronics</option>
    </select>
  </div>

  <div className="form-group">
    <label>Price Range</label>
    <div className="input-group">
      <input type="number" className="input" placeholder="Min" />
      <input type="number" className="input" placeholder="Max" />
    </div>
  </div>

  <div className="filter-form__actions">
    <button className="btn btn--outline-secondary">Reset</button>
    <button className="btn btn--primary">Apply</button>
  </div>
</div>`,
      },
      {
        key: 'contact',
        label: 'Contact Form',
        description: 'Contact form with validation',
        tags: ['React', 'Input'],
        preview: '/previews/forms-contact.png',
        codeExample: `<div className="card contact-form">
  <h3>Contact Us</h3>

  <form>
    <div className="form-row">
      <div className="form-group">
        <label>First Name *</label>
        <input className="input" placeholder="John" />
      </div>
      <div className="form-group">
        <label>Last Name *</label>
        <input className="input" placeholder="Doe" />
      </div>
    </div>

    <div className="form-group">
      <label>Email *</label>
      <input type="email" className="input" placeholder="john@example.com" />
    </div>

    <div className="form-group">
      <label>Message *</label>
      <textarea className="textarea" rows={4} placeholder="How can we help?" />
    </div>

    <button className="btn btn--primary btn--block btn--lg">Send Message</button>
  </form>
</div>`,
      },
    ],
  },

  // Cards
  {
    key: 'cards',
    name: 'Cards',
    category: 'ui',
    basePath: '/components/ui/cards',
    embedPath: '/embed/cards',
    variants: [
      {
        key: 'product',
        label: 'Product Card',
        description: 'E-commerce product card',
        tags: ['React', 'E-commerce'],
        preview: '/previews/cards-product.png',
        codeExample: `<div className="card product-card">
  <div className="product-card__image">
    <img src="/product.jpg" alt="Product" />
    {sale && <span className="badge badge--danger">SALE</span>}
  </div>
  <div className="product-card__content">
    <h3>{product.name}</h3>
    <div className="product-card__rating">
      <span>★</span> {product.rating}
    </div>
    <div className="product-card__price">
      <span className="price">{product.price}</span>
      {originalPrice && <span className="price--old">{originalPrice}</span>}
    </div>
    <button className="btn btn--primary btn--sm">Add to Cart</button>
  </div>
</div>`,
      },
      {
        key: 'profile',
        label: 'Profile Card',
        description: 'User profile card with stats',
        tags: ['React', 'Social'],
        preview: '/previews/cards-profile.png',
        codeExample: `<div className="card profile-card">
  <div className="profile-card__avatar">
    <img src="/avatar.jpg" alt={user.name} />
  </div>
  <h3 className="profile-card__name">{user.name}</h3>
  <p className="profile-card__role">{user.role}</p>
  <div className="profile-card__stats">
    <div className="stat">
      <span>{user.followers}</span>
      <label>Followers</label>
    </div>
    <div className="stat">
      <span>{user.projects}</span>
      <label>Projects</label>
    </div>
  </div>
  <div className="profile-card__actions">
    <button className="btn btn--primary">Follow</button>
    <button className="btn btn--outline-secondary">Message</button>
  </div>
</div>`,
      },
      {
        key: 'stat',
        label: 'Stat Card',
        description: 'Dashboard statistics card',
        tags: ['React', 'Dashboard'],
        preview: '/previews/cards-stat.png',
        codeExample: `<div className="card stat-card">
  <div className="stat-card__header">
    <p className="stat-card__title">{stat.title}</p>
    <div className="stat-card__icon" style={{ background: stat.color }}>
      {stat.icon}
    </div>
  </div>
  <p className="stat-card__value">{stat.value}</p>
  <div className="stat-card__change">
    <span className={positive ? 'positive' : 'negative'}>
      {stat.change}
    </span>
    <span className="label">vs last month</span>
  </div>
</div>`,
      },
    ],
  },
];

// Helper functions
export function getComponentByKey(key: string): ComponentConfig | undefined {
  return components.find((c) => c.key === key);
}

export function getVariantLabels(componentKey: string): Record<string, string> {
  const component = getComponentByKey(componentKey);
  if (!component) return {};
  return component.variants.reduce(
    (acc, v) => ({ ...acc, [v.key]: v.label }),
    {}
  );
}

export function getCodeExamples(componentKey: string): Record<string, string> {
  const component = getComponentByKey(componentKey);
  if (!component) return {};
  return component.variants.reduce(
    (acc, v) => ({ ...acc, [v.key]: v.codeExample }),
    {}
  );
}

export function getComponentTags(componentKey: string): string[] {
  const component = getComponentByKey(componentKey);
  if (!component) return [];
  return [component.key, ...new Set(component.variants.flatMap((v) => v.tags))];
}

// Generate flat samples list for components page
export function getSamplesList() {
  return components.flatMap((component) =>
    component.variants.map((variant) => ({
      name: `${component.name} - ${variant.label}`,
      desc: variant.description,
      path: `${component.basePath}?variant=${variant.key}`,
      embedPath: `${component.embedPath}?variant=${variant.key}`,
      category: component.key,
      tags: variant.tags,
      preview: variant.preview,
    }))
  );
}
