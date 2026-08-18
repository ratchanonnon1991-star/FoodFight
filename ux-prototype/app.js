/**
 * FoodFighter UX Prototype — Application Bootstrap & Route Dispatcher
 * 
 * Orchestrates:
 *   - Route lifecycle & switch dispatcher
 *   - Top-level hash routing
 *   - Application startup & DOMContentLoaded hookup
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Main Route Switch Dispatcher
     ========================================================================== */
  function renderCurrentRoute() {
    const hash = window.location.hash || '#/login';
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    // Reset window scroll on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    let screenHtml = '';
    let bindFn = null;

    switch (hash) {
      // V1 Auth
      case '#/login':
        screenHtml = P.renderLogin();
        bindFn = P.bindLoginEvents;
        break;
      case '#/register':
        screenHtml = P.renderRegister();
        bindFn = P.bindRegisterEvents;
        break;
      case '#/verify-email':
        screenHtml = P.renderVerifyEmail();
        bindFn = P.bindVerifyEmailEvents;
        break;
      case '#/forgot-password':
        screenHtml = P.renderForgotPassword();
        bindFn = P.bindForgotPasswordEvents;
        break;

      // V1 Food Profile
      case '#/food-profile/allergies':
        screenHtml = P.renderFoodProfileAllergies();
        bindFn = P.bindFoodProfileAllergiesEvents;
        break;
      case '#/food-profile/restrictions':
        screenHtml = P.renderFoodProfileRestrictions();
        bindFn = P.bindFoodProfileRestrictionsEvents;
        break;
      case '#/food-profile/details':
        screenHtml = P.renderFoodProfileDetails();
        bindFn = P.bindFoodProfileDetailsEvents;
        break;

      // V1 Home
      case '#/home':
        screenHtml = P.renderHome();
        bindFn = P.bindHomeEvents;
        break;

      // V2 Room Journey
      case '#/room/create':
        screenHtml = P.renderRoomCreate();
        bindFn = P.bindRoomCreateEvents;
        break;
      case '#/room/lobby-host':
        screenHtml = P.renderRoomLobbyHost();
        bindFn = P.bindRoomLobbyHostEvents;
        break;
      case '#/room/join':
        screenHtml = P.renderRoomJoinHub();
        bindFn = P.bindRoomJoinHubEvents;
        break;
      case '#/room/scan-qr':
        screenHtml = P.renderRoomScanQR();
        bindFn = P.bindRoomScanQREvents;
        break;
      case '#/room/code':
        screenHtml = P.renderRoomCode();
        bindFn = P.bindRoomCodeEvents;
        break;
      case '#/room/invite':
        screenHtml = P.renderRoomInviteScreen();
        bindFn = P.bindRoomInviteScreenEvents;
        break;
      case '#/room/preview':
        screenHtml = P.renderRoomPreview();
        bindFn = P.bindRoomPreviewEvents;
        break;
      case '#/room/lobby-member':
        screenHtml = P.renderRoomLobbyMember();
        bindFn = P.bindRoomLobbyMemberEvents;
        break;

      // V2 FoodFight Preparation & Session
      case '#/foodfight/preferences':
        screenHtml = P.renderMealPreferences();
        bindFn = P.bindMealPreferencesEvents;
        break;
      case '#/foodfight/waiting':
        screenHtml = P.renderFoodFightWaiting();
        bindFn = P.bindFoodFightWaitingEvents;
        break;
      case '#/foodfight/generating':
        screenHtml = P.renderFoodFightGenerating();
        bindFn = P.bindFoodFightGeneratingEvents;
        break;

      // V3 Boundary Shell
      case '#/recommendations':
        screenHtml = P.renderRecommendationsBoundaryShell();
        bindFn = P.bindRecommendationsBoundaryEvents;
        break;

      // Future Screens / Shell Router
      default: {
        const screen = P.findScreen(hash);
        if (screen) {
          screenHtml = P.renderFutureShell(screen);
          bindFn = P.bindFutureShellEvents;
        } else {
          screenHtml = P.renderNotFoundShell(hash);
        }
        break;
      }
    }

    appRoot.innerHTML = screenHtml;
    if (bindFn) bindFn();

    // Keep Prototype Navigator active highlight up to date
    P.updateNavigatorActive(hash);
  }

  // Expose router to prototype namespace for state-triggered re-renders
  P.renderCurrentRoute = renderCurrentRoute;

  /* ==========================================================================
     2. Application Bootstrap
     ========================================================================== */
  function initApp() {
    window.addEventListener('hashchange', renderCurrentRoute);
    P.initPrototypeNavigator();

    // Default route to #/login if blank hash
    if (!window.location.hash) {
      window.location.hash = '#/login';
    } else {
      renderCurrentRoute();
    }
  }

  // Hook into DOM ready event
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
