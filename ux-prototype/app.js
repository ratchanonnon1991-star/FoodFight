/**
 * FoodFighter UX Prototype — Application Bootstrap & Route Dispatcher
 * 
 * Orchestrates:
 *   - Route lifecycle & switch dispatcher for all 38 product screens
 *   - Top-level hash routing
 *   - Application startup & DOMContentLoaded hookup
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Main Route Switch Dispatcher (All 38 Registered Screens Live)
     ========================================================================== */
  function renderCurrentRoute() {
    const hash = window.location.hash || '#/landing';
    const appRoot = document.getElementById('app-root');
    if (!appRoot) return;

    document.body.classList.toggle('ux-lab-active', hash === '#/ux-lab');
    const prototypeProductRoutes = [...(P.WAVE1?.routes || []), ...(P.WAVE2?.routes || [])];
    document.body.classList.toggle('wave1-active', prototypeProductRoutes.includes(hash));

    // Reset window scroll on navigation
    window.scrollTo({ top: 0, behavior: 'instant' });

    let screenHtml = '';
    let bindFn = null;

    switch (hash) {
      // Wave 01 clickable product prototype (local-only)
      case '#/landing':
      case '#/login':
      case '#/register':
      case '#/verify-email':
      case '#/forgot-password':
      case '#/reset-password':
      case '#/food-profile':
      case '#/home':
      case '#/room/create':
      case '#/room/join':
      case '#/room/preview':
      case '#/room/lobby':
        screenHtml = P.renderWave1Route(hash);
        bindFn = P.bindWave1Events;
        break;

      // Wave 02 local gameplay prototype (no runtime/API dependency)
      case '#/meal-preference':
      case '#/recommendation-loading':
      case '#/food-picks':
      case '#/vote':
      case '#/winner':
      case '#/restaurant':
      case '#/restaurant/detail':
      case '#/bills':
        screenHtml = P.renderWave2Route(hash);
        bindFn = P.bindWave2Events;
        break;

      // Developer UX Lab (isolated reference surface)
      case '#/ux-lab':
        screenHtml = P.renderUXLab();
        bindFn = P.bindUXLabEvents;
        break;

      // V1 Food Profile Onboarding (3 Screens)
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

      // V2 Room Journey (8 Screens)
      case '#/room/lobby-host':
        screenHtml = P.renderRoomLobbyHost();
        bindFn = P.bindRoomLobbyHostEvents;
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
      case '#/room/lobby-member':
        screenHtml = P.renderRoomLobbyMember();
        bindFn = P.bindRoomLobbyMemberEvents;
        break;

      // V2 FoodFight Preparation & Session (3 Screens)
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

      // V3 Recommendations & Voting Journey (6 Screens)
      case '#/recommendations':
      case '#/recommendations/vote':
        screenHtml = P.renderRecommendations(1);
        bindFn = () => P.bindRecommendationsEvents(1);
        break;
      case '#/vote-result':
        screenHtml = P.renderVotingResult();
        bindFn = P.bindVotingResultEvents;
        break;
      case '#/recommendations/round-2':
        screenHtml = P.renderRecommendations(2);
        bindFn = () => P.bindRecommendationsEvents(2);
        break;
      case '#/final-vote':
        screenHtml = P.renderFinalVote();
        bindFn = P.bindFinalVoteEvents;
        break;
      case '#/final-menu':
        screenHtml = P.renderFinalMenu();
        bindFn = P.bindFinalMenuEvents;
        break;

      // V4 Restaurant Discovery & Map (3 Screens)
      case '#/restaurants':
        screenHtml = P.renderRecommendedRestaurants();
        bindFn = P.bindRecommendedRestaurantsEvents;
        break;
      case '#/restaurants/detail':
        screenHtml = P.renderRestaurantDetail();
        bindFn = P.bindRestaurantDetailEvents;
        break;
      case '#/restaurants/selected':
        screenHtml = P.renderRestaurantSelected();
        bindFn = P.bindRestaurantSelectedEvents;
        break;

      // V5 Split Bill, Receipt OCR & Payments (6 Screens)
      case '#/bill':
        screenHtml = P.renderSplitBill();
        bindFn = P.bindSplitBillEvents;
        break;
      case '#/bill/receipt':
        screenHtml = P.renderBillReceipt();
        bindFn = P.bindBillReceiptEvents;
        break;
      case '#/bill/items':
        screenHtml = P.renderBillItems();
        bindFn = P.bindBillItemsEvents;
        break;
      case '#/bill/assign':
        screenHtml = P.renderBillAssign();
        bindFn = P.bindBillAssignEvents;
        break;
      case '#/bill/summary':
        screenHtml = P.renderBillSummary();
        bindFn = P.bindBillSummaryEvents;
        break;
      case '#/bill/payment':
        screenHtml = P.renderBillPayment();
        bindFn = P.bindBillPaymentEvents;
        break;

      // V6 History, Profile & Settings (4 Screens)
      case '#/history':
        screenHtml = P.renderHistory();
        bindFn = P.bindHistoryEvents;
        break;
      case '#/bill-history':
        screenHtml = P.renderBillHistory();
        bindFn = P.bindBillHistoryEvents;
        break;
      case '#/profile':
        screenHtml = P.renderProfile();
        bindFn = P.bindProfileEvents;
        break;
      case '#/profile/food':
        screenHtml = P.renderProfileFoodEdit();
        bindFn = P.bindProfileFoodEditEvents;
        break;

      // Unknown / 404 Fallback
      default: {
        screenHtml = P.renderNotFoundShell(hash);
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

    // Default route to the product prototype if blank hash
    if (!window.location.hash) {
      window.location.hash = '#/landing';
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
