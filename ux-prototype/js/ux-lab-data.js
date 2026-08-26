/**
 * FoodFighter UX Lab - local specimen data
 *
 * This file intentionally contains presentation-only labels. It does not
 * represent an API response, a user, a room, a bill, or live gameplay state.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;

  const sourcePalette = [
    { id: 'petal', name: 'Pastel Petal', hex: '#FFC6D9', foreground: 'Blackberry Cream', text: '#48284A' },
    { id: 'apricot', name: 'Soft Apricot', hex: '#FFE1C6', foreground: 'Blackberry Cream', text: '#48284A' },
    { id: 'custard', name: 'Vanilla Custard', hex: '#FFF7AE', foreground: 'Blackberry Cream', text: '#48284A' },
    { id: 'blackberry', name: 'Blackberry Cream', hex: '#48284A', foreground: 'White', text: '#FFFFFF' },
    { id: 'mauve', name: 'Dusty Mauve', hex: '#916C80', foreground: 'White', text: '#FFFFFF' }
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'history', label: 'History', icon: 'clock' },
    { id: 'bills', label: 'Bills', icon: 'receipt' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  const sectionGroups = [
    {
      id: 'foundations',
      label: 'Foundations',
      items: [
        ['colors', 'Colors'],
        ['typography', 'Typography'],
        ['spacing', 'Spacing'],
        ['layout', 'Layout'],
        ['shape', 'Shape & elevation'],
        ['media', 'Media'],
        ['graphics', 'Organic graphics'],
        ['motion', 'Motion']
      ]
    },
    {
      id: 'components',
      label: 'Components',
      items: [
        ['buttons', 'Buttons'],
        ['forms', 'Forms'],
        ['icon-wells', 'Icon wells'],
        ['chips', 'Chips & status'],
        ['cards', 'Card families'],
        ['navigation', 'Navigation'],
        ['feedback', 'Feedback'],
        ['loading', 'Loading'],
        ['progress', 'Progress / transfer'],
        ['overlays', 'Overlays']
      ]
    },
    {
      id: 'screens',
      label: 'Screens',
      items: [
        ['screen-home', 'Home'],
        ['screen-create', 'Create Room'],
        ['screen-lobby', 'Room Lobby'],
        ['screen-picks', 'Food Picks / Vote'],
        ['screen-inventory', 'Existing screen inventory']
      ]
    },
    {
      id: 'flows',
      label: 'Flows',
      items: [['flow', 'Core FoodFight demo']]
    }
  ];

  const viewports = [
    { id: '360', label: 'Mobile 360', width: 360, kind: 'mobile' },
    { id: '375', label: 'Mobile 375', width: 375, kind: 'mobile' },
    { id: '390', label: 'Mobile 390', width: 390, kind: 'mobile' },
    { id: '430', label: 'Mobile 430', width: 430, kind: 'mobile' },
    { id: '768', label: 'Tablet 768', width: 768, kind: 'tablet' },
    { id: '1024', label: 'Desktop 1024', width: 1024, kind: 'desktop' },
    { id: '1280', label: 'Desktop 1280', width: 1280, kind: 'desktop' },
    { id: '1440', label: 'Desktop 1440', width: 1440, kind: 'desktop' }
  ];

  const scenarios = [
    { id: 'new-user', label: 'New User', description: 'Clean start with a gentle first action.' },
    { id: 'existing-user', label: 'Existing User', description: 'Returning to an active FoodFight.' },
    { id: 'host', label: 'Host', description: 'Room owner with the primary action.' },
    { id: 'member', label: 'Member', description: 'Invited participant with a ready state.' }
  ];

  const roomScenarios = ['Host Waiting', 'Host All Ready', 'Member Waiting', 'Room Full'];
  const historyScenarios = ['Empty', 'One Item', 'Many Items'];
  const billScenarios = ['No Payment', 'Partially Paid', 'All Paid', 'Closed'];

  const screenMeta = {
    home: {
      title: 'Home',
      purpose: 'A warm first step that makes the group decision feel easy.',
      primary: 'Create Room',
      secondary: 'Join Room',
      responsive: 'Mobile stacked; desktop editorial split with an image-led hero.',
      image: 'Home hero / 16:9 / 1600 x 900',
      states: 'normal, loading, empty, error',
      backend: 'Prototype only'
    },
    create: {
      title: 'Create Room',
      purpose: 'Collect the minimum room setup with calm, tonal form sections.',
      primary: 'Create Room',
      secondary: 'Back',
      responsive: 'Mobile stacked; desktop form plus contextual visual.',
      image: 'Room image / 4:3 / 1200 x 900',
      states: 'normal, loading, validation error, disabled',
      backend: 'Prototype only'
    },
    lobby: {
      title: 'Room Lobby',
      purpose: 'Give the group a clear room identity, invite path, and ready signal.',
      primary: 'Start FoodFight',
      secondary: 'Share room',
      responsive: 'Mobile groups identity, code, members; desktop uses two columns.',
      image: 'Room image / 4:3 / 1200 x 900',
      states: 'waiting, all ready, room full',
      backend: 'Prototype only'
    },
    picks: {
      title: 'Food Picks / Vote',
      purpose: 'Make each meal option easy to scan, compare, and choose.',
      primary: 'OK',
      secondary: 'Pass',
      responsive: 'Mobile single choice; desktop horizontal comparison cards.',
      image: 'Meal pick / 1:1 or 4:3',
      states: 'default, hover, pressed, selected, passed',
      backend: 'Design candidate - not runtime capability'
    }
  };

  const mediaSlots = [
    { id: 'hero', label: 'HOME HERO', ratio: '16:9', size: '1600 x 900', tone: 'petal', icon: 'sparkles' },
    { id: 'room', label: 'ROOM IMAGE', ratio: '4:3', size: '1200 x 900', tone: 'apricot', icon: 'users' },
    { id: 'food', label: 'FOOD CARD', ratio: '4:3', size: '960 x 720', tone: 'custard', icon: 'utensils' },
    { id: 'meal', label: 'MEAL PICK', ratio: '1:1', size: '800 x 800', tone: 'petal', icon: 'heart' },
    { id: 'recent', label: 'RECENT FOODFIGHT', ratio: '4:3', size: '960 x 720', tone: 'apricot', icon: 'clock' },
    { id: 'winner', label: 'WINNER', ratio: '4:3', size: '1200 x 900', tone: 'custard', icon: 'trophy' },
    { id: 'avatar', label: 'AVATAR', ratio: '1:1', size: '320 x 320', tone: 'mauve', icon: 'user' },
    { id: 'portrait', label: 'PORTRAIT', ratio: '3:4', size: '900 x 1200', tone: 'petal', icon: 'image' }
  ];

  const flowSteps = [
    ['home', 'Home'],
    ['create', 'Create Room'],
    ['lobby', 'Lobby'],
    ['preferences', 'Preferences'],
    ['picks', 'Food Picks'],
    ['vote', 'Vote'],
    ['result', 'Result'],
    ['restaurant', 'Restaurant'],
    ['bill', 'Bill'],
    ['history', 'History']
  ];

  const copy = {
    en: {
      lab: 'FoodFighter UX Lab',
      labSub: 'Visual reference prototype · local only',
      candidate: 'DESIGN CANDIDATE',
      prototypeOnly: 'PROTOTYPE ONLY',
      sourceOfTruth: 'Soft editorial food social',
      greeting: 'Good evening, Pure',
      headline: 'What are we eating today?',
      thaiHeadline: 'กินอะไรดีวันนี้?',
      create: 'Create Room',
      join: 'Join Room',
      current: 'Current FoodFight',
      recent: 'Recent FoodFights',
      continue: 'Continue',
      lobby: 'Lobby',
      waiting: 'Waiting',
      ready: 'Ready',
      notReady: 'Not Ready',
      selected: 'Selected',
      winner: 'Winner',
      viewAll: 'View all',
      localData: 'Static local specimen data. No API or backend connection.',
      toggleReady: "I'm ready",
      reveal: 'Reveal result',
      selectMeal: 'Select meal',
      retry: 'Retry',
      open: 'Open',
      close: 'Close'
    },
    th: {
      lab: 'FoodFighter UX Lab',
      labSub: 'ต้นแบบอ้างอิงภาพ · ข้อมูลจำลองภายในเครื่อง',
      candidate: 'DESIGN CANDIDATE',
      prototypeOnly: 'PROTOTYPE ONLY',
      sourceOfTruth: 'โซเชียลอาหารโทนอุ่นแบบ editorial',
      greeting: 'สวัสดีตอนเย็น Pure',
      headline: 'วันนี้กินอะไรดี?',
      thaiHeadline: 'กินอะไรดีวันนี้?',
      create: 'สร้างห้อง',
      join: 'เข้าร่วมห้อง',
      current: 'FoodFight ปัจจุบัน',
      recent: 'FoodFight ล่าสุด',
      continue: 'ไปต่อ',
      lobby: 'ล็อบบี้',
      waiting: 'กำลังรอ',
      ready: 'พร้อมแล้ว',
      notReady: 'ยังไม่พร้อม',
      selected: 'เลือกแล้ว',
      winner: 'ผู้ชนะ',
      viewAll: 'ดูทั้งหมด',
      localData: 'ข้อมูลจำลองภายในเครื่อง ไม่มีการเชื่อมต่อ API หรือ backend',
      toggleReady: 'ฉันพร้อมแล้ว',
      reveal: 'ดูผลลัพธ์',
      selectMeal: 'เลือกเมนู',
      retry: 'ลองอีกครั้ง',
      open: 'เปิด',
      close: 'ปิด'
    }
  };

  P.UX_LAB = {
    sourcePalette,
    navItems,
    sectionGroups,
    viewports,
    scenarios,
    roomScenarios,
    historyScenarios,
    billScenarios,
    screenMeta,
    mediaSlots,
    flowSteps,
    copy
  };
})();
