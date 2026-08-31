/**
 * FoodFighter - Wave 03 local bill, payment, and history prototype
 *
 * This module extends the approved Wave 01 shell and component grammar. It
 * intentionally models only the UI state needed to walk a meal bill from a
 * selected restaurant to a local completion record. It never calls a service
 * and it does not represent a production bill, payment, or settlement model.
 */
(function () {
  'use strict';

  window.FFPrototype = window.FFPrototype || {};

  const P = window.FFPrototype;
  const W = P.WAVE1;
  const C = P.WAVE1_COMPONENTS;
  const S = P.WAVE1_SHELL;

  const copy = {
    en: {
      billKicker: 'BILL · FOODFIGHT',
      billTitle: 'Keep the meal math clear',
      billBody: 'Review the reported meal bill, decide how the table shares it, and keep every payment record easy to read.',
      billValue: 'Reported meal bill value',
      billValueNote: 'The total reported by this meal group. It is not platform revenue or a settlement amount.',
      memberSummary: 'Member payment summary',
      sharePending: 'Shares appear after the split is reviewed.',
      reviewReceipt: 'Review receipt',
      reviewItems: 'Review bill items',
      reviewSplit: 'Review split',
      viewDetail: 'View bill detail',
      viewStatus: 'View payment status',
      payShare: 'Pay my share',
      backRestaurant: 'Back to restaurant',
      emptyBillTitle: 'No meal bill yet',
      emptyBillBody: 'Start the local bill specimen after choosing a restaurant. No financial record is created.',
      startBill: 'Start bill specimen',
      receiptKicker: 'RECEIPT CONTEXT',
      receiptTitle: 'Bring the table total into focus',
      receiptBody: 'This local receipt step shows where a future receipt review could live. Nothing is uploaded or read by OCR.',
      receiptPlaceholder: 'PROTOTYPE RECEIPT PLACEHOLDER',
      receiptEmpty: 'No receipt selected',
      receiptSelected: 'Receipt selected',
      receiptProcessing: 'Processing placeholder',
      receiptError: 'Receipt review needs a retry',
      chooseLocalReceipt: 'Use sample receipt',
      selectReceipt: 'Select local image',
      processReceipt: 'Process placeholder',
      continueItems: 'Review items',
      receiptNoOcr: 'Local visual state only · no upload service · no OCR',
      itemsKicker: 'BILL ITEMS',
      itemsTitle: 'Check what the table reported',
      itemsBody: 'Make a small local correction if needed. The reported total must reconcile before the split can be confirmed.',
      reportedTotal: 'Reported total',
      itemTotal: 'Item total',
      reconciled: 'Reconciled',
      notReconciled: 'Needs review',
      continueSplit: 'Continue to split',
      repairTotal: 'Repair reported total',
      invalidTotal: 'Preview mismatch',
      splitKicker: 'SPLIT THE MEAL',
      splitTitle: 'Make each share feel fair',
      splitBody: 'Choose a simple local split method. Every displayed member share adds back to the reported meal bill value.',
      splitMethod: 'Split method',
      equalSplit: 'Equal share',
      itemSplit: 'Item-based share',
      members: 'Members',
      assignItems: 'Assign items',
      selectedMember: 'Included in split',
      excludedMember: 'Not included',
      shareBreakdown: 'Share breakdown',
      allocated: 'Allocated',
      unallocated: 'Unallocated',
      confirmSplit: 'Confirm split',
      splitConfirmed: 'Split confirmed locally',
      splitError: 'Select at least one member and reconcile the bill before continuing.',
      confirmSplitTitle: 'Confirm this local split?',
      confirmSplitBody: 'The displayed shares will be used for this prototype walkthrough. They are amounts owed within the meal only.',
      confirm: 'Confirm',
      detailKicker: 'BILL DETAIL',
      detailTitle: 'One calm view of the table bill',
      detailBody: 'See the meal context, reported total, shares, and in-app payment-record states together.',
      items: 'Items',
      paymentRecord: 'Payment record',
      financialTruth: 'Meal bill value and member shares describe the same meal. They must not be added together as separate economic value.',
      paymentKicker: 'MY SHARE',
      paymentTitle: 'Mark your share when you are ready',
      paymentBody: 'This is a local confirmation interaction. It does not contact a bank, payment gateway, or account.',
      amountOwed: 'Amount owed',
      paidAt: 'Marked paid in prototype',
      markPaid: 'Mark my share as paid',
      alreadyPaid: 'Your share is marked paid',
      paymentConfirmTitle: 'Mark this share as paid?',
      paymentConfirmBody: 'This changes only the local payment-record state for the prototype.',
      paymentStatusKicker: 'PAYMENT STATUS',
      paymentStatusTitle: 'Keep the group in the loop',
      paymentStatusBody: 'Track which member shares are marked paid. This is not bank settlement confirmation.',
      progressLabel: '{paid} of {total} members marked paid',
      allPaid: 'All member shares are marked paid',
      notPaid: 'Not marked paid',
      closePreview: 'Closed preview',
      completeKicker: 'FOODFIGHT COMPLETE',
      completeTitle: 'The table is clear',
      completeBody: 'All member shares are marked paid for this local FoodFight.',
      goHistory: 'View history',
      goHome: 'Back to home',
      closeUnsupported: 'Close Bill is not part of the current product contract. CLOSED is available only as a local review scenario.',
      noSettlement: 'Payment status is an in-app record only · no bank settlement confirmation',
      historyKicker: 'YOUR FOODFIGHTS',
      historyTitle: 'Good decisions worth remembering',
      historyBody: 'A local history of completed FoodFight walkthroughs. No server history is loaded.',
      historyEmptyTitle: 'No FoodFights recorded yet',
      historyEmptyBody: 'Complete the local bill walkthrough and this table will have a memory to keep.',
      browseHome: 'Start from home',
      historyDetailKicker: 'HISTORY DETAIL',
      historyDetailTitle: 'A meal, remembered clearly',
      loadHistory: 'Load local history',
      historyLoadingTitle: 'Gathering the local table memories',
      historyLoadingBody: 'A short loading specimen for the future history surface.',
      date: 'Date',
      group: 'Group',
      restaurant: 'Restaurant',
      status: 'Status',
      localOnly: 'LOCAL PROTOTYPE · no API · no payment service',
      scenario: 'Local bill state preview',
      normal: 'Normal',
      noBill: 'No bill',
      draft: 'Draft bill',
      splitPending: 'Split pending',
      partiallyPaid: 'Partially paid',
      allPaidScenario: 'All paid',
      closedScenario: 'Closed preview',
      historyNormal: 'Recorded',
      historyEmpty: 'Empty',
      historyOne: 'One item',
      historyMany: 'Many items',
      sampleReceipt: 'sample-receipt-local.jpg',
      localReceipt: 'Local image selected · no upload',
      retry: 'Retry review',
      back: 'Back',
      loading: 'Preparing…',
      close: 'Close',
      openPayment: 'Open my payment',
      chooseScenario: 'Choose a state to inspect',
      receiptReview: 'Receipt review ready',
      noRestaurant: 'Restaurant context is local and optional',
      noMembers: 'No members in this local bill',
      currentMeal: 'Selected meal',
      localData: 'Local specimen data',
      previewOnly: 'Prototype state preview only',
      nextWave: 'Next prototype wave: deeper bill and payment edge cases'
    },
    th: {
      billKicker: 'บิล · FOODFIGHT',
      billTitle: 'ดูยอดมื้ออาหารให้ชัดเจน',
      billBody: 'ตรวจยอดบิลของมื้ออาหาร เลือกวิธีแบ่ง และดูสถานะการจ่ายของทุกคนได้ง่ายขึ้น',
      billValue: 'มูลค่าบิลมื้ออาหารที่รายงาน',
      billValueNote: 'ยอดรวมของมื้ออาหารนี้ ไม่ใช่รายได้ของแพลตฟอร์มหรือยอดชำระเงินของระบบ',
      memberSummary: 'สรุปการจ่ายของสมาชิก',
      sharePending: 'ยอดของแต่ละคนจะแสดงหลังตรวจสอบการแบ่งบิล',
      reviewReceipt: 'ตรวจสอบใบเสร็จ',
      reviewItems: 'ตรวจรายการอาหาร',
      reviewSplit: 'ตรวจการแบ่งบิล',
      viewDetail: 'ดูรายละเอียดบิล',
      viewStatus: 'ดูสถานะการจ่าย',
      payShare: 'จ่ายส่วนของฉัน',
      backRestaurant: 'กลับไปร้านอาหาร',
      emptyBillTitle: 'ยังไม่มีบิลของมื้ออาหาร',
      emptyBillBody: 'เริ่มตัวอย่างบิลในเครื่องหลังเลือกร้านอาหาร ระบบจะไม่สร้างข้อมูลการเงินจริง',
      startBill: 'เริ่มตัวอย่างบิล',
      receiptKicker: 'บริบทใบเสร็จ',
      receiptTitle: 'ทำให้ยอดของโต๊ะชัดเจน',
      receiptBody: 'ขั้นตอนนี้แสดงตำแหน่งสำหรับการตรวจใบเสร็จในอนาคต ไม่มีการอัปโหลดหรืออ่าน OCR จริง',
      receiptPlaceholder: 'ตัวอย่างใบเสร็จต้นแบบ',
      receiptEmpty: 'ยังไม่ได้เลือกใบเสร็จ',
      receiptSelected: 'เลือกใบเสร็จแล้ว',
      receiptProcessing: 'กำลังประมวลผลตัวอย่าง',
      receiptError: 'ตรวจใบเสร็จไม่สำเร็จ',
      chooseLocalReceipt: 'ใช้ใบเสร็จตัวอย่าง',
      selectReceipt: 'เลือกภาพในเครื่อง',
      processReceipt: 'ประมวลผลตัวอย่าง',
      continueItems: 'ตรวจรายการ',
      receiptNoOcr: 'สถานะภาพในต้นแบบเท่านั้น · ไม่มีบริการอัปโหลด · ไม่มี OCR',
      itemsKicker: 'รายการในบิล',
      itemsTitle: 'ตรวจสิ่งที่โต๊ะรายงาน',
      itemsBody: 'แก้ไขตัวอย่างในเครื่องได้ถ้าจำเป็น ยอดรวมต้องตรงกันก่อนยืนยันการแบ่ง',
      reportedTotal: 'ยอดรวมที่รายงาน',
      itemTotal: 'ยอดรวมรายการ',
      reconciled: 'ยอดตรงกัน',
      notReconciled: 'ต้องตรวจสอบ',
      continueSplit: 'ไปแบ่งบิล',
      repairTotal: 'ปรับยอดให้ตรงกัน',
      invalidTotal: 'ดูตัวอย่างยอดไม่ตรง',
      splitKicker: 'แบ่งมื้ออาหาร',
      splitTitle: 'แบ่งส่วนของแต่ละคนอย่างชัดเจน',
      splitBody: 'เลือกวิธีแบ่งแบบง่ายในต้นแบบ ยอดของสมาชิกทุกคนจะรวมกลับเป็นยอดบิลมื้ออาหาร',
      splitMethod: 'วิธีแบ่งบิล',
      equalSplit: 'แบ่งเท่ากัน',
      itemSplit: 'แบ่งตามรายการ',
      members: 'สมาชิก',
      assignItems: 'กำหนดรายการ',
      selectedMember: 'รวมในการแบ่ง',
      excludedMember: 'ไม่รวม',
      shareBreakdown: 'สรุปส่วนของแต่ละคน',
      allocated: 'จัดสรรแล้ว',
      unallocated: 'ยังไม่ได้จัดสรร',
      confirmSplit: 'ยืนยันการแบ่ง',
      splitConfirmed: 'ยืนยันการแบ่งในต้นแบบแล้ว',
      splitError: 'เลือกสมาชิกอย่างน้อยหนึ่งคนและตรวจยอดให้ตรงกันก่อนดำเนินการต่อ',
      confirmSplitTitle: 'ยืนยันการแบ่งในต้นแบบนี้หรือไม่?',
      confirmSplitBody: 'ยอดที่แสดงจะใช้สำหรับการเดินต้นแบบเท่านั้น เป็นจำนวนที่สมาชิกค้างจ่ายในมื้ออาหาร',
      confirm: 'ยืนยัน',
      detailKicker: 'รายละเอียดบิล',
      detailTitle: 'มองบิลของโต๊ะได้ในที่เดียว',
      detailBody: 'ดูบริบทมื้ออาหาร ยอดรวม ส่วนแบ่ง และสถานะการจ่ายในแอปพร้อมกัน',
      items: 'รายการอาหาร',
      paymentRecord: 'บันทึกการจ่าย',
      financialTruth: 'ยอดบิลและส่วนแบ่งสมาชิกอธิบายมื้ออาหารเดียวกัน ห้ามนำมาบวกเป็นมูลค่าทางเศรษฐกิจแยกกัน',
      paymentKicker: 'ส่วนของฉัน',
      paymentTitle: 'กดยืนยันเมื่อพร้อม',
      paymentBody: 'เป็นการเปลี่ยนสถานะในต้นแบบเท่านั้น ไม่มีการติดต่อธนาคาร เกตเวย์ หรือบัญชีจริง',
      amountOwed: 'จำนวนที่ค้างจ่าย',
      paidAt: 'ทำเครื่องหมายว่าจ่ายแล้วในต้นแบบ',
      markPaid: 'ทำเครื่องหมายว่าส่วนของฉันจ่ายแล้ว',
      alreadyPaid: 'ส่วนของคุณถูกทำเครื่องหมายว่าจ่ายแล้ว',
      paymentConfirmTitle: 'ทำเครื่องหมายว่าส่วนนี้จ่ายแล้วหรือไม่?',
      paymentConfirmBody: 'การเปลี่ยนแปลงนี้มีผลกับสถานะในต้นแบบเท่านั้น',
      paymentStatusKicker: 'สถานะการจ่าย',
      paymentStatusTitle: 'ให้ทุกคนเห็นภาพเดียวกัน',
      paymentStatusBody: 'ติดตามว่าสมาชิกคนไหนทำเครื่องหมายว่าจ่ายแล้ว นี่ไม่ใช่การยืนยันการโอนผ่านธนาคาร',
      progressLabel: 'ทำเครื่องหมายแล้ว {paid} จาก {total} คน',
      allPaid: 'สมาชิกทุกคนทำเครื่องหมายว่าจ่ายแล้ว',
      notPaid: 'ยังไม่ได้ทำเครื่องหมายว่าจ่าย',
      closePreview: 'ตัวอย่างสถานะปิดบิล',
      completeKicker: 'FOODFIGHT เสร็จแล้ว',
      completeTitle: 'โต๊ะอาหารเรียบร้อยแล้ว',
      completeBody: 'สมาชิกทุกคนทำเครื่องหมายว่าส่วนของตัวเองจ่ายแล้วใน FoodFight ต้นแบบนี้',
      goHistory: 'ดูประวัติ',
      goHome: 'กลับหน้าหลัก',
      closeUnsupported: 'สัญญาผลิตภัณฑ์ปัจจุบันยังไม่รองรับการปิดบิล สถานะ CLOSED มีไว้ดูตัวอย่างในเครื่องเท่านั้น',
      noSettlement: 'เป็นสถานะการจ่ายในแอปเท่านั้น · ไม่มีการยืนยันการชำระผ่านธนาคาร',
      historyKicker: 'FOODFIGHT ของคุณ',
      historyTitle: 'มื้อดี ๆ ที่อยากจำไว้',
      historyBody: 'ประวัติการเดินต้นแบบในเครื่อง ไม่มีการโหลดประวัติจากเซิร์ฟเวอร์',
      historyEmptyTitle: 'ยังไม่มี FoodFight ในประวัติ',
      historyEmptyBody: 'เดินต้นแบบบิลให้จบ แล้วโต๊ะนี้จะมีความทรงจำใหม่',
      browseHome: 'เริ่มจากหน้าหลัก',
      historyDetailKicker: 'รายละเอียดประวัติ',
      historyDetailTitle: 'มื้ออาหารที่บันทึกไว้อย่างชัดเจน',
      loadHistory: 'โหลดประวัติในเครื่อง',
      historyLoadingTitle: 'กำลังรวบรวมความทรงจำของโต๊ะ',
      historyLoadingBody: 'ตัวอย่างสถานะกำลังโหลดสั้น ๆ สำหรับหน้าประวัติในอนาคต',
      date: 'วันที่',
      group: 'กลุ่ม',
      restaurant: 'ร้านอาหาร',
      status: 'สถานะ',
      localOnly: 'ต้นแบบในเครื่อง · ไม่มี API · ไม่มีบริการจ่ายเงิน',
      scenario: 'ดูตัวอย่างสถานะบิลในเครื่อง',
      normal: 'ปกติ',
      noBill: 'ไม่มีบิล',
      draft: 'บิลร่าง',
      splitPending: 'รอแบ่งบิล',
      partiallyPaid: 'จ่ายบางส่วน',
      allPaidScenario: 'จ่ายครบในบันทึก',
      closedScenario: 'ตัวอย่างปิดบิล',
      historyNormal: 'รายการที่บันทึก',
      historyEmpty: 'ว่าง',
      historyOne: 'หนึ่งรายการ',
      historyMany: 'หลายรายการ',
      sampleReceipt: 'sample-receipt-local.jpg',
      localReceipt: 'เลือกภาพในเครื่องแล้ว · ไม่มีการอัปโหลด',
      retry: 'ลองตรวจอีกครั้ง',
      back: 'กลับ',
      loading: 'กำลังเตรียม…',
      close: 'ปิด',
      openPayment: 'เปิดการจ่ายของฉัน',
      chooseScenario: 'เลือกสถานะสำหรับตรวจ',
      receiptReview: 'พร้อมตรวจรายการจากใบเสร็จ',
      noRestaurant: 'บริบทร้านอาหารเป็นข้อมูลต้นแบบและไม่บังคับ',
      noMembers: 'ยังไม่มีสมาชิกในบิลต้นแบบนี้',
      currentMeal: 'เมนูที่เลือก',
      localData: 'ข้อมูลตัวอย่างในเครื่อง',
      previewOnly: 'เป็นการดูตัวอย่างสถานะในต้นแบบเท่านั้น',
      nextWave: 'ต้นแบบเวฟถัดไป: ขอบเขตบิลและการจ่ายที่ละเอียดขึ้น'
    }
  };

  const BILL_ITEMS = [
    { id: 'item-tom-yum', name: 'Tom Yum', thai: 'ต้มยำ', quantity: 1, amount: 320, tone: 'petal' },
    { id: 'item-korean-bbq', name: 'Korean BBQ set', thai: 'เซ็ตปิ้งย่างเกาหลี', quantity: 1, amount: 480, tone: 'apricot' },
    { id: 'item-drinks', name: 'Drinks', thai: 'เครื่องดื่ม', quantity: 4, amount: 160, tone: 'custard' },
    { id: 'item-side', name: 'Shared side dish', thai: 'เครื่องเคียงกลาง', quantity: 1, amount: 80, tone: 'petal' }
  ];

  const FALLBACK_MEMBERS = [
    { id: 'pure', name: 'Pure', initials: 'P', role: 'Host', tone: 'petal' },
    { id: 'mark', name: 'Mark', initials: 'M', role: 'Member', tone: 'apricot' },
    { id: 'lina', name: 'Lina', initials: 'L', role: 'Member', tone: 'custard' },
    { id: 'james', name: 'James', initials: 'J', role: 'Member', tone: 'mauve' },
    { id: 'nana', name: 'Nana', initials: 'N', role: 'Member', tone: 'petal' }
  ];

  const HISTORY_SEEDS = [
    { id: 'history-local-1', roomName: 'Friday FoodFight', mealName: 'Tom Yum', mealThai: 'ต้มยำ', restaurantName: 'The Warm Table', date: '2026-08-22', memberCount: 4, billStatus: 'All shares marked paid', totalAmount: 920, tone: 'petal' },
    { id: 'history-local-2', roomName: 'Korean BBQ night', mealName: 'Korean BBQ', mealThai: 'ปิ้งย่างเกาหลี', restaurantName: 'Shared Flame', date: '2026-08-16', memberCount: 5, billStatus: 'All shares marked paid', totalAmount: 1480, tone: 'apricot' },
    { id: 'history-local-3', roomName: 'Sunday noodle table', mealName: 'Yakisoba', mealThai: 'ยากิโซบะ', restaurantName: 'Noodle Room', date: '2026-08-09', memberCount: 3, billStatus: 'All shares marked paid', totalAmount: 680, tone: 'custard' }
  ];

  const SCENARIOS = [
    ['normal', 'normal'],
    ['no-bill', 'noBill'],
    ['draft', 'draft'],
    ['split-pending', 'splitPending'],
    ['partially-paid', 'partiallyPaid'],
    ['all-paid', 'allPaidScenario'],
    ['closed', 'closedScenario']
  ];

  const HISTORY_SCENARIOS = [
    ['normal', 'historyNormal'],
    ['empty', 'historyEmpty'],
    ['one', 'historyOne'],
    ['many', 'historyMany']
  ];

  function state() {
    return W.getState();
  }

  function raw(key, variables) {
    const language = state().ui.language === 'en' ? 'en' : 'th';
    let value = copy[language][key] || copy.en[key] || key;
    Object.entries(variables || {}).forEach(([name, replacement]) => {
      value = value.replace(new RegExp(`\\{${name}\\}`, 'g'), String(replacement));
    });
    return value;
  }

  function text(key, variables) {
    return C.esc(raw(key, variables));
  }

  function language() {
    return state().ui.language === 'en' ? 'en' : 'th';
  }

  function displayName(value) {
    return C.esc(value || '—');
  }

  function money(value) {
    const amount = Number.isFinite(Number(value)) ? Math.round(Number(value)) : 0;
    return `฿${amount.toLocaleString('en-US')}`;
  }

  function sumItems(items) {
    return (items || []).reduce((total, item) => total + Math.max(0, Number(item.amount) || 0), 0);
  }

  function membersForBill() {
    const roomMembers = state().currentRoom?.members || state().roomMembers || [];
    const source = roomMembers.length ? roomMembers : FALLBACK_MEMBERS;
    return source.map((member, index) => ({
      id: member.id || `member-${index}`,
      name: member.name || 'Member',
      initials: member.initials || String(member.name || 'M').slice(0, 1).toUpperCase(),
      role: member.role || 'Member',
      tone: member.tone || ['petal', 'apricot', 'custard', 'mauve'][index % 4],
      ready: Boolean(member.ready)
    }));
  }

  function selectedRestaurant() {
    return W.restaurants.find((restaurant) => restaurant.id === state().restaurantSelection) || W.restaurants[0] || null;
  }

  function selectedMeal() {
    return state().winner || W.recommendations?.[0] || { name: 'Tom Yum', thai: 'ต้มยำ', tags: ['Thai'] };
  }

  function ensureBillFlow() {
    const s = state();
    if (!s.billFlow) s.billFlow = {};
    s.billFlow.receiptStep = s.billFlow.receiptStep || 'entry';
    s.billFlow.splitStep = s.billFlow.splitStep || 'setup';
    s.billFlow.selectedItems = s.billFlow.selectedItems || [];
    s.billFlow.selectedMembers = s.billFlow.selectedMembers || [];
    s.billFlow.itemAssignments = s.billFlow.itemAssignments || {};
    s.billFlow.completion = s.billFlow.completion || 'open';
    s.billFlow.historySelection = s.billFlow.historySelection || null;
    s.billFlow.validationError = s.billFlow.validationError || '';
    s.billFlow.splitConfirmed = Boolean(s.billFlow.splitConfirmed);
    s.billFlow.historyRecorded = Boolean(s.billFlow.historyRecorded);
    return s.billFlow;
  }

  function freshBillFlow(memberIds, items) {
    return {
      receiptStep: 'entry',
      splitStep: 'setup',
      selectedItems: [],
      selectedMembers: [...memberIds],
      itemAssignments: Object.fromEntries((items || []).map((item) => [item.id, [...memberIds]])),
      completion: 'open',
      historySelection: null,
      validationError: '',
      splitConfirmed: false,
      historyRecorded: false
    };
  }

  function createBill() {
    const s = state();
    const members = membersForBill();
    const items = W.deepClone(BILL_ITEMS);
    const memberIds = members.map((member) => member.id);
    const restaurant = selectedRestaurant();
    const meal = selectedMeal();
    const room = s.currentRoom;
    s.bill = {
      id: 'bill-local-4827',
      status: 'DRAFT',
      totalAmount: sumItems(items),
      createdAt: '2026-08-28T20:30:00',
      roomName: room?.name || 'Friday FoodFight',
      roomCode: room?.code || 'FF-4827',
      winner: W.deepClone(meal),
      restaurant: restaurant ? W.deepClone(restaurant) : null,
      items,
      members: W.deepClone(members),
      splitMode: 'equal',
      receipt: {
        status: 'empty',
        fileName: '',
        source: 'local prototype'
      }
    };
    s.payments = members.map((member) => ({ memberId: member.id, amount: 0, status: 'unpaid', paidAt: null }));
    s.billFlow = freshBillFlow(memberIds, items);
    s.ui.billScenario = 'normal';
    s.ui.receiptState = 'empty';
    syncPaymentAmounts();
    return s.bill;
  }

  function ensureBill(options) {
    const opts = options || {};
    const s = state();
    if (s.ui.billScenario === 'no-bill') return null;
    if (s.bill) {
      ensureBillFlow();
      return s.bill;
    }
    if (opts.create || s.restaurantSelection || s.currentRoom) return createBill();
    return null;
  }

  function shareDistribution(amount, ids) {
    const result = Object.fromEntries((ids || []).map((id) => [id, 0]));
    if (!ids?.length) return result;
    const safeAmount = Math.max(0, Math.round(Number(amount) || 0));
    const base = Math.floor(safeAmount / ids.length);
    let remainder = safeAmount - (base * ids.length);
    ids.forEach((id) => {
      result[id] = base + (remainder > 0 ? 1 : 0);
      remainder -= 1;
    });
    return result;
  }

  function calculateShares() {
    const s = state();
    const bill = s.bill;
    const flow = ensureBillFlow();
    const members = bill?.members || membersForBill();
    const ids = members.map((member) => member.id);
    const shares = Object.fromEntries(ids.map((id) => [id, 0]));
    const total = Math.max(0, Math.round(Number(bill?.totalAmount) || 0));
    if (!bill) return { shares, total, allocated: 0, unallocated: total, reconciles: false };

    if (bill.splitMode === 'item') {
      (bill.items || []).forEach((item) => {
        const assigned = (flow.itemAssignments[item.id] || []).filter((id) => ids.includes(id));
        if (!assigned.length) return;
        const itemShares = shareDistribution(item.amount, assigned);
        Object.entries(itemShares).forEach(([id, value]) => {
          shares[id] = (shares[id] || 0) + value;
        });
      });
    } else {
      const selected = flow.selectedMembers.filter((id) => ids.includes(id));
      Object.assign(shares, shareDistribution(total, selected));
    }
    const allocated = Object.values(shares).reduce((sum, value) => sum + value, 0);
    return { shares, total, allocated, unallocated: Math.max(0, total - allocated), reconciles: allocated === total && allocated > 0 };
  }

  function syncPaymentAmounts() {
    const s = state();
    if (!s.bill) return;
    const summary = calculateShares();
    const existing = new Map((s.payments || []).map((payment) => [payment.memberId, payment]));
    s.payments = (s.bill.members || membersForBill()).map((member) => {
      const previous = existing.get(member.id) || {};
      return {
        memberId: member.id,
        amount: summary.shares[member.id] || 0,
        status: previous.status === 'paid' ? 'paid' : 'unpaid',
        paidAt: previous.status === 'paid' ? previous.paidAt : null
      };
    });
  }

  function updateBillStatus() {
    const s = state();
    if (!s.bill) return;
    const flow = ensureBillFlow();
    if (s.bill.status === 'CLOSED') return;
    if (!flow.splitConfirmed) {
      s.bill.status = s.bill.receipt?.status === 'review' || s.bill.receipt?.status === 'selected' ? 'SPLIT_PENDING' : 'DRAFT';
      return;
    }
    const payments = s.payments || [];
    const paid = payments.filter((payment) => payment.status === 'paid').length;
    if (!payments.length || paid === 0) s.bill.status = 'SPLIT_PENDING';
    else if (paid === payments.length) s.bill.status = 'ALL_PAID';
    else s.bill.status = 'PARTIALLY_PAID';
  }

  function applyBillScenario(mode) {
    const s = state();
    const normalized = mode || 'normal';
    s.ui.billScenario = normalized;
    if (normalized === 'no-bill') {
      s.bill = null;
      s.payments = [];
      s.billFlow = freshBillFlow([], []);
      s.ui.receiptState = 'empty';
      W.refresh();
      return;
    }
    const bill = createBill();
    s.ui.billScenario = normalized;
    const flow = ensureBillFlow();
    const members = bill.members || membersForBill();
    bill.receipt.status = normalized === 'draft' || normalized === 'normal' ? 'empty' : 'review';
    s.ui.receiptState = bill.receipt.status;
    flow.receiptStep = bill.receipt.status === 'empty' ? 'entry' : 'reviewed';
    flow.splitConfirmed = ['partially-paid', 'all-paid', 'closed'].includes(normalized);
    flow.splitStep = flow.splitConfirmed ? 'confirmed' : 'setup';
    syncPaymentAmounts();
    if (normalized === 'partially-paid') {
      s.payments.slice(0, Math.min(2, s.payments.length)).forEach((payment) => {
        payment.status = 'paid';
        payment.paidAt = '2026-08-28T21:00:00';
      });
    }
    if (normalized === 'all-paid' || normalized === 'closed') {
      s.payments.forEach((payment) => {
        payment.status = 'paid';
        payment.paidAt = '2026-08-28T21:00:00';
      });
    }
    updateBillStatus();
    if (normalized === 'closed') bill.status = 'CLOSED';
    if (!members.length) flow.selectedMembers = [];
    W.refresh();
  }

  function statusMeta(status) {
    const map = {
      DRAFT: ['Draft bill', 'neutral', 'clock'],
      SPLIT_PENDING: ['Split pending', 'warning', 'clock'],
      PARTIALLY_PAID: ['Partially paid', 'warning', 'clock'],
      ALL_PAID: ['All shares marked paid', 'success', 'check'],
      CLOSED: ['Closed preview', 'brand', 'lock'],
      paid: ['Paid', 'success', 'check'],
      unpaid: ['Unpaid', 'warning', 'clock']
    };
    const entry = map[status] || [status || 'Unknown', 'neutral', 'info'];
    const localized = status === 'paid' ? (language() === 'th' ? 'จ่ายแล้ว' : entry[0])
      : status === 'unpaid' ? raw('notPaid')
        : status === 'ALL_PAID' ? raw('allPaid')
          : status === 'CLOSED' ? raw('closePreview')
            : status === 'PARTIALLY_PAID' ? raw('partiallyPaid')
              : status === 'SPLIT_PENDING' ? raw('splitPending')
                : status === 'DRAFT' ? raw('draft') : entry[0];
    return { label: localized, tone: entry[1], icon: entry[2] };
  }

  function statusPill(status) {
    const meta = statusMeta(status);
    return `<span class="ff-w3-status ff-w3-status-${meta.tone}">${C.icon(meta.icon, 14)}<span>${C.esc(meta.label)}</span></span>`;
  }

  function candidateLabel() {
    return `<div class="ff-w3-candidate-label" role="note"><span>PROTOTYPE ONLY</span><strong>${text('localOnly')}</strong></div>`;
  }

  function localNote(message) {
    return `<p class="ff-w3-local-note">${C.icon('lock', 14)}<span>${message || text('localOnly')}</span></p>`;
  }

  function backLink(href, label) {
    return `<a class="ff-back-link ff-w3-back" href="${C.esc(href)}">${C.icon('arrowLeft', 17)}<span>${label || text('back')}</span></a>`;
  }

  function flowProgress(active) {
    const steps = [
      ['bill', language() === 'th' ? 'บิล' : 'Bill'],
      ['receipt', language() === 'th' ? 'ใบเสร็จ' : 'Receipt'],
      ['split', language() === 'th' ? 'แบ่ง' : 'Split'],
      ['payment', language() === 'th' ? 'จ่าย' : 'Pay'],
      ['history', language() === 'th' ? 'ประวัติ' : 'History']
    ];
    const activeIndex = steps.findIndex(([id]) => id === active);
    return `<nav class="ff-w3-progress" aria-label="Bill flow progress">${steps.map(([id, label], index) => `<span class="${index < activeIndex ? 'is-done' : ''} ${id === active ? 'is-active' : ''}"><i>${index < activeIndex ? C.icon('check', 11) : index + 1}</i><b>${C.esc(label)}</b></span>`).join('<em aria-hidden="true"></em>')}</nav>`;
  }

  function button(label, variant, size, action, options) {
    const opts = options || {};
    const classes = ['ff-btn', `ff-btn-${variant || 'brand'}`, `ff-btn-${size || 'md'}`, 'ff-w3-button'];
    if (opts.className) classes.push(opts.className);
    const iconName = opts.loading ? 'spinner' : opts.icon;
    const iconMarkup = iconName ? C.icon(iconName, opts.iconSize || 18, opts.loading ? 'ff-spinner' : '') : '';
    const attrs = [
      `data-w3-action="${C.esc(action)}"`,
      opts.value !== undefined ? `data-w3-value="${C.esc(opts.value)}"` : '',
      opts.mode !== undefined ? `data-w3-mode="${C.esc(opts.mode)}"` : '',
      opts.memberId !== undefined ? `data-w3-member-id="${C.esc(opts.memberId)}"` : '',
      opts.itemId !== undefined ? `data-w3-item-id="${C.esc(opts.itemId)}"` : '',
      opts.pressed !== undefined ? `aria-pressed="${Boolean(opts.pressed)}"` : '',
      opts.label ? `aria-label="${C.esc(opts.label)}"` : '',
      opts.loading ? 'disabled aria-busy="true"' : '',
      opts.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');
    const content = opts.iconOnly
      ? iconMarkup || C.icon('sparkles', opts.iconSize || 18)
      : `${opts.iconRight ? '' : iconMarkup}<span>${C.esc(label)}</span>${opts.iconRight ? iconMarkup : ''}`;
    return `<button type="button" class="${classes.join(' ')}" ${attrs}>${content}</button>`;
  }

  function linkButton(label, href, variant, size, options) {
    const opts = options || {};
    const iconMarkup = opts.icon ? C.icon(opts.icon, opts.iconSize || 18) : '';
    return `<a href="${C.esc(href)}" class="ff-btn ff-btn-${variant || 'ghost'} ff-btn-${size || 'md'} ff-w3-button">${opts.iconRight ? `<span>${C.esc(label)}</span>${iconMarkup}` : `${iconMarkup}<span>${C.esc(label)}</span>`}</a>`;
  }

  function scenarioControl() {
    const current = state().ui.billScenario || 'normal';
    return `<section class="ff-w3-scenario" aria-label="${text('scenario')}"><div><span class="ff-eyebrow">LOCAL STATE</span><strong>${text('scenario')}</strong><p>${text('chooseScenario')}</p></div><div class="ff-w3-scenario-grid">${SCENARIOS.map(([value, key]) => `<button type="button" class="${current === value ? 'is-active' : ''}" data-w3-action="set-bill-scenario" data-w3-value="${value}" aria-pressed="${current === value}">${text(key)}</button>`).join('')}</div></section>`;
  }

  function historyScenarioControl() {
    const current = state().ui.historyScenario || 'normal';
    return `<section class="ff-w3-scenario ff-w3-history-scenario" aria-label="${text('historyKicker')}"><div><span class="ff-eyebrow">LOCAL STATE</span><strong>${text('historyKicker')}</strong><p>${text('chooseScenario')}</p></div><div class="ff-w3-scenario-grid">${HISTORY_SCENARIOS.map(([value, key]) => `<button type="button" class="${current === value ? 'is-active' : ''}" data-w3-action="set-history-scenario" data-w3-value="${value}" aria-pressed="${current === value}">${text(key)}</button>`).join('')}</div></section>`;
  }

  function renderOverlay() {
    const overlay = state().ui.overlay;
    if (!['w3-split-confirm', 'w3-payment-confirm'].includes(overlay)) return '';
    const isPayment = overlay === 'w3-payment-confirm';
    return `<div class="ff-overlay-layer ff-w3-overlay-layer" role="presentation"><section class="ff-w3-dialog" role="dialog" aria-modal="true" aria-labelledby="ff-w3-dialog-title"><button type="button" class="ff-icon-button ff-w3-dialog-close" data-w3-action="close-overlay" aria-label="${text('close')}">${C.icon('close', 18)}</button><span class="ff-icon-well ff-icon-well-${isPayment ? 'apricot' : 'custard'} ff-icon-well-md">${C.icon(isPayment ? 'check' : 'receipt', 22)}</span><h2 id="ff-w3-dialog-title">${text(isPayment ? 'paymentConfirmTitle' : 'confirmSplitTitle')}</h2><p>${text(isPayment ? 'paymentConfirmBody' : 'confirmSplitBody')}</p><div class="ff-w3-dialog-actions">${button(text('close'), 'ghost', 'md', 'close-overlay')}${button(text('confirm'), 'brand', 'md', isPayment ? 'confirm-payment' : 'confirm-split')}</div></section></div>`;
  }

  function page(content, active, className, options) {
    const opts = options || {};
    return S.productPage(`${content}${renderOverlay()}`, active, `ff-w3-page ${className || ''}`, { hideMobileNav: Boolean(opts.hideMobileNav), includeOverlay: false });
  }

  function renderHeader(kicker, title, body, active, progress, backHref, backLabel) {
    return `${backLink(backHref || '#/home', backLabel || text('back'))}<div class="ff-w3-flow-heading"><div><span class="ff-eyebrow">${kicker}</span><h1 class="ff-w3-editorial">${title}</h1><p class="ff-w3-lede">${body}</p></div>${progress ? flowProgress(progress) : ''}</div>`;
  }

  function renderEmptyBill() {
    const content = `<div class="ff-w3-flow"><div class="ff-w3-empty-hero"><div class="ff-w3-empty-icon">${C.icon('receipt', 30)}</div><span class="ff-eyebrow">${text('billKicker')}</span><h1 class="ff-w3-editorial">${text('emptyBillTitle')}</h1><p class="ff-w3-lede">${text('emptyBillBody')}</p>${candidateLabel()}<div class="ff-w3-empty-actions">${button(text('startBill'), 'brand', 'lg', 'start-bill', { icon: 'arrowRight', iconRight: true })}${linkButton(text('backRestaurant'), '#/restaurant', 'ghost', 'md', { icon: 'arrowLeft' })}</div></div>${scenarioControl()}${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-bills-page ff-w3-empty-page');
  }

  function renderContextCard(bill) {
    const meal = bill.winner || selectedMeal();
    const restaurant = bill.restaurant;
    return `<section class="ff-w3-context-card ff-w3-surface-petal"><div class="ff-w3-context-media">${C.media('recent', 'placeholder', { overlay: true })}</div><div class="ff-w3-context-copy"><span class="ff-eyebrow">${text('currentMeal')}</span><h2>${displayName(language() === 'th' ? meal.thai : meal.name)}</h2><div class="ff-w3-tag-row">${(meal.tags || ['FoodFight']).map((tag) => `<span>${displayName(tag)}</span>`).join('')}</div><dl class="ff-w3-facts"><div><dt>${text('restaurant')}</dt><dd>${displayName(restaurant?.name || raw('noRestaurant'))}</dd></div><div><dt>FoodFight</dt><dd>${displayName(bill.roomName)}</dd></div></dl></div></section>`;
  }

  function renderShareRows(summary, compact) {
    const bill = state().bill;
    const members = bill?.members || membersForBill();
    return `<div class="ff-w3-share-list ${compact ? 'is-compact' : ''}">${members.map((member) => {
      const payment = (state().payments || []).find((entry) => entry.memberId === member.id);
      const share = summary?.shares?.[member.id] || payment?.amount || 0;
      return `<div class="ff-w3-share-row"><div class="ff-w3-member-main">${C.avatar(member, 'sm')}<div><strong>${displayName(member.name)}</strong><span>${displayName(member.role)}</span></div></div><div class="ff-w3-share-amount"><strong>${money(share)}</strong>${statusPill(payment?.status || 'unpaid')}</div></div>`;
    }).join('')}</div>`;
  }

  function renderBillSummary(bill, summary) {
    const flow = ensureBillFlow();
    const next = !bill.receipt || ['empty', 'error'].includes(bill.receipt.status)
      ? ['reviewReceipt', '#/bills/receipt', 'arrowRight']
      : !flow.splitConfirmed
        ? ['reviewSplit', '#/bills/split', 'arrowRight']
        : ['viewStatus', '#/payment/status', 'arrowRight'];
    return `<section class="ff-w3-summary-card ff-w3-functional"><div class="ff-w3-summary-top"><div><span class="ff-eyebrow">${text('billValue')}</span><h2 class="ff-w3-value">${money(bill.totalAmount)}</h2></div>${statusPill(bill.status)}</div><p class="ff-w3-financial-note">${C.icon('info', 15)}<span>${text('billValueNote')}</span></p><div class="ff-w3-summary-divider"></div><div class="ff-w3-summary-row"><span>${text('memberSummary')}</span><strong>${bill.members.length} ${text('members')}</strong></div>${flow.splitConfirmed ? renderShareRows(summary, true) : `<p class="ff-w3-muted-copy">${text('sharePending')}</p>`}<div class="ff-w3-summary-action">${linkButton(text(next[0]), next[1], 'brand', 'md', { icon: next[2], iconRight: true })}</div></section>`;
  }

  function renderBills() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    updateBillStatus();
    const summary = calculateShares();
    const content = `<div class="ff-w3-flow">${renderHeader(text('billKicker'), text('billTitle'), text('billBody'), 'bills', 'bill', '#/restaurant', text('backRestaurant'))}${candidateLabel()}<div class="ff-w3-bill-grid"><div class="ff-w3-bill-context">${renderContextCard(bill)}<div class="ff-w3-bill-meta"><span>${C.icon('receipt', 15)} ${displayName(bill.id)}</span><span>${C.icon('users', 15)} ${bill.members.length} ${text('members')}</span></div></div>${renderBillSummary(bill, summary)}</div>${scenarioControl()}${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-bills-page');
  }

  function receiptStatusControls(status) {
    const values = [
      ['empty', 'receiptEmpty'],
      ['selected', 'receiptSelected'],
      ['processing', 'receiptProcessing'],
      ['error', 'receiptError']
    ];
    return `<div class="ff-w3-state-control"><span class="ff-eyebrow">LOCAL STATE</span><div>${values.map(([value, key]) => `<button type="button" class="${status === value ? 'is-active' : ''}" data-w3-action="set-receipt-state" data-w3-value="${value}" aria-pressed="${status === value}">${text(key)}</button>`).join('')}</div></div>`;
  }

  function renderReceipt() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const status = bill.receipt?.status || 'empty';
    const mediaState = status === 'processing' ? 'loading' : status === 'error' ? 'missing' : status === 'selected' || status === 'review' ? 'overlay' : 'placeholder';
    const isProcessing = W.isLoading('receipt');
    const action = status === 'error'
      ? button(text('retry'), 'secondary', 'md', 'retry-receipt', { icon: 'refresh' })
      : status === 'empty'
        ? button(text('chooseLocalReceipt'), 'brand', 'md', 'use-sample-receipt', { icon: 'receipt' })
        : status === 'selected'
          ? button(text('processReceipt'), 'secondary', 'md', 'process-receipt', { icon: 'sparkles', loading: isProcessing })
          : status === 'review'
            ? button(text('continueItems'), 'brand', 'lg', 'continue-receipt', { icon: 'arrowRight', iconRight: true })
            : '';
    const content = `<div class="ff-w3-flow">${renderHeader(text('receiptKicker'), text('receiptTitle'), text('receiptBody'), 'bills', 'receipt', '#/bills')}${candidateLabel()}<div class="ff-w3-receipt-layout"><figure class="ff-w3-receipt-figure">${C.media('receipt', mediaState, { overlay: true })}<div class="ff-w3-receipt-stamp">${text('receiptPlaceholder')}<strong>3:4 · 900 × 1200</strong></div></figure><section class="ff-w3-receipt-controls ff-w3-surface-apricot"><div class="ff-w3-section-heading"><span class="ff-icon-well ff-icon-well-apricot ff-icon-well-md">${C.icon('receipt', 21)}</span><div><span class="ff-eyebrow">${text('receiptKicker')}</span><h2>${C.esc(status === 'selected' || status === 'review' ? raw('receiptReview') : raw(status === 'processing' ? 'receiptProcessing' : status === 'error' ? 'receiptError' : 'receiptEmpty'))}</h2></div></div>${status === 'selected' || status === 'review' ? `<p class="ff-w3-selected-file">${C.icon('check', 15)} ${displayName(bill.receipt.fileName || raw('sampleReceipt'))}</p>` : ''}<div class="ff-w3-receipt-action">${action}</div><label class="ff-w3-file-control"><span>${text('selectReceipt')}</span><input type="file" accept="image/*" data-w3-file aria-label="${text('selectReceipt')}" /></label>${receiptStatusControls(status)}<p class="ff-w3-muted-copy">${text('receiptNoOcr')}</p></section></div><div class="ff-w3-inline-total ff-w3-functional"><span>${text('reportedTotal')}</span><strong>${money(bill.totalAmount)}</strong></div>${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-receipt-page', { hideMobileNav: true });
  }

  function renderItems() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const itemTotal = sumItems(bill.items);
    const reconciles = itemTotal === Number(bill.totalAmount);
    const flow = ensureBillFlow();
    const error = flow.validationError;
    const rows = (bill.items || []).map((item) => `<div class="ff-w3-item-row ff-w3-tone-${C.esc(item.tone)}"><div class="ff-w3-item-icon">${C.icon('utensils', 17)}</div><div class="ff-w3-item-name"><label for="ff-w3-name-${C.esc(item.id)}">${language() === 'th' ? displayName(item.thai) : displayName(item.name)}</label><span>${displayName(item.name)} · ×${item.quantity}</span><input id="ff-w3-name-${C.esc(item.id)}" value="${displayName(item.name)}" data-w3-item-name="${C.esc(item.id)}" aria-label="${displayName(item.name)}" /></div><div class="ff-w3-item-amount"><label for="ff-w3-amount-${C.esc(item.id)}">${money(item.amount)}</label><input id="ff-w3-amount-${C.esc(item.id)}" type="number" min="0" step="1" value="${Number(item.amount) || 0}" data-w3-item-amount="${C.esc(item.id)}" aria-label="${displayName(item.name)} amount" /></div></div>`).join('');
    const content = `<div class="ff-w3-flow">${renderHeader(text('itemsKicker'), text('itemsTitle'), text('itemsBody'), 'bills', 'receipt', '#/bills/receipt')}${candidateLabel()}<div class="ff-w3-items-layout"><section class="ff-w3-items-panel ff-w3-functional"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('items')}</span><h2>${text('receiptReview')}</h2></div><span class="ff-w3-edit-note">${text('localData')}</span></div><div class="ff-w3-items-list">${rows}</div><div class="ff-w3-total-check ${reconciles ? 'is-valid' : 'is-invalid'}"><div><span>${text('itemTotal')}</span><strong>${money(itemTotal)}</strong></div><div><span>${text('reportedTotal')}</span><strong>${money(bill.totalAmount)}</strong></div><span class="ff-w3-reconcile-label">${reconciles ? `${C.icon('check', 14)} ${text('reconciled')}` : `${C.icon('info', 14)} ${text('notReconciled')}`}</span></div>${error ? `<div class="ff-w3-error-box" role="alert">${C.icon('info', 17)}<span>${C.esc(error)}</span></div>` : ''}<div class="ff-w3-item-actions">${button(text('continueSplit'), 'brand', 'lg', 'continue-items', { icon: 'arrowRight', iconRight: true, disabled: !reconciles })}${button(text('invalidTotal'), 'ghost', 'sm', 'show-invalid-total')}${!reconciles ? button(text('repairTotal'), 'secondary', 'sm', 'fix-bill-error', { icon: 'refresh' }) : ''}</div></section><aside class="ff-w3-items-aside ff-w3-surface-custard"><span class="ff-eyebrow">${text('billValue')}</span><strong class="ff-w3-aside-total">${money(bill.totalAmount)}</strong><p>${text('billValueNote')}</p>${C.media('receipt', 'placeholder', { className: 'ff-w3-mini-media' })}</aside></div>${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-items-page', { hideMobileNav: true });
  }

  function renderMemberSelector(member, selected) {
    return `<button type="button" class="ff-w3-member-selector ${selected ? 'is-selected' : ''}" data-w3-action="toggle-member" data-w3-member-id="${C.esc(member.id)}" aria-pressed="${selected}">${C.avatar(member, 'sm')}<span><strong>${displayName(member.name)}</strong><small>${selected ? text('selectedMember') : text('excludedMember')}</small></span>${C.icon(selected ? 'check' : 'plus', 16)}</button>`;
  }

  function renderItemAssignment(item, flow, members) {
    const assigned = flow.itemAssignments[item.id] || [];
    return `<div class="ff-w3-assignment-row ff-w3-tone-${C.esc(item.tone)}"><div><strong>${language() === 'th' ? displayName(item.thai) : displayName(item.name)}</strong><span>${money(item.amount)} · ×${item.quantity}</span></div><div class="ff-w3-assignment-members">${members.map((member) => `<button type="button" class="${assigned.includes(member.id) ? 'is-selected' : ''}" data-w3-action="toggle-item-member" data-w3-item-id="${C.esc(item.id)}" data-w3-member-id="${C.esc(member.id)}" aria-pressed="${assigned.includes(member.id)}">${C.avatar(member, 'xs')}<span>${displayName(member.name)}</span></button>`).join('')}</div></div>`;
  }

  function renderSplit() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const flow = ensureBillFlow();
    const summary = calculateShares();
    const members = bill.members || membersForBill();
    const isItemMode = bill.splitMode === 'item';
    const invalid = Boolean(flow.validationError);
    const content = `<div class="ff-w3-flow">${renderHeader(text('splitKicker'), text('splitTitle'), text('splitBody'), 'bills', 'split', '#/bills/items')}${candidateLabel()}<div class="ff-w3-split-layout"><section class="ff-w3-split-main"><div class="ff-w3-split-summary ff-w3-surface-petal"><div><span class="ff-eyebrow">${text('billValue')}</span><strong>${money(bill.totalAmount)}</strong></div><div>${statusPill(bill.status)}</div></div><section class="ff-w3-mode-panel ff-w3-functional"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('splitMethod')}</span><h2>${isItemMode ? text('itemSplit') : text('equalSplit')}</h2></div></div><div class="ff-w3-mode-buttons">${button(text('equalSplit'), isItemMode ? 'outline' : 'brand', 'md', 'set-split-mode', { value: 'equal', pressed: !isItemMode })}${button(text('itemSplit'), isItemMode ? 'brand' : 'outline', 'md', 'set-split-mode', { value: 'item', pressed: isItemMode })}</div>${isItemMode ? `<div class="ff-w3-assignments"><h3>${text('assignItems')}</h3>${(bill.items || []).map((item) => renderItemAssignment(item, flow, members)).join('')}</div>` : `<div class="ff-w3-member-select-grid"><h3>${text('members')}</h3>${members.map((member) => renderMemberSelector(member, flow.selectedMembers.includes(member.id))).join('')}</div>`}</section>${invalid ? `<div class="ff-w3-error-box" role="alert">${C.icon('info', 17)}<span>${C.esc(flow.validationError)}</span></div>` : ''}</section><aside class="ff-w3-share-panel ff-w3-surface-apricot"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('shareBreakdown')}</span><h2>${money(summary.total)}</h2></div>${summary.reconciles ? `<span class="ff-w3-reconcile-badge">${C.icon('check', 14)} ${text('reconciled')}</span>` : ''}</div>${renderShareRows(summary)}<div class="ff-w3-math"><div><span>${text('allocated')}</span><strong>${money(summary.allocated)}</strong></div><div><span>${text('unallocated')}</span><strong>${money(summary.unallocated)}</strong></div></div><div class="ff-w3-split-submit">${flow.splitConfirmed ? `<div class="ff-w3-confirmed-copy">${C.icon('check', 17)}<span>${text('splitConfirmed')}</span></div>` : button(text('confirmSplit'), 'brand', 'lg', 'request-confirm-split', { icon: 'check', iconRight: true, disabled: !summary.reconciles })}</div></aside></div>${localNote(text('financialTruth'))}</div>`;
    return page(content, 'bills', 'ff-w3-split-page', { hideMobileNav: true });
  }

  function renderBillDetail() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const summary = calculateShares();
    const flow = ensureBillFlow();
    const content = `<div class="ff-w3-flow">${renderHeader(text('detailKicker'), text('detailTitle'), text('detailBody'), 'bills', 'payment', '#/bills/split')}${candidateLabel()}<div class="ff-w3-detail-grid"><section class="ff-w3-detail-main ff-w3-functional"><div class="ff-w3-detail-title-row"><div><span class="ff-eyebrow">${displayName(bill.roomName)}</span><h2>${displayName(bill.restaurant?.name || raw('noRestaurant'))}</h2><p>${displayName(bill.id)} · ${displayName(bill.roomCode)}</p></div>${statusPill(bill.status)}</div><div class="ff-w3-detail-total"><span>${text('billValue')}</span><strong>${money(bill.totalAmount)}</strong></div><div class="ff-w3-detail-items"><h3>${text('items')}</h3>${(bill.items || []).map((item) => `<div><span>${language() === 'th' ? displayName(item.thai) : displayName(item.name)} <small>×${item.quantity}</small></span><strong>${money(item.amount)}</strong></div>`).join('')}</div></section><aside class="ff-w3-detail-side ff-w3-surface-custard"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('paymentRecord')}</span><h2>${bill.members.length} ${text('members')}</h2></div>${flow.splitConfirmed ? '' : statusPill('SPLIT_PENDING')}</div>${flow.splitConfirmed ? renderShareRows(summary) : `<p class="ff-w3-muted-copy">${text('sharePending')}</p>`}<div class="ff-w3-detail-actions">${flow.splitConfirmed ? `${linkButton(text('viewStatus'), '#/payment/status', 'brand', 'md', { icon: 'arrowRight', iconRight: true })}${linkButton(text('payShare'), '#/payment', 'ghost', 'md', { icon: 'receipt' })}` : linkButton(text('reviewSplit'), '#/bills/split', 'brand', 'md', { icon: 'arrowRight', iconRight: true })}</div></aside></div><div class="ff-w3-financial-banner">${C.icon('info', 17)}<span>${text('financialTruth')}</span></div>${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-detail-page', { hideMobileNav: true });
  }

  function currentPayment() {
    const s = state();
    const member = (s.bill?.members || membersForBill()).find((entry) => entry.id === 'pure') || (s.bill?.members || membersForBill())[0];
    const payment = (s.payments || []).find((entry) => entry.memberId === member?.id) || { memberId: member?.id, amount: 0, status: 'unpaid', paidAt: null };
    return { member, payment };
  }

  function renderPayment() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const flow = ensureBillFlow();
    if (!flow.splitConfirmed) {
      const content = `<div class="ff-w3-flow">${renderHeader(text('paymentKicker'), text('paymentTitle'), text('paymentBody'), 'bills', 'payment', '#/bills/detail')}${candidateLabel()}<div class="ff-w3-empty-hero ff-w3-payment-blocked"><div class="ff-w3-empty-icon">${C.icon('receipt', 30)}</div><h2>${text('sharePending')}</h2>${linkButton(text('reviewSplit'), '#/bills/split', 'brand', 'lg', { icon: 'arrowRight', iconRight: true })}</div>${localNote()}</div>`;
      return page(content, 'bills', 'ff-w3-payment-page', { hideMobileNav: true });
    }
    const { member, payment } = currentPayment();
    const paid = payment.status === 'paid';
    const content = `<div class="ff-w3-flow">${renderHeader(text('paymentKicker'), text('paymentTitle'), text('paymentBody'), 'bills', 'payment', '#/bills/detail')}${candidateLabel()}<div class="ff-w3-payment-grid"><section class="ff-w3-payment-card ff-w3-surface-petal"><div class="ff-w3-payment-person">${C.avatar(member, 'lg')}<div><span class="ff-eyebrow">${text('memberSummary')}</span><h2>${displayName(member.name)}</h2><p>${displayName(member.role)} · ${displayName(bill.roomName)}</p></div></div><div class="ff-w3-owed"><span>${text('amountOwed')}</span><strong>${money(payment.amount)}</strong></div>${paid ? `<div class="ff-w3-paid-callout" role="status">${C.icon('check', 18)}<div><strong>${text('alreadyPaid')}</strong><span>${text('paidAt')}</span></div></div>` : `<p class="ff-w3-payment-instruction">${C.icon('info', 16)} ${text('paymentBody')}</p>`}<div class="ff-w3-payment-actions">${paid ? button(text('alreadyPaid'), 'secondary', 'lg', 'noop', { icon: 'check', disabled: true }) : button(text('markPaid'), 'brand', 'lg', 'request-mark-payment', { icon: 'check', iconRight: true })}${linkButton(text('viewStatus'), '#/payment/status', 'ghost', 'md', { icon: 'arrowRight', iconRight: true })}</div></section><aside class="ff-w3-payment-side ff-w3-functional"><span class="ff-eyebrow">${text('billValue')}</span><strong>${money(bill.totalAmount)}</strong>${statusPill(bill.status)}<p>${text('noSettlement')}</p><div class="ff-w3-payment-context">${C.media('receipt', 'placeholder', { className: 'ff-w3-mini-media' })}<span>${text('localData')}</span></div></aside></div>${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-payment-page', { hideMobileNav: true });
  }

  function renderPaymentStatus() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    const flow = ensureBillFlow();
    if (!flow.splitConfirmed) {
      const content = `<div class="ff-w3-flow">${renderHeader(text('paymentStatusKicker'), text('paymentStatusTitle'), text('paymentStatusBody'), 'bills', 'payment', '#/bills/detail')}${candidateLabel()}<div class="ff-w3-empty-hero"><div class="ff-w3-empty-icon">${C.icon('users', 30)}</div><h2>${text('sharePending')}</h2>${linkButton(text('reviewSplit'), '#/bills/split', 'brand', 'lg', { icon: 'arrowRight', iconRight: true })}</div>${localNote()}</div>`;
      return page(content, 'bills', 'ff-w3-payment-status-page', { hideMobileNav: true });
    }
    const summary = calculateShares();
    const payments = state().payments || [];
    const paidCount = payments.filter((payment) => payment.status === 'paid').length;
    const allPaid = paidCount === payments.length && payments.length > 0;
    const progressPercent = payments.length ? Math.round((paidCount / payments.length) * 100) : 0;
    const content = `<div class="ff-w3-flow">${renderHeader(text('paymentStatusKicker'), text('paymentStatusTitle'), text('paymentStatusBody'), 'bills', 'payment', '#/bills/detail')}${candidateLabel()}<div class="ff-w3-status-grid"><section class="ff-w3-status-summary ff-w3-surface-apricot"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('paymentRecord')}</span><h2>${text('progressLabel', { paid: paidCount, total: payments.length })}</h2></div>${statusPill(bill.status)}</div><div class="ff-w3-progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progressPercent}" aria-label="${text('progressLabel', { paid: paidCount, total: payments.length })}"><span style="width:${progressPercent}%"></span></div><p>${allPaid ? text('allPaid') : text('noSettlement')}</p>${allPaid ? linkButton(text('completeKicker'), '#/bill-complete', 'brand', 'md', { icon: 'arrowRight', iconRight: true }) : linkButton(text('openPayment'), '#/payment', 'brand', 'md', { icon: 'receipt', iconRight: true })}</section><section class="ff-w3-member-status ff-w3-functional"><div class="ff-w3-panel-heading"><div><span class="ff-eyebrow">${text('members')}</span><h2>${bill.members.length} ${text('members')}</h2></div></div>${renderShareRows(summary)}</section></div>${scenarioControl()}${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-payment-status-page', { hideMobileNav: true });
  }

  function recordHistoryIfEligible() {
    const s = state();
    if (!s.bill || !['ALL_PAID', 'CLOSED'].includes(s.bill.status)) return null;
    const meal = s.bill.winner || selectedMeal();
    const entry = {
      id: s.bill.id,
      roomName: s.bill.roomName,
      mealName: meal.name || 'Tom Yum',
      mealThai: meal.thai || 'ต้มยำ',
      restaurantName: s.bill.restaurant?.name || raw('noRestaurant'),
      date: s.bill.createdAt.slice(0, 10),
      memberCount: s.bill.members.length,
      members: W.deepClone(s.bill.members),
      billStatus: s.bill.status === 'CLOSED' ? raw('closePreview') : raw('allPaid'),
      totalAmount: s.bill.totalAmount,
      tone: 'custard'
    };
    s.history = Array.isArray(s.history) ? s.history : [];
    const existing = s.history.findIndex((item) => item.id === entry.id);
    if (existing >= 0) s.history[existing] = entry;
    else s.history.push(entry);
    ensureBillFlow().historyRecorded = true;
    return entry;
  }

  function renderBillComplete() {
    const bill = ensureBill();
    if (!bill) return renderEmptyBill();
    updateBillStatus();
    const eligible = ['ALL_PAID', 'CLOSED'].includes(bill.status);
    if (eligible) recordHistoryIfEligible();
    const content = `<div class="ff-w3-flow">${renderHeader(text('completeKicker'), text(eligible ? 'completeTitle' : 'paymentStatusTitle'), text(eligible ? 'completeBody' : 'paymentStatusBody'), 'bills', 'payment', '#/payment/status')}${candidateLabel()}<section class="ff-w3-complete ${eligible ? 'is-complete' : 'is-blocked'}"><div class="ff-w3-complete-orbit" aria-hidden="true"></div><div class="ff-w3-complete-icon">${C.icon(eligible ? 'check' : 'clock', 32)}</div><span class="ff-eyebrow">${statusMeta(bill.status).label}</span><h2>${text(eligible ? 'completeTitle' : 'sharePending')}</h2><p>${text(eligible ? 'completeBody' : 'paymentStatusBody')}</p>${statusPill(bill.status)}<div class="ff-w3-complete-actions">${eligible ? `${linkButton(text('goHistory'), '#/history', 'brand', 'lg', { icon: 'arrowRight', iconRight: true })}${linkButton(text('goHome'), '#/home', 'ghost', 'md', { icon: 'home' })}` : linkButton(text('viewStatus'), '#/payment/status', 'brand', 'lg', { icon: 'arrowRight', iconRight: true })}</div></section>${bill.status === 'CLOSED' ? `<div class="ff-w3-warning-box" role="note">${C.icon('info', 16)}<span>${text('closeUnsupported')}</span></div>` : ''}<div class="ff-w3-financial-banner">${C.icon('info', 17)}<span>${text('noSettlement')}</span></div>${localNote()}</div>`;
    return page(content, 'bills', 'ff-w3-complete-page', { hideMobileNav: true });
  }

  function historyEntries() {
    const s = state();
    const mode = s.ui.historyScenario || 'normal';
    if (mode === 'empty') return [];
    const live = Array.isArray(s.history) ? s.history : [];
    if (mode === 'one') return [live[0] || HISTORY_SEEDS[0]];
    if (mode === 'many') return [...live, ...HISTORY_SEEDS].filter((item, index, all) => all.findIndex((entry) => entry.id === item.id) === index).slice(0, 6);
    return live;
  }

  function renderHistoryCard(entry) {
    const status = entry.billStatus === raw('closePreview') ? 'CLOSED' : 'ALL_PAID';
    return `<article class="ff-w3-history-card ff-w3-history-tone-${C.esc(entry.tone || 'petal')}"><div class="ff-w3-history-media">${C.media('recent', 'placeholder', { overlay: true })}</div><div class="ff-w3-history-copy"><div class="ff-w3-history-card-top"><span class="ff-eyebrow">${displayName(entry.roomName)}</span>${statusPill(status)}</div><h2>${displayName(language() === 'th' ? entry.mealThai || entry.mealName : entry.mealName)}</h2><p>${displayName(entry.restaurantName)}</p><div class="ff-w3-history-meta"><span>${C.icon('calendar', 14)} ${displayName(entry.date)}</span><span>${C.icon('users', 14)} ${Number(entry.memberCount || entry.members?.length || 0)} ${text('members')}</span><strong>${money(entry.totalAmount)}</strong></div>${button(text('viewDetail'), 'ghost', 'sm', 'open-history-detail', { value: entry.id, icon: 'arrowRight', iconRight: true })}</div></article>`;
  }

  function renderHistory() {
    if (W.isLoading('history')) {
      const loadingContent = `<div class="ff-w3-flow">${renderHeader(text('historyKicker'), text('historyLoadingTitle'), text('historyLoadingBody'), 'history', 'history', '#/home')}${candidateLabel()}<section class="ff-w3-history-loading" aria-live="polite"><div class="ff-w3-skeleton ff-w3-skeleton-wide"></div><div class="ff-w3-skeleton-grid"><span class="ff-w3-skeleton"></span><span class="ff-w3-skeleton"></span><span class="ff-w3-skeleton"></span></div><p>${text('loading')}</p></section>${localNote()}</div>`;
      return page(loadingContent, 'history', 'ff-w3-history-page');
    }
    const entries = historyEntries();
    const content = `<div class="ff-w3-flow">${renderHeader(text('historyKicker'), text('historyTitle'), text('historyBody'), 'history', 'history', '#/home')}${historyScenarioControl()}<div class="ff-w3-history-tools">${button(text('loadHistory'), 'ghost', 'sm', 'load-history', { icon: 'refresh' })}</div>${candidateLabel()}${entries.length ? `<div class="ff-w3-history-grid">${entries.map(renderHistoryCard).join('')}</div>` : `<section class="ff-w3-empty-history"><div class="ff-w3-empty-icon">${C.icon('clock', 30)}</div><h2>${text('historyEmptyTitle')}</h2><p>${text('historyEmptyBody')}</p>${linkButton(text('browseHome'), '#/home', 'brand', 'lg', { icon: 'home' })}</section>`}${localNote()}</div>`;
    return page(content, 'history', 'ff-w3-history-page');
  }

  function renderHistoryDetail() {
    const entries = historyEntries();
    if (!entries.length) {
      const emptyContent = `<div class="ff-w3-flow">${renderHeader(text('historyDetailKicker'), text('historyEmptyTitle'), text('historyEmptyBody'), 'history', 'history', '#/history')}${candidateLabel()}<section class="ff-w3-empty-history"><div class="ff-w3-empty-icon">${C.icon('clock', 30)}</div><h2>${text('historyEmptyTitle')}</h2><p>${text('historyEmptyBody')}</p>${linkButton(text('browseHome'), '#/home', 'brand', 'lg', { icon: 'home' })}</section>${localNote()}</div>`;
      return page(emptyContent, 'history', 'ff-w3-history-detail-page', { hideMobileNav: true });
    }
    const selectedId = ensureBillFlow().historySelection;
    const entry = entries.find((item) => item.id === selectedId) || entries[0] || HISTORY_SEEDS[0];
    const isLive = state().bill?.id === entry.id;
    const content = `<div class="ff-w3-flow">${renderHeader(text('historyDetailKicker'), text('historyDetailTitle'), text('historyBody'), 'history', 'history', '#/history')}${candidateLabel()}<div class="ff-w3-history-detail"><div class="ff-w3-history-detail-media">${C.media('recent', 'placeholder', { overlay: true })}</div><section class="ff-w3-history-detail-card ff-w3-surface-petal"><div class="ff-w3-history-card-top"><span class="ff-eyebrow">${displayName(entry.roomName)}</span>${statusPill(entry.billStatus === raw('closePreview') ? 'CLOSED' : 'ALL_PAID')}</div><h2>${displayName(language() === 'th' ? entry.mealThai || entry.mealName : entry.mealName)}</h2><p class="ff-w3-history-restaurant">${displayName(entry.restaurantName)}</p><dl class="ff-w3-detail-facts"><div><dt>${text('date')}</dt><dd>${displayName(entry.date)}</dd></div><div><dt>${text('group')}</dt><dd>${Number(entry.memberCount || entry.members?.length || 0)} ${text('members')}</dd></div><div><dt>${text('billValue')}</dt><dd>${money(entry.totalAmount)}</dd></div><div><dt>${text('status')}</dt><dd>${statusPill(entry.billStatus === raw('closePreview') ? 'CLOSED' : 'ALL_PAID')}</dd></div></dl>${entry.members?.length ? `<div class="ff-w3-history-members"><h3>${text('members')}</h3>${entry.members.map((member) => `<span>${C.avatar(member, 'xs')}${displayName(member.name)}</span>`).join('')}</div>` : ''}<div class="ff-w3-history-detail-actions">${isLive ? linkButton(text('viewDetail'), '#/bills/detail', 'brand', 'md', { icon: 'receipt', iconRight: true }) : ''}${linkButton(text('goHistory'), '#/history', 'ghost', 'md', { icon: 'arrowLeft' })}</div></section></div>${localNote()}</div>`;
    return page(content, 'history', 'ff-w3-history-detail-page', { hideMobileNav: true });
  }

  function handleConfirmSplit() {
    const s = state();
    const bill = ensureBill();
    const flow = ensureBillFlow();
    const summary = calculateShares();
    if (!bill || !summary.reconciles) {
      flow.validationError = raw('splitError');
      s.ui.overlay = '';
      W.refresh();
      return;
    }
    s.ui.overlay = '';
    W.runLoading('split', () => {
      flow.splitConfirmed = true;
      flow.splitStep = 'confirmed';
      flow.validationError = '';
      syncPaymentAmounts();
      updateBillStatus();
      W.navigate('#/bills/detail', '#/bills/split');
    }, 460);
  }

  function handleConfirmPayment() {
    const s = state();
    const current = currentPayment();
    if (!current.member || current.payment.status === 'paid') {
      s.ui.overlay = '';
      W.refresh();
      return;
    }
    s.ui.overlay = '';
    W.runLoading('payment', () => {
      const payment = s.payments.find((entry) => entry.memberId === current.member.id);
      if (payment) {
        payment.status = 'paid';
        payment.paidAt = '2026-08-28T21:10:00';
      }
      updateBillStatus();
      W.navigate('#/payment/status', '#/payment');
    }, 420);
  }

  function handleAction(target) {
    const s = state();
    const action = target.getAttribute('data-w3-action');
    const value = target.getAttribute('data-w3-value');
    if (!action) return;

    if (action === 'start-bill') {
      createBill();
      if (window.location.hash === '#/bills') W.refresh();
      else W.navigate('#/bills', '#/restaurant');
      return;
    }
    if (action === 'set-bill-scenario') {
      applyBillScenario(value);
      return;
    }
    if (action === 'set-receipt-state') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.receipt.status = value;
      bill.receipt.fileName = value === 'selected' || value === 'review' ? raw('sampleReceipt') : '';
      s.ui.receiptState = value;
      ensureBillFlow().receiptStep = value === 'review' ? 'reviewed' : value;
      ensureBillFlow().validationError = '';
      W.refresh();
      return;
    }
    if (action === 'use-sample-receipt') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.receipt.status = 'selected';
      bill.receipt.fileName = raw('sampleReceipt');
      s.ui.receiptState = 'selected';
      ensureBillFlow().receiptStep = 'selected';
      ensureBillFlow().validationError = '';
      W.refresh();
      return;
    }
    if (action === 'process-receipt' || action === 'retry-receipt') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.receipt.status = 'processing';
      s.ui.receiptState = 'processing';
      W.runLoading('receipt', () => {
        bill.receipt.status = 'review';
        s.ui.receiptState = 'review';
        ensureBillFlow().receiptStep = 'reviewed';
        W.refresh();
      }, 520);
      return;
    }
    if (action === 'continue-receipt') {
      const bill = ensureBill();
      if (!bill || !['selected', 'review'].includes(bill.receipt?.status)) {
        ensureBillFlow().validationError = raw('receiptSelected');
        W.refresh();
        return;
      }
      bill.receipt.status = 'review';
      ensureBillFlow().receiptStep = 'reviewed';
      W.navigate('#/bills/items', '#/bills/receipt');
      return;
    }
    if (action === 'continue-items') {
      const bill = ensureBill();
      if (!bill) return;
      const itemTotal = sumItems(bill.items);
      if (itemTotal !== Number(bill.totalAmount)) {
        ensureBillFlow().validationError = raw('notReconciled');
        W.refresh();
        return;
      }
      ensureBillFlow().validationError = '';
      W.navigate('#/bills/split', '#/bills/items');
      return;
    }
    if (action === 'show-invalid-total') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.totalAmount = sumItems(bill.items) + 40;
      ensureBillFlow().validationError = raw('notReconciled');
      W.refresh();
      return;
    }
    if (action === 'fix-bill-error') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.totalAmount = sumItems(bill.items);
      ensureBillFlow().validationError = '';
      updateBillStatus();
      W.refresh();
      return;
    }
    if (action === 'set-split-mode') {
      const bill = ensureBill({ create: true });
      if (!bill) return;
      bill.splitMode = value === 'item' ? 'item' : 'equal';
      ensureBillFlow().validationError = '';
      syncPaymentAmounts();
      W.refresh();
      return;
    }
    if (action === 'toggle-member') {
      const flow = ensureBillFlow();
      const memberId = target.getAttribute('data-w3-member-id');
      const index = flow.selectedMembers.indexOf(memberId);
      if (index >= 0) flow.selectedMembers.splice(index, 1);
      else flow.selectedMembers.push(memberId);
      flow.validationError = '';
      syncPaymentAmounts();
      W.refresh();
      return;
    }
    if (action === 'toggle-item-member') {
      const flow = ensureBillFlow();
      const itemId = target.getAttribute('data-w3-item-id');
      const memberId = target.getAttribute('data-w3-member-id');
      flow.itemAssignments[itemId] = flow.itemAssignments[itemId] || [];
      const index = flow.itemAssignments[itemId].indexOf(memberId);
      if (index >= 0) flow.itemAssignments[itemId].splice(index, 1);
      else flow.itemAssignments[itemId].push(memberId);
      flow.validationError = '';
      syncPaymentAmounts();
      W.refresh();
      return;
    }
    if (action === 'request-confirm-split') {
      const bill = ensureBill();
      const summary = calculateShares();
      if (!bill || !summary.reconciles) {
        ensureBillFlow().validationError = raw('splitError');
        W.refresh();
        return;
      }
      s.ui.overlay = 'w3-split-confirm';
      W.refresh();
      return;
    }
    if (action === 'confirm-split') {
      handleConfirmSplit();
      return;
    }
    if (action === 'request-mark-payment') {
      s.ui.overlay = 'w3-payment-confirm';
      W.refresh();
      return;
    }
    if (action === 'confirm-payment') {
      handleConfirmPayment();
      return;
    }
    if (action === 'simulate-all-paid') {
      applyBillScenario('all-paid');
      return;
    }
    if (action === 'set-history-scenario') {
      s.ui.historyScenario = value || 'normal';
      W.refresh();
      return;
    }
    if (action === 'load-history') {
      W.runLoading('history', () => W.refresh(), 420);
      return;
    }
    if (action === 'open-history-detail') {
      ensureBillFlow().historySelection = value;
      W.navigate('#/history/detail', '#/history');
      return;
    }
    if (action === 'close-overlay' || action === 'noop') {
      s.ui.overlay = '';
      W.refresh();
    }
  }

  function bindWave3Events() {
    const root = document.querySelector('.ff-wave1-root');
    if (!root) return;
    if (typeof P.bindWave1Events === 'function') P.bindWave1Events();

    root.addEventListener('click', (event) => {
      const target = event.target.closest('[data-w3-action]');
      if (!target || !root.contains(target)) return;
      event.preventDefault();
      handleAction(target);
    });

    root.addEventListener('change', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.matches('[data-w3-file]')) {
        const bill = ensureBill({ create: true });
        if (!bill || !target.files?.length) return;
        bill.receipt.status = 'selected';
        bill.receipt.fileName = target.files[0].name || raw('sampleReceipt');
        state().ui.receiptState = 'selected';
        ensureBillFlow().receiptStep = 'selected';
        W.refresh();
        return;
      }
      if (target instanceof HTMLInputElement && target.matches('[data-w3-item-amount]')) {
        const bill = ensureBill({ create: true });
        const item = bill?.items?.find((entry) => entry.id === target.getAttribute('data-w3-item-amount'));
        if (!item) return;
        item.amount = Math.max(0, Number(target.value) || 0);
        ensureBillFlow().validationError = '';
        syncPaymentAmounts();
        W.refresh();
        return;
      }
      if (target instanceof HTMLInputElement && target.matches('[data-w3-item-name]')) {
        const bill = ensureBill({ create: true });
        const item = bill?.items?.find((entry) => entry.id === target.getAttribute('data-w3-item-name'));
        if (!item) return;
        item.name = target.value || item.name;
        ensureBillFlow().validationError = '';
        W.refresh();
      }
    });

    root.addEventListener('input', (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.matches('[data-w3-item-amount]')) {
        const bill = ensureBill({ create: true });
        const item = bill?.items?.find((entry) => entry.id === target.getAttribute('data-w3-item-amount'));
        if (item) item.amount = Math.max(0, Number(target.value) || 0);
      }
      if (target instanceof HTMLInputElement && target.matches('[data-w3-item-name]')) {
        const bill = ensureBill({ create: true });
        const item = bill?.items?.find((entry) => entry.id === target.getAttribute('data-w3-item-name'));
        if (item) item.name = target.value || item.name;
      }
    });
  }

  function renderWave3Route(hash) {
    switch (hash) {
      case '#/bills': return renderBills();
      case '#/bills/receipt': return renderReceipt();
      case '#/bills/items': return renderItems();
      case '#/bills/split': return renderSplit();
      case '#/bills/detail': return renderBillDetail();
      case '#/payment': return renderPayment();
      case '#/payment/status': return renderPaymentStatus();
      case '#/bill-complete': return renderBillComplete();
      case '#/history': return renderHistory();
      case '#/history/detail': return renderHistoryDetail();
      default: return renderBills();
    }
  }

  P.renderWave3Route = renderWave3Route;
  P.bindWave3Events = bindWave3Events;
  P.WAVE3 = {
    routes: ['#/bills', '#/bills/receipt', '#/bills/items', '#/bills/split', '#/bills/detail', '#/payment', '#/payment/status', '#/bill-complete', '#/history', '#/history/detail'],
    applyBillScenario,
    calculateShares,
    historyEntries
  };
})();
