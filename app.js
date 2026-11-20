const API_BASE = "http://localhost:5000";

// Temporary presentation data. Engine 2's API becomes the source of results when available.
const demoPlaces = [
  { place_id: "p01", place_name: "Virupaksha Temple & Hampi Ruins", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "Walk through an extraordinary landscape of temples, stone streets and Vijayanagara-era ruins.", rating: 4.9, popularity: 98, entry_fee: 50, kind: "heritage" },
  { place_id: "p02", place_name: "Vijaya Vittala Temple & Stone Chariot", city: "Hampi", state: "Karnataka", categories: ["Historical", "Temple"], description: "See the carved stone chariot and musical pillars at one of Hampi’s best-known monuments.", rating: 4.9, popularity: 99, entry_fee: 50, kind: "heritage" },
  { place_id: "p03", place_name: "Jog Falls Viewpoint", city: "Shivamogga", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "Take in a dramatic waterfall framed by the forested Western Ghats.", rating: 4.7, popularity: 93, entry_fee: 50, kind: "water" },
  { place_id: "p04", place_name: "Unkal Lake & Park", city: "Hubballi", state: "Karnataka", categories: ["Nature", "Lake"], description: "A calm lakeside escape for an evening walk, a quiet pause or a family outing.", rating: 4.3, popularity: 82, entry_fee: 10, kind: "nature" },
  { place_id: "p05", place_name: "Chandramouleshwara Temple", city: "Hubballi", state: "Karnataka", categories: ["Temple", "Historical"], description: "Discover the stone carvings and Chalukyan architecture of this historic temple.", rating: 4.5, popularity: 78, entry_fee: 0, kind: "heritage" },
  { place_id: "p06", place_name: "Gokarna Om Beach", city: "Gokarna", state: "Karnataka", categories: ["Beach", "Nature"], description: "A sweeping coastline, rocky coves and a laid-back beach town atmosphere.", rating: 4.6, popularity: 92, entry_fee: 0, kind: "coast" },
  { place_id: "p07", place_name: "Badami Cave Temples", city: "Badami", state: "Karnataka", categories: ["Historical", "Temple"], description: "Explore rock-cut cave shrines overlooking the red sandstone cliffs and Agastya Lake.", rating: 4.7, popularity: 91, entry_fee: 30, kind: "heritage" },
  { place_id: "p08", place_name: "Dandeli River Rafting & Wildlife", city: "Dandeli", state: "Karnataka", categories: ["Wildlife", "Adventure", "Nature"], description: "River scenery, forest trails and outdoor adventures along the Kali River.", rating: 4.6, popularity: 94, entry_fee: 250, kind: "water" },
  { place_id: "p09", place_name: "Mullayanagiri Peak", city: "Chikkamagaluru", state: "Karnataka", categories: ["Hill Station", "Nature"], description: "A high mountain viewpoint with winding roads, cool air and wide hill-country views.", rating: 4.8, popularity: 96, entry_fee: 0, kind: "nature" },
  { place_id: "p10", place_name: "Mysore Palace", city: "Mysuru", state: "Karnataka", categories: ["Historical", "Architecture"], description: "Visit an ornate royal residence known for its grand halls and illuminated façade.", rating: 4.9, popularity: 98, entry_fee: 100, kind: "city" },
  { place_id: "p11", place_name: "Sathodi Falls", city: "Yellapur", state: "Karnataka", categories: ["Nature", "Waterfall"], description: "A forest waterfall reached by a scenic drive through Uttara Kannada.", rating: 4.5, popularity: 81, entry_fee: 30, kind: "water" },
  { place_id: "p12", place_name: "Murudeshwar Temple & Beach", city: "Murudeshwar", state: "Karnataka", categories: ["Temple", "Beach"], description: "A dramatic coastal landmark combining temple architecture with Arabian Sea views.", rating: 4.7, popularity: 95, entry_fee: 0, kind: "coast" }
];

