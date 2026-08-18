/**
 * FoodFighter UX Prototype — Bilingual Localization Module (TH / EN)
 * 
 * Provides:
 *   - Complete translation dictionary for Thai (TH) and English (EN)
 *   - Language resolution, getter/setter, interpolation helper
 *   - Reusable compact [ TH | EN ] segmented switch component
 *   - Zero build step, 100% file:// compatible
 */

(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};
  const P = window.FFPrototype;

  /* ==========================================================================
     1. Translation Dictionaries (TH & EN)
     ========================================================================== */

  const TRANSLATIONS = {
    th: {
      // Global & Common
      "common.appName": "FoodFighter",
      "common.appTagline": "จบปัญหาไม่รู้จะกินอะไรดีกับเพื่อน",
      "common.back": "ย้อนกลับ",
      "common.continue": "ดำเนินการต่อ",
      "common.save": "บันทึกข้อมูล",
      "common.cancel": "ยกเลิก",
      "common.done": "เสร็จสิ้น",
      "common.edit": "แก้ไข",
      "common.close": "ปิด",
      "common.copy": "คัดลอก",
      "common.copied": "คัดลอกแล้ว",
      "common.today": "วันนี้",
      "common.yesterday": "เมื่อวาน",
      "common.justNow": "เมื่อสักครู่",
      "common.host": "โฮสต์",
      "common.member": "สมาชิก",
      "common.observer": "ผู้สังเกตการณ์",
      "common.ready": "พร้อมแล้ว",
      "common.notReady": "ยังไม่พร้อม",
      "common.everyone": "ทุกคน (หารเท่า)",
      "common.you": "คุณ",

      // Bottom Navigation
      "nav.home": "หน้าแรก",
      "nav.history": "ประวัติ",
      "nav.profile": "โปรไฟล์",

      // Auth — Login
      "auth.login.title": "เข้าสู่ระบบ",
      "auth.login.subtitle": "ยินดีต้อนรับสู่ FoodFighter ช่วยกลุ่มเพื่อนเลือกอาหารที่ลงตัว",
      "auth.login.email": "อีเมล",
      "auth.login.password": "รหัสผ่าน",
      "auth.login.forgotPassword": "ลืมรหัสผ่าน?",
      "auth.login.submit": "เข้าสู่ระบบ",
      "auth.login.noAccount": "ยังไม่มีบัญชี?",
      "auth.login.register": "สมัครสมาชิก",
      "auth.login.orSocial": "หรือเข้าสู่ระบบด้วย",
      "auth.login.demoHint": "บัญชีทดสอบ: user@example.com / Password123",
      "auth.login.errorRequired": "กรุณากรอกอีเมลและรหัสผ่าน",

      // Auth — Register
      "auth.register.title": "สร้างบัญชีใหม่",
      "auth.register.subtitle": "เริ่มต้นโหวตอาหารและแยกบิลอย่างง่ายดาย",
      "auth.register.name": "ชื่อที่ใช้แสดง",
      "auth.register.email": "อีเมล",
      "auth.register.password": "รหัสผ่าน (อย่างน้อย 8 ตัวอักษร)",
      "auth.register.confirmPassword": "ยืนยันรหัสผ่าน",
      "auth.register.terms": "ฉันยอมรับ เงื่อนไขการใช้งาน และ นโยบายความเป็นส่วนตัว",
      "auth.register.submit": "สร้างบัญชี",
      "auth.register.hasAccount": "มีบัญชีอยู่แล้ว?",
      "auth.register.login": "เข้าสู่ระบบ",
      "auth.register.errorTerms": "กรุณายอมรับเงื่อนไขการใช้งาน",
      "auth.register.errorPasswordMismatch": "รหัสผ่านไม่ตรงกัน",

      // Auth — OTP / Verify Email
      "auth.otp.title": "ยืนยันอีเมล",
      "auth.otp.subtitle": "เราได้ส่งรหัสยืนยัน 6 หลักไปยัง {email}",
      "auth.otp.enterCode": "กรอกรหัส OTP",
      "auth.otp.resend": "ส่งรหัสใหม่อีกครั้ง",
      "auth.otp.submit": "ยืนยันรหัส OTP",
      "auth.otp.demoHint": "รหัส OTP ทดสอบ: 123456",
      "auth.otp.errorInvalid": "รหัส OTP ไม่ถูกต้อง (ใช้ 123456 สำหรับการทดสอบ)",

      // Auth — Forgot Password
      "auth.forgot.title": "ลืมรหัสผ่าน",
      "auth.forgot.subtitle": "กรอกอีเมลของคุณเพื่อรับลิงก์รีเซ็ตรหัสผ่าน",
      "auth.forgot.email": "อีเมลของคุณ",
      "auth.forgot.submit": "ส่งลิงก์รีเซ็ตรหัสผ่าน",
      "auth.forgot.successTitle": "ส่งลิงก์เรียบร้อยแล้ว!",
      "auth.forgot.successSubtitle": "เราได้ส่งคำแนะนำในการตั้งรหัสผ่านใหม่ไปยังอีเมลของคุณแล้ว",
      "auth.forgot.backToLogin": "กลับไปหน้าเข้าสู่ระบบ",

      // Food Profile Onboarding
      "foodProfile.onboarding.step": "ขั้นตอนที่ {step}",
      "foodProfile.allergies.title": "ประวัติการแพ้อาหาร",
      "foodProfile.allergies.subtitle": "เลือกอาหารที่คุณแพ้ AI จะตัดเมนูที่มีส่วนผสมเหล่านี้ออกทันที",
      "foodProfile.restrictions.title": "ข้อจำกัดด้านอาหาร",
      "foodProfile.restrictions.subtitle": "เลือกข้อจำกัดด้านศาสนา สุขภาพ หรือการกินเพื่อกรองตัวเลือก",
      "foodProfile.details.title": "รายละเอียดเพิ่มเติม",
      "foodProfile.details.subtitle": "ระบุรสชาติ ความชอบ หรือสไตล์อาหารเพิ่มเติมสำหรับกลุ่ม",
      "foodProfile.details.placeholder": "เช่น ชอบกินเผ็ดปานกลาง, ชอบซุปร้อนๆ, ไม่ชอบผักชี...",
      "foodProfile.details.suggestions": "ตัวอย่างข้อความด่วน:",
      "foodProfile.onboarding.next": "ถัดไป →",
      "foodProfile.onboarding.finish": "เสร็จสิ้นและเริ่มใช้งาน ✓",
      "foodProfile.onboarding.skip": "ข้ามไปก่อน",

      // Home Dashboard
      "home.greeting": "สวัสดี, {name} 👋",
      "home.headline": "มื้อนี้กินอะไรดี?",
      "home.profileActive": "โปรไฟล์อาหารเปิดใช้งาน",
      "home.profileSummary": "{allergies} สิ่งที่แพ้ • {restrictions} ข้อจำกัด",
      "home.startBattle": "เริ่มหรือเข้าร่วมศึกเลือกอาหาร",
      "home.createRoom.title": "สร้างห้องใหม่",
      "home.createRoom.desc": "เป็นโฮสต์ ชวนเพื่อนด้วย QR หรือรหัสห้อง",
      "home.joinRoom.title": "เข้าร่วมห้อง",
      "home.joinRoom.desc": "กรอกรหัสห้อง หรือสแกน QR ของเพื่อน",
      "home.recentBattles": "มื้อที่ตัดสินล่าสุด",
      "home.viewAll": "ดูทั้งหมด",

      // Room — Create
      "room.create.title": "สร้างห้อง FoodFight",
      "room.create.roomName": "ชื่อห้อง / กลุ่ม",
      "room.create.location": "จุดนัดพบ / พิกัด",
      "room.create.radius": "รัศมีค้นหาร้านอาหาร",
      "room.create.maxMembers": "จำนวนสมาชิกสูงสุด",
      "room.create.submit": "สร้างห้องและเปิดล็อบบี้ →",

      // Room — Join Hub & Methods
      "room.join.title": "เข้าร่วมห้อง",
      "room.join.subtitle": "เลือกวิธีเข้าร่วมห้องกับเพื่อนของคุณ",
      "room.join.byCode": "กรอกรหัสห้อง",
      "room.join.byCodeDesc": "ใส่รหัส 6-7 หลัก เช่น FF-4827",
      "room.join.byQR": "สแกน QR Code",
      "room.join.byQRDesc": "เปิดกล้องเพื่อสแกน QR ของโฮสต์",
      "room.join.byLink": "เปิดด้วยลิงก์คำเชิญ",
      "room.join.byLinkDesc": "กดจากลิงก์ที่เพื่อนส่งมาในแชท",

      // Room — Code Entry
      "room.code.title": "กรอกรหัสห้อง",
      "room.code.placeholder": "เช่น FF-4827",
      "room.code.submit": "ค้นหาและเข้าร่วมห้อง",
      "room.code.demoHint": "รหัสห้องทดสอบ: FF-4827",
      "room.code.errorInvalid": "ไม่พบห้องนี้ กรุณาตรวจสอบรหัสอีกครั้ง",

      // Room — QR Scan
      "room.scan.title": "สแกน QR Code",
      "room.scan.instruction": "นำกล้องส่องไปที่ QR Code ของโฮสต์",
      "room.scan.simulated": "ระบบจำลองการสแกนกล้อง",
      "room.scan.simulateTrigger": "จำลองตรวจพบ QR Code ทันที 📷",

      // Room — Preview
      "room.preview.title": "ห้องที่ค้นพบ",
      "room.preview.host": "โฮสต์: {hostName}",
      "room.preview.activeMembers": "สมาชิกในห้อง: {count} คน",
      "room.preview.confirm": "เข้าร่วมห้องนี้ →",

      // Room — Lobbies (Host & Member)
      "room.lobby.hostTitle": "ล็อบบี้ห้อง (โฮสต์)",
      "room.lobby.memberTitle": "ล็อบบี้ห้อง (สมาชิก)",
      "room.lobby.roomCode": "รหัสห้อง",
      "room.lobby.inviteCTA": "ชวนเพื่อน ＋",
      "room.lobby.membersList": "สมาชิกในห้อง ({count}/{max})",
      "room.lobby.readyRule": "เงื่อนไขเริ่มศึก: สมาชิกพร้อม 100% หรือเกิน 60% หลัง 2 นาที",
      "room.lobby.readyStatus": "สถานะ: พร้อมแล้ว {readyCount} จาก {totalCount} คน",
      "room.lobby.startBattle": "เริ่ม FoodFight ทันที! ⚔️",
      "room.lobby.waitingForHost": "รอโฮสต์กดเริ่ม FoodFight...",
      "room.lobby.toggleReady": "เปลี่ยนสถานะพร้อม",
      "room.lobby.leaveRoom": "ออกจากห้อง",

      // Room — Invite Modal
      "room.invite.modalTitle": "ชวนเพื่อนเข้าร่วมห้อง",
      "room.invite.modalSubtitle": "แชร์รหัสห้องหรือ QR ให้เพื่อนเข้ามาร่วมโหวต",
      "room.invite.copyCode": "คัดลอกรหัส",
      "room.invite.copyLink": "คัดลอกลิงก์",

      // FoodFight — Meal Preferences
      "foodfight.pref.title": "ความต้องการมื้อนี้",
      "foodfight.pref.subtitle": "เลือกสไตล์อาหารที่คุณอยากกินในมื้อนี้ เพื่อให้ AI ประมวลผลร่วมกับกลุ่ม",
      "foodfight.pref.foodTypes": "1. ประเภทอาหารที่อยากทาน",
      "foodfight.pref.cuisines": "2. สัญชาติอาหาร",
      "foodfight.pref.ingredients": "3. วัตถุดิบที่ต้องการ",
      "foodfight.pref.priceLevel": "4. ระดับราคาต่อคน",
      "foodfight.pref.restaurantStyles": "5. บรรยากาศร้าน",
      "foodfight.pref.otherNotes": "6. โน้ตเพิ่มเติม",
      "foodfight.pref.submit": "ส่งความต้องการ →",

      // FoodFight — Waiting & Generating
      "foodfight.waiting.title": "กำลังรอเพื่อนส่งความต้องการ",
      "foodfight.waiting.submitted": "ส่งแล้ว {count} จาก {total} คน",
      "foodfight.generating.title": "AI กำลังคิดเมนูที่ดีที่สุด...",
      "foodfight.generating.subtitle": "ระบบกำลังจับคู่ความชอบและตัดสิ่งที่ทุกคนแพ้ออก",

      // Recommendations & Voting
      "recommend.round1.title": "เมนูแนะนำ — รอบที่ 1",
      "recommend.round2.title": "เมนูแนะนำ — รอบที่ 2 (ตัวเลือกใหม่)",
      "recommend.menuA": "เมนู A",
      "recommend.menuB": "เมนู B",
      "recommend.menuC": "เมนู C",
      "recommend.menuD": "เมนู D",
      "recommend.whyMatch": "เหตุผลที่เข้ากับกลุ่ม:",
      "recommend.vote.ok": "OK (เอาเมนูนี้)",
      "recommend.vote.pass": "PASS (ข้ามไปก่อน)",
      "recommend.vote.yourVote": "คะแนนของคุณ:",
      "recommend.result.title": "ผลการโหวตรอบที่ {round}",
      "recommend.result.consensus": "ได้ฉันทามติ {percent}% (เกินเกณฑ์ 60%)",
      "recommend.result.noConsensus": "ยังไม่มีเมนูที่ได้คะแนนเกิน 60%",
      "recommend.result.recommendAgain": "ขอคำแนะนำใหม่ (รอบที่ 2) ↻",
      "recommend.finalVote.title": "โหวตตัดสินรอบสุดท้าย (4 เมนู)",
      "recommend.finalVote.subtitle": "เลือก 1 เมนูที่คุณอยากทานที่สุด",
      "recommend.finalVote.hostTieBreak": "คะแนนเท่ากัน! โฮสต์เป็นผู้ตัดสินชี้ขาด ⚖️",
      "recommend.finalMenu.title": "🎉 เมนูชนะเลิศของมื้อนี้!",
      "recommend.finalMenu.findRestaurants": "ค้นหาร้านอาหารใกล้เคียง 🗺️ →",

      // Restaurants Discovery & Map
      "restaurants.title": "ร้านอาหารแนะนำ",
      "restaurants.viewList": "📋 รายชื่อ",
      "restaurants.viewMap": "🗺️ แผนที่",
      "restaurants.filterAll": "ทั้งหมด",
      "restaurants.filterNearest": "ใกล้ที่สุด",
      "restaurants.filterOpen": "เปิดอยู่ตอนนี้",
      "restaurants.detail.distance": "ระยะทาง",
      "restaurants.detail.travelTime": "เวลาเดินทาง",
      "restaurants.detail.price": "ราคาเฉลี่ย",
      "restaurants.detail.chooseCTA": "เลือกร้านนี้สำหรับกลุ่ม 📍 →",
      "restaurants.selected.title": "เลือกร้านเรียบร้อยแล้ว!",
      "restaurants.selected.splitBillCTA": "แยกบิล / สแกนใบเสร็จ 🧾 →",

      // Split Bill & Payment
      "bill.overview.title": "แยกบิลมื้อนี้ (Split Bill)",
      "bill.overview.subtitle": "หารค่าอาหารตามจริง ใครกินอะไรจ่ายอันนั้น หรือหารเท่า",
      "bill.overview.scanReceipt": "สแกนใบเสร็จด้วยกล้อง 📸",
      "bill.overview.loadSample": "ใช้ใบเสร็จตัวอย่าง 📄",
      "bill.scanner.title": "สแกนใบเสร็จ",
      "bill.scanner.instruction": "จัดวางใบเสร็จให้อยู่ในกรอบเพื่อตรวจจับรายการ",
      "bill.scanner.instantSkip": "เสร็จสิ้นการสแกนทันที ⚡",
      "bill.items.title": "ตรวจสอบรายการอาหาร",
      "bill.items.addItem": "＋ เพิ่มรายการ",
      "bill.items.subtotal": "ยอดรวมรายการ",
      "bill.items.total": "ยอดรวมทั้งสิ้น",
      "bill.items.proceedAssign": "ไปเลือกคนกิน (ใครกินอะไร) →",
      "bill.assign.title": "ใครกินอะไรบ้าง?",
      "bill.assign.instruction": "กดเลือกคนที่ทานแต่ละเมนู ระบบจะคำนวณและหารเศษสตางค์ให้อัตโนมัติ",
      "bill.assign.viewSummary": "ดูสรุปยอดแต่ละคน →",
      "bill.assign.errorUnassigned": "ยังมีรายการที่ยังไม่ได้เลือกคนทาน กรุณาเลือกให้ครบ",
      "bill.summary.title": "สรุปยอดแยกบิลรายบุคคล",
      "bill.summary.reconciledBadge": "✓ ยอดเงินลงตัว 100% ไม่มีเศษตกหล่น",
      "bill.summary.confirm": "ยืนยันยอดและไปหน้าชำระเงิน →",
      "bill.summary.editAssign": "← กลับไปแก้ไขคนกิน",
      "bill.payment.title": "สถานะการชำระเงิน",
      "bill.payment.paid": "ชำระแล้ว ✓",
      "bill.payment.unpaid": "รอชำระ",
      "bill.payment.markAsPaid": "กดเพื่อเปลี่ยนเป็นชำระแล้ว",
      "bill.payment.allSettled": "🎉 ทุกคนชำระเงินครบเรียบร้อยแล้ว!",
      "bill.payment.returnHome": "กลับสู่หน้าหลัก",

      // History & Profile
      "history.tabs.sessions": "⚔️ ประวัติ FoodFight",
      "history.tabs.bills": "🧾 ประวัติการแยกบิล",
      "history.session.winner": "เมนูที่ชนะ:",
      "history.session.with": "ร่วมกับ",
      "history.bill.yourShare": "ยอดของคุณ",
      "history.bill.total": "ยอดรวมบิล",
      "history.empty": "ยังไม่มีประวัติการทานอาหาร",
      "profile.title": "โปรไฟล์ผู้ใช้งาน",
      "profile.badge": "👑 โฮสต์ & นักสู้สายกิน",
      "profile.statBattles": "ศึกอาหาร",
      "profile.statPlaces": "ร้านที่ไป",
      "profile.statSettled": "เคลียร์บิลครบ",
      "profile.foodSafety": "โปรไฟล์ความปลอดภัย & ข้อจำกัดอาหาร",
      "profile.appliedToAll": "นำไปใช้คัดกรองอัตโนมัติในทุกห้อง",
      "profile.editFoodCTA": "แก้ไขโปรไฟล์อาหาร ✏️ →",
      "profile.logout": "ออกจากระบบทดสอบ",
      "profile.edit.title": "แก้ไขโปรไฟล์อาหาร",
      "profile.edit.allergies": "1. อาหารที่แพ้ (หลีกเลี่ยงเด็ดขาด)",
      "profile.edit.restrictions": "2. ข้อจำกัดทางอาหาร",
      "profile.edit.notes": "3. โน้ตและรสชาติที่ชอบ",
      "profile.edit.save": "บันทึกการเปลี่ยนแปลง ✓",
      "profile.edit.toastSuccess": "อัปเดตโปรไฟล์อาหารเรียบร้อยแล้ว!"
    },

    en: {
      // Global & Common
      "common.appName": "FoodFighter",
      "common.appTagline": "End the group 'What should we eat?' debate",
      "common.back": "Back",
      "common.continue": "Continue",
      "common.save": "Save Changes",
      "common.cancel": "Cancel",
      "common.done": "Done",
      "common.edit": "Edit",
      "common.close": "Close",
      "common.copy": "Copy",
      "common.copied": "Copied",
      "common.today": "Today",
      "common.yesterday": "Yesterday",
      "common.justNow": "Just Now",
      "common.host": "Host",
      "common.member": "Member",
      "common.observer": "Observer",
      "common.ready": "Ready",
      "common.notReady": "Not Ready",
      "common.everyone": "Everyone (Split Equal)",
      "common.you": "You",

      // Bottom Navigation
      "nav.home": "Home",
      "nav.history": "History",
      "nav.profile": "Profile",

      // Auth — Login
      "auth.login.title": "Welcome Back",
      "auth.login.subtitle": "Log in to FoodFighter to decide meals effortlessly with friends.",
      "auth.login.email": "Email Address",
      "auth.login.password": "Password",
      "auth.login.forgotPassword": "Forgot Password?",
      "auth.login.submit": "Log In",
      "auth.login.noAccount": "Don't have an account?",
      "auth.login.register": "Create Account",
      "auth.login.orSocial": "Or sign in with",
      "auth.login.demoHint": "Demo: user@example.com / Password123",
      "auth.login.errorRequired": "Please enter both email and password.",

      // Auth — Register
      "auth.register.title": "Create Account",
      "auth.register.subtitle": "Start voting on group meals and splitting receipts cleanly.",
      "auth.register.name": "Display Name",
      "auth.register.email": "Email Address",
      "auth.register.password": "Password (8+ characters)",
      "auth.register.confirmPassword": "Confirm Password",
      "auth.register.terms": "I agree to Terms of Service and Privacy Policy",
      "auth.register.submit": "Create Account",
      "auth.register.hasAccount": "Already have an account?",
      "auth.register.login": "Log In",
      "auth.register.errorTerms": "Please accept the Terms of Service to proceed.",
      "auth.register.errorPasswordMismatch": "Passwords do not match.",

      // Auth — OTP / Verify Email
      "auth.otp.title": "Verify Your Email",
      "auth.otp.subtitle": "We've sent a 6-digit verification code to {email}",
      "auth.otp.enterCode": "Enter OTP Code",
      "auth.otp.resend": "Resend Code",
      "auth.otp.submit": "Verify OTP",
      "auth.otp.demoHint": "Demo OTP code: 123456",
      "auth.otp.errorInvalid": "Invalid verification code (use 123456 for demo).",

      // Auth — Forgot Password
      "auth.forgot.title": "Forgot Password",
      "auth.forgot.subtitle": "Enter your email to receive a password reset link.",
      "auth.forgot.email": "Your Email Address",
      "auth.forgot.submit": "Send Reset Link",
      "auth.forgot.successTitle": "Reset Link Sent!",
      "auth.forgot.successSubtitle": "We have sent password recovery instructions to your email.",
      "auth.forgot.backToLogin": "Back to Log In",

      // Food Profile Onboarding
      "foodProfile.onboarding.step": "Step {step}",
      "foodProfile.allergies.title": "Food Allergies",
      "foodProfile.allergies.subtitle": "Select severe allergies. AI will strictly exclude dishes containing these.",
      "foodProfile.restrictions.title": "Dietary Restrictions",
      "foodProfile.restrictions.subtitle": "Religious, lifestyle, and dietary limits to filter suitable options.",
      "foodProfile.details.title": "Additional Nuances",
      "foodProfile.details.subtitle": "Personal spice preferences, flavor notes, or group dining habits.",
      "foodProfile.details.placeholder": "e.g. Love spicy food, prefer air-con, no cilantro...",
      "foodProfile.details.suggestions": "Quick Suggestions:",
      "foodProfile.onboarding.next": "Continue →",
      "foodProfile.onboarding.finish": "Complete & Start ✓",
      "foodProfile.onboarding.skip": "Skip for now",

      // Home Dashboard
      "home.greeting": "Hello, {name} 👋",
      "home.headline": "What's the plan today?",
      "home.profileActive": "Food Profile Active",
      "home.profileSummary": "{allergies} allergies • {restrictions} diet rules",
      "home.startBattle": "Start or Join a Meal Battle",
      "home.createRoom.title": "Create Room",
      "home.createRoom.desc": "Host session, invite friends via QR or code",
      "home.joinRoom.title": "Join Room",
      "home.joinRoom.desc": "Enter code or scan host's QR invite",
      "home.recentBattles": "Recent Battles",
      "home.viewAll": "View all",

      // Room — Create
      "room.create.title": "Create FoodFight Room",
      "room.create.roomName": "Room / Group Name",
      "room.create.location": "Meetup Location",
      "room.create.radius": "Search Radius",
      "room.create.maxMembers": "Max Participants",
      "room.create.submit": "Create Room & Open Lobby →",

      // Room — Join Hub & Methods
      "room.join.title": "Join Room Hub",
      "room.join.subtitle": "Choose how to join your group's session",
      "room.join.byCode": "Enter Room Code",
      "room.join.byCodeDesc": "Type 6-digit code like FF-4827",
      "room.join.byQR": "Scan QR Code",
      "room.join.byQRDesc": "Open camera to scan host's QR",
      "room.join.byLink": "Use Invite Link",
      "room.join.byLinkDesc": "Join via link shared in group chat",

      // Room — Code Entry
      "room.code.title": "Enter Room Code",
      "room.code.placeholder": "e.g. FF-4827",
      "room.code.submit": "Find & Join Room",
      "room.code.demoHint": "Demo Room Code: FF-4827",
      "room.code.errorInvalid": "Room not found. Please verify code.",

      // Room — QR Scan
      "room.scan.title": "Scan QR Code",
      "room.scan.instruction": "Align the QR code within the frame",
      "room.scan.simulated": "Camera Scanner Simulation",
      "room.scan.simulateTrigger": "Simulate QR Code Scan 📷",

      // Room — Preview
      "room.preview.title": "Room Discovered",
      "room.preview.host": "Host: {hostName}",
      "room.preview.activeMembers": "Current Members: {count}",
      "room.preview.confirm": "Join This Room →",

      // Room — Lobbies (Host & Member)
      "room.lobby.hostTitle": "Room Lobby (Host)",
      "room.lobby.memberTitle": "Room Lobby (Member)",
      "room.lobby.roomCode": "Room Code",
      "room.lobby.inviteCTA": "Invite ＋",
      "room.lobby.membersList": "Members Roster ({count}/{max})",
      "room.lobby.readyRule": "Start condition: 100% Ready or >60% after 2 mins",
      "room.lobby.readyStatus": "Status: {readyCount} of {totalCount} ready",
      "room.lobby.startBattle": "Start FoodFight! ⚔️",
      "room.lobby.waitingForHost": "Waiting for host to start...",
      "room.lobby.toggleReady": "Toggle Ready Status",
      "room.lobby.leaveRoom": "Leave Room",

      // Room — Invite Modal
      "room.invite.modalTitle": "Invite Friends",
      "room.invite.modalSubtitle": "Share your Room Code or QR so friends can join",
      "room.invite.copyCode": "Copy Code",
      "room.invite.copyLink": "Copy Link",

      // FoodFight — Meal Preferences
      "foodfight.pref.title": "Meal Preferences",
      "foodfight.pref.subtitle": "Pick what you're craving so AI can synthesize the best options for the group",
      "foodfight.pref.foodTypes": "1. Food Types",
      "foodfight.pref.cuisines": "2. Cuisines",
      "foodfight.pref.ingredients": "3. Key Ingredients",
      "foodfight.pref.priceLevel": "4. Budget Per Person",
      "foodfight.pref.restaurantStyles": "5. Dining Atmosphere",
      "foodfight.pref.otherNotes": "6. Additional Notes",
      "foodfight.pref.submit": "Submit Preferences →",

      // FoodFight — Waiting & Generating
      "foodfight.waiting.title": "Waiting for Group Preferences",
      "foodfight.waiting.submitted": "{count} of {total} members submitted",
      "foodfight.generating.title": "AI Synthesizing Top Menus...",
      "foodfight.generating.subtitle": "Matching cravings and filtering out all group allergens",

      // Recommendations & Voting
      "recommend.round1.title": "Recommended Menus — Round 1",
      "recommend.round2.title": "Recommended Menus — Round 2 (Alternatives)",
      "recommend.menuA": "Menu A",
      "recommend.menuB": "Menu B",
      "recommend.menuC": "Menu C",
      "recommend.menuD": "Menu D",
      "recommend.whyMatch": "Why this matches your group:",
      "recommend.vote.ok": "OK (Want this)",
      "recommend.vote.pass": "PASS (Skip)",
      "recommend.vote.yourVote": "Your Vote:",
      "recommend.result.title": "Round {round} Voting Result",
      "recommend.result.consensus": "Consensus reached {percent}% (Exceeds 60% threshold)",
      "recommend.result.noConsensus": "No menu reached the 60% consensus threshold",
      "recommend.result.recommendAgain": "Recommend Again (Round 2) ↻",
      "recommend.finalVote.title": "Final Vote (4 Candidate Dishes)",
      "recommend.finalVote.subtitle": "Select the single dish you want most",
      "recommend.finalVote.hostTieBreak": "Tie vote! Host makes the final tie-break decision ⚖️",
      "recommend.finalMenu.title": "🎉 Winning Menu of the Day!",
      "recommend.finalMenu.findRestaurants": "Find Nearby Restaurants 🗺️ →",

      // Restaurants Discovery & Map
      "restaurants.title": "Recommended Restaurants",
      "restaurants.viewList": "📋 List",
      "restaurants.viewMap": "🗺️ Map",
      "restaurants.filterAll": "All",
      "restaurants.filterNearest": "Nearest",
      "restaurants.filterOpen": "Open Now",
      "restaurants.detail.distance": "Distance",
      "restaurants.detail.travelTime": "Travel Time",
      "restaurants.detail.price": "Price Range",
      "restaurants.detail.chooseCTA": "Choose This Restaurant 📍 →",
      "restaurants.selected.title": "Destination Selected!",
      "restaurants.selected.splitBillCTA": "Split Bill / Scan Receipt 🧾 →",

      // Split Bill & Payment
      "bill.overview.title": "Split Bill Overview",
      "bill.overview.subtitle": "Split your group meal accurately based on who ate what or equally",
      "bill.overview.scanReceipt": "Scan Receipt with Camera 📸",
      "bill.overview.loadSample": "Load Sample Receipt 📄",
      "bill.scanner.title": "Receipt Scanner",
      "bill.scanner.instruction": "Align receipt within the frame for item detection",
      "bill.scanner.instantSkip": "Complete Scan Instantly ⚡",
      "bill.items.title": "Review Receipt Items",
      "bill.items.addItem": "＋ Add Item",
      "bill.items.subtotal": "Items Subtotal",
      "bill.items.total": "Total Bill",
      "bill.items.proceedAssign": "Assign Who Ate What →",
      "bill.assign.title": "Who Ate What?",
      "bill.assign.instruction": "Select members for each item. Satang remainders are distributed automatically.",
      "bill.assign.viewSummary": "View Member Breakdown →",
      "bill.assign.errorUnassigned": "Some items are unassigned. Please assign all items to proceed.",
      "bill.summary.title": "Bill Summary Breakdown",
      "bill.summary.reconciledBadge": "✓ 100% Reconciled — Exact to the satang",
      "bill.summary.confirm": "Confirm & View Payment Status →",
      "bill.summary.editAssign": "← Edit Item Assignments",
      "bill.payment.title": "Payment Status",
      "bill.payment.paid": "Paid ✓",
      "bill.payment.unpaid": "Unpaid",
      "bill.payment.markAsPaid": "Mark as Paid",
      "bill.payment.allSettled": "🎉 All members have settled their bill!",
      "bill.payment.returnHome": "Return to Home",

      // History & Profile
      "history.tabs.sessions": "⚔️ FoodFight Sessions",
      "history.tabs.bills": "🧾 Bill Settlements",
      "history.session.winner": "Winning Menu:",
      "history.session.with": "With",
      "history.bill.yourShare": "Your Share",
      "history.bill.total": "Total Bill",
      "history.empty": "No food battle history yet",
      "profile.title": "User Profile",
      "profile.badge": "👑 Host & Food Fighter",
      "profile.statBattles": "FoodFights",
      "profile.statPlaces": "Places Visited",
      "profile.statSettled": "Bills Settled",
      "profile.foodSafety": "Food Safety & Diet Profile",
      "profile.appliedToAll": "Applied automatically to all group sessions",
      "profile.editFoodCTA": "Edit Food Preferences ✏️ →",
      "profile.logout": "Log Out of Demo",
      "profile.edit.title": "Edit Food Profile",
      "profile.edit.allergies": "1. Food Allergies (Strict Exclusions)",
      "profile.edit.restrictions": "2. Dietary Restrictions",
      "profile.edit.notes": "3. Personal Flavor & Notes",
      "profile.edit.save": "Save Changes ✓",
      "profile.edit.toastSuccess": "Food profile updated successfully!"
    }
  };

  /* ==========================================================================
     2. i18n Core Engine (State, Getter/Setter, Translation & Interpolation)
     ========================================================================== */

  let currentLang = 'th';

  function initLanguage() {
    try {
      const state = P.getState ? P.getState() : null;
      if (state && state.ui && state.ui.language) {
        currentLang = state.ui.language === 'en' ? 'en' : 'th';
      }
    } catch (e) {
      currentLang = 'th';
    }
    updateDocumentLang();
  }

  function getLanguage() {
    return currentLang;
  }

  function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'th';
    updateDocumentLang();

    try {
      const state = P.getState ? P.getState() : null;
      if (state) {
        state.ui = state.ui || {};
        state.ui.language = currentLang;
        if (P.saveState) P.saveState();
      }
    } catch (e) {
      console.warn('Failed to persist language choice to prototype state', e);
    }

    // Re-render current route without reloading page or altering hash
    if (P.renderCurrentRoute) {
      P.renderCurrentRoute();
    }
  }

  function updateDocumentLang() {
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }
  }

  function t(key, params = {}) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.th;
    let text = dict[key];

    // Fallback to English if key is missing in active locale
    if (text === undefined) {
      text = TRANSLATIONS.en[key];
    }

    // If still missing, return key gracefully
    if (text === undefined) {
      return key;
    }

    // Dynamic Parameter Interpolation: {paramName}
    if (params && typeof params === 'object') {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }

    return text;
  }

  /* ==========================================================================
     3. Global Compact Language Switch Component
     ========================================================================== */

  function renderLanguageSwitch() {
    const isTH = currentLang === 'th';
    const isEN = currentLang === 'en';

    return `
      <div class="lang-switch-group" role="group" aria-label="Language Selector">
        <button 
          type="button" 
          class="lang-switch-btn ${isTH ? 'active' : ''}" 
          onclick="window.FFPrototype.i18n.setLanguage('th')" 
          aria-pressed="${isTH}" 
          aria-label="เปลี่ยนเป็นภาษาไทย"
        >
          TH
        </button>
        <button 
          type="button" 
          class="lang-switch-btn ${isEN ? 'active' : ''}" 
          onclick="window.FFPrototype.i18n.setLanguage('en')" 
          aria-pressed="${isEN}" 
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    `;
  }

  // Initialize on load
  initLanguage();

  // Expose to Prototype Namespace
  P.i18n = {
    TRANSLATIONS: TRANSLATIONS,
    getLanguage: getLanguage,
    setLanguage: setLanguage,
    t: t,
    renderLanguageSwitch: renderLanguageSwitch
  };

  // Direct shortcut for convenience
  P.t = t;
  P.renderLanguageSwitch = renderLanguageSwitch;

})();
