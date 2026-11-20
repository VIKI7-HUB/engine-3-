# Engine 3 Development Activity Log

**Project:** Tourist Place Search and Ranking System  
**Engine:** 3 — Interface and Access / Front End  
**Owner:** Vivek  
**Log location:** `ENGINE3_ACTIVITY_LOG.md`

This log records the front-end work, issues encountered, and fixes. Keep adding a dated entry when work is done.

## 2026-11-20 — Engine 2 API integration

### Work completed

- Confirmed Theme 2 is Search and Ranking System. The orientation assigns Engine 2 to Logic & Rule and Engine 3 to Interface & Access.
- Connected the frontend to Engine 2's Node API at `http://localhost:5000`.
- Added category/city option loading, JSON POST search, ranking score/breakdown mapping, backend-supported sorting, and API autocomplete.
- Disabled catalogue login/edit actions because the supplied backend has no authenticated admin API.
- Updated the API contract and run instructions.
- Removed an outdated mock-server instruction that no longer matched the current API integration.
- Passed the frontend JavaScript syntax check and whitespace check. Smoke-checked Engine 2 health, categories, places, autocomplete, ranking, budget and rating filters using its supplied Node server.
- Browser visual verification remains for the team to run locally because this environment cannot open the local Windows drive in its browser sandbox.

### Issues and fixes

- Engine 2 uses `/api/rank` with POST JSON and returns `composite_score`/`breakdown`, while Engine 3 expected `/places/search` with different fields. Adapted the request, response and score display in `app.js`.
- City and strict-category filters are absent from Engine 2's rank route. Engine 3 preserves the backend result order and applies those display filters to the returned catalogue. The API contract records the need for Engine 2 to add server-side filters before the catalogue exceeds the requested Top-K.
- Backend write endpoints have no role verification. Engine 3 keeps admin changes disabled and does not call the unprotected routes.
- Malformed numeric search values can bypass validation in Engine 2. This needs a backend fix; no Engine 2 source was modified.

### Status / next step

- Verify the integrated page against the teammate's actual Node server. Ask the Engine 2 owner to fix numeric validation, add city/strict-category filters, and implement authenticated admin endpoints if catalogue management is required.

### Git commit

- Pending integration checks.

## 2026-11-12 — Front-end implementation and image fix

### Work completed

- Created a responsive tourist-place search page with keyword search, location and category filters, entry-fee and rating filters, and result sorting.
- Added place cards with ranking scores and a details preview showing place information and ranking factors.
- Added autocomplete suggestions with place thumbnails. Selecting a suggestion or a result opens the selected place's photo and details.
- Added a 34-place demo catalogue matching the places listed in the project SQL, so the front end can be presented before the Engine 2 API is ready.
- Added Wikimedia Commons image lookup and photo source, photographer, and license details in the preview.
- Added the Engine 3 to Engine 2 handoff requirements in `API_CONTRACT.md`. Live API integration is pending the Engine 2 implementation.

### Issues and fixes

| Issue / error | Fix |
| --- | --- |
| More than ten destination photos were not appearing. The photo search required too many terms to match at once. | Changed the lookup to search the landmark name first, then retry with the city. Updated the photo cache key so old failed lookups are not reused. After refreshing the preview, the user confirmed it looked good. |
| Initial push was rejected because GitHub's `main` branch had newer commits. | Fetched the latest remote changes, rebased the front-end commit, and pushed successfully. The local C++ ranking module was not included. |

### Current status

- Engine 3 preview is usable and the user confirmed the updated images look good.
- Photos require an internet connection; if Commons has no matching photo or the image cannot load, the UI keeps its fallback artwork.
- The Engine 2 API is not connected yet. Integrate it when the backend is ready, following `API_CONTRACT.md`.

### Git record

- Original front-end commit: `4237fb7` — `Build Engine 2 tourist place interface` (folder name corrected in the rename commit).
- Work-log update already pushed before this local activity log was requested: `92bfd63` — `Update Engine 2 work log`
- This detailed activity log is saved locally and has not been committed or pushed.

## 2026-11-14 — Corrected engine ownership

- Checked the orientation deck: Engine 2 is Logic & Rule; Engine 3 is Interface & Access.
- Renamed the front-end directory to `engine3/` and moved the local C++ ranking module to `engine2/`.
- GitHub rename commit: `17bf105` — `Move tourist place interface to Engine 3`, pushed to `main`.
- This detailed activity log remains local and is not staged or pushed.

## Daily entry template

Copy and fill in this section for each future work session:

```text
## YYYY-MM-DD — Short task name

### Work completed
-

### Issues and fixes
- Issue/error:
- How it was fixed:

### Status / next step
-

### Git commit (if any)
-
```
