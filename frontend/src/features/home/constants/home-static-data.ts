export interface FoodInspirationCardItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  iconName: "flame" | "sparkles" | "soup" | "pizza" | "utensils";
  imageSrc?: string;
}

export const FOOD_INSPIRATION_ITEMS: readonly FoodInspirationCardItem[] = [
  {
    id: "inspire-1",
    tag: "Street Eats",
    title: "Quick Bites & Grills",
    subtitle: "Crispy, savory & fast favorites",
    iconName: "flame",
    imageSrc: "/images/home/home-carousel-street-eats.webp",
  },
  {
    id: "inspire-2",
    tag: "Comfort",
    title: "Warm Bowls & Noodles",
    subtitle: "Rich broth & aromatic spices",
    iconName: "soup",
    imageSrc: "/images/home/home-carousel-comfort.webp",
  },
  {
    id: "inspire-3",
    tag: "Group Feast",
    title: "Sharing Plates & Pizza",
    subtitle: "Perfect for sharing with friends",
    iconName: "pizza",
    imageSrc: "/images/home/home-carousel-group-feast.webp",
  },
  {
    id: "inspire-4",
    tag: "Fresh & Light",
    title: "Green & Healthy Bowls",
    subtitle: "Vibrant veggies & light dressings",
    iconName: "sparkles",
    imageSrc: "/images/home/home-carousel-fresh-light.webp",
  },
  {
    id: "inspire-5",
    tag: "Sweet Craving",
    title: "Desserts & Drinks",
    subtitle: "Sweet endings & cold refreshments",
    iconName: "utensils",
    imageSrc: "/images/home/home-carousel-sweet.webp",
  },
] as const;

export const HOME_TIP = {
  id: "tip-1",
  title: "Tip",
  text: "The more accurate your food profile, the better our recommendations!",
} as const;
