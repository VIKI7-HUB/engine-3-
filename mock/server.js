const http = require("http");
const { URL } = require("url");

const PORT = 3000;
const MOCK_ADMIN_PASSWORD = "yatra-demo";
const MOCK_ADMIN_TOKEN = "yatra-mock-admin-token";
const MOCK_WEIGHTS = { rating: 0.5, popularity: 0.3, preference: 0.2 };

// Fixed sample scores make this a front-end stub, not the Engine 2 ranking engine.
const places = [
  { place_id: 1, place_name: "Virupaksha Temple & Hampi Ruins", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "Explore the temple complex and historic ruins at Hampi.", rating: 4.9, popularity: 98, entry_fee: 50, score: 0.986, score_components: { rating: 0.98, popularity: 0.98, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 2, place_name: "Vijaya Vittala Temple & Stone Chariot", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "See Hampi's stone chariot and temple architecture.", rating: 4.9, popularity: 99, entry_fee: 50, score: 0.989, score_components: { rating: 0.98, popularity: 0.99, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 3, place_name: "Jog Falls Viewpoint", city: "Shivamogga", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "View the waterfalls in a forested Western Ghats setting.", rating: 4.7, popularity: 93, entry_fee: 50, score: 0.954, score_components: { rating: 0.94, popularity: 0.93, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 4, place_name: "Gokarna Om Beach", city: "Gokarna", state: "Karnataka", categories: ["Beach", "Nature"], description: "A curved coastline with rocky coves and beach walks.", rating: 4.6, popularity: 92, entry_fee: 0, score: 0.964, score_components: { rating: 0.92, popularity: 0.92, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 5, place_name: "Badami Cave Temples", city: "Badami", state: "Karnataka", categories: ["Historical", "Temple"], description: "Rock-cut shrines overlooking the sandstone cliffs.", rating: 4.7, popularity: 91, entry_fee: 30, score: 0.952, score_components: { rating: 0.94, popularity: 0.91, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 6, place_name: "Mysore Palace", city: "Mysuru", state: "Karnataka", categories: ["Historical", "Architecture"], description: "A royal palace with decorated halls and a grand facade.", rating: 4.8, popularity: 96, entry_fee: 100, score: 0.976, score_components: { rating: 0.96, popularity: 0.96, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 7, place_name: "Unkal Lake & Park", city: "Hubballi", state: "Karnataka", categories: ["Nature", "Lake"], description: "A lakeside park for an evening walk or family visit.", rating: 4.3, popularity: 82, entry_fee: 10, score: 0.937, score_components: { rating: 0.86, popularity: 0.82, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 8, place_name: "Sathodi Falls", city: "Yellapur", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "A forest waterfall reached by a scenic drive.", rating: 4.5, popularity: 89, entry_fee: 30, score: 0.947, score_components: { rating: 0.9, popularity: 0.89, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 9, place_name: "Mullayanagiri Peak", city: "Chikkamagaluru", state: "Karnataka", categories: ["Nature", "Hill Station"], description: "A high peak with broad views of the surrounding hills.", rating: 4.8, popularity: 90, entry_fee: 0, score: 0.961, score_components: { rating: 0.96, popularity: 0.9, preference_match: 1 }, status: "ACTIVE" },
  { place_id: 10, place_name: "Dandeli River Rafting & Wildlife", city: "Dandeli", state: "Karnataka", categories: ["Wildlife", "Nature", "Adventure"], description: "River and forest activities along the Kali River.", rating: 4.7, popularity: 88, entry_fee: 250, score: 0.946, score_components: { rating: 0.94, popularity: 0.88, preference_match: 1 }, status: "ACTIVE" }
];

let adminSessionActive = false;
let nextPlaceId = 11;

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization"
  });
  response.end(JSON.stringify(body));
}

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function parseNumberParam(params, name) {
  const raw = params.get(name);
  if (raw === null || raw === "") return null;
  const number = Number(raw);
  return Number.isFinite(number) ? number : NaN;
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error("Request body is too large"));
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch { reject(new Error("Request body must be valid JSON")); }
    });
    request.on("error", reject);
  });
}

function hasValidToken(request) {
  return adminSessionActive && request.headers.authorization === `Bearer ${MOCK_ADMIN_TOKEN}`;
}

function requireAdmin(request, response) {
  if (hasValidToken(request)) return true;
  sendJson(response, 401, { message: "Mock admin token is missing or invalid. Sign in again." });
  return false;
}

