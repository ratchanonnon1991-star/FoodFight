import type { Metadata } from "next";
import { AuthenticatedHome } from "@/features/home/components/AuthenticatedHome";

export const metadata: Metadata = {
  title: "Home | FoodFighter",
  description: "AI-Powered Group Meal Decision Platform. Start a new FoodFight, join rooms, and review recent group meals.",
};

export default function HomePage() {
  return <AuthenticatedHome />;
}
