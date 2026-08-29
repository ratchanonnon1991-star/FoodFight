import type { Metadata } from "next";
import { AdminRouteGuard } from "@/features/admin/guards/AdminRouteGuard";
import { AdminShell } from "@/features/admin/components/AdminShell";
import { ApplicationShell } from "@/components/layout/ApplicationShell";

export const metadata: Metadata = {
  title: "FoodFighter Admin",
  description: "Administrative console for FoodFighter platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRouteGuard>
      <ApplicationShell>
        <AdminShell>{children}</AdminShell>
      </ApplicationShell>
    </AdminRouteGuard>
  );
}