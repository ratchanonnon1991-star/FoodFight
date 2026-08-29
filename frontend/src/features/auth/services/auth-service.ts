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

export interface AuthService {
  register(
    input: RegisterInput,
  ): Promise<AuthResult<EmailVerificationChallenge>>;

  login(input: LoginInput): Promise<AuthResult<LoginResultData>>;

  verifyEmail(input: EmailVerificationInput): Promise<AuthResult>;

  resendVerificationCode(
    email: string,
  ): Promise<AuthResult<EmailVerificationChallenge>>;

  changeVerificationEmail(
    input: ChangeEmailInput,
  ): Promise<AuthResult<EmailVerificationChallenge>>;

  forgotPassword(input: ForgotPasswordInput): Promise<AuthResult>;

  resetPassword(input: ResetPasswordInput): Promise<AuthResult>;

  beginGoogleAuth(idToken: string): Promise<AuthResult<LoginResultData>>;

  beginLineAuth(idToken: string): Promise<AuthResult<LoginResultData>>;

  logout(): Promise<void>;
}
