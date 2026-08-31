import type { Locale } from "@/i18n/config";

export interface HistoryTranslations {
  eyebrow: string;
  title: string;
  description: string;
  completed: string;
  cancelled: string;
  memberSingular: string;
  memberPlural: string;
  restaurant: string;
  winningMenu: string;
  hostedByYou: string;
  joinedByYou: string;
  emptyTitle: string;
  emptyDesc: string;
  startFoodFight: string;
  errorDefault: string;
}

export const historyTranslations: Record<Locale, HistoryTranslations> = {
  en: {
    eyebrow: "Your activity",
    title: "History",
    description: "Review your completed FoodFights and past group meals.",
    completed: "Completed",
    cancelled: "Cancelled",
    memberSingular: "member",
    memberPlural: "members",
    restaurant: "Restaurant",
    winningMenu: "Winning menu",
    hostedByYou: "Hosted by you",
    joinedByYou: "Joined by you",
    emptyTitle: "No history yet",
    emptyDesc:
      "Your completed FoodFights will appear here once you finish a group meal.",
    startFoodFight: "Start a FoodFight",
    errorDefault: "Unable to load your history.",
  },
  th: {
    eyebrow: "กิจกรรมของคุณ",
    title: "ประวัติการใช้งาน",
    description: "ดูประวัติ FoodFight และมื้ออาหารกลุ่มที่คุณเคยเข้าร่วม",
    completed: "เสร็จสิ้น",
    cancelled: "ยกเลิกแล้ว",
    memberSingular: "คน",
    memberPlural: "คน",
    restaurant: "ร้านอาหาร",
    winningMenu: "เมนูที่ชนะ",
    hostedByYou: "คุณเป็นหัวหน้าห้อง",
    joinedByYou: "คุณเข้าร่วม",
    emptyTitle: "ยังไม่มีประวัติการใช้งาน",
    emptyDesc:
      "ประวัติการตัดสินใจเลือกมื้ออาหารจะแสดงที่นี่เมื่อคุณเสร็จสิ้นกิจกรรม",
    startFoodFight: "เริ่ม FoodFight ใหม่",
    errorDefault: "ไม่สามารถโหลดประวัติการใช้งานได้",
  },
};
