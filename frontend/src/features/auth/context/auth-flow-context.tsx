"use client";

import * as React from "react";
import type { EmailVerificationChallenge } from "../types/auth-types";

const AUTH_FLOW_STORAGE_KEY = "foodfighter_auth_flow";

interface StoredAuthFlow {
  challenge: EmailVerificationChallenge | null;
  verificationCompleted: boolean;
  isFoodProfileCompleted: boolean;
}

export interface AuthFlowContextValue {
  isHydrating: boolean;

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
  const [isHydrating, setIsHydrating] = React.useState(true);
  const [challenge, setChallengeState] =
    React.useState<EmailVerificationChallenge | null>(null);

  const [verificationCompleted, setVerificationCompletedState] =
    React.useState(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const [isFoodProfileCompleted, setIsFoodProfileCompletedState] =
    React.useState(false);

  // Restore auth flow after refresh
  React.useEffect(() => {
    void Promise.resolve().then(() => {
      try {
        const stored = sessionStorage.getItem(AUTH_FLOW_STORAGE_KEY);

        if (stored) {
          const parsed = JSON.parse(stored) as StoredAuthFlow;

          setChallengeState(parsed.challenge ?? null);

          setVerificationCompletedState(parsed.verificationCompleted ?? false);

          setIsFoodProfileCompletedState(parsed.isFoodProfileCompleted ?? false);
        }
      } catch {
        sessionStorage.removeItem(AUTH_FLOW_STORAGE_KEY);
      } finally {
        setIsHydrating(false);
      }
    });
  }, []);

  const persistFlow = React.useCallback(
    (
      nextChallenge: EmailVerificationChallenge | null,
      nextVerificationCompleted: boolean,
      nextFoodProfileCompleted: boolean,
    ) => {
      const data: StoredAuthFlow = {
        challenge: nextChallenge,
        verificationCompleted: nextVerificationCompleted,
        isFoodProfileCompleted: nextFoodProfileCompleted,
      };

      sessionStorage.setItem(AUTH_FLOW_STORAGE_KEY, JSON.stringify(data));
    },
    [],
  );

  const setChallenge = React.useCallback(
    (nextChallenge: EmailVerificationChallenge | null) => {
      setChallengeState(nextChallenge);

      persistFlow(nextChallenge, verificationCompleted, isFoodProfileCompleted);
    },
    [persistFlow, verificationCompleted, isFoodProfileCompleted],
  );

  const setVerificationCompleted = React.useCallback(
    (completed: boolean) => {
      setVerificationCompletedState(completed);

      persistFlow(challenge, completed, isFoodProfileCompleted);
    },
    [challenge, persistFlow, isFoodProfileCompleted],
  );

  const setIsFoodProfileCompleted = React.useCallback(
    (completed: boolean) => {
      setIsFoodProfileCompletedState(completed);

      persistFlow(challenge, verificationCompleted, completed);
    },
    [challenge, verificationCompleted, persistFlow],
  );

  const clearFlowState = React.useCallback(() => {
    setChallengeState(null);
    setVerificationCompletedState(false);
    setIsAuthenticated(false);
    setIsFoodProfileCompletedState(false);

    sessionStorage.removeItem(AUTH_FLOW_STORAGE_KEY);
  }, []);

  const value = React.useMemo(
    () => ({
      isHydrating,
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
    [
      isHydrating,
      challenge,
      setChallenge,
      verificationCompleted,
      setVerificationCompleted,
      isAuthenticated,
      isFoodProfileCompleted,
      setIsFoodProfileCompleted,
      clearFlowState,
    ],
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
