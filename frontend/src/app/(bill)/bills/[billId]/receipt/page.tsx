import type { Metadata } from "next";
import { ReceiptStepScreen } from "@/features/bill/components/ReceiptStepScreen";

export const metadata: Metadata = {
  title: "Scan Receipt | FoodFighter",
  description: "Scan or upload the receipt and review its items.",
};

export default async function BillReceiptPage({
  params,
}: {
  params: Promise<{ billId: string }>;
}) {
  const { billId } = await params;
  return <ReceiptStepScreen billId={billId} />;
}
