"use client";

import * as React from "react";
import type { EmailVerificationChallenge } from "../types/auth-types";

export interface AuthFlowContextValue {
  challenge: EmailVerificationChallenge | null;
  setChallenge: (challenge: EmailVerificationChallenge | null) => void;
  verificationCompleted: boolean;
  setVerificationCompleted: (completed: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (completed: boolean) => void;
  clearFlowState: () => void;
}

const AuthFlowContext = React.createContext<AuthFlowContextValue | null>(null);

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const [challenge, setChallenge] = React.useState<EmailVerificationChallenge | null>(null);
  const [verificationCompleted, setVerificationCompleted] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  const clearFlowState = React.useCallback(() => {
    setChallenge(null);
    setVerificationCompleted(false);
    setIsAuthenticated(false);
  }, []);

  const value = React.useMemo(
    () => ({
      challenge,
      setChallenge,
      verificationCompleted,
      setVerificationCompleted,
      isAuthenticated,
      setIsAuthenticated,
      clearFlowState,
    }),
    [challenge, verificationCompleted, isAuthenticated, clearFlowState]
  );

  return (
    <AuthFlowContext.Provider value={value}>
      {children}
    </AuthFlowContext.Provider>
  );
}

export function useAuthFlow(): AuthFlowContextValue {
  const context = React.useContext(AuthFlowContext);
  if (!context) {
    throw new Error("useAuthFlow must be used within an AuthFlowProvider");
  }
  return context;
}
