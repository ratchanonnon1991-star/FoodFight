/**
 * Frontend Mock Auth Fixtures & Scenarios
 *
 * Deterministic test values used exclusively by MockAuthService.
 * These are development fixtures and not production domain policy.
 */

export const MOCK_AUTH_DELAY_MS = 250;

export const MOCK_OTP_LIFETIME_MS = 5 * 60 * 1000; // 5 minutes

export const MOCK_RESEND_COOLDOWN_MS = 45 * 1000; // 45 seconds

export const MOCK_DUPLICATE_EMAIL = "exists@example.com";

export const MOCK_VALID_VERIFICATION_CODE = "123456";

export const MOCK_EXPIRED_VERIFICATION_CODE = "999999";

export const MOCK_INVALID_CREDENTIALS_EMAIL = "wrong@example.com";

export const MOCK_INVALID_PASSWORD = "WrongPassword1";

/**
 * Seeded returning user with an already completed Food Profile.
 * Used for demoing immediate post-auth navigation to /home.
 */
export const MOCK_RETURNING_USER_EMAIL = "returning@example.com";
