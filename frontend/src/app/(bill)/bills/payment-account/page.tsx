import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentAccountScreen } from "@/features/bill/components/PaymentAccountScreen";

export const metadata: Metadata = {
  title: "Payment Account | FoodFighter",
  description: "Set up the PromptPay account that collects bill payments.",
};

export default function PaymentAccountPage() {
  return (
    <Suspense>
      <PaymentAccountScreen />
    </Suspense>
  );
}
