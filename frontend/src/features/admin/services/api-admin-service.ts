import { API_BASE_URL } from "@/config/api";
import type { AdminDashboardMetrics } from "../types/admin-types";

export async function fetchAdminDashboard(
  token: string
): Promise<AdminDashboardMetrics> {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch admin dashboard statistics.`);
  }

  return (await response.json()) as AdminDashboardMetrics;
}
