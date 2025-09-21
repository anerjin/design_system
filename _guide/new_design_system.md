# BRICKS Design System - Folder Structure Improvement Plan

## Current Folder Structure Analysis

### Current Structure
```
private_project_design_system/
├── bricks/           # Core design system
│   ├── css/         # Atomic Design pattern applied
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── base/
│   │   ├── layout/
│   │   ├── tokens/
│   │   └── utilities/
│   └── js/          # Component scripts
│       └── components/
├── pages/           # Component docs/demos (HTML)
├── theme/           # Usage examples (dashboard, settings, widget)
├── layout/          # CSS bundler role
├── src/             # TypeScript/React support (recently added)
├── _guide/          # Project documentation
└── index.html       # Main catalog
```

### Issues Found
1. **Ambiguous folder names**: Unclear roles for `bricks`, `pages`, `theme`
2. **Duplicate structure**: `layout/css/index.css` acts as bundler
3. **Mixed sources**: TypeScript and Vanilla JS mixed together
4. **No build output**: Missing dist folder

## Improved Folder Structure

```
private_project_design_system/
│
├── core/                         # Core design system (current bricks)
│   ├── styles/                   # CSS
│   │   ├── tokens/               # Design tokens (variables)
│   │   ├── base/                 # reset, base
│   │   ├── components/
│   │   │   ├── atoms/            # Basic components
│   │   │   └── molecules/        # Complex components
│   │   ├── layout/               # Layout system
│   │   ├── utilities/            # Utility classes
│   │   └── bundle.css            # Bundled CSS (current layout/css/index.css)
│   │
│   └── scripts/                  # JavaScript (current bricks/js)
│       ├── components/           # Component JS
│       └── bricks_loader.js      # Core loader
│
├── src/                          # Source code (by framework)
│   ├── vanilla/                  # Vanilla JS/TS version
│   │   └── components/
│   ├── react/                    # React components
│   │   └── components/
│   ├── vue/                      # Vue components (future)
│   └── types/                    # TypeScript definitions
│
├── docs/                         # Documentation (current pages)
│   ├── components/               # Component demos
│   ├── design-tokens/            # Token documentation
│   ├── getting-started/          # Getting started guide
│   ├── layout/                   # Layout examples
│   ├── utilities/                # Utilities documentation
│   └── index.html                # Documentation home
│
├── templates/                    # Template examples (current theme)
│   ├── dashboard/                # Dashboard template
│   ├── admin-panel/              # Admin panel
│   └── landing-page/             # Landing page
│
├── dist/                         # Build output
│   ├── css/                      # Final CSS
│   ├── js/                       # Final JS
│   └── react/                    # React build
│
├── tests/                        # Tests (new)
├── scripts/                      # Build/deploy scripts
├── guides/                       # Project guides (current _guide)
│
├── index.html                    # Main catalog
├── package.json
├── tsconfig.json
└── README.md
```

## Migration Plan

### Phase 1: Folder Renaming (Minimal Breaking Changes)
```bash
# Basic folder renaming
mv bricks core
mv pages docs
mv theme templates
mv _guide guides

# Consolidate layout folder
mv layout/css/index.css core/styles/bundle.css
rm -rf layout
```

### Phase 2: Path Updates
- Update import paths in all HTML files
- Update path references in JavaScript
- Modify CSS @import paths

### Phase 3: Build System Setup
- Configure TypeScript compilation
- Setup CSS/JS bundling
- Add npm scripts

### Phase 4: Documentation Cleanup
- Update README.md
- Write component API documentation
- Improve usage guides

## Benefits

