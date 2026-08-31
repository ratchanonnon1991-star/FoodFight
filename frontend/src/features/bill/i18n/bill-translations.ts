export interface BillTranslations {
  selectMeal: {
    eyebrow: string;
    title: string;
    description: string;
    pendingSectionTitle: string;
    pendingSectionDesc: string;
    availableSectionTitle: string;
    noAvailableMeals: string;
    noAvailableMealsDesc: string;
    startFoodFight: string;
    startBill: string;
    viewBill: string;
    paymentAccountWarning: string;
    setupPaymentAccount: string;
    membersCount: (count: number) => string;
    errorDefault: string;
  };
  header: {
    back: string;
    goBack: string;
  };
  receipt: {
    title: string;
    subtitle: (restaurantName: string, memberCount: number) => string;
    receiptCardTitle: string;
    scanReceipt: string;
    rescanReceipt: string;
    noReceiptYet: string;
    itemsCardTitle: string;
    itemsCount: (count: number) => string;
    subtotalLabel: string;
    ocrFailedTitle: string;
    ocrFailedDesc: string;
    addItemTitle: string;
    itemNamePlaceholder: string;
    quantityPlaceholder: string;
    unitPricePlaceholder: string;
    addItemButton: string;
    saveItem: string;
    cancelEdit: string;
    deleteItem: string;
    editItem: string;
    continueToSplit: string;
    continueHelper: string;
    emptyItemsHint: string;
  };
  split: {
    title: string;
    subtitle: (restaurantName: string, memberCount: number) => string;
    stepIndicator: string;
    helper: string;
    splitEvenlyButton: string;
    allButton: string;
    sharedByLabel: string;
    assignedCount: (count: number) => string;
    unassignedBadge: string;
    allAssignedBanner: string;
    unassignedBanner: (count: number) => string;
    continueToSummary: string;
    continueHelper: string;
    memberNoticeTitle: string;
    memberNoticeDesc: (hostName: string) => string;
    toggleMemberAria: (memberName: string, itemName: string) => string;
    progressCount: (assigned: number, total: number) => string;
  };
  summary: {
    title: string;
    subtitle: (restaurantName: string, memberCount: number) => string;
    stepIndicator: string;
    helper: string;
    memberBreakdownTitle: string;
    itemSubtotalLabel: string;
    estimatedTotalLabel: string;
    finalTotalLabel: string;
    estimateDisclaimer: string;
    billTotalsTitle: string;
    subtotalLabel: string;
    serviceChargeLabel: string;
    taxLabel: string;
    discountLabel: string;
    grandTotalLabel: string;
    promptPayReady: (name: string) => string;
    promptPayMissingTitle: string;
    promptPayMissingDesc: string;
    setupNowButton: string;
    confirmButton: string;
    confirmHelper: string;
    memberNoticeTitle: string;
    memberNoticeDesc: (hostName: string) => string;
  };
  detail: {
    title: string;
    subtitle: (restaurantName: string, memberCount: number) => string;
    totalLabel: string;
    progressPaid: (paid: number, total: number) => string;
    fullyCollected: string;
    remainingAmount: (remaining: number) => string;
    paymentInstructions: (
      hostName: string,
      accountName: string,
      promptPayId: string,
    ) => string;
    paymentStatusTitle: string;
    paidBadge: string;
    unpaidBadge: string;
    markPaid: string;
    markUnpaid: string;
    payNow: string;
    hideQr: string;
    uploadSlip: string;
    viewSlip: string;
    scanInstruction: (amount: number) => string;
    closeBill: string;
    closedNotice: (date: string) => string;
    allPaidNotice: string;
    notFinalizedTitle: string;
    continueSetup: string;
    cancelledNotice: string;
    backToBills: string;
    youTag: string;
  };
  common: {
    thb: string;
    total: string;
    subtotal: string;
    serviceCharge: string;
    vat: string;
    grandTotal: string;
    statusPending: string;
    statusPaid: string;
    statusCompleted: string;
    statusOverdue: string;
  };
}

