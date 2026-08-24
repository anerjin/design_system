# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BRICKS Design System — an npm workspaces monorepo containing one package, `packages/bricks`
(`@bricks/core`): CSS design tokens, 25 React/TypeScript components, and Storybook. A separate
`html_markup/` directory holds a standalone static HTML documentation site that uses the same CSS
but no React.

There is no `apps/` directory and no Next.js showcase app.

## Repository Structure

- **`packages/bricks`** (`@bricks/core`) — the design system package
  - `core/styles/` — CSS: `base/` → `tokens/` → `layout/` → `atoms/` → `molecules/` → `utilities/`
  - `src/react/` — 25 React components + their `*.stories.tsx`
  - `src/stories/` — Foundation stories (Colors, Typography, Spacing, Shadows, Borders) and Tooltip
  - `src/components/` — framework-agnostic vanilla TypeScript component classes
  - `src/next/` — `ClientButton` / `ServerButton` examples for Next.js RSC
  - `scripts/` — `build-css.js` (CSS concatenation + minify), `build-js.js` (Vite lib build wrapper)
  - `.storybook/` — Storybook 10 config (`@storybook/react-vite`)
- **`html_markup/`** — static HTML docs site; `index.html` is a sidebar + iframe shell, page HTML
  lives under `getting-started/`, `design-tokens/`, `elements/`, `components/`, `layout/`, `utilities/`
- **`.github/workflows/deploy.yml`** — builds Storybook into `_site/storybook` and copies
  `html_markup` to `_site/`, then deploys to GitHub Pages on push to `main`

## Commands

### Root
```bash
npm install                 # install all workspaces
npm run storybook           # Storybook dev server (port 6006)
npm run build-storybook     # Storybook static build
npm run build:bricks        # tsc -p tsconfig.lib.json -> packages/bricks/dist/
```

### packages/bricks
```bash
npm run build               # TypeScript -> dist/ (publishable output)
npm run build:css           # -> core/styles/bundle.built.css + bundle.min.css
npm run build:js            # Vite lib mode -> dist/bundle/bricks.{es,umd}.js
npm run build:bundle        # build:css + build:js
npm run build:all           # build + build:bundle
npm run watch               # tsc --watch (outputs to core/scripts/, NOT dist/)
npm run storybook           # Storybook dev
npm run build-storybook     # Storybook static build
npm run clean               # rm -rf dist (POSIX only; on Windows use `rm -rf` via Git Bash)
```

There is no test runner and no linter configured. `packages/bricks/tests/` is an empty placeholder.

## Architecture

### Component Pattern
All React components use `forwardRef`, export their props interface, build BEM class strings, and
set `displayName`:

```tsx
export const Component = forwardRef<HTMLElement, ComponentProps>(({ variant, size, ...props }, ref) => {
  const classes = ['block', `block--${variant}`].filter(Boolean).join(' ');
  return <element ref={ref} className={classes} {...props} />;
});
Component.displayName = 'Component';
```

`Card` is the only true compound component: `Card.tsx` casts the base `Card` to a `CardComponent`
interface and attaches `Header`, `Body`, `Footer`, `Title`, `Subtitle`, `Actions`, `Badge`, `Image`.
`Modal` does **not** — it takes `title` / `header` / `footer` as props, and its `ModalHeader`,
`ModalTitle`, `ModalBody`, `ModalFooter` are standalone named exports.

### CSS Architecture
- **BEM methodology**: `.btn`, `.btn--primary`, `.btn__icon`
- **Design tokens**: CSS variables with a `--ds-*` prefix (`--ds-prime`, `--ds-gray-500`,
  `--ds-space-4`, `--ds-radius-md`, `--ds-shadow-md`)
- **Dark mode**: `[data-theme="dark"]` in `core/styles/tokens/colors.css` overrides token values
- **CSS and React are separate**: changing a component requires editing both the `.tsx` in
  `src/react/` and the `.css` in `core/styles/`
- Adding a new CSS file requires registering it in **three** places: `core/styles/bundle.css`
  (`@import`), `scripts/build-css.js` (`CSS_FILES` array), and `.storybook/preview-head.html`

### Package Exports
```
@bricks/core                   -> dist/index.js               (React components)
@bricks/core/bundle            -> dist/bundle/bricks.es.js | bricks.umd.js
@bricks/core/styles            -> core/styles/bundle.css      (@import-based)
@bricks/core/styles/bundle     -> core/styles/bundle.built.css (single file)
@bricks/core/styles/bundle.min -> core/styles/bundle.min.css
@bricks/core/styles/*          -> individual CSS files
```

Icons use [boxicons](https://boxicons.com/) class names (`bx bx-*`); consumers must load
`boxicons/css/boxicons.min.css` themselves.

### TypeScript configs
- `tsconfig.json` — strict; `outDir: core/scripts`, includes all of `src/**`. Used by `npm run watch`.
  **`core/scripts/` is generated output and is gitignored — never edit or commit it.** The one
  exception is the hand-written `core/scripts/bricks_loader.js`, which `.gitignore` re-includes.
- `tsconfig.lib.json` — extends the above; `outDir: dist`, includes only `src/react/**` and
  `src/index.ts`, excludes stories/tests/`src/components`/`src/stories`. Used by `npm run build`.

## Key Conventions

- React components: `PascalCase.tsx` in `packages/bricks/src/react/`
- Stories: `PascalCase.stories.tsx` alongside components; Storybook's glob is `../src/**/*.stories.*`
- Story titles follow `Category/Component` (General, Feedback, Data Display, Navigation, Data Entry,
  Foundation) — keep new stories in one of those categories
- CSS files: lowercase in `packages/bricks/core/styles/`
- Size variants: `xs | sm | md | lg | xl`
- Variant props map directly to BEM modifiers (`variant="primary"` → `.btn--primary`)
- All props interfaces must be exported
- TypeScript strict mode is on, plus `noUnusedLocals` / `noUnusedParameters` / `noImplicitReturns`
  (relaxed only in `tsconfig.lib.json`)

## Known Gaps

Verify these are still true before relying on them.

- **`html_markup/assets/styles/` is a duplicated copy of `packages/bricks/core/styles/`** and has
  already drifted — `molecules/datepicker.css` there has `.datepicker__toggle` and `[data-mode]`
  rules that the package copy lacks. Editing package CSS does not update the docs site, or vice versa.
- **`Tooltip` is not exported** from `src/index.ts` or `src/react/index.ts` even though
  `src/react/Tooltip.tsx`, its CSS, and `src/stories/Tooltip.stories.tsx` all exist. It ships only
  as a default export from its own module.
- **`ModalHeader` / `ModalTitle` / `ModalBody` / `ModalFooter` are not re-exported** from the
  package index either — consumers of `@bricks/core` can only use `Modal` with its
  `title` / `header` / `footer` props.
- **`Input` and `Select` have no `label` prop** (unlike `Checkbox` / `Radio` / `RadioGroup` /
  `CheckboxGroup`). Don't assume a uniform labeling API across form components.
- **`src/components/*.ts`** (vanilla TS classes) are compiled only into the gitignored
  `core/scripts/` and are imported by nothing. `html_markup` uses its own hand-written
  `assets/js/components.js` instead.
- **`html_markup/assets/js/theme-toggle.js`** is a complete dark-mode toggle implementation but is
  not referenced by any HTML page.
