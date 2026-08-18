import type { Metadata } from "next";
import { DetailsStep } from "@/features/food-profile/components/DetailsStep";

export const metadata: Metadata = {
  title: "Additional Details | FoodFighter",
  description: "Share optional food preferences or notes to help FoodFighter customize your dining recommendations.",
};

export default function DetailsPage() {
  return <DetailsStep />;
}
