# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BRICKS Design System — npm workspaces monorepo containing a React/TypeScript component library (`packages/bricks`) and a Next.js showcase app (`apps/showcase`).

## Monorepo Structure

- **`packages/bricks`** (`@bricks/core`): Core design system — 25+ React components, CSS design tokens, Storybook
- **`apps/showcase`** (`@bricks/showcase`): Next.js 15 static export site consuming `@bricks/core`, deployed to GitHub Pages

## Commands

### Root Level
```bash
npm run dev                 # Showcase dev server
npm run storybook           # Storybook dev server (port 6006)
npm run build:bricks        # TypeScript compile bricks package
npm run build:all           # Build showcase + embed Storybook
```

### packages/bricks
```bash
npm run build               # TypeScript → dist/
npm run build:css           # Bundle & minify CSS
npm run build:bundle        # CSS + JS bundles
npm run build:all           # TypeScript + bundles
npm run watch               # TypeScript watch mode
npm run storybook           # Storybook dev
npm run clean               # Remove dist/
```

### apps/showcase
```bash
npm run dev                 # Next.js dev server
npm run build               # Static export build
npm run lint                # ESLint
npm run copy:styles         # Copy bricks CSS to public/styles/
```

## Architecture

### Component Pattern
All React components use `forwardRef` with exported TypeScript interfaces, BEM class construction, and `displayName`:

```tsx
export const Component = forwardRef<HTMLElement, ComponentProps>(({ variant, size, ...props }) => {
  const classes = ['block', `block--${variant}`].filter(Boolean).join(' ');
  return <element className={classes} {...props} />;
});
Component.displayName = 'Component';
```

Compound components (Card, Modal) attach subcomponents: `Card.Header`, `Card.Body`, `Modal.Footer`, etc.

### CSS Architecture
- **BEM methodology**: `.btn`, `.btn--primary`, `.btn__icon`
- **Design tokens**: CSS variables with `--ds-*` prefix (`--ds-prime`, `--ds-gray-500`, `--ds-space-4`)
- **Atomic organization**: `core/styles/` contains `tokens/` → `atoms/` → `molecules/` → `utilities/`
- **Dark mode**: `[data-theme="dark"]` selector overrides token values
- **CSS and React are separate**: changing a component requires editing both `.tsx` in `src/react/` and `.css` in `core/styles/`

### Package Exports
```
@bricks/core              → dist/index.js (React components)
@bricks/core/bundle       → dist/bundle/bricks.es.js
@bricks/core/styles       → core/styles/bundle.css
@bricks/core/styles/bundle.min → core/styles/bundle.min.css
```

## Key Conventions

- React components: `PascalCase.tsx` in `packages/bricks/src/react/`
- Stories: `PascalCase.stories.tsx` alongside components
- CSS files: lowercase in `packages/bricks/core/styles/`
- Size variants: `xs | sm | md | lg | xl`
- Component variant props map directly to BEM modifiers (`variant="primary"` → `.btn--primary`)
- All props interfaces must be exported
- TypeScript strict mode enabled
