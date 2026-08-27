/**
 * Home Feature Typed Translation Dictionaries
 * Strictly scoped to /home presentation strings (TH / EN)
 */

export type HomeLocale = "th" | "en";

export interface CarouselCategoryTranslation {
  tag: string;
  title: string;
  subtitle: string;
}

export interface HomeTranslations {
  header: {
    greeting: (name: string) => string;
    greetingSubtitle: string;
    editProfile: string;
    editFoodProfile: string;
    paymentAccount: string;
    logout: string;
    notificationsLabel: string;
    profileMenuLabel: string;
    selectLanguage: string;
    languageLabel: string;
  };
  carousel: {
    heading: string;
    prevCardLabel: string;
    nextCardLabel: string;
    categories: {
      quickBites: CarouselCategoryTranslation;
      warmBowls: CarouselCategoryTranslation;
      sharingPlates: CarouselCategoryTranslation;
      greenHealthy: CarouselCategoryTranslation;
      dessertsDrinks: CarouselCategoryTranslation;
    };
  };
  actionCards: {
    createTitle: string;
    createDesc: string;
    createCta: string;
    joinTitle: string;
    joinDesc: string;
    joinCta: string;
  };
  currentFoodFight: {
    heading: string;
    statusInProgress: string;
    statusLobby: string;
    statusCompleted: string;
    membersLabel: (count: number) => string;
    continueCta: string;
    noActiveTitle: string;
    noActiveDesc: string;
    startCta: string;
  };
  foodProfile: {
    heading: string;
    body: string;
    actionCta: string;
  };
  recent: {
    heading: string;
    viewAll: string;
    noRecentTitle: string;
    noRecentDesc: string;
    membersLabel: (count: number) => string;
  };
  tip: {
    heading: string;
    text: string;
    dismissLabel: string;
  };
}

