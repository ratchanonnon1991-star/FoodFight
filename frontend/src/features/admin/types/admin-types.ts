export interface AdminDashboardMetrics {
  totalUsers: number;
  newUsersLast7Days: number;
  totalRooms: number;
  activeRooms: number;
  completedRooms: number;
  cancelledRooms: number;
}

export type AdminUserRole = "USER" | "ADMIN";

export interface AdminUserListItem {
  id: string;
  displayName: string | null;
  email: string;
  emailVerified: boolean;
  role: AdminUserRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AdminUsersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersResponse {
  items: AdminUserListItem[];
  pagination: AdminUsersPagination;
}

export interface AdminUsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: AdminUserRole;
}
