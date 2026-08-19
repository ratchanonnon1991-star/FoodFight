/**
 * Backend API Configuration
 *
 * Provides centralized API endpoint resolution with graceful fallback.
 */

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888"
).replace(/\/+$/, "");
