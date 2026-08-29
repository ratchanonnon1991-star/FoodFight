import type { Locale } from "@/i18n/config";

export interface FoodProfileTranslations {
  steps: {
    allergies: string;
    restrictions: string;
    details: string;
    ariaLabel: string;
  };
  preview: {
    title: string;
    subtitle: string;
    allergies: string;
    restrictions: string;
    nuances: string;
    noAllergies: string;
    noRestrictions: string;
    notSelected: string;
    notAdded: string;
  };
  layout: {
    back: string;
    stepCounter: string;
    loadingTitle: string;
    loadingSubtitle: string;
  };
  allergies: {
    title: string;
    description: string;
    notice: string;
    next: string;
    otherAllergy: string;
    remove: string;
    otherPlaceholder: string;
    addOtherAllergy: string;
    or: string;
    noAllergiesLabel: string;
    noAllergiesDesc: string;
    options: Record<string, string>;
  };
  restrictions: {
    title: string;
    description: string;
    notice: string;
    next: string;
    otherRestriction: string;
    remove: string;
    otherPlaceholder: string;
    addOtherRestriction: string;
    or: string;
    noRestrictionsLabel: string;
    noRestrictionsDesc: string;
    options: Record<string, string>;
  };
  details: {
    title: string;
    description: string;
    notice: string;
    saveAndContinue: string;
    saving: string;
    notesLabel: string;
    optional: string;
    notesPlaceholder: string;
    errorDefault: string;
  };
}