function publicSearch(params) {
  const q = normalize(params.get("q"));
  const queryWords = q.split(/\s+/).filter(Boolean);
  const city = normalize(params.get("city"));
  const category = normalize(params.get("category"));
  const preferredCategory = normalize(params.get("preferredCategory"));
  const maxBudget = parseNumberParam(params, "maxBudget");
  const minRating = parseNumberParam(params, "minRating");
  const sort = params.get("sort") || "score";
  const validSorts = new Set(["score", "rating", "popularity", "fee", "name"]);
  if (Number.isNaN(maxBudget)) return { error: "maxBudget must be a number" };
  if (Number.isNaN(minRating)) return { error: "minRating must be a number" };
  if (!validSorts.has(sort)) return { error: "sort must be score, rating, popularity, fee, or name" };

  const results = places.filter(place => {
    if (place.status !== "ACTIVE") return false;
    const searchable = normalize([place.place_name, place.city, place.state, ...place.categories, place.description].join(" "));
    if (queryWords.length && !queryWords.some(word => searchable.includes(word))) return false;
    if (city && normalize(place.city) !== city) return false;
    if (category && !place.categories.some(item => normalize(item) === category)) return false;
    // Mock simplification: preferredCategory narrows to matches instead of reranking.
    if (preferredCategory && !place.categories.some(item => normalize(item) === preferredCategory)) return false;
    if (maxBudget !== null && Number(place.entry_fee) > maxBudget) return false;
    if (minRating !== null && Number(place.rating) < minRating) return false;
    return true;
  });

  const byName = (a, b) => a.place_name.localeCompare(b.place_name);
  if (sort === "rating") results.sort((a, b) => b.rating - a.rating || byName(a, b));
  else if (sort === "popularity") results.sort((a, b) => b.popularity - a.popularity || byName(a, b));
  else if (sort === "fee") results.sort((a, b) => a.entry_fee - b.entry_fee || byName(a, b));
  else if (sort === "name") results.sort(byName);
  else results.sort((a, b) => b.score - a.score || byName(a, b));

  return { count: results.length, weights: { ...MOCK_WEIGHTS }, results };
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    response.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
    });
    return response.end();
  }
  const url = new URL(request.url, `http://localhost:${PORT}`);
  const path = url.pathname.replace(/\/$/, "") || "/";

  try {
    if (request.method === "GET" && path === "/api/places/options") {
      const activePlaces = places.filter(place => place.status === "ACTIVE");
      return sendJson(response, 200, {
        cities: [...new Set(activePlaces.map(place => place.city))].sort(),
        categories: [...new Set(activePlaces.flatMap(place => place.categories))].sort()
      });
    }

    if (request.method === "GET" && path === "/api/places/search") {
      const result = publicSearch(url.searchParams);
      return sendJson(response, result.error ? 400 : 200, result.error ? { message: result.error } : result);
    }

    if (request.method === "POST" && path === "/api/auth/login") {
      const body = await readJson(request);
      if (body.password !== MOCK_ADMIN_PASSWORD) return sendJson(response, 401, { message: "Invalid mock password." });
      adminSessionActive = true;
      return sendJson(response, 200, { token: MOCK_ADMIN_TOKEN, role: "admin" });
    }

    if (request.method === "GET" && path === "/api/auth/session") {
      if (!requireAdmin(request, response)) return;
      return sendJson(response, 200, { role: "admin" });
    }

    if (request.method === "POST" && path === "/api/auth/logout") {
      if (!requireAdmin(request, response)) return;
      adminSessionActive = false;
      return sendJson(response, 200, { message: "Signed out of mock admin session." });
    }

    if (path === "/api/admin/places" || path.startsWith("/api/admin/places/")) {
      if (!requireAdmin(request, response)) return;
      if (request.method === "GET" && path === "/api/admin/places") return sendJson(response, 200, { places });
      if (request.method === "POST" && path === "/api/admin/places") {
        const body = await readJson(request);
        if (!body.place_name || !body.city || !Array.isArray(body.categories)) return sendJson(response, 400, { message: "place_name, city, and categories are required" });
        const place = {
          place_id: nextPlaceId++, state: body.state || "Karnataka", description: body.description || "Mock admin place.",
          rating: Number(body.rating ?? 4), popularity: 50, entry_fee: Number(body.entry_fee ?? 0), score: 0.5,
          score_components: { rating: 0.8, popularity: 0.5, preference_match: 1 }, status: "ACTIVE", ...body
        };
        places.push(place);
        return sendJson(response, 201, place);
      }
      const id = decodeURIComponent(path.slice("/api/admin/places/".length));
      const place = places.find(item => String(item.place_id) === id);
      if (!place) return sendJson(response, 404, { message: "Place not found in mock catalogue." });
      if (request.method === "PATCH") {
        Object.assign(place, await readJson(request));
        return sendJson(response, 200, place);
      }
      return sendJson(response, 405, { message: "Method not allowed for mock admin places." });
    }

    return sendJson(response, 404, { message: "Mock API route not found." });
  } catch (error) {
    return sendJson(response, 400, { message: error.message || "Mock API request failed." });
  }
});

server.listen(PORT, () => {
  console.log(`Engine 3 mock API listening at http://localhost:${PORT}/api`);
  console.log(`Mock only. Admin password: ${MOCK_ADMIN_PASSWORD}`);
});
