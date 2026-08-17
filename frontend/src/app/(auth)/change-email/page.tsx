import type { Metadata } from "next";
import { ChangeEmailForm } from "@/features/auth/components/change-email-form";

export const metadata: Metadata = {
  title: "Change Email | FoodFighter",
  description: "Update your email address to receive a fresh verification code on FoodFighter.",
};

export default function ChangeEmailPage() {
  return <ChangeEmailForm />;
}
