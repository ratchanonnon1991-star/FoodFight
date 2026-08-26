import type { Metadata } from "next";
import { DesignSystemShowroom } from "@/design-system";

export const metadata: Metadata = {
  title: "FoodFighter Design System V4.1 — Fire & Flavor",
  description: "Reference-informed FoodFighter component library and visual showroom",
};

export default function DesignSystemPage() {
  return <DesignSystemShowroom />;
}
