import type { Locale } from "@/i18n/config";

export interface PaymentAccountTranslations {
  back: string;
  title: string;
  subtitle: string;
  accountName: string;
  accountNamePlaceholder: string;
  accountNameHelp: string;
  promptPayNumber: string;
  promptPayPlaceholder: string;
  promptPayHelp: string;
  qrCode: string;
  qrCodeHelp: string;
  uploadQr: string;
  save: string;
  saving: string;
  successSaved: string;
  errorDefault: string;
}

export const paymentAccountTranslations: Record<Locale, PaymentAccountTranslations> = {
  en: {
    back: "Back",
    title: "Payment Account",
    subtitle: "Set up your PromptPay information to receive split payments from friends.",
    accountName: "Account Holder Name",
    accountNamePlaceholder: "e.g. Somchai Dee",
    accountNameHelp: "The name associated with your PromptPay account.",
    promptPayNumber: "PromptPay Phone Number or National ID",
    promptPayPlaceholder: "0812345678 or 1234567890123",
    promptPayHelp: "10-digit mobile number or 13-digit citizen ID.",
    qrCode: "PromptPay QR Code (Optional)",
    qrCodeHelp: "Upload your personal receiving QR code image.",
    uploadQr: "Upload QR Image",
    save: "Save Payment Account",
    saving: "Saving...",
    successSaved: "Payment account saved successfully.",
    errorDefault: "Unable to save payment account.",
  },
  th: {
    back: "ย้อนกลับ",
    title: "บัญชีรับเงิน",
    subtitle: "ตั้งค่าข้อมูลพร้อมเพย์ (PromptPay) เพื่อรับเงินเมื่อหารบิลกับเพื่อนๆ",
    accountName: "ชื่อเจ้าของบัญชี",
    accountNamePlaceholder: "เช่น สมชาย ดีใจ",
    accountNameHelp: "ชื่อที่ตรงกับบัญชีพร้อมเพย์ของคุณ",
    promptPayNumber: "เบอร์โทรศัพท์พร้อมเพย์ หรือ เลขบัตรประชาชน",
    promptPayPlaceholder: "0812345678 หรือ 1234567890123",
    promptPayHelp: "เบอร์โทรศัพท์ 10 หลัก หรือเลขบัตรประชาชน 13 หลัก",
    qrCode: "รูปภาพ QR Code พร้อมเพย์ (ไม่บังคับ)",
    qrCodeHelp: "อัปโหลดภาพ QR Code เพื่อให้เพื่อนสแกนจ่ายได้สะดวก",
    uploadQr: "อัปโหลดรูป QR",
    save: "บันทึกบัญชีรับเงิน",
    saving: "กำลังบันทึก...",
    successSaved: "บันทึกบัญชีรับเงินเรียบร้อยแล้ว",
    errorDefault: "ไม่สามารถบันทึกบัญชีรับเงินได้",
  },
};
