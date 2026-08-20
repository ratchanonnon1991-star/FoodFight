import type { Metadata } from "next";
import { HistoryPageContent } from "@/features/history/components/HistoryPageContent";

export const metadata: Metadata = {
  title: "History | FoodFighter",
  description: "Review your completed FoodFighter group meals.",
};

export default function HistoryPage() {
  return <HistoryPageContent />;
}
