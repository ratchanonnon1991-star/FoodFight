import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
} from "../types/auth-types";

/**
 * Frontend Authentication Service Interface
 *
 * Defines the contract for client-side authentication interactions.
 * Actual transport/API wiring is deferred until the backend contract integration task.
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

/**
 * Placeholder service implementation.
 * Throws explicitly to prevent fabricated success states until real transport is integrated.
 */
export const authService: AuthService = {
  async register(): Promise<void> {
    throw new Error("Auth transport integration deferred until contract integration task.");
  },

  async login(): Promise<void> {
    throw new Error("Auth transport integration deferred until contract integration task.");
  },

  async verifyEmail(): Promise<void> {
    throw new Error("Auth transport integration deferred until contract integration task.");
  },

  async resendVerificationCode(): Promise<void> {
    throw new Error("Auth transport integration deferred until contract integration task.");
  },

  async changeVerificationEmail(): Promise<void> {
    throw new Error("Auth transport integration deferred until contract integration task.");
  },

  beginGoogleAuth(): void {
    throw new Error("OAuth transport integration deferred until contract integration task.");
  },

  beginLineAuth(): void {
    throw new Error("OAuth transport integration deferred until contract integration task.");
  },
};