### Clarity
- **core/**: Core of the design system
- **src/**: Framework-specific source code
- **docs/**: Documentation and demos
- **templates/**: Real usage examples
- **dist/**: Deployable build output

### Scalability
- Support for multiple frameworks
- Ready for npm package deployment
- Easy to add tests
- CI/CD pipeline ready

### Maintainability
- Clear structure for easy onboarding
- Independent development by framework
- Simplified build process
- Clear version management

## Next Steps

1. **Immediate Actions**
   - Rename folders
   - Update basic paths

2. **Short-term (1-2 weeks)**
   - Complete TypeScript migration
   - Build system setup
   - Test environment setup

3. **Medium-term (1 month)**
   - Complete React component library
   - Integrate Storybook
   - Deploy npm package

4. **Long-term (3 months)**
   - Add Vue support
   - Automate design tokens
   - Visual regression testing

## Important Notes

### Compatibility
- Consider symbolic links for backward compatibility
- Gradual migration to minimize breaking changes

### Documentation
- Record all changes in CHANGELOG
- Provide migration guide

### Team Communication
- Get team consensus before structure changes
- Share change schedule in advance

---

## Framework-Specific Implementation Strategy

### React/Next.js Migration (from react_nextjs_remake.md)

#### Core Strategy
- **Separation**: Keep CSS/tokens as-is (minimal changes), componentize with React, provide docs/samples with Next.js
- **Gradual Migration**: Initially use BEM classes and CSS as-is with React components → Later encapsulate with CSS Modules/Vanilla-Extract if needed

#### Monorepo Structure
```
packages/
├── bricks-core/        # CSS and design tokens
├── bricks-react/       # React components
└── bricks-vue/         # Vue components (future)
apps/
├── docs-next/          # Next.js documentation site
└── docs-nuxt/          # Nuxt.js documentation site (future)
```

#### Component Design Principles
- Support common props: `className`, `style`, `id`, `disabled`, `aria-*`
- Use `forwardRef` and polymorphic `as` prop pattern
- Map `size` and `variant` to BEM classes (`.btn--sm`, `.toggle--dark`)
- Expose accessibility patterns through props

#### JavaScript Migration Strategy
Convert existing `bricks/js/bricks_core.js` logic to React hooks:
- Dropdown → `useDropdown` (focus trap, Esc, arrow keys, outside click)
- Toggle → `useToggle` (checked/onChange, role="switch", arrow key handling)
- Navbar → `useNavbar` (mobile toggle, document click close, scroll lock)

#### Next.js Integration
- Use App Router structure with `app/` directory
- Import common CSS in `app/globals.css`
- Mark interactive components with `'use client'`
- Implement ThemeProvider for server/client theme synchronization
- Use MDX or Storybook for documentation

#### Testing Strategy
- Unit/Accessibility: React Testing Library + Jest/Vitest with jest-axe
- E2E: Playwright for keyboard navigation and scroll/focus scenarios
- Visual: Chromatic or Percy for visual regression

#### Package Distribution
```json
{
  "name": "@bricks/react",
  "exports": {
    ".": {
      "require": "./dist/index.js",
      "import": "./dist/index.esm.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^17.0.0 || ^18.0.0",
    "react-dom": "^17.0.0 || ^18.0.0"
  }
}
```

---

## Design System Best Practices (from tairo_design.md)

### Design Token Architecture
Implement a comprehensive token system inspired by Tairo:

```css
/* Token Categories */
:root {
  /* Colors - with 50-900 scale */
  --color-primary-50: /* lightest */
  --color-primary-500: /* base */
  --color-primary-900: /* darkest */

  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-size-base: 1rem;
  --line-height-base: 1.5;

  /* Spacing - consistent scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Shadows - elevation levels */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Border radius - consistent curves */
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

### Dark Mode Implementation
```css
/* Automatic theme switching */
[data-theme="dark"] {
  --color-primary-500: /* adjusted for dark */
  --color-background: #111827;
  --color-text: #f9fafb;
  /* Override all color tokens */
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* Auto dark mode */
  }
}
```

### Component Variant System
Standardize component variants across the system:

```typescript
interface ComponentVariants {
  // Colors
  color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

  // Sizes
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // States
  state: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
}
```

### Responsive Breakpoints
```css
/* Mobile-first breakpoints */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large screens */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Accessibility Standards
- WCAG 2.1 AA compliance minimum
- Keyboard navigation for all interactive elements
- ARIA attributes and roles properly implemented
- Focus management and visual indicators
- Color contrast ratios meeting standards

### Performance Optimization
- Code splitting by route and component
- Lazy loading for heavy components
- CSS purging for unused styles
- Image optimization and lazy loading
- Font subsetting and preloading

### Documentation Requirements
Each component should include:
1. **Purpose**: Clear description of component use case
2. **Props Table**: Complete API documentation
3. **Accessibility**: Keyboard shortcuts and ARIA guidelines
4. **Examples**: Multiple usage scenarios
5. **Design Tokens**: Related tokens and customization points
6. **Migration Guide**: From vanilla to framework version

### Component Implementation Checklist
- [ ] TypeScript definitions
- [ ] Accessibility audit (keyboard, screen reader)
- [ ] Dark mode support
- [ ] Responsive behavior
- [ ] Performance profiling
- [ ] Unit and integration tests
- [ ] Visual regression tests
- [ ] Documentation with examples
- [ ] Storybook story
- [ ] Migration guide from vanilla version