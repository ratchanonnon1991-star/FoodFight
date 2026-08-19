import type { Metadata } from "next";
import { AllergiesStep } from "@/features/food-profile/components/AllergiesStep";

export const metadata: Metadata = {
  title: "Food Allergies | FoodFighter",
  description: "Set your dietary allergy preferences for personalized FoodFighter meal recommendations.",
};

export default function AllergiesPage() {
  return <AllergiesStep />;
}
