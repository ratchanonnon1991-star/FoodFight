import type { Metadata } from "next";
import { RestrictionsStep } from "@/features/food-profile/components/RestrictionsStep";

export const metadata: Metadata = {
  title: "Dietary Restrictions | FoodFighter",
  description: "Set your dietary preferences and food restrictions for tailored meal recommendations.",
};

export default function RestrictionsPage() {
  return <RestrictionsStep />;
}
