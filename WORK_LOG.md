# Engine 3 Work Log

## 2026-11-20

- Confirmed the project theme is Theme 2 — Search and Ranking System from the orientation deck; Engine 2 owns Logic & Rule, and Engine 3 owns Interface & Access.
- Connected Engine 3 to the Node API in the teammate ZIP: `/api/rank`, `/api/categories`, `/api/places`, and `/api/places/autocomplete` on port 5000.
- Adapted Engine 2's `composite_score`, `breakdown`, `category_name`, `metadata`, and `weights_applied` response fields for the existing cards and detail dialog.
- Added server autocomplete suggestions and mapped the sort control to the supported score, rating, popularity, fee, and distance modes.
- Disabled catalogue login/edit actions because the supplied API has no authenticated admin routes; the UI must not write through its unprotected routes.
- Documented current integration limits: the Engine 2 server uses in-memory sample data and doesn't connect to the SQL database; city and strict category filters are applied in the UI because the rank route doesn't accept them.
- Validation issue found in Engine 2's server: invalid numeric budget, distance, and minimum-rating strings can bypass current checks. Reported as an Engine 2 follow-up; no backend file was changed from this frontend task.
- Removed stale instructions for an older mock API; the only supported live integration for this build is the teammate's Engine 2 Node API.
- Passed `node --check app.js` and `git diff --check`. Smoke-checked the supplied Engine 2 Node server's health, categories, places, autocomplete, ranking, budget and rating filters.
- Could not complete a browser visual check in this environment because the browser sandbox rejects the local Windows drive path; the interface still needs a local browser run alongside Engine 2.
- Published Engine 3 to `https://github.com/VIKI7-HUB/engine-3-.git` on `main` in commit `ffbb603`.

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
