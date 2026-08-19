"use client";

import * as React from "react";
import {
  Search,
  Users,
  Shield,
  User,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from "lucide-react";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { fetchAdminUsers } from "../services/api-admin-service";
import type {
  AdminUserListItem,
  AdminUsersPagination,
  AdminUserRole,
} from "../types/admin-types";

export function AdminUsersPage() {
  const [users, setUsers] = React.useState<AdminUserListItem[]>([]);
  const [pagination, setPagination] = React.useState<AdminUsersPagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });

  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeSearch, setActiveSearch] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<AdminUserRole | "">("");

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loadUsers = React.useCallback(
    async (targetPage: number, search: string, role: AdminUserRole | "") => {
      setIsLoading(true);
      setError(null);

      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        setError("Missing authentication token.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await fetchAdminUsers(
          {
            page: targetPage,
            limit: 20,
            search: search.trim() || undefined,
            role: role || undefined,
          },
          token
        );
        setUsers(data.items);
        setPagination(data.pagination);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load user directory from server."
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  React.useEffect(() => {
    loadUsers(page, activeSearch, selectedRole);
  }, [page, activeSearch, selectedRole, loadUsers]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
    setPage(1);
  };

  const handleRoleChange = (role: AdminUserRole | "") => {
    setSelectedRole(role);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
              User Directory
            </h1>
            {!isLoading && (
              <Badge variant="neutral" size="sm">
                {pagination.total} {pagination.total === 1 ? "User" : "Users"}
              </Badge>
            )}
          </div>
          <p className="text-sm text-text-secondary">
            Manage and inspect registered FoodFighter user accounts.
          </p>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadUsers(page, activeSearch, selectedRole)}
            leftIcon={<RefreshCw className="size-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-md items-center gap-2"
        >
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              leftAdornment={<Search className="size-4" />}
              rightAdornment={
                searchInput ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="p-1 text-text-muted hover:text-text-primary"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                ) : undefined
              }
              inputSize="sm"
            />
          </div>
          <Button type="submit" size="sm" variant="secondary">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs font-medium text-text-secondary mr-1">
            Role:
          </span>
          <button
            type="button"
            onClick={() => handleRoleChange("")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedRole === ""
                ? "bg-brand-primary text-white"
                : "bg-surface-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("USER")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedRole === "USER"
                ? "bg-brand-primary text-white"
                : "bg-surface-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            }`}
          >
            USER
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange("ADMIN")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              selectedRole === "ADMIN"
                ? "bg-brand-primary text-white"
                : "bg-surface-subtle text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            }`}
          >
            ADMIN
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
          <Spinner size="lg" variant="primary" />
          <p className="text-sm font-medium text-text-secondary">
            Loading user directory...
          </p>
        </div>
      ) : error ? (
        <div className="space-y-4 max-w-xl">
          <Alert variant="error">
            <AlertTitle>Directory Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadUsers(page, activeSearch, selectedRole)}
            leftIcon={<RefreshCw className="size-4" />}
          >
            Retry
          </Button>
        </div>
      ) : users.length === 0 ? (
        <Card variant="default" className="p-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface-subtle text-text-secondary">
            <Users className="size-6" />
          </div>
          <h3 className="mt-3 text-base font-semibold text-text-primary">
            No users found
          </h3>
          <p className="mt-1 text-sm text-text-secondary max-w-sm mx-auto">
            {activeSearch || selectedRole
              ? "No accounts matched your active search and filter criteria."
              : "No user accounts are currently registered in the database."}
          </p>
          {(activeSearch || selectedRole) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchInput("");
                setActiveSearch("");
                setSelectedRole("");
                setPage(1);
              }}
            >
              Clear filters
            </Button>
          )}
        </Card>
      ) : (
        <div className="space-y-4">
          {/* Desktop & Tablet Table */}
          <div className="hidden sm:block overflow-hidden rounded-lg border border-border bg-surface shadow-xs">
            <table className="min-w-full divide-y divide-border text-left text-sm">
              <thead className="bg-surface-subtle font-semibold text-text-secondary">
                <tr>
                  <th scope="col" className="px-4 py-3.5">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Role
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Email Verification
                  </th>
                  <th scope="col" className="px-4 py-3.5">
                    Registered At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-surface">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-subtle transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-subtle font-semibold text-brand-primary">
                          {user.avatarUrl ? (
                            <img
                              src={user.avatarUrl}
                              alt=""
                              className="size-9 rounded-full object-cover"
                            />
                          ) : (
                            <User className="size-4.5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-text-primary truncate">
                            {user.displayName || "—"}
                          </div>
                          <div className="text-xs text-text-secondary truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge
                        variant={user.role === "ADMIN" ? "brand" : "neutral"}
                        size="sm"
                        className="font-medium"
                      >
                        {user.role === "ADMIN" && (
                          <Shield className="size-3 mr-1" />
                        )}
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {user.emailVerified ? (
                        <Badge variant="success" size="sm" dot>
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="warning" size="sm" dot>
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List (< sm screens) */}
          <div className="grid gap-3 sm:hidden">
            {users.map((user) => (
              <Card key={user.id} variant="default" className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-subtle font-semibold text-brand-primary">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt=""
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <User className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {user.displayName || "—"}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={user.role === "ADMIN" ? "brand" : "neutral"}
                    size="sm"
                  >
                    {user.role}
                  </Badge>
                </div>

                <div className="flex items-center justify-between border-t border-border-subtle pt-2.5 text-xs text-text-secondary">
                  <span>Status:</span>
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1 text-status-success-text font-medium">
                      <CheckCircle2 className="size-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-status-warning-text font-medium">
                      <AlertCircle className="size-3.5" />
                      Unverified
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Joined:</span>
                  <span>
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-4">
            <div className="text-xs text-text-secondary">
              Showing page{" "}
              <strong className="text-text-primary">{pagination.page}</strong> of{" "}
              <strong className="text-text-primary">
                {Math.max(1, pagination.totalPages)}
              </strong>{" "}
              ({pagination.total} total {pagination.total === 1 ? "user" : "users"})
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page <= 1}
                leftIcon={<ChevronLeft className="size-4" />}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={
                  pagination.page >= pagination.totalPages ||
                  pagination.totalPages === 0
                }
                rightIcon={<ChevronRight className="size-4" />}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
