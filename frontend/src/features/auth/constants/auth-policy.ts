/**
 * Frontend Authentication Policies
 *
 * Source-backed validation rules for authentication forms.
 * Backend remains the authority for token verification, attempt tracking,
 * and OTP code lifecycle/expiration.
 */

export const AUTH_PASSWORD_POLICY = {
  minLength: 8,
  requireLowercase: true,
  requireUppercase: true,
  requireNumber: true,
  requireSpecialCharacter: true,
} as const;

export const EMAIL_VERIFICATION_POLICY = {
  codeLength: 6,
} as const;
