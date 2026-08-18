import type { AuthService } from "./auth-service";
import { mockAuthService } from "../mocks/mock-auth-service";

export type AuthMode = "mock" | "api";

/**
 * Resolves the active authentication mode with strict fail-closed safety.
 *
 * Safety Matrix:
 * - "mock" in development: uses MockAuthService
 * - "mock" in production: uses MockAuthService (explicit opt-in only)
 * - "api": fails closed (ApiAuthService not yet implemented)
 * - Unknown value: fails closed
 * - Missing in production: fails closed (silent mock fallback strictly prohibited)
 * - Missing in development (NODE_ENV !== "production"): defaults to "mock" for dev convenience
 */
export function resolveAuthMode(): AuthMode {
  const rawMode = process.env.NEXT_PUBLIC_AUTH_MODE?.trim();

  if (rawMode) {
    if (rawMode === "mock" || rawMode === "api") {
      return rawMode;
    }
    throw new Error(
      `Invalid NEXT_PUBLIC_AUTH_MODE: "${rawMode}". Expected "mock" or "api".`
    );
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_AUTH_MODE is missing in production. Silent mock fallback is prohibited."
    );
  }

  return "mock";
}

/**
 * Returns the active AuthService instance based on resolved configuration.
 */
export function getAuthService(): AuthService {
  const mode = resolveAuthMode();

  if (mode === "mock") {
    return mockAuthService;
  }

  throw new Error(
    'Auth mode "api" is selected, but ApiAuthService is not yet implemented.'
  );
}

/**
 * Sets mock food profile completion state during frontend development.
 */
export function setMockFoodProfileComplete(completed: boolean): void {
  if (resolveAuthMode() === "mock") {
    mockAuthService.setMockFoodProfileComplete(completed);
  }
}

/**
 * Gets mock food profile completion state during frontend development.
 */
export function isMockFoodProfileComplete(): boolean {
  if (resolveAuthMode() === "mock") {
    return mockAuthService.isMockFoodProfileComplete();
  }
  return false;
}

/**
 * Runtime authentication service proxy.
 * Resolves mode on invocation to prevent build-time static evaluation errors
 * while enforcing strict runtime fail-closed guarantees.
 */
export const authService: AuthService = {
  register: (input) => getAuthService().register(input),
  login: (input) => getAuthService().login(input),
  verifyEmail: (input) => getAuthService().verifyEmail(input),
  resendVerificationCode: (email) => getAuthService().resendVerificationCode(email),
  changeVerificationEmail: (input) => getAuthService().changeVerificationEmail(input),
  beginGoogleAuth: () => getAuthService().beginGoogleAuth(),
  beginLineAuth: () => getAuthService().beginLineAuth(),
};
