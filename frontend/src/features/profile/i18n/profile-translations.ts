import type { Locale } from "@/i18n/config";

export interface ProfileTranslations {
  eyebrow: string;
  title: string;
  description: string;
  personalInfo: string;
  personalInfoDesc: string;
  displayName: string;
  displayNamePlaceholder: string;
  email: string;
  emailReadonlyNotice: string;
  saveChanges: string;
  saving: string;
  foodPreferences: string;
  foodPreferencesDesc: string;
  allergies: string;
  noAllergies: string;
  restrictions: string;
  noRestrictions: string;
  editFoodProfile: string;
  paymentAccount: string;
  paymentAccountDesc: string;
  paymentAccountButton: string;
  avatarUploadPrompt: string;
  avatarUploadHelp: string;
  successUpdated: string;
  errorDefault: string;
  logout: string;
  logoutDesc: string;
}

export const profileTranslations: Record<Locale, ProfileTranslations> = {
  en: {
    eyebrow: "Account settings",
    title: "Profile",
    description: "Manage your account information, food preferences, and receiving details.",
    personalInfo: "Personal Information",
    personalInfoDesc: "Your basic account profile details.",
    displayName: "Display Name",
    displayNamePlaceholder: "Enter your display name",
    email: "Email Address",
    emailReadonlyNotice: "To change your email address, contact support.",
    saveChanges: "Save Changes",
    saving: "Saving...",
    foodPreferences: "Food Profile & Preferences",
    foodPreferencesDesc: "Used to customize recommendations during FoodFights.",
    allergies: "Allergies",
    noAllergies: "No allergies specified",
    restrictions: "Dietary Restrictions",
    noRestrictions: "No dietary restrictions specified",
    editFoodProfile: "Edit Food Profile",
    paymentAccount: "Payment Receiving Account",
    paymentAccountDesc: "Configure your PromptPay details for receiving split bill payments.",
    paymentAccountButton: "Manage Payment Account",
    avatarUploadPrompt: "Change photo",
    avatarUploadHelp: "JPG or PNG up to 2MB",
    successUpdated: "Profile updated successfully.",
    errorDefault: "Unable to update profile.",
    logout: "Log Out",
    logoutDesc: "Sign out of your FoodFighter account on this device.",
  },
  th: {
    eyebrow: "การตั้งค่าบัญชี",
    title: "โปรไฟล์",
    description: "จัดการข้อมูลบัญชี ความชอบอาหาร และช่องทางการรับเงินของคุณ",
    personalInfo: "ข้อมูลส่วนตัว",
    personalInfoDesc: "ข้อมูลพื้นฐานของบัญชีผู้ใช้",
    displayName: "ชื่อที่แสดง",
    displayNamePlaceholder: "กรอกชื่อที่ต้องการให้แสดง",
    email: "อีเมล",
    emailReadonlyNotice: "หากต้องการเปลี่ยนอีเมล กรุณาติดต่อฝ่ายบริการช่วยเหลือ",
    saveChanges: "บันทึกการเปลี่ยนแปลง",
    saving: "กำลังบันทึก...",
    foodPreferences: "โปรไฟล์และความชอบอาหาร",
    foodPreferencesDesc: "ใช้สำหรับแนะนำมื้ออาหารที่เหมาะสมในระหว่าง FoodFight",
    allergies: "อาการแพ้อาหาร",
    noAllergies: "ไม่มีอาการแพ้อาหาร",
    restrictions: "ข้อจำกัดอาหาร",
    noRestrictions: "ไม่มีข้อจำกัดด้านอาหาร",
    editFoodProfile: "แก้ไขโปรไฟล์อาหาร",
    paymentAccount: "บัญชีรับเงิน",
    paymentAccountDesc: "ตั้งค่าข้อมูล PromptPay สำหรับรับเงินเมื่อหารบิลค่าอาหาร",
    paymentAccountButton: "จัดการบัญชีรับเงิน",
    avatarUploadPrompt: "เปลี่ยนรูปโปรไฟล์",
    avatarUploadHelp: "ไฟล์ JPG หรือ PNG ขนาดไม่เกิน 2MB",
    successUpdated: "บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว",
    errorDefault: "ไม่สามารถอัปเดตโปรไฟล์ได้",
    logout: "ออกจากระบบ",
    logoutDesc: "ออกจากระบบ FoodFighter บนอุปกรณ์นี้",
  },
};
