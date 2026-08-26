"use client";

import { MealPreferenceForm } from "@/features/food-fight/components/MealPreferenceForm";

export function RecommendationScreen({ roomId }: { roomId: string }) {
  return <MealPreferenceForm roomId={roomId} />;
}
