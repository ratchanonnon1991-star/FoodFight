/**
 * FoodFighter UX Prototype — History, Bill History & Profile Screens (V6)
 * 
 * Implements:
 *   - FoodFight Session History Feed & Detail Modal
 *   - Bill History Receipts Feed & Detail Modal
 *   - User Profile Summary & Battle Stats
 *   - Edit Food Profile Form (Single cohesive preference editor)
 *   - Global 3-Tab Bottom Navigation Bar
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Shared Bottom Navigation Component
     ========================================================================== */

  function renderBottomNavigation(activeTab = 'home') {
    return `
      <nav class="bottom-nav-bar" aria-label="Main Navigation">
        <a href="#/home" class="bottom-nav-item ${activeTab === 'home' ? 'active' : ''}" ${activeTab === 'home' ? 'aria-current="page"' : ''}>
          <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Home</span>
        </a>

        <a href="#/history" class="bottom-nav-item ${activeTab === 'history' ? 'active' : ''}" ${activeTab === 'history' ? 'aria-current="page"' : ''}>
          <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>History</span>
        </a>

        <a href="#/profile" class="bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}" ${activeTab === 'profile' ? 'aria-current="page"' : ''}>
          <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Profile</span>
        </a>
      </nav>
    `;
  }

  /* ==========================================================================
     2. FoodFight History Screen (#/history)
     ========================================================================== */

  function renderHistory() {
    const state = P.getState();
    const finalMenuId = state.recommendation?.finalWinnerMenuId || 'menu-a';
    const finalMenu = P.CANDIDATE_MENUS[finalMenuId] || P.CANDIDATE_MENUS['menu-a'];
    const restList = P.RESTAURANT_CATALOGUE[finalMenu.id] || P.RESTAURANT_CATALOGUE['menu-a'];
    const selectedRestId = state.restaurant?.selectedRestaurantId || restList[0]?.id;
    const restaurant = restList.find(r => r.id === selectedRestId) || restList[0];

    const currentSession = {
      id: 'current-session',
      dateLabel: 'Today • Just Now',
      roomName: state.room.roomName || 'Dinner Food Fight',
      menuName: finalMenu.name,
      restaurantName: restaurant.name,
      location: restaurant.address.split(',')[0],
      participants: (state.room.members || []).filter(m => m.isActive).map(m => m.name.split(' ')[0]),
      outcome: 'Winner Selected (100% Group OK)'
    };

    const allSessions = [currentSession, ...(P.HISTORICAL_FOODFIGHTS || [])];

    return `
      <main class="app-shell" aria-labelledby="history-title" style="padding-bottom: 70px;">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title" id="history-title">History</h1>
          <a href="#/profile" class="top-bar-action" aria-label="Profile"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
        </header>

        <div class="page-shell">
          
          <!-- Top Segmented Tabs: FoodFight History ↔ Bill History -->
          <div class="history-tabs-bar" role="tablist">
            <a href="#/history" class="history-tab-btn active" role="tab" aria-selected="true">
              <span>⚔️ FoodFight Sessions</span>
            </a>
            <a href="#/bill-history" class="history-tab-btn" role="tab" aria-selected="false">
              <span>🧾 Bill Settlements</span>
            </a>
          </div>

          <!-- Chronological History Feed -->
          <section class="history-feed" aria-label="Past FoodFight Battles">
            ${allSessions.map(session => `
              <article class="history-card btn-open-history-detail" data-session-id="${session.id}" tabindex="0" role="button" aria-label="View details for ${P.escapeHtml(session.menuName)}">
                <div class="history-card-top">
                  <span class="history-date-badge">${P.escapeHtml(session.dateLabel)}</span>
                  <span class="font-caption text-secondary" style="font-weight:600;">${P.escapeHtml(session.roomName)}</span>
                </div>

                <div>
                  <h3 class="history-menu-title">${P.escapeHtml(session.menuName)}</h3>
                  <div class="history-restaurant-sub">📍 ${P.escapeHtml(session.restaurantName)} (${P.escapeHtml(session.location)})</div>
                </div>

                <div class="history-members-row">
                  <div class="font-caption text-muted">
                    With ${session.participants.join(', ')}
                  </div>
                  <span class="font-caption" style="color:#165E2A;font-weight:700;">${P.escapeHtml(session.outcome)}</span>
                </div>
              </article>
            `).join('')}
          </section>

        </div>

        ${renderBottomNavigation('history')}
      </main>
    `;
  }

  function bindHistoryEvents() {
    const cards = document.querySelectorAll('.btn-open-history-detail');
    cards.forEach(card => {
      card.onclick = () => {
        const sessionId = card.getAttribute('data-session-id');
        const state = P.getState();
        const finalMenuId = state.recommendation?.finalWinnerMenuId || 'menu-a';
        const finalMenu = P.CANDIDATE_MENUS[finalMenuId] || P.CANDIDATE_MENUS['menu-a'];
        const restList = P.RESTAURANT_CATALOGUE[finalMenu.id] || P.RESTAURANT_CATALOGUE['menu-a'];
        const selectedRestId = state.restaurant?.selectedRestaurantId || restList[0]?.id;
        const restaurant = restList.find(r => r.id === selectedRestId) || restList[0];

        let session = P.HISTORICAL_FOODFIGHTS.find(s => s.id === sessionId);
        if (!session) {
          session = {
            menuName: finalMenu.name,
            thaiName: finalMenu.thaiName,
            restaurantName: restaurant.name,
            address: restaurant.address,
            dateLabel: 'Today • Just Now',
            outcome: 'Won in Round 1 with 100% OK consensus',
            participants: (state.room.members || []).map(m => m.name)
          };
        }

        P.openModal(`
          <div style="text-align:center;padding:0.5rem 0;">
            <div style="font-size:36px;margin-bottom:0.35rem;">🎉</div>
            <div class="font-caption text-muted">${P.escapeHtml(session.dateLabel)}</div>
            <h3 class="font-heading-2" style="margin-top:0.25rem;">${P.escapeHtml(session.menuName)}</h3>
            ${session.thaiName ? `<div class="font-caption text-secondary" style="font-weight:600;">${P.escapeHtml(session.thaiName)}</div>` : ''}

            <div class="card" style="background:var(--color-surface-subtle);margin:1rem 0;text-align:left;padding:0.85rem 1rem;">
              <div class="font-label text-secondary">Dining Destination</div>
              <div style="font-weight:700;font-size:0.95rem;color:var(--color-brand-primary);">${P.escapeHtml(session.restaurantName)}</div>
              <div class="font-caption text-muted">${P.escapeHtml(session.address || session.location || 'Sukhumvit, Bangkok')}</div>
            </div>

            <div class="card" style="background:#EDF9F0;border-color:#A6DEB4;margin-bottom:1.25rem;text-align:left;padding:0.85rem 1rem;">
              <div class="font-label" style="color:#165E2A;">Decision Outcome</div>
              <div class="font-body-small" style="color:#165E2A;font-weight:600;">${P.escapeHtml(session.outcome)}</div>
            </div>

            <button type="button" id="btn-close-session-modal" class="btn btn-primary">
              Close Details
            </button>
          </div>
        `);

        const closeBtn = document.getElementById('btn-close-session-modal');
        if (closeBtn) closeBtn.onclick = () => P.closeModal();
      };
    });
  }

  /* ==========================================================================
     3. Bill History Screen (#/bill-history)
     ========================================================================== */

  function renderBillHistory() {
    const state = P.getState();
    const completed = state.bill.completedRecord;

    const currentBill = completed ? {
      id: 'current-bill',
      dateLabel: 'Today • 20:30',
      restaurantName: completed.restaurantName,
      groupName: state.room.roomName || 'Dinner Food Fight',
      totalBill: completed.totalBill,
      yourShare: Math.round(completed.totalBill / (completed.participantsCount || 4)),
      participantsCount: completed.participantsCount || 4,
      isPaid: true
    } : {
      id: 'current-bill',
      dateLabel: 'Today • 20:30',
      restaurantName: 'Siam Ember Kitchen',
      groupName: 'Dinner Food Fight',
      totalBill: 1045,
      yourShare: 383,
      participantsCount: 4,
      isPaid: true
    };

    const allBills = [currentBill, ...(P.HISTORICAL_BILLS || [])];

    return `
      <main class="app-shell" aria-labelledby="bill-hist-title" style="padding-bottom: 70px;">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title" id="bill-hist-title">Bill History</h1>
          <a href="#/profile" class="top-bar-action" aria-label="Profile"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
        </header>

        <div class="page-shell">
          
          <!-- Top Segmented Tabs -->
          <div class="history-tabs-bar" role="tablist">
            <a href="#/history" class="history-tab-btn" role="tab" aria-selected="false">
              <span>⚔️ FoodFight Sessions</span>
            </a>
            <a href="#/bill-history" class="history-tab-btn active" role="tab" aria-selected="true">
              <span>🧾 Bill Settlements</span>
            </a>
          </div>

          <!-- Bill Receipts List -->
          <section class="history-feed" aria-label="Past Receipts and Settlements">
            ${allBills.map(b => `
              <article class="bill-history-card btn-open-bill-detail" data-bill-id="${b.id}" tabindex="0" role="button" aria-label="View receipt for ${P.escapeHtml(b.restaurantName)}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <div>
                    <h3 class="history-menu-title">${P.escapeHtml(b.restaurantName)}</h3>
                    <div class="font-caption text-secondary">${P.escapeHtml(b.groupName)} • ${b.participantsCount} Members</div>
                  </div>
                  <span class="payment-status-badge status-paid">✓ All Paid</span>
                </div>

                <div class="bill-history-amount-row">
                  <div>
                    <span class="font-caption text-muted">Your Share</span>
                    <div style="font-family:monospace;font-size:1.05rem;font-weight:800;color:var(--color-brand-primary);">฿${b.yourShare.toLocaleString()}</div>
                  </div>
                  <div style="text-align:right;">
                    <span class="font-caption text-muted">Total Bill</span>
                    <div style="font-family:monospace;font-size:0.95rem;font-weight:700;color:var(--color-text-secondary);">฿${b.totalBill.toLocaleString()}</div>
                  </div>
                </div>
              </article>
            `).join('')}
          </section>

        </div>

        ${renderBottomNavigation('history')}
      </main>
    `;
  }

  function bindBillHistoryEvents() {
    const cards = document.querySelectorAll('.btn-open-bill-detail');
    cards.forEach(card => {
      card.onclick = () => {
        const billId = card.getAttribute('data-bill-id');
        let bill = P.HISTORICAL_BILLS.find(b => b.id === billId);
        if (!bill) {
          bill = {
            restaurantName: 'Siam Ember Kitchen',
            dateLabel: 'Today • 20:30',
            groupName: 'Dinner Food Fight',
            totalBill: 1045,
            yourShare: 383,
            participantsCount: 4
          };
        }

        P.openModal(`
          <div style="text-align:center;padding:0.5rem 0;">
            <div style="font-size:36px;margin-bottom:0.35rem;">🧾</div>
            <h3 class="font-heading-2">${P.escapeHtml(bill.restaurantName)}</h3>
            <div class="font-caption text-muted">${P.escapeHtml(bill.dateLabel)}</div>

            <div class="card" style="background:#FCFCFA;border:1px dashed #D5D1C5;margin:1rem 0;padding:1rem;">
              <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem;">
                <span class="text-secondary">Group Session</span>
                <span style="font-weight:700;color:var(--color-brand-primary);">${P.escapeHtml(bill.groupName)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;font-size:0.85rem;">
                <span class="text-secondary">Total Bill Amount</span>
                <span style="font-family:monospace;font-weight:800;color:var(--color-brand-primary);">฿${bill.totalBill.toLocaleString()}</span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.95rem;padding-top:0.5rem;border-top:1px dashed #E5E2D9;">
                <span style="font-weight:700;">Your Share</span>
                <span style="font-family:monospace;font-weight:800;color:var(--color-brand-secondary);">฿${bill.yourShare.toLocaleString()}</span>
              </div>
            </div>

            <div class="card" style="background:#EDF9F0;border-color:#A6DEB4;margin-bottom:1.25rem;">
              <span class="payment-status-badge status-paid">✓ 100% Settled Complete</span>
            </div>

            <button type="button" id="btn-close-bill-modal" class="btn btn-primary">
              Close Receipt
            </button>
          </div>
        `);

        const closeBtn = document.getElementById('btn-close-bill-modal');
        if (closeBtn) closeBtn.onclick = () => P.closeModal();
      };
    });
  }

  /* ==========================================================================
     4. User Profile Screen (#/profile)
     ========================================================================== */

  function renderProfile() {
    const state = P.getState();
    const user = state.auth.user || { name: 'Alex Johnson', email: 'user@example.com', avatarText: 'AJ' };
    const fp = state.foodProfile || {};

    const allergyNames = (fp.allergies || []).map(id => {
      const opt = P.ALLERGY_OPTIONS.find(o => o.id === id);
      return opt ? opt.label : id;
    });

    const restrictionNames = (fp.restrictions || []).map(id => {
      const opt = P.RESTRICTION_OPTIONS.find(o => o.id === id);
      return opt ? opt.label : id;
    });

    return `
      <main class="app-shell" aria-labelledby="profile-title" style="padding-bottom: 70px;">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
          <h1 class="top-bar-title" id="profile-title">Profile</h1>
          <a href="#/history" class="top-bar-action" aria-label="History"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></a>
        </header>

        <div class="page-shell">
          
          <!-- User Profile Hero -->
          <div class="profile-hero">
            <div class="profile-avatar-large">
              ${P.escapeHtml(user.avatarText || 'AJ')}
            </div>
            <h2 class="font-heading-1" style="font-size:1.35rem;">${P.escapeHtml(user.name)}</h2>
            <div class="font-caption text-secondary">${P.escapeHtml(user.email)}</div>
            <div>
              <span class="profile-badge-pill">
                👑 Host & Food Fighter
              </span>
            </div>
          </div>

          <!-- Quick Stats Grid -->
          <div class="profile-stats-grid">
            <div class="profile-stat-box">
              <div class="profile-stat-num">14</div>
              <div class="profile-stat-label">FoodFights</div>
            </div>
            <div class="profile-stat-box">
              <div class="profile-stat-num">8</div>
              <div class="profile-stat-label">Places Visited</div>
            </div>
            <div class="profile-stat-box">
              <div class="profile-stat-num">100%</div>
              <div class="profile-stat-label">Bills Settled</div>
            </div>
          </div>

          <!-- Food Profile & Safety Summary Card -->
          <div class="profile-food-card">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <h3 class="font-heading-2" style="font-size:1.05rem;">Food Safety & Diet Profile</h3>
                <div class="font-caption text-secondary">Applied automatically to all group sessions</div>
              </div>
              <a href="#/profile/food" class="btn btn-outline btn-sm" style="border-radius:var(--radius-full);">
                Edit ✏️
              </a>
            </div>

            <!-- Allergies Summary -->
            <div>
              <div class="font-label text-secondary" style="margin-bottom:0.35rem;">Allergies (Strict Exclusions)</div>
              <div class="menu-card-tags">
                ${allergyNames.length === 0 || allergyNames.includes('No Allergies') ? `
                  <span class="menu-tag" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">✓ No Allergies</span>
                ` : allergyNames.map(a => `
                  <span class="menu-tag" style="background:#FFF0F0;color:#8E1F1F;border-color:#F6B8B8;">⚠️ ${P.escapeHtml(a)}</span>
                `).join('')}
              </div>
            </div>

            <!-- Restrictions Summary -->
            <div>
              <div class="font-label text-secondary" style="margin-bottom:0.35rem;">Dietary Restrictions</div>
              <div class="menu-card-tags">
                ${restrictionNames.length === 0 || restrictionNames.includes('No Restrictions') ? `
                  <span class="menu-tag">No Restrictions</span>
                ` : restrictionNames.map(r => `
                  <span class="menu-tag" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">✓ ${P.escapeHtml(r)}</span>
                `).join('')}
              </div>
            </div>

            <!-- Flavor Notes -->
            <div>
              <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Personal Flavor & Spice Notes</div>
              <p class="font-body-small text-secondary">
                ${fp.details ? P.escapeHtml(fp.details) : 'Prefer spicy food and places with air conditioning.'}
              </p>
            </div>
          </div>

          <!-- Account Affordances -->
          <div style="display:flex;flex-direction:column;gap:0.65rem;margin-bottom:1.5rem;">
            <a href="#/profile/food" class="btn btn-primary btn-lg">
              Edit Food Profile ✏️ →
            </a>
            <a href="#/login" class="btn btn-secondary" id="btn-logout">
              Log Out of Demo
            </a>
          </div>

        </div>

        ${renderBottomNavigation('profile')}
      </main>
    `;
  }

  function bindProfileEvents() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        P.showToast('Logged out of demo session.', 'info');
      };
    }
  }

  /* ==========================================================================
     5. Edit Food Profile Screen (#/profile/food)
     ========================================================================== */

  function renderProfileFoodEdit() {
    const state = P.getState();
    const fp = state.foodProfile || { allergies: [], restrictions: [], details: '' };

    return `
      <main class="app-shell" aria-labelledby="edit-food-title" style="padding-bottom: 90px;">
        <header class="top-bar">
          <a href="#/profile" class="top-bar-action" aria-label="Back to Profile">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title" id="edit-food-title">Edit Food Profile</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell">
          
          <div style="margin-bottom:1rem;">
            <p class="font-body-small text-secondary">
              Update your allergies, dietary restrictions, and personal food nuances from this single screen.
            </p>
          </div>

          <!-- Section 1: Allergies -->
          <section class="edit-food-section">
            <h3 class="font-heading-2" style="font-size:1.05rem;">1. Food Allergies</h3>
            <p class="font-caption text-secondary">AI strictly avoids recommending ingredients you select here.</p>

            <div class="edit-chip-grid" role="group" aria-label="Allergy Options">
              ${P.ALLERGY_OPTIONS.map(opt => {
                const isSelected = (fp.allergies || []).includes(opt.id);
                return `
                  <button 
                    type="button" 
                    class="edit-pill-btn btn-edit-allergy ${isSelected ? 'selected-allergy' : ''}" 
                    data-allergy-id="${opt.id}"
                    aria-pressed="${isSelected}"
                  >
                    <span>${isSelected ? '⚠️' : '＋'}</span>
                    <span>${P.escapeHtml(opt.label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Section 2: Dietary Restrictions -->
          <section class="edit-food-section">
            <h3 class="font-heading-2" style="font-size:1.05rem;">2. Dietary Restrictions</h3>
            <p class="font-caption text-secondary">Religious, ethical, and lifestyle diets.</p>

            <div class="edit-chip-grid" role="group" aria-label="Dietary Restriction Options">
              ${P.RESTRICTION_OPTIONS.map(opt => {
                const isSelected = (fp.restrictions || []).includes(opt.id);
                return `
                  <button 
                    type="button" 
                    class="edit-pill-btn btn-edit-restriction ${isSelected ? 'selected-restriction' : ''}" 
                    data-restriction-id="${opt.id}"
                    aria-pressed="${isSelected}"
                  >
                    <span>${isSelected ? '✓' : '＋'}</span>
                    <span>${P.escapeHtml(opt.label)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </section>

          <!-- Section 3: Additional Notes & Suggestions -->
          <section class="edit-food-section">
            <h3 class="font-heading-2" style="font-size:1.05rem;">3. Personal Flavor & Spice Notes</h3>
            <p class="font-caption text-secondary">Freeform notes for your group's AI matchmaker.</p>

            <textarea 
              id="input-edit-details" 
              class="form-input" 
              rows="3" 
              placeholder="e.g. Love spicy food, low sodium broths, prefer air-con..."
              style="margin-top:0.65rem;resize:vertical;"
            >${P.escapeHtml(fp.details || '')}</textarea>

            <div style="margin-top:0.75rem;">
              <div class="font-caption text-muted" style="margin-bottom:0.35rem;">Quick Suggestions:</div>
              <div class="edit-chip-grid">
                ${P.SUGGESTION_PILLS.map(p => `
                  <button type="button" class="btn-suggestion-pill edit-pill-btn" data-tag="${P.escapeHtml(p.tag)}">
                    ${P.escapeHtml(p.text)}
                  </button>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- Bottom Actions -->
          <div class="bottom-actions">
            <button type="button" id="btn-save-food-profile" class="btn btn-primary btn-lg">
              Save Changes ✓
            </button>
            <a href="#/profile" class="btn btn-secondary">
              Cancel
            </a>
          </div>

        </div>
      </main>
    `;
  }

  function bindProfileFoodEditEvents() {
    const state = P.getState();
    state.foodProfile = state.foodProfile || { allergies: [], restrictions: [], details: '' };

    // Allergy chips toggle
    const allergyBtns = document.querySelectorAll('.btn-edit-allergy');
    allergyBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-allergy-id');
        let current = state.foodProfile.allergies || [];
        if (id === 'none') {
          state.foodProfile.allergies = ['none'];
        } else {
          current = current.filter(a => a !== 'none');
          if (current.includes(id)) {
            state.foodProfile.allergies = current.filter(a => a !== id);
          } else {
            state.foodProfile.allergies = [...current, id];
          }
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // Restriction chips toggle
    const restrictionBtns = document.querySelectorAll('.btn-edit-restriction');
    restrictionBtns.forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-restriction-id');
        let current = state.foodProfile.restrictions || [];
        if (id === 'none') {
          state.foodProfile.restrictions = ['none'];
        } else {
          current = current.filter(r => r !== 'none');
          if (current.includes(id)) {
            state.foodProfile.restrictions = current.filter(r => r !== id);
          } else {
            state.foodProfile.restrictions = [...current, id];
          }
        }
        P.saveState();
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    });

    // Quick suggestion pills
    const suggestionBtns = document.querySelectorAll('.btn-suggestion-pill');
    const detailsInput = document.getElementById('input-edit-details');
    suggestionBtns.forEach(btn => {
      btn.onclick = () => {
        const tag = btn.getAttribute('data-tag');
        if (detailsInput) {
          const current = detailsInput.value.trim();
          detailsInput.value = current ? `${current}, ${tag}` : tag;
        }
      };
    });

    // Save profile button
    const saveBtn = document.getElementById('btn-save-food-profile');
    if (saveBtn) {
      saveBtn.onclick = () => {
        if (detailsInput) {
          state.foodProfile.details = detailsInput.value.trim();
        }
        P.saveState();
        P.showToast('Food profile updated successfully!', 'success');
        P.navigateTo('#/profile');
      };
    }
  }

  // Expose to Prototype Namespace
  P.renderBottomNavigation = renderBottomNavigation;
  P.renderHistory = renderHistory;
  P.bindHistoryEvents = bindHistoryEvents;
  P.renderBillHistory = renderBillHistory;
  P.bindBillHistoryEvents = bindBillHistoryEvents;
  P.renderProfile = renderProfile;
  P.bindProfileEvents = bindProfileEvents;
  P.renderProfileFoodEdit = renderProfileFoodEdit;
  P.bindProfileFoodEditEvents = bindProfileFoodEditEvents;

})();
