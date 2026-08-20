import { API_BASE_URL } from "@/config/api";
import { apiFetch } from "@/config/api-client";

export interface CurrentUserProfile {
  sub: string;
  email: string;
  role: string;
  displayName: string;
  avatarUrl: string | null;
}

export interface UpdateUserProfileInput {
  displayName: string;
  avatarUrl: string | null;
}

async function readError(response: Response, fallback: string): Promise<string> {
  const data = (await response.json().catch(() => null)) as {
    message?: string | string[];
  } | null;

  if (Array.isArray(data?.message)) {
    return data.message.join(", ");
  }

  return data?.message ?? fallback;
}

export async function getCurrentUserProfile(
  token: string,
): Promise<CurrentUserProfile> {
  const response = await apiFetch(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }, token);

  if (!response.ok) {
    throw new Error(await readError(response, "Unable to load your profile."));
  }

  return (await response.json()) as CurrentUserProfile;
}

export async function updateCurrentUserProfile(
  token: string,
  input: UpdateUserProfileInput,
): Promise<CurrentUserProfile> {
  const response = await apiFetch(`${API_BASE_URL}/user/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  }, token);

  if (!response.ok) {
    throw new Error(await readError(response, "Unable to update your profile."));
  }

  const updatedUser = (await response.json()) as {
    id: string;
    email: string;
    role: string;
    displayName: string;
    avatarUrl: string | null;
  };

  return {
    sub: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role,
    displayName: updatedUser.displayName,
    avatarUrl: updatedUser.avatarUrl,
  };
}
