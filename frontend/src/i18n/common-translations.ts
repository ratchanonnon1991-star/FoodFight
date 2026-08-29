import type { Locale } from "./config";

export interface CommonTranslations {
  nav: {
    home: string;
    history: string;
    bills: string;
    profile: string;
    mainNavigation: string;
  };
  publicHeader: {
    checkingSession: string;
    logIn: string;
    register: string;
    logOut: string;
    accountActions: string;
  };
  actions: {
    back: string;
    continue: string;
    cancel: string;
    save: string;
    close: string;
    retry: string;
    viewDetails: string;
    confirm: string;
    edit: string;
    delete: string;
  };
}

export const commonTranslations: Record<Locale, CommonTranslations> = {
  en: {
    nav: {
      home: "Home",
      history: "History",
      bills: "Bills",
      profile: "Profile",
      mainNavigation: "Main Navigation",
    },
    publicHeader: {
      checkingSession: "Checking session...",
      logIn: "Log in",
      register: "Register",
      logOut: "Log out",
      accountActions: "Account actions",
    },
    actions: {
      back: "Back",
      continue: "Continue",
      cancel: "Cancel",
      save: "Save",
      close: "Close",
      retry: "Retry",
      viewDetails: "View details",
      confirm: "Confirm",
      edit: "Edit",
      delete: "Delete",
    },
  },
  th: {
    nav: {
      home: "หน้าหลัก",
      history: "ประวัติ",
      bills: "บิล",
      profile: "โปรไฟล์",
      mainNavigation: "เมนูหลัก",
    },
    publicHeader: {
      checkingSession: "กำลังตรวจสอบ...",
      logIn: "เข้าสู่ระบบ",
      register: "สมัครสมาชิก",
      logOut: "ออกจากระบบ",
      accountActions: "จัดการบัญชี",
    },
    actions: {
      back: "ย้อนกลับ",
      continue: "ดำเนินการต่อ",
      cancel: "ยกเลิก",
      save: "บันทึก",
      close: "ปิด",
      retry: "ลองใหม่อีกครั้ง",
      viewDetails: "ดูรายละเอียด",
      confirm: "ยืนยัน",
      edit: "แก้ไข",
      delete: "ลบ",
    },
  },
};
