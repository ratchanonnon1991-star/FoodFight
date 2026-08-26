import * as React from "react";
import { ResponsiveNavigation } from "@/components/layout/ResponsiveNavigation";

export default function BillAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-dvh flex flex-col justify-between bg-background text-text-primary">
      <ResponsiveNavigation />
      {children}
    </div>
  );
}
