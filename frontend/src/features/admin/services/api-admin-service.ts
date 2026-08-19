import { API_BASE_URL } from "@/config/api";
import type {
  AdminDashboardMetrics,
  AdminUsersQuery,
  AdminUsersResponse,
} from "../types/admin-types";

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

export async function fetchAdminUsers(
  query: AdminUsersQuery,
  token: string
): Promise<AdminUsersResponse> {
  const params = new URLSearchParams();

  if (query.page && query.page > 0) {
    params.set("page", query.page.toString());
  }

  if (query.limit && query.limit > 0) {
    params.set("limit", query.limit.toString());
  }

  if (query.search && query.search.trim().length > 0) {
    params.set("search", query.search.trim());
  }

  if (query.role) {
    params.set("role", query.role);
  }

  const queryString = params.toString();
  const endpoint = `${API_BASE_URL}/admin/users${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch admin users directory.`);
  }

  return (await response.json()) as AdminUsersResponse;
}
