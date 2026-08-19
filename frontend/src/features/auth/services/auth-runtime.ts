import type { AuthService } from "./auth-service";
import { mockAuthService } from "../mocks/mock-auth-service";
import { apiAuthService } from "./api-auth-service";

export type AuthMode = "mock" | "api";

export function resolveAuthMode(): AuthMode {
  const rawMode = process.env.NEXT_PUBLIC_AUTH_MODE?.trim();

  if (rawMode) {
    if (rawMode === "mock" || rawMode === "api") {
      return rawMode;
    }

    throw new Error(
      `Invalid NEXT_PUBLIC_AUTH_MODE: "${rawMode}". Expected "mock" or "api".`,
    );
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_AUTH_MODE is missing in production. Silent mock fallback is prohibited.",
    );
  }

  return "mock";
}

export function getAuthService(): AuthService {
  const mode = resolveAuthMode();

  if (mode === "mock") {
    return mockAuthService;
  }

  if (mode === "api") {
    return apiAuthService;
  }

  throw new Error("Unsupported auth mode.");
}

export function setMockFoodProfileComplete(completed: boolean): void {
  if (resolveAuthMode() === "mock") {
    mockAuthService.setMockFoodProfileComplete(completed);
  }
}

export function isMockFoodProfileComplete(): boolean {
  if (resolveAuthMode() === "mock") {
    return mockAuthService.isMockFoodProfileComplete();
  }

  return false;
}

export const authService: AuthService = {
  register: (input) => getAuthService().register(input),

  login: (input) => getAuthService().login(input),

  verifyEmail: (input) => getAuthService().verifyEmail(input),

  resendVerificationCode: (email) =>
    getAuthService().resendVerificationCode(email),

  changeVerificationEmail: (input) =>
    getAuthService().changeVerificationEmail(input),

  forgotPassword: (input) => getAuthService().forgotPassword(input),

  resetPassword: (input) => getAuthService().resetPassword(input),

  beginGoogleAuth: (idToken) => getAuthService().beginGoogleAuth(idToken),

  beginLineAuth: (idToken) => getAuthService().beginLineAuth(idToken),
};
