import * as React from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ResponsiveNavigation } from "@/components/layout/ResponsiveNavigation";

export default function MainAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="relative min-h-dvh flex flex-col justify-between bg-background text-text-primary">
        <ResponsiveNavigation activeTab="home" />
        {children}
      </div>
    </AuthGuard>
  );
}
