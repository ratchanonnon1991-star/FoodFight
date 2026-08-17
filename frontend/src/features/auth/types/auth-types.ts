/**
 * Frontend Authentication Domain & Input Types
 *
 * Types for user input and client-side form state across auth flows.
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

export type AuthOperationStatus = "idle" | "loading" | "success" | "error";

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
