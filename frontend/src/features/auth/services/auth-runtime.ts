import type { AuthService } from "./auth-service";
import { mockAuthService } from "../mocks/mock-auth-service";

/**
 * Active Frontend Authentication Runtime Selector
 *
 * Provides the active AuthService instance to UI components based on configuration.
 * Defaults to "mock" for isolated UI development until the API adapter is integrated.
 */
export function getAuthService(): AuthService {
  const authMode = process.env.NEXT_PUBLIC_AUTH_MODE || "mock";

  if (authMode === "mock") {
    return mockAuthService;
  }

  throw new Error(
    `Auth mode "${authMode}" is not yet configured with an active API transport adapter.`
  );
}

export const authService: AuthService = getAuthService();
