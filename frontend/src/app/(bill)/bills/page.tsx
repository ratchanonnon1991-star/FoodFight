import type { Metadata } from "next";
import { SelectMealScreen } from "@/features/bill/components/SelectMealScreen";

export const metadata: Metadata = {
  title: "Split Bill | FoodFighter",
  description: "Choose a meal to split the bill for.",
};

export default function BillsPage() {
  return <SelectMealScreen />;
}
