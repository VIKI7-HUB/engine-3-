# Engine 3 — Interface and Access

This folder contains the HTML, CSS, and JavaScript user interface for the Tourist Place Search and Ranking System.

## Current screens

- Public destination search with keyword, city, category, preferred category, maximum entry fee, and minimum-rating controls.
- API-ordered destination cards with Engine 2 score and score components when the API supplies them. Preview records show no ranking.
- Destination-photo cards and autocomplete suggestions. In live mode, suggestions come from Engine 2; when it is unavailable, the 34-place preview catalogue is used.
- Photo source, photographer, and license shown in the detail preview; images are looked up from Wikimedia Commons when the page is online.
- Backend result orders (best match, rating, popularity, fee, and distance from the backend's Hubballi reference) for comparing the same search.
- Designed no-results state and filter reset.
- Admin catalogue changes stay disabled because the supplied Engine 2 server has no authenticated admin routes.
- Responsive layout and accessible labels, focus styles, status announcements, and reduced-motion support.

## Run a local preview

From this repository folder, run `python -m http.server 5500` and open `http://localhost:5500` in a browser. For live results, run Engine 2's Node `server.js` on port 5000 from the team repository. If the Engine 2 API is unavailable, the page shows the presentation-only catalogue without ranking scores. The place photos need an internet connection. If a matching Commons photo cannot be found or loaded, the card keeps its illustrated fallback.

## API handoff to Engine 2

See [`API_CONTRACT.md`](API_CONTRACT.md) for the current Engine 2 endpoint shapes and integration limits. The current backend does not expose authenticated admin routes; the frontend does not submit catalogue changes to its unprotected write routes.

## Engine ownership

According to the orientation deck, Engine 2 owns the search and ranking logic. Engine 3 owns this browser interface, which sends search requests to Engine 2 and displays its results.
