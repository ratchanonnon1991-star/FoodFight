"use client";

import * as React from "react";
import type { EmailVerificationChallenge } from "../types/auth-types";

export interface AuthFlowContextValue {
  challenge: EmailVerificationChallenge | null;
  setChallenge: (challenge: EmailVerificationChallenge | null) => void;
  verificationCompleted: boolean;
  setVerificationCompleted: (completed: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  isFoodProfileCompleted: boolean;
  setIsFoodProfileCompleted: (completed: boolean) => void;
  clearFlowState: () => void;
}

const AuthFlowContext = React.createContext<AuthFlowContextValue | null>(null);

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const [challenge, setChallenge] = React.useState<EmailVerificationChallenge | null>(null);
  const [verificationCompleted, setVerificationCompleted] = React.useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isFoodProfileCompleted, setIsFoodProfileCompleted] = React.useState<boolean>(false);

  const clearFlowState = React.useCallback(() => {
    setChallenge(null);
    setVerificationCompleted(false);
    setIsAuthenticated(false);
    setIsFoodProfileCompleted(false);
  }, []);

  const value = React.useMemo(
    () => ({
      challenge,
      setChallenge,
      verificationCompleted,
      setVerificationCompleted,
      isAuthenticated,
      setIsAuthenticated,
      isFoodProfileCompleted,
      setIsFoodProfileCompleted,
      clearFlowState,
    }),
    [challenge, verificationCompleted, isAuthenticated, isFoodProfileCompleted, clearFlowState]
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