// Presentation-only sample catalogue. The API is the source of truth for real results.
const extraPlaces = [
  ["Nrupatunga Betta Viewpoint", "Hubballi", 3, 20, 4.4, 80], ["Sadhankeri Park & Lake", "Dharwad", 3, 10, 4.2, 72],
  ["Kudle Beach", "Gokarna", 1, 0, 4.5, 88], ["Yana Rocks & Caves", "Kumta", 3, 20, 4.6, 85], ["Magod Falls", "Yellapur", 3, 20, 4.3, 76],
  ["Sirsi Marikamba Temple", "Sirsi", 4, 0, 4.8, 89], ["Ulavi Channabasaveshwara Temple", "Ulavi", 4, 0, 4.4, 79], ["Banavasi Madhukeshwara Temple", "Banavasi", 2, 0, 4.6, 83],
  ["Pattadakal UNESCO Monuments", "Pattadakal", 2, 40, 4.8, 90], ["Aihole Historical Complex", "Aihole", 2, 30, 4.5, 84], ["Gol Gumbaz", "Vijayapura", 2, 25, 4.6, 87], ["Chitradurga Fort", "Chitradurga", 2, 25, 4.7, 89],
  ["Agumbe Sunset Point", "Shivamogga", 6, 0, 4.5, 85], ["Baba Budangiri Shrine & Hills", "Chikkamagaluru", 6, 0, 4.4, 86], ["Kudremukh National Park", "Chikkamagaluru", 5, 200, 4.7, 88],
  ["Belur Chennakeshava Temple", "Belur", 2, 0, 4.8, 92], ["Halebidu Hoysaleshwara Temple", "Halebidu", 2, 0, 4.8, 91], ["Chamundi Hill & Temple", "Mysuru", 4, 0, 4.7, 90], ["Abbey Falls", "Madikeri", 3, 50, 4.5, 87],
  ["Raja Seat Viewpoint", "Madikeri", 6, 25, 4.4, 84], ["Malpe Beach & St Mary Island", "Udupi", 1, 300, 4.6, 91], ["Bandipur National Park Safari", "Bandipur", 5, 350, 4.7, 94]
].map(([place_name, city, categoryId, entry_fee, rating, popularity], index) => {
  const categories = { 1: ["Beach", "Nature"], 2: ["Historical", "Architecture"], 3: ["Nature"], 4: ["Temple", "Historical"], 5: ["Wildlife", "Nature"], 6: ["Hill Station", "Nature"] }[categoryId];
  const description = `${place_name} in ${city}, Karnataka. Explore this ${categories[0].toLowerCase()} destination and see its visitor rating and entry fee.`;
  return { place_id: `p${String(index + 13).padStart(2, "0")}`, place_name, city, state: "Karnataka", categories, description, rating, popularity, entry_fee, distance_km: 100, kind: "nature" };
});
demoPlaces.push(...extraPlaces);

const photoCache = new Map();
const photoFallback = "https://commons.wikimedia.org/w/api.php";

const elements = {
  form: document.querySelector("#searchForm"),
  query: document.querySelector("#query"),
  suggestions: document.querySelector("#placeSuggestions"),
  city: document.querySelector("#cityFilter"),
  category: document.querySelector("#categoryFilter"),
  preference: document.querySelector("#preferenceFilter"),
  budget: document.querySelector("#budgetFilter"),
  rating: document.querySelector("#ratingFilter"),
  sort: document.querySelector("#sortSelect"),
  grid: document.querySelector("#resultsGrid"),
  count: document.querySelector("#resultsCount"),
  empty: document.querySelector("#emptyState"),
  emptySuggestions: document.querySelector("#emptySuggestions"),
  demoNotice: document.querySelector("#demoNotice"),
  apiError: document.querySelector("#apiError"),
  tooManyResults: document.querySelector("#tooManyResults"),
  rankExplainer: document.querySelector("#rankExplainer"),
  placeDialog: document.querySelector("#placeDialog"),
  placeDialogContent: document.querySelector("#placeDialogContent"),
  adminDialog: document.querySelector("#adminDialog"),
  adminMessage: document.querySelector("#adminMessage"),
  adminTools: document.querySelector("#adminTools"),
  placeMessage: document.querySelector("#placeMessage"),
  toast: document.querySelector("#toast")
};

let toastTimer;
let currentPlaces = [];
let currentWeights = null;
let currentOptions = { cities: [], categories: [] };
let filterOptionsArePreview = true;
let currentIsPreview = true;
let categoryIdsByName = new Map();
let suggestionRequestId = 0;
let adminToken = sessionStorage.getItem("yatraAdminToken") || "";
let adminPlaces = [];
const TOO_MANY_RESULTS_THRESHOLD = 50;