export const billTranslations: Record<"en" | "th", BillTranslations> = {
  en: {
    selectMeal: {
      eyebrow: "Bill Splitting",
      title: "Select Meal",
      description: "Select a finished meal to split the bill or view your pending bills.",
      pendingSectionTitle: "Pending Bills",
      pendingSectionDesc: "Bills you're currently participating in or managing.",
      availableSectionTitle: "Ready to Split",
      noAvailableMeals: "No completed meals ready to split",
      noAvailableMealsDesc:
        "Complete a FoodFight meal first to split expenses.",
      startFoodFight: "Start a FoodFight",
      startBill: "Start Bill",
      viewBill: "View Bill",
      paymentAccountWarning: "Payment account not configured",
      setupPaymentAccount: "Setup PromptPay",
      membersCount: (count: number) =>
        `${count} ${count === 1 ? "member" : "members"}`,
      errorDefault: "Unable to load meals.",
    },
    header: {
      back: "Back",
      goBack: "Go back",
    },
    receipt: {
      title: "Scan Receipt",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • ${memberCount} members`,
      receiptCardTitle: "Receipt Photo",
      scanReceipt: "Scan Receipt",
      rescanReceipt: "Rescan Photo",
      noReceiptYet: "No receipt photo added yet",
      itemsCardTitle: "Bill Items",
      itemsCount: (count: number) => `${count} ${count === 1 ? "item" : "items"}`,
      subtotalLabel: "Subtotal",
      ocrFailedTitle: "Automatic scan couldn't read everything",
      ocrFailedDesc:
        "You can review, edit, or add bill items manually below.",
      addItemTitle: "Add New Item",
      itemNamePlaceholder: "Item name (e.g. Grilled Chicken)",
      quantityPlaceholder: "Qty",
      unitPricePlaceholder: "Price (฿)",
      addItemButton: "Add Item",
      saveItem: "Save",
      cancelEdit: "Cancel",
      deleteItem: "Delete item",
      editItem: "Edit item",
      continueToSplit: "Continue to Split",
      continueHelper: "Assign who ate what in the next step.",
      emptyItemsHint: "Add at least one item from the receipt to continue.",
    },
    split: {
      title: "Split Bill",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • ${memberCount} members`,
      stepIndicator: "Step 2 of 3",
      helper:
        "Select who ate or shared each item. Items will be split evenly among selected members.",
      splitEvenlyButton: "Split Everything Equally",
      allButton: "All",
      sharedByLabel: "Shared by",
      assignedCount: (count: number) =>
        `Shared by ${count} ${count === 1 ? "person" : "people"}`,
      unassignedBadge: "Unassigned",
      allAssignedBanner:
        "All items have been assigned. Ready to review and calculate the split.",
      unassignedBanner: (count: number) =>
        `${count} ${count === 1 ? "item still needs" : "items still need"} someone assigned.`,
      continueToSummary: "Continue to Summary",
      continueHelper: "Review each member's breakdown and payment details.",
      memberNoticeTitle: "Host is splitting the bill",
      memberNoticeDesc: (hostName: string) =>
        `Only ${hostName} can assign items. You can review assignments below.`,
      toggleMemberAria: (memberName: string, itemName: string) =>
        `Toggle ${memberName} for ${itemName}`,
      progressCount: (assigned: number, total: number) =>
        `${assigned} of ${total} assigned`,
    },
    summary: {
      title: "Review & Confirm",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • ${memberCount} members`,
      stepIndicator: "Step 3 of 3",
      helper: "Review everyone's share and bill totals before creating the bill.",
      memberBreakdownTitle: "Member Breakdown",
      itemSubtotalLabel: "Item subtotal",
      estimatedTotalLabel: "Estimated total",
      finalTotalLabel: "Total",
      estimateDisclaimer:
        "Per-person totals are estimates before confirmation and may adjust slightly for cent rounding.",
      billTotalsTitle: "Bill Totals",
      subtotalLabel: "Subtotal",
      serviceChargeLabel: "Service charge",
      taxLabel: "Tax",
      discountLabel: "Discount",
      grandTotalLabel: "Grand Total",
      promptPayReady: (name: string) => `Ready to receive via PromptPay (${name})`,
      promptPayMissingTitle: "PromptPay not configured",
      promptPayMissingDesc:
        "Set up your PromptPay account before confirming so members can pay you.",
      setupNowButton: "Set up now",
      confirmButton: "Confirm & Create Bill",
      confirmHelper: "Once confirmed, payment requests will be created for all members.",
      memberNoticeTitle: "Host is finalizing the bill",
      memberNoticeDesc: (hostName: string) =>
        `Only ${hostName} can confirm and create the bill. You can review the details below.`,
    },
    detail: {
      title: "Bill Detail",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • ${memberCount} members`,
      totalLabel: "Grand Total",
      progressPaid: (paid: number, total: number) => `${paid} of ${total} paid`,
      fullyCollected: "Fully collected",
      remainingAmount: (remaining: number) => `฿${remaining.toFixed(2)} remaining`,
      paymentInstructions: (
        hostName: string,
        accountName: string,
        promptPayId: string,
      ) => `Pay ${hostName} (${accountName}) via PromptPay ${promptPayId}`,
      paymentStatusTitle: "Payment Status",
      paidBadge: "Paid",
      unpaidBadge: "Unpaid",
      markPaid: "Mark Paid",
      markUnpaid: "Mark Unpaid",
      payNow: "Pay Now",
      hideQr: "Hide QR",
      uploadSlip: "Upload Slip & Confirm",
      viewSlip: "View payment slip",
      scanInstruction: (amount: number) =>
        `Scan with your banking app to pay ฿${amount.toFixed(2)}`,
      closeBill: "Close Bill",
      closedNotice: (date: string) =>
        `This bill was closed on ${date}. No further changes can be made.`,
      allPaidNotice: "Everyone has paid in full. You can close this bill now.",
      notFinalizedTitle: "This bill isn't finalized yet.",
      continueSetup: "Continue setting up the bill",
      cancelledNotice: "This bill cannot be continued because its room was cancelled.",
      backToBills: "Back to Bills",
      youTag: "You",
    },
    common: {
      thb: "THB",
      total: "Total",
      subtotal: "Subtotal",
      serviceCharge: "Service Charge",
      vat: "VAT",
      grandTotal: "Grand Total",
      statusPending: "Pending",
      statusPaid: "Paid",
      statusCompleted: "Completed",
      statusOverdue: "Overdue",
    },
  },
  th: {
    selectMeal: {
      eyebrow: "หารค่าอาหาร",
      title: "เลือกมื้ออาหาร",
      description:
        "เลือกห้องที่รับประทานเสร็จแล้วเพื่อหารค่าใช้จ่าย หรือจัดการบิลปัจจุบัน",
      pendingSectionTitle: "บิลที่รอดำเนินการ",
      pendingSectionDesc: "บิลที่คุณกำลังมีส่วนร่วมหรือเป็นผู้ดูแล",
      availableSectionTitle: "พร้อมหารค่าอาหาร",
      noAvailableMeals: "ไม่มีมื้ออาหารที่พร้อมหารในขณะนี้",
      noAvailableMealsDesc:
        "ทำกิจกรรม FoodFight ให้เสร็จสิ้นก่อน จึงจะสามารถหารค่าใช้จ่ายได้",
      startFoodFight: "เริ่ม FoodFight ใหม่",
      startBill: "สร้างบิล",
      viewBill: "ดูบิล",
      paymentAccountWarning: "ยังไม่ได้ตั้งค่าบัญชีรับเงิน",
      setupPaymentAccount: "ตั้งค่า PromptPay",
      membersCount: (count: number) => `สมาชิก ${count} คน`,
      errorDefault: "ไม่สามารถโหลดข้อมูลมื้ออาหารได้",
    },
    header: {
      back: "ย้อนกลับ",
      goBack: "ย้อนกลับ",
    },
    receipt: {
      title: "สแกนใบเสร็จ",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • สมาชิก ${memberCount} คน`,
      receiptCardTitle: "รูปถ่ายใบเสร็จ",
      scanReceipt: "สแกนใบเสร็จ",
      rescanReceipt: "ถ่ายใหม่",
      noReceiptYet: "ยังไม่มีรูปถ่ายใบเสร็จ",
      itemsCardTitle: "รายการอาหาร",
      itemsCount: (count: number) => `${count} รายการ`,
      subtotalLabel: "ยอดย่อย",
      ocrFailedTitle: "ระบบอ่านใบเสร็จได้ไม่ครบถ้วน",
      ocrFailedDesc:
        "คุณสามารถตรวจสอบ แก้ไข หรือเพิ่มรายการอาหารด้วยตนเองได้ด้านล่าง",
      addItemTitle: "เพิ่มรายการอาหาร",
      itemNamePlaceholder: "ชื่อเมนู (เช่น ไก่ย่างสมุนไพร)",
      quantityPlaceholder: "จำนวน",
      unitPricePlaceholder: "ราคาต่อหน่วย (บาท)",
      addItemButton: "เพิ่มรายการ",
      saveItem: "บันทึก",
      cancelEdit: "ยกเลิก",
      deleteItem: "ลบรายการ",
      editItem: "แก้ไขรายการ",
      continueToSplit: "ไปแบ่งค่าอาหาร",
      continueHelper: "ขั้นตอนถัดไปจะให้เลือกว่าใครทานอะไรบ้าง",
      emptyItemsHint: "กรุณาเพิ่มรายการอาหารอย่างน้อย 1 รายการเพื่อดำเนินการต่อ",
    },
    split: {
      title: "แบ่งค่าอาหาร",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • สมาชิก ${memberCount} คน`,
      stepIndicator: "ขั้นตอนที่ 2 จาก 3",
      helper:
        "เลือกสมาชิกที่ร่วมทานแต่ละเมนู รายการจะถูกหารเฉลี่ยเท่ากันตามจำนวนคนที่เลือก",
      splitEvenlyButton: "แบ่งทุกคนเท่ากัน",
      allButton: "ทุกคน",
      sharedByLabel: "แบ่งให้",
      assignedCount: (count: number) => `แบ่ง ${count} คน`,
      unassignedBadge: "ยังไม่ระบุคน",
      allAssignedBanner:
        "แบ่งครบทุกรายการแล้ว พร้อมสำหรับการสรุปยอดและคำนวณเงิน",
      unassignedBanner: (count: number) =>
        `ยังมีอีก ${count} รายการที่ยังไม่ได้ระบุคนทาน`,
      continueToSummary: "ไปสรุปยอด",
      continueHelper: "ตรวจสอบยอดเงินของแต่ละคนและรายละเอียดการชำระเงิน",
      memberNoticeTitle: "หัวหน้าห้องกำลังแบ่งค่าอาหาร",
      memberNoticeDesc: (hostName: string) =>
        `เฉพาะ ${hostName} เท่านั้นที่สามารถแก้ไขการแบ่งได้ คุณสามารถดูรายละเอียดด้านล่าง`,
      toggleMemberAria: (memberName: string, itemName: string) =>
        `เลือก ${memberName} สำหรับเมนู ${itemName}`,
      progressCount: (assigned: number, total: number) =>
        `แบ่งแล้ว ${assigned} จาก ${total} รายการ`,
    },
    summary: {
      title: "สรุปยอดบิล",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • สมาชิก ${memberCount} คน`,
      stepIndicator: "ขั้นตอนที่ 3 จาก 3",
      helper: "ตรวจสอบยอดของทุกคนและยอดรวมก่อนสร้างบิล",
      memberBreakdownTitle: "สรุปยอดรายบุคคล",
      itemSubtotalLabel: "ค่าอาหาร",
      estimatedTotalLabel: "ยอดประมาณการ",
      finalTotalLabel: "ยอดรวม",
      estimateDisclaimer:
        "ยอดต่อคนเป็นค่าประมาณก่อนยืนยัน และอาจปรับเล็กน้อยเพื่อจัดการเศษสตางค์",
      billTotalsTitle: "สรุปยอดบิล",
      subtotalLabel: "ยอดรวมค่าอาหาร",
      serviceChargeLabel: "ค่าบริการ",
      taxLabel: "ภาษี",
      discountLabel: "ส่วนลด",
      grandTotalLabel: "ยอดรวมสุทธิ",
      promptPayReady: (name: string) => `พร้อมรับเงินผ่าน PromptPay (${name})`,
      promptPayMissingTitle: "ยังไม่ได้ตั้งค่า PromptPay",
      promptPayMissingDesc:
        "ตั้งค่าบัญชี PromptPay ของคุณก่อนยืนยันเพื่อให้สมาชิกสามารถชำระเงินได้",
      setupNowButton: "ตั้งค่าตอนนี้",
      confirmButton: "ยืนยันและสร้างบิล",
      confirmHelper: "เมื่อยืนยันแล้ว ระบบจะสร้างรายการเรียกเก็บเงินไปยังทุกคนในห้อง",
      memberNoticeTitle: "หัวหน้าห้องกำลังตรวจสอบและสรุปบิล",
      memberNoticeDesc: (hostName: string) =>
        `เฉพาะ ${hostName} เท่านั้นที่สามารถกดยืนยันสร้างบิลได้ คุณสามารถดูรายละเอียดด้านล่าง`,
    },
    detail: {
      title: "รายละเอียดบิล",
      subtitle: (restaurantName: string, memberCount: number) =>
        `${restaurantName} • สมาชิก ${memberCount} คน`,
      totalLabel: "ยอดรวมทั้งบิล",
      progressPaid: (paid: number, total: number) =>
        `ชำระแล้ว ${paid} จาก ${total} คน`,
      fullyCollected: "ชำระครบทุกคนแล้ว",
      remainingAmount: (remaining: number) =>
        `เหลืออีก ฿${remaining.toFixed(2)}`,
      paymentInstructions: (
        hostName: string,
        accountName: string,
        promptPayId: string,
      ) => `ชำระเงินให้ ${hostName} (${accountName}) ผ่าน PromptPay ${promptPayId}`,
      paymentStatusTitle: "สถานะการชำระเงิน",
      paidBadge: "ชำระแล้ว",
      unpaidBadge: "รอชำระ",
      markPaid: "บันทึกว่าจ่ายแล้ว",
      markUnpaid: "เปลี่ยนเป็นยังไม่จ่าย",
      payNow: "จ่ายตอนนี้",
      hideQr: "ซ่อน QR",
      uploadSlip: "แนบสลิปและยืนยัน",
      viewSlip: "ดูสลิปการโอน",
      scanInstruction: (amount: number) =>
        `สแกนด้วยแอปธนาคารเพื่อชำระ ฿${amount.toFixed(2)}`,
      closeBill: "ปิดบิลนี้",
      closedNotice: (date: string) =>
        `บิลนี้ถูกปิดเมื่อ ${date} ไม่สามารถแก้ไขได้อีก`,
      allPaidNotice: "ทุกคนชำระเงินครบแล้ว คุณสามารถปิดบิลนี้ได้",
      notFinalizedTitle: "บิลนี้ยังไม่เสร็จสมบูรณ์",
      continueSetup: "ดำเนินการจัดการบิลต่อ",
      cancelledNotice: "ไม่สามารถดำเนินการบิลนี้ได้เนื่องจากห้องถูกยกเลิก",
      backToBills: "กลับหน้ารายการบิล",
      youTag: "คุณ",
    },
    common: {
      thb: "บาท",
      total: "ยอดรวม",
      subtotal: "ยอดรวมค่าอาหาร",
      serviceCharge: "ค่าบริการ",
      vat: "ภาษีมูลค่าเพิ่ม",
      grandTotal: "ยอดรวมสุทธิ",
      statusPending: "รอชำระ",
      statusPaid: "ชำระแล้ว",
      statusCompleted: "เสร็จสิ้น",
      statusOverdue: "เกินกำหนด",
    },
  },
};
