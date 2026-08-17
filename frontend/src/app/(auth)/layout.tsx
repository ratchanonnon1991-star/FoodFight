import * as React from "react";
import { AuthLayout } from "@/components/layout/auth-layout";
import { AuthFlowProvider } from "@/features/auth/context";

export default function AuthGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthFlowProvider>
      <AuthLayout>{children}</AuthLayout>
    </AuthFlowProvider>
  );
}
