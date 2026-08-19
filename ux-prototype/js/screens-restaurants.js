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
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const finalMenu = getFinalMenu();
    const allRestaurants = getRestaurantList();
    const activeView = state.restaurant?.discoveryView || 'list';
    const activeFilter = state.restaurant?.selectedFilter || 'all';
    const activePinId = state.restaurant?.activePinId || allRestaurants[0]?.id;
    const selectedRestId = state.restaurant?.selectedRestaurantId || allRestaurants[0]?.id;

    const filteredRestaurants = getFilteredRestaurants(allRestaurants, activeFilter);
    const activePinRestaurant = allRestaurants.find(r => r.id === activePinId) || allRestaurants[0];
    const finalMenuDisplayName = isTH ? finalMenu.thaiName : finalMenu.name;

    return `
      <main class="app-shell" aria-labelledby="rest-discovery-title">
        <header class="top-bar">
          <a href="#/final-menu" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('restaurants.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Final Menu Context Banner -->
          <div class="restaurant-context-banner" style="background:var(--color-surface-subtle);border-radius:var(--radius-lg);padding:0.75rem 1rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.6rem;">
              <span style="font-size:22px;">${finalMenu.icon || '🍽️'}</span>
              <div>
                <div class="font-caption text-secondary">${t('recommend.finalMenu.title')}</div>
                <div style="font-weight:700;font-size:0.9rem;color:var(--color-brand-primary);">${P.escapeHtml(finalMenuDisplayName)}</div>
              </div>
            </div>
            <span class="step-badge" style="font-size:0.65rem;">${allRestaurants.length} ${t('restaurants.title')}</span>
          </div>

          <!-- View Switcher (List ↔ Map) & Filter Chips -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:0.5rem;flex-wrap:wrap;">
            <!-- Segmented Control: List ↔ Map -->
            <div class="segmented-control" role="tablist">
              <button 
                type="button" 
                class="segmented-btn btn-switch-view ${activeView === 'list' ? 'active' : ''}" 
                data-view="list"
                role="tab"
                aria-selected="${activeView === 'list'}"
              >
                ${t('restaurants.viewList')}
              </button>
              <button 
                type="button" 
                class="segmented-btn btn-switch-view ${activeView === 'map' ? 'active' : ''}" 
                data-view="map"
                role="tab"
                aria-selected="${activeView === 'map'}"
              >
                ${t('restaurants.viewMap')}
              </button>
            </div>

            <!-- Filter Chips -->
            <div class="filter-chips-row" style="display:flex;gap:0.35rem;">
              <button type="button" class="filter-chip btn-filter ${activeFilter === 'all' ? 'active' : ''}" data-filter="all">
                ${t('restaurants.filterAll')}
              </button>
              <button type="button" class="filter-chip btn-filter ${activeFilter === 'nearest' ? 'active' : ''}" data-filter="nearest">
                ${t('restaurants.filterNearest')}
              </button>
              <button type="button" class="filter-chip btn-filter ${activeFilter === 'open' ? 'active' : ''}" data-filter="open">
                ${t('restaurants.filterOpen')}
              </button>
            </div>
          </div>

          <!-- LIST VIEW -->
          ${activeView === 'list' ? `
            <section class="restaurant-list-container" aria-label="Restaurant List">
              <div style="display:flex;flex-direction:column;gap:1rem;">
                ${filteredRestaurants.map(rest => {
                  const isSelected = selectedRestId === rest.id;
                  const restName = isTH ? rest.thaiName : rest.name;
                  return `
                    <article class="card restaurant-card" style="padding:1rem;background:#FFFFFF;border-radius:var(--radius-xl);border:1.5px solid ${isSelected ? 'var(--color-brand-primary)' : 'var(--color-border)'};box-shadow:var(--shadow-sm);">
                      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.4rem;">
                        <h3 class="font-heading-3" style="font-size:1.05rem;">${P.escapeHtml(restName)}</h3>
                        <span class="step-badge ${rest.isOpen ? 'status-ready' : 'status-waiting'}" style="font-size:0.65rem;">
                          ${rest.isOpen ? t('restaurants.filterOpen') : 'Closed'}
                        </span>
                      </div>

                      <div class="font-caption text-secondary" style="margin-bottom:0.6rem;">
                        📍 ${P.escapeHtml(rest.address)}
                      </div>

                      <div style="display:flex;gap:0.75rem;font-size:0.8rem;margin-bottom:0.75rem;color:var(--color-text-secondary);">
                        <span>🚶 ${P.escapeHtml(rest.distance)} (${P.escapeHtml(rest.estimatedTravel)})</span>
                        <span>•</span>
                        <span>${P.escapeHtml(rest.priceLevel)}</span>
                        <span>•</span>
                        <span>⭐ ${P.escapeHtml(rest.ratingText)}</span>
                      </div>

                      <div style="display:flex;justify-content:flex-end;gap:0.5rem;padding-top:0.6rem;border-top:1px dashed var(--color-border);">
                        <button type="button" class="btn btn-outline btn-sm btn-select-restaurant" data-rest-id="${rest.id}">
                          ${isSelected ? `✓ Selected` : `${t('common.done')}`}
                        </button>
                        <button type="button" class="btn btn-primary btn-sm btn-view-detail" data-rest-id="${rest.id}">
                          ${t('restaurants.detail.chooseCTA')}
                        </button>
                      </div>
                    </article>
                  `;
                }).join('')}
              </div>
            </section>
          ` : `
            <!-- MAP VIEW -->
            <section class="restaurant-map-container" aria-label="Restaurant Map Discovery">
              <div class="fake-map-canvas" style="position:relative;height:340px;background:#F2EDE4;border-radius:var(--radius-xl);overflow:hidden;border:1.5px solid var(--color-border);margin-bottom:1rem;">
                <div class="map-grid-roads" style="position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);background-size:40px 40px;"></div>
                <div class="map-river" style="position:absolute;width:100%;height:35px;background:#D4E8F4;top:48%;transform:rotate(-8deg);"></div>

                <!-- User Current Location Pulse Marker -->
                <div class="map-user-marker" style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:16px;height:16px;background:#1976D2;border:3px solid #fff;border-radius:50%;box-shadow:0 0 10px rgba(25,118,210,0.6);z-index:2;"></div>

                <!-- Restaurant Interactive Pins -->
                ${filteredRestaurants.map(rest => {
                  const isActivePin = activePinId === rest.id;
                  return `
                    <button 
                      type="button" 
                      class="map-restaurant-pin btn-map-pin ${isActivePin ? 'active' : ''}" 
                      data-rest-id="${rest.id}"
                      style="position:absolute;top:${rest.mapY};left:${rest.mapX};transform:translate(-50%, -100%);background:${isActivePin ? 'var(--color-brand-primary)' : '#FFFFFF'};color:${isActivePin ? '#FFFFFF' : 'var(--color-brand-primary)'};border:2px solid var(--color-brand-primary);border-radius:var(--radius-full);padding:0.25rem 0.6rem;font-size:0.75rem;font-weight:700;box-shadow:var(--shadow-md);cursor:pointer;z-index:3;transition:transform var(--transition-fast);"
                      aria-label="Pin for ${P.escapeHtml(rest.name)}"
                    >
                      📍 ${P.escapeHtml(isTH ? rest.thaiName.split(' ')[0] : rest.name.split(' ')[0])}
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Selected Pin Bottom Sheet Preview Card -->
              <div class="card map-preview-card" style="padding:1rem;background:#FFFFFF;border-radius:var(--radius-xl);box-shadow:var(--shadow-md);border:1.5px solid var(--color-brand-primary);">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <div>
                    <h3 class="font-heading-3" style="font-size:1.05rem;">${P.escapeHtml(isTH ? activePinRestaurant.thaiName : activePinRestaurant.name)}</h3>
                    <div class="font-caption text-secondary" style="margin-top:0.15rem;">
                      🚶 ${P.escapeHtml(activePinRestaurant.distance)} • ${P.escapeHtml(activePinRestaurant.priceLevel)} • ⭐ ${P.escapeHtml(activePinRestaurant.ratingText)}
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary btn-sm btn-view-detail" data-rest-id="${activePinRestaurant.id}">
                    ${t('restaurants.detail.chooseCTA')}
                  </button>
                </div>
              </div>
            </section>
          `}

          <!-- Bottom Actions: Proceed with Selected Restaurant -->
          <div class="bottom-actions">
            <a href="#/restaurants/selected" class="btn btn-primary btn-lg">
              ${t('restaurants.detail.chooseCTA')}
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindRecommendedRestaurantsEvents() {
    const viewBtns = document.querySelectorAll('.btn-switch-view');
    const filterBtns = document.querySelectorAll('.btn-filter');
    const selectBtns = document.querySelectorAll('.btn-select-restaurant');
    const detailBtns = document.querySelectorAll('.btn-view-detail');
    const pinBtns = document.querySelectorAll('.btn-map-pin');
    const state = P.getState();

    viewBtns.forEach(btn => {
      btn.onclick = () => {
        state.restaurant.discoveryView = btn.getAttribute('data-view');
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    filterBtns.forEach(btn => {
      btn.onclick = () => {
        state.restaurant.selectedFilter = btn.getAttribute('data-filter');
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    selectBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-rest-id');
        state.restaurant.selectedRestaurantId = id;
        state.restaurant.activePinId = id;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    detailBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-rest-id');
        state.restaurant.selectedRestaurantId = id;
        state.restaurant.activePinId = id;
        P.saveState();
        P.navigateTo('#/restaurants/detail');
      };
    });

    pinBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-rest-id');
        state.restaurant.activePinId = id;
        state.restaurant.selectedRestaurantId = id;
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });
  }

  /* ==========================================================================
     3. Screen: Restaurant Detail & Map Route
     ========================================================================== */

  function renderRestaurantDetail() {
    const restaurant = getSelectedRestaurant();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const restName = isTH ? restaurant.thaiName : restaurant.name;

    return `
      <main class="app-shell" aria-labelledby="rest-detail-title">
        <header class="top-bar">
          <a href="#/restaurants" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${P.escapeHtml(restName)}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Mini Route Map Canvas -->
          <div class="fake-map-canvas" style="position:relative;height:180px;background:#F2EDE4;border-radius:var(--radius-xl);overflow:hidden;border:1.5px solid var(--color-border);margin-bottom:1.25rem;">
            <div class="map-grid-roads" style="position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);background-size:30px 30px;"></div>
            <!-- Dotted Walking Route Line -->
            <div style="position:absolute;top:40%;left:30%;width:40%;height:3px;background:repeating-linear-gradient(90deg, var(--color-brand-primary), var(--color-brand-primary) 6px, transparent 6px, transparent 12px);"></div>
            <div style="position:absolute;top:40%;left:30%;width:12px;height:12px;background:#1976D2;border:2px solid #fff;border-radius:50%;transform:translate(-50%,-50%);"></div>
            <div style="position:absolute;top:40%;left:70%;transform:translate(-50%,-100%);background:var(--color-brand-primary);color:#fff;border-radius:var(--radius-full);padding:0.2rem 0.5rem;font-size:0.75rem;font-weight:700;">📍 Destination</div>
          </div>

          <!-- Restaurant Details Card -->
          <div class="card" style="padding:1.25rem;background:#FFFFFF;border-radius:var(--radius-xl);border:1.5px solid var(--color-border);margin-bottom:1rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <h2 id="rest-detail-title" class="font-heading-1" style="font-size:1.35rem;">${P.escapeHtml(restName)}</h2>
                <div class="font-caption text-secondary" style="margin-top:0.2rem;">${P.escapeHtml(restaurant.cuisine)} • ${P.escapeHtml(restaurant.priceLevel)}</div>
              </div>
              <span class="step-badge ${restaurant.isOpen ? 'status-ready' : 'status-waiting'}">
                ${restaurant.isOpen ? t('restaurants.filterOpen') : 'Closed'}
              </span>
            </div>

            <div class="card" style="background:var(--color-surface-subtle);padding:0.75rem;border-radius:var(--radius-md);margin:1rem 0;font-size:0.8rem;line-height:1.4;">
              <strong style="color:var(--color-brand-primary);">✨ ${t('recommend.whyMatch')}</strong>
              <div class="text-secondary" style="margin-top:0.2rem;">${P.escapeHtml(restaurant.matchReason)}</div>
            </div>

            <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.8rem;color:var(--color-text-secondary);">
              <div>📍 ${P.escapeHtml(restaurant.address)}</div>
              <div>🚶 ${t('restaurants.detail.distance')}: ${P.escapeHtml(restaurant.distance)} (${P.escapeHtml(restaurant.estimatedTravel)})</div>
              <div>🕒 ${P.escapeHtml(restaurant.openState)}</div>
              <div>⭐ ${P.escapeHtml(restaurant.ratingText)}</div>
            </div>
          </div>

          <!-- Bottom Action: Select This Restaurant -->
          <div class="bottom-actions">
            <button type="button" id="btn-choose-this-restaurant" class="btn btn-primary btn-lg">
              ${t('restaurants.detail.chooseCTA')}
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindRestaurantDetailEvents() {
    const chooseBtn = document.getElementById('btn-choose-this-restaurant');
    if (chooseBtn) {
      chooseBtn.onclick = () => {
        const state = P.getState();
        state.restaurant.restaurantConfirmed = true;
        P.saveState();
        P.navigateTo('#/restaurants/selected');
      };
    }
  }

  /* ==========================================================================
     4. Screen: Restaurant Selected Confirmation (Transitions to V5 Boundary)
     ========================================================================== */

  function renderRestaurantSelected() {
    const restaurant = getSelectedRestaurant();
    const t = P.t;
    const isTH = P.i18n.getLanguage() === 'th';
    const restName = isTH ? restaurant.thaiName : restaurant.name;

    return `
      <main class="app-shell" aria-labelledby="selected-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/restaurants" class="top-bar-action" aria-label="${t('common.back')}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">${t('restaurants.selected.title')}</h1>
          <div style="display:flex;align-items:center;gap:0.35rem;">
            ${P.renderLanguageSwitch ? P.renderLanguageSwitch() : ''}
          </div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions" style="text-align:center;">
          
          <div style="font-size:54px;margin:1.5rem 0 0.5rem 0;">📍</div>
          <span class="step-badge" style="background:#EDF9F0;color:#165E2A;font-weight:700;font-size:0.85rem;padding:0.35rem 0.85rem;">
            ${t('restaurants.selected.title')}
          </span>

          <h2 id="selected-title" class="font-heading-1" style="font-size:1.5rem;margin-top:0.75rem;">
            ${P.escapeHtml(restName)}
          </h2>
          <div class="font-body-small text-secondary" style="margin-top:0.25rem;">
            ${P.escapeHtml(restaurant.address)}
          </div>

          <div class="card" style="background:var(--color-surface-subtle);padding:1rem;margin:1.5rem 0;border-radius:var(--radius-xl);text-align:left;">
            <div style="font-weight:700;color:var(--color-brand-primary);font-size:0.95rem;">
              🚗 ${t('restaurants.detail.travelTime')}: ${P.escapeHtml(restaurant.estimatedTravel)}
            </div>
            <div class="font-caption text-secondary" style="margin-top:0.25rem;">
              ${P.escapeHtml(restaurant.openState)}
            </div>
          </div>

          <!-- Bottom Action: Transition to V5 Split Bill -->
          <div class="bottom-actions">
            <a href="#/bill" class="btn btn-primary btn-lg">
              ${t('restaurants.selected.splitBillCTA')}
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindRestaurantSelectedEvents() {}

  // Expose to Prototype Namespace
  P.getFinalMenu = getFinalMenu;
  P.getRestaurantList = getRestaurantList;
  P.getSelectedRestaurant = getSelectedRestaurant;
  P.renderRecommendedRestaurants = renderRecommendedRestaurants;
  P.bindRecommendedRestaurantsEvents = bindRecommendedRestaurantsEvents;
  P.renderRestaurantDetail = renderRestaurantDetail;
  P.bindRestaurantDetailEvents = bindRestaurantDetailEvents;
  P.renderRestaurantSelected = renderRestaurantSelected;
  P.bindRestaurantSelectedEvents = bindRestaurantSelectedEvents;

})();
