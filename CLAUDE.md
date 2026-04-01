# Wild America — Project Guide

## Overview
A single-page vanilla HTML/CSS/JS tourism website for discovering 245+ US national parks, monuments, and attractions. Includes 100 curated road trips, Chinese language support, real visitor reviews, interactive maps, and a cost calculator.

## Running
```bash
cd /home/ubuntu/claude/tourist_plan
python3 -m http.server 8888
# Open http://localhost:8888/v27-immersive/index.html
```

## Directory Structure
```
tourist_plan/
├── v27-immersive/          # Latest version (active development)
│   ├── index.html          # Main app (~130KB, single file with inline CSS+JS)
│   └── routes.html         # Deprecated — routes merged into index.html
├── v26-discovery/          # Previous version (functional, not actively maintained)
├── shared/                 # Data files shared across versions
│   ├── data.js             # 105 attractions (IDs 1-105)
│   ├── data_page5.js       # Attractions 106-155 (page naming is legacy)
│   ├── data_page6.js       # Attractions 156-210
│   ├── data_page7.js       # Attractions 211-260
│   ├── data_page8.js       # Attractions 261-305 (but 245 unique after dedup)
│   ├── data_catalog.js     # Merges all data into globalThis.ATTRACTIONS_CATALOG
│   ├── road_trips.js       # 21 curated road trips
│   ├── more_road_trips.js  # 79 additional road trips
│   ├── road_trip_details.js # Day-by-day itineraries for 21 routes
│   ├── reviews.js          # Real TripAdvisor reviews (245 parks, 3-7 each)
│   ├── i18n.js             # Chinese translations (302 names, 297 descriptions, UI strings)
│   ├── images/             # Park images (~27MB compressed)
│   └── app.js              # Shared utilities
├── gallery.html            # Version gallery hub (27 versions)
└── tmp_*.js                # Temp files from review/translation collection (safe to delete)
```

## Architecture
- **No framework, no build step** — pure HTML/CSS/JS
- CSS custom properties for season themes (spring/summer/fall/winter)
- `data-i18n` attribute system + `t()` function for internationalization
- `globalThis.ATTRACTIONS_CATALOG` populated by data_catalog.js merging all data pages
- Reviews keyed by attraction slug in `PARK_REVIEWS`
- Chinese names in `PARK_NAMES_ZH`, descriptions in `PARK_DESC_ZH`
- Route names in `ROUTE_NAMES_ZH`
- Leaflet.js + OpenStreetMap for maps, Nominatim for geocoding (cached in localStorage)

## Key Patterns in index.html

### Data flow
1. External `<script>` tags load data files (road_trips → data pages → catalog → reviews → i18n)
2. `ALL_ROUTES = ROAD_TRIPS.concat(MORE_ROAD_TRIPS)`
3. `attractionCatalog = globalThis.ATTRACTIONS_CATALOG`
4. `renderGrid()` renders parks or routes based on `currentView`

### View system
- `setView('parks')` / `setView('routes')` toggles between parks grid and routes grid
- `renderGrid()` dispatches to `renderRouteCards()` when `currentView === 'routes'`
- Season tabs filter both parks and routes

### Story overlay
- `openStory(id)` — park story with 5 chapters (Discovery, The Land, Experience, Visit Notes, Go Now)
- `openRoadTripStory(tripId)` — route story with 5 chapters (Hero, Route, Parks, Trip Tips with cost breakdown, Go Plan It)
- 15% scroll skip between chapters
- IntersectionObserver for progress dots

### Filters
- Vibe presets: Adventure, Scenic, Wildlife, History, Hidden Gems, Family
- Budget: $, $$, $$$
- Travel time from 4 US cities (NYC, Chicago, LA, Bay Area)
- Trip length: Weekend, Week, Extended
- Region: multi-select
- Type: for routes (np-loop, scenic-drive, coast-to-coast, etc.)
- OR within categories, AND between categories

### Cost calculator
`calcRouteCost(rt, fromCity)` returns {gas, fees, lodging, food, flight, total}
- Gas: distance/25mpg × $3.50
- Fees: $80 annual pass
- Lodging: nights × avg lodging rate ($/$$/$$$ → 80/150/250)
- Food: days × $50
- Flight: estimated from travelTime data

### i18n
- `currentLang` toggles between 'en'/'zh'
- `t(key)` returns translated string
- `getParkNameZh(slug)` / `getParkDescZh(slug)` for park translations
- `getRouteName(rt)` returns Chinese name with English in parentheses
- `applyLang()` updates all `[data-i18n]` elements

## v27 Visual Design
- Glassmorphism: `backdrop-filter: blur(16px) saturate(180%)` on cards
- Blend-invert cursor: 12px circle, grows to 28px on hover, `mix-blend-mode: difference`
- Gradient mesh background: 3 animated blobs with `filter: blur(120px)`
- Scroll reveal: IntersectionObserver adds `.revealed` class with translateY animation
- Season themes: spring (pink), summer (green), fall (orange), winter (blue)

## Known Issues
- **Routes view bug**: Clicking "Scenic Routes" toggle may not render route cards. JS logic and data files pass syntax checks. Needs browser console debugging for runtime errors.
- Some demo files were cleaned up but `routes.html` in v27 remains (deprecated)
- Temp files (`tmp_*.js`) in project root should be deleted

## Conventions
- Use `model: "sonnet"` for subagents (not Opus)
- Real TripAdvisor reviews only — do not generate fake reviews
- Chinese names format: 黄石国家公园 (Yellowstone)
- Attraction slugs are kebab-case, used as keys everywhere
- parkCode field maps to NPS.gov URLs: `https://www.nps.gov/${parkCode}/`
