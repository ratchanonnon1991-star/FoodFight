import type { Metadata } from "next";
import { MealPreferenceForm } from "@/features/food-fight/components/MealPreferenceForm";

export const metadata: Metadata = {
  title: "Meal Preference | FoodFighter",
  description: "Tell FoodFighter what you want to eat in this room.",
};

export default async function MealPreferencePage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <MealPreferenceForm roomId={roomId} />;
}
