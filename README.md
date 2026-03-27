# Wild America — US Tourist Attractions Discovery Site

A vanilla HTML/CSS/JS web app for discovering and planning visits to 300+ US national parks, monuments, state parks, scenic drives, and charming towns. No frameworks, no build step — just static files served from any web server.

## Live Entry Point

- **Gallery**: `gallery.html` — hub page linking to all 26 UI versions
- **Latest version**: `v26-discovery/index.html` — the most feature-rich version
- **Vercel config**: `vercel.json` rewrites `/` to `/gallery.html`

## Architecture

```
tourist_plan/
├── gallery.html              # Hub page with cards linking to all versions
├── vercel.json               # Vercel static deployment config
├── shared/
│   ├── data.js               # 100 core attractions (IDs 1-100) — original dataset
│   ├── data_page2.js         # IDs 26-50 (legacy page, loaded by older versions)
│   ├── data_page3.js         # IDs 51-75 (legacy page)
│   ├── data_page4.js         # IDs 76-100 (legacy page)
│   ├── data_page5.js         # IDs 101-160 — NPS units: missing national parks + monuments/seashores/recreation areas/historic sites
│   ├── data_page6.js         # IDs 161-210 — more NPS + state parks
│   ├── data_page7.js         # IDs 211-260 — state parks, towns, scenic drives
│   ├── data_page8.js         # IDs 261-304 — more state parks, towns, islands
│   ├── data_catalog.js       # Merges all data pages into globalThis.ATTRACTIONS_CATALOG + image slug mapping
│   ├── app.js                # Shared utilities (favorites, itinerary, localStorage helpers)
│   ├── styles.css            # Shared base styles (used by older versions)
│   └── images/               # 500+ JPG images (one per attraction slug)
├── scripts/
│   ├── generate_catalog.js   # Generates data_catalog.js from all data pages
│   ├── localize_catalog_images.py  # Downloads images for all attractions
│   └── validate_catalog.js   # Validates all data entries have required fields
├── v1/ through v25-vivid/    # Previous UI iterations (all functional)
└── v26-discovery/            # Latest version with discovery filters
```

## Data Schema

Each attraction object has these fields:

```javascript
{
  "id": 1,                          // Unique integer (1-304)
  "name": "Yellowstone National Park",
  "slug": "yellowstone",            // URL-safe name, matches image filename
  "state": "Wyoming",
  "region": "Rocky Mountains",      // One of: Rocky Mountains, Pacific West, Southwest, Southeast, Northeast, Great Plains, Hawaii, Alaska, Mid-Atlantic
  "category": "National Park",      // National Park, National Monument, State Park, Small Town, Scenic Drive, etc.
  "description": "3-4 vivid sentences about the attraction",
  "rating": 4.9,                    // 4.3-4.9
  "reviews": 48320,                 // Approximate review count (proxy for popularity)
  "fee": "$35/vehicle",             // Entry fee string
  "bestTime": "June–August",        // Best months to visit
  "duration": "3–5 days",           // Suggested visit length
  "activities": ["Hiking", "Wildlife Watching", "Photography"],
  "difficulty": "Easy to Moderate",  // Easy, Moderate, Strenuous, or compounds
  "accessibility": true,            // Wheelchair/stroller accessible
  "image": "../shared/images/yellowstone.jpg",
  "tags": ["Geysers", "Wildlife", "Hot Springs", "UNESCO"],
  "lodgingCost": "$$$",             // $=<$100/night, $$=$100-220, $$$=$220+
  "travelTime": {                   // Total hours (flight + drive) from 4 US cities
    "nyc": 6.5, "chi": 5, "la": 4, "bay": 4
  }
}
```

**Note:** `lodgingCost` and `travelTime` were added to `data.js` (IDs 1-100) in the v26 session. The newer data pages (5-8) include these fields natively. Some entries in pages 6-8 also have `parkCode` and `designation` fields from NPS API data.

## Data Merging

`data_catalog.js` handles merging all data pages at load time:

```javascript
// Combines all pages, deduplicates by ID (first occurrence wins)
const sources = [attractions, attractionsPage5, attractionsPage6, attractionsPage7, attractionsPage8];
// Merges into globalThis.ATTRACTIONS_CATALOG
```

v26 references this via: `const attractionCatalog = globalThis.ATTRACTIONS_CATALOG || attractions;`

Older versions (v1-v25) only load `data.js` (100 attractions) and don't know about the expanded dataset.

## v26-discovery Features

### Discovery Filter Bar (above the card grid)
- **Vibe chips** (multi-select): Adventure, Scenic, Wildlife, History, Hidden Gems, Family
  - Uses `VIBE_MATCH` object with regex matchers against activities + tags
- **Travel time row**: City selector (NYC/Chicago/LA/Bay Area) + Under 4h / Under 7h / Any distance (multi-select)
- **Trip length row**: Half Day / Day Trip / Long Weekend / Week Trip (multi-select)
  - Uses `parseDuration()` to parse mixed duration strings into [min, max] days
- **Budget row**: $ Budget / $$ Mid / $$$ Premium (multi-select)
- **Region dropdown**: Dynamically populated from data via `initRegionSelect()`
- **Clear all button**: Resets all filters at once

