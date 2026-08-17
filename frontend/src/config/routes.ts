/**
 * Application Route Constants
 *
 * Centralized mapping of client-side application paths.
 */

export const ROUTES = {
  HOME: "/",
  AUTH: {
    REGISTER: "/register",
    VERIFY_EMAIL: "/verify-email",
    CHANGE_EMAIL: "/change-email",
    LOGIN: "/login",
  },
  DESIGN_SYSTEM: "/design-system",
} as const;

export type AppRoute =
  | typeof ROUTES.HOME
  | (typeof ROUTES.AUTH)[keyof typeof ROUTES.AUTH]
  | typeof ROUTES.DESIGN_SYSTEM;
