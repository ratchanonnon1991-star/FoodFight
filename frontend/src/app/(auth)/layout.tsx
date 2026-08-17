import * as React from "react";
import { AuthLayout } from "@/components/layout/auth-layout";

export default function AuthGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
