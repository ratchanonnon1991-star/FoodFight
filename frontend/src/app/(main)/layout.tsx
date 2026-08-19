import * as React from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";

export default function MainAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex flex-col justify-between bg-background text-text-primary">
      {children}
      <BottomNavigation />
    </div>
  );
}
