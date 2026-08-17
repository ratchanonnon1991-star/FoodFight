import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
  EmailVerificationChallenge,
  AuthResult,
} from "../types/auth-types";

/**
 * Frontend Authentication Service Interface
 *
 * Defines the client-side contract for authentication interactions.
 * Returns domain AuthResult models so UI layers handle success and failure
 * without throwing or inventing backend DTOs.
 */
export interface AuthService {
  register(input: RegisterInput): Promise<AuthResult<EmailVerificationChallenge>>;
  login(input: LoginInput): Promise<AuthResult>;
  verifyEmail(input: EmailVerificationInput): Promise<AuthResult>;
  resendVerificationCode(email: string): Promise<AuthResult<EmailVerificationChallenge>>;
  changeVerificationEmail(input: ChangeEmailInput): Promise<AuthResult>;
  beginGoogleAuth(): Promise<AuthResult>;
  beginLineAuth(): Promise<AuthResult>;
}
