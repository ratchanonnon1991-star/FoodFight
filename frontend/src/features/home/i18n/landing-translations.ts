import type { Locale } from "@/i18n/config";

export interface LandingTranslations {
  heading: string;
  description: string;
  getStarted: string;
  logIn: string;
  or: string;
  benefits: {
    sectionAria: string;
    groupVoting: string;
    aiRecommendations: string;
    saveTime: string;
  };
}

export const landingTranslations: Record<Locale, LandingTranslations> = {
  en: {
    heading: "AI-Powered Group Meal Decision Platform",
    description:
      "End the daily group meal dilemma. Set your taste preferences, let AI generate personalized dish recommendations, and vote together to reach consensus effortlessly.",
    getStarted: "Get Started",
    logIn: "Log in",
    or: "OR",
    benefits: {
      sectionAria: "FoodFighter benefits",
      groupVoting: "Group Voting",
      aiRecommendations: "AI Recommendations",
      saveTime: "Save Time",
    },
  },
  th: {
    heading: "แพลตฟอร์มช่วยตัดสินใจเลือกมื้ออาหารกลุ่มด้วย AI",
    description:
      "หมดปัญหาคิดไม่ออกว่าจะกินอะไรดี เลือกความชอบด้านอาหาร ให้ AI ช่วยแนะนำเมนูที่ตรงใจ แล้วโหวตพร้อมกันกับเพื่อนๆ ได้อย่างง่ายดาย",
    getStarted: "เริ่มต้นใช้งาน",
    logIn: "เข้าสู่ระบบ",
    or: "หรือ",
    benefits: {
      sectionAria: "จุดเด่นของ FoodFighter",
      groupVoting: "โหวตพร้อมเพื่อน",
      aiRecommendations: "AI ช่วยแนะนำ",
      saveTime: "ประหยัดเวลา",
    },
  },
};
