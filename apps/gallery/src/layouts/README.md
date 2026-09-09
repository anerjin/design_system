# Layout examples

The examples are `DOI-L-LOGIN-1`, `DOI-L-LOGIN-2`, `DOI-L-LOGIN-3`,
`DOI-L-THREE-COLUMN`, `DOI-L-DASHBOARD-01` and `DOI-L-DASHBOARD-02`, in that sidebar order. `catalog.ts` supplies the sidebar and
page-ID lookup; `pages/Layout.tsx` resolves the `#/layout?layout=PAGE-ID` route and
supplies the gallery toolbar and preview container. The default is login type 1.

## Code responsibilities

- `LoginType1.tsx` / `LoginType2.tsx` / `LoginType3.tsx`: centered card, full split
  and split-card compositions based on `캡쳐이미지/login_01.png` through `login_04.png`.
- `LoginForm.tsx`: shared login/signup form, password visibility and recovery modal.
  Controls use core Card, Fieldset, Label, Input, Button, Tabs, Divider, Modal and
  Alert components; local CSS in `login-layouts.css` controls composition and spacing.
  Authentication is a UI demo: it validates input but does not send credentials,
  create accounts, send recovery mail or initiate social sign-in.
- `ThreeColumnLayout.tsx`: menu, document content, chat slot and panel composition.
- `DashboardType01.tsx`: workspace overview composed from core Card, Stat, Chart,
  Table, Progress, Avatar, Badge, Button, Input, Select, Fieldset, Label and Modal.
  Period selection updates the animated area chart and metrics; project search,
  status filtering, creation, completion and filtered CSV export are interactive.
  `dashboardData.ts` holds sample data; edits last only while the example is mounted.
  `dashboard.css` scopes the responsive composition and spacing to this example.
- `DashboardProjectCharts.tsx`: radar comparison of the first five projects and
  polar-area visualization of active projects per member, using core Chart.
  Both charts reflect project creation and completion. Its cumulative completion
  chart follows the selected period, completing the 50:25:25 primary chart row.
- `DashboardHighlights.tsx`: local agenda checklist and member workload.
  Member actions filter the main project list.
- `DashboardType02.tsx`: commerce composition with a 240px left menu, central
  metrics/charts/orders and a 300px right widget rail for goals, products and campaigns.
  The rail moves below the content on narrower screens; the left menu stacks on mobile.
  Central grids respond to their own available width through a named CSS container.
  It reuses core Card, Stat, Chart, RadialProgress, Table and form controls.
  `dashboardCommerceData.ts` supplies sample period aggregates and recent orders;
  `dashboard-commerce.css` scopes light/dark palettes and responsive layout.
  Period selection updates aggregates and charts. Order shipping and campaign
  toggles update local demo state only; they do not contact a store or send messages.
- `LayoutOptions.tsx`: document and display controls, using the core components.
- `useLayoutDocument.ts`: document-specific title, body, status, priority and read-only
  state; shared display settings and their reset defaults.
- `useLayoutPanels.ts`: container measurement, saved chat width and header alignment.
- `LayoutChat.tsx`: chat UI, local messages and selected model.
- `useChatWindow.ts`: open/closed/minimized state, saved dock mode, pointer/keyboard
  movement, resize constraints and cleanup.
- `ChatModelPicker.tsx` / `chatModels.ts`: catalog UI and API normalization. See
  [CHAT_MODELS.md](./CHAT_MODELS.md) for the integration boundary.

Layout, chat-window and model-picker styles have separate files. Shared colors and
controls continue to come from the design system.

## Behaviors to preserve

- The chat instance and its dock portal container stay mounted across mode changes.
  Closing hides the column without reparenting the portal during the dialog exit.
- Render the separator only while docked on desktop. A hidden separator remains
  registered with the panel library and can cause invalid constraints when the
  responsive layout stacks its panels.
- The separator belongs between the editor and chat. The options sidebar keeps its
  CSS width. Panel IDs are unique per example instance.
- Docked header height follows the actual content header, including wrapped badges.
  Floating chat keeps its own header size.
- Display mode is stored under `doi-chat-display-mode`. The window starts closed on
  reload. Messages, drafts, dimensions and document edits remain in memory for the
  mounted example; model preferences and display mode survive reloads.
- Browser storage failure must not prevent opening or using chat. Pointer capture,
  cursor overrides, resize observers and scheduled focus work must be cleaned up.

## Validation

```sh
npm run typecheck --workspace=apps/gallery
node --test apps/gallery/src/layouts/chatModels.test.mjs
npm run build:gallery
```

For UI changes, check document switching/reset, dock/float/close/reopen, minimized
icon drag/restore, mouse/touch/keyboard resizing, header alignment, model search and
selection, and navigation during an active drag. Check desktop and stacked layouts
in both themes, including a 320px viewport. An asynchronously loaded catalog should
restore a saved model ID; a removed model must disable sending until reselected.
