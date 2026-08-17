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
