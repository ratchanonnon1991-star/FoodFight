import * as React from "react";
import { FoodProfileProvider } from "@/features/food-profile/context/food-profile-context";

export default function FoodProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FoodProfileProvider>{children}</FoodProfileProvider>;
}
