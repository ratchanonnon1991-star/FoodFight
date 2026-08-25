import type { Metadata } from "next";
import { RecommendationScreen } from "@/features/food-fight/components/RecommendationScreen";

export const metadata: Metadata = {
  title: "Recommendations | FoodFighter",
  description: "See the top food recommendations for your FoodFighter room.",
};

export default async function RecommendationsPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <RecommendationScreen roomId={roomId} />;
}
