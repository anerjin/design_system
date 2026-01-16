import Link from "next/link";

const components = [
  { name: "Accordion", category: "Data Display", description: "Expandable content sections", storybook: "components-accordion" },
  { name: "Alert", category: "Feedback", description: "Contextual feedback messages", storybook: "components-alert" },
  { name: "Avatar", category: "Data Display", description: "User profile images", storybook: "components-avatar" },
  { name: "Badge", category: "Data Display", description: "Status indicators and labels", storybook: "components-badge" },
  { name: "Breadcrumb", category: "Navigation", description: "Navigation path indicator", storybook: "components-breadcrumb" },
  { name: "Button", category: "Actions", description: "Interactive action triggers", storybook: "components-button" },
  { name: "Card", category: "Layout", description: "Content container with sections", storybook: "components-card" },
  { name: "Chart", category: "Data Display", description: "Data visualization charts", storybook: "components-chart" },
  { name: "Checkbox", category: "Forms", description: "Multiple selection input", storybook: "components-checkbox" },
  { name: "DatePicker", category: "Forms", description: "Date selection input", storybook: "components-datepicker" },
  { name: "Dropdown", category: "Navigation", description: "Expandable menu options", storybook: "components-dropdown" },
  { name: "Input", category: "Forms", description: "Text input field", storybook: "components-input" },
  { name: "Modal", category: "Overlays", description: "Dialog overlay component", storybook: "components-modal" },
  { name: "Navbar", category: "Navigation", description: "Top navigation bar", storybook: "components-navbar" },
  { name: "Pagination", category: "Navigation", description: "Page navigation control", storybook: "components-pagination" },
  { name: "Progress", category: "Feedback", description: "Progress indicator bar", storybook: "components-progress" },
  { name: "Radio", category: "Forms", description: "Single selection input", storybook: "components-radio" },
  { name: "Select", category: "Forms", description: "Dropdown selection input", storybook: "components-select" },
  { name: "Spinner", category: "Feedback", description: "Loading state indicator", storybook: "components-spinner" },
  { name: "Table", category: "Data Display", description: "Tabular data display", storybook: "components-table" },
  { name: "Tabs", category: "Navigation", description: "Tabbed content sections", storybook: "components-tabs" },
  { name: "Toggle", category: "Forms", description: "On/off switch input", storybook: "components-toggle" },
  { name: "Tooltip", category: "Overlays", description: "Hover information display", storybook: "components-tooltip" },
  { name: "Typography", category: "Foundation", description: "Text styling components", storybook: "components-typography" },
];

const categories = ["All", "Actions", "Data Display", "Feedback", "Forms", "Layout", "Navigation", "Overlays", "Foundation"];

const isProd = process.env.NODE_ENV === "production";
const STORYBOOK_URL = isProd ? "/private_project_design_system/storybook" : "http://localhost:6006";

export default function Home() {
  return (
    <div className="page">
      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <Link href="/" className="header__logo">
            <span className="header__logo-icon">B</span>
            <span className="header__logo-text">BRICKS</span>
          </Link>
          <nav className="header__nav">
            <Link href="/components" className="header__nav-link">Components</Link>
            <a
              href={STORYBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="header__nav-link"
            >
              Storybook
            </a>
            <a
              href="https://github.com/anerjin/private_project_design_system"
              target="_blank"
              rel="noopener noreferrer"
              className="header__nav-link"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__badge">
              <span className="hero__badge-dot"></span>
              {components.length}+ Components Available
            </div>
            <h1 className="hero__title">
              Beautiful UI Components
              <br />
              <span className="hero__title-highlight">for Your Next Project</span>
            </h1>
            <p className="hero__description">
              Build your next project with high-quality React components.
              Fully typed with TypeScript, accessible, and customizable.
            </p>
            <div className="hero__actions">
              <a
                href={STORYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary btn--lg"
              >
                Open Storybook
              </a>
              <a
                href="https://github.com/anerjin/private_project_design_system"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--lg"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="stats__inner">
            <div className="stats__item">
              <div className="stats__value">{components.length}+</div>
              <div className="stats__label">Components</div>
            </div>
            <div className="stats__item">
              <div className="stats__value">{categories.length - 1}</div>
              <div className="stats__label">Categories</div>
            </div>
            <div className="stats__item">
              <div className="stats__value">100%</div>
              <div className="stats__label">TypeScript</div>
            </div>
            <div className="stats__item">
              <div className="stats__value">A11y</div>
              <div className="stats__label">Accessible</div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="section">
          <div className="section__inner">
            <div className="section__header">
              <h2 className="section__title">Explore Components</h2>
              <p className="section__description">
                Click any component to view interactive examples in Storybook.
              </p>
            </div>

            {/* Category Filter */}
            <div className="filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter__btn ${category === "All" ? "filter__btn--active" : ""}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Components Grid */}
            <div className="component-grid">
              {components.map((component) => (
                <a
                  key={component.name}
                  href={`${STORYBOOK_URL}/?path=/docs/${component.storybook}--docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="component-card"
                >
                  <div className="component-card__header">
                    <div className="component-card__icon">
                      {component.name.charAt(0)}
                    </div>
                    <span className="component-card__category">
                      {component.category}
                    </span>
                  </div>
                  <h3 className="component-card__name">{component.name}</h3>
                  <p className="component-card__description">
                    {component.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta">
          <div className="cta__inner">
            <h2 className="cta__title">Ready to Build?</h2>
            <p className="cta__description">
              Explore all components with interactive examples in Storybook.
            </p>
            <div className="cta__actions">
              <a
                href={STORYBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn cta__btn--white"
              >
                Open Storybook
              </a>
              <a
                href="https://github.com/anerjin/private_project_design_system"
                target="_blank"
                rel="noopener noreferrer"
                className="btn cta__btn--outline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__logo">
            <span className="footer__logo-icon">B</span>
            <span className="footer__logo-text">BRICKS Design System</span>
          </div>
          <div className="footer__text">
            Built with Next.js, TypeScript, and BRICKS CSS
          </div>
        </div>
      </footer>
    </div>
  );
}
