import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
} from "../types/auth-types";

/**
 * Frontend Authentication Service Interface
 *
 * Defines the client-side contract for authentication interactions.
 * Concrete transport implementation is deferred to the backend contract integration phase.
 */
export interface AuthService {
  register(input: RegisterInput): Promise<void>;
  login(input: LoginInput): Promise<void>;
  verifyEmail(input: EmailVerificationInput): Promise<void>;
  resendVerificationCode(email: string): Promise<void>;
  changeVerificationEmail(input: ChangeEmailInput): Promise<void>;
  beginGoogleAuth(): void;
  beginLineAuth(): void;
}
