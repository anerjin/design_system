# OpenRouter model selection

`LayoutChat` currently uses 24 example entries. They demonstrate the picker; they
are not a live availability or pricing list. Chat messages remain a local demo.

The picker supports model name/ID/developer search, dynamically derived developer
filters, favorites, the ten most recent selections, sorting, and pages of 20 rows.
Favorites, recent selections and the selected ID are stored locally with safe
fallback when browser storage is unavailable. Missing pricing is never shown as free.

To supply the real catalog, fetch the model list through the application's API and pass
the normalized response to the existing UI:

```tsx
const response = await fetch('/api/ai/models');
if (!response.ok) throw new Error('Model catalog request failed');
const models = normalizeOpenRouterModels(await response.json());

<LayoutChat models={models} modelSourceLabel="OpenRouter" />
```

The application's endpoint should return the OpenRouter `/api/v1/models` envelope
with `data`. Handle request loading/errors in the caller and retain the last valid
list on transient failures. If a selected ID disappears, the picker asks for a new
selection and sending is disabled until a valid model is selected.
An initially empty list retains the saved selection while data loads. Without a
saved selection, the first model is selected when the catalog becomes available.

Messages retain both the exact `modelId` and a display-name snapshot. When connecting
chat completion, send `modelId` as the request's `model` through the application's
server; keep the OpenRouter API key on that server. No key or completion API is
connected in this gallery example.

Reference: https://openrouter.ai/docs/api/api-reference/models/get-models

Validate the adapter with `node --test apps/gallery/src/layouts/chatModels.test.mjs`.
