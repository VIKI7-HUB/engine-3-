# Engine 3 and Engine 2 API Contract

Engine 3 is the web interface. It sends search requests to the Node server supplied for Engine 2 and displays its scores and ordering. The current server listens on `http://localhost:5000` and enables cross-origin requests for local frontend development.

## Search and ranking

`POST /api/rank`

Engine 3 sends JSON:

```json
{
  "keyword": "falls",
  "category_id": 3,
  "max_budget": 100,
  "max_distance": -1,
  "min_rating": 4,
  "top_k": 500,
  "sort_by": "score"
}
```

The current backend accepts `score`, `rating`, `distance`, `fee`, and `popularity` sort values. `max_budget` and `max_distance` use `-1` to mean no limit. `category_id` is the preferred category used in scoring, not a strict category filter. Scores are in `[0,1]`; the response contains:

```json
{
  "metadata": {
    "candidate_pool_size": 1,
    "top_k_requested": 500,
    "returned_count": 1,
    "weights_applied": {
      "wRating": 0.4,
      "wPopularity": 0.3,
      "wPreference": 0.2,
      "wDistance": 0.1
    }
  },
  "results": [
    {
      "place_id": 23,
      "place_name": "Jog Falls Viewpoint",
      "city": "Shivamogga",
      "category_name": "Nature",
      "rating": 4.7,
      "popularity": 93,
      "entry_fee": 50,
      "composite_score": 0.82,
      "breakdown": {
        "norm_rating": 0.94,
        "norm_popularity": 0.93,
        "preference_match": 1,
        "norm_proximity": 0.68
      }
    }
  ]
}
```

Engine 3 maps `composite_score` to its score display and `breakdown` to the detail view. It requests up to 500 candidates so the current city and strict-category selections can be applied without reordering the backend's ranked list. This assumes the current 34-place catalogue; if the catalogue grows beyond that limit, Engine 2 should add city and strict-category filters to `/api/rank` and return a total count.

The current UI's minimum-rating and fee controls map to `min_rating` and `max_budget`. The backend excludes records over budget. The UI's preferred-category control maps to `category_id` and affects ranking. Its strict city/category display filters are applied after Engine 2 returns the ordered candidate list because the current `/api/rank` route has no city or strict-category filter.

## Filter options and autocomplete

- `GET /api/categories` returns `{"categories":[{"category_id":1,"category_name":"Beach"}]}`.
- `GET /api/places?active=true` returns `{"count":34,"places":[...]}`. Engine 3 uses this to build city choices.
- `GET /api/places/autocomplete?q=ham` returns `{"suggestions":[{"place_id":16,"place_name":"...","city":"Hampi","category_name":"Historical"}]}`.

## Current integration limits

- The supplied `server.js` currently serves a hard-coded in-memory dataset. Although the ZIP includes Engine 1 SQL files, this server does not connect to the relational database.
- The server has no authenticated admin login/session API. Its place insert and update routes are not protected by admin authorization, so Engine 3 leaves catalogue editing disabled and does not call those routes.
- City and strict category filtering happen in the browser after Engine 2 ranking because the current rank route does not implement those filters. The backend should add these filters before the dataset grows beyond the requested Top-K limit.
- The previous Python contract describes a different endpoint and payload. For this frontend integration, the Node server routes above are the reference. Engine 2 should confirm before changing them.
