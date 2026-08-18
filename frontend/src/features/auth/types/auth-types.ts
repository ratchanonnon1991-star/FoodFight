/**
 * Frontend Authentication Domain & Input Types
 *
 * Types for user input, operation status, challenge state, and client-side results across auth flows.
 */

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface EmailVerificationInput {
  code: string;
}

export interface ChangeEmailInput {
  newEmail: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string;
  token?: string;
}

export interface EmailVerificationChallenge {
  email: string;
  expiresAt: number;
  resendAvailableAt: number;
}

export type AuthErrorKind =
  | "validation"
  | "invalid_credentials"
  | "duplicate_email"
  | "invalid_code"
  | "expired_code"
  | "network"
  | "unknown";

export interface AuthError {
  kind: AuthErrorKind;
  message: string;
  fieldErrors?: Record<string, string>;
}

export type AuthResult<T = void> =
  | { ok: true; data?: T }
  | { ok: false; error: AuthError };
