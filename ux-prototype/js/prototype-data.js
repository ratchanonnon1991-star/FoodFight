/**
 * FoodFighter UX Prototype — Data Store & Static Constants
 * 
 * Defines SCREEN_REGISTRY, default prototype state, option constants,
 * and demo datasets without active DOM or navigation behavior.
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  /* ==========================================================================
     1. Prototype Screen Registry & Metadata (38 Registered Routes)
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

    // ROOM FLOW (Implemented V2)
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

    // FOODFIGHT SESSION (Implemented V2)
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
      description: 'AI synthesis screen with animated radar pulse, constraint summary, and transition to recommendations.'
    },

    // MENU RECOMMENDATIONS & VOTING (Implemented V3)
    {
      id: 'recommendations',
      hash: '#/recommendations',
      title: 'Recommended Menus — Round 1',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'Top 2 AI-recommended dishes (Menu A & B) with match reasons, ingredient tags, and OK/PASS voting.'
    },
    {
      id: 'recommendations-vote',
      hash: '#/recommendations/vote',
      title: 'OK / PASS Voting',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'Interactive OK / PASS voting interface for Active Members.'
    },
    {
      id: 'vote-result',
      hash: '#/vote-result',
      title: 'Voting Result',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'Vote outcome tally showing 60% threshold success or trigger for Recommend Again.'
    },
    {
      id: 'recommendations-round-2',
      hash: '#/recommendations/round-2',
      title: 'Round 2 / Recommend Again',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'AI generates 2 brand-new alternative dishes (Menu C & D) when round 1 lacks consensus.'
    },
    {
      id: 'final-vote',
      hash: '#/final-vote',
      title: 'Final Vote (4 Dishes)',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'Tie-break round presenting all 4 candidate dishes for single-choice selection or Host tie break.'
    },
    {
      id: 'final-menu',
      hash: '#/final-menu',
      title: 'Final Menu Winner',
      category: 'Recommendation',
      status: 'IMPLEMENTED',
      description: 'Celebratory winning dish announcement and transition to restaurant discovery (V4 boundary).'
    },

    // RESTAURANTS & MAP (Future V4)
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
     2. Candidate Menu Catalogues (4 Distinct Dishes)
     ========================================================================== */
  const CANDIDATE_MENUS = {
    'menu-a': {
      id: 'menu-a',
      round: 1,
      name: 'Krapow Wagyu Beef & Crispy Egg',
      thaiName: 'ข้าวกะเพราเนื้อวากิวไข่ดาวกรอบ',
      cuisine: 'Thai / อาหารไทย',
      category: 'Rice / ข้าว',
      price: '฿฿ (180 - 240 THB)',
      style: 'Casual Dining',
      icon: '🥩',
      visualClass: 'visual-krapow',
      tags: ['Spicy / เผ็ดจัดจ้าน', 'Peanut-Free', 'High Protein', 'Halal-Friendly Beef'],
      matchReason: 'Matches cravings for savory Thai dishes, fits within ฿฿ budget, and avoids all group peanut allergens.'
    },
    'menu-b': {
      id: 'menu-b',
      round: 1,
      name: 'Tonkotsu Chashu Ramen',
      thaiName: 'ราเมงทงคตสึหมูชาชูไข่ยางมะตูม',
      cuisine: 'Japanese / ญี่ปุ่น',
      category: 'Noodles / ก๋วยเตี๋ยว',
      price: '฿฿ (220 - 290 THB)',
      style: 'Air-Conditioned',
      icon: '🍜',
      visualClass: 'visual-ramen',
      tags: ['Noodles / เส้น', 'Rich Broth / น้ำซุปเข้มข้น', 'Comfort Food', 'Shellfish-Free'],
      matchReason: 'Satisfies member cravings for rich comforting noodle soup in an air-conditioned setting.'
    },
    'menu-c': {
      id: 'menu-c',
      round: 2,
      name: 'Kurobuta Shabu-Shabu Set',
      thaiName: 'ชุดชาบูหมูคุโรบุตะน้ำดำ & ซุปใส',
      cuisine: 'Japanese / ญี่ปุ่น',
      category: 'Hot Pot / ชาบู-สุกี้',
      price: '฿฿ (299 - 399 THB)',
      style: 'Casual Buffet / Dine-in',
      icon: '🍲',
      visualClass: 'visual-shabu',
      tags: ['Hot Pot / ชาบู', 'Group Sharing / แชร์กันได้', 'Low Sodium Option', 'Dairy-Free'],
      matchReason: 'Group sharing hot-pot meal with customizable broth and dips, accommodating personal sodium limits.'
    },
    'menu-d': {
      id: 'menu-d',
      round: 2,
      name: 'Stir-Fried Seafood Tom Yum',
      thaiName: 'ต้มยำซีฟู้ดผัดแห้งราดข้าวสวย',
      cuisine: 'Thai / อาหารไทย',
      category: 'Seafood & Rice / ซีฟู้ด',
      price: '฿฿ (160 - 220 THB)',
      style: 'Street Food / Air-Con',
      icon: '🦐',
      visualClass: 'visual-tomyum',
      tags: ['Seafood / ซีฟู้ด', 'Aromatic Herbs / สมุนไพร', 'Spicy', 'Gluten-Aware'],
      matchReason: 'Bold Thai flavors with fresh shrimp and squid, dairy-free with jasmine rice.'
    }
  };

  /* ==========================================================================
     3. Prototype Initial State Definition
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
        { id: 'user', name: 'Alex Johnson (You)', initials: 'AJ', role: 'Host', isReady: true, isActive: true, hasSubmitted: true, colorClass: 'avatar-petal' },
        { id: 'maya', name: 'Maya Lin', initials: 'ML', role: 'Member', isReady: true, isActive: true, hasSubmitted: true, colorClass: 'avatar-apricot' },
        { id: 'nina', name: 'Nina Patel', initials: 'NP', role: 'Member', isReady: true, isActive: true, hasSubmitted: true, colorClass: 'avatar-custard' },
        { id: 'ken', name: 'Ken Tanaka', initials: 'KT', role: 'Member', isReady: false, isActive: false, hasSubmitted: false, colorClass: 'avatar-mauve' }
      ],
      simulatedTwoMinutesElapsed: false,
      foodFightStarted: true,
      roomJoined: true
    },
    mealPreferences: {
      foodTypes: ['Noodles / ก๋วยเตี๋ยว', 'Hot Pot / ชาบู-สุกี้'],
      cuisines: ['Thai / อาหารไทย', 'Japanese / ญี่ปุ่น'],
      ingredients: ['Chicken / ไก่', 'Seafood & Shrimp / กุ้ง-ซีฟู้ด'],
      priceLevel: '฿฿',
      restaurantStyles: ['Casual Dining / ร้านนั่งสบาย', 'Air-Conditioned / ห้องแอร์'],
      otherNotes: 'Prefer places with air conditioning and easy parking'
    },
    recommendation: {
      round: 1, // 1 | 2
      recommendAgainUsed: false,
      roundVotes: {
        1: {
          user: { 'menu-a': 'OK', 'menu-b': null },
          maya: { 'menu-a': 'OK', 'menu-b': 'PASS' },
          nina: { 'menu-a': 'OK', 'menu-b': 'PASS' },
          ken: { 'menu-a': null, 'menu-b': null } // observer or unvoted
        },
        2: {
          user: { 'menu-c': null, 'menu-d': null },
          maya: { 'menu-c': 'OK', 'menu-d': 'PASS' },
          nina: { 'menu-c': 'OK', 'menu-d': 'OK' },
          ken: { 'menu-c': null, 'menu-d': null }
        }
      },
      finalVotes: {
        user: 'menu-a',
        maya: 'menu-a',
        nina: 'menu-c',
        ken: 'menu-c'
      },
      tieBreakWinnerId: null,
      finalWinnerMenuId: 'menu-a'
    }
  };

  /* ==========================================================================
     4. Static Option Catalogues
     ========================================================================== */
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

  const SUGGESTION_PILLS = [
    { text: '🌶️ Spicy food lover', tag: 'Spicy' },
    { text: '🚫 No coriander', tag: 'No Cilantro' },
    { text: '🧂 Low sodium', tag: 'Low Sodium' },
    { text: '🥩 High protein', tag: 'High Protein' },
    { text: '🍜 Noodle fan', tag: 'Noodles' }
  ];

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

  // Expose to Prototype Namespace
  window.FFPrototype.SCREEN_REGISTRY = SCREEN_REGISTRY;
  window.FFPrototype.CANDIDATE_MENUS = CANDIDATE_MENUS;
  window.FFPrototype.STORAGE_KEY = STORAGE_KEY;
  window.FFPrototype.INITIAL_STATE = INITIAL_STATE;
  window.FFPrototype.ALLERGY_OPTIONS = ALLERGY_OPTIONS;
  window.FFPrototype.RESTRICTION_OPTIONS = RESTRICTION_OPTIONS;
  window.FFPrototype.SUGGESTION_PILLS = SUGGESTION_PILLS;
  window.FFPrototype.PREF_FOOD_TYPES = PREF_FOOD_TYPES;
  window.FFPrototype.PREF_CUISINES = PREF_CUISINES;
  window.FFPrototype.PREF_INGREDIENTS = PREF_INGREDIENTS;
  window.FFPrototype.PREF_PRICE_LEVELS = PREF_PRICE_LEVELS;
  window.FFPrototype.PREF_STYLES = PREF_STYLES;

})();
