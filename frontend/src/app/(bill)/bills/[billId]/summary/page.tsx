import type { Metadata } from "next";
import { SummaryStepScreen } from "@/features/bill/components/SummaryStepScreen";

export const metadata: Metadata = {
  title: "Review & Confirm | FoodFighter",
  description: "Review the bill summary and confirm to create it.",
};

export default async function BillSummaryPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  return <SummaryStepScreen billId={billId} />;
}
