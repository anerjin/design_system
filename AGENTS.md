# Repository Guidelines

## Project Structure & Module Organization
The design system lives under `bricks/`, with CSS split into `tokens` (global variables), `atoms` and `molecules` (component layers), `layout`, and `utilities`. JavaScript helpers reside in `bricks/js/bricks_core.js`, and shared icons in `bricks/icon/`. Static entry points sit at the repo root (`index.html`) and within `pages/`, which mirrors the component taxonomy (`pages/components`, `pages/utilities`, etc.) for previewing patterns. Reference notes, competitive research, and screenshots are kept in `_guide/` for context when proposing changes.

## Build, Test, and Development Commands
- `npm install` once to set up the minimal toolchain.
- `npm run serve` starts a lightweight Python server on http://localhost:8000 for live previewing the system catalogue.
- `python -m http.server 8000` is the equivalent manual command if you prefer not to rely on npm scripts.
Reload the browser after edits; no bundler runs in the background, so ensure saved files are under `bricks/` or `pages/` to see updates.

## Coding Style & Naming Conventions
Write CSS with two-space indentation and group declarations logically (tokens → base → components). Use BEM-inspired selectors like `.dropdown__menu--fixed` to match existing naming. JavaScript in `bricks_core.js` follows four-space indentation, strict mode, and attaches features to the global `BRICKS` namespace. Keep comments concise and bilingual only when necessary for hand-off; default to English. When adding assets, prefer lowercase-kebab filenames.

## Testing Guidelines
There is no automated test harness; rely on manual regression checks via the `pages/` previews. For components, create or update the matching HTML in `pages/components/<component>.html` and validate both light and dark themes. When fixing JS behaviours, test keyboard support (Escape, tab focus) and scrolling interactions because dropdown logic depends on them. Document any known limitations in `_guide/project_guide.md` for future reviewers.

## Commit & Pull Request Guidelines
Follow the existing date-based commit prefix (`YYYYMMDD##_optional-note`, e.g., `20250917_02`). Provide descriptive bodies outlining impacted layers (tokens, atoms, JS). Pull requests should include: a brief summary of intent, screenshots or GIFs for visual tweaks, reproduction steps for bug fixes, and links to relevant `_guide/` context. Highlight any breaking changes to theme tokens or component class names to prompt downstream updates.
