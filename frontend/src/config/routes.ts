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
    VERIFICATION_SUCCESS: "/verification-success",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  FOOD_PROFILE: {
    ALLERGIES: "/food-profile/allergies",
    RESTRICTIONS: "/food-profile/restrictions",
    DETAILS: "/food-profile/details",
  },
  AUTHENTICATED_HOME: "/home",
  ROOM: {
    CREATE: "/room/create",
    JOIN: "/room/join",
    PREVIEW: "/room/preview",
    LOBBY: (roomId: string) => `/room/${encodeURIComponent(roomId)}`,
  },
  ROOM_INVITE: (inviteToken: string) => `/join/${encodeURIComponent(inviteToken)}`,
  HISTORY: "/history",
  BILLS: "/bills",
  PROFILE: "/profile",
  PAYMENT_ACCOUNT: "/payment-account",
  DESIGN_SYSTEM: "/design-system",
} as const;
