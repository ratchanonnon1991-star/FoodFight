import type { Metadata } from "next";
import { BillDetailScreen } from "@/features/bill/components/BillDetailScreen";

export const metadata: Metadata = {
  title: "Bill Detail | FoodFighter",
  description: "Track payment status for a split bill.",
};

export default async function BillDetailPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  return <BillDetailScreen billId={billId} />;
}
