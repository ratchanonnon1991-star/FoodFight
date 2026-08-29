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
    findingHeroTitle: string;
    findingHeroSubtitle: string;
    rankingBestSpots: string;
    evaluatingMatch: string;
    analyzedWinningDish: string;
    scanningNearby: string;
    rankingGroupCompatibility: string;
    noRestaurantsFound: string;
    noRestaurantsDesc: string;
    hostRetrySearch: string;
    hostOnlyRetryHint: string;
    mapLocationTitle: string;
    spotsNearby: (count: number) => string;
    mapNoCoordinates: string;
    winningDishPrefix: string;
    openInMaps: string;
    priceLevel: string;
    distance: string;
    openNow: string;
    closed: string;
    groupMatch: (percentage: number) => string;
    whyFits: string;
    viewMoreReasons: (count: number) => string;
    hideMoreReasons: string;
    memberMenuOptions: (count: number) => string;
    optionsAvailable: string;
    selectedBadge: string;
    confirmSelection: string;
    confirmHelper: string;
    chooseThisSpot: string;
    selectedWinner: string;
    loadFailed: string;
    retry: string;
    waitingForHostToStart: string;
    winningMenuReadyWaitingHost: string;
    unconfirmedMenuWarning: string;
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
      title: "Recommended Restaurants",
      subtitle: "Best spots near your chosen location",
      searching: "Finding restaurants...",
      findingBestMatches: "AI is searching for top-rated spots matching your dish...",
      findingHeroTitle: "Finding Restaurants",
      findingHeroSubtitle: "Using chosen dish, distance, and member preferences",
      rankingBestSpots: "Ranking the Best Spots",
      evaluatingMatch: "Evaluating menu match scores and travel convenience",
      analyzedWinningDish: "Analyzed winning dish",
      scanningNearby: "Scanning nearby restaurants...",
      rankingGroupCompatibility: "Ranking group compatibility",
      noRestaurantsFound: "No Restaurants Found",
      noRestaurantsDesc: "No matching restaurants found in this area. Host can trigger a new search.",
      hostRetrySearch: "Search Again",
      hostOnlyRetryHint: "👑 Host action to retry restaurant search",
      mapLocationTitle: "Restaurant Locations",
      spotsNearby: (count: number) => `${count} spots nearby`,
      mapNoCoordinates: "Recommended restaurants do not have map coordinates yet.",
      winningDishPrefix: "Winning Dish",
      openInMaps: "Open in Google Maps",
      priceLevel: "Price",
      distance: "Distance",
      openNow: "Open Now",
      closed: "Closed",
      groupMatch: (percentage: number) => `${percentage}% match`,
      whyFits: "Why this spot fits",
      viewMoreReasons: (count: number) => `+ View ${count} more reasons`,
      hideMoreReasons: "Hide additional reasons",
      memberMenuOptions: (count: number) => `Member Menu Options (${count})`,
      optionsAvailable: "Menu options available",
      selectedBadge: "Selected",
      confirmSelection: "Confirm Selected Restaurant",
      confirmHelper: "Finalizes this spot as the group's destination.",
      chooseThisSpot: "Choose This Restaurant",
      selectedWinner: "Final Restaurant Selected!",
      loadFailed: "Failed to load restaurants",
      retry: "Try Again",
      waitingForHostToStart: "Waiting for Host to search restaurants",
      winningMenuReadyWaitingHost: "Final dish is ready. Restaurants will appear once Host starts the search.",
      unconfirmedMenuWarning: "This restaurant was found for your menu, but individual member choices are unverified.",
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
      title: "ร้านอาหารแนะนำสำหรับกลุ่ม",
      subtitle: "ร้านที่เข้ากับเมนูและความต้องการของกลุ่ม",
      searching: "กำลังค้นหาร้านอาหาร...",
      findingBestMatches: "AI กำลังค้นหาร้านอาหารที่ตรงกับเมนูของคุณ...",
      findingHeroTitle: "กำลังค้นหาร้านอาหาร",
      findingHeroSubtitle: "ใช้เมนูที่กลุ่มเลือก ระยะทาง และข้อจำกัดของสมาชิก",
      rankingBestSpots: "กำลังจัดอันดับร้านที่เหมาะที่สุด",
      evaluatingMatch: "ระบบกำลังประมวลผลความเข้ากันได้ของเมนูและระยะทาง",
      analyzedWinningDish: "วิเคราะห์เมนูที่กลุ่มเลือกเสร็จสมบูรณ์",
      scanningNearby: "ค้นหาร้านอาหารใกล้กลุ่ม...",
      rankingGroupCompatibility: "จัดอันดับความเข้ากันได้ของสมาชิก",
      noRestaurantsFound: "ยังไม่พบร้านอาหารที่ใช้ได้",
      noRestaurantsDesc: "ระบบยังไม่พบร้านอาหารที่ตรงกับเมนูในรัศมีปัจจุบัน คุณสามารถสั่งค้นหาใหม่อีกครั้งได้",
      hostRetrySearch: "ค้นหาร้านอาหารอีกครั้ง",
      hostOnlyRetryHint: "👑 สิทธิ์เฉพาะหัวหน้าห้องในการเริ่มค้นหาใหม่",
      mapLocationTitle: "แผนที่ตำแหน่งร้านอาหาร",
      spotsNearby: (count: number) => `${count} แห่งใกล้คุณ`,
      mapNoCoordinates: "ร้านที่แนะนำยังไม่มีพิกัดสำหรับแสดงบนแผนที่",
      winningDishPrefix: "เมนูที่กลุ่มเลือก",
      openInMaps: "เปิดใน Google Maps",
      priceLevel: "ระดับราคา",
      distance: "ระยะทาง",
      openNow: "เปิดอยู่",
      closed: "ปิดแล้ว",
      groupMatch: (percentage: number) => `เข้ากัน ${percentage}%`,
      whyFits: "ทำไมร้านนี้เหมาะกับกลุ่ม",
      viewMoreReasons: (count: number) => `+ ดูอีก ${count} เหตุผล`,
      hideMoreReasons: "ซ่อนเหตุผลเพิ่มเติม",
      memberMenuOptions: (count: number) => `ตัวเลือกเมนูสำหรับสมาชิก (${count} คน)`,
      optionsAvailable: "มีเมนูรองรับ",
      selectedBadge: "เลือกแล้ว",
      confirmSelection: "ยืนยันร้านที่เลือก",
      confirmHelper: "สรุปเป็นร้านอาหารปลายทางสำหรับมื้อนี้ของกลุ่ม",
      chooseThisSpot: "เลือกร้านนี้",
      selectedWinner: "เลือกร้านอาหารสำเร็จ!",
      loadFailed: "โหลดร้านอาหารไม่สำเร็จ",
      retry: "ลองใหม่",
      waitingForHostToStart: "รอ Host เริ่มค้นหาร้านอาหาร",
      winningMenuReadyWaitingHost: "เมนูสุดท้ายพร้อมแล้ว ระบบจะแสดงร้านอาหารเมื่อ Host เริ่มค้นหา",
      unconfirmedMenuWarning: "ร้านนี้ค้นพบจากเมนูที่เลือก แต่รายละเอียดเมนูสำหรับสมาชิกยังไม่ได้รับการยืนยัน",
    },
  },
};
