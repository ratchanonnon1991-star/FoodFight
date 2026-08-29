import type { Locale } from "@/i18n/config";

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

export const billTranslations: Record<Locale, BillTranslations> = {
  en: {
    selectMeal: {
      eyebrow: "Split Bills",
      title: "Select Meal",
      description:
        "Choose a completed room to split costs or manage existing bills.",
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
