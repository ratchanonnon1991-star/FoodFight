/**
 * FoodFighter UX Prototype V2 — Core Interactive Application
 * 
 * Zero-framework, zero-build vanilla JavaScript architecture.
 * Features:
 *   - Hash-based SPA Router with full browser Back/Forward history support
 *   - Centralized Screen Registry with 38 screens across 9 categories
 *   - High-fidelity interactive V1 (Auth, Food Profile, Home)
 *   - High-fidelity interactive V2 (Room Creation, Join Hub, Code/QR/Invite, Lobbies, Threshold Rule, Meal Preferences, Waiting, AI Generating)
 *   - Persistent Prototype State Store (localStorage) with demo reset & simulation tools
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Prototype Screen Registry & Metadata
     ========================================================================== */
  const SCREEN_REGISTRY = [
    // AUTH FLOW (Implemented V1)
    {
      id: 'login',
      hash: '#/login',
      title: 'Log In',
      category: 'Auth',
      status: 'IMPLEMENTED',
      description: 'User credential sign-in, demo validation, password toggle, social auth entry, and navigation.'
    },
    {
      id: 'register',
      hash: '#/register',
      title: 'Register',
      category: 'Auth',
      status: 'IMPLEMENTED',
      description: 'Account registration with name, email, password strength checks, terms consent, and social signup.'
    },
    {
      id: 'verify-email',
      hash: '#/verify-email',
      title: 'Verify Email / OTP',
      category: 'Auth',
      status: 'IMPLEMENTED',
      description: '6-digit segmented OTP verification with auto-focus, paste support, resend timer, and masked email.'
    },
    {
      id: 'forgot-password',
      hash: '#/forgot-password',
      title: 'Forgot Password',
      category: 'Auth',
      status: 'IMPLEMENTED',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Exploratory password reset request flow and email confirmation state.'
    },

    // FOOD PROFILE ONBOARDING (Implemented V1)
    {
      id: 'food-profile-allergies',
      hash: '#/food-profile/allergies',
      title: 'Food Profile — Allergies',
      category: 'Food Profile',
      status: 'IMPLEMENTED',
      step: '1 / 3',
      description: 'Multi-select allergy filter chips to establish group safety baseline.'
    },
    {
      id: 'food-profile-restrictions',
      hash: '#/food-profile/restrictions',
      title: 'Food Profile — Restrictions',
      category: 'Food Profile',
      status: 'IMPLEMENTED',
      step: '2 / 3',
      description: 'Dietary, religious, and lifestyle eating preferences (Halal, Vegan, No Pork, etc.).'
    },
    {
      id: 'food-profile-details',
      hash: '#/food-profile/details',
      title: 'Food Profile — Additional Details',
      category: 'Food Profile',
      status: 'IMPLEMENTED',
      step: '3 / 3',
      description: 'Freeform notes and quick suggestion pills for personal flavor and dietary nuances.'
    },

    // HOME SCREEN (Implemented V1)
    {
      id: 'home',
      hash: '#/home',
      title: 'Home Dashboard',
      category: 'Home',
      status: 'IMPLEMENTED',
      description: 'Primary landing hub featuring active food profile summary, Create Room CTA, and Join Room CTA.'
    },

    // ROOM FLOW (Implemented in V2)
    {
      id: 'room-create',
      hash: '#/room/create',
      title: 'Create Room',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Host sets room name, location, search radius, and member limits.'
    },
    {
      id: 'room-lobby-host',
      hash: '#/room/lobby-host',
      title: 'Room Lobby — Host',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Host view of real-time member join events, readiness thresholds, and Start FoodFight authority.'
    },
    {
      id: 'room-join',
      hash: '#/room/join',
      title: 'Join Room Hub',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Member entry point with Room Code input, QR camera scanner, and Invite Link options.'
    },
    {
      id: 'room-scan-qr',
      hash: '#/room/scan-qr',
      title: 'Scan QR Code',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Simulated camera viewfinder with animated laser reticle and sample QR scan simulation.'
    },
    {
      id: 'room-code',
      hash: '#/room/code',
      title: 'Enter Room Code',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Alphanumeric room code submission with valid demo (FF-4827) and invalid feedback.'
    },
    {
      id: 'room-invite',
      hash: '#/room/invite',
      title: 'Invite Link & QR Modal',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Shareable room invite link, QR code display, and safe copy-to-clipboard actions.'
    },
    {
      id: 'room-preview',
      hash: '#/room/preview',
      title: 'Room Preview',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Pre-join confirmation screen showing room name, host avatar, and active member count.'
    },
    {
      id: 'room-lobby-member',
      hash: '#/room/lobby-member',
      title: 'Room Lobby — Member',
      category: 'Room',
      status: 'IMPLEMENTED',
      description: 'Member view featuring Ready status toggle, host waiting notice, and invite drawer.'
    },

    // FOODFIGHT SESSION (Implemented in V2)
    {
      id: 'foodfight-preferences',
      hash: '#/foodfight/preferences',
      title: 'Meal Preferences',
      category: 'FoodFight',
      status: 'IMPLEMENTED',
      description: '6-category preference form: Food Type, Cuisine, Ingredients, Price, Restaurant Style, and notes.'
    },
    {
      id: 'foodfight-waiting',
      hash: '#/foodfight/waiting',
      title: 'Waiting for Members',
      category: 'FoodFight',
      status: 'IMPLEMENTED',
      description: 'Live progress tracker showing Active Members submission status and observer overview.'
    },
    {
      id: 'foodfight-generating',
      hash: '#/foodfight/generating',
      title: 'Generating Recommendations',
      category: 'FoodFight',
      status: 'IMPLEMENTED',
      description: 'AI synthesis screen with animated radar pulse, constraint summary, and transition to V3 boundary.'
    },

    // MENU RECOMMENDATIONS & VOTING (Future V3)
    {
      id: 'recommendations',
      hash: '#/recommendations',
      title: 'Recommended Menus',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Top 2 AI-recommended dishes with reasoning, ingredients, and allergen safety callouts (V3).'
    },
    {
      id: 'recommendations-vote',
      hash: '#/recommendations/vote',
      title: 'OK / PASS Voting',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Interactive OK / PASS voting interface for Active Members.'
    },
    {
      id: 'vote-result',
      hash: '#/vote-result',
      title: 'Voting Result',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Vote outcome tally showing consensus or trigger for Round 2.'
    },
    {
      id: 'recommendations-round-2',
      hash: '#/recommendations/round-2',
      title: 'Round 2 / Recommend Again',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'AI generates 2 brand-new alternative dishes when round 1 lacks consensus.'
    },
    {
      id: 'final-vote',
      hash: '#/final-vote',
      title: 'Final Vote (4 Dishes)',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Tie-break round presenting all 4 candidate dishes for single-choice selection.'
    },
    {
      id: 'final-menu',
      hash: '#/final-menu',
      title: 'Final Menu Winner',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Celebratory winning dish announcement and transition to restaurant discovery.'
    },

    // RESTAURANTS & MAP (Future)
    {
      id: 'restaurants',
      hash: '#/restaurants',
      title: 'Recommended Restaurants',
      category: 'Restaurant',
      status: 'FUTURE',
      description: 'Nearby restaurants serving the winning menu, filtered by distance and rating.'
    },
    {
      id: 'restaurants-detail',
      hash: '#/restaurants/detail',
      title: 'Restaurant Detail & Map',
      category: 'Restaurant',
      status: 'FUTURE',
      description: 'Interactive OpenStreetMap location, distance, opening hours, and contact details.'
    },
    {
      id: 'restaurants-selected',
      hash: '#/restaurants/selected',
      title: 'Restaurant Selected',
      category: 'Restaurant',
      status: 'FUTURE',
      description: 'Destination confirmation and navigation launch screen.'
    },

    // SPLIT BILL & RECEIPT OCR (Future - Exploratory)
    {
      id: 'bill',
      hash: '#/bill',
      title: 'Split Bill Overview',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Bill splitting workflow initiation and option selector (Equal vs Itemized).'
    },
    {
      id: 'bill-receipt',
      hash: '#/bill/receipt',
      title: 'Upload / Scan Receipt',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Receipt photo capture and OCR parsing mock.'
    },
    {
      id: 'bill-items',
      hash: '#/bill/items',
      title: 'Review Receipt Items',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Itemized dish list with quantities, prices, and tax/service calculations.'
    },
    {
      id: 'bill-assign',
      hash: '#/bill/assign',
      title: 'Select Who Ate What',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Interactive member dish assignment matrix.'
    },
    {
      id: 'bill-summary',
      hash: '#/bill/summary',
      title: 'Bill Summary & Breakdown',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Individual payout breakdown with PromptPay QR code integration.'
    },
    {
      id: 'bill-payment',
      hash: '#/bill/payment',
      title: 'Payment Status',
      category: 'Bill',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Real-time group payment completion tracker.'
    },

    // PROFILE & HISTORY (Future)
    {
      id: 'history',
      hash: '#/history',
      title: 'FoodFight History',
      category: 'Other',
      status: 'FUTURE',
      description: 'Past food battle sessions, winning dishes, and restaurants visited.'
    },
    {
      id: 'bill-history',
      hash: '#/bill-history',
      title: 'Bill History',
      category: 'Other',
      status: 'FUTURE',
      scope: 'PROTOTYPE_EXPLORATION',
      description: 'Past receipts and payment settlement records.'
    },
    {
      id: 'profile',
      hash: '#/profile',
      title: 'User Profile',
      category: 'Other',
      status: 'FUTURE',
      description: 'Account settings, notification preferences, and linked accounts.'
    },
    {
      id: 'profile-food',
      hash: '#/profile/food',
      title: 'Edit Food Profile',
      category: 'Other',
      status: 'FUTURE',
      description: 'Modify allergies, dietary restrictions, and personal food notes.'
    }
  ];

  /* ==========================================================================
     2. Prototype State Store
     ========================================================================== */
  const STORAGE_KEY = 'foodfighter-prototype-v1';

  const INITIAL_STATE = {
    auth: {
      isAuthenticated: false,
      user: {
        name: 'Alex Johnson',
        email: 'user@example.com',
        avatarText: 'AJ'
      },
      pendingVerificationEmail: 'user@example.com',
      resetEmailSentTo: null
    },
    foodProfile: {
      completed: false,
      allergies: [],
      restrictions: [],
      details: '',
      quickTags: []
    },
    room: {
      role: 'host', // 'host' | 'member'
      roomName: 'Dinner Food Fight',
      roomCode: 'FF-4827',
      inviteLink: 'https://foodfight.app/join/FF-4827',
      location: 'Current Location (Sukhumvit)',
      radius: '5 km',
      maxMembers: 6,
      members: [
        { id: 'user', name: 'Alex Johnson (You)', initials: 'AJ', role: 'Host', isReady: true, isActive: true, hasSubmitted: false, colorClass: 'avatar-petal' },
        { id: 'maya', name: 'Maya Lin', initials: 'ML', role: 'Member', isReady: true, isActive: true, hasSubmitted: false, colorClass: 'avatar-apricot' },
        { id: 'nina', name: 'Nina Patel', initials: 'NP', role: 'Member', isReady: true, isActive: true, hasSubmitted: false, colorClass: 'avatar-custard' },
        { id: 'ken', name: 'Ken Tanaka', initials: 'KT', role: 'Member', isReady: false, isActive: false, hasSubmitted: false, colorClass: 'avatar-mauve' }
      ],
      simulatedTwoMinutesElapsed: false,
      foodFightStarted: false,
      roomJoined: true
    },
    mealPreferences: {
      foodTypes: ['Noodles / ก๋วยเตี๋ยว', 'Hot Pot / ชาบู-สุกี้'],
      cuisines: ['Thai / อาหารไทย', 'Japanese / ญี่ปุ่น'],
      ingredients: ['Chicken / ไก่', 'Seafood & Shrimp / กุ้ง-ซีฟู้ด'],
      priceLevel: '฿฿',
      restaurantStyles: ['Casual Dining / ร้านนั่งสบาย', 'Air-Conditioned / ห้องแอร์'],
      otherNotes: 'Prefer places with air conditioning and easy parking'
    }
  };

  let state = loadState();

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial state defaults in case of new V2 fields
        return {
          ...INITIAL_STATE,
          ...parsed,
          auth: { ...INITIAL_STATE.auth, ...(parsed.auth || {}) },
          foodProfile: { ...INITIAL_STATE.foodProfile, ...(parsed.foodProfile || {}) },
          room: { ...INITIAL_STATE.room, ...(parsed.room || {}) },
          mealPreferences: { ...INITIAL_STATE.mealPreferences, ...(parsed.mealPreferences || {}) }
        };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable, using in-memory state.', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist prototype state to localStorage.', e);
    }
  }

  function resetPrototypeState() {
    state = JSON.parse(JSON.stringify(INITIAL_STATE));
    saveState();
    showToast('Prototype state reset to fresh defaults.', 'info');
    navigateTo('#/login');
  }

  /* ==========================================================================
     3. Global UI Utilities: Toasts, Modals, Clipboard
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
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A7D3F3" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
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
     4. Navigation & Hash Router
     ========================================================================== */
  function navigateTo(hash) {
    window.location.hash = hash;
  }

  function getCurrentRoute() {
    return window.location.hash || '#/login';
  }

  function findScreen(hash) {
    return SCREEN_REGISTRY.find(s => s.hash === hash) || null;
  }

  window.addEventListener('hashchange', renderCurrentRoute);

  function renderCurrentRoute() {
    const hash = getCurrentRoute();
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    window.scrollTo(0, 0);
    const screen = findScreen(hash);

    if (!screen) {
      appRoot.innerHTML = renderNotFoundShell(hash);
      updateNavigatorActive(hash);
      return;
    }

    switch (screen.id) {
      // V1 Screens
      case 'login':
        appRoot.innerHTML = renderLogin();
        bindLoginEvents();
        break;
      case 'register':
        appRoot.innerHTML = renderRegister();
        bindRegisterEvents();
        break;
      case 'verify-email':
        appRoot.innerHTML = renderVerifyEmail();
        bindVerifyEmailEvents();
        break;
      case 'forgot-password':
        appRoot.innerHTML = renderForgotPassword();
        bindForgotPasswordEvents();
        break;
      case 'food-profile-allergies':
        appRoot.innerHTML = renderFoodProfileAllergies();
        bindFoodProfileAllergiesEvents();
        break;
      case 'food-profile-restrictions':
        appRoot.innerHTML = renderFoodProfileRestrictions();
        bindFoodProfileRestrictionsEvents();
        break;
      case 'food-profile-details':
        appRoot.innerHTML = renderFoodProfileDetails();
        bindFoodProfileDetailsEvents();
        break;
      case 'home':
        appRoot.innerHTML = renderHome();
        bindHomeEvents();
        break;

      // V2 Room Screens
      case 'room-create':
        appRoot.innerHTML = renderRoomCreate();
        bindRoomCreateEvents();
        break;
      case 'room-lobby-host':
        appRoot.innerHTML = renderRoomLobbyHost();
        bindRoomLobbyHostEvents();
        break;
      case 'room-join':
        appRoot.innerHTML = renderRoomJoinHub();
        bindRoomJoinHubEvents();
        break;
      case 'room-scan-qr':
        appRoot.innerHTML = renderRoomScanQR();
        bindRoomScanQREvents();
        break;
      case 'room-code':
        appRoot.innerHTML = renderRoomCode();
        bindRoomCodeEvents();
        break;
      case 'room-invite':
        appRoot.innerHTML = renderRoomInviteScreen();
        bindRoomInviteScreenEvents();
        break;
      case 'room-preview':
        appRoot.innerHTML = renderRoomPreview();
        bindRoomPreviewEvents();
        break;
      case 'room-lobby-member':
        appRoot.innerHTML = renderRoomLobbyMember();
        bindRoomLobbyMemberEvents();
        break;

      // V2 FoodFight Screens
      case 'foodfight-preferences':
        appRoot.innerHTML = renderMealPreferences();
        bindMealPreferencesEvents();
        break;
      case 'foodfight-waiting':
        appRoot.innerHTML = renderFoodFightWaiting();
        bindFoodFightWaitingEvents();
        break;
      case 'foodfight-generating':
        appRoot.innerHTML = renderFoodFightGenerating();
        bindFoodFightGeneratingEvents();
        break;

      // V3 Boundary Shell
      case 'recommendations':
        appRoot.innerHTML = renderRecommendationsBoundaryShell();
        bindRecommendationsBoundaryEvents();
        break;

      default:
        appRoot.innerHTML = renderFutureShell(screen);
        bindFutureShellEvents();
        break;
    }

    updateNavigatorActive(hash);
  }

  /* ==========================================================================
     5. Implemented Screens (V1 Foundation)
     ========================================================================== */

  /** Screen: Login */
  function renderLogin() {
    return `
      <main class="app-shell" aria-labelledby="login-title">
        <div class="page-shell">
          <header class="brand-hero">
            <div class="brand-badge-logo" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h1 class="brand-title">FoodFighter</h1>
            <p class="brand-tagline">Group Food Decisions Made Easy</p>
          </header>

          <section class="screen-header">
            <h2 id="login-title" class="font-heading-1">Welcome back</h2>
            <p class="screen-subtitle">Sign in to join a food fight or create a new room</p>
          </section>

          <div id="login-alert-area"></div>

          <form id="login-form" novalidate>
            <div class="form-group">
              <label for="login-email" class="form-label form-label-required">Email Address</label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="login-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="user@example.com" 
                  value="${escapeHtml(state.auth.user.email)}"
                  autocomplete="email" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <div class="form-label">
                <label for="login-password" class="form-label-required" style="margin-bottom:0;">Password</label>
                <a href="#/forgot-password" class="text-secondary" style="font-size:0.775rem;font-weight:600;">Forgot password?</a>
              </div>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="login-password" 
                  name="password" 
                  class="form-input form-input-password" 
                  placeholder="Enter your password" 
                  value="Password123"
                  autocomplete="current-password" 
                  required 
                />
                <button type="button" id="btn-toggle-login-pwd" class="btn-password-toggle" aria-label="Toggle password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" id="btn-login-submit" class="btn btn-primary btn-lg" style="margin-top:0.5rem;">
              <span id="login-submit-text">Log In</span>
            </button>
          </form>

          <div class="divider-text">OR CONTINUE WITH</div>

          <div style="display:flex;flex-direction:column;gap:0.65rem;">
            <button type="button" id="btn-login-google" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button type="button" id="btn-login-line" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#00C300" d="M24 10.3c0-4.6-4.9-8.3-10.9-8.3S2.2 5.7 2.2 10.3c0 4.1 3.7 7.6 8.7 8.2.3.1.8.2.9.6.1.3.1.8 0 1.2l-.3 1.7c-.1.5-.4 1.8 1.6 1 2-1 10.9-6.4 10.9-12.7z"/>
                <path fill="#FFFFFF" d="M9.8 13.5H7.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm2.7-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm4.4 0c0 .2-.1.4-.3.5-.1.1-.3.1-.4.1-.1 0-.3-.1-.4-.2l-2.1-2.9v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.2.1-.4.3-.5.2-.1.4-.1.6 0l2.1 2.9V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm3.5-3.2h-1.6v1.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </svg>
              <span>Continue with LINE</span>
            </button>
          </div>

          <footer style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              Don't have an account? 
              <a href="#/register" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">Sign up</a>
            </p>
          </footer>
        </div>
      </main>
    `;
  }

  function bindLoginEvents() {
    const form = document.getElementById('login-form');
    const pwdInput = document.getElementById('login-password');
    const togglePwdBtn = document.getElementById('btn-toggle-login-pwd');
    const alertArea = document.getElementById('login-alert-area');
    const submitBtn = document.getElementById('btn-login-submit');
    const submitText = document.getElementById('login-submit-text');

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    const handleSocialLogin = (provider) => {
      showToast(`Signed in with ${provider} (Demo)`, 'success');
      state.auth.isAuthenticated = true;
      saveState();
      setTimeout(() => {
        if (!state.foodProfile.completed) {
          navigateTo('#/food-profile/allergies');
        } else {
          navigateTo('#/home');
        }
      }, 400);
    };

    const googleBtn = document.getElementById('btn-login-google');
    const lineBtn = document.getElementById('btn-login-line');
    if (googleBtn) googleBtn.onclick = () => handleSocialLogin('Google');
    if (lineBtn) lineBtn.onclick = () => handleSocialLogin('LINE');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        alertArea.innerHTML = '';
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter your email and password.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Signing in...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Log In';

          if (email === 'wrong@example.com' || password === 'wrong') {
            alertArea.innerHTML = `
              <div class="alert alert-danger">
                <strong>Invalid credentials.</strong> For demo, use <code>user@example.com</code> / <code>Password123</code>.
              </div>
            `;
          } else {
            state.auth.isAuthenticated = true;
            state.auth.user.email = email;
            saveState();
            showToast('Welcome back to FoodFighter!', 'success');
            if (!state.foodProfile.completed) {
              navigateTo('#/food-profile/allergies');
            } else {
              navigateTo('#/home');
            }
          }
        }, 350);
      };
    }
  }

  /** Screen: Register */
  function renderRegister() {
    return `
      <main class="app-shell" aria-labelledby="register-title">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action" aria-label="Back to Login">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Create Account</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="register-title" class="font-heading-1">Join FoodFighter</h2>
            <p class="screen-subtitle">Sign up to end mealtime arguments with AI recommendations</p>
          </section>

          <div id="register-alert-area"></div>

          <form id="register-form" novalidate>
            <div class="form-group">
              <label for="reg-name" class="form-label form-label-required">Full Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="Alex Johnson" value="Alex Johnson" required />
            </div>

            <div class="form-group">
              <label for="reg-email" class="form-label form-label-required">Email Address</label>
              <input type="email" id="reg-email" class="form-input" placeholder="alex@example.com" value="alex@example.com" required />
            </div>

            <div class="form-group">
              <label for="reg-password" class="form-label form-label-required">Password</label>
              <div class="input-wrapper">
                <input type="password" id="reg-password" class="form-input form-input-password" placeholder="At least 8 characters" value="Password123" required />
                <button type="button" id="btn-toggle-reg-pwd" class="btn-password-toggle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="reg-confirm-password" class="form-label form-label-required">Confirm Password</label>
              <input type="password" id="reg-confirm-password" class="form-input" value="Password123" required />
            </div>

            <label class="checkbox-group" for="reg-terms">
              <input type="checkbox" id="reg-terms" checked required />
              <span class="checkbox-custom">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              <span class="checkbox-label-text">
                I agree to the <span style="text-decoration:underline;">Terms of Service</span> and <span style="text-decoration:underline;">Privacy Policy</span>
              </span>
            </label>

            <button type="submit" id="btn-reg-submit" class="btn btn-primary btn-lg">
              <span id="reg-submit-text">Create Account</span>
            </button>
          </form>

          <div style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              Already have an account? <a href="#/login" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">Log in</a>
            </p>
          </div>
        </div>
      </main>
    `;
  }

  function bindRegisterEvents() {
    const form = document.getElementById('register-form');
    const alertArea = document.getElementById('register-alert-area');
    const togglePwdBtn = document.getElementById('btn-toggle-reg-pwd');
    const pwdInput = document.getElementById('reg-password');
    const submitBtn = document.getElementById('btn-reg-submit');
    const submitText = document.getElementById('reg-submit-text');

    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;

        if (!name || !email || !password) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please fill in all required fields.</div>`;
          return;
        }
        if (password !== confirmPassword) {
          alertArea.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Creating account...`;

        setTimeout(() => {
          state.auth.user.name = name;
          state.auth.user.email = email;
          state.auth.pendingVerificationEmail = email;
          saveState();
          showToast(`Verification code sent to ${email}`, 'success');
          navigateTo('#/verify-email');
        }, 350);
      };
    }
  }

  /** Screen: Verify Email / OTP */
  function renderVerifyEmail() {
    const email = state.auth.pendingVerificationEmail || 'user@example.com';
    return `
      <main class="app-shell" aria-labelledby="verify-title">
        <header class="top-bar">
          <a href="#/register" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Verify Email</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="verify-title" class="font-heading-1">Enter Verification Code</h2>
            <p class="screen-subtitle">We sent a 6-digit code to<br /><strong>${escapeHtml(email)}</strong></p>
          </section>

          <div id="otp-alert-area"></div>

          <div class="otp-container">
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" autofocus />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
            <input type="text" maxlength="1" inputmode="numeric" class="otp-box" />
          </div>

          <div class="alert alert-info" style="font-size:0.8rem;">
            <span>💡 <strong>Demo Code:</strong> Enter <code>123456</code> (or <code>111111</code> to test invalid error).</span>
          </div>

          <button type="button" id="btn-verify-otp" class="btn btn-primary btn-lg" style="margin-top:1rem;">
            Verify & Continue
          </button>

          <div style="margin-top:1.5rem;text-align:center;display:flex;flex-direction:column;gap:0.5rem;">
            <button type="button" id="btn-resend-otp" class="btn-ghost font-body-small" style="font-weight:600;">
              Resend Code
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindVerifyEmailEvents() {
    const otpBoxes = document.querySelectorAll('.otp-box');
    const verifyBtn = document.getElementById('btn-verify-otp');
    const alertArea = document.getElementById('otp-alert-area');
    const resendBtn = document.getElementById('btn-resend-otp');

    otpBoxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && index > 0) {
          otpBoxes[index - 1].focus();
        }
      });
      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text').trim();
        if (/^\d{6}$/.test(pasteData)) {
          pasteData.split('').forEach((char, i) => {
            if (otpBoxes[i]) otpBoxes[i].value = char;
          });
          otpBoxes[5].focus();
        }
      });
    });

    if (verifyBtn) {
      verifyBtn.onclick = () => {
        let code = '';
        otpBoxes.forEach(b => code += b.value);
        if (code.length < 6) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter all 6 digits.</div>`;
          return;
        }

        if (code === '111111') {
          alertArea.innerHTML = `<div class="alert alert-danger">Invalid code. Try <code>123456</code>.</div>`;
        } else {
          state.auth.isAuthenticated = true;
          saveState();
          showToast('Email verified successfully!', 'success');
          navigateTo('#/food-profile/allergies');
        }
      };
    }

    if (resendBtn) {
      resendBtn.onclick = () => showToast('New code sent: 123456', 'info');
    }
  }

  /** Screen: Forgot Password */
  function renderForgotPassword() {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Reset Password</h1>
          <div class="top-bar-placeholder"></div>
        </header>
        <div class="page-shell">
          <section class="screen-header">
            <h2 class="font-heading-1">Forgot your password?</h2>
            <p class="screen-subtitle">Enter your registered email and we'll send reset instructions.</p>
          </section>
          <form id="forgot-form">
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="forgot-email" class="form-input" value="user@example.com" required />
            </div>
            <button type="submit" class="btn btn-primary btn-lg">Send Reset Link</button>
          </form>
        </div>
      </main>
    `;
  }

  function bindForgotPasswordEvents() {
    const form = document.getElementById('forgot-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        showToast('Password reset link sent to your email!', 'success');
        setTimeout(() => navigateTo('#/login'), 800);
      };
    }
  }

  /** Food Profile: Allergies (1/3) */
  const ALLERGY_OPTIONS = [
    { id: 'peanuts', label: 'Peanuts', thai: 'ถั่วลิสง' },
    { id: 'tree-nuts', label: 'Tree Nuts', thai: 'ถั่วเปลือกแข็ง' },
    { id: 'shellfish', label: 'Shellfish', thai: 'สัตว์น้ำมีเปลือก' },
    { id: 'seafood', label: 'Fish & Seafood', thai: 'อาหารทะเล / ปลา' },
    { id: 'milk', label: 'Milk / Dairy', thai: 'นมวัว' },
    { id: 'eggs', label: 'Eggs', thai: 'ไข่ไก่' },
    { id: 'wheat', label: 'Wheat / Gluten', thai: 'แป้งสาลี / กลูเตน' },
    { id: 'soy', label: 'Soybeans', thai: 'ถั่วเหลือง' },
    { id: 'sesame', label: 'Sesame', thai: 'งา' },
    { id: 'none', label: 'No Allergies', thai: 'ไม่มีประวัติแพ้อาหาร' }
  ];

  function renderFoodProfileAllergies() {
    const selected = state.foodProfile.allergies || [];
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 1 of 3</span>
            <span class="step-badge">Allergies</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:33%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Any food allergies?</h2>
            <p class="screen-subtitle">Select items to strictly exclude for your group.</p>
          </section>

          <div class="chip-grid" id="allergy-chips">
            ${ALLERGY_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button type="button" class="chip-card ${isSelected ? 'selected' : ''}" data-allergy-id="${opt.id}">
                  <span class="chip-card-title">${escapeHtml(opt.label)}</span>
                  <span class="chip-card-sub">${escapeHtml(opt.thai)}</span>
                  <span class="chip-card-check">✓</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-allergies-continue" class="btn btn-primary btn-lg">
              Continue (1 / 3) →
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileAllergiesEvents() {
    const chips = document.querySelectorAll('#allergy-chips .chip-card');
    chips.forEach(chip => {
      chip.onclick = () => {
        const id = chip.getAttribute('data-allergy-id');
        let current = state.foodProfile.allergies || [];
        if (id === 'none') {
          current = current.includes('none') ? [] : ['none'];
        } else {
          current = current.filter(x => x !== 'none');
          current = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
        }
        state.foodProfile.allergies = current;
        saveState();
        renderCurrentRoute();
      };
    });

    document.getElementById('btn-allergies-continue').onclick = () => {
      navigateTo('#/food-profile/restrictions');
    };
  }

  /** Food Profile: Restrictions (2/3) */
  const RESTRICTION_OPTIONS = [
    { id: 'none', label: 'No Restrictions', thai: 'ไม่มีข้อจำกัด' },
    { id: 'vegetarian', label: 'Vegetarian', thai: 'มังสวิรัติ' },
    { id: 'vegan', label: 'Vegan / Jay', thai: 'อาหารเจ / วีแกน' },
    { id: 'halal', label: 'Halal', thai: 'อาหารฮาลาล' },
    { id: 'no-pork', label: 'No Pork', thai: 'ไม่ทานเนื้อหมู' },
    { id: 'no-beef', label: 'No Beef', thai: 'ไม่ทานเนื้อวัว' },
    { id: 'gluten-free', label: 'Gluten-Free', thai: 'ปลอดกลูเตน' },
    { id: 'dairy-free', label: 'Dairy-Free', thai: 'ปลอดผลิตภัณฑ์นม' }
  ];

  function renderFoodProfileRestrictions() {
    const selected = state.foodProfile.restrictions || [];
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/food-profile/allergies" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 2 of 3</span>
            <span class="step-badge">Dietary Habits</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:66%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Dietary Restrictions</h2>
            <p class="screen-subtitle">Choose religious or lifestyle eating habits.</p>
          </section>

          <div class="chip-grid" id="restriction-chips">
            ${RESTRICTION_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button type="button" class="chip-card ${isSelected ? 'selected' : ''}" data-restriction-id="${opt.id}">
                  <span class="chip-card-title">${escapeHtml(opt.label)}</span>
                  <span class="chip-card-sub">${escapeHtml(opt.thai)}</span>
                  <span class="chip-card-check">✓</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="bottom-actions">
            <div class="bottom-actions-row">
              <a href="#/food-profile/allergies" class="btn btn-secondary" style="flex:1;">Back</a>
              <button type="button" id="btn-restrictions-continue" class="btn btn-primary btn-lg" style="flex:2;">
                Continue (2 / 3) →
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileRestrictionsEvents() {
    const chips = document.querySelectorAll('#restriction-chips .chip-card');
    chips.forEach(chip => {
      chip.onclick = () => {
        const id = chip.getAttribute('data-restriction-id');
        let current = state.foodProfile.restrictions || [];
        if (id === 'none') {
          current = current.includes('none') ? [] : ['none'];
        } else {
          current = current.filter(x => x !== 'none');
          current = current.includes(id) ? current.filter(x => x !== id) : [...current, id];
        }
        state.foodProfile.restrictions = current;
        saveState();
        renderCurrentRoute();
      };
    });

    document.getElementById('btn-restrictions-continue').onclick = () => {
      navigateTo('#/food-profile/details');
    };
  }

  /** Food Profile: Details (3/3) */
  const SUGGESTION_PILLS = [
    { text: '🌶️ Spicy food lover', tag: 'Spicy' },
    { text: '🚫 No coriander', tag: 'No Cilantro' },
    { text: '🧂 Low sodium', tag: 'Low Sodium' },
    { text: '🥩 High protein', tag: 'High Protein' },
    { text: '🍜 Noodle fan', tag: 'Noodles' }
  ];

  function renderFoodProfileDetails() {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/food-profile/restrictions" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <div class="progress-header">
            <span class="font-label text-secondary">Step 3 of 3</span>
            <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Finish</span>
          </div>
          <div class="progress-track"><div class="progress-fill" style="width:100%;"></div></div>

          <section class="screen-header">
            <h2 class="font-heading-1">Personal Preferences</h2>
            <p class="screen-subtitle">Notes, flavor preferences, or dislikes for AI analysis.</p>
          </section>

          <div class="form-group">
            <label class="form-label">Notes & Dislikes</label>
            <textarea id="profile-notes" class="form-textarea" placeholder="e.g. Love spicy food, dislike raw onions...">${escapeHtml(state.foodProfile.details)}</textarea>
          </div>

          <div style="margin-bottom:1.5rem;">
            <label class="form-label" style="margin-bottom:0.5rem;">Quick Suggestions</label>
            <div class="pill-list" id="quick-pill-list">
              ${SUGGESTION_PILLS.map(p => {
                const isSelected = (state.foodProfile.quickTags || []).includes(p.tag);
                return `
                  <button type="button" class="pill-item ${isSelected ? 'selected' : ''}" data-tag="${p.tag}">
                    ${escapeHtml(p.text)}
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <div class="bottom-actions-row">
              <a href="#/food-profile/restrictions" class="btn btn-secondary" style="flex:1;">Back</a>
              <button type="button" id="btn-details-finish" class="btn btn-primary btn-lg" style="flex:2;">
                Finish & Start Exploring
              </button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFoodProfileDetailsEvents() {
    const textarea = document.getElementById('profile-notes');
    const finishBtn = document.getElementById('btn-details-finish');
    const pills = document.querySelectorAll('#quick-pill-list .pill-item');

    pills.forEach(pill => {
      pill.onclick = () => {
        const tag = pill.getAttribute('data-tag');
        let current = state.foodProfile.quickTags || [];
        current = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
        state.foodProfile.quickTags = current;
        saveState();
        pill.classList.toggle('selected', current.includes(tag));
      };
    });

    if (finishBtn) {
      finishBtn.onclick = () => {
        if (textarea) state.foodProfile.details = textarea.value.trim();
        state.foodProfile.completed = true;
        saveState();
        showToast('Food Profile saved successfully!', 'success');
        navigateTo('#/home');
      };
    }
  }

  /** Screen: Home Dashboard */
  function renderHome() {
    const user = state.auth.user;
    const allergiesCount = (state.foodProfile.allergies || []).filter(a => a !== 'none').length;
    const restrictionsCount = (state.foodProfile.restrictions || []).filter(r => r !== 'none').length;

    return `
      <main class="app-shell" aria-labelledby="home-welcome">
        <header class="top-bar">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <div class="brand-badge-logo" style="width:34px;height:34px;border-radius:10px;" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path></svg>
            </div>
            <span style="font-weight:700;font-size:1.15rem;color:var(--color-brand-primary);">FoodFighter</span>
          </div>
          
          <a href="#/profile" class="top-bar-action" aria-label="Profile">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-accent-petal);color:var(--color-brand-primary);font-size:0.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--color-brand-secondary);">
              ${escapeHtml(user.avatarText || 'AJ')}
            </div>
          </a>
        </header>

        <div class="page-shell page-shell-has-bottom-nav">
          <section style="margin-bottom:1.25rem;">
            <div class="font-body-small text-secondary">Hello, ${escapeHtml(user.name.split(' ')[0])} 👋</div>
            <h2 id="home-welcome" class="font-display" style="margin-top:0.2rem;font-size:1.65rem;">
              What's the plan today?
            </h2>
          </section>

          <!-- Active Food Profile Card -->
          <div class="card card-hero" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:2;">
              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Profile Active</span>
                <h3 class="font-heading-3" style="margin-top:0.45rem;">Your Food Profile</h3>
                <p class="font-body-small text-secondary" style="margin-top:0.2rem;">
                  ${allergiesCount > 0 ? `${allergiesCount} allergies` : 'No allergies'} • 
                  ${restrictionsCount > 0 ? `${restrictionsCount} diet rules` : 'Standard diet'}
                </p>
              </div>
              <a href="#/food-profile/allergies" class="btn btn-outline btn-sm" style="background:#fff;border-radius:var(--radius-full);">Edit</a>
            </div>
          </div>

          <!-- Create / Join Action Cards -->
          <section aria-label="Room Actions">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">Start or Join a Meal Battle</h3>
            <div class="action-card-grid">
              <a href="#/room/create" class="action-card action-card-create" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div class="action-card-title">Create Room</div>
                <div class="action-card-desc">Host session, invite friends via QR or code</div>
              </a>

              <a href="#/room/join" class="action-card action-card-join" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                </div>
                <div class="action-card-title">Join Room</div>
                <div class="action-card-desc">Enter code or scan host's QR invite</div>
              </a>
            </div>
          </section>

          <!-- History Preview -->
          <section style="margin-top:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h3 class="font-label text-secondary">Recent Battles</h3>
              <a href="#/history" class="font-caption text-secondary" style="font-weight:600;">View all</a>
            </div>
            <div class="card" style="display:flex;align-items:center;gap:0.85rem;padding:0.95rem;">
              <div style="width:42px;height:42px;border-radius:12px;background:var(--color-accent-custard);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🍲</div>
              <div style="flex:1;">
                <div style="font-size:0.9rem;font-weight:600;">Sukhumvit Dinner Squad</div>
                <div class="font-caption text-secondary">Winner: Krapow Wagyu + Tom Yum</div>
              </div>
              <span class="step-badge" style="font-size:0.7rem;">Completed</span>
            </div>
          </section>
        </div>

        <nav class="bottom-nav" aria-label="Main Navigation">
          <a href="#/home" class="bottom-nav-item active" aria-current="page">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
          </a>
          <a href="#/room/create" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path></svg>
            <span>Rooms</span>
          </a>
          <a href="#/history" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>History</span>
          </a>
          <a href="#/profile" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>Profile</span>
          </a>
        </nav>
      </main>
    `;
  }

  function bindHomeEvents() {}

  /* ==========================================================================
     6. Implemented Screens (V2 Room & FoodFight)
     ========================================================================== */

  /** Screen: Create Room */
  function renderRoomCreate() {
    return `
      <main class="app-shell" aria-labelledby="create-room-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Back to Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Create Room</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header">
            <h2 id="create-room-title" class="font-heading-1">Set Up FoodFight Room</h2>
            <p class="screen-subtitle">Host a session and invite your group to decide on a meal.</p>
          </section>

          <form id="create-room-form">
            <div class="form-group">
              <label for="room-name-input" class="form-label form-label-required">Room Name</label>
              <input type="text" id="room-name-input" class="form-input" value="${escapeHtml(state.room.roomName || 'Dinner Food Fight')}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Search Location</label>
              <input type="text" id="room-location-input" class="form-input" value="${escapeHtml(state.room.location || 'Current Location (Sukhumvit)')}" />
            </div>

            <div class="form-group">
              <label class="form-label">Search Radius</label>
              <div class="pill-list" id="radius-pills">
                <button type="button" class="pill-item ${state.room.radius === '1 km' ? 'selected' : ''}" data-radius="1 km">1 km</button>
                <button type="button" class="pill-item ${state.room.radius === '3 km' ? 'selected' : ''}" data-radius="3 km">3 km</button>
                <button type="button" class="pill-item ${state.room.radius === '5 km' ? 'selected' : ''}" data-radius="5 km">5 km</button>
                <button type="button" class="pill-item ${state.room.radius === '10 km' ? 'selected' : ''}" data-radius="10 km">10 km</button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Max Group Members</label>
              <div class="pill-list" id="max-member-pills">
                <button type="button" class="pill-item ${state.room.maxMembers === 4 ? 'selected' : ''}" data-max="4">4 Members</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 6 ? 'selected' : ''}" data-max="6">6 Members</button>
                <button type="button" class="pill-item ${state.room.maxMembers === 8 ? 'selected' : ''}" data-max="8">8 Members</button>
              </div>
            </div>
          </form>

          <div class="bottom-actions">
            <button type="button" id="btn-submit-create-room" class="btn btn-primary btn-lg">
              Create Room & Open Lobby →
            </button>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomCreateEvents() {
    const radiusPills = document.querySelectorAll('#radius-pills .pill-item');
    const memberPills = document.querySelectorAll('#max-member-pills .pill-item');
    const submitBtn = document.getElementById('btn-submit-create-room');

    radiusPills.forEach(p => {
      p.onclick = () => {
        radiusPills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        state.room.radius = p.getAttribute('data-radius');
        saveState();
      };
    });

    memberPills.forEach(p => {
      p.onclick = () => {
        memberPills.forEach(x => x.classList.remove('selected'));
        p.classList.add('selected');
        state.room.maxMembers = parseInt(p.getAttribute('data-max'), 10);
        saveState();
      };
    });

    if (submitBtn) {
      submitBtn.onclick = () => {
        const nameInput = document.getElementById('room-name-input');
        const locInput = document.getElementById('room-location-input');
        if (nameInput) state.room.roomName = nameInput.value.trim() || 'Dinner Food Fight';
        if (locInput) state.room.location = locInput.value.trim() || 'Sukhumvit';

        state.room.role = 'host';
        state.room.roomCode = 'FF-4827';
        state.room.inviteLink = 'https://foodfight.app/join/FF-4827';
        state.room.foodFightStarted = false;
        state.room.simulatedTwoMinutesElapsed = false;

        // Ensure host is ready
        state.room.members[0].isReady = true;
        saveState();

        showToast('Room FF-4827 created successfully!', 'success');
        navigateTo('#/room/lobby-host');
      };
    }
  }

  /** Screen: Room Lobby — Host */
  function renderRoomLobbyHost() {
    const room = state.room;
    const members = room.members || [];
    const totalCount = members.length;
    const readyCount = members.filter(m => m.isReady).length;
    const readyRatio = totalCount > 0 ? readyCount / totalCount : 0;
    const isAllReady = readyCount === totalCount && totalCount > 0;
    const isThresholdMet = (readyRatio >= 0.6) && room.simulatedTwoMinutesElapsed;
    const canStart = isAllReady || isThresholdMet;

    return `
      <main class="app-shell" aria-labelledby="lobby-host-title">
        <header class="top-bar">
          <button type="button" id="btn-host-leave" class="top-bar-action" aria-label="Leave Room">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title">Room Lobby</h1>
          <button type="button" id="btn-host-open-invite" class="top-bar-action" aria-label="Invite Friends">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Room Identity Card -->
          <div class="room-identity-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#FFF4CC;color:#7F4E00;border-color:#FFE082;">Host View</span>
                <h2 id="lobby-host-title" class="font-heading-2" style="margin-top:0.35rem;">
                  ${escapeHtml(room.roomName || 'Dinner Food Fight')}
                </h2>
                <div class="font-caption text-secondary" style="margin-top:0.2rem;">
                  📍 ${escapeHtml(room.location || 'Sukhumvit')} • Radius: ${escapeHtml(room.radius || '5 km')}
                </div>
              </div>
              
              <button type="button" id="btn-badge-copy-code" class="room-code-badge" title="Click to copy Room Code">
                <span>${escapeHtml(room.roomCode || 'FF-4827')}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
            </div>
          </div>

          <!-- Readiness Summary Banner -->
          <div class="readiness-banner ${isAllReady ? 'ready-all' : (isThresholdMet ? 'threshold-met' : '')}">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
              <span class="font-label" style="color:var(--color-brand-primary);">Member Readiness</span>
              <span style="font-size:0.85rem;font-weight:700;color:var(--color-brand-primary);">${readyCount} / ${totalCount} Ready (${Math.round(readyRatio * 100)}%)</span>
            </div>
            <div class="progress-track" style="margin-bottom:0.6rem;height:8px;">
              <div class="progress-fill" style="width:${Math.round(readyRatio * 100)}%;background:${isAllReady ? '#22863A' : 'linear-gradient(90deg, #FFC6D9, #916C80)'}"></div>
            </div>
            
            <p class="font-caption text-secondary" style="line-height:1.4;">
              ${isAllReady 
                ? '✅ <strong>All members are Ready!</strong> You can start the FoodFight now.'
                : (isThresholdMet 
                    ? '⚡ <strong>Threshold reached (≥60% ready + 2 min elapsed).</strong> You can start now with Ready members as Active participants.'
                    : '⏳ Waiting for members. (Rule: You can start when everyone is ready, or after 2 min if ≥60% are ready).')}
            </p>
          </div>

          <!-- Invite Button Banner -->
          <button type="button" id="btn-host-invite-card" class="btn btn-secondary" style="margin-bottom:1.25rem;">
            <span>📤 Invite Friends (Share Code / QR / Link)</span>
          </button>

          <!-- Members List -->
          <section>
            <h3 class="font-label text-secondary" style="margin-bottom:0.65rem;">Group Members (${totalCount})</h3>
            <div class="member-list">
              ${members.map((m, idx) => `
                <div class="member-card ${m.id === 'user' ? 'is-you' : ''}">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;display:flex;align-items:center;gap:0.35rem;">
                        ${escapeHtml(m.name)}
                        ${m.role === 'Host' ? '<span class="step-badge" style="font-size:0.65rem;padding:1px 5px;">Host</span>' : ''}
                      </div>
                      <div class="font-caption text-secondary">${m.isReady ? 'Participating as Active Member' : 'Will observe unless Ready'}</div>
                    </div>
                  </div>
                  
                  <div>
                    ${m.isReady 
                      ? '<span class="member-badge-ready">✓ Ready</span>' 
                      : '<span class="member-badge-waiting">⏳ Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Host Start CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-host-start-foodfight" class="btn btn-primary btn-lg" ${canStart ? '' : 'disabled'}>
              <span>${canStart ? 'Start FoodFight Now 🚀' : 'Waiting for Ready Members...'}</span>
            </button>
            <div class="font-caption text-muted text-center">
              ${canStart ? 'Active Members will submit their cravings' : 'Need 100% ready or ≥60% after 2 min threshold'}
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindRoomLobbyHostEvents() {
    const leaveBtn = document.getElementById('btn-host-leave');
    const inviteTopBtn = document.getElementById('btn-host-open-invite');
    const inviteCardBtn = document.getElementById('btn-host-invite-card');
    const copyCodeBtn = document.getElementById('btn-badge-copy-code');
    const startBtn = document.getElementById('btn-host-start-foodfight');

    if (leaveBtn) leaveBtn.onclick = () => showLeaveRoomModal();
    if (inviteTopBtn) inviteTopBtn.onclick = () => showInviteModal();
    if (inviteCardBtn) inviteCardBtn.onclick = () => showInviteModal();
    if (copyCodeBtn) {
      copyCodeBtn.onclick = () => copyTextToClipboard(state.room.roomCode || 'FF-4827', 'Room Code');
    }

    if (startBtn) {
      startBtn.onclick = () => {
        // Set active members from ready state
        state.room.members.forEach(m => {
          m.isActive = m.isReady;
          m.hasSubmitted = false;
        });
        state.room.foodFightStarted = true;
        saveState();

        const activeCount = state.room.members.filter(m => m.isActive).length;
        const observerCount = state.room.members.length - activeCount;
        showToast(`FoodFight started! ${activeCount} Active, ${observerCount} Observers.`, 'success');
        navigateTo('#/foodfight/preferences');
      };
    }
  }

  /** Screen: Join Room Hub */
  function renderRoomJoinHub() {
    return `
      <main class="app-shell" aria-labelledby="join-hub-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Back to Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Join a Room</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header">
            <h2 id="join-hub-title" class="font-heading-1">How would you like to join?</h2>
            <p class="screen-subtitle">Choose the method shared by your session host.</p>
          </section>

          <div style="display:flex;flex-direction:column;gap:0.9rem;margin-top:0.5rem;">
            <!-- Option 1: Enter Room Code -->
            <a href="#/room/code" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFE1C6;margin-bottom:0;flex-shrink:0;">
                🔢
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Enter Room Code</div>
                <div class="action-card-desc">Type the 6-character code (e.g. FF-4827)</div>
              </div>
              <span>→</span>
            </a>

            <!-- Option 2: Scan QR Code -->
            <a href="#/room/scan-qr" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFC6D9;margin-bottom:0;flex-shrink:0;">
                📷
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Scan QR Code</div>
                <div class="action-card-desc">Point your camera at the host's screen</div>
              </div>
              <span>→</span>
            </a>

            <!-- Option 3: Invite Link -->
            <a href="#/room/invite" class="action-card" style="flex-direction:row;align-items:center;text-align:left;gap:1rem;padding:1.15rem;">
              <div class="action-card-icon-bubble" style="background:#FFF7AE;margin-bottom:0;flex-shrink:0;">
                🔗
              </div>
              <div style="flex:1;">
                <div class="action-card-title">Use Invite Link</div>
                <div class="action-card-desc">Open directly from a shared WhatsApp or LINE link</div>
              </div>
              <span>→</span>
            </a>
          </div>

          <!-- Demo Quick Join Card -->
          <div class="card" style="margin-top:1.5rem;background:var(--color-surface-subtle);text-align:center;">
            <div class="font-label text-muted" style="margin-bottom:0.25rem;">Active Demo Room</div>
            <div style="font-weight:700;font-size:1.1rem;color:var(--color-brand-primary);">
              Dinner Food Fight (FF-4827)
            </div>
            <a href="#/room/preview" class="btn btn-outline btn-sm" style="margin-top:0.75rem;background:#fff;border-radius:var(--radius-full);">
              Quick Preview & Join Demo Room
            </a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomJoinHubEvents() {}

  /** Screen: Enter Room Code */
  function renderRoomCode() {
    return `
      <main class="app-shell" aria-labelledby="code-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Enter Room Code</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="code-title" class="font-heading-1">Type 6-Digit Code</h2>
            <p class="screen-subtitle">Ask your host for the room code displayed in their lobby.</p>
          </section>

          <div id="room-code-alert"></div>

          <form id="enter-code-form">
            <div class="form-group" style="text-align:center;">
              <input 
                type="text" 
                id="input-room-code" 
                class="form-input" 
                placeholder="FF-4827" 
                value="FF-4827"
                style="text-align:center;font-size:1.5rem;font-weight:700;letter-spacing:0.15em;font-family:monospace;text-transform:uppercase;"
                required 
              />
            </div>

            <div class="alert alert-info" style="font-size:0.8rem;">
              <span>💡 <strong>Demo Code:</strong> Try <code>FF-4827</code> (or <code>FF-0000</code> to test invalid room error).</span>
            </div>

            <button type="submit" id="btn-submit-code" class="btn btn-primary btn-lg" style="margin-top:1rem;">
              Continue to Room →
            </button>
          </form>
        </div>
      </main>
    `;
  }

  function bindRoomCodeEvents() {
    const form = document.getElementById('enter-code-form');
    const alertArea = document.getElementById('room-code-alert');
    const input = document.getElementById('input-room-code');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const code = input.value.trim().toUpperCase();
        if (!code) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter a room code.</div>`;
          return;
        }

        if (code === 'FF-0000') {
          alertArea.innerHTML = `<div class="alert alert-danger">Room code not found. Please try <code>FF-4827</code>.</div>`;
        } else {
          // Success code resolution
          state.room.role = 'member';
          state.room.roomCode = code;
          saveState();
          showToast(`Found room ${code}!`, 'success');
          navigateTo('#/room/preview');
        }
      };
    }
  }

  /** Screen: Scan QR Code (Simulation) */
  function renderRoomScanQR() {
    return `
      <main class="app-shell" aria-labelledby="scan-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Scan Room QR</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 id="scan-title" class="font-heading-1">Scan to Join</h2>
            <p class="screen-subtitle">Align the host's QR code within the frame below.</p>
          </section>

          <!-- Camera Viewfinder Simulation -->
          <div class="camera-scanner-frame">
            <div class="scanner-reticle">
              <div class="scanner-laser"></div>
              <span style="color:rgba(255,255,255,0.7);font-size:0.8rem;text-align:center;padding:1rem;">
                Align QR Code
              </span>
            </div>
          </div>

          <div style="text-align:center;margin:1rem 0;">
            <p class="font-caption text-muted">Zero camera permissions required in prototype mode</p>
          </div>

          <button type="button" id="btn-simulate-qr-found" class="btn btn-primary btn-lg">
            ⚡ Simulate QR Scan Found (FF-4827)
          </button>
        </div>
      </main>
    `;
  }

  function bindRoomScanQREvents() {
    const simBtn = document.getElementById('btn-simulate-qr-found');
    if (simBtn) {
      simBtn.onclick = () => {
        state.room.role = 'member';
        state.room.roomCode = 'FF-4827';
        saveState();
        showToast('QR Code scanned: FF-4827', 'success');
        navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Invite Link / Share View */
  function renderRoomInviteScreen() {
    const code = state.room.roomCode || 'FF-4827';
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Invite Link</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <h2 class="font-heading-1">Invite Link Resolver</h2>
            <p class="screen-subtitle">Simulating opening a shared FoodFight link</p>
          </section>

          <div class="card" style="text-align:center;padding:1.5rem;margin:1rem 0;">
            <div class="font-label text-muted" style="margin-bottom:0.25rem;">Detected URL</div>
            <code style="font-size:0.85rem;color:var(--color-brand-primary);word-break:break-all;">
              https://foodfight.app/join/${escapeHtml(code)}
            </code>
          </div>

          <button type="button" id="btn-resolve-invite-link" class="btn btn-primary btn-lg" style="margin-top:1rem;">
            Open Room Preview →
          </button>
        </div>
      </main>
    `;
  }

  function bindRoomInviteScreenEvents() {
    const btn = document.getElementById('btn-resolve-invite-link');
    if (btn) {
      btn.onclick = () => {
        state.room.role = 'member';
        saveState();
        showToast('Invite link resolved!', 'success');
        navigateTo('#/room/preview');
      };
    }
  }

  /** Screen: Room Preview (Pre-Join Confirmation) */
  function renderRoomPreview() {
    const room = state.room;
    return `
      <main class="app-shell" aria-labelledby="preview-title">
        <header class="top-bar">
          <a href="#/room/join" class="top-bar-action"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg></a>
          <h1 class="top-bar-title">Room Preview</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          <section class="screen-header screen-header-center">
            <div class="brand-badge-logo" style="margin:0 auto 1rem auto;">🍽️</div>
            <h2 id="preview-title" class="font-heading-1">${escapeHtml(room.roomName || 'Dinner Food Fight')}</h2>
            <p class="screen-subtitle">Hosted by <strong>Alex Johnson</strong> • Code: <code>${escapeHtml(room.roomCode || 'FF-4827')}</code></p>
          </section>

          <div class="card" style="margin:1rem 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <span class="font-label text-secondary">Members in Room</span>
              <span class="step-badge">${(room.members || []).length} Waiting</span>
            </div>
            
            <div style="display:flex;align-items:center;gap:0.5rem;padding:0.25rem 0;">
              ${(room.members || []).map(m => `
                <div class="avatar-badge ${m.colorClass || 'avatar-petal'}" title="${escapeHtml(m.name)}">${escapeHtml(m.initials)}</div>
              `).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <button type="button" id="btn-confirm-join-room" class="btn btn-primary btn-lg">
              Join Room as Member →
            </button>
            <a href="#/room/join" class="btn btn-secondary">Cancel</a>
          </div>
        </div>
      </main>
    `;
  }

  function bindRoomPreviewEvents() {
    const btn = document.getElementById('btn-confirm-join-room');
    if (btn) {
      btn.onclick = () => {
        state.room.role = 'member';
        state.room.roomJoined = true;
        saveState();
        showToast('Joined Dinner Food Fight!', 'success');
        navigateTo('#/room/lobby-member');
      };
    }
  }

  /** Screen: Room Lobby — Member */
  function renderRoomLobbyMember() {
    const room = state.room;
    const members = room.members || [];
    const userMember = members.find(m => m.id === 'user') || { isReady: false };
    const isUserReady = !!userMember.isReady;

    return `
      <main class="app-shell" aria-labelledby="lobby-member-title">
        <header class="top-bar">
          <button type="button" id="btn-member-leave" class="top-bar-action" aria-label="Leave Room">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
          <h1 class="top-bar-title">Room Lobby</h1>
          <button type="button" id="btn-member-open-invite" class="top-bar-action" aria-label="Invite Friends">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div class="room-identity-card">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;">
              <div>
                <span class="step-badge" style="background:#EFF6FC;color:#185582;border-color:#A7D3F3;">Member View</span>
                <h2 id="lobby-member-title" class="font-heading-2" style="margin-top:0.35rem;">
                  ${escapeHtml(room.roomName || 'Dinner Food Fight')}
                </h2>
                <div class="font-caption text-secondary" style="margin-top:0.2rem;">
                  Host: <strong>Maya Lin</strong> • Radius: ${escapeHtml(room.radius || '5 km')}
                </div>
              </div>
              
              <button type="button" id="btn-member-copy-code" class="room-code-badge" title="Click to copy code">
                <span>${escapeHtml(room.roomCode || 'FF-4827')}</span>
              </button>
            </div>
          </div>

          <!-- User Personal Readiness Status Card -->
          <div class="card ${isUserReady ? 'alert-success' : 'alert-warning'}" style="margin-bottom:1.25rem;border-radius:var(--radius-xl);">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div class="font-label" style="margin-bottom:0.2rem;">Your Status</div>
                <div style="font-size:1.05rem;font-weight:700;">
                  ${isUserReady ? '✅ You are READY!' : '⏳ You are NOT READY yet'}
                </div>
                <div class="font-caption" style="margin-top:0.25rem;">
                  ${isUserReady 
                    ? 'You will participate in AI dish recommendations & voting.' 
                    : 'Press Ready below before the host starts to participate!'}
                </div>
              </div>
            </div>
          </div>

          <!-- Group Members List -->
          <section>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.65rem;">
              <h3 class="font-label text-secondary">Group Members (${members.length})</h3>
              <button type="button" id="btn-member-invite-link" class="font-caption text-secondary" style="font-weight:600;text-decoration:underline;">
                + Invite more
              </button>
            </div>

            <div class="member-list">
              ${members.map(m => `
                <div class="member-card ${m.id === 'user' ? 'is-you' : ''}">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;">
                        ${escapeHtml(m.name)}
                        ${m.role === 'Host' ? '<span class="step-badge" style="font-size:0.65rem;padding:1px 5px;margin-left:4px;">Host</span>' : ''}
                      </div>
                      <div class="font-caption text-secondary">${m.isReady ? 'Ready to vote' : 'Waiting...'}</div>
                    </div>
                  </div>
                  <div>
                    ${m.isReady 
                      ? '<span class="member-badge-ready">✓ Ready</span>' 
                      : '<span class="member-badge-waiting">⏳ Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Member Toggle Ready CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-toggle-member-ready" class="btn ${isUserReady ? 'btn-secondary' : 'btn-primary'} btn-lg">
              <span>${isUserReady ? 'Cancel Ready (Become Not Ready)' : 'I\'m Ready! (Ready to Vote) ✅'}</span>
            </button>
            <div class="font-caption text-muted text-center">
              Host will start FoodFight once members are ready
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindRoomLobbyMemberEvents() {
    const leaveBtn = document.getElementById('btn-member-leave');
    const inviteBtn = document.getElementById('btn-member-open-invite');
    const inviteLink = document.getElementById('btn-member-invite-link');
    const copyCodeBtn = document.getElementById('btn-member-copy-code');
    const readyToggleBtn = document.getElementById('btn-toggle-member-ready');

    if (leaveBtn) leaveBtn.onclick = () => showLeaveRoomModal();
    if (inviteBtn) inviteBtn.onclick = () => showInviteModal();
    if (inviteLink) inviteLink.onclick = () => showInviteModal();
    if (copyCodeBtn) {
      copyCodeBtn.onclick = () => copyTextToClipboard(state.room.roomCode || 'FF-4827', 'Room Code');
    }

    if (readyToggleBtn) {
      readyToggleBtn.onclick = () => {
        const userMem = state.room.members.find(m => m.id === 'user');
        if (userMem) {
          userMem.isReady = !userMem.isReady;
          saveState();
          showToast(userMem.isReady ? 'You are now Ready!' : 'Ready status cancelled', 'info');
          renderCurrentRoute();
        }
      };
    }
  }

  /* ==========================================================================
     7. Implemented Screens (V2 FoodFight Flow)
     ========================================================================== */

  /** Screen: Meal Preferences */
  const PREF_FOOD_TYPES = [
    'Rice / ข้าว', 'Noodles / ก๋วยเตี๋ยว', 'Soup & Stew / ซุป-ต้ม',
    'Grill & BBQ / ปิ้งย่าง', 'Hot Pot / ชาบู-สุกี้', 'Fried & Crispy / ของทอด',
    'Fast Food / ฟาสต์ฟู้ด', 'Healthy & Clean / อาหารคลีน', 'Dessert / ของหวาน'
  ];

  const PREF_CUISINES = [
    'Thai / อาหารไทย', 'Japanese / ญี่ปุ่น', 'Korean / เกาหลี',
    'Chinese / จีน', 'Italian / อิตาเลียน', 'Western / ตะวันตก',
    'Indian / อินเดีย', 'Vietnamese / เวียดนาม'
  ];

  const PREF_INGREDIENTS = [
    'Chicken / ไก่', 'Pork / หมู', 'Beef / เนื้อวัว',
    'Seafood & Shrimp / กุ้ง-ซีฟู้ด', 'Fish / ปลา', 'Eggs / ไข่',
    'Vegetables / ผัก', 'Cheese / ชีส'
  ];

  const PREF_PRICE_LEVELS = [
    { symbol: '฿', title: 'Budget', sub: '< 150 THB' },
    { symbol: '฿฿', title: 'Moderate', sub: '150 - 400 THB' },
    { symbol: '฿฿฿', title: 'Premium', sub: '400+ THB' }
  ];

  const PREF_STYLES = [
    'Street Food / สตรีทฟู้ด', 'Casual Dining / ร้านนั่งสบาย',
    'Cafe & Bakery / คาเฟ่', 'Buffet / บุฟเฟต์',
    'Air-Conditioned / ห้องแอร์', 'Late Night / เปิดดึก'
  ];

  function renderMealPreferences() {
    const prefs = state.mealPreferences;

    return `
      <main class="app-shell" aria-labelledby="pref-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">Meal Preferences</h1>
          <button type="button" id="btn-pref-exit" class="top-bar-action" aria-label="Leave Session">✕</button>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <section class="screen-header">
            <div style="display:flex;align-items:center;gap:0.45rem;margin-bottom:0.35rem;">
              <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Active Member</span>
              <span class="font-caption text-secondary">Step 1 of 2</span>
            </div>
            <h2 id="pref-title" class="font-heading-1">What are you craving?</h2>
            <p class="screen-subtitle">Select your preferences for this group meal.</p>
          </section>

          <!-- Category 1: Food Type -->
          <div class="pref-category-block">
            <div class="pref-category-title">1. ประเภทอาหาร / Food Type</div>
            <div class="pref-category-sub">Select one or more categories</div>
            <div class="pill-list" id="pref-food-types">
              ${PREF_FOOD_TYPES.map(t => {
                const sel = (prefs.foodTypes || []).includes(t);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${escapeHtml(t)}">${escapeHtml(t)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 2: Cuisine / Nationality -->
          <div class="pref-category-block">
            <div class="pref-category-title">2. สัญชาติ / Cuisine</div>
            <div class="pref-category-sub">Nationalities you would like to eat</div>
            <div class="pill-list" id="pref-cuisines">
              ${PREF_CUISINES.map(c => {
                const sel = (prefs.cuisines || []).includes(c);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${escapeHtml(c)}">${escapeHtml(c)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 3: Ingredients -->
          <div class="pref-category-block">
            <div class="pref-category-title">3. วัตถุดิบ / Preferred Ingredients</div>
            <div class="pref-category-sub">Key proteins or ingredients desired</div>
            <div class="pill-list" id="pref-ingredients">
              ${PREF_INGREDIENTS.map(i => {
                const sel = (prefs.ingredients || []).includes(i);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${escapeHtml(i)}">${escapeHtml(i)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 4: Price Level -->
          <div class="pref-category-block">
            <div class="pref-category-title">4. ระดับราคา / Budget Level</div>
            <div class="pref-category-sub">Single select budget tier</div>
            <div class="price-level-grid" id="pref-price-grid">
              ${PREF_PRICE_LEVELS.map(p => {
                const sel = prefs.priceLevel === p.symbol;
                return `
                  <button type="button" class="price-card ${sel ? 'selected' : ''}" data-price="${p.symbol}">
                    <div class="price-symbol">${p.symbol}</div>
                    <div style="font-size:0.85rem;font-weight:600;">${p.title}</div>
                    <div class="price-label">${p.sub}</div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Category 5: Restaurant Style -->
          <div class="pref-category-block">
            <div class="pref-category-title">5. สไตล์ร้าน / Dining Style</div>
            <div class="pref-category-sub">Atmosphere and setting</div>
            <div class="pill-list" id="pref-styles">
              ${PREF_STYLES.map(s => {
                const sel = (prefs.restaurantStyles || []).includes(s);
                return `<button type="button" class="pill-item ${sel ? 'selected' : ''}" data-val="${escapeHtml(s)}">${escapeHtml(s)}</button>`;
              }).join('')}
            </div>
          </div>

          <!-- Category 6: Other Notes -->
          <div class="pref-category-block">
            <div class="pref-category-title">6. ความต้องการเพิ่มเติม / Other Notes</div>
            <div class="pref-category-sub">Specific cravings or extra group notes</div>
            <textarea id="pref-other-notes" class="form-textarea" placeholder="วันนี้อยากกินอะไรเป็นพิเศษ? (เช่น ไม่อยากกินของทอด, อยากได้ร้านเดินทางสะดวก)">${escapeHtml(prefs.otherNotes || '')}</textarea>
          </div>

          <!-- Submit CTA -->
          <div class="bottom-actions">
            <button type="button" id="btn-submit-preferences" class="btn btn-primary btn-lg">
              Submit Preferences →
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindMealPreferencesEvents() {
    const bindPillGroup = (containerId, stateKey) => {
      const pills = document.querySelectorAll(`#${containerId} .pill-item`);
      pills.forEach(p => {
        p.onclick = () => {
          const val = p.getAttribute('data-val');
          let current = state.mealPreferences[stateKey] || [];
          current = current.includes(val) ? current.filter(x => x !== val) : [...current, val];
          state.mealPreferences[stateKey] = current;
          p.classList.toggle('selected', current.includes(val));
          saveState();
        };
      });
    };

    bindPillGroup('pref-food-types', 'foodTypes');
    bindPillGroup('pref-cuisines', 'cuisines');
    bindPillGroup('pref-ingredients', 'ingredients');
    bindPillGroup('pref-styles', 'restaurantStyles');

    const priceCards = document.querySelectorAll('#pref-price-grid .price-card');
    priceCards.forEach(card => {
      card.onclick = () => {
        priceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.mealPreferences.priceLevel = card.getAttribute('data-price');
        saveState();
      };
    });

    const exitBtn = document.getElementById('btn-pref-exit');
    if (exitBtn) exitBtn.onclick = () => showLeaveRoomModal();

    const submitBtn = document.getElementById('btn-submit-preferences');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const notesInput = document.getElementById('pref-other-notes');
        if (notesInput) state.mealPreferences.otherNotes = notesInput.value.trim();

        // Mark user as submitted
        const userMem = state.room.members.find(m => m.id === 'user');
        if (userMem) userMem.hasSubmitted = true;
        saveState();

        showToast('Preferences submitted!', 'success');
        navigateTo('#/foodfight/waiting');
      };
    }
  }

  /** Screen: Waiting for Members */
  function renderFoodFightWaiting() {
    const members = state.room.members || [];
    const activeMembers = members.filter(m => m.isActive);
    const observerMembers = members.filter(m => !m.isActive);
    const submittedCount = activeMembers.filter(m => m.hasSubmitted).length;
    const totalActive = activeMembers.length;
    const allSubmitted = submittedCount === totalActive && totalActive > 0;

    return `
      <main class="app-shell" aria-labelledby="waiting-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">FoodFight Session</h1>
          <button type="button" id="btn-waiting-exit" class="top-bar-action" aria-label="Exit">✕</button>
        </header>

        <div class="page-shell">
          
          <div class="waiting-hero-card">
            <div class="brand-badge-logo" style="margin:0 auto 0.75rem auto;">
              <span class="spinner spinner-primary"></span>
            </div>
            <h2 id="waiting-title" class="font-heading-1">Waiting for Group</h2>
            <p class="screen-subtitle" style="margin-top:0.25rem;">
              ${allSubmitted 
                ? '🎉 All active members have submitted! Synthesizing AI recommendations...' 
                : 'Waiting for active members to complete their cravings.'}
            </p>

            <div style="margin-top:1.25rem;">
              <div style="display:flex;justify-content:space-between;font-size:0.85rem;font-weight:600;margin-bottom:0.35rem;">
                <span>Submissions</span>
                <span>${submittedCount} of ${totalActive} Submitted</span>
              </div>
              <div class="progress-track" style="height:8px;">
                <div class="progress-fill" style="width:${Math.round((submittedCount / totalActive) * 100)}%;"></div>
              </div>
            </div>
          </div>

          <!-- Active Members List -->
          <section style="margin-bottom:1.5rem;">
            <h3 class="font-label text-secondary" style="margin-bottom:0.65rem;">Active Members (${totalActive})</h3>
            <div class="member-list">
              ${activeMembers.map(m => `
                <div class="member-card">
                  <div class="member-info">
                    <div class="avatar-badge ${m.colorClass || 'avatar-petal'}">${escapeHtml(m.initials)}</div>
                    <div>
                      <div style="font-size:0.9rem;font-weight:600;">${escapeHtml(m.name)}</div>
                      <div class="font-caption text-secondary">${m.hasSubmitted ? 'Submitted preferences' : 'Choosing preferences...'}</div>
                    </div>
                  </div>
                  <div>
                    ${m.hasSubmitted 
                      ? '<span class="member-badge-ready">✓ Submitted</span>' 
                      : '<span class="member-badge-waiting"><span class="spinner" style="width:12px;height:12px;"></span> Waiting</span>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Observers List (If any) -->
          ${observerMembers.length > 0 ? `
            <section style="margin-bottom:1.5rem;">
              <h3 class="font-label text-muted" style="margin-bottom:0.5rem;">Observers (${observerMembers.length})</h3>
              <div class="card" style="background:var(--color-surface-subtle);padding:0.75rem 1rem;">
                <div class="font-caption text-secondary" style="line-height:1.4;">
                  ${observerMembers.map(m => `<strong>${escapeHtml(m.name)}</strong>`).join(', ')} joined as observers (not ready at start) and will follow along without submitting preferences.
                </div>
              </div>
            </section>
          ` : ''}

        </div>
      </main>
    `;
  }

  function bindFoodFightWaitingEvents() {
    const exitBtn = document.getElementById('btn-waiting-exit');
    if (exitBtn) exitBtn.onclick = () => showLeaveRoomModal();

    const members = state.room.members || [];
    const activeMembers = members.filter(m => m.isActive);
    const submittedCount = activeMembers.filter(m => m.hasSubmitted).length;

    // Automatic transition if all active members submitted
    if (submittedCount === activeMembers.length && activeMembers.length > 0) {
      setTimeout(() => {
        navigateTo('#/foodfight/generating');
      }, 700);
    }
  }

  /** Screen: Generating Recommendations */
  function renderFoodFightGenerating() {
    return `
      <main class="app-shell" aria-labelledby="generating-title">
        <header class="top-bar">
          <div style="width:38px;"></div>
          <h1 class="top-bar-title">AI Synthesis</h1>
          <div style="width:38px;"></div>
        </header>

        <div class="page-shell">
          <div class="generating-container">
            
            <div class="radar-pulse-box">
              <div class="radar-pulse-ring"></div>
              <div class="radar-pulse-ring-2"></div>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>

            <div>
              <h2 id="generating-title" class="font-heading-1">Finding the Best Match</h2>
              <p class="screen-subtitle" style="margin-top:0.35rem;max-width:320px;">
                AI is analyzing active member allergies, dietary constraints, budgets, and cravings...
              </p>
            </div>

            <!-- Live synthesis tags preview -->
            <div class="synthesis-tag-list">
              <div class="synthesis-tag-item">
                <span>🛡️</span>
                <span>Allergens & Dietary Constraints checked (0 conflicts)</span>
              </div>
              <div class="synthesis-tag-item">
                <span>🍜</span>
                <span>Top Cravings Synthesized: Noodles & Hot Pot</span>
              </div>
              <div class="synthesis-tag-item">
                <span>💰</span>
                <span>Budget Tier: ฿฿ Moderate (150-400 THB)</span>
              </div>
              <div class="synthesis-tag-item">
                <span>📍</span>
                <span>Filtering within 5 km of Sukhumvit</span>
              </div>
            </div>

            <div class="progress-track" style="width:200px;height:6px;margin-top:1rem;">
              <div class="progress-fill" style="width:100%;animation:laserScan 1.5s infinite;"></div>
            </div>

          </div>
        </div>
      </main>
    `;
  }

  function bindFoodFightGeneratingEvents() {
    // Deterministic 1.5s delay to simulate high-fidelity generation and reach V3 boundary
    setTimeout(() => {
      showToast('AI recommendations generated successfully!', 'success');
      navigateTo('#/recommendations');
    }, 1500);
  }

  /** V3 Boundary Screen: Recommendations Ready */
  function renderRecommendationsBoundaryShell() {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Home">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </a>
          <h1 class="top-bar-title">Recommended Menus</h1>
          <a href="#/home" class="top-bar-action"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg></a>
        </header>

        <div class="page-shell">
          <div class="future-shell-container">
            
            <div class="future-shell-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
              V2 PHASE COMPLETE • CONTINUES IN V3
            </div>

            <div class="future-shell-card" style="border-style:solid;border-color:var(--color-brand-secondary);">
              <div class="future-shell-icon" style="background:var(--color-accent-custard);font-size:32px;">
                🎉
              </div>

              <h2 class="font-heading-2" style="margin-top:0.35rem;">
                Recommendations Are Ready!
              </h2>

              <p class="font-body-small text-secondary" style="max-width:320px;line-height:1.45;">
                AI has successfully synthesized your group's food profiles, dietary constraints, and meal preferences.
              </p>

              <div class="card" style="background:var(--color-surface-subtle);text-align:left;width:100%;margin-top:0.5rem;">
                <div class="font-label text-secondary" style="margin-bottom:0.25rem;">Next in Prototype V3:</div>
                <ul style="font-size:0.8rem;color:var(--color-text-secondary);padding-left:1.15rem;line-height:1.4;">
                  <li>2-Dish Recommendation Cards & Allergens</li>
                  <li>Interactive OK / PASS Group Voting</li>
                  <li>Consensus & Round 2 Re-recommendation</li>
                  <li>4-Dish Final Vote Tie-Break</li>
                  <li>Final Menu Winner Reveal & Restaurants</li>
                </ul>
              </div>
            </div>

            <div style="width:100%;display:flex;flex-direction:column;gap:0.65rem;margin-top:1rem;">
              <a href="#/home" class="btn btn-primary">
                Return to Home Dashboard
              </a>
              <button type="button" id="btn-open-proto-nav-v3" class="btn btn-secondary">
                Open Screen Navigator
              </button>
            </div>

          </div>
        </div>
      </main>
    `;
  }

  function bindRecommendationsBoundaryEvents() {
    const navBtn = document.getElementById('btn-open-proto-nav-v3');
    if (navBtn) navBtn.onclick = () => openPrototypeNavigator();
  }

  /* ==========================================================================
     8. Future Screens Shell
     ========================================================================== */
  function renderFutureShell(screen) {
    const isExploration = screen.scope === 'PROTOTYPE_EXPLORATION';

    return `
      <main class="app-shell" aria-labelledby="shell-screen-title">
        <header class="top-bar">
          <button type="button" id="btn-shell-back" class="top-bar-action" aria-label="Go Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <h1 class="top-bar-title">${escapeHtml(screen.title)}</h1>
          <a href="#/home" class="top-bar-action" aria-label="Go Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
          </a>
        </header>

        <div class="page-shell">
          <div class="future-shell-container">
            <div class="future-shell-badge">
              <span>${escapeHtml(screen.category)}</span>
              ${isExploration ? '• EXPLORATION' : ''}
            </div>

            <div class="future-shell-card">
              <div class="future-shell-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              </div>

              <h2 id="shell-screen-title" class="font-heading-2" style="margin-top:0.35rem;">
                ${escapeHtml(screen.title)}
              </h2>

              <p class="font-body-small text-secondary" style="max-width:320px;line-height:1.45;">
                ${escapeHtml(screen.description)}
              </p>

              <div class="step-badge" style="margin-top:0.5rem;background:var(--color-surface-subtle);color:var(--color-brand-secondary);">
                COMING IN NEXT PROTOTYPE PHASE
              </div>
            </div>

            <div style="width:100%;display:flex;flex-direction:column;gap:0.65rem;margin-top:1rem;">
              <a href="#/home" class="btn btn-primary">Return to Home Dashboard</a>
              <button type="button" id="btn-open-proto-nav-from-shell" class="btn btn-secondary">Open Screen Navigator</button>
            </div>
          </div>
        </div>
      </main>
    `;
  }

  function bindFutureShellEvents() {
    const backBtn = document.getElementById('btn-shell-back');
    if (backBtn) {
      backBtn.onclick = () => {
        if (window.history.length > 1) window.history.back();
        else navigateTo('#/home');
      };
    }
    const navBtn = document.getElementById('btn-open-proto-nav-from-shell');
    if (navBtn) navBtn.onclick = () => openPrototypeNavigator();
  }

  function renderNotFoundShell(hash) {
    return `
      <main class="app-shell">
        <header class="top-bar"><h1 class="top-bar-title">Screen Not Found</h1></header>
        <div class="page-shell">
          <div class="future-shell-container">
            <h2 class="font-heading-1">404</h2>
            <p class="font-body-small text-secondary">Route <code>${escapeHtml(hash)}</code> is not registered.</p>
            <a href="#/home" class="btn btn-primary" style="margin-top:1rem;">Go to Home</a>
          </div>
        </div>
      </main>
    `;
  }

  /* ==========================================================================
     9. Developer Prototype Navigator & Simulation Controls
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
          resetPrototypeState();
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
    SCREEN_REGISTRY.forEach(screen => {
      if (!categories[screen.category]) categories[screen.category] = [];
      categories[screen.category].push(screen);
    });

    let html = `
      <!-- Developer Simulation & Test Controls Box -->
      <div class="proto-sim-box">
        <div class="font-label" style="color:var(--color-brand-primary);display:flex;align-items:center;gap:0.35rem;">
          <span>🎮 Simulation & Testing Controls</span>
        </div>

        <div style="font-size:0.75rem;color:var(--color-text-secondary);line-height:1.35;">
          Simulate multi-user room readiness and preference submission without waiting.
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-top:0.25rem;">
          <button type="button" id="sim-toggle-role" class="proto-sim-btn">
            <span>Role: <strong>${state.room.role === 'host' ? 'Host' : 'Member'}</strong></span>
            <span>⇄</span>
          </button>
          <button type="button" id="sim-toggle-threshold" class="proto-sim-btn">
            <span>2-Min Elapsed: <strong>${state.room.simulatedTwoMinutesElapsed ? 'YES' : 'NO'}</strong></span>
          </button>
        </div>

        <div style="display:flex;flex-direction:column;gap:0.35rem;margin-top:0.25rem;">
          <button type="button" id="sim-toggle-maya" class="proto-sim-btn">
            <span>Maya Ready (${state.room.members[1]?.isReady ? '✅ Ready' : '⏳ Waiting'})</span>
            <span>Toggle</span>
          </button>
          <button type="button" id="sim-toggle-nina" class="proto-sim-btn">
            <span>Nina Ready (${state.room.members[2]?.isReady ? '✅ Ready' : '⏳ Waiting'})</span>
            <span>Toggle</span>
          </button>
          <button type="button" id="sim-toggle-ken" class="proto-sim-btn">
            <span>Ken Ready (${state.room.members[3]?.isReady ? '✅ Ready' : '⏳ Waiting'})</span>
            <span>Toggle</span>
          </button>
          <button type="button" id="sim-all-ready" class="proto-sim-btn" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">
            <span>✨ Set All Members Ready (100%)</span>
          </button>
          <button type="button" id="sim-all-submitted" class="proto-sim-btn" style="background:#FFF8E6;color:#784C00;border-color:#F6D68A;">
            <span>🍲 Mark All Active Members Submitted</span>
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
            ${screens.map(s => {
              const isImpl = s.status === 'IMPLEMENTED';
              return `
                <a href="${s.hash}" class="proto-nav-item" data-hash="${s.hash}">
                  <span>${escapeHtml(s.title)}</span>
                  <span class="proto-nav-tag ${isImpl ? 'proto-nav-tag-impl' : 'proto-nav-tag-shell'}">
                    ${isImpl ? 'Implemented' : 'V3 / Future'}
                  </span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
    bindSimulationControls();
  }

  function bindSimulationControls() {
    const roleBtn = document.getElementById('sim-toggle-role');
    const threshBtn = document.getElementById('sim-toggle-threshold');
    const mayaBtn = document.getElementById('sim-toggle-maya');
    const ninaBtn = document.getElementById('sim-toggle-nina');
    const kenBtn = document.getElementById('sim-toggle-ken');
    const allReadyBtn = document.getElementById('sim-all-ready');
    const allSubBtn = document.getElementById('sim-all-submitted');

    if (roleBtn) {
      roleBtn.onclick = () => {
        state.room.role = state.room.role === 'host' ? 'member' : 'host';
        saveState();
        showToast(`Switched view to: ${state.room.role.toUpperCase()}`, 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        if (window.location.hash.includes('/room/lobby')) {
          navigateTo(state.room.role === 'host' ? '#/room/lobby-host' : '#/room/lobby-member');
        }
      };
    }

    if (threshBtn) {
      threshBtn.onclick = () => {
        state.room.simulatedTwoMinutesElapsed = !state.room.simulatedTwoMinutesElapsed;
        saveState();
        showToast(`2-Min Elapsed simulated: ${state.room.simulatedTwoMinutesElapsed ? 'YES' : 'NO'}`, 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        renderCurrentRoute();
      };
    }

    const toggleMemberReady = (idx, name) => {
      if (state.room.members[idx]) {
        state.room.members[idx].isReady = !state.room.members[idx].isReady;
        saveState();
        showToast(`${name} readiness: ${state.room.members[idx].isReady ? 'READY' : 'WAITING'}`, 'info');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        renderCurrentRoute();
      }
    };

    if (mayaBtn) mayaBtn.onclick = () => toggleMemberReady(1, 'Maya');
    if (ninaBtn) ninaBtn.onclick = () => toggleMemberReady(2, 'Nina');
    if (kenBtn) kenBtn.onclick = () => toggleMemberReady(3, 'Ken');

    if (allReadyBtn) {
      allReadyBtn.onclick = () => {
        state.room.members.forEach(m => m.isReady = true);
        saveState();
        showToast('All 4 members set to READY!', 'success');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        renderCurrentRoute();
      };
    }

    if (allSubBtn) {
      allSubBtn.onclick = () => {
        state.room.members.forEach(m => {
          if (m.isActive) m.hasSubmitted = true;
        });
        saveState();
        showToast('All active members marked as SUBMITTED!', 'success');
        renderNavigatorContent(document.getElementById('proto-nav-list'));
        renderCurrentRoute();
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

  /* ==========================================================================
     10. Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initPrototypeNavigator();
    renderCurrentRoute();
  });

})();
