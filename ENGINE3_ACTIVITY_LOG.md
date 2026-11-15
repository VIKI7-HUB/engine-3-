# Engine 3 Development Activity Log

**Project:** Tourist Place Search and Ranking System  
**Engine:** 3 — Interface and Access / Front End  
**Owner:** Vivek  
**Log location:** `engine3/ENGINE3_ACTIVITY_LOG.md`

This log records the front-end work, issues encountered, and fixes. Keep adding a dated entry when work is done.

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
