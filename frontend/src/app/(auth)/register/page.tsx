import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Create Account | FoodFighter",
  description: "Create a FoodFighter account to easily decide group meals with AI.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