function normalize(value) {
  return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function categoriesOf(place) {
  if (Array.isArray(place.categories)) return place.categories;
  return String(place.categories ?? "").split(/[|,]/).map(value => value.trim()).filter(Boolean);
}

function fillSelect(select, values, firstLabel) {
  const current = select.value;
  select.replaceChildren(new Option(firstLabel, ""));
  [...new Set(values)].sort((a, b) => a.localeCompare(b)).forEach(value => select.add(new Option(value, value)));
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function optionsFromPlaces(places) {
  return {
    cities: [...new Set(places.map(place => place.city).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    categories: [...new Set(places.flatMap(categoriesOf))].sort((a, b) => a.localeCompare(b))
  };
}

function populateFilters(options) {
  currentOptions = {
    cities: Array.isArray(options.cities) ? options.cities : [],
    categories: Array.isArray(options.categories) ? options.categories : []
  };
  fillSelect(elements.city, currentOptions.cities, "Anywhere in Karnataka");
  fillSelect(elements.category, currentOptions.categories, "All places");
  fillSelect(elements.preference, currentOptions.categories, "No preference");
}

async function loadFilterOptions() {
  try {
    const [categoryResponse, placesResponse] = await Promise.all([
      fetch(`${API_BASE}/api/categories`, { headers: { Accept: "application/json" } }),
      fetch(`${API_BASE}/api/places?active=true`, { headers: { Accept: "application/json" } })
    ]);
    if (!categoryResponse.ok) throw new Error(`Category options request failed (${categoryResponse.status})`);
    if (!placesResponse.ok) throw new Error(`Place options request failed (${placesResponse.status})`);
    const categoryPayload = await categoryResponse.json();
    const placesPayload = await placesResponse.json();
    if (!Array.isArray(categoryPayload.categories) || !Array.isArray(placesPayload.places)) throw new Error("Engine 2 options response was invalid");
    categoryIdsByName = new Map(categoryPayload.categories.map(item => [item.category_name, Number(item.category_id)]));
    filterOptionsArePreview = false;
    populateFilters({
      cities: [...new Set(placesPayload.places.map(place => place.city).filter(Boolean))],
      categories: categoryPayload.categories.map(item => item.category_name).filter(Boolean)
    });
  } catch (error) {
    filterOptionsArePreview = true;
    populateFilters(optionsFromPlaces(demoPlaces));
    elements.apiError.textContent = `Engine 2 filter options are unavailable. Using preview filter choices. ${error.message}`;
    elements.apiError.hidden = false;
  }
}

function readFilters() {
  return {
    query: elements.query.value.trim(),
    city: elements.city.value,
    category: elements.category.value,
    preferredCategory: elements.preference.value,
    maxBudget: elements.budget.value,
    minRating: elements.rating.value,
    sort: elements.sort.value
  };
}

function matchesPreview(place, filters) {
  const queryWords = normalize(filters.query).split(/\s+/).filter(Boolean);
  const searchable = normalize([place.place_name, place.city, place.state, ...categoriesOf(place), place.description].join(" "));
  const hasTextMatch = !queryWords.length || queryWords.some(word => searchable.includes(word));
  const cityMatch = !filters.city || normalize(place.city) === normalize(filters.city);
  const categoryMatch = !filters.category || categoriesOf(place).some(category => normalize(category) === normalize(filters.category));
  const preferenceMatch = !filters.preferredCategory || categoriesOf(place).some(category => normalize(category) === normalize(filters.preferredCategory));
  const budgetMatch = filters.maxBudget === "" || Number(place.entry_fee) <= Number(filters.maxBudget);
  const ratingMatch = filters.minRating === "" || Number(place.rating) >= Number(filters.minRating);
  return hasTextMatch && cityMatch && categoryMatch && preferenceMatch && budgetMatch && ratingMatch;
}

function placeForUi(place) {
  const normalized = { ...place };
  if (!Array.isArray(normalized.categories)) {
    const category = normalized.category_name || [...categoryIdsByName].find(([, id]) => id === Number(normalized.category_id))?.[0];
    normalized.categories = category ? [category] : [];
  }
  if (normalized.score === undefined && normalized.composite_score !== undefined) normalized.score = normalized.composite_score;
  if (!normalized.score_components && normalized.breakdown) normalized.score_components = normalized.breakdown;
  return normalized;
}

function resultsForUi(places, filters) {
  return places.map(placeForUi).filter(place => {
    const cityMatches = !filters.city || normalize(place.city) === normalize(filters.city);
    const categoryMatches = !filters.category || categoriesOf(place).some(category => normalize(category) === normalize(filters.category));
    return cityMatches && categoryMatches;
  });
}

async function searchPlaces(filters) {
  const preferredCategoryId = categoryIdsByName.get(filters.preferredCategory);
  const response = await fetch(`${API_BASE}/api/rank`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      keyword: filters.query,
      category_id: preferredCategoryId || 0,
      max_budget: filters.maxBudget === "" ? -1 : Number(filters.maxBudget),
      max_distance: -1,
      min_rating: filters.minRating === "" ? 0 : Number(filters.minRating),
      top_k: 500,
      sort_by: filters.sort
    })
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || payload.error || `Search request failed (${response.status})`);
  if (!Array.isArray(payload.results)) throw new Error("Engine 2 response did not include a results list");
  return {
    results: resultsForUi(payload.results, filters),
    metadata: payload.metadata || {},
    weights: payload.metadata?.weights_applied || null
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function kindFor(place) {
  const cats = normalize(categoriesOf(place).join(" "));
  if (cats.includes("beach") || cats.includes("coast")) return "coast";
  if (cats.includes("historical") || cats.includes("temple") || cats.includes("architecture")) return "heritage";
  if (cats.includes("waterfall") || normalize(place.place_name).includes("falls")) return "water";
  if (cats.includes("nature") || cats.includes("hill")) return "nature";
  return "city";
}

function feeLabel(place) {
  const fee = Number(place.entry_fee);
  return Number.isFinite(fee) ? (fee === 0 ? "Free entry" : `₹${fee.toLocaleString("en-IN")}`) : "Fee not listed";
}

async function placePhoto(place, image, credit) {
  const id = String(place.place_id);
  if (!photoCache.has(id)) {
    const cached = sessionStorage.getItem(`yatraPhoto:v2:${id}`);
    if (cached) {
      try { photoCache.set(id, JSON.parse(cached)); } catch { /* Ignore stale cached image data. */ }
    }
  }
  if (!photoCache.has(id)) {
    const request = (async () => {
      // Search the landmark name first; requiring its city and state in the same
      // Commons search was too restrictive for many regional destinations.
      const queries = [place.place_name, `${place.place_name} ${place.city}`];
      for (const query of queries) {
        const params = new URLSearchParams({ action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "8", prop: "imageinfo", iiprop: "url|extmetadata", iiurlwidth: "1400", format: "json", origin: "*" });
        const response = await fetch(`${photoFallback}?${params}`, { headers: { Accept: "application/json" } });
        if (!response.ok) continue;
        const payload = await response.json();
        const pages = Object.values(payload.query?.pages || {});
        const match = pages.find(page => page.imageinfo?.[0]?.thumburl) || pages.find(page => page.imageinfo?.[0]?.url);
        if (!match?.imageinfo?.[0]) continue;
        const info = match.imageinfo[0];
        const metadata = info.extmetadata || {};
        const photo = { url: info.thumburl || info.url, title: match.title.replace(/^File:/, ""), artist: (metadata.Artist?.value || "Wikimedia Commons contributor").replace(/<[^>]*>/g, ""), license: metadata.LicenseShortName?.value || "See source page", page: info.descriptionurl };
        sessionStorage.setItem(`yatraPhoto:v2:${id}`, JSON.stringify(photo));
        return photo;
      }
      return null;
    })().catch(() => null);
    photoCache.set(id, request);
  }
  let photo = await photoCache.get(id);
  if (photo instanceof Promise) { photo = await photo; photoCache.set(id, photo); }
  if (!photo) return;
  if (image) {
    image.onerror = () => { image.hidden = true; image.closest(".photo-frame")?.classList.remove("has-photo"); };
    image.referrerPolicy = "no-referrer";
    image.src = photo.url;
    image.alt = `${place.place_name}, ${place.city}`;
    image.hidden = false;
    image.closest(".photo-frame")?.classList.add("has-photo");
  }
  if (credit) credit.innerHTML = `Photo: <a href="${escapeHtml(photo.page)}" target="_blank" rel="noopener">${escapeHtml(photo.title)}</a> · ${escapeHtml(photo.artist)} · ${escapeHtml(photo.license)}`;
  return photo;
}

function requestPhoto(place, container) {
  const image = container.querySelector("img[data-place-photo]");
  const credit = container.querySelector("[data-photo-credit]");
  if (image) placePhoto(place, image, credit);
}

function scoreValue(place) {
  const rawScore = place.score ?? place.ranking_score ?? place.composite_score;
  if (rawScore === null || rawScore === undefined || rawScore === "") return null;
  const score = Number(rawScore);
  return Number.isFinite(score) ? score : null;
}

function cardMarkup(place, index, isPreview) {
  const categories = categoriesOf(place);
  const category = categories[0] || "Place to explore";
  const score = scoreValue(place);
  const scoreMarkup = !isPreview && score !== null
    ? `<div class="score-strip" aria-label="Engine 2 match score ${Math.round(score * 100)} percent"><span>Engine 2 score</span><span class="score-track"><span class="score-fill" style="display:block;width:${Math.max(0, Math.min(100, score * 100))}%"></span></span><span class="score-value">${score.toFixed(2)}</span></div>`
    : `<div class="preview-label">${isPreview ? "Preview data - ranking unavailable" : "Score not supplied by Engine 2"}</div>`;
  const rating = Number(place.rating);
  const ratingMarkup = Number.isFinite(rating) && rating > 0 ? `<span>★</span> ${rating.toFixed(1)}` : "Not rated";
  return `<article class="place-card">
    <button class="place-visual photo-frame" data-kind="${kindFor(place)}" type="button" data-place-id="${escapeHtml(place.place_id)}" aria-label="Preview ${escapeHtml(place.place_name)}"><div class="visual-sun"></div><div class="visual-ridge"></div><img data-place-photo alt="" loading="lazy" hidden /><span class="rank-badge"><span>✳</span> ${isPreview ? "PREVIEW" : `API ORDER #${String(index + 1).padStart(2, "0")}`}</span><span class="image-hint">View destination <span aria-hidden="true">↗</span></span></button>
    <div class="place-body">
      <div class="place-meta"><span class="place-category">${escapeHtml(category)}</span><span class="place-rating">${ratingMarkup}</span></div>
      <h3>${escapeHtml(place.place_name)}</h3>
      <p class="place-location">⌖ ${escapeHtml(place.city)}${place.state ? `, ${escapeHtml(place.state)}` : ""}</p>
      <p class="place-description">${escapeHtml(place.description || "Explore this destination and learn more about what makes it special.")}</p>
      <div class="place-card-bottom"><span class="place-fee"><small>ENTRY</small>${feeLabel(place)}</span><button class="details-button" type="button" data-place-id="${escapeHtml(place.place_id)}">Photo & details <span aria-hidden="true">→</span></button></div>
      ${scoreMarkup}
    </div>
  </article>`;
}

function renderEmptySuggestions() {
  const cities = currentOptions.cities.slice(0, 5);
  const categories = currentOptions.categories.slice(0, 5);
  const sections = [];
  if (cities.length) sections.push(`<h4>Try an available location</h4>${cities.map(city => `<button class="suggestion-option" type="button" data-option-kind="city" data-option-value="${escapeHtml(city)}">${escapeHtml(city)}</button>`).join("")}`);
  if (categories.length) sections.push(`<h4>Try an available category</h4>${categories.map(category => `<button class="suggestion-option" type="button" data-option-kind="category" data-option-value="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}`);
  elements.emptySuggestions.innerHTML = sections.join("");
}

function renderResults(places, { isPreview = false, totalCount = places.length } = {}) {
  currentPlaces = places;
  currentIsPreview = isPreview;
  const visiblePlaces = totalCount > TOO_MANY_RESULTS_THRESHOLD ? places.slice(0, TOO_MANY_RESULTS_THRESHOLD) : places;
  elements.sort.disabled = isPreview;
  elements.demoNotice.hidden = !(isPreview || filterOptionsArePreview);
  elements.demoNotice.textContent = isPreview
    ? "Preview catalogue shown. Search and category preferences filter these sample places. Ranking and result sorting need Engine 2."
    : "Engine 2 filter options are unavailable; these filter choices are preview values.";
  elements.rankExplainer.hidden = isPreview || visiblePlaces.length === 0;
  elements.tooManyResults.hidden = totalCount <= TOO_MANY_RESULTS_THRESHOLD;
  elements.tooManyResults.textContent = `Engine 2 returned ${totalCount} results. Showing the first ${Math.min(visiblePlaces.length, TOO_MANY_RESULTS_THRESHOLD)} in API order. Narrow your search with a location, category, fee, or rating filter.`;
  elements.grid.setAttribute("aria-busy", "false");
  elements.count.textContent = `${totalCount} ${totalCount === 1 ? "PLACE" : "PLACES"} TO EXPLORE`;
  elements.grid.innerHTML = visiblePlaces.map((place, index) => cardMarkup(place, index, isPreview)).join("");
  elements.empty.hidden = visiblePlaces.length > 0;
  elements.grid.hidden = visiblePlaces.length === 0;
  if (visiblePlaces.length === 0) renderEmptySuggestions();
  if (visiblePlaces.length) {
    elements.grid.querySelectorAll("[data-place-id]").forEach(button => button.addEventListener("click", () => showPlace(button.dataset.placeId)));
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        const place = visiblePlaces.find(item => String(item.place_id) === entry.target.dataset.photoFor);
        if (place) requestPhoto(place, entry.target);
      }), { rootMargin: "180px" });
      elements.grid.querySelectorAll(".photo-frame").forEach(frame => { frame.dataset.photoFor = frame.dataset.placeId; observer.observe(frame); });
    } else {
      elements.grid.querySelectorAll(".photo-frame").forEach(frame => {
        const place = visiblePlaces.find(item => String(item.place_id) === frame.dataset.placeId);
        if (place) requestPhoto(place, frame);
      });
    }
  }
}

async function runSearch() {
  const filters = readFilters();
  elements.grid.setAttribute("aria-busy", "true");
  elements.grid.innerHTML = "";
  try {
    const payload = await searchPlaces(filters);
    if (!Array.isArray(payload.results)) throw new Error("Search response did not include a results list");
    currentWeights = payload.weights || null;
    elements.apiError.hidden = true;
    renderResults(payload.results, { isPreview: false, totalCount: payload.results.length });
  } catch (error) {
    currentWeights = null;
    elements.apiError.textContent = `Engine 2 search is unavailable. Showing the preview catalogue without ranking scores. ${error.message}`;
    elements.apiError.hidden = false;
    const results = demoPlaces.filter(place => matchesPreview(place, filters));
    renderResults(results, { isPreview: true, totalCount: results.length });
  }
}

function showPlace(id) {
  const place = currentPlaces.find(item => String(item.place_id) === String(id));
  if (!place) return;
  const score = scoreValue(place);
  const parts = place.score_components && typeof place.score_components === "object" ? place.score_components : null;
  const componentLabels = {
    raw_rating: "Visitor rating",
    norm_rating: "Normalized rating",
    weighted_rating: "Weighted rating",
    raw_popularity: "Popularity",
    norm_popularity: "Normalized popularity",
    weighted_popularity: "Weighted popularity",
    preference_match: "Preferred-category match",
    weighted_preference: "Weighted preference match",
    raw_distance_km: "Distance from Hubballi (km)",
    norm_proximity: "Normalized proximity",
    weighted_proximity: "Weighted proximity"
  };
  const componentRows = parts ? Object.entries(parts)
    .filter(([, value]) => Number.isFinite(Number(value)))
    .map(([key, value]) => `<div class="breakdown-row"><span>${escapeHtml(componentLabels[key] || key.replaceAll("_", " "))}</span><strong>${Number(value).toFixed(3)}</strong></div>`).join("") : "";
  const rankingMarkup = currentIsPreview
    ? '<p class="ranking-note">Preview data only. Engine 2 ranking is unavailable.</p>'
    : parts
      ? `<div class="score-breakdown"><h3>Engine 2 score components${score !== null ? ` <strong>Score ${score.toFixed(3)}</strong>` : ""}</h3>${componentRows}</div>`
      : score !== null
        ? `<p class="ranking-note">Engine 2 score: <strong>${score.toFixed(3)}</strong>. Score components were not supplied.</p>`
        : '<p class="ranking-note">Engine 2 did not supply ranking details for this place.</p>';
  elements.placeDialogContent.innerHTML = `<div class="dialog-visual photo-frame" data-kind="${kindFor(place)}"><div class="visual-sun"></div><div class="visual-ridge"></div><img data-place-photo alt="" hidden /><span class="image-hint">Destination photo</span></div>
    <div class="dialog-content"><p class="photo-credit" data-photo-credit>Finding a photo for this destination…</p><p class="section-kicker">${escapeHtml(categoriesOf(place).join(" · ") || "DESTINATION")}</p><h2 id="dialogTitle">${escapeHtml(place.place_name)}</h2><p class="place-location">⌖ ${escapeHtml(place.city)}${place.state ? `, ${escapeHtml(place.state)}` : ""}</p><p>${escapeHtml(place.description || "More destination information will be added by the administrator.")}</p>
    <div class="dialog-facts"><div class="dialog-fact"><span>Visitor rating</span><strong>${Number(place.rating) > 0 ? `★ ${Number(place.rating).toFixed(1)} / 5` : "Not rated"}</strong></div><div class="dialog-fact"><span>Popularity</span><strong>${Number.isFinite(Number(place.popularity)) ? `${Number(place.popularity)} / 100` : "Not listed"}</strong></div><div class="dialog-fact"><span>Entry fee</span><strong>${feeLabel(place)}</strong></div></div>${rankingMarkup}</div>`;
  elements.placeDialog.showModal();
  requestPhoto(place, elements.placeDialogContent);
}

async function renderSuggestions() {
  const requestId = ++suggestionRequestId;
  const rawQuery = elements.query.value.trim();
  const query = normalize(rawQuery);
  if (query.length < 2) { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); return; }

  let matches;
  if (!filterOptionsArePreview) {
    try {
      const response = await fetch(`${API_BASE}/api/places/autocomplete?q=${encodeURIComponent(rawQuery)}`, { headers: { Accept: "application/json" } });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || payload.error || `Autocomplete failed (${response.status})`);
      if (!Array.isArray(payload.suggestions)) throw new Error("Engine 2 autocomplete response was invalid");
      matches = payload.suggestions.map(placeForUi);
    } catch {
      matches = demoPlaces.filter(place => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(query) || query.split(" ").every(word => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(word))).slice(0, 5);
    }
  } else {
    matches = demoPlaces.filter(place => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(query) || query.split(" ").every(word => normalize(`${place.place_name} ${place.city} ${categoriesOf(place).join(" ")}`).includes(word))).slice(0, 5);
  }

  if (requestId !== suggestionRequestId) return;
  elements.suggestions.innerHTML = matches.map(place => `<button class="suggestion-item" type="button" role="option" data-suggestion-id="${escapeHtml(place.place_id)}"><span class="suggestion-image photo-frame" data-kind="${kindFor(place)}"><img data-place-photo alt="" hidden /></span><span class="suggestion-label"><strong>${escapeHtml(place.place_name)}</strong><small>${escapeHtml(place.city)} · ${escapeHtml(categoriesOf(place)[0] || "Destination")}</small></span><span class="suggestion-arrow" aria-hidden="true">↗</span></button>`).join("");
  elements.suggestions.hidden = matches.length === 0;
  elements.query.setAttribute("aria-expanded", String(matches.length > 0));
  elements.suggestions.querySelectorAll("[data-suggestion-id]").forEach(button => button.addEventListener("click", async () => {
    const id = button.dataset.suggestionId;
    const place = matches.find(item => String(item.place_id) === id);
    if (!place) return;
    elements.query.value = place.place_name;
    elements.suggestions.hidden = true;
    elements.query.setAttribute("aria-expanded", "false");
    if (filterOptionsArePreview) {
      currentPlaces = demoPlaces;
      currentIsPreview = true;
      showPlace(id);
      return;
    }
    await runSearch();
    const rankedPlace = currentPlaces.find(item => String(item.place_id) === id);
    if (rankedPlace) showPlace(id);
  }));
  elements.suggestions.querySelectorAll(".suggestion-item").forEach(button => {
    const place = matches.find(item => String(item.place_id) === button.dataset.suggestionId);
    if (place) requestPhoto(place, button);
  });
}

