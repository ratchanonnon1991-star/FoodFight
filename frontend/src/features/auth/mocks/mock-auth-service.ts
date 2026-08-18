import type { AuthService, LoginResultData } from "../services/auth-service";
import type {
  RegisterInput,
  LoginInput,
  EmailVerificationInput,
  ChangeEmailInput,
  EmailVerificationChallenge,
  AuthResult,
} from "../types/auth-types";
import { EMAIL_VERIFICATION_POLICY } from "../constants/auth-policy";
import {
  MOCK_AUTH_DELAY_MS,
  MOCK_OTP_LIFETIME_MS,
  MOCK_RESEND_COOLDOWN_MS,
  MOCK_DUPLICATE_EMAIL,
  MOCK_VALID_VERIFICATION_CODE,
  MOCK_EXPIRED_VERIFICATION_CODE,
  MOCK_INVALID_CREDENTIALS_EMAIL,
  MOCK_INVALID_PASSWORD,
  MOCK_RETURNING_USER_EMAIL,
} from "./mock-auth-scenarios";

const delay = (ms: number = MOCK_AUTH_DELAY_MS) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const createMockChallenge = (email: string): EmailVerificationChallenge => ({
  email,
  expiresAt: Date.now() + MOCK_OTP_LIFETIME_MS,
  resendAvailableAt: Date.now() + MOCK_RESEND_COOLDOWN_MS,
});

/**
 * In-memory state for mock development flow.
 * Resets to false upon new registration; set to true upon Step 3 completion.
 */
let mockFoodProfileCompleted = false;

/**
 * Frontend Mock Authentication Service
 *
 * Simulates authentication flows locally for UI validation and development
 * without hitting real backend endpoints or fabricating JWT tokens.
 */
export const mockAuthService: AuthService & {
  setMockFoodProfileComplete: (completed: boolean) => void;
  isMockFoodProfileComplete: () => boolean;
} = {
  async register(input: RegisterInput): Promise<AuthResult<EmailVerificationChallenge>> {
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

    // Newly registered mock accounts start with incomplete food profile
    mockFoodProfileCompleted = false;

    return {
      ok: true,
      data: createMockChallenge(input.email),
    };
  },

  async login(input: LoginInput): Promise<AuthResult<LoginResultData>> {
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

    // Seeded returning user or in-memory completed session
    const isComplete =
      input.email.toLowerCase() === MOCK_RETURNING_USER_EMAIL.toLowerCase() ||
      mockFoodProfileCompleted;

    return {
      ok: true,
      data: {
        foodProfileComplete: isComplete,
      },
    };
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

  async resendVerificationCode(email: string): Promise<AuthResult<EmailVerificationChallenge>> {
    await delay();
    return {
      ok: true,
      data: createMockChallenge(email),
    };
  },

  async changeVerificationEmail(input: ChangeEmailInput): Promise<AuthResult<EmailVerificationChallenge>> {
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
    return {
      ok: true,
      data: createMockChallenge(input.newEmail),
    };
  },

  async beginGoogleAuth(): Promise<AuthResult> {
    await delay();
    return { ok: true };
  },

  async beginLineAuth(): Promise<AuthResult> {
    await delay();
    return { ok: true };
  },

  setMockFoodProfileComplete(completed: boolean) {
    mockFoodProfileCompleted = completed;
  },

  isMockFoodProfileComplete() {
    return mockFoodProfileCompleted;
  },
};
