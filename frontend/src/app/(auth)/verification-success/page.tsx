import type { Metadata } from "next";
import { VerificationSuccess } from "@/features/auth/components/VerificationSuccess";

export const metadata: Metadata = {
  title: "Email Verified | FoodFighter",
  description: "Your email address has been successfully verified on FoodFighter.",
};

export default function VerificationSuccessPage() {
  return <VerificationSuccess />;
}
