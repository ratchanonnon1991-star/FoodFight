import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  EmailVerificationChallenge,
  AuthResult,
} from "../types/auth-types";

export interface LoginResultData {
  foodProfileComplete?: boolean;
}

/**
 * Frontend Authentication Service Interface
 *
 * Defines the client-side contract for authentication interactions.
 * Returns domain AuthResult models so UI layers handle success and failure
 * without throwing or inventing backend DTOs.
 */
export interface AuthService {
  register(input: RegisterInput): Promise<AuthResult<EmailVerificationChallenge>>;
  login(input: LoginInput): Promise<AuthResult<LoginResultData>>;
  verifyEmail(input: EmailVerificationInput): Promise<AuthResult>;
  resendVerificationCode(email: string): Promise<AuthResult<EmailVerificationChallenge>>;
  changeVerificationEmail(input: ChangeEmailInput): Promise<AuthResult<EmailVerificationChallenge>>;
  forgotPassword(input: ForgotPasswordInput): Promise<AuthResult>;
  resetPassword(input: ResetPasswordInput): Promise<AuthResult>;
  beginGoogleAuth(): Promise<AuthResult>;
  beginLineAuth(): Promise<AuthResult>;
}
