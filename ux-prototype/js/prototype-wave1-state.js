/**
 * FoodFighter - Wave 01 product prototype state
 *
 * This is deliberately smaller than the production data model. It exists to
 * make the onboarding -> room journey replayable without a network, database,
 * authentication service, or gameplay implementation.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;

  const deepClone = (value) => JSON.parse(JSON.stringify(value));

  const copy = {
    th: {
      brandTagline: 'ช่วยกลุ่มเพื่อนตัดสินใจเรื่องอาหารด้วยกัน',
      localPrototype: 'ต้นแบบในเครื่องเท่านั้น',
      prototypeUtility: 'Prototype utility',
      uxLab: 'เปิด UX Lab',
      resetDemo: 'รีเซ็ตเดโม',
      motionOn: 'Motion ON',
      reducedMotion: 'ลดการเคลื่อนไหว',
      scenario: 'สถานการณ์',
      newUser: 'ผู้ใช้ใหม่',
      existingUser: 'ผู้ใช้เดิม',
      host: 'โฮสต์',
      member: 'สมาชิก',
      back: 'ย้อนกลับ',
      cancel: 'ยกเลิก',
      close: 'ปิด',
      continue: 'ดำเนินการต่อ',
      save: 'บันทึก',
      loading: 'กำลังเตรียม...',
      retry: 'ลองอีกครั้ง',
      share: 'แชร์',
      copy: 'คัดลอก',
      copied: 'คัดลอกแล้ว',
      qr: 'QR Code',
      ready: 'พร้อมแล้ว',
      notReady: 'ยังไม่พร้อม',
      waiting: 'กำลังรอ',
      allReady: 'ทุกคนพร้อมแล้ว',
      selected: 'เลือกแล้ว',
      notifications: 'การแจ้งเตือน',
      account: 'บัญชีของฉัน',
      openMenu: 'เปิดเมนู',
      home: 'หน้าแรก',
      history: 'ประวัติ',
      bills: 'บิล',
      profile: 'โปรไฟล์',
      landingKicker: 'ตัดสินใจมื้ออาหารด้วยกัน',
      landingHeadline: 'มื้อนี้กินอะไรดี?',
      landingBody: 'FoodFighter ช่วยทุกคนในกลุ่มเลือกมื้อที่อยากกินได้ง่ายขึ้น ตั้งแต่ห้องแรกจนถึงโต๊ะอาหาร',
      getStarted: 'เริ่มต้นใช้งาน',
      logIn: 'เข้าสู่ระบบ',
      enterDemo: 'เข้าเดโม',
      landingNote: 'ต้นแบบนี้ทำงานด้วยข้อมูลจำลองในเครื่อง ไม่มีบัญชีหรือ API จริง',
      landingStepOne: 'สร้างโปรไฟล์อาหาร',
      landingStepTwo: 'ชวนเพื่อนเข้าห้อง',
      landingStepThree: 'พร้อมตัดสินใจ',
      registerTitle: 'สร้างบัญชีของคุณ',
      registerSubtitle: 'เริ่มชวนเพื่อนมาเลือกมื้ออาหารที่ลงตัว',
      loginTitle: 'ยินดีต้อนรับกลับมา',
      loginSubtitle: 'เข้าสู่ระบบเพื่อกลับไปยังโต๊ะของคุณ',
      fullName: 'ชื่อที่ใช้แสดง',
      email: 'อีเมล',
      password: 'รหัสผ่าน',
      confirmPassword: 'ยืนยันรหัสผ่าน',
      terms: 'ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว',
      createAccount: 'สร้างบัญชี',
      alreadyAccount: 'มีบัญชีอยู่แล้ว?',
      noAccount: 'ยังไม่มีบัญชี?',
      passwordHint: 'อย่างน้อย 8 ตัวอักษร มีตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ',
      showPassword: 'แสดงรหัสผ่าน',
      hidePassword: 'ซ่อนรหัสผ่าน',
      forgotPassword: 'ลืมรหัสผ่าน?',
      demoCredentials: 'เดโม: pure@example.com / Password123',
      login: 'เข้าสู่ระบบ',
      register: 'สมัครสมาชิก',
      verifyTitle: 'ยืนยันอีเมลของคุณ',
      verifySubtitle: 'กรอกรหัส 6 หลักที่ส่งไปยัง',
      verifyCode: 'รหัสยืนยัน',
      verifyHint: 'รหัสสำหรับเดโม: 123456',
      useDemoCode: 'ใช้รหัสเดโม',
      verify: 'ยืนยันอีเมล',
      resend: 'ส่งรหัสใหม่',
      resendDone: 'ส่งรหัสใหม่แล้ว',
      forgotTitle: 'ลืมรหัสผ่าน',
      forgotSubtitle: 'กรอกอีเมลเพื่อรับขั้นตอนตั้งรหัสผ่านใหม่',
      sendReset: 'ส่งลิงก์รีเซ็ต',
      resetSentTitle: 'ส่งคำแนะนำแล้ว',
      resetSentBody: 'เดโมนี้ไม่ส่งอีเมลจริง กดต่อเพื่อดูหน้าตั้งรหัสผ่านใหม่',
      continueToReset: 'ไปตั้งรหัสผ่านใหม่',
      resetTitle: 'ตั้งรหัสผ่านใหม่',
      resetSubtitle: 'สร้างรหัสผ่านใหม่สำหรับเดโมนี้',
      resetPassword: 'ตั้งรหัสผ่าน',
      resetSuccess: 'ตั้งรหัสผ่านเรียบร้อยแล้ว',
      returnToLogin: 'กลับไปเข้าสู่ระบบ',
      foodProfileTitle: 'รู้จักรสนิยมของคุณ',
      foodProfileSubtitle: 'ข้อมูลนี้ช่วยให้คำแนะนำในอนาคตตรงกับกลุ่มมากขึ้น',
      allergies: 'อาหารที่แพ้',
      allergiesHelp: 'เลือกทั้งหมดที่เกี่ยวข้อง หรือเลือกไม่มีอาการแพ้',
      noAllergies: 'ไม่มีประวัติแพ้อาหาร',
      restrictions: 'ข้อจำกัดด้านอาหาร',
      restrictionsHelp: 'เลือกข้อจำกัดด้านศาสนา สุขภาพ หรือรูปแบบการกิน',
      noRestrictions: 'ไม่มีข้อจำกัดด้านอาหาร',
      details: 'รายละเอียดเพิ่มเติม',
      detailsHelp: 'บอกความชอบเล็ก ๆ น้อย ๆ ให้ FoodFighter รู้จักคุณมากขึ้น',
      notes: 'ความชอบและหมายเหตุ',
      notesPlaceholder: 'เช่น ชอบเผ็ดปานกลาง ไม่ชอบผักชี...',
      optional: 'ไม่บังคับ',
      next: 'ถัดไป',
      finishProfile: 'บันทึกและไปหน้าแรก',
      step: 'ขั้นตอน',
      homeGreeting: 'สวัสดี, {name}',
      homeHeadline: 'วันนี้กินอะไรดี?',
      homeBody: 'ชวนเพื่อนมาช่วยกันเลือกมื้อที่ทุกคนอยากกิน',
      createRoom: 'สร้างห้อง',
      joinRoom: 'เข้าร่วมห้อง',
      createRoomBody: 'เป็นโฮสต์ ชวนเพื่อนเข้ามาตัดสินใจด้วยกัน',
      joinRoomBody: 'ใช้รหัสห้องเพื่อเข้าร่วมโต๊ะของเพื่อน',
      currentFoodFight: 'FoodFight ปัจจุบัน',
      noCurrentRoom: 'ยังไม่มีห้องที่กำลังใช้งาน',
      noCurrentRoomBody: 'เริ่มห้องใหม่หรือเข้าร่วมกับเพื่อนเพื่อเริ่มมื้อถัดไป',
      recentFoodFights: 'FoodFights ล่าสุด',
      viewAll: 'ดูทั้งหมด',
      openLobby: 'เปิดล็อบบี้',
      profileReady: 'โปรไฟล์อาหารพร้อมแล้ว',
      landingHero: 'ภาพบรรยากาศมื้ออาหาร',
      createRoomTitle: 'ชวนทุกคนมาที่โต๊ะ',
      createRoomSubtitle: 'ตั้งค่าห้องแบบสบาย ๆ แล้วส่งต่อให้เพื่อน',
      roomName: 'ชื่อห้อง',
      roomNameHelp: 'ชื่อที่เพื่อนจะเห็นในคำเชิญ',
      maxMembers: 'จำนวนสมาชิกสูงสุด',
      maxMembersHelp: 'กำหนดจำนวนคนที่เข้าร่วมได้',
      location: 'สถานที่',
      locationHelp: 'ใช้เป็นจุดตั้งต้นในการค้นหาร้านอาหาร',
      radius: 'รัศมีค้นหา',
      radiusHelp: 'ค้นหาร้านอาหารภายในระยะนี้',
      dateTime: 'วันและเวลา',
      dateTimeHelp: 'นัดหมายมื้ออาหารของกลุ่ม',
      useLocation: 'ใช้ตำแหน่งปัจจุบัน',
      createAndPreview: 'ตรวจสอบห้อง',
      joinTitle: 'เข้าร่วมโต๊ะของเพื่อน',
      joinSubtitle: 'กรอกรหัสห้อง 6 ตัวอักษรเพื่อดูรายละเอียดก่อนเข้า',
      roomCode: 'รหัสห้อง',
      roomCodeHint: 'รหัสเดโม: FF-4827',
      findRoom: 'ค้นหาห้อง',
      previewTitle: 'ตรวจสอบห้องก่อนเข้า',
      previewSubtitle: 'ดูรายละเอียดให้เรียบร้อย แล้วค่อยไปที่ล็อบบี้',
      roomFound: 'พบห้องแล้ว',
      hostedBy: 'โฮสต์โดย',
      members: 'สมาชิก',
      within: 'ภายใน',
      confirmCreate: 'สร้างห้องและไปล็อบบี้',
      confirmJoin: 'เข้าร่วมห้องและไปล็อบบี้',
      editDetails: 'แก้ไขรายละเอียด',
      lobbyTitle: 'ล็อบบี้ห้อง',
      lobbySubtitle: 'ชวนเพื่อนให้ครบ แล้วเตรียมตัวให้พร้อม',
      inviteFriends: 'ชวนเพื่อน',
      inviteBody: 'แชร์รหัส ลิงก์ หรือ QR ให้เพื่อนเข้ามา',
      memberList: 'รายชื่อสมาชิก',
      startFoodFight: 'เริ่ม FoodFight',
      waitingForReady: 'กำลังรอสมาชิกให้พร้อม',
      allMembersReady: 'ทุกคนพร้อมสำหรับมื้อถัดไป',
      toggleReady: 'กดเพื่อเปลี่ยนสถานะ',
      simulateAllReady: 'จำลองทุกคนพร้อม',
      roomScenarios: 'สถานการณ์ล็อบบี้',
      hostWaiting: 'โฮสต์กำลังรอ',
      hostAllReady: 'โฮสต์ / ทุกคนพร้อม',
      memberWaiting: 'สมาชิกกำลังรอ',
      roomFull: 'ห้องเต็ม',
      shareRoom: 'แชร์ห้อง',
      shareBody: 'ส่งรหัสนี้ให้เพื่อนในกลุ่ม',
      roomCodeCopied: 'คัดลอกรหัสห้องแล้ว',
      qrTitle: 'QR สำหรับเข้าห้อง',
      qrBody: 'นี่เป็นภาพ QR จำลองสำหรับต้นแบบเท่านั้น',
      prototypeQr: 'PROTOTYPE QR',
      nextWave: 'คลื่นต้นแบบถัดไป',
      mealPreference: 'Meal Preference',
      nextWaveBody: 'เส้นทางนี้จะเปิดใน Wave 02 เมื่อส่วนเลือกอาหารพร้อมใช้งาน',
      openUxLab: 'กลับไปดู UX Lab',
      invalidEmail: 'กรุณากรอกอีเมลให้ถูกต้อง',
      required: 'กรุณากรอกข้อมูลนี้',
      passwordShort: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
      passwordMismatch: 'รหัสผ่านไม่ตรงกัน',
      termsRequired: 'กรุณายอมรับเงื่อนไขการใช้งาน',
      wrongOtp: 'รหัสไม่ถูกต้อง ลองใช้ 123456 สำหรับเดโม',
      roomCodeInvalid: 'ไม่พบห้องนี้ ลองใช้ FF-4827 สำหรับเดโม',
      profileRequired: 'เลือกอย่างน้อยหนึ่งรายการ หรือเลือกไม่มี',
      roomNameRequired: 'ใส่ชื่อห้องก่อนดำเนินการต่อ',
      locationRequired: 'ใส่สถานที่ก่อนดำเนินการต่อ',
      resetSuccessToast: 'รีเซ็ตเดโมแล้ว เริ่มจากหน้า Landing ได้เลย',
      localOnly: 'ข้อมูลจำลองในเครื่อง · ไม่มี API',
      designCandidate: 'DESIGN CANDIDATE',
      prototypeOnly: 'PROTOTYPE ONLY'
    },
    en: {
      brandTagline: 'Make the group food decision together',
      localPrototype: 'Local prototype only',
      prototypeUtility: 'Prototype utility',
      uxLab: 'Open UX Lab',
      resetDemo: 'Reset demo',
      motionOn: 'Motion ON',
      reducedMotion: 'Reduced Motion',
      scenario: 'Scenario',
      newUser: 'New User',
      existingUser: 'Existing User',
      host: 'Host',
      member: 'Member',
      back: 'Back',
      cancel: 'Cancel',
      close: 'Close',
      continue: 'Continue',
      save: 'Save',
      loading: 'Preparing...',
      retry: 'Try again',
      share: 'Share',
      copy: 'Copy',
      copied: 'Copied',
      qr: 'QR Code',
      ready: 'Ready',
      notReady: 'Not Ready',
      waiting: 'Waiting',
      allReady: 'Everyone ready',
      selected: 'Selected',
      notifications: 'Notifications',
      account: 'My account',
      openMenu: 'Open menu',
      home: 'Home',
      history: 'History',
      bills: 'Bills',
      profile: 'Profile',
      landingKicker: 'Decide dinner together',
      landingHeadline: 'What are we eating today?',
      landingBody: 'FoodFighter helps every person in the group find a meal everyone can get behind — from the first room to the table.',
      getStarted: 'Get started',
      logIn: 'Log in',
      enterDemo: 'Enter demo',
      landingNote: 'This prototype uses local specimen data. No real account or API is connected.',
      landingStepOne: 'Build your food profile',
      landingStepTwo: 'Invite your people',
      landingStepThree: 'Decide together',
      registerTitle: 'Create your account',
      registerSubtitle: 'Start inviting friends to a meal everyone wants',
      loginTitle: 'Welcome back',
      loginSubtitle: 'Log in to return to your table',
      fullName: 'Display name',
      email: 'Email address',
      password: 'Password',
      confirmPassword: 'Confirm password',
      terms: 'I agree to the Terms of Use and Privacy Policy',
      createAccount: 'Create account',
      alreadyAccount: 'Already have an account?',
      noAccount: "Don't have an account?",
      passwordHint: 'At least 8 characters with uppercase, number, and special character',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      forgotPassword: 'Forgot password?',
      demoCredentials: 'Demo: pure@example.com / Password123',
      login: 'Log in',
      register: 'Register',
      verifyTitle: 'Verify your email',
      verifySubtitle: 'Enter the 6-digit code sent to',
      verifyCode: 'Verification code',
      verifyHint: 'Demo code: 123456',
      useDemoCode: 'Use demo code',
      verify: 'Verify email',
      resend: 'Resend code',
      resendDone: 'Code resent',
      forgotTitle: 'Forgot password',
      forgotSubtitle: 'Enter your email to receive reset instructions',
      sendReset: 'Send reset link',
      resetSentTitle: 'Instructions are ready',
      resetSentBody: 'This prototype does not send email. Continue to preview the reset password screen.',
      continueToReset: 'Continue to reset',
      resetTitle: 'Reset your password',
      resetSubtitle: 'Create a new password for this prototype',
      resetPassword: 'Reset password',
      resetSuccess: 'Password reset complete',
      returnToLogin: 'Return to log in',
      foodProfileTitle: 'Tell us what you like',
      foodProfileSubtitle: 'This helps future recommendations feel right for your group',
      allergies: 'Food allergies',
      allergiesHelp: 'Select all that apply, or choose no allergies',
      noAllergies: 'I have no food allergies',
      restrictions: 'Dietary restrictions',
      restrictionsHelp: 'Choose religious, health, or lifestyle preferences',
      noRestrictions: 'I have no dietary restrictions',
      details: 'A little more detail',
      detailsHelp: 'Add a note so FoodFighter can understand your table',
      notes: 'Preferences and notes',
      notesPlaceholder: 'e.g. Medium spice, no cilantro...',
      optional: 'Optional',
      next: 'Continue',
      finishProfile: 'Save and go home',
      step: 'Step',
      homeGreeting: 'Good evening, {name}',
      homeHeadline: 'What are we eating today?',
      homeBody: 'Invite your people and find a meal everyone wants',
      createRoom: 'Create room',
      joinRoom: 'Join room',
      createRoomBody: 'Host a table and decide together',
      joinRoomBody: 'Use a room code to join your people',
      currentFoodFight: 'Current FoodFight',
      noCurrentRoom: 'No active room yet',
      noCurrentRoomBody: 'Start a new room or join a friend for the next meal',
      recentFoodFights: 'Recent FoodFights',
      viewAll: 'View all',
      openLobby: 'Open lobby',
      profileReady: 'Food profile ready',
      landingHero: 'A shared meal moment',
      createRoomTitle: 'Bring everyone to the table',
      createRoomSubtitle: 'Set up a relaxed room, then pass it to your friends',
      roomName: 'Room name',
      roomNameHelp: 'The name friends will see in the invite',
      maxMembers: 'Max members',
      maxMembersHelp: 'Set the upper limit for your table',
      location: 'Location',
      locationHelp: 'A starting point for finding restaurants',
      radius: 'Search radius',
      radiusHelp: 'Look for restaurants within this distance',
      dateTime: 'Date and time',
      dateTimeHelp: 'When the group is meeting for the meal',
      useLocation: 'Use current location',
      createAndPreview: 'Review room',
      joinTitle: 'Join your friends at the table',
      joinSubtitle: 'Enter the 6-character room code to review it first',
      roomCode: 'Room code',
      roomCodeHint: 'Demo code: FF-4827',
      findRoom: 'Find room',
      previewTitle: 'Review before you join',
      previewSubtitle: 'Check the details, then head into the lobby',
      roomFound: 'Room found',
      hostedBy: 'Hosted by',
      members: 'Members',
      within: 'Within',
      confirmCreate: 'Create room and enter lobby',
      confirmJoin: 'Join room and enter lobby',
      editDetails: 'Edit details',
      lobbyTitle: 'Room lobby',
      lobbySubtitle: 'Invite your people and get the table ready',
      inviteFriends: 'Invite friends',
      inviteBody: 'Share the code, link, or QR with your people',
      memberList: 'Member list',
      startFoodFight: 'Start FoodFight',
      waitingForReady: 'Waiting for the table to be ready',
      allMembersReady: 'Everyone is ready for the next meal',
      toggleReady: 'Tap to change your status',
      simulateAllReady: 'Simulate everyone ready',
      roomScenarios: 'Lobby scenarios',
      hostWaiting: 'Host Waiting',
      hostAllReady: 'Host / All Ready',
      memberWaiting: 'Member Waiting',
      roomFull: 'Room Full',
      shareRoom: 'Share this room',
      shareBody: 'Send this code to your group',
      roomCodeCopied: 'Room code copied',
      qrTitle: 'QR for this room',
      qrBody: 'This is a visual QR placeholder for the prototype only',
      prototypeQr: 'PROTOTYPE QR',
      nextWave: 'Next prototype wave',
      mealPreference: 'Meal Preference',
      nextWaveBody: 'This path will open in Wave 02 when food selection is ready',
      openUxLab: 'Return to UX Lab',
      invalidEmail: 'Enter a valid email address',
      required: 'This field is required',
      passwordShort: 'Password must be at least 8 characters',
      passwordMismatch: 'Passwords do not match',
      termsRequired: 'Accept the terms to continue',
      wrongOtp: 'That code is not right. Use 123456 for the demo',
      roomCodeInvalid: 'Room not found. Use FF-4827 for the demo',
      profileRequired: 'Choose at least one option, or choose none',
      roomNameRequired: 'Add a room name to continue',
      locationRequired: 'Add a location to continue',
      resetSuccessToast: 'Demo reset. Start again from Landing.',
      localOnly: 'Local specimen data · no API',
      designCandidate: 'DESIGN CANDIDATE',
      prototypeOnly: 'PROTOTYPE ONLY'
    }
  };

  const allergies = [
    { id: 'seafood', en: 'Seafood', th: 'อาหารทะเล' },
    { id: 'peanut', en: 'Peanut', th: 'ถั่วลิสง' },
    { id: 'tree_nuts', en: 'Tree nuts', th: 'ถั่วเปลือกแข็ง' },
    { id: 'dairy', en: 'Dairy', th: 'ผลิตภัณฑ์นม' },
    { id: 'egg', en: 'Egg', th: 'ไข่' },
    { id: 'soy', en: 'Soy', th: 'ถั่วเหลือง' },
    { id: 'wheat_gluten', en: 'Wheat / Gluten', th: 'แป้งสาลี / กลูเตน' },
    { id: 'sesame', en: 'Sesame', th: 'งา' }
  ];

  const restrictions = [
    { id: 'vegetarian', en: 'Vegetarian', th: 'มังสวิรัติ' },
    { id: 'vegan', en: 'Vegan', th: 'วีแกน' },
    { id: 'pescatarian', en: 'Pescatarian', th: 'เพสคาทาเรียน' },
    { id: 'gluten_free', en: 'Gluten-free', th: 'ปลอดกลูเตน' },
    { id: 'halal', en: 'Halal only', th: 'ฮาลาล' },
    { id: 'kosher', en: 'Kosher', th: 'โคเชอร์' },
    { id: 'no_pork', en: 'No pork', th: 'ไม่ทานหมู' },
    { id: 'no_beef', en: 'No beef', th: 'ไม่ทานเนื้อวัว' }
  ];

  const mediaSlots = {
    landing: { label: 'LANDING HERO', purpose: 'entry warmth', ratio: '16:9', size: '1600 × 900', tone: 'petal' },
    home: { label: 'HOME HERO', purpose: 'food-led home entry', ratio: '16:9', size: '1600 × 900', tone: 'apricot' },
    recent: { label: 'RECENT FOODFIGHT', purpose: 'recent context', ratio: '4:3', size: '960 × 720', tone: 'custard' },
    create: { label: 'CREATE ROOM CONTEXT', purpose: 'social setup', ratio: '4:3', size: '1200 × 900', tone: 'apricot' },
    join: { label: 'JOIN ROOM SOCIAL', purpose: 'invite context', ratio: '4:3', size: '1200 × 900', tone: 'petal' },
    lobby: { label: 'ROOM / LOBBY', purpose: 'room identity', ratio: '4:3', size: '1200 × 900', tone: 'custard' },
    meal: { label: 'MEAL PICK', purpose: 'food decision', ratio: '4:3', size: '960 × 720', tone: 'petal' },
    restaurant: { label: 'RESTAURANT', purpose: 'selection context', ratio: '4:3', size: '1200 × 900', tone: 'apricot' },
    avatar: { label: 'AVATAR', purpose: 'member identity', ratio: '1:1', size: '320 × 320', tone: 'mauve' },
    receipt: { label: 'RECEIPT', purpose: 'bill context', ratio: '3:4', size: '900 × 1200', tone: 'quiet' }
  };

  const recentFoodFights = [
    { id: 'recent-1', name: 'Tom Yum Friday', meta: '4 people · Completed', tone: 'petal' },
    { id: 'recent-2', name: 'Korean BBQ night', meta: '5 people · Completed', tone: 'apricot' },
    { id: 'recent-3', name: 'Sunday noodle table', meta: '3 people · Completed', tone: 'custard' }
  ];

  const baseMembers = [
    { id: 'pure', name: 'Pure', initials: 'P', role: 'Host', ready: false, tone: 'petal' },
    { id: 'mark', name: 'Mark', initials: 'M', role: 'Member', ready: false, tone: 'apricot' },
    { id: 'lina', name: 'Lina', initials: 'L', role: 'Member', ready: true, tone: 'custard' },
    { id: 'james', name: 'James', initials: 'J', role: 'Member', ready: false, tone: 'mauve' },
    { id: 'nana', name: 'Nana', initials: 'N', role: 'Member', ready: true, tone: 'petal' }
  ];

  const mealPreferenceOptions = {
    cuisine: [
      { id: 'thai', label: 'Thai', thai: 'อาหารไทย', tone: 'petal' },
      { id: 'japanese', label: 'Japanese', thai: 'อาหารญี่ปุ่น', tone: 'apricot' },
      { id: 'korean', label: 'Korean', thai: 'อาหารเกาหลี', tone: 'custard' },
      { id: 'italian', label: 'Italian', thai: 'อาหารอิตาเลียน', tone: 'mauve' }
    ],
    ingredients: [
      { id: 'rice', label: 'Rice', thai: 'ข้าว', tone: 'custard' },
      { id: 'noodles', label: 'Noodles', thai: 'เส้น', tone: 'petal' },
      { id: 'seafood', label: 'Seafood', thai: 'อาหารทะเล', tone: 'apricot' },
      { id: 'tofu', label: 'Tofu', thai: 'เต้าหู้', tone: 'mauve' }
    ],
    cookingType: [
      { id: 'spicy', label: 'Spicy', thai: 'เผ็ด', tone: 'petal' },
      { id: 'soup', label: 'Soup', thai: 'ซุป / น้ำ', tone: 'custard' },
      { id: 'grill', label: 'Grill', thai: 'ย่าง', tone: 'apricot' },
      { id: 'stir-fry', label: 'Stir-fry', thai: 'ผัด', tone: 'mauve' }
    ]
  };

  const recommendations = [
    {
      id: 'tom-yum',
      name: 'Tom Yum',
      thai: 'ต้มยำ',
      tone: 'petal',
      cuisine: 'Thai',
      tags: ['Spicy', 'Soup'],
      context: 'A bright, warm bowl for the whole table',
      budget: 'Prototype context · $$'
    },
    {
      id: 'korean-bbq',
      name: 'Korean BBQ',
      thai: 'ปิ้งย่างเกาหลี',
      tone: 'apricot',
      cuisine: 'Korean',
      tags: ['Grill', 'Sharing'],
      context: 'A social grill with plenty to pass around',
      budget: 'Prototype context · $$$'
    },
    {
      id: 'yaki-noodles',
      name: 'Yakisoba',
      thai: 'ยากิโซบะ',
      tone: 'custard',
      cuisine: 'Japanese',
      tags: ['Noodles', 'Stir-fry'],
      context: 'A comforting noodle plate with easy sharing',
      budget: 'Prototype context · $$'
    },
    {
      id: 'basil-rice',
      name: 'Basil Rice',
      thai: 'ข้าวกะเพรา',
      tone: 'mauve',
      cuisine: 'Thai',
      tags: ['Rice', 'Spicy'],
      context: 'A familiar rice bowl for a quick group decision',
      budget: 'Prototype context · $'
    }
  ];

  const restaurants = [
    {
      id: 'warm-table',
      name: 'The Warm Table',
      category: 'Thai table · local prototype',
      distance: 'Local context only',
      price: '$$',
      location: 'Siam Square · prototype',
      tone: 'petal'
    },
    {
      id: 'shared-flame',
      name: 'Shared Flame',
      category: 'Grill & sharing · local prototype',
      distance: 'Local context only',
      price: '$$$',
      location: 'Thonglor · prototype',
      tone: 'apricot'
    },
    {
      id: 'noodle-room',
      name: 'Noodle Room',
      category: 'Noodles · local prototype',
      distance: 'Local context only',
      price: '$',
      location: 'Ari · prototype',
      tone: 'custard'
    }
  ];

  function buildRoom(role, draft) {
    const sourceMembers = deepClone(baseMembers);
    if (role === 'member') {
      sourceMembers[0].role = 'Host';
      sourceMembers[0].name = 'Mark';
      sourceMembers[0].initials = 'M';
      sourceMembers[0].id = 'mark';
      sourceMembers[1].role = 'Member';
      sourceMembers[1].name = 'Pure';
      sourceMembers[1].initials = 'P';
      sourceMembers[1].id = 'pure';
      sourceMembers[1].ready = false;
    }
    return {
      id: 'room-ff-4827',
      name: draft?.name || 'Friday FoodFight',
      code: 'FF-4827',
      host: role === 'host' ? 'Pure' : 'Mark',
      location: draft?.location || 'Siam Square',
      radius: Number(draft?.radius || 5),
      maxMembers: Number(draft?.maxMembers || 6),
      date: draft?.date || '2026-08-28',
      time: draft?.time || '19:00',
      role,
      members: sourceMembers
    };
  }

  function initialState() {
    return {
      auth: {
        isAuthenticated: false,
        registered: false,
        verified: false,
        pendingEmail: '',
        forgotEmail: '',
        resetComplete: false
      },
      user: {
        name: 'Pure',
        email: 'pure@example.com',
        initials: 'P'
      },
      foodProfile: {
        step: 1,
        allergies: [],
        noAllergies: false,
        restrictions: [],
        noRestrictions: false,
        notes: '',
        completed: false
      },
      roomDraft: {
        name: 'Friday FoodFight',
        maxMembers: 6,
        location: 'Siam Square',
        radius: 5,
        date: '2026-08-28',
        time: '19:00',
        source: 'create'
      },
      currentRoom: null,
      roomMembers: [],
      readiness: { user: false, allReady: false },
      mealPreference: {
        cuisine: [],
        ingredients: [],
        cookingType: [],
        submitted: false
      },
      recommendationProgress: {
        stage: 0,
        message: '',
        started: false,
        complete: false
      },
      recommendationRound: 1,
      recommendations: deepClone(recommendations),
      voteSelections: { 1: [], 2: [] },
      passedOptions: { 1: [], 2: [] },
      roundResult: null,
      winner: null,
      restaurantSelection: null,
      bill: null,
      payments: [],
      billFlow: {
        receiptStep: 'entry',
        splitStep: 'setup',
        selectedItems: [],
        selectedMembers: [],
        itemAssignments: {},
        completion: 'open',
        historySelection: null,
        validationError: '',
        splitConfirmed: false,
        historyRecorded: false
      },
      history: [],
      ui: {
        language: 'th',
        motion: 'on',
        loadingAction: '',
        notice: '',
        noticeType: 'info',
        overlay: '',
        utilityOpen: false,
        notificationOpen: false,
        accountOpen: false,
        scenario: 'new-user',
        lobbyScenario: 'host-waiting',
        returnRoute: '#/home',
        formErrors: {},
        wave2State: 'normal',
        restaurantState: 'normal',
        billScenario: 'normal',
        receiptState: 'empty',
        historyScenario: 'normal'
      }
    };
  }

  let state = initialState();
  let loadingToken = 0;
  let gameplayTimerToken = 0;

  function refresh() {
    if (typeof P.renderCurrentRoute === 'function') P.renderCurrentRoute();
  }

  function getState() {
    return state;
  }

  function t(key, variables) {
    const language = state.ui.language === 'en' ? 'en' : 'th';
    let value = copy[language][key] || copy.en[key] || key;
    Object.entries(variables || {}).forEach(([name, replacement]) => {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    });
    return value;
  }

  function setLanguage(language) {
    state.ui.language = language === 'en' ? 'en' : 'th';
    refresh();
  }

  function setNotice(message, type) {
    state.ui.notice = message || '';
    state.ui.noticeType = type || 'info';
  }

  function clearNotice() {
    state.ui.notice = '';
    state.ui.formErrors = {};
  }

  function runLoading(action, complete, delay) {
    loadingToken += 1;
    const currentToken = loadingToken;
    state.ui.loadingAction = action;
    clearNotice();
    refresh();
    window.setTimeout(() => {
      if (currentToken !== loadingToken) return;
      state.ui.loadingAction = '';
      complete();
    }, delay || 520);
  }

  function startRecommendationLoading(shouldRefresh) {
    gameplayTimerToken += 1;
    const currentToken = gameplayTimerToken;
    state.ui.loadingAction = 'recommendation';
    state.ui.formErrors = {};
    state.recommendationProgress = {
      stage: 0,
      message: '',
      started: true,
      complete: false
    };
    if (shouldRefresh !== false) refresh();

    const stages = [
      'Understanding your group',
      'Balancing preferences',
      'Preparing your picks'
    ];
    [220, 560, 900].forEach((delay, index) => {
      window.setTimeout(() => {
        if (currentToken !== gameplayTimerToken) return;
        state.recommendationProgress.stage = index + 1;
        state.recommendationProgress.message = stages[index];
        refresh();
      }, delay);
    });
    window.setTimeout(() => {
      if (currentToken !== gameplayTimerToken) return;
      state.ui.loadingAction = '';
      state.recommendationProgress.stage = stages.length;
      state.recommendationProgress.message = stages[stages.length - 1];
      state.recommendationProgress.complete = true;
      navigate('#/food-picks', '#/meal-preference');
    }, 1180);
  }

  function cancelRecommendationLoading() {
    gameplayTimerToken += 1;
    state.ui.loadingAction = '';
    state.recommendationProgress = {
      stage: 0,
      message: '',
      started: false,
      complete: false
    };
  }

  function skipRecommendationLoading() {
    gameplayTimerToken += 1;
    state.ui.loadingAction = '';
    state.recommendationProgress = {
      stage: 3,
      message: 'Preparing your picks',
      started: true,
      complete: true
    };
    navigate('#/food-picks', '#/meal-preference');
  }

  function navigate(route, returnRoute) {
    if (returnRoute) state.ui.returnRoute = returnRoute;
    state.ui.utilityOpen = false;
    state.ui.notificationOpen = false;
    state.ui.accountOpen = false;
    if (P.navigateTo) P.navigateTo(route);
    else window.location.hash = route;
  }

  function setCurrentRoom(room) {
    state.currentRoom = deepClone(room);
    state.roomMembers = deepClone(room?.members || []);
    state.readiness.user = Boolean(state.roomMembers.find((member) => member.id === 'pure')?.ready);
    state.readiness.allReady = state.roomMembers.length > 0 && state.roomMembers.every((member) => member.ready);
  }

  function applyLobbyScenario(scenario) {
    const normalized = scenario || 'host-waiting';
    const requestedRole = normalized === 'member-waiting' ? 'member' : 'host';
    const currentRole = state.currentRoom?.role || '';
    const room = state.currentRoom && currentRole === requestedRole
      ? deepClone(state.currentRoom)
      : buildRoom(requestedRole, state.roomDraft);
    state.ui.lobbyScenario = normalized;
    if (normalized === 'member-waiting') room.role = 'member';
    if (normalized === 'host-waiting' || normalized === 'member-waiting') {
      room.members = room.members.map((member, index) => ({ ...member, ready: index === 2 || index === 4 }));
      const user = room.members.find((member) => member.id === 'pure');
      if (user) user.ready = false;
    }
    if (normalized === 'host-all-ready') {
      room.role = 'host';
      room.members = room.members.map((member) => ({ ...member, ready: true }));
    }
    if (normalized === 'room-full') {
      room.role = room.role || 'host';
      const names = [
        ['pure', 'Pure', 'P', 'Host', 'petal'],
        ['mark', 'Mark', 'M', 'Member', 'apricot'],
        ['lina', 'Lina', 'L', 'Member', 'custard'],
        ['james', 'James', 'J', 'Member', 'mauve'],
        ['nana', 'Nana', 'N', 'Member', 'petal'],
        ['alex', 'Alex', 'A', 'Member', 'apricot']
      ];
      room.maxMembers = 6;
      room.members = names.map(([id, name, initials, role, tone]) => ({ id, name, initials, role, tone, ready: id !== 'pure' }));
    }
    setCurrentRoom(room);
    refresh();
  }

  function toggleReady() {
    if (!state.currentRoom) setCurrentRoom(buildRoom('member', state.roomDraft));
    const members = state.currentRoom.members.map((member) => member.id === 'pure' ? { ...member, ready: !member.ready } : member);
    setCurrentRoom({ ...state.currentRoom, members });
    state.ui.lobbyScenario = 'member-waiting';
    refresh();
  }

  function simulateAllReady() {
    if (!state.currentRoom) setCurrentRoom(buildRoom('host', state.roomDraft));
    const members = state.currentRoom.members.map((member) => ({ ...member, ready: true }));
    setCurrentRoom({ ...state.currentRoom, members });
    state.ui.lobbyScenario = 'host-all-ready';
    refresh();
  }

  function applyScenario(scenario) {
    const next = scenario || 'new-user';
    if (next === 'new-user') {
      const language = state.ui.language;
      const motion = state.ui.motion;
      state = initialState();
      state.ui.language = language;
      state.ui.motion = motion;
      navigate('#/landing');
      return;
    }
    state = initialState();
    state.ui.scenario = next;
    state.auth.isAuthenticated = true;
    state.auth.registered = true;
    state.auth.verified = true;
    state.foodProfile.completed = true;
    state.foodProfile.noAllergies = true;
    state.foodProfile.noRestrictions = true;
    if (next === 'host' || next === 'member') {
      const role = next === 'host' ? 'host' : 'member';
      setCurrentRoom(buildRoom(role, state.roomDraft));
      state.ui.lobbyScenario = role === 'host' ? 'host-waiting' : 'member-waiting';
      navigate('#/room/lobby');
      return;
    }
    navigate('#/home');
  }

  function resetDemo() {
    loadingToken += 1;
    gameplayTimerToken += 1;
    state = initialState();
    setNotice(t('resetSuccessToast'), 'success');
    navigate('#/landing');
    window.setTimeout(() => {
      state.ui.notice = '';
      refresh();
    }, 2400);
  }

  function toggleUtility() {
    state.ui.utilityOpen = !state.ui.utilityOpen;
    state.ui.accountOpen = false;
    state.ui.notificationOpen = false;
    refresh();
  }

  function toggleAccount() {
    state.ui.accountOpen = !state.ui.accountOpen;
    state.ui.utilityOpen = false;
    state.ui.notificationOpen = false;
    refresh();
  }

  function toggleNotifications() {
    state.ui.notificationOpen = !state.ui.notificationOpen;
    state.ui.utilityOpen = false;
    state.ui.accountOpen = false;
    refresh();
  }

  const routes = [
    '#/landing', '#/login', '#/register', '#/verify-email', '#/forgot-password', '#/reset-password',
    '#/food-profile', '#/home', '#/room/create', '#/room/join', '#/room/preview', '#/room/lobby',
    '#/meal-preference', '#/recommendation-loading', '#/food-picks', '#/vote', '#/winner', '#/restaurant', '#/restaurant/detail'
  ];

  P.WAVE1 = {
    copy,
    allergies,
    restrictions,
    mediaSlots,
    recentFoodFights,
    mealPreferenceOptions,
    recommendations,
    restaurants,
    getState,
    t,
    routes,
    deepClone,
    buildRoom,
    setLanguage,
    setNotice,
    clearNotice,
    runLoading,
    startRecommendationLoading,
    cancelRecommendationLoading,
    skipRecommendationLoading,
    navigate,
    refresh,
    setCurrentRoom,
    applyLobbyScenario,
    toggleReady,
    simulateAllReady,
    applyScenario,
    resetDemo,
    toggleUtility,
    toggleAccount,
    toggleNotifications,
    isLoading: (action) => state.ui.loadingAction === action
  };

  Object.defineProperty(P, 'prototypeState', {
    configurable: true,
    get: () => state
  });
})();
