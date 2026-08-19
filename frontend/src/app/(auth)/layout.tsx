"use client";

import * as React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { AuthFlowProvider } from "@/features/auth/context/auth-flow-context";

export default function AuthGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured");
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthFlowProvider>
        <AuthLayout>{children}</AuthLayout>
      </AuthFlowProvider>
    </GoogleOAuthProvider>
  );
}
