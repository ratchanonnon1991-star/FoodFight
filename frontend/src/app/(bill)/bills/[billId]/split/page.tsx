import type { Metadata } from "next";
import { SplitStepScreen } from "@/features/bill/components/SplitStepScreen";

export const metadata: Metadata = {
  title: "Split Bill | FoodFighter",
  description: "Assign who ate what before calculating the split.",
};

export default async function BillSplitPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  return <SplitStepScreen billId={billId} />;
}
