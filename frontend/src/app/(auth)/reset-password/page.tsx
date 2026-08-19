import type { Metadata } from "next";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password | FoodFighter",
  description: "Set a new secure password for your FoodFighter account.",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
