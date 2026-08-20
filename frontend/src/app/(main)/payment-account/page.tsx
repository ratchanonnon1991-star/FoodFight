import type { Metadata } from "next";
import { PaymentAccountPageContent } from "@/features/payment-account/components/PaymentAccountPageContent";

export const metadata: Metadata = {
  title: "Payment Account | FoodFighter",
  description: "Set up your PromptPay account for bill payments.",
};

export default function PaymentAccountPage() {
  return <PaymentAccountPageContent />;
}
