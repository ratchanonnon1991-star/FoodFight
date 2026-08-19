"use client";

import * as React from "react";
import type { EmailVerificationChallenge } from "../types/auth-types";

const AUTH_FLOW_STORAGE_KEY = "foodfighter_auth_flow";

interface StoredAuthFlow {
  challenge: EmailVerificationChallenge | null;
  verificationCompleted: boolean;
}

export interface AuthFlowContextValue {
  challenge: EmailVerificationChallenge | null;
  setChallenge: (challenge: EmailVerificationChallenge | null) => void;

  verificationCompleted: boolean;
  setVerificationCompleted: (completed: boolean) => void;

  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;

  clearFlowState: () => void;
}

const AuthFlowContext = React.createContext<AuthFlowContextValue | null>(null);

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const [challenge, setChallengeState] =
    React.useState<EmailVerificationChallenge | null>(null);

  const [verificationCompleted, setVerificationCompletedState] =
    React.useState(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [isHydrated, setIsHydrated] = React.useState(false);

  // Restore OTP flow after refresh
  React.useEffect(() => {
    try {
      const stored = sessionStorage.getItem(AUTH_FLOW_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as StoredAuthFlow;

        setChallengeState(parsed.challenge ?? null);

        setVerificationCompletedState(parsed.verificationCompleted ?? false);
      }
    } catch {
      sessionStorage.removeItem(AUTH_FLOW_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const persistFlow = React.useCallback(
    (
      nextChallenge: EmailVerificationChallenge | null,
      nextVerificationCompleted: boolean,
    ) => {
      const data: StoredAuthFlow = {
        challenge: nextChallenge,
        verificationCompleted: nextVerificationCompleted,
      };

      sessionStorage.setItem(AUTH_FLOW_STORAGE_KEY, JSON.stringify(data));
    },
    [],
  );

  const setChallenge = React.useCallback(
    (nextChallenge: EmailVerificationChallenge | null) => {
      setChallengeState(nextChallenge);

      persistFlow(nextChallenge, verificationCompleted);
    },
    [persistFlow, verificationCompleted],
  );

  const setVerificationCompleted = React.useCallback(
    (completed: boolean) => {
      setVerificationCompletedState(completed);

      persistFlow(challenge, completed);
    },
    [challenge, persistFlow],
  );

  const clearFlowState = React.useCallback(() => {
    setChallengeState(null);
    setVerificationCompletedState(false);
    setIsAuthenticated(false);

    sessionStorage.removeItem(AUTH_FLOW_STORAGE_KEY);
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
    [
      challenge,
      setChallenge,
      verificationCompleted,
      setVerificationCompleted,
      isAuthenticated,
      clearFlowState,
    ],
  );

  // Prevent "Verification session not found"
  // from flashing before sessionStorage is restored.
  if (!isHydrated) {
    return null;
  }

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
