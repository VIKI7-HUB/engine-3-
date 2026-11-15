# Engine 3 Work Log

## 2026-11-12

- Built the responsive tourist-place search interface, filters, ranked result cards, and place-details preview.
- Added photo thumbnails to place cards and suggestions, with a larger preview and image-source attribution.
- Added the 34-place preview catalogue so the interface can be shown before the Engine 2 API is ready.
- Issue: several destination photos were missing because the Commons search included too many required terms. Updated it to search the landmark name first and retry with the city; changed the cache version so old misses are not reused.
- Backend integration remains pending until the Engine 2 API is available.
- Git update: the original front-end commit `4237fb7` was pushed under the wrong engine folder name; this change moves the front end to `engine3/` to match the orientation deck.

## 2026-11-14

### Work completed

- Removed browser-side score calculation and local sorting from the API-failure path. Preview data is labelled and displays no ranking score; score components appear only when supplied by the API.
- Added a 50-result threshold notice and zero-result suggestions drawn from the current city and category options.
- Added a dependency-free Node mock for the agreed search, options, admin login/session/logout, and catalogue routes. Documented its fixed demo password/token and non-ranking limitations.
- Added explicit sign-out and user messages when admin requests receive HTTP 401 or 403.
- Made preferred-category filtering work in the offline preview catalogue; disabled result sorting in preview mode so the browser does not impersonate Engine 2's ordering.

### Issues found and fixes

- The preview fallback was calculating scores and sorting in the browser. It now only filters sample catalogue rows and does not claim to rank them.
- The no-results UI had no alternatives, and the current options contract provides city/category values without coordinates. The UI now offers available locations and categories without describing them as geographically nearby.
- The previous suggestion renderer attached the same selection handler twice. It now attaches one handler per rendered suggestion.
- The mock's CORS preflight used a JSON response with HTTP 204. It now returns an empty 204 response, and the explainer copy makes clear that ranking signals appear only when Engine 2 supplies them.
- Offline preferred-category selection previously had no effect. It now filters the sample catalogue, while sorting remains an Engine 2 responsibility and is visibly disabled in preview mode.

### Still blocked on Engine 2

- Real score values, score components, API order, and alternate sorts must come from Engine 2. The mock uses fixed sample values only and is not production authentication or ranking.
- The agreed API still needs the Engine 2 implementation before live database integration can be verified.

### Checks

- Passed Node syntax checks for `app.js` and `mock/server.js`, `git diff --check`, and in-process mock-handler checks for options, all filters and sorts, zero results, preflight, invalid credentials, and admin session lifecycle.
- Issue: the Windows sandbox denied loopback socket access, so browser-to-mock integration and the 390px viewport check could not be completed here. The HTTP handler was exercised in-process instead; repeat the browser checks on the development machine.

## Daily update template

Copy this section for each new work day and fill in the details before committing and pushing:

```text
## YYYY-MM-DD
- Work completed:
- Issue/error and how it was fixed:
- Commit/push:
```
