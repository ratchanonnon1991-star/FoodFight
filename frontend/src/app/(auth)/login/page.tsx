import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In | FoodFighter",
  description: "Log in to your FoodFighter account to decide group meals easily with AI.",
};

export default function LoginPage() {
  return <LoginForm />;
}