export const foodProfileTranslations: Record<Locale, FoodProfileTranslations> = {
  en: {
    steps: {
      allergies: "Allergies",
      restrictions: "Restrictions",
      details: "Details",
      ariaLabel: "Onboarding Progress",
    },
    preview: {
      title: "Current profile preview",
      subtitle: "Your saved preferences are shown here and update as you edit.",
      allergies: "Allergies",
      restrictions: "Dietary restrictions",
      nuances: "Additional nuances",
      noAllergies: "No allergies",
      noRestrictions: "No restrictions",
      notSelected: "Not selected yet",
      notAdded: "Not added yet",
    },
    layout: {
      back: "Back",
      stepCounter: "Step {current} of {total}",
      loadingTitle: "Loading your food profile...",
      loadingSubtitle: "Restoring your saved preferences.",
    },
    allergies: {
      title: "Do you have any food allergies?",
      description: "Select all that apply.",
      notice:
        "You can update your food profile anytime in your account settings.",
      next: "Next",
      otherAllergy: "Other Allergy",
      remove: "Remove",
      otherPlaceholder: "e.g. Kiwi, Shellfish, Strawberries",
      addOtherAllergy: "Add other allergy",
      or: "OR",
      noAllergiesLabel: "I don't have any food allergies",
      noAllergiesDesc: "Anything is fine — no allergy restrictions",
      options: {
        seafood: "Seafood",
        peanut: "Peanut",
        tree_nuts: "Tree Nuts",
        dairy: "Dairy",
        egg: "Egg",
        soy: "Soy",
        wheat_gluten: "Wheat / Gluten",
        sesame: "Sesame",
      },
    },
    restrictions: {
      title: "Do you have any dietary or food restrictions?",
      description: "Select all that apply.",
      notice:
        "FoodFighter uses this information to personalize your meal recommendations and filter out unsuitable options.",
      next: "Next",
      otherRestriction: "Other Restriction",
      remove: "Remove",
      otherPlaceholder: "e.g. Low sodium, Diabetic-friendly",
      addOtherRestriction: "Add other restriction",
      or: "OR",
      noRestrictionsLabel: "No other restrictions",
      noRestrictionsDesc: "Anything is fine — no dietary restrictions",
      options: {
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        pescatarian: "Pescatarian",
        gluten_free: "Gluten-free",
        halal: "Halal only",
        kosher: "Kosher",
        no_pork: "No pork",
        no_beef: "No beef",
      },
    },
    details: {
      title: "Anything else we should know?",
      description:
        "Tell us about any other food preferences, likes, dislikes, or details that help FoodFighter find your best meals. (Optional)",
      notice:
        "FoodFighter combines your profile preferences with meal-specific votes to find recommendations everyone will enjoy.",
      saveAndContinue: "Save & Continue",
      saving: "Saving...",
      notesLabel: "Additional Preferences & Notes",
      optional: "Optional",
      notesPlaceholder:
        "e.g. I prefer spicy food, don't like cilantro, looking for high-protein options...",
      errorDefault:
        "An unexpected error occurred while saving your profile. Please try again.",
    },
  },
  th: {
    steps: {
      allergies: "อาการแพ้",
      restrictions: "ข้อจำกัดอาหาร",
      details: "รายละเอียด",
      ariaLabel: "ขั้นตอนการตั้งค่าโปรไฟล์",
    },
    preview: {
      title: "สรุปโปรไฟล์ปัจจุบัน",
      subtitle: "การตั้งค่าที่คุณเลือกจะแสดงและอัปเดตแบบเรียลไทม์ที่นี่",
      allergies: "อาการแพ้",
      restrictions: "ข้อจำกัดอาหาร",
      nuances: "ข้อมูลเพิ่มเติม",
      noAllergies: "ไม่มีอาการแพ้",
      noRestrictions: "ไม่มีข้อจำกัด",
      notSelected: "ยังไม่ได้เลือก",
      notAdded: "ยังไม่ได้ระบุ",
    },
    layout: {
      back: "ย้อนกลับ",
      stepCounter: "ขั้นตอนที่ {current} จาก {total}",
      loadingTitle: "กำลังโหลดโปรไฟล์อาหาร...",
      loadingSubtitle: "กำลังเรียกคืนข้อมูลความชอบที่คุณบันทึกไว้",
    },
    allergies: {
      title: "คุณมีอาการแพ้อาหารหรือไม่?",
      description: "เลือกทั้งหมดที่เกี่ยวข้อง",
      notice: "คุณสามารถแก้ไขโปรไฟล์อาหารได้ตลอดเวลาในการตั้งค่าบัญชี",
      next: "ถัดไป",
      otherAllergy: "อาการแพ้อื่นๆ",
      remove: "ลบออก",
      otherPlaceholder: "เช่น กีวี, หอยนางรม, สตรอว์เบอร์รี",
      addOtherAllergy: "เพิ่มอาการแพ้อื่นๆ",
      or: "หรือ",
      noAllergiesLabel: "ฉันไม่มีอาการแพ้อาหาร",
      noAllergiesDesc: "ทานได้ทุกอย่าง — ไม่มีข้อจำกัดด้านการแพ้",
      options: {
        seafood: "อาหารทะเล",
        peanut: "ถั่วลิสง",
        tree_nuts: "ถั่วเปลือกแข็ง",
        dairy: "ผลิตภัณฑ์จากนม",
        egg: "ไข่",
        soy: "ถั่วเหลือง",
        wheat_gluten: "ข้าวสาลี / กลูเตน",
        sesame: "งา",
      },
    },
    restrictions: {
      title: "คุณมีข้อจำกัดด้านอาหารหรือไม่?",
      description: "เลือกทั้งหมดที่เกี่ยวข้อง",
      notice:
        "FoodFighter ใช้ข้อมูลนี้ในการแนะนำเมนูที่เหมาะสม และกรองตัวเลือกที่ไม่ตรงตามความต้องการออก",
      next: "ถัดไป",
      otherRestriction: "ข้อจำกัดอื่นๆ",
      remove: "ลบออก",
      otherPlaceholder: "เช่น โซเดียมต่ำ, เหมาะสำหรับเบาหวาน",
      addOtherRestriction: "เพิ่มข้อจำกัดอื่นๆ",
      or: "หรือ",
      noRestrictionsLabel: "ไม่มีข้อจำกัดด้านอาหาร",
      noRestrictionsDesc: "ทานได้ทุกอย่าง — ไม่มีข้อจำกัดด้านอาหาร",
      options: {
        vegetarian: "มังสวิรัติ",
        vegan: "วีแกน / เจ",
        pescatarian: "เพสคาทาเรียน (ทานปลา)",
        gluten_free: "ปลอดกลูเตน",
        halal: "ฮาลาลเท่านั้น",
        kosher: "โคเชอร์",
        no_pork: "ไม่ทานหมู",
        no_beef: "ไม่ทานเนื้อวัว",
      },
    },
    details: {
      title: "มีข้อมูลอื่นที่อยากบอกเราเพิ่มเติมไหม?",
      description:
        "บอกความชอบ ความไม่ชอบ หรือรายละเอียดอื่นๆ ที่จะช่วยให้ FoodFighter แนะนำมื้อที่ถูกใจที่สุด (ไม่บังคับ)",
      notice:
        "FoodFighter จะรวมความชอบของคุณเข้ากับการโหวตของกลุ่ม เพื่อค้นหาร้านที่ทุกคนถูกใจ",
      saveAndContinue: "บันทึกและดำเนินการต่อ",
      saving: "กำลังบันทึก...",
      notesLabel: "ความชอบหรือบันทึกเพิ่มเติม",
      optional: "ไม่บังคับ",
      notesPlaceholder:
        "เช่น ชอบอาหารรสจัด, ไม่ชอบผักชี, เน้นโปรตีนสูง...",
      errorDefault:
        "เกิดข้อผิดพลาดในการบันทึกโปรไฟล์ กรุณาลองใหม่อีกครั้ง",
    },
  },
};
