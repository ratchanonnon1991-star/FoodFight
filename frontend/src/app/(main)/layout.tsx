import * as React from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ResponsiveNavigation } from "@/components/layout/ResponsiveNavigation";
import { ApplicationShell } from "@/components/layout/ApplicationShell";

export default function MainAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <ApplicationShell>
        <ResponsiveNavigation activeTab="home" />
        {children}
      </ApplicationShell>
    </AuthGuard>
  );
}