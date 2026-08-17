import type { AuthService } from "../services/auth-service";
import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
  AuthResult,
} from "../types/auth-types";
import { EMAIL_VERIFICATION_POLICY } from "../constants/auth-policy";
import {
  MOCK_AUTH_DELAY_MS,
  MOCK_DUPLICATE_EMAIL,
  MOCK_VALID_VERIFICATION_CODE,
  MOCK_EXPIRED_VERIFICATION_CODE,
  MOCK_INVALID_CREDENTIALS_EMAIL,
  MOCK_INVALID_PASSWORD,
} from "./mock-auth-scenarios";

const delay = (ms: number = MOCK_AUTH_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Frontend Mock Authentication Service
 *
 * Simulates authentication flows locally for UI validation and development
 * without hitting real backend endpoints or fabricating JWT tokens.
 */
export const mockAuthService: AuthService = {
  async register(input: RegisterInput): Promise<AuthResult> {
    await delay();
    if (input.email.toLowerCase() === MOCK_DUPLICATE_EMAIL.toLowerCase()) {
      return {
        ok: false,
        error: {
          kind: "duplicate_email",
          message: "This email address is already registered.",
        },
      };
    }
    return { ok: true };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    await delay();
    if (
      input.email.toLowerCase() === MOCK_INVALID_CREDENTIALS_EMAIL.toLowerCase() ||
      input.password === MOCK_INVALID_PASSWORD
    ) {
      return {
        ok: false,
        error: {
          kind: "invalid_credentials",
          message: "Invalid email or password.",
        },
      };
    }
    return { ok: true };
  },

  async verifyEmail(input: EmailVerificationInput): Promise<AuthResult> {
    await delay();
    if (input.code.length !== EMAIL_VERIFICATION_POLICY.codeLength) {
      return {
        ok: false,
        error: {
          kind: "validation",
          message: `Verification code must be ${EMAIL_VERIFICATION_POLICY.codeLength} digits.`,
        },
      };
    }

    if (input.code === MOCK_EXPIRED_VERIFICATION_CODE) {
      return {
        ok: false,
        error: {
          kind: "expired_code",
          message: "Verification code has expired. Please request a new code.",
        },
      };
    }

    if (input.code !== MOCK_VALID_VERIFICATION_CODE) {
      return {
        ok: false,
        error: {
          kind: "invalid_code",
          message: "Invalid verification code. Please check and try again.",
        },
      };
    }

    return { ok: true };
  },

  async resendVerificationCode(): Promise<AuthResult> {
    await delay();
    return { ok: true };
  },

  async changeVerificationEmail(input: ChangeEmailInput): Promise<AuthResult> {
    await delay();
    if (input.newEmail.toLowerCase() === MOCK_DUPLICATE_EMAIL.toLowerCase()) {
      return {
        ok: false,
        error: {
          kind: "duplicate_email",
          message: "This email address is already in use.",
        },
      };
    }
    return { ok: true };
  },

  async beginGoogleAuth(): Promise<AuthResult> {
    await delay();
    return { ok: true };
  },

  async beginLineAuth(): Promise<AuthResult> {
    await delay();
    return { ok: true };
  },
};
