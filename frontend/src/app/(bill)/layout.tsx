import * as React from "react";
import { ResponsiveNavigation } from "@/components/layout/ResponsiveNavigation";
import { ApplicationShell } from "@/components/layout/ApplicationShell";

export default function BillAuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationShell>
      <ResponsiveNavigation />
      {children}
    </ApplicationShell>
  );
}