function clearFilters() {
  elements.form.reset();
  runSearch();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 4200);
}

function signOutAdmin(message) {
  adminToken = "";
  adminPlaces = [];
  sessionStorage.removeItem("yatraAdminToken");
  elements.adminTools.hidden = true;
  if (message) elements.adminMessage.textContent = message;
}

async function readApiJson(response, fallbackMessage) {
  let payload = {};
  try { payload = await response.json(); } catch { payload = {}; }
  if (response.status === 401 || response.status === 403) {
    const message = payload.message || "Your admin session is no longer valid. Please sign in again.";
    signOutAdmin(message);
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  if (!response.ok) throw new Error(payload.message || fallbackMessage);
  return payload;
}

async function openAdmin() {
  adminToken = "";
  sessionStorage.removeItem("yatraAdminToken");
  document.querySelector("#adminLoginForm").hidden = true;
  elements.adminTools.hidden = true;
  elements.adminMessage.textContent = "Admin catalogue changes are unavailable until Engine 2 provides authenticated admin routes.";
  elements.adminDialog.showModal();
}

function renderAdminPlaces(places) {
  const list = document.querySelector("#adminPlacesList");
  if (!places.length) {
    list.innerHTML = '<p class="catalogue-empty">No place records were returned.</p>';
    return;
  }
  list.innerHTML = places.map(place => `<article class="admin-place-row"><div><strong>${escapeHtml(place.place_name)}</strong><span>${escapeHtml(place.city)} · ${escapeHtml(categoriesOf(place).join(", "))}</span></div><div class="admin-place-actions"><button class="text-button" type="button" data-edit-place="${escapeHtml(place.place_id)}">Edit</button><button class="text-button deactivate-button" type="button" data-deactivate-place="${escapeHtml(place.place_id)}">Deactivate</button></div></article>`).join("");
  list.querySelectorAll("[data-edit-place]").forEach(button => button.addEventListener("click", () => beginEdit(button.dataset.editPlace)));
  list.querySelectorAll("[data-deactivate-place]").forEach(button => button.addEventListener("click", () => deactivatePlace(button.dataset.deactivatePlace)));
}

async function loadAdminPlaces() {
  const list = document.querySelector("#adminPlacesList");
  list.innerHTML = '<p class="catalogue-empty">Loading place records…</p>';
  try {
    const response = await fetch(`${API_BASE}/admin/places`, { headers: { Accept: "application/json", Authorization: `Bearer ${adminToken}` } });
    const payload = await readApiJson(response, "Could not load place records.");
    adminPlaces = Array.isArray(payload) ? payload : (payload.places || []);
    renderAdminPlaces(adminPlaces);
  } catch (error) {
    list.innerHTML = `<p class="catalogue-empty">${escapeHtml(error.message.includes("Failed to fetch") ? "Catalogue management will be available when the Engine 2 API is connected." : error.message)}</p>`;
  }
}

function beginEdit(placeId) {
  const place = adminPlaces.find(item => String(item.place_id) === String(placeId));
  if (!place) return;
  const form = document.querySelector("#placeForm");
  form.elements.place_id.value = place.place_id;
  form.elements.place_name.value = place.place_name || "";
  form.elements.city.value = place.city || "";
  form.elements.state.value = place.state || "Karnataka";
  form.elements.categories.value = categoriesOf(place).join(", ");
  form.elements.description.value = place.description || "";
  form.elements.entry_fee.value = place.entry_fee ?? 0;
  form.elements.rating.value = place.rating ?? "";
  document.querySelector("#placeSaveButton").innerHTML = 'Update place <span aria-hidden="true">→</span>';
  document.querySelector("#cancelEdit").hidden = false;
  document.querySelector("#placeName").focus();
}

async function deactivatePlace(placeId) {
  if (!window.confirm("Deactivate this place? It will no longer appear in public search.")) return;
  try {
    const response = await fetch(`${API_BASE}/admin/places/${encodeURIComponent(placeId)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: "INACTIVE" })
    });
    await readApiJson(response, "The place could not be deactivated.");
    showToast("Place deactivated.");
    await loadAdminPlaces();
    runSearch();
  } catch (error) {
    showToast(error.message.includes("Failed to fetch") ? "Place management will be available when the Engine 2 API is connected." : error.message);
  }
}

function resetPlaceForm() {
  const form = document.querySelector("#placeForm");
  form.reset();
  form.elements.place_id.value = "";
  document.querySelector("#placeSaveButton").innerHTML = 'Save place <span aria-hidden="true">→</span>';
  document.querySelector("#cancelEdit").hidden = true;
}

document.querySelectorAll("[data-close-dialog]").forEach(button => button.addEventListener("click", () => button.closest("dialog").close()));
document.querySelector("#adminOpen").addEventListener("click", openAdmin);
elements.form.addEventListener("submit", event => { event.preventDefault(); runSearch(); });
elements.query.addEventListener("input", renderSuggestions);
elements.query.addEventListener("keydown", event => {
  if (event.key === "Escape") { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); }
  if (event.key === "ArrowDown" && !elements.suggestions.hidden) { event.preventDefault(); elements.suggestions.querySelector("button")?.focus(); }
});
elements.suggestions.addEventListener("keydown", event => {
  if (event.key === "Escape") { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); elements.query.focus(); }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    const buttons = [...elements.suggestions.querySelectorAll("button")];
    const index = buttons.indexOf(document.activeElement);
    const next = event.key === "ArrowDown" ? Math.min(index + 1, buttons.length - 1) : Math.max(index - 1, 0);
    if (buttons[next]) { event.preventDefault(); buttons[next].focus(); }
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".search-main-field")) { elements.suggestions.hidden = true; elements.query.setAttribute("aria-expanded", "false"); }
});
[elements.city, elements.category, elements.preference, elements.rating, elements.sort].forEach(control => control.addEventListener("change", runSearch));
elements.budget.addEventListener("change", runSearch);
document.querySelector("#clearFilters").addEventListener("click", clearFilters);
document.querySelector("#emptyClear").addEventListener("click", clearFilters);
elements.emptySuggestions.addEventListener("click", event => {
  const optionButton = event.target.closest("[data-option-kind]");
  if (!optionButton) return;
  if (optionButton.dataset.optionKind === "city") elements.city.value = optionButton.dataset.optionValue;
  if (optionButton.dataset.optionKind === "category") elements.category.value = optionButton.dataset.optionValue;
  runSearch();
});

document.querySelector("#adminLoginForm").addEventListener("submit", async event => {
  event.preventDefault();
  elements.adminMessage.textContent = "";
  const password = new FormData(event.currentTarget).get("password");
  try {
    const response = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ password }) });
    const payload = await readApiJson(response, "The server did not grant admin access.");
    if (payload.role !== "admin" || !payload.token) throw new Error("The server did not grant admin access.");
    adminToken = payload.token;
    sessionStorage.setItem("yatraAdminToken", adminToken);
    elements.adminTools.hidden = false;
    elements.adminMessage.textContent = "Admin access verified by the server.";
    await loadAdminPlaces();
  } catch (error) {
    elements.adminMessage.textContent = error.message.includes("Failed to fetch") ? "Admin sign-in will be available when the Engine 2 API is connected." : error.message;
  }
});

document.querySelector("#adminLogout").addEventListener("click", async () => {
  try { await fetch(`${API_BASE}/auth/logout`, { method: "POST", headers: { Authorization: `Bearer ${adminToken}` } }); } catch { /* The local token is still cleared. */ }
  signOutAdmin();
  elements.adminMessage.textContent = "You are signed out.";
});

document.querySelector("#placeForm").addEventListener("submit", async event => {
  event.preventDefault();
  elements.placeMessage.textContent = "";
  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(formData.entries());
  const placeId = payload.place_id;
  delete payload.place_id;
  payload.entry_fee = Number(payload.entry_fee);
  payload.rating = Number(payload.rating);
  payload.categories = payload.categories.split(",").map(value => value.trim()).filter(Boolean);
  try {
    const response = await fetch(placeId ? `${API_BASE}/admin/places/${encodeURIComponent(placeId)}` : `${API_BASE}/admin/places`, { method: placeId ? "PATCH" : "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` }, body: JSON.stringify(payload) });
    await readApiJson(response, "The place could not be saved.");
    elements.placeMessage.textContent = placeId ? "Place updated." : "Place saved.";
    resetPlaceForm();
    await loadAdminPlaces();
    runSearch();
  } catch (error) {
    elements.placeMessage.textContent = error.message.includes("Failed to fetch") ? "Place management will be available when the Engine 2 API is connected." : error.message;
  }
});

document.querySelector("#cancelEdit").addEventListener("click", resetPlaceForm);

loadFilterOptions().finally(runSearch);
