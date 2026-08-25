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
    PREFERENCES: (roomId: string) =>
      `/room/${encodeURIComponent(roomId)}/preferences`,
    RECOMMENDATIONS: (roomId: string) =>
      `/room/${encodeURIComponent(roomId)}/recommendations`,
    RESTAURANTS: (roomId: string, conceptId?: string) => {
      const basePath = `/room/${encodeURIComponent(roomId)}/restaurants`;
      return conceptId
        ? `${basePath}?conceptId=${encodeURIComponent(conceptId)}`
        : basePath;
    },
  },
  ROOM_INVITE: (inviteToken: string) => `/join/${encodeURIComponent(inviteToken)}`,
  HISTORY: "/history",
  BILLS: "/bills",
  BILL_PAYMENT_ACCOUNT: "/bills/payment-account",
  PROFILE: "/profile",
  PAYMENT_ACCOUNT: "/payment-account",
  DESIGN_SYSTEM: "/design-system",
} as const;

/** Bill routes that need a billId can't be plain string constants. */
export const billRoutes = {
  receipt: (billId: string) => `/bills/${billId}/receipt`,
  split: (billId: string) => `/bills/${billId}/split`,
  summary: (billId: string) => `/bills/${billId}/summary`,
  detail: (billId: string) => `/bills/${billId}`,
};
