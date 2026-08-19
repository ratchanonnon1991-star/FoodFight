import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | FoodFighter",
  description: "Reset your FoodFighter account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
