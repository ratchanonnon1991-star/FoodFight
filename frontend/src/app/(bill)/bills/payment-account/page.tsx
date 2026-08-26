import type { Metadata } from "next";
import { Suspense } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Spinner } from "@/components/ui/Spinner";
import { PaymentAccountScreen } from "@/features/bill/components/PaymentAccountScreen";

export const metadata: Metadata = {
  title: "Payment Account | FoodFighter",
  description: "Set up the PromptPay account that collects bill payments.",
};

export default function PaymentAccountPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh bg-background text-text-primary">
          <PageContainer
            maxWidth="auth"
            paddingY="none"
            className="flex min-h-dvh items-center justify-center"
          >
            <Spinner size="lg" />
          </PageContainer>
        </main>
      }
    >
      <PaymentAccountScreen />
    </Suspense>
  );
}
