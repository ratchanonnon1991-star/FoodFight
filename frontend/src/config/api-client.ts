import { API_BASE_URL } from "./api";

type RefreshResponse = {
  accessToken?: string;
};

let refreshInFlight: Promise<string | null> | null = null;
const API_REQUEST_TIMEOUT_MS = 3_000;

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    API_REQUEST_TIMEOUT_MS,
  );

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("accessToken");
}

export async function refreshAccessToken(): Promise<string | null> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  refreshInFlight = (async () => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        window.localStorage.removeItem("accessToken");
        return null;
      }

      const data = (await response.json()) as RefreshResponse;

      if (!data.accessToken) {
        window.localStorage.removeItem("accessToken");
        return null;
      }

      window.localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      refreshInFlight = null;
    }
  })();

  return refreshInFlight;
}

function isRefreshRequest(input: RequestInfo | URL) {
  return String(input).includes("/auth/refresh");
}

export async function apiFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
  accessToken?: string | null,
): Promise<Response> {
  const headers = new Headers(init.headers);
  const token = accessToken ?? getStoredAccessToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const requestInit: RequestInit = {
    ...init,
    headers,
    credentials: init.credentials ?? "include",
  };
  const response = await fetchWithTimeout(input, requestInit);

  if (response.status !== 401 || isRefreshRequest(input)) {
    return response;
  }

  const nextAccessToken = await refreshAccessToken();

  if (!nextAccessToken) {
    return response;
  }

  const retryHeaders = new Headers(init.headers);
  retryHeaders.set("Authorization", `Bearer ${nextAccessToken}`);

  return fetchWithTimeout(input, {
    ...init,
    headers: retryHeaders,
    credentials: init.credentials ?? "include",
  });
}
