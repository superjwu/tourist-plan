/* ============================================================
   SHARED APP UTILITIES — U.S. Tourist Attractions
   All versions import this file for:
   - Favorites (localStorage)
   - Itinerary (localStorage)
   - Filtering helpers
   - Rendering helpers (stars, chips)
   ============================================================ */

const App = (() => {
  const FAVS_KEY  = 'tourist_favorites';
  const ITIN_KEY  = 'tourist_itinerary';

  // ---- Storage helpers ----------------------------------------

  function getFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVS_KEY)) || []; }
    catch { return []; }
  }

  function isFavorite(id) {
    return getFavorites().includes(id);
  }

  function toggleFavorite(id) {
    const favs = getFavorites();
    const idx  = favs.indexOf(id);
    if (idx === -1) favs.push(id);
    else favs.splice(idx, 1);
    localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
    return idx === -1; // true = now a fav
  }

  function getItinerary() {
    try { return JSON.parse(localStorage.getItem(ITIN_KEY)) || []; }
    catch { return []; }
  }

  function isInItinerary(id) {
    return getItinerary().includes(id);
  }

  function addToItinerary(id) {
    const itin = getItinerary();
    if (!itin.includes(id)) {
      itin.push(id);
      localStorage.setItem(ITIN_KEY, JSON.stringify(itin));
      return true;
    }
    return false;
  }

  function removeFromItinerary(id) {
    const itin = getItinerary().filter(i => i !== id);
    localStorage.setItem(ITIN_KEY, JSON.stringify(itin));
  }

  function clearItinerary() {
    localStorage.removeItem(ITIN_KEY);
  }

  function reorderItinerary(newOrder) {
    localStorage.setItem(ITIN_KEY, JSON.stringify(newOrder));
  }

  // ---- Filter helper -----------------------------------------

  function filterAttractions(list, { search = '', region = '', category = '', difficulty = '' } = {}) {
    const q = search.toLowerCase().trim();
    return list.filter(a => {
      if (q && !a.name.toLowerCase().includes(q) &&
              !a.state.toLowerCase().includes(q) &&
              !a.tags.join(' ').toLowerCase().includes(q)) return false;
      if (region   && a.region   !== region)   return false;
      if (category && a.category !== category) return false;
      if (difficulty && a.difficulty !== difficulty) return false;
      return true;
    });
  }

  // ---- Render helpers ----------------------------------------

  function starsHTML(rating) {
    const full  = Math.round(rating);
    const empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }

  function formatReviews(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }

  function buildCard(a, opts = {}) {
    const fav  = isFavorite(a.id);
    const itin = isInItinerary(a.id);
    const expandDetail = opts.expandDetail ? `data-expand="${a.id}"` : '';
    return `
      <article class="attraction-card ${opts.extraClass || ''}" data-id="${a.id}" data-region="${a.region}" data-category="${a.category}">
        <div class="card-image-wrap">
          <img src="${a.image}" alt="${a.name}" loading="lazy"
               onerror="this.src='https://picsum.photos/seed/fallback${a.id}/800/450'">
          <span class="card-category-badge">${a.category}</span>
          <button class="card-fav-btn ${fav ? 'active' : ''}"
                  data-fav="${a.id}" title="Add to Favorites" aria-label="Favorite">
            ${fav ? '♥' : '♡'}
          </button>
        </div>
        <div class="card-body">
          <h3 class="card-title">${a.name}</h3>
          <div class="card-location">📍 ${a.state}</div>
          <div class="card-rating">
            <span class="stars">${starsHTML(a.rating)}</span>
            <span>${a.rating}</span>
            <span style="color:var(--text-light)">(${formatReviews(a.reviews)})</span>
          </div>
          <div class="card-meta">
            <span class="meta-chip">💰 ${a.fee}</span>
            <span class="meta-chip">⏱ ${a.duration}</span>
            <span class="meta-chip">🥾 ${a.difficulty}</span>
          </div>
          <p class="card-desc">${a.description}</p>
          <div class="card-actions">
            <button class="btn-secondary" data-itin="${a.id}">
              ${itin ? '✓ In Trip' : '+ Add to Trip'}
            </button>
            ${opts.expandDetail
              ? `<button class="btn-primary" ${expandDetail}>Details</button>`
              : ''}
          </div>
        </div>
      </article>`;
  }

  function buildCompactRow(a) {
    const fav  = isFavorite(a.id);
    const itin = isInItinerary(a.id);
    return `
      <div class="compact-row" data-id="${a.id}" data-region="${a.region}" data-category="${a.category}">
        <img class="row-thumb" src="${a.image}" alt="${a.name}" loading="lazy"
             onerror="this.src='https://picsum.photos/seed/fallback${a.id}/800/450'">
        <div class="row-info">
          <div class="row-title">${a.name}</div>
          <div class="row-sub">${a.state} · <span class="stars" style="font-size:0.8rem">${starsHTML(a.rating)}</span> ${a.rating}</div>
          <div style="font-size:0.75rem;color:var(--text-muted)">${a.category} · ${a.fee}</div>
        </div>
        <div class="row-actions">
          <button class="card-fav-btn ${fav ? 'active' : ''}" data-fav="${a.id}"
                  style="position:static;width:30px;height:30px;font-size:1rem">
            ${fav ? '♥' : '♡'}
          </button>
          <button class="btn-accent" style="font-size:0.75rem;padding:0.3rem 0.65rem"
                  data-itin="${a.id}">
            ${itin ? '✓' : '+'}
          </button>
        </div>
      </div>`;
  }

  // ---- Detail panel HTML -------------------------------------

  function buildDetailPanel(a) {
    return `
      <div class="detail-panel" id="detail-${a.id}">
        <div class="detail-inner">
          <button class="detail-close" data-close="${a.id}">✕ Close</button>
          <div class="detail-hero">
            <img src="${a.image.replace('800/450','1200/500')}" alt="${a.name}"
                 onerror="this.src='https://picsum.photos/seed/fallback${a.id}/1200/500'">
            <div class="detail-hero-overlay">
              <h2>${a.name}</h2>
              <p>📍 ${a.state} · ${a.region}</p>
            </div>
          </div>
          <div class="detail-body">
            <div class="detail-stats">
              <div class="stat"><strong>${a.rating}</strong><span>Rating</span></div>
              <div class="stat"><strong>${formatReviews(a.reviews)}</strong><span>Reviews</span></div>
              <div class="stat"><strong>${a.fee}</strong><span>Entry</span></div>
              <div class="stat"><strong>${a.duration}</strong><span>Duration</span></div>
              <div class="stat"><strong>${a.bestTime}</strong><span>Best Time</span></div>
              <div class="stat"><strong>${a.difficulty}</strong><span>Difficulty</span></div>
            </div>
            <p style="margin:1rem 0;line-height:1.7;color:var(--text-muted)">${a.description}</p>
            <div style="margin-bottom:1rem">
              <strong style="font-size:0.85rem">Activities:</strong>
              <div class="tag-list" style="margin-top:0.4rem">${a.activities.map(act => `<span class="meta-chip">${act}</span>`).join('')}</div>
            </div>
            <div>
              <strong style="font-size:0.85rem">Tags:</strong>
              <div class="tag-list" style="margin-top:0.4rem">${a.tags.map(t => `<span class="meta-chip" style="background:var(--primary);color:#fff">${t}</span>`).join('')}</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  // ---- Unique option builders --------------------------------

  function buildRegionOptions(list) {
    const regions = [...new Set(list.map(a => a.region))].sort();
    return ['', ...regions].map(r =>
      `<option value="${r}">${r || 'All Regions'}</option>`
    ).join('');
  }

  function buildCategoryOptions(list) {
    const cats = [...new Set(list.map(a => a.category))].sort();
    return ['', ...cats].map(c =>
      `<option value="${c}">${c || 'All Categories'}</option>`
    ).join('');
  }

  // ---- Event delegation helpers ------------------------------

  function bindFavButtons(container, onToggle) {
    container.addEventListener('click', e => {
      const btn = e.target.closest('[data-fav]');
      if (!btn) return;
      const id    = parseInt(btn.dataset.fav);
      const isNow = toggleFavorite(id);
      btn.classList.toggle('active', isNow);
      btn.textContent = isNow ? '♥' : '♡';
      if (onToggle) onToggle(id, isNow);
    });
  }

  function bindItinButtons(container, onToggle) {
    container.addEventListener('click', e => {
      const btn = e.target.closest('[data-itin]');
      if (!btn) return;
      const id = parseInt(btn.dataset.itin);
      if (isInItinerary(id)) {
        removeFromItinerary(id);
        btn.textContent = '+ Add to Trip';
        btn.classList.remove('in-trip');
      } else {
        addToItinerary(id);
        btn.textContent = '✓ In Trip';
        btn.classList.add('in-trip');
      }
      if (onToggle) onToggle(id);
    });
  }

  // Public API
  return {
    getFavorites, isFavorite, toggleFavorite,
    getItinerary, isInItinerary, addToItinerary,
    removeFromItinerary, clearItinerary, reorderItinerary,
    filterAttractions,
    starsHTML, formatReviews,
    buildCard, buildCompactRow, buildDetailPanel,
    buildRegionOptions, buildCategoryOptions,
    bindFavButtons, bindItinButtons,
  };
})();
