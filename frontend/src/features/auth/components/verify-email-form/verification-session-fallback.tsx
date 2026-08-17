"use client";

import * as React from "react";
import { AuthSessionFallback } from "../auth-session-fallback";

export function VerificationSessionFallback() {
  return (
    <AuthSessionFallback
      title="Verification session not found"
      description="Please register or sign in to verify your email address."
    />
  );
}
