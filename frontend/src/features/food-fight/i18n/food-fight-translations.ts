import type { Locale } from "@/i18n/config";

export interface FoodFightTranslations {
  preferences: {
    title: string;
    subtitle: string;
    description: string;
    cookingMethod: string;
    cuisine: string;
    protein: string;
    budget: string;
    restaurantStyle: string;
    additionalNotes: string;
    additionalNotesPlaceholder: string;
    otherPlaceholder: string;
    submit: string;
    submitting: string;
    waitingForOthers: string;
    membersSubmitted: (count: number, total: number) => string;
    options: {
      any: string;
      other: string;
      budgetUnder150: string;
      budget150To300: string;
      budget300To600: string;
      budget600Plus: string;
    };
  };
  recommendation: {
    title: string;
    subtitle: string;
    votePrompt: string;
    like: string;
    dislike: string;
    skip: string;
    waitingForVotes: string;
    reroll: string;
    finalDecision: string;
    tieBreaker: string;
    viewRestaurants: string;
    winner: string;
  };
  restaurants: {
    title: string;
    subtitle: string;
    searching: string;
    findingBestMatches: string;
    noRestaurantsFound: string;
    openInMaps: string;
    priceLevel: string;
    distance: string;
    rating: string;
    reviews: string;
    voteRestaurant: string;
    selectedWinner: string;
  };
}

export const foodFightTranslations: Record<Locale, FoodFightTranslations> = {
  en: {
    preferences: {
      title: "Meal Preferences",
      subtitle: "What are you craving today?",
      description:
        "Select your preferences for this meal to help AI recommend the best spots.",
      cookingMethod: "Cooking Method",
      cuisine: "Cuisine Type",
      protein: "Preferred Protein",
      budget: "Budget per Person",
      restaurantStyle: "Restaurant Style",
      additionalNotes: "Additional Nuances / Notes",
      additionalNotesPlaceholder:
        "e.g. Craving something spicy, looking for outdoor seating...",
      otherPlaceholder: "Specify other...",
      submit: "Submit Preferences",
      submitting: "Submitting...",
      waitingForOthers: "Preferences submitted! Waiting for other members...",
      membersSubmitted: (count: number, total: number) =>
        `${count} of ${total} members ready`,
      options: {
        any: "Any / No preference",
        other: "Other",
        budgetUnder150: "< 150 THB",
        budget150To300: "150 - 300 THB",
        budget300To600: "300 - 600 THB",
        budget600Plus: "600+ THB",
      },
    },
    recommendation: {
      title: "Food Fight!",
      subtitle: "Vote on meal recommendations",
      votePrompt: "Swipe or vote for dishes your group might like",
      like: "Like",
      dislike: "Pass",
      skip: "Skip",
      waitingForVotes: "Waiting for all members to finish voting...",
      reroll: "Reroll Options",
      finalDecision: "Final Choice",
      tieBreaker: "Host Tie-Breaker",
      viewRestaurants: "Find Restaurants",
      winner: "Group Winner!",
    },
    restaurants: {
      title: "Restaurant Matches",
      subtitle: "Best spots near your chosen location",
      searching: "Finding restaurants...",
      findingBestMatches: "AI is searching Google Maps for top-rated spots...",
      noRestaurantsFound: "No matching restaurants found in this radius.",
      openInMaps: "Open in Google Maps",
      priceLevel: "Price",
      distance: "Distance",
      rating: "Rating",
      reviews: "reviews",
      voteRestaurant: "Choose This Restaurant",
      selectedWinner: "Final Restaurant Selected!",
    },
  },
  th: {
    preferences: {
      title: "ความชอบมื้อนี้",
      subtitle: "วันนี้อยากทานอะไรเป็นพิเศษ?",
      description:
        "เลือกความต้องการสำหรับมื้อนี้ เพื่อให้ AI แนะนำร้านอาหารที่ตอบโจทย์ที่สุด",
      cookingMethod: "วิธีการปรุง",
      cuisine: "ประเภทอาหาร",
      protein: "ประเภทเนื้อสัตว์ / โปรตีน",
      budget: "งบประมาณต่อคน",
      restaurantStyle: "บรรยากาศร้าน",
      additionalNotes: "ความต้องการเพิ่มเติม / โน้ต",
      additionalNotesPlaceholder:
        "เช่น อยากได้รสจัดจ้าน, อยากนั่งโซนกลางแจ้ง...",
      otherPlaceholder: "ระบุเพิ่มเติม...",
      submit: "ส่งความต้องการ",
      submitting: "กำลังส่ง...",
      waitingForOthers: "ส่งข้อมูลแล้ว! กำลังรอสมาชิกคนอื่นๆ...",
      membersSubmitted: (count: number, total: number) =>
        `ส่งแล้ว ${count} จาก ${total} คน`,
      options: {
        any: "อะไรก็ได้ / ไม่ระบุ",
        other: "อื่นๆ",
        budgetUnder150: "< 150 บาท",
        budget150To300: "150 - 300 บาท",
        budget300To600: "300 - 600 บาท",
        budget600Plus: "600+ บาท",
      },
    },
    recommendation: {
      title: "Food Fight!",
      subtitle: "โหวตเลือกเมนูอาหารที่ถูกใจ",
      votePrompt: "กดถูกใจหรือข้าม เพื่อช่วยกันหาเมนูที่ลงตัวที่สุด",
      like: "ถูกใจ",
      dislike: "ไม่เอา",
      skip: "ข้าม",
      waitingForVotes: "กำลังรอให้ทุกคนโหวตเสร็จ...",
      reroll: "สุ่มตัวเลือกใหม่",
      finalDecision: "เมนูที่ชนะ",
      tieBreaker: "หัวหน้าห้องตัดสิน (คะแนนเท่ากัน)",
      viewRestaurants: "ค้นหาร้านอาหาร",
      winner: "เมนูที่กลุ่มเลือก!",
    },
    restaurants: {
      title: "ร้านอาหารที่แนะนำ",
      subtitle: "ร้านเด็ดใกล้สถานที่ที่คุณเลือก",
      searching: "กำลังค้นหาร้านอาหาร...",
      findingBestMatches: "AI กำลังค้นหาร้านอาหารยอดนิยมจาก Google Maps...",
      noRestaurantsFound: "ไม่พบร้านอาหารในรัศมีที่เลือก",
      openInMaps: "เปิดใน Google Maps",
      priceLevel: "ระดับราคา",
      distance: "ระยะทาง",
      rating: "คะแนน",
      reviews: "รีวิว",
      voteRestaurant: "เลือกร้านนี้",
      selectedWinner: "เลือกร้านอาหารสำเร็จ!",
    },
  },
};
