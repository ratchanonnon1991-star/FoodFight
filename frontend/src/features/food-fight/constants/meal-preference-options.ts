export interface MealPreferenceOption {
  value: string;
  label: string;
  englishLabel: string;
}

export const COOKING_METHOD_OPTIONS: MealPreferenceOption[] = [
  { value: "GRILL", label: "ย่าง", englishLabel: "Grilled" },
  { value: "FRY", label: "ทอด", englishLabel: "Fried" },
  { value: "BOIL", label: "ต้ม", englishLabel: "Boiled" },
  { value: "STEAM", label: "นึ่ง", englishLabel: "Steamed" },
  { value: "BAKE", label: "อบ", englishLabel: "Baked" },
  { value: "RAW", label: "สด / ไม่ปรุง", englishLabel: "Fresh / Raw" },
  { value: "ANY", label: "อะไรก็ได้", englishLabel: "Any" },
];

export const CUISINE_OPTIONS: MealPreferenceOption[] = [
  { value: "THAI", label: "ไทย", englishLabel: "Thai" },
  { value: "JAPANESE", label: "ญี่ปุ่น", englishLabel: "Japanese" },
  { value: "KOREAN", label: "เกาหลี", englishLabel: "Korean" },
  { value: "CHINESE", label: "จีน", englishLabel: "Chinese" },
  { value: "WESTERN", label: "ตะวันตก", englishLabel: "Western" },
  { value: "INDIAN", label: "อินเดีย", englishLabel: "Indian" },
  { value: "ANY", label: "อะไรก็ได้", englishLabel: "Any" },
];

export const PROTEIN_OPTIONS: MealPreferenceOption[] = [
  { value: "CHICKEN", label: "ไก่", englishLabel: "Chicken" },
  { value: "PORK", label: "หมู", englishLabel: "Pork" },
  { value: "BEEF", label: "เนื้อ", englishLabel: "Beef" },
  { value: "SEAFOOD", label: "อาหารทะเล", englishLabel: "Seafood" },
  { value: "EGG", label: "ไข่", englishLabel: "Egg" },
  { value: "VEGETABLE", label: "ผัก / โปรตีนพืช", englishLabel: "Vegetable / Plant-based" },
  { value: "ANY", label: "อะไรก็ได้", englishLabel: "Any" },
];

export const RESTAURANT_STYLE_OPTIONS: MealPreferenceOption[] = [
  { value: "CASUAL", label: "สบาย ๆ", englishLabel: "Casual" },
  { value: "FAMILY", label: "เหมาะกับครอบครัว", englishLabel: "Family-friendly" },
  { value: "QUICK", label: "ทานเร็ว", englishLabel: "Quick meal" },
  { value: "CAFE", label: "คาเฟ่", englishLabel: "Cafe" },
  { value: "FINE_DINING", label: "พิเศษ / โอกาสสำคัญ", englishLabel: "Special occasion" },
  { value: "ANY", label: "อะไรก็ได้", englishLabel: "Any" },
];

export const BUDGET_OPTIONS: Array<{
  value: "LOW" | "MID" | "HIGH" | "ANY";
  label: string;
  description: string;
}> = [
  { value: "LOW", label: "ประหยัด", description: "ต่ำกว่า ฿150 / คน" },
  { value: "MID", label: "กลาง ๆ", description: "ประมาณ ฿150–400 / คน" },
  { value: "HIGH", label: "พรีเมียม", description: "มากกว่า ฿400 / คน" },
  { value: "ANY", label: "ไม่จำกัด", description: "เลือกได้ทุกช่วงราคา" },
];
