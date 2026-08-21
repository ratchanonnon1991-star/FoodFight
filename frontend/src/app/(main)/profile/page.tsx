import type { Metadata } from "next";
import { ProfilePageContent } from "@/features/profile/components/ProfilePageContent";

export const metadata: Metadata = {
  title: "My Profile | FoodFighter",
  description: "Manage your FoodFighter profile and food preferences.",
};

export default function ProfilePage() {
  return <ProfilePageContent />;
}