### Card Features
- **Lodging cost chip**: 🏨 $ / $$ / $$$ on every card
- **Crowd level indicator**: 🔴 Busy / 🟡 Moderate / 🟢 Quiet — derived from `reviews` count + whether current month is in `bestTime`
- **Category badge**: Color-coded by category type
- **Best Match badge**: Top 5 rated parks per season

### Other Features
- **Season themes**: 5 color schemes (all/spring/summer/fall/winter) via CSS custom properties
- **Month strip**: 12-month calendar for precise filtering
- **Swipe deck**: Tinder-style card swiping for top seasonal picks (drag or touch)
- **Bucket list panel**: Trip list + Favorites tabs with localStorage persistence
- **Share bucket list**: 🔗 button encodes itinerary as base64 URL param (`?bucket=...`)
- **Story overlay**: 5-chapter scroll-snap detail view per attraction
- **Back-to-top button**: Appears after 700px scroll
- **Hero slideshow**: Ken Burns animation cycling through 6 flagship parks

### Bug Fixes Applied in v26
1. **Memory leak**: `initDrag()` refactored to module-level `_dragMove`/`_dragEnd` with `activeWrapper`
2. **Swipe deck closes on season change**: `swipeDeckOpen` reset in `setSeason()`
3. **Scroll offset**: `scrollToMain()` targets `#season-tabs` instead of `#main-interface`
4. **Aria labels**: on `#back-to-top`, `#bucket-panel-close`, `.att-card-fav`
5. **Page title**: "Wild America — 100 US National Parks & Attractions"
6. **Mobile search overflow**: `#search-input { min-width: 0 }` at 480px

## Key JS Functions (v26)

| Function | Purpose |
|----------|---------|
| `renderGrid()` | Main render — filters by season, month, search, vibes, region, budget, travel time, trip length, then sorts and builds cards |
| `renderDeck()` | Renders stacked swipe cards for seasonal picks |
| `initDrag(wrapper, attraction)` | Attaches drag/touch handlers to swipe cards |
| `buildInfoLine(a)` | Builds chip strip (difficulty, fee, duration, bestTime, rating, lodging, crowd, activities) |
| `VIBE_MATCH` | Object mapping vibe names to `(attraction) => boolean` matchers |
| `parseDuration(str)` | Parses duration strings like "2–4 days" into `[min, max]` array |
| `getCrowdLevel(a)` | Returns crowd indicator based on reviews + season |
| `openStory(id)` | Opens 5-chapter scroll-snap detail overlay |
| `shareBucketList()` | Encodes itinerary as base64 URL and copies to clipboard |
| `initRegionSelect()` | Populates region dropdown from attraction data |

## State Variables (v26)

```javascript
let currentSeason = 'all';      // Active season filter
let activeMonth = null;          // Active month (0-11 or null)
let searchQuery = '';            // Text search input
let sortOrder = 'default';       // default | rating | free | name
let activeVibes = new Set();     // Multi-select vibe filters
let selectedRegion = '';         // Region dropdown value
let selectedBudgets = new Set(); // Multi-select budget tiers
let selectedCity = '';           // Travel time departure city
let selectedTravelHours = new Set(); // Multi-select travel time caps
let selectedTrips = new Set();   // Multi-select trip length filters
let itinerary = [...];           // Bucket list (localStorage)
let favorites = [...];           // Favorites (localStorage)
let swipeDeckOpen = false;       // Whether swipe deck panel is expanded
```

## Version History (Key Milestones)

| Version | Codename | Key Feature |
|---------|----------|-------------|
| v1-v20 | Various | Progressive UI experiments (cards, grids, maps, dark themes) |
| v21 | Seasonal Stories | Season-based storytelling |
| v22 | Nightfall | Dark mode focus |
| v23 | Nightfall 2 | Refined dark mode |
| v24 | Bucket List | Dropdown bucket list + favorites |
| v25 | Vivid | Season color themes, chip info cards, swipe deck, mobile responsive |
| v26 | Discovery | Vibe/travel/budget/trip filters, 304 attractions, crowd level, share URL |

## Development Notes

- **No build step**: All files are vanilla HTML/CSS/JS — just serve the directory
- **Images**: All in `shared/images/` as JPGs named by slug. Fallback to `yellowstone.jpg` on error.
- **localStorage keys**: `tourist_favorites`, `tourist_itinerary` — shared across all versions
- **Font**: Cormorant Garamond (Google Fonts) for card blurbs
- **CSS custom properties**: Season-specific themes (`--primary`, `--bg`, `--accent`, etc.) set on `body.season-{name}`

## Pending / Known Issues

- The 140 state parks/towns/scenic drives agent hit a rate limit — data pages 6-8 may be incomplete (only ~144 entries instead of target 200 new). Need to verify coverage and fill gaps.
- Some attractions in data_page6-8 may have a `parkCode` field not used by the UI
- `data_page2.js`, `data_page3.js`, `data_page4.js` are legacy files from older versions — not loaded by v26 (which uses pages 5-8 instead). They contain overlapping IDs with `data.js`.
- The `/travel-times` custom skill exists at `~/.claude/skills/travel-times/SKILL.md` for recalculating travel times

## How to Run Locally

```bash
cd /home/ubuntu/claude/tourist_plan
python3 -m http.server 8080
# Open http://localhost:8080/gallery.html
```

## Deployment

Deployed to Vercel. `vercel.json` rewrites `/` to `/gallery.html`.
