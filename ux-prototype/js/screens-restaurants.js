/**
 * FoodFighter UX Prototype — Restaurant Discovery & Map Screens (V4)
 * 
 * Implements:
 *   - Final Menu Context Integration (Adapts to whichever menu won in V3)
 *   - Accessible List ↔ Map Discovery View
 *   - High-Fidelity Stylized Fake Map (Zero network/tile dependency, interactive pins)
 *   - Interactive Map Pin Selection & Live Preview Card
 *   - Quick Distance / Open Status Filter Chips
 *   - Restaurant Detail Page with Focused Mini Route Map
 *   - Restaurant Selected Confirmation (Transitions to V5 Split Bill Boundary)
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Helper Utilities & Context Resolvers
     ========================================================================== */

  function getFinalMenu() {
    const state = P.getState();
    const menuId = state.recommendation?.finalWinnerMenuId || 'menu-a';
    return P.CANDIDATE_MENUS[menuId] || P.CANDIDATE_MENUS['menu-a'];
  }

  function getRestaurantList() {
    const finalMenu = getFinalMenu();
    return P.RESTAURANT_CATALOGUE[finalMenu.id] || P.RESTAURANT_CATALOGUE['menu-a'];
  }

  function getFilteredRestaurants(restaurants, filter) {
    if (filter === 'nearest') {
      return restaurants.filter(r => parseFloat(r.distance) <= 1.0);
    }
    if (filter === 'open') {
      return restaurants.filter(r => r.isOpen);
    }
    return restaurants;
  }

  function getSelectedRestaurant() {
    const state = P.getState();
    const list = getRestaurantList();
    const selId = state.restaurant?.selectedRestaurantId || list[0]?.id;
    return list.find(r => r.id === selId) || list[0];
  }

  /* ==========================================================================
     2. Recommended Restaurants Screen (List ↔ Map Discovery)
     ========================================================================== */

  function renderRecommendedRestaurants() {
    const state = P.getState();
    const finalMenu = getFinalMenu();
    const allRestaurants = getRestaurantList();
    const activeView = state.restaurant?.discoveryView || 'list';
    const activeFilter = state.restaurant?.selectedFilter || 'all';
    const activePinId = state.restaurant?.activePinId || allRestaurants[0]?.id;
    const selectedRestId = state.restaurant?.selectedRestaurantId || allRestaurants[0]?.id;

    const filteredRestaurants = getFilteredRestaurants(allRestaurants, activeFilter);
    const activePinRestaurant = allRestaurants.find(r => r.id === activePinId) || allRestaurants[0];

    return `
      <main class="app-shell" aria-labelledby="rest-discovery-title">
        <header class="top-bar">
          <a href="#/final-menu" class="top-bar-action" aria-label="Back to Final Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Recommended Places</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Final Menu Context Banner -->
          <div class="rest-context-banner" role="status">
            <div class="rest-context-info">
              <div class="rest-context-icon">${finalMenu.icon}</div>
              <div>
                <div class="font-caption text-secondary" style="font-weight:600;">Selected Group Menu</div>
                <div style="font-size:0.95rem;font-weight:700;color:var(--color-brand-primary);">${P.escapeHtml(finalMenu.name)}</div>
              </div>
            </div>
            <a href="#/final-menu" class="btn btn-outline btn-sm" style="background:#fff;border-radius:var(--radius-full);">
              View
            </a>
          </div>

          <!-- Segmented View Toggle (List ↔ Map) & Filter Chips -->
          <div class="rest-view-toggle-bar">
            <div class="segmented-control" role="tablist" aria-label="Discovery View Mode">
              <button 
                type="button" 
                class="segmented-btn ${activeView === 'list' ? 'active' : ''}" 
                id="toggle-view-list"
                role="tab"
                aria-selected="${activeView === 'list'}"
              >
                <span>📋 List</span>
              </button>
              <button 
                type="button" 
                class="segmented-btn ${activeView === 'map' ? 'active' : ''}" 
                id="toggle-view-map"
                role="tab"
                aria-selected="${activeView === 'map'}"
              >
                <span>🗺️ Map</span>
              </button>
            </div>

            <div class="rest-filter-chips" role="group" aria-label="Filter Options">
              <button type="button" class="filter-chip ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">All (${allRestaurants.length})</button>
              <button type="button" class="filter-chip ${activeFilter === 'nearest' ? 'active' : ''}" data-filter="nearest">&lt; 1 km</button>
              <button type="button" class="filter-chip ${activeFilter === 'open' ? 'active' : ''}" data-filter="open">Open Now</button>
            </div>
          </div>

          <!-- DISCOVERY MODE 1: LIST VIEW -->
          ${activeView === 'list' ? `
            <section aria-label="Restaurant List" class="rest-list-container">
              ${filteredRestaurants.length === 0 ? `
                <div class="card" style="text-align:center;padding:1.5rem;">
                  <p class="font-body-small text-secondary">No restaurants match the selected filter.</p>
                </div>
              ` : filteredRestaurants.map(rest => {
                const isSelected = rest.id === selectedRestId;
                return `
                  <div 
                    class="rest-card ${isSelected ? 'active-selected' : ''}" 
                    data-rest-id="${rest.id}"
                    role="button"
                    tabindex="0"
                  >
                    <div class="rest-card-header">
                      <div>
                        <h3 class="rest-name">${P.escapeHtml(rest.name)}</h3>
                        <div class="font-caption text-secondary">${P.escapeHtml(rest.thaiName)}</div>
                      </div>
                      <span class="rest-distance-badge">
                        📍 ${P.escapeHtml(rest.distance)}
                      </span>
                    </div>

                    <div class="rest-meta-row">
                      <span><strong>${P.escapeHtml(rest.cuisine)}</strong></span>
                      <span>•</span>
                      <span>${P.escapeHtml(rest.priceLevel)}</span>
                      <span>•</span>
                      <span style="color:${rest.isOpen ? '#165E2A' : '#784C00'};font-weight:600;">
                        ${P.escapeHtml(rest.openState.split('•')[0].trim())}
                      </span>
                    </div>

                    <div class="rest-match-callout">
                      ${P.escapeHtml(rest.matchReason)}
                    </div>

                    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.35rem;">
                      <span class="font-caption text-muted">${P.escapeHtml(rest.estimatedTravel)}</span>
                      <button type="button" class="btn btn-outline btn-sm btn-inspect-rest" data-rest-id="${rest.id}" style="border-radius:var(--radius-full);">
                        View Details →
                      </button>
                    </div>
                  </div>
                `;
              }).join('')}
            </section>
          ` : `
            <!-- DISCOVERY MODE 2: INTERACTIVE STYLIZED FAKE MAP VIEW -->
            <section aria-label="Interactive Map View">
              <div class="fake-map-viewport" id="restaurant-fake-map">
                <div class="map-terrain-grid"></div>
                <div class="map-river-shape"></div>
                <div class="map-park-shape"></div>
                <span class="map-park-label">Benchasiri Park</span>

                <!-- Roads -->
                <div class="map-road map-road-main-1"></div>
                <div class="map-road map-road-main-2"></div>
                <div class="map-road map-road-sec-1"></div>
                <div class="map-road map-road-sec-2"></div>
                <div class="map-road map-road-sec-3"></div>
                <div class="map-road map-road-sec-4"></div>

                <span class="map-district-label">Sukhumvit • Asoke</span>

                <!-- Simulated Current User Location Marker -->
                <div class="map-user-location" title="Your Location (Sukhumvit)">
                  <div class="user-location-pulse"></div>
                  <div class="user-location-dot"></div>
                </div>

                <!-- Interactive Restaurant Map Pins -->
                ${allRestaurants.map(rest => {
                  const isActivePin = rest.id === activePinId;
                  return `
                    <button 
                      type="button" 
                      class="map-pin ${isActivePin ? 'active-pin' : ''}" 
                      style="left:${rest.mapX};top:${rest.mapY};"
                      data-pin-id="${rest.id}"
                      aria-label="${P.escapeHtml(rest.name)} - ${P.escapeHtml(rest.distance)}"
                    >
                      <div class="map-pin-bubble">
                        <span>🍽️</span>
                        <span>${P.escapeHtml(rest.name.split(' ')[0])}</span>
                      </div>
                      <div class="map-pin-point"></div>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Floating Map Pin Preview Drawer -->
              ${activePinRestaurant ? `
                <div class="map-preview-card" role="region" aria-label="Selected Restaurant Preview">
                  <div style="flex:1;">
                    <div style="font-weight:700;font-size:0.95rem;color:var(--color-brand-primary);">${P.escapeHtml(activePinRestaurant.name)}</div>
                    <div class="font-caption text-secondary">${P.escapeHtml(activePinRestaurant.cuisine)} • 📍 ${P.escapeHtml(activePinRestaurant.distance)} (${P.escapeHtml(activePinRestaurant.estimatedTravel)})</div>
                  </div>
                  <button type="button" class="btn btn-primary btn-sm btn-inspect-rest" data-rest-id="${activePinRestaurant.id}" style="width:auto;white-space:nowrap;padding:0 0.85rem;">
                    Details →
                  </button>
                </div>
              ` : ''}
            </section>
          `}

          <!-- Bottom Actions: Selection Navigation -->
          <div class="bottom-actions">
            <button type="button" id="btn-quick-choose-restaurant" class="btn btn-primary btn-lg">
              <span>View ${P.escapeHtml(selectedRestId ? allRestaurants.find(r => r.id === selectedRestId)?.name || 'Restaurant' : 'Details')} →</span>
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindRecommendedRestaurantsEvents() {
    const state = P.getState();
    const allRestaurants = getRestaurantList();

    // List ↔ Map Toggle
    const listBtn = document.getElementById('toggle-view-list');
    const mapBtn = document.getElementById('toggle-view-map');

    if (listBtn) {
      listBtn.onclick = () => {
        state.restaurant.discoveryView = 'list';
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (mapBtn) {
      mapBtn.onclick = () => {
        state.restaurant.discoveryView = 'map';
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    // Quick filter chips
    const filterChips = document.querySelectorAll('.filter-chip');
    filterChips.forEach(chip => {
      chip.onclick = () => {
        state.restaurant.selectedFilter = chip.getAttribute('data-filter');
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // List card clicks
    const restCards = document.querySelectorAll('.rest-card');
    restCards.forEach(card => {
      card.onclick = (e) => {
        if (e.target.closest('.btn-inspect-rest')) return;
        const restId = card.getAttribute('data-rest-id');
        state.restaurant.selectedRestaurantId = restId;
        state.restaurant.activePinId = restId;
        P.saveState();
        restCards.forEach(c => c.classList.toggle('active-selected', c.getAttribute('data-rest-id') === restId));
        P.showToast(`Selected ${allRestaurants.find(r => r.id === restId)?.name}`, 'info');
      };
    });

    // Map pin clicks
    const mapPins = document.querySelectorAll('.map-pin');
    mapPins.forEach(pin => {
      pin.onclick = () => {
        const pinId = pin.getAttribute('data-pin-id');
        state.restaurant.activePinId = pinId;
        state.restaurant.selectedRestaurantId = pinId;
        P.saveState();
        mapPins.forEach(p => p.classList.toggle('active-pin', p.getAttribute('data-pin-id') === pinId));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // Inspect Details buttons (both list and map)
    const inspectBtns = document.querySelectorAll('.btn-inspect-rest');
    inspectBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const restId = btn.getAttribute('data-rest-id');
        state.restaurant.selectedRestaurantId = restId;
        state.restaurant.activePinId = restId;
        P.saveState();
        P.navigateTo('#/restaurants/detail');
      };
    });

    const quickChooseBtn = document.getElementById('btn-quick-choose-restaurant');
    if (quickChooseBtn) {
      quickChooseBtn.onclick = () => {
        P.navigateTo('#/restaurants/detail');
      };
    }
  }

  /* ==========================================================================
     3. Restaurant Detail Screen
     ========================================================================== */

  function renderRestaurantDetail() {
    const restaurant = getSelectedRestaurant();
    const finalMenu = getFinalMenu();

    return `
      <main class="app-shell" aria-labelledby="rest-detail-title">
        <header class="top-bar">
          <a href="#/restaurants" class="top-bar-action" aria-label="Back to Restaurant List">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Restaurant Details</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <article class="rest-detail-hero">
            <!-- Stylized Header Artwork -->
            <div class="rest-detail-artwork">
              🍽️
            </div>

            <div class="rest-detail-content">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <h2 id="rest-detail-title" class="font-heading-1" style="font-size:1.35rem;">
                    ${P.escapeHtml(restaurant.name)}
                  </h2>
                  <span class="rest-distance-badge">
                    📍 ${P.escapeHtml(restaurant.distance)}
                  </span>
                </div>
                <div class="font-body-small text-secondary" style="font-weight:600;">
                  ${P.escapeHtml(restaurant.thaiName)}
                </div>
              </div>

              <div class="rest-meta-row">
                <span><strong>${P.escapeHtml(restaurant.cuisine)}</strong></span>
                <span>•</span>
                <span>${P.escapeHtml(restaurant.priceLevel)}</span>
                <span>•</span>
                <span style="color:#165E2A;font-weight:600;">${P.escapeHtml(restaurant.openState)}</span>
              </div>

              <!-- Match Reason with Final Menu -->
              <div class="card card-hero" style="padding:0.85rem 1rem;">
                <div class="font-label" style="color:var(--color-brand-primary);margin-bottom:0.25rem;">
                  Matches Your Group Choice (${P.escapeHtml(finalMenu.name)})
                </div>
                <p class="font-body-small text-secondary" style="line-height:1.4;">
                  ${P.escapeHtml(restaurant.matchReason)}
                </p>
              </div>

              <!-- Feature Tags -->
              <div>
                <div class="font-label text-secondary" style="margin-bottom:0.45rem;">Restaurant Highlights</div>
                <div class="menu-card-tags">
                  ${restaurant.tags.map(t => `<span class="menu-tag">${P.escapeHtml(t)}</span>`).join('')}
                </div>
              </div>

              <!-- Address & Location Context -->
              <div>
                <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Address</div>
                <p class="font-body-small text-secondary">
                  ${P.escapeHtml(restaurant.address)}
                </p>
                <div class="font-caption text-muted" style="margin-top:0.2rem;">
                  Estimated travel: ${P.escapeHtml(restaurant.estimatedTravel)} from Sukhumvit
                </div>
              </div>

              <!-- Mini Focused Route Map -->
              <div class="rest-detail-minomap" aria-label="Route Preview Map">
                <div class="map-terrain-grid"></div>
                <div class="map-road map-road-main-1" style="top:50%;"></div>
                <div class="map-road map-road-sec-3" style="left:60%;"></div>

                <svg class="mini-route-svg" viewBox="0 0 300 160">
                  <path d="M 50 80 Q 150 40 230 80" fill="none" stroke="var(--color-brand-primary)" stroke-width="3" stroke-dasharray="6,4" />
                </svg>

                <div class="map-user-location" style="top:50%;left:18%;">
                  <div class="user-location-dot"></div>
                </div>

                <div class="map-pin active-pin" style="top:50%;left:76%;">
                  <div class="map-pin-bubble" style="font-size:9px;padding:2px 6px;">${P.escapeHtml(restaurant.name.split(' ')[0])}</div>
                  <div class="map-pin-point"></div>
                </div>
              </div>

            </div>
          </article>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-choose-this-restaurant" class="btn btn-primary btn-lg">
              Choose This Restaurant 🍽️ →
            </button>
            <a href="#/restaurants" class="btn btn-secondary">
              Back to Other Places
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindRestaurantDetailEvents() {
    const chooseBtn = document.getElementById('btn-choose-this-restaurant');
    const state = P.getState();
    const restaurant = getSelectedRestaurant();

    if (chooseBtn) {
      chooseBtn.onclick = () => {
        state.restaurant.selectedRestaurantId = restaurant.id;
        state.restaurant.restaurantConfirmed = true;
        P.saveState();
        P.showToast(`Selected ${restaurant.name}!`, 'success');
        P.navigateTo('#/restaurants/selected');
      };
    }
  }

  /* ==========================================================================
     4. Restaurant Selected Screen (Confirmation & Transition to Bill V5)
     ========================================================================== */

  function renderRestaurantSelected() {
    const restaurant = getSelectedRestaurant();
    const finalMenu = getFinalMenu();
    const state = P.getState();
    const activeMembers = (state.room.members || []).filter(m => m.isActive);

    return `
      <main class="app-shell" aria-labelledby="confirmed-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title">Destination Confirmed</h1>
          <a href="#/history" class="top-bar-action" aria-label="History">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </a>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div class="rest-selected-hero">
            <span class="rest-confirmed-badge">
              ✓ Destination Selected
            </span>

            <div style="font-size:42px;margin:0.25rem 0;">
              🎉
            </div>

            <h2 id="confirmed-title" class="font-heading-1" style="font-size:1.45rem;">
              You're Heading To
            </h2>

            <div style="font-size:1.25rem;font-weight:800;color:var(--color-brand-primary);margin-top:0.25rem;">
              ${P.escapeHtml(restaurant.name)}
            </div>

            <div class="font-body-small text-secondary" style="font-weight:600;">
              ${P.escapeHtml(restaurant.thaiName)}
            </div>

            <div class="font-caption text-muted" style="margin-top:0.35rem;">
              📍 ${P.escapeHtml(restaurant.address)} (${P.escapeHtml(restaurant.distance)} • ${P.escapeHtml(restaurant.estimatedTravel)})
            </div>

            <!-- Group Menu Rationale -->
            <div class="card" style="background:#FFFFFF;margin-top:1rem;text-align:left;padding:0.85rem 1rem;">
              <div class="font-label text-secondary" style="margin-bottom:0.2rem;">Ordered Winning Dish</div>
              <div style="font-weight:700;font-size:0.95rem;color:var(--color-brand-primary);display:flex;align-items:center;gap:0.35rem;">
                <span>${finalMenu.icon}</span>
                <span>${P.escapeHtml(finalMenu.name)}</span>
              </div>
            </div>

            <!-- Active Group Members Presence -->
            <div style="margin-top:1rem;">
              <div class="font-caption text-muted" style="margin-bottom:0.35rem;">Going with ${activeMembers.length} active members:</div>
              <div class="final-participants-badge">
                ${activeMembers.map(m => `
                  <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" style="width:32px;height:32px;font-size:0.75rem;" title="${P.escapeHtml(m.name)}">
                    ${P.escapeHtml(m.initials)}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Next Step: Split Bill / Payment Flow (V5 Boundary) -->
          <div class="card" style="background:var(--color-surface-subtle);margin-bottom:1.5rem;text-align:center;padding:1rem;">
            <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Next: Pay & Split the Bill</div>
            <p class="font-body-small text-secondary" style="line-height:1.4;">
              After dining, upload or scan your paper receipt to itemize and split payments fairly among members.
            </p>
          </div>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <a href="#/bill" class="btn btn-primary btn-lg" id="btn-to-split-bill">
              Split Bill (Upload Receipt) 🧾 →
            </a>
            <a href="#/restaurants" class="btn btn-secondary">
              Change Restaurant
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindRestaurantSelectedEvents() {
    const toBillBtn = document.getElementById('btn-to-split-bill');
    if (toBillBtn) {
      toBillBtn.onclick = () => {
        P.showToast('Entering Split Bill & Receipt OCR (V5 Phase)', 'info');
      };
    }
  }

  // Expose to Prototype Namespace
  P.renderRecommendedRestaurants = renderRecommendedRestaurants;
  P.bindRecommendedRestaurantsEvents = bindRecommendedRestaurantsEvents;
  P.renderRestaurantDetail = renderRestaurantDetail;
  P.bindRestaurantDetailEvents = bindRestaurantDetailEvents;
  P.renderRestaurantSelected = renderRestaurantSelected;
  P.bindRestaurantSelectedEvents = bindRestaurantSelectedEvents;

})();
