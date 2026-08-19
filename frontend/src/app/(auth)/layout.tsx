"use client";

import * as React from "react";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { AuthFlowProvider } from "@/features/auth/context/auth-flow-context";

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