export const homeTranslations: Record<HomeLocale, HomeTranslations> = {
  en: {
    header: {
      greeting: (name: string) => `Hi, ${name}`,
      greetingSubtitle: "Ready to fight for the best meal?",
      editProfile: "Edit profile",
      editFoodProfile: "Edit food profile",
      paymentAccount: "Payment account",
      logout: "Log out",
      notificationsLabel: "View notifications",
      profileMenuLabel: "Profile menu",
      selectLanguage: "Select Language",
      languageLabel: "Change language",
    },
    carousel: {
      heading: "What are we eating today?",
      prevCardLabel: "Previous food inspiration card",
      nextCardLabel: "Next food inspiration card",
      categories: {
        quickBites: {
          tag: "Street Eats",
          title: "Quick Bites & Grills",
          subtitle: "Crispy, savory & fast favorites",
        },
        warmBowls: {
          tag: "Comfort",
          title: "Warm Bowls & Noodles",
          subtitle: "Rich broth & aromatic spices",
        },
        sharingPlates: {
          tag: "Group Feast",
          title: "Sharing Plates & Pizza",
          subtitle: "Perfect for sharing with friends",
        },
        greenHealthy: {
          tag: "Fresh & Light",
          title: "Green & Healthy Bowls",
          subtitle: "Vibrant veggies & light dressings",
        },
        dessertsDrinks: {
          tag: "Sweet Craving",
          title: "Desserts & Drinks",
          subtitle: "Sweet endings & cold refreshments",
        },
      },
    },
    actionCards: {
      createTitle: "CREATE ROOM",
      createDesc: "Start a new FoodFight",
      createCta: "Create Now",
      joinTitle: "JOIN ROOM",
      joinDesc: "Enter code or scan QR",
      joinCta: "Join Now",
    },
    currentFoodFight: {
      heading: "Current FoodFight",
      statusInProgress: "In progress",
      statusLobby: "Lobby",
      statusCompleted: "Completed",
      membersLabel: (count: number) => `${count} members`,
      continueCta: "Continue",
      noActiveTitle: "No active FoodFight",
      noActiveDesc: "Start a new room or join friends to begin deciding on your next meal.",
      startCta: "Start a FoodFight",
    },
    foodProfile: {
      heading: "Your Food Profile",
      body: "Keep your preferences up to date for better recommendations.",
      actionCta: "Review preferences",
    },
    recent: {
      heading: "Recent FoodFights",
      viewAll: "View all",
      noRecentTitle: "No recent FoodFights",
      noRecentDesc: "Completed group meals will appear here.",
      membersLabel: (count: number) => `${count} members`,
    },
    tip: {
      heading: "Tip",
      text: "The more accurate your food profile, the better our recommendations!",
      dismissLabel: "Dismiss tip",
    },
  },
  th: {
    header: {
      greeting: (name: string) => `สวัสดี, ${name}`,
      greetingSubtitle: "พร้อมลุยหาเมนูที่ใช่กันหรือยัง?",
      editProfile: "แก้ไขโปรไฟล์",
      editFoodProfile: "แก้ไขโปรไฟล์อาหาร",
      paymentAccount: "บัญชีรับชำระเงิน",
      logout: "ออกจากระบบ",
      notificationsLabel: "ดูการแจ้งเตือน",
      profileMenuLabel: "เมนูโปรไฟล์",
      selectLanguage: "เลือกภาษา",
      languageLabel: "เปลี่ยนภาษา",
    },
    carousel: {
      heading: "วันนี้กินอะไรกันดี?",
      prevCardLabel: "การ์ดก่อนหน้า",
      nextCardLabel: "การ์ดถัดไป",
      categories: {
        quickBites: {
          tag: "สตรีทฟู้ด",
          title: "ของกินเล่น & ปิ้งย่าง",
          subtitle: "กรุบกรอบ เข้มข้น เมนูด่วนยอดฮิต",
        },
        warmBowls: {
          tag: "คอมฟอร์ตฟู้ด",
          title: "ก๋วยเตี๋ยว & เมนูร้อน",
          subtitle: "น้ำซุปกลมกล่อม หอมกรุ่นเครื่องเทศ",
        },
        sharingPlates: {
          tag: "ปาร์ตี้มื้อใหญ่",
          title: "อาหารจานแชร์ & พิซซ่า",
          subtitle: "เหมาะสำหรับแชร์ความอร่อยกับเพื่อน",
        },
        greenHealthy: {
          tag: "สดชื่น & สุขภาพ",
          title: "สลัด & เมนูเพื่อสุขภาพ",
          subtitle: "ผักสดกรอบ อร่อยเบาสบายท้อง",
        },
        dessertsDrinks: {
          tag: "ของหวาน & เครื่องดื่ม",
          title: "ของหวาน & เครื่องดื่ม",
          subtitle: "ปิดท้ายมื้ออร่อยด้วยความสดชื่น",
        },
      },
    },
    actionCards: {
      createTitle: "สร้างห้อง",
      createDesc: "เริ่ม FoodFight ใหม่",
      createCta: "สร้างห้อง",
      joinTitle: "เข้าร่วมห้อง",
      joinDesc: "ใส่รหัสห้องหรือสแกน QR",
      joinCta: "เข้าร่วม",
    },
    currentFoodFight: {
      heading: "FoodFight ปัจจุบัน",
      statusInProgress: "กำลังดำเนินการ",
      statusLobby: "ล็อบบี้",
      statusCompleted: "เสร็จสิ้น",
      membersLabel: (count: number) => `${count} สมาชิก`,
      continueCta: "ดำเนินการต่อ",
      noActiveTitle: "ยังไม่มี FoodFight ที่กำลังใช้งาน",
      noActiveDesc: "เริ่มสร้างห้องใหม่หรือเข้าร่วมกับเพื่อนๆ เพื่อช่วยกันเลือกมื้ออร่อย",
      startCta: "เริ่ม FoodFight",
    },
    foodProfile: {
      heading: "โปรไฟล์อาหารของคุณ",
      body: "อัปเดตความชอบด้านอาหารเพื่อให้คำแนะนำตรงใจยิ่งขึ้น",
      actionCta: "ตรวจสอบความชอบ",
    },
    recent: {
      heading: "FoodFight ล่าสุด",
      viewAll: "ดูทั้งหมด",
      noRecentTitle: "ยังไม่มี FoodFight ล่าสุด",
      noRecentDesc: "มื้ออาหารกลุ่มที่เสร็จแล้วจะแสดงที่นี่",
      membersLabel: (count: number) => `${count} สมาชิก`,
    },
    tip: {
      heading: "เคล็ดลับ",
      text: "ยิ่งโปรไฟล์อาหารของคุณละเอียด คำแนะนำก็ยิ่งตรงใจมากขึ้น",
      dismissLabel: "ปิดเคล็ดลับ",
    },
  },
};
