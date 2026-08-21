import { API_BASE_URL } from "@/config/api";
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import type { HistoryItem } from "../types/history-types";

export class HistoryApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "HistoryApiError";
  }
}

type ApiErrorBody = {
  message?: string | string[];
};

async function readErrorMessage(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (Array.isArray(body?.message)) {
    return body.message.join(", ");
  }

  return body?.message ?? fallback;
}

export async function getMyHistory(): Promise<HistoryItem[]> {
  const accessToken = getStoredAccessToken();

  let response: Response;

  try {
    const headers: Record<string, string> = { Accept: "application/json" };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    response = await apiFetch(
      `${API_BASE_URL}/history/me`,
      { headers },
      accessToken,
    );
  } catch {
    throw new HistoryApiError("Unable to connect to the server.", 0);
  }

  if (!response.ok) {
    throw new HistoryApiError(
      await readErrorMessage(response, "Unable to load your history."),
      response.status,
    );
  }

  return (await response.json()) as HistoryItem[];
}
