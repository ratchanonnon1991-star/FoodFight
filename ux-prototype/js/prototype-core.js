/**
 * FoodFighter UX Prototype — Core Infrastructure & Shared Utilities
 * 
 * Provides:
 *   - State Store (load, save, reset)
 *   - Global UI Overlays (Toasts, Modals, Clipboard helper)
 *   - Hash Router helpers
 *   - Developer Prototype Navigator & Simulation Controls
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;

  /* ==========================================================================
     1. Prototype State Store
     ========================================================================== */
  let state = loadState();

  function loadState() {
    try {
      const stored = localStorage.getItem(P.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...P.INITIAL_STATE,
          ...parsed,
          auth: { ...P.INITIAL_STATE.auth, ...(parsed.auth || {}) },
          foodProfile: { ...P.INITIAL_STATE.foodProfile, ...(parsed.foodProfile || {}) },
          room: { ...P.INITIAL_STATE.room, ...(parsed.room || {}) },
          mealPreferences: { ...P.INITIAL_STATE.mealPreferences, ...(parsed.mealPreferences || {}) },
          recommendation: {
            ...P.INITIAL_STATE.recommendation,
            ...(parsed.recommendation || {}),
            roundVotes: {
              1: { ...P.INITIAL_STATE.recommendation.roundVotes[1], ...(parsed.recommendation?.roundVotes?.[1] || {}) },
              2: { ...P.INITIAL_STATE.recommendation.roundVotes[2], ...(parsed.recommendation?.roundVotes?.[2] || {}) }
            },
            finalVotes: {
              ...P.INITIAL_STATE.recommendation.finalVotes,
              ...(parsed.recommendation?.finalVotes || {})
            }
          },
          restaurant: {
            ...P.INITIAL_STATE.restaurant,
            ...(parsed.restaurant || {})
          },
          bill: {
            ...P.INITIAL_STATE.bill,
            ...(parsed.bill || {}),
            receiptItems: parsed.bill?.receiptItems || JSON.parse(JSON.stringify(P.DEFAULT_RECEIPT_ITEMS)),
            assignments: { ...P.INITIAL_STATE.bill.assignments, ...(parsed.bill?.assignments || {}) },
            paymentStatuses: { ...P.INITIAL_STATE.bill.paymentStatuses, ...(parsed.bill?.paymentStatuses || {}) }
          }
        };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, using in-memory state.', e);
    }
    return JSON.parse(JSON.stringify(P.INITIAL_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(P.STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist prototype state to localStorage.', e);
    }
  }

  function resetState() {
    state = JSON.parse(JSON.stringify(P.INITIAL_STATE));
    saveState();
    showToast('Prototype state reset to fresh defaults.', 'info');
    navigateTo('#/login');
  }

  function resetRecommendationState() {
    state.recommendation = JSON.parse(JSON.stringify(P.INITIAL_STATE.recommendation));
    saveState();
    showToast('Recommendation & voting state reset to Round 1.', 'info');
    navigateTo('#/recommendations');
  }

  function resetRestaurantState() {
    state.restaurant = JSON.parse(JSON.stringify(P.INITIAL_STATE.restaurant));
    saveState();
    showToast('Restaurant discovery state reset to default.', 'info');
    navigateTo('#/restaurants');
  }

  function resetBillState() {
    state.bill = JSON.parse(JSON.stringify(P.INITIAL_STATE.bill));
    saveState();
    showToast('Split Bill & payment flow reset to defaults.', 'info');
    navigateTo('#/bill');
  }

  function getState() {
    return state;
  }

  /* ==========================================================================
     2. Global UI Utilities: Toasts, Modals, Clipboard
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3000) {
    const toastRoot = document.getElementById('toast-root');
    if (!toastRoot) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
    toast.setAttribute('role', 'status');

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A6DEB4" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F6B8B8" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A7D3F3" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.5rem;">
        ${iconSvg}
        <span>${escapeHtml(message)}</span>
      </div>
      <button style="color:rgba(255,255,255,0.7);padding:2px;" aria-label="Dismiss">&times;</button>
    `;

    toast.querySelector('button').onclick = () => toast.remove();
    toastRoot.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 200ms ease';
        setTimeout(() => toast.remove(), 200);
      }
    }, duration);
  }

  function copyTextToClipboard(text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard!`, 'success');
      }).catch(() => {
        showToast(`${label} copied: ${text}`, 'success');
      });
    } else {
      showToast(`${label} copied: ${text}`, 'success');
    }
  }

  function openModal(htmlContent) {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div id="active-modal-overlay" class="modal-overlay open" role="dialog" aria-modal="true">
        <div class="modal-box">
          ${htmlContent}
        </div>
      </div>
    `;

    const overlay = document.getElementById('active-modal-overlay');
    overlay.onclick = (e) => {
      if (e.target === overlay) closeModal();
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        window.removeEventListener('keydown', handleEsc);
      }
    };
    window.addEventListener('keydown', handleEsc);
  }

  function closeModal() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  function showLeaveRoomModal() {
    const isHost = state.room.role === 'host';
    openModal(`
      <div style="text-align:center;padding:0.5rem 0;">
        <div class="brand-badge-logo" style="margin:0 auto 1rem auto;background:#FDF0F0;color:#8E1F1F;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </div>
        <h3 class="font-heading-2">${isHost ? 'Leave & Close Room?' : 'Leave this Room?'}</h3>
        <p class="font-body-small text-secondary" style="margin:0.5rem 0 1.25rem 0;line-height:1.45;">
          ${isHost 
            ? 'As the host, leaving will close this food fight session for all members.' 
            : 'You will leave the lobby and return to the Home dashboard.'}
        </p>
        <div style="display:flex;flex-direction:column;gap:0.65rem;">
          <button type="button" id="btn-confirm-leave" class="btn btn-danger btn-lg">
            Confirm & Leave
          </button>
          <button type="button" id="btn-cancel-leave" class="btn btn-secondary">
            Stay in Room
          </button>
        </div>
      </div>
    `);

    document.getElementById('btn-confirm-leave').onclick = () => {
      closeModal();
      state.room.foodFightStarted = false;
      saveState();
      showToast('You left the room.', 'info');
      navigateTo('#/home');
    };

    document.getElementById('btn-cancel-leave').onclick = () => {
      closeModal();
    };
  }

  function showInviteModal() {
    const code = state.room.roomCode || 'FF-4827';
    const link = state.room.inviteLink || `https://foodfight.app/join/${code}`;

    openModal(`
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <h3 class="font-heading-2">Invite Friends</h3>
          <button type="button" id="btn-close-invite" class="top-bar-action" aria-label="Close">✕</button>
        </div>

        <p class="font-body-small text-secondary" style="margin-bottom:1rem;">
          Share your Room Code or QR so friends can jump straight into this FoodFight.
        </p>

        <!-- Room Code Display Box -->
        <div class="card" style="text-align:center;background:var(--color-surface-subtle);padding:1rem;margin-bottom:1rem;">
          <div class="font-label text-muted" style="margin-bottom:0.25rem;">Room Code</div>
          <div style="font-family:monospace;font-size:1.6rem;font-weight:700;letter-spacing:0.1em;color:var(--color-brand-primary);">
            ${escapeHtml(code)}
          </div>
          <button type="button" id="btn-copy-code-modal" class="btn btn-outline btn-sm" style="margin-top:0.6rem;background:#fff;border-radius:var(--radius-full);">
            📋 Copy Code
          </button>
        </div>

        <!-- Simulated QR View -->
        <div class="qr-mock-container">
          <div class="qr-matrix-box" aria-label="Simulated QR Code">
            <div class="qr-corner-marker"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-corner-marker"></div>
            
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot" style="background:var(--color-brand-secondary);"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            
            <div class="qr-corner-marker"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-dot"></div>
            <div class="qr-dot-muted"></div>
            <div class="qr-corner-marker"></div>
          </div>
          <span class="font-caption text-muted" style="margin-top:0.5rem;font-weight:500;">Point FoodFighter camera to scan</span>
        </div>

        <!-- Shareable Link Box -->
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label">Invite Link</label>
          <div style="display:flex;gap:0.5rem;">
            <input type="text" readonly value="${escapeHtml(link)}" class="form-input" style="font-size:0.8rem;background:var(--color-surface-subtle);" />
            <button type="button" id="btn-copy-link-modal" class="btn btn-secondary" style="width:auto;white-space:nowrap;padding:0 0.85rem;">
              Copy
            </button>
          </div>
        </div>

        <button type="button" id="btn-done-invite" class="btn btn-primary">Done</button>
      </div>
    `);

    document.getElementById('btn-close-invite').onclick = () => closeModal();
    document.getElementById('btn-done-invite').onclick = () => closeModal();
    document.getElementById('btn-copy-code-modal').onclick = () => copyTextToClipboard(code, 'Room Code');
    document.getElementById('btn-copy-link-modal').onclick = () => copyTextToClipboard(link, 'Invite Link');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
  }

  /* ==========================================================================
     3. Navigation & Hash Helpers
     ========================================================================== */
  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function getCurrentRoute() {
    return window.location.hash || '#/login';
  }

  function findScreen(hash) {
    return P.SCREEN_REGISTRY.find(s => s.hash === hash) || null;
  }

  /* ==========================================================================
     4. Developer Prototype Navigator & Simulation Drawer
     ========================================================================== */
  function initPrototypeNavigator() {
    const toggleBtn = document.getElementById('proto-nav-toggle-btn');
    const closeBtn = document.getElementById('proto-nav-close-btn');
    const backdrop = document.getElementById('proto-nav-backdrop');
    const drawer = document.getElementById('proto-nav-drawer');
    const resetBtn = document.getElementById('proto-reset-btn');
    const navList = document.getElementById('proto-nav-list');

    if (!toggleBtn || !drawer || !backdrop || !navList) return;

    renderNavigatorContent(navList);

    toggleBtn.onclick = () => openPrototypeNavigator();
    closeBtn.onclick = () => closePrototypeNavigator();
    backdrop.onclick = () => closePrototypeNavigator();

    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm('Reset prototype state to fresh demo defaults?')) {
          resetState();
          closePrototypeNavigator();
        }
      };
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closePrototypeNavigator();
      }
    });
  }

  function renderNavigatorContent(container) {
    const categories = {};
    P.SCREEN_REGISTRY.forEach(screen => {
      if (!categories[screen.category]) categories[screen.category] = [];
      categories[screen.category].push(screen);
    });

    const activeMenuId = state.recommendation?.finalWinnerMenuId || 'menu-a';

    let html = `
      <!-- Developer Simulation & Test Controls Box -->
      <div class="proto-sim-box">
        <div class="font-label" style="color:var(--color-brand-primary);display:flex;align-items:center;gap:0.35rem;">
          <span>🎮 Simulation & Testing Controls</span>
        </div>

        <div style="font-size:0.75rem;color:var(--color-text-secondary);line-height:1.35;">
          Complete interactive prototype with all 38 product screens live.
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-top:0.25rem;">
          <button type="button" id="sim-toggle-role" class="proto-sim-btn">
            <span>Role: <strong>${state.room.role === 'host' ? 'Host' : 'Member'}</strong></span>
            <span>⇄</span>
          </button>
          <button type="button" id="sim-toggle-view" class="proto-sim-btn">
            <span>View: <strong>${(state.restaurant?.discoveryView || 'list').toUpperCase()}</strong></span>
            <span>⇄</span>
          </button>
        </div>

        <div style="font-size:0.7rem;font-weight:700;color:var(--color-brand-primary);margin-top:0.4rem;text-transform:uppercase;">
          V5 Split Bill & Payments Controls
        </div>

        <div style="display:flex;flex-direction:column;gap:0.35rem;">
          <button type="button" id="sim-assign-everyone" class="proto-sim-btn" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
            <span>👥 Assign All Items to Everyone</span>
          </button>
          <button type="button" id="sim-mark-all-paid" class="proto-sim-btn" style="background:#EFF6FC;color:#185582;border-color:#A7D3F3;">
            <span>💳 Mark All Members as Paid</span>
          </button>
          <button type="button" id="sim-reset-bill" class="proto-sim-btn" style="color:#D32F2F;">
            <span>↺ Reset Split Bill State</span>
          </button>
        </div>

        <div style="font-size:0.7rem;font-weight:700;color:var(--color-brand-primary);margin-top:0.4rem;text-transform:uppercase;">
          V4 Restaurant Discovery & Menu Context
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.35rem;">
          <button type="button" id="sim-set-menu-a" class="proto-sim-btn ${activeMenuId === 'menu-a' ? 'active' : ''}">
            <span>🥩 Wagyu Krapow (A)</span>
          </button>
          <button type="button" id="sim-set-menu-b" class="proto-sim-btn ${activeMenuId === 'menu-b' ? 'active' : ''}">
            <span>🍜 Ramen (B)</span>
          </button>
          <button type="button" id="sim-set-menu-c" class="proto-sim-btn ${activeMenuId === 'menu-c' ? 'active' : ''}">
            <span>🍲 Shabu-Shabu (C)</span>
          </button>
          <button type="button" id="sim-set-menu-d" class="proto-sim-btn ${activeMenuId === 'menu-d' ? 'active' : ''}">
            <span>🦐 Tom Yum (D)</span>
          </button>
        </div>

        <div style="font-size:0.7rem;font-weight:700;color:var(--color-brand-primary);margin-top:0.4rem;text-transform:uppercase;">
          V3 Voting Scenarios
        </div>

        <div style="display:flex;flex-direction:column;gap:0.35rem;">
          <button type="button" id="sim-vote-all-ok" class="proto-sim-btn" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
            <span>✨ Set All Active OK (Win Round 1)</span>
          </button>
          <button type="button" id="sim-vote-split-no-win" class="proto-sim-btn" style="background:#FFF8E6;color:#784C00;border-color:#F6D68A;">
            <span>⚡ Set No Winner (Recommend Again)</span>
          </button>
          <button type="button" id="sim-vote-final-tie" class="proto-sim-btn" style="background:#EFF6FC;color:#185582;border-color:#A7D3F3;">
            <span>⚖️ Final Vote: Create 2-2 Tie (Host Tie Break)</span>
          </button>
        </div>
      </div>
      <hr style="border:none;border-top:1px solid var(--color-border);" />
    `;

    for (const [catName, screens] of Object.entries(categories)) {
      html += `
        <div class="proto-nav-group">
          <div class="proto-nav-group-title">${escapeHtml(catName)}</div>
          <div style="display:flex;flex-direction:column;">
            ${screens.map(s => `
              <a href="${s.hash}" class="proto-nav-item" data-hash="${s.hash}">
                <span>${escapeHtml(s.title)}</span>
                <span class="proto-nav-tag proto-nav-tag-impl">
                  Implemented
                </span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    bindSimulationControls();
  }

  function bindSimulationControls() {
    const roleBtn = document.getElementById('sim-toggle-role');
    const viewBtn = document.getElementById('sim-toggle-view');
    const setMenuABtn = document.getElementById('sim-set-menu-a');
    const setMenuBBtn = document.getElementById('sim-set-menu-b');
    const setMenuCBtn = document.getElementById('sim-set-menu-c');
    const setMenuDBtn = document.getElementById('sim-set-menu-d');
    const assignEveryoneBtn = document.getElementById('sim-assign-everyone');
    const markAllPaidBtn = document.getElementById('sim-mark-all-paid');
    const resetBillBtn = document.getElementById('sim-reset-bill');
    const voteAllOkBtn = document.getElementById('sim-vote-all-ok');
    const voteSplitBtn = document.getElementById('sim-vote-split-no-win');
    const voteFinalTieBtn = document.getElementById('sim-vote-final-tie');

    if (roleBtn) {
      roleBtn.onclick = () => {
        state.room.role = state.room.role === 'host' ? 'member' : 'host';
        saveState();
        showToast(`Switched view to: ${state.room.role.toUpperCase()}`, 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (viewBtn) {
      viewBtn.onclick = () => {
        state.restaurant.discoveryView = state.restaurant.discoveryView === 'list' ? 'map' : 'list';
        saveState();
        showToast(`Discovery view: ${state.restaurant.discoveryView.toUpperCase()}`, 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    const setFinalMenu = (menuId, menuName) => {
      state.recommendation.finalWinnerMenuId = menuId;
      const restList = P.RESTAURANT_CATALOGUE[menuId] || [];
      if (restList.length > 0) {
        state.restaurant.selectedRestaurantId = restList[0].id;
        state.restaurant.activePinId = restList[0].id;
      }
      saveState();
      showToast(`Final Menu context set to: ${menuName}`, 'success');
      renderNavigatorContent(document.getElementById('proto-nav-list'));
      if (P.renderCurrentRoute) P.renderCurrentRoute();
    };

    if (setMenuABtn) setMenuABtn.onclick = () => setFinalMenu('menu-a', 'Krapow Wagyu Beef');
    if (setMenuBBtn) setMenuBBtn.onclick = () => setFinalMenu('menu-b', 'Tonkotsu Ramen');
    if (setMenuCBtn) setMenuCBtn.onclick = () => setFinalMenu('menu-c', 'Kurobuta Shabu');
    if (setMenuDBtn) setMenuDBtn.onclick = () => setFinalMenu('menu-d', 'Seafood Tom Yum');

    if (assignEveryoneBtn) {
      assignEveryoneBtn.onclick = () => {
        const activeIds = (state.room.members || []).filter(m => m.isActive).map(m => m.id);
        const items = state.bill.receiptItems || [];
        items.forEach(item => {
          state.bill.assignments[item.id] = [...activeIds];
        });
        saveState();
        showToast('All receipt items assigned equally to everyone!', 'success');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (markAllPaidBtn) {
      markAllPaidBtn.onclick = () => {
        (state.room.members || []).forEach(m => {
          state.bill.paymentStatuses[m.id] = 'paid';
        });
        saveState();
        showToast('All members marked as Paid ✓', 'success');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (resetBillBtn) {
      resetBillBtn.onclick = () => {
        resetBillState();
        closePrototypeNavigator();
      };
    }

    if (voteAllOkBtn) {
      voteAllOkBtn.onclick = () => {
        const round = state.recommendation.round || 1;
        const menuKey = round === 1 ? 'menu-a' : 'menu-c';
        const otherKey = round === 1 ? 'menu-b' : 'menu-d';
        
        state.room.members.forEach(m => {
          if (m.isActive) {
            state.recommendation.roundVotes[round][m.id] = {
              [menuKey]: 'OK',
              [otherKey]: 'PASS'
            };
          }
        });
        saveState();
        showToast(`All active members voted OK on ${menuKey.toUpperCase()}!`, 'success');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (voteSplitBtn) {
      voteSplitBtn.onclick = () => {
        const round = state.recommendation.round || 1;
        const menu1 = round === 1 ? 'menu-a' : 'menu-c';
        const menu2 = round === 1 ? 'menu-b' : 'menu-d';
        
        state.recommendation.roundVotes[round]['user'] = { [menu1]: 'PASS', [menu2]: 'PASS' };
        state.recommendation.roundVotes[round]['maya'] = { [menu1]: 'OK', [menu2]: 'PASS' };
        state.recommendation.roundVotes[round]['nina'] = { [menu1]: 'PASS', [menu2]: 'PASS' };
        if (state.recommendation.roundVotes[round]['ken']) {
          state.recommendation.roundVotes[round]['ken'] = { [menu1]: 'PASS', [menu2]: 'PASS' };
        }
        saveState();
        showToast('Set votes below threshold (25% OK). No winner scenario ready!', 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }

    if (voteFinalTieBtn) {
      voteFinalTieBtn.onclick = () => {
        state.recommendation.finalVotes = {
          user: 'menu-a',
          maya: 'menu-a',
          nina: 'menu-c',
          ken: 'menu-c'
        };
        state.recommendation.tieBreakWinnerId = null;
        saveState();
        showToast('Final Vote set to 2-2 Tie between Menu A & Menu C!', 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (P.renderCurrentRoute) P.renderCurrentRoute();
      };
    }
  }

  function openPrototypeNavigator() {
    const backdrop = document.getElementById('proto-nav-backdrop');
    const drawer = document.getElementById('proto-nav-drawer');
    const toggleBtn = document.getElementById('proto-nav-toggle-btn');
    if (backdrop && drawer) {
      renderNavigatorContent(document.getElementById('proto-nav-list'));
      updateNavigatorActive(getCurrentRoute());
      backdrop.classList.add('open');
      drawer.classList.add('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    }
  }

  function closePrototypeNavigator() {
    const backdrop = document.getElementById('proto-nav-backdrop');
    const drawer = document.getElementById('proto-nav-drawer');
    const toggleBtn = document.getElementById('proto-nav-toggle-btn');
    if (backdrop && drawer) {
      backdrop.classList.remove('open');
      drawer.classList.remove('open');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function updateNavigatorActive(currentHash) {
    const items = document.querySelectorAll('.proto-nav-item');
    items.forEach(item => {
      const hash = item.getAttribute('data-hash');
      item.classList.toggle('active', hash === currentHash);
    });
  }

  // Expose to Prototype Namespace
  P.state = state;
  P.getState = getState;
  P.saveState = saveState;
  P.resetState = resetState;
  P.resetRecommendationState = resetRecommendationState;
  P.resetRestaurantState = resetRestaurantState;
  P.resetBillState = resetBillState;
  P.showToast = showToast;
  P.copyTextToClipboard = copyTextToClipboard;
  P.openModal = openModal;
  P.closeModal = closeModal;
  P.showLeaveRoomModal = showLeaveRoomModal;
  P.showInviteModal = showInviteModal;
  P.escapeHtml = escapeHtml;
  P.navigateTo = navigateTo;
  P.getCurrentRoute = getCurrentRoute;
  P.findScreen = findScreen;
  P.initPrototypeNavigator = initPrototypeNavigator;
  P.openPrototypeNavigator = openPrototypeNavigator;
  P.closePrototypeNavigator = closePrototypeNavigator;
  P.renderNavigatorContent = renderNavigatorContent;
  P.updateNavigatorActive = updateNavigatorActive;

})();
