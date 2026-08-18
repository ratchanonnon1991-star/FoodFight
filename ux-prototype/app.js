/**
 * FoodFighter UX Prototype V1 — Core Interactive Application
 * 
 * Zero-framework, zero-build vanilla JavaScript architecture.
 * Features:
 *   - Hash-based SPA Router with full browser Back/Forward history support
 *   - Centralized Screen Registry with implemented & planned screens
 *   - Persistent Prototype State Store (localStorage) with demo reset
 *   - High-fidelity interactive components (OTP segmented input, chip selection, password toggles, toasts, modal)
 *   - Deterministic demo interactions for review and evaluation
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Prototype Screen Registry & Metadata
     ========================================================================== */
  const SCREEN_REGISTRY = [
    // AUTH FLOW (Fully Implemented in V1)
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

    // FOOD PROFILE ONBOARDING (Fully Implemented in V1)
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

    // HOME SCREEN (Fully Implemented in V1)
    {
      id: 'home',
      hash: '#/home',
      title: 'Home Dashboard',
      category: 'Home',
      status: 'IMPLEMENTED',
      description: 'Primary landing hub featuring active food profile summary, Create Room CTA, and Join Room CTA.'
    },

    // ROOM FLOW (Future / Shells)
    {
      id: 'room-create',
      hash: '#/room/create',
      title: 'Create Room',
      category: 'Room',
      status: 'FUTURE',
      description: 'Host sets room name, max members, location coordinates, search radius, and date/time.'
    },
    {
      id: 'room-lobby-host',
      hash: '#/room/lobby-host',
      title: 'Room Lobby — Host',
      category: 'Room',
      status: 'FUTURE',
      description: 'Host view of real-time member join events, ready indicators, and Start Session control.'
    },
    {
      id: 'room-join',
      hash: '#/room/join',
      title: 'Join Room Entry',
      category: 'Room',
      status: 'FUTURE',
      description: 'Member entry point with Room Code input and camera QR code scanner trigger.'
    },
    {
      id: 'room-scan-qr',
      hash: '#/room/scan-qr',
      title: 'Scan QR Code',
      category: 'Room',
      status: 'FUTURE',
      description: 'Camera view for scanning FoodFight room QR invitations.'
    },
    {
      id: 'room-code',
      hash: '#/room/code',
      title: 'Enter Room Code',
      category: 'Room',
      status: 'FUTURE',
      description: 'Direct alphanumeric 6-character room code submission.'
    },
    {
      id: 'room-invite',
      hash: '#/room/invite',
      title: 'Invite Link & QR Modal',
      category: 'Room',
      status: 'FUTURE',
      description: 'Shareable room invite link, QR code display, and copy-to-clipboard action.'
    },
    {
      id: 'room-preview',
      hash: '#/room/preview',
      title: 'Room Preview',
      category: 'Room',
      status: 'FUTURE',
      description: 'Pre-join confirmation screen showing room name, host avatar, and active member count.'
    },
    {
      id: 'room-lobby-member',
      hash: '#/room/lobby-member',
      title: 'Room Lobby — Member',
      category: 'Room',
      status: 'FUTURE',
      description: 'Member view featuring Ready status toggle and waiting indicator.'
    },

    // FOODFIGHT SESSION (Future / Shells)
    {
      id: 'foodfight-preferences',
      hash: '#/foodfight/preferences',
      title: 'Meal Preferences',
      category: 'FoodFight',
      status: 'FUTURE',
      description: 'In-session inputs: Food Type, Cuisine, Ingredients, Budget, Restaurant Style, and notes.'
    },
    {
      id: 'foodfight-waiting',
      hash: '#/foodfight/waiting',
      title: 'Waiting for Members',
      category: 'FoodFight',
      status: 'FUTURE',
      description: 'Real-time countdown and member submission progress tracker.'
    },
    {
      id: 'foodfight-generating',
      hash: '#/foodfight/generating',
      title: 'Generating Recommendations',
      category: 'FoodFight',
      status: 'FUTURE',
      description: 'AI synthesizing group constraints, preferences, and location to curate 2 top dishes.'
    },

    // MENU RECOMMENDATIONS & VOTING (Future / Shells)
    {
      id: 'recommendations',
      hash: '#/recommendations',
      title: 'Recommended Menus',
      category: 'Recommendation',
      status: 'FUTURE',
      description: 'Top 2 AI-recommended dishes with reasoning, ingredients, and allergen safety callouts.'
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

    // RESTAURANTS & MAP (Future / Shells)
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

    // SPLIT BILL & RECEIPT OCR (Future / Shells - Exploratory)
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

    // PROFILE & HISTORY (Future / Shells)
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
    }
  };

  let state = loadState();

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
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
    showToast('Prototype state reset to default.', 'info');
    navigateTo('#/login');
  }

  /* ==========================================================================
     3. Global UI Utilities: Toasts & Modals
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3200) {
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

    toast.querySelector('button').onclick = () => {
      toast.remove();
    };

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

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function (m) {
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

    // Scroll to top upon screen change
    window.scrollTo(0, 0);

    const screen = findScreen(hash);

    if (!screen) {
      // Fallback 404 / Unknown Route
      appRoot.innerHTML = renderNotFoundShell(hash);
      updateNavigatorActive(hash);
      return;
    }

    // Render Implemented vs Future Shell
    switch (screen.id) {
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

  /**
   * Screen 1: Login
   */
  function renderLogin() {
    return `
      <main class="app-shell" aria-labelledby="login-title">
        <div class="page-shell">
          
          <!-- Brand Logo Header -->
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

          <!-- Error Feedback Container -->
          <div id="login-alert-area"></div>

          <!-- Login Form -->
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
              <span id="login-email-error" class="form-error" style="display:none;"></span>
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
                  <svg id="eye-icon-login" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <span id="login-password-error" class="form-error" style="display:none;"></span>
            </div>

            <button type="submit" id="btn-login-submit" class="btn btn-primary btn-lg" style="margin-top:0.5rem;">
              <span id="login-submit-text">Log In</span>
            </button>
          </form>

          <!-- Social Separator -->
          <div class="divider-text">OR CONTINUE WITH</div>

          <!-- Social Buttons -->
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

          <!-- Sign Up Link -->
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

    // Password show/hide toggle
    if (togglePwdBtn && pwdInput) {
      togglePwdBtn.onclick = () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
        togglePwdBtn.innerHTML = isPwd
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      };
    }

    // Social Auth Demos
    const googleBtn = document.getElementById('btn-login-google');
    const lineBtn = document.getElementById('btn-login-line');

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
      }, 500);
    };

    if (googleBtn) googleBtn.onclick = () => handleSocialLogin('Google');
    if (lineBtn) lineBtn.onclick = () => handleSocialLogin('LINE');

    // Form Submit
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        alertArea.innerHTML = '';
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Validation
        if (!email) {
          alertArea.innerHTML = `<div class="alert alert-danger" role="alert">Please enter your email address.</div>`;
          return;
        }
        if (!password) {
          alertArea.innerHTML = `<div class="alert alert-danger" role="alert">Please enter your password.</div>`;
          return;
        }

        // Demo deterministic behavior
        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Signing in...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Log In';

          if (email === 'wrong@example.com' || password === 'wrong') {
            alertArea.innerHTML = `
              <div class="alert alert-danger" role="alert">
                <strong>Invalid credentials.</strong> For demo, use <code>user@example.com</code> and password <code>Password123</code>.
              </div>
            `;
          } else {
            // Successful demo login
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
        }, 400);
      };
    }
  }

  /**
   * Screen 2: Register
   */
  function renderRegister() {
    return `
      <main class="app-shell" aria-labelledby="register-title">
        <!-- Top Bar with Back Affordance -->
        <header class="top-bar">
          <a href="#/login" class="top-bar-action" aria-label="Back to Login">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
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
              <div class="input-wrapper">
                <input 
                  type="text" 
                  id="reg-name" 
                  name="name" 
                  class="form-input" 
                  placeholder="e.g. Alex Johnson" 
                  value="Alex Johnson"
                  autocomplete="name" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-email" class="form-label form-label-required">Email Address</label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  id="reg-email" 
                  name="email" 
                  class="form-input" 
                  placeholder="alex@example.com" 
                  value="alex@example.com"
                  autocomplete="email" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="reg-password" class="form-label form-label-required">Password</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-password" 
                  name="password" 
                  class="form-input form-input-password" 
                  placeholder="At least 8 characters" 
                  value="Password123"
                  autocomplete="new-password" 
                  required 
                />
                <button type="button" id="btn-toggle-reg-pwd" class="btn-password-toggle" aria-label="Toggle password visibility">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
              </div>
              <span class="form-helper">Minimum 8 characters with upper, lower, & numbers</span>
            </div>

            <div class="form-group">
              <label for="reg-confirm-password" class="form-label form-label-required">Confirm Password</label>
              <div class="input-wrapper">
                <input 
                  type="password" 
                  id="reg-confirm-password" 
                  name="confirmPassword" 
                  class="form-input form-input-password" 
                  placeholder="Re-enter password" 
                  value="Password123"
                  autocomplete="new-password" 
                  required 
                />
              </div>
            </div>

            <!-- Terms & Consent -->
            <label class="checkbox-group" for="reg-terms">
              <input type="checkbox" id="reg-terms" name="terms" checked required />
              <span class="checkbox-custom" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              <span class="checkbox-label-text">
                I agree to the <span style="text-decoration:underline;">Terms of Service</span> and <span style="text-decoration:underline;">Privacy Policy</span>
              </span>
            </label>

            <button type="submit" id="btn-reg-submit" class="btn btn-primary btn-lg">
              <span id="reg-submit-text">Create Account</span>
            </button>
          </form>

          <div class="divider-text">OR SIGN UP WITH</div>

          <div style="display:flex;flex-direction:column;gap:0.65rem;">
            <button type="button" id="btn-reg-google" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign up with Google</span>
            </button>
            <button type="button" id="btn-reg-line" class="btn btn-social">
              <svg class="social-icon-svg" viewBox="0 0 24 24">
                <path fill="#00C300" d="M24 10.3c0-4.6-4.9-8.3-10.9-8.3S2.2 5.7 2.2 10.3c0 4.1 3.7 7.6 8.7 8.2.3.1.8.2.9.6.1.3.1.8 0 1.2l-.3 1.7c-.1.5-.4 1.8 1.6 1 2-1 10.9-6.4 10.9-12.7z"/>
                <path fill="#FFFFFF" d="M9.8 13.5H7.7c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5zm2.7-.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm4.4 0c0 .2-.1.4-.3.5-.1.1-.3.1-.4.1-.1 0-.3-.1-.4-.2l-2.1-2.9v2.5c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.2c0-.2.1-.4.3-.5.2-.1.4-.1.6 0l2.1 2.9V8.2c0-.3.2-.5.5-.5s.5.2.5.5v4.8zm3.5-3.2h-1.6v1.3h1.6c.3 0 .5.2.5.5s-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5V8.2c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5s-.2.5-.5.5h-1.6v1.1h1.6c.3 0 .5.2.5.5s-.2.5-.5.5z"/>
              </svg>
              <span>Sign up with LINE</span>
            </button>
          </div>

          <footer style="margin-top:auto;padding-top:1.5rem;text-align:center;">
            <p class="font-body-small text-secondary">
              Already have an account? 
              <a href="#/login" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">Log in</a>
            </p>
          </footer>

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
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
      };
    }

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        alertArea.innerHTML = '';

        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('reg-confirm-password').value;
        const termsChecked = document.getElementById('reg-terms').checked;

        if (!name) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter your full name.</div>`;
          return;
        }
        if (!email || !email.includes('@')) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter a valid email address.</div>`;
          return;
        }
        if (password.length < 8) {
          alertArea.innerHTML = `<div class="alert alert-danger">Password must be at least 8 characters long.</div>`;
          return;
        }
        if (password !== confirmPassword) {
          alertArea.innerHTML = `<div class="alert alert-danger">Passwords do not match.</div>`;
          return;
        }
        if (!termsChecked) {
          alertArea.innerHTML = `<div class="alert alert-danger">You must agree to the Terms and Privacy Policy.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Creating account...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Create Account';

          state.auth.user.name = name;
          state.auth.user.email = email;
          state.auth.pendingVerificationEmail = email;
          saveState();

          showToast(`Verification code sent to ${email}`, 'success');
          navigateTo('#/verify-email');
        }, 400);
      };
    }
  }

  /**
   * Screen 3: Verify Email / OTP
   */
  function renderVerifyEmail() {
    const destinationEmail = state.auth.pendingVerificationEmail || 'user@example.com';
    const maskedEmail = maskEmail(destinationEmail);

    return `
      <main class="app-shell" aria-labelledby="verify-title">
        <header class="top-bar">
          <a href="#/register" class="top-bar-action" aria-label="Back to Register">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          <h1 class="top-bar-title">Verify Email</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          <section class="screen-header screen-header-center">
            <div class="brand-badge-logo" style="margin:0 auto 1rem auto;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2 id="verify-title" class="font-heading-1">Enter Verification Code</h2>
            <p class="screen-subtitle">
              We sent a 6-digit code to<br />
              <strong style="color:var(--color-text-primary);">${escapeHtml(maskedEmail)}</strong>
            </p>
          </section>

          <div id="otp-alert-area"></div>

          <!-- 6-Digit Segmented OTP Input Grid -->
          <div class="otp-container" id="otp-input-group">
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="0" autofocus />
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="1" />
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="2" />
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="3" />
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="4" />
            <input type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" class="otp-box" data-index="5" />
          </div>

          <!-- Demo Hint Box -->
          <div class="alert alert-info" style="font-size:0.8rem;margin-top:0.5rem;">
            <span>💡 <strong>Demo Code:</strong> Enter <code>123456</code> (or <code>111111</code> to test invalid code).</span>
          </div>

          <button type="button" id="btn-verify-otp" class="btn btn-primary btn-lg" style="margin-top:1rem;">
            <span id="verify-submit-text">Verify & Continue</span>
          </button>

          <!-- Resend & Change Email Actions -->
          <div style="margin-top:1.5rem;text-align:center;display:flex;flex-direction:column;gap:0.75rem;">
            <div class="font-body-small text-secondary">
              Didn't receive the code? 
              <button type="button" id="btn-resend-otp" style="color:var(--color-brand-primary);font-weight:700;text-decoration:underline;">
                Resend Code
              </button>
            </div>
            <button type="button" id="btn-change-email" class="btn-ghost font-body-small" style="text-decoration:underline;">
              Change Email Address
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function maskEmail(email) {
    if (!email || !email.includes('@')) return email;
    const parts = email.split('@');
    const name = parts[0];
    const maskedName = name.length > 2 ? name[0] + '***' + name[name.length - 1] : name[0] + '***';
    return maskedName + '@' + parts[1];
  }

  function bindVerifyEmailEvents() {
    const otpBoxes = document.querySelectorAll('.otp-box');
    const verifyBtn = document.getElementById('btn-verify-otp');
    const verifyText = document.getElementById('verify-submit-text');
    const alertArea = document.getElementById('otp-alert-area');
    const resendBtn = document.getElementById('btn-resend-otp');
    const changeEmailBtn = document.getElementById('btn-change-email');

    // Auto-focus first box
    if (otpBoxes.length > 0) {
      otpBoxes[0].focus();
    }

    // Segmented Input Keyboard & Paste Handling
    otpBoxes.forEach((box, index) => {
      box.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val.length === 1) {
          box.classList.add('filled');
          if (index < otpBoxes.length - 1) {
            otpBoxes[index + 1].focus();
          }
        } else if (val.length === 0) {
          box.classList.remove('filled');
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
            if (otpBoxes[i]) {
              otpBoxes[i].value = char;
              otpBoxes[i].classList.add('filled');
            }
          });
          otpBoxes[otpBoxes.length - 1].focus();
        }
      });
    });

    const getEnteredCode = () => {
      let code = '';
      otpBoxes.forEach(b => code += b.value);
      return code;
    };

    if (verifyBtn) {
      verifyBtn.onclick = () => {
        alertArea.innerHTML = '';
        const code = getEnteredCode();

        if (code.length < 6) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter all 6 digits of the code.</div>`;
          return;
        }

        verifyBtn.disabled = true;
        verifyText.innerHTML = `<span class="spinner"></span> Verifying...`;

        setTimeout(() => {
          verifyBtn.disabled = false;
          verifyText.textContent = 'Verify & Continue';

          if (code === '111111') {
            alertArea.innerHTML = `<div class="alert alert-danger">Invalid code. Please re-enter (try <code>123456</code>).</div>`;
            otpBoxes.forEach(b => {
              b.value = '';
              b.classList.remove('filled');
              b.classList.add('has-error');
            });
            otpBoxes[0].focus();
          } else {
            // Success (123456 or standard demo)
            state.auth.isAuthenticated = true;
            saveState();
            showToast('Email verified successfully!', 'success');
            navigateTo('#/food-profile/allergies');
          }
        }, 400);
      };
    }

    if (resendBtn) {
      resendBtn.onclick = () => {
        showToast('New code sent: 123456', 'info');
      };
    }

    if (changeEmailBtn) {
      changeEmailBtn.onclick = () => {
        const newEmail = prompt('Enter your new email address:', state.auth.pendingVerificationEmail);
        if (newEmail && newEmail.includes('@')) {
          state.auth.pendingVerificationEmail = newEmail;
          saveState();
          showToast(`Verification code sent to ${newEmail}`, 'success');
          renderCurrentRoute();
        }
      };
    }
  }

  /**
   * Screen 4: Forgot Password (PROTOTYPE_EXPLORATION)
   */
  function renderForgotPassword() {
    const isSent = !!state.auth.resetEmailSentTo;

    return `
      <main class="app-shell" aria-labelledby="forgot-title">
        <header class="top-bar">
          <a href="#/login" class="top-bar-action" aria-label="Back to Login">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          <h1 class="top-bar-title">Reset Password</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell">
          ${isSent ? renderForgotPasswordSuccessState() : renderForgotPasswordFormState()}
        </div>
      </main>
    `;
  }

  function renderForgotPasswordFormState() {
    return `
      <section class="screen-header">
        <h2 id="forgot-title" class="font-heading-1">Forgot your password?</h2>
        <p class="screen-subtitle">
          Enter your registered email address and we'll send you instructions to reset your password.
        </p>
      </section>

      <div id="forgot-alert-area"></div>

      <form id="forgot-form" novalidate>
        <div class="form-group">
          <label for="forgot-email" class="form-label form-label-required">Email Address</label>
          <div class="input-wrapper">
            <input 
              type="email" 
              id="forgot-email" 
              name="email" 
              class="form-input" 
              placeholder="user@example.com" 
              value="user@example.com" 
              required 
            />
          </div>
        </div>

        <button type="submit" id="btn-forgot-submit" class="btn btn-primary btn-lg" style="margin-top:0.5rem;">
          <span id="forgot-submit-text">Send Reset Link</span>
        </button>
      </form>

      <div style="margin-top:auto;text-align:center;padding-top:2rem;">
        <a href="#/login" class="btn-ghost font-body-small" style="font-weight:600;">
          ← Back to Login
        </a>
      </div>
    `;
  }

  function renderForgotPasswordSuccessState() {
    const email = state.auth.resetEmailSentTo || 'user@example.com';
    return `
      <section class="screen-header screen-header-center" style="margin-top:2rem;">
        <div class="brand-badge-logo" style="margin:0 auto 1.25rem auto;background:#EDF9F0;color:#165E2A;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 id="forgot-title" class="font-heading-1">Check Your Email</h2>
        <p class="screen-subtitle">
          We've sent password reset instructions to<br />
          <strong style="color:var(--color-text-primary);">${escapeHtml(email)}</strong>
        </p>
      </section>

      <div class="card" style="background:var(--color-surface-subtle);margin:1.5rem 0;text-align:center;">
        <p class="font-body-small text-secondary">
          Didn't receive the email? Check your spam folder or click below to resend.
        </p>
      </div>

      <div style="display:flex;flex-direction:column;gap:0.75rem;">
        <button type="button" id="btn-forgot-resend" class="btn btn-secondary">
          Resend Email
        </button>
        <a href="#/login" class="btn btn-primary btn-lg">
          Return to Login
        </a>
      </div>
    `;
  }

  function bindForgotPasswordEvents() {
    const form = document.getElementById('forgot-form');
    const alertArea = document.getElementById('forgot-alert-area');
    const submitBtn = document.getElementById('btn-forgot-submit');
    const submitText = document.getElementById('forgot-submit-text');
    const resendBtn = document.getElementById('btn-forgot-resend');

    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value.trim();
        if (!email || !email.includes('@')) {
          alertArea.innerHTML = `<div class="alert alert-danger">Please enter a valid email address.</div>`;
          return;
        }

        submitBtn.disabled = true;
        submitText.innerHTML = `<span class="spinner"></span> Sending...`;

        setTimeout(() => {
          state.auth.resetEmailSentTo = email;
          saveState();
          showToast('Reset instructions sent!', 'success');
          renderCurrentRoute();
        }, 400);
      };
    }

    if (resendBtn) {
      resendBtn.onclick = () => {
        showToast('Password reset link resent!', 'info');
      };
    }
  }

  /**
   * Screen 5: Food Profile — Allergies (Step 1 of 3)
   */
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
      <main class="app-shell" aria-labelledby="allergies-title">
        <header class="top-bar">
          <a href="#/home" class="top-bar-action" aria-label="Skip to Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <!-- Progress Bar Header -->
          <div class="progress-header">
            <span class="font-label text-secondary">Step 1 of 3</span>
            <span class="step-badge">Allergies</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width: 33%;"></div>
          </div>

          <section class="screen-header">
            <h2 id="allergies-title" class="font-heading-1">Any food allergies?</h2>
            <p class="screen-subtitle">
              Select items you or your group must strictly avoid for safety.
            </p>
          </section>

          <!-- Allergies Grid -->
          <div class="chip-grid" id="allergy-chips" role="group" aria-label="Food Allergies List">
            ${ALLERGY_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button 
                  type="button" 
                  class="chip-card ${isSelected ? 'selected' : ''}" 
                  data-allergy-id="${opt.id}"
                  role="checkbox"
                  aria-checked="${isSelected}"
                >
                  <span class="chip-card-title">${escapeHtml(opt.label)}</span>
                  <span class="chip-card-sub">${escapeHtml(opt.thai)}</span>
                  <span class="chip-card-check">✓</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Bottom Fixed Action Bar -->
          <div class="bottom-actions">
            <button type="button" id="btn-allergies-continue" class="btn btn-primary btn-lg">
              <span>Continue (1 / 3)</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </main>
    `;
  }

  function bindFoodProfileAllergiesEvents() {
    const chips = document.querySelectorAll('#allergy-chips .chip-card');
    const continueBtn = document.getElementById('btn-allergies-continue');

    chips.forEach(chip => {
      chip.onclick = () => {
        const allergyId = chip.getAttribute('data-allergy-id');
        let current = state.foodProfile.allergies || [];

        if (allergyId === 'none') {
          // Selecting 'none' clears other allergies
          current = current.includes('none') ? [] : ['none'];
        } else {
          // Selecting another allergy clears 'none'
          current = current.filter(id => id !== 'none');
          if (current.includes(allergyId)) {
            current = current.filter(id => id !== allergyId);
          } else {
            current.push(allergyId);
          }
        }

        state.foodProfile.allergies = current;
        saveState();

        // Update DOM visual selection
        chips.forEach(c => {
          const id = c.getAttribute('data-allergy-id');
          const isSelected = current.includes(id);
          c.classList.toggle('selected', isSelected);
          c.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });
      };
    });

    if (continueBtn) {
      continueBtn.onclick = () => {
        navigateTo('#/food-profile/restrictions');
      };
    }
  }

  /**
   * Screen 6: Food Profile — Dietary Restrictions (Step 2 of 3)
   */
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
      <main class="app-shell" aria-labelledby="restrictions-title">
        <header class="top-bar">
          <a href="#/food-profile/allergies" class="top-bar-action" aria-label="Back to Allergies">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div class="progress-header">
            <span class="font-label text-secondary">Step 2 of 3</span>
            <span class="step-badge">Dietary Habits</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width: 66%;"></div>
          </div>

          <section class="screen-header">
            <h2 id="restrictions-title" class="font-heading-1">Dietary Restrictions</h2>
            <p class="screen-subtitle">
              Choose any religious, ethical, or lifestyle eating habits you follow.
            </p>
          </section>

          <div class="chip-grid" id="restriction-chips" role="group" aria-label="Dietary Restrictions List">
            ${RESTRICTION_OPTIONS.map(opt => {
              const isSelected = selected.includes(opt.id);
              return `
                <button 
                  type="button" 
                  class="chip-card ${isSelected ? 'selected' : ''}" 
                  data-restriction-id="${opt.id}"
                  role="checkbox"
                  aria-checked="${isSelected}"
                >
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
                <span>Continue (2 / 3)</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindFoodProfileRestrictionsEvents() {
    const chips = document.querySelectorAll('#restriction-chips .chip-card');
    const continueBtn = document.getElementById('btn-restrictions-continue');

    chips.forEach(chip => {
      chip.onclick = () => {
        const id = chip.getAttribute('data-restriction-id');
        let current = state.foodProfile.restrictions || [];

        if (id === 'none') {
          current = current.includes('none') ? [] : ['none'];
        } else {
          current = current.filter(item => item !== 'none');
          if (current.includes(id)) {
            current = current.filter(item => item !== id);
          } else {
            current.push(id);
          }
        }

        state.foodProfile.restrictions = current;
        saveState();

        chips.forEach(c => {
          const cid = c.getAttribute('data-restriction-id');
          const isSelected = current.includes(cid);
          c.classList.toggle('selected', isSelected);
          c.setAttribute('aria-checked', isSelected ? 'true' : 'false');
        });
      };
    });

    if (continueBtn) {
      continueBtn.onclick = () => {
        navigateTo('#/food-profile/details');
      };
    }
  }

  /**
   * Screen 7: Food Profile — Additional Details (Step 3 of 3)
   */
  const SUGGESTION_PILLS = [
    { text: '🌶️ Spicy food lover', tag: 'Spicy' },
    { text: '🚫 No coriander / cilantro', tag: 'No Cilantro' },
    { text: '🧂 Low sodium', tag: 'Low Sodium' },
    { text: '🥩 High protein', tag: 'High Protein' },
    { text: '🍜 Noodle enthusiast', tag: 'Noodles' },
    { text: '🍚 Rice bowl fan', tag: 'Rice Dishes' }
  ];

  function renderFoodProfileDetails() {
    const currentDetails = state.foodProfile.details || '';
    const currentTags = state.foodProfile.quickTags || [];

    return `
      <main class="app-shell" aria-labelledby="details-title">
        <header class="top-bar">
          <a href="#/food-profile/restrictions" class="top-bar-action" aria-label="Back to Dietary Restrictions">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
          <h1 class="top-bar-title">Food Profile</h1>
          <div class="top-bar-placeholder"></div>
        </header>

        <div class="page-shell page-shell-has-bottom-actions">
          
          <div class="progress-header">
            <span class="font-label text-secondary">Step 3 of 3</span>
            <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Complete</span>
          </div>
          <div class="progress-track" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" style="width: 100%;"></div>
          </div>

          <section class="screen-header">
            <h2 id="details-title" class="font-heading-1">Personal Preferences</h2>
            <p class="screen-subtitle">
              Tell the AI anything extra about your flavor preferences, dislikes, or dining habits.
            </p>
          </section>

          <div class="form-group">
            <label for="profile-notes" class="form-label">
              <span>Additional Notes / Dislikes</span>
              <span class="font-caption text-muted">Optional</span>
            </label>
            <textarea 
              id="profile-notes" 
              class="form-textarea" 
              placeholder="e.g., I love spicy street food, prefer places with air conditioning, avoid bitter gourd and raw onions..."
            >${escapeHtml(currentDetails)}</textarea>
          </div>

          <div style="margin-bottom:1.5rem;">
            <label class="form-label" style="margin-bottom:0.6rem;">Quick Tap Suggestions</label>
            <div class="pill-list" id="quick-pill-list">
              ${SUGGESTION_PILLS.map(p => {
                const isSelected = currentTags.includes(p.tag);
                return `
                  <button 
                    type="button" 
                    class="pill-item ${isSelected ? 'selected' : ''}" 
                    data-tag="${p.tag}"
                  >
                    <span>${escapeHtml(p.text)}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bottom-actions">
            <div class="bottom-actions-row">
              <a href="#/food-profile/restrictions" class="btn btn-secondary" style="flex:1;">Back</a>
              <button type="button" id="btn-details-finish" class="btn btn-primary btn-lg" style="flex:2;">
                <span>Finish & Start</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </main>
    `;
  }

  function bindFoodProfileDetailsEvents() {
    const textarea = document.getElementById('profile-notes');
    const pills = document.querySelectorAll('#quick-pill-list .pill-item');
    const finishBtn = document.getElementById('btn-details-finish');

    pills.forEach(pill => {
      pill.onclick = () => {
        const tag = pill.getAttribute('data-tag');
        let currentTags = state.foodProfile.quickTags || [];

        if (currentTags.includes(tag)) {
          currentTags = currentTags.filter(t => t !== tag);
        } else {
          currentTags.push(tag);
        }

        state.foodProfile.quickTags = currentTags;
        pill.classList.toggle('selected', currentTags.includes(tag));
        saveState();
      };
    });

    if (finishBtn) {
      finishBtn.onclick = () => {
        if (textarea) {
          state.foodProfile.details = textarea.value.trim();
        }
        state.foodProfile.completed = true;
        saveState();

        showToast('Food Profile saved successfully!', 'success');
        navigateTo('#/home');
      };
    }
  }

  /**
   * Screen 8: Home Screen
   */
  function renderHome() {
    const user = state.auth.user;
    const allergiesCount = (state.foodProfile.allergies || []).filter(a => a !== 'none').length;
    const restrictionsCount = (state.foodProfile.restrictions || []).filter(r => r !== 'none').length;

    return `
      <main class="app-shell" aria-labelledby="home-welcome">
        
        <!-- Top App Bar with Branding & Profile Badge -->
        <header class="top-bar">
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <div class="brand-badge-logo" style="width:34px;height:34px;border-radius:10px;" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
              </svg>
            </div>
            <span style="font-weight:700;font-size:1.15rem;color:var(--color-brand-primary);">FoodFighter</span>
          </div>
          
          <a href="#/profile" class="top-bar-action" aria-label="User Profile">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-accent-petal);color:var(--color-brand-primary);font-size:0.75rem;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--color-brand-secondary);">
              ${escapeHtml(user.avatarText || 'AJ')}
            </div>
          </a>
        </header>

        <div class="page-shell page-shell-has-bottom-nav">
          
          <!-- Greeting Section -->
          <section style="margin-bottom:1.25rem;">
            <div class="font-body-small text-secondary">Hello, ${escapeHtml(user.name.split(' ')[0])} 👋</div>
            <h2 id="home-welcome" class="font-display" style="margin-top:0.2rem;font-size:1.65rem;">
              What's the plan today?
            </h2>
          </section>

          <!-- Food Profile Status Badge / Card -->
          <div class="card card-hero" style="margin-bottom:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:2;">
              <div>
                <span class="step-badge" style="background:#EDF9F0;color:#165E2A;border-color:#A6DEB4;">Profile Active</span>
                <h3 class="font-heading-3" style="margin-top:0.45rem;">Your Food Profile</h3>
                <p class="font-body-small text-secondary" style="margin-top:0.2rem;">
                  ${allergiesCount > 0 ? `${allergiesCount} allergies recorded` : 'No allergies'} • 
                  ${restrictionsCount > 0 ? `${restrictionsCount} diet rules` : 'Standard diet'}
                </p>
              </div>
              <a href="#/food-profile/allergies" class="btn btn-outline btn-sm" style="background:#fff;border-radius:var(--radius-full);">
                Edit
              </a>
            </div>
          </div>

          <!-- Primary Action Cards (Create Room & Join Room) -->
          <section aria-label="Room Actions">
            <h3 class="font-label text-secondary" style="margin-bottom:0.75rem;">Start or Join a Meal Battle</h3>
            
            <div class="action-card-grid">
              <!-- Create Room -->
              <a href="#/room/create" class="action-card action-card-create" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                </div>
                <div class="action-card-title">Create Room</div>
                <div class="action-card-desc">Host a session, invite friends via QR or code</div>
              </a>

              <!-- Join Room -->
              <a href="#/room/join" class="action-card action-card-join" role="button">
                <div class="action-card-icon-bubble">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                    <polyline points="10 17 15 12 10 7"></polyline>
                    <line x1="15" y1="12" x2="3" y2="12"></line>
                  </svg>
                </div>
                <div class="action-card-title">Join Room</div>
                <div class="action-card-desc">Enter code or scan host's QR invite</div>
              </a>
            </div>
          </section>

          <!-- Recent Food Battles / History Preview -->
          <section style="margin-top:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">
              <h3 class="font-label text-secondary">Recent Battles</h3>
              <a href="#/history" class="font-caption text-secondary" style="font-weight:600;">View all</a>
            </div>

            <div class="card" style="display:flex;align-items:center;gap:0.85rem;padding:0.95rem;">
              <div style="width:42px;height:42px;border-radius:12px;background:var(--color-accent-custard);display:flex;align-items:center;justify-content:center;color:var(--color-brand-primary);font-size:20px;flex-shrink:0;">
                🍲
              </div>
              <div style="flex:1;">
                <div style="font-size:0.9rem;font-weight:600;">Sukhumvit Dinner Squad</div>
                <div class="font-caption text-secondary">Winner: Krapow Wagyu + Tom Yum</div>
              </div>
              <span class="step-badge" style="font-size:0.7rem;">Completed</span>
            </div>
          </section>

        </div>

        <!-- Mobile Bottom Navigation Bar -->
        <nav class="bottom-nav" aria-label="Main Navigation">
          <a href="#/home" class="bottom-nav-item active" aria-current="page">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </a>

          <a href="#/room/create" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Rooms</span>
          </a>

          <a href="#/history" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>History</span>
          </a>

          <a href="#/profile" class="bottom-nav-item">
            <svg class="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Profile</span>
          </a>
        </nav>

      </main>
    `;
  }

  function bindHomeEvents() {
    // Home interactions are natural hash links
  }

  /* ==========================================================================
     6. Future Screen Shell (For Unimplemented Prototype Phases)
     ========================================================================== */
  function renderFutureShell(screen) {
    const isExploration = screen.scope === 'PROTOTYPE_EXPLORATION';

    return `
      <main class="app-shell" aria-labelledby="shell-screen-title">
        <header class="top-bar">
          <button type="button" id="btn-shell-back" class="top-bar-action" aria-label="Go Back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h1 class="top-bar-title">${escapeHtml(screen.title)}</h1>
          <a href="#/home" class="top-bar-action" aria-label="Go Home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
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
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
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

            <!-- Quick Navigation Options -->
            <div style="width:100%;display:flex;flex-direction:column;gap:0.65rem;margin-top:1rem;">
              <a href="#/home" class="btn btn-primary">
                Return to Home Dashboard
              </a>
              <button type="button" id="btn-open-proto-nav-from-shell" class="btn btn-secondary">
                Open Screen Navigator
              </button>
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
        if (window.history.length > 1) {
          window.history.back();
        } else {
          navigateTo('#/home');
        }
      };
    }

    const navBtn = document.getElementById('btn-open-proto-nav-from-shell');
    if (navBtn) {
      navBtn.onclick = () => {
        openPrototypeNavigator();
      };
    }
  }

  function renderNotFoundShell(hash) {
    return `
      <main class="app-shell">
        <header class="top-bar">
          <h1 class="top-bar-title">Screen Not Found</h1>
        </header>
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
     7. Developer Prototype Navigator Drawer
     ========================================================================== */
  function initPrototypeNavigator() {
    const toggleBtn = document.getElementById('proto-nav-toggle-btn');
    const closeBtn = document.getElementById('proto-nav-close-btn');
    const backdrop = document.getElementById('proto-nav-backdrop');
    const drawer = document.getElementById('proto-nav-drawer');
    const resetBtn = document.getElementById('proto-reset-btn');
    const navList = document.getElementById('proto-nav-list');

    if (!toggleBtn || !drawer || !backdrop || !navList) return;

    // Group screens by category
    const categories = {};
    SCREEN_REGISTRY.forEach(screen => {
      if (!categories[screen.category]) {
        categories[screen.category] = [];
      }
      categories[screen.category].push(screen);
    });

    // Populate drawer content
    let html = '';
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
                    ${isImpl ? 'Implemented' : 'Next Phase'}
                  </span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }
    navList.innerHTML = html;

    // Drawer open/close triggers
    toggleBtn.onclick = () => openPrototypeNavigator();
    closeBtn.onclick = () => closePrototypeNavigator();
    backdrop.onclick = () => closePrototypeNavigator();

    // Reset button
    if (resetBtn) {
      resetBtn.onclick = () => {
        if (confirm('Reset prototype state to fresh demo defaults?')) {
          resetPrototypeState();
          closePrototypeNavigator();
        }
      };
    }

    // ESC key closes drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closePrototypeNavigator();
      }
    });
  }

  function openPrototypeNavigator() {
    const backdrop = document.getElementById('proto-nav-backdrop');
    const drawer = document.getElementById('proto-nav-drawer');
    const toggleBtn = document.getElementById('proto-nav-toggle-btn');
    if (backdrop && drawer) {
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
     8. Initialization
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initPrototypeNavigator();
    renderCurrentRoute();
  });

})();
