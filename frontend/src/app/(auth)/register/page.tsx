import type { Metadata } from "next";
import { GuestOnlyGuard } from "@/components/auth/GuestOnlyGuard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | FoodFighter",
  description: "Create a FoodFighter account to easily decide group meals with AI.",
};

export default function RegisterPage() {
  return (
    <GuestOnlyGuard>
      <RegisterForm />
    </GuestOnlyGuard>
  );
}
