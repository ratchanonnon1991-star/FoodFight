export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type ApiErrorResponse = {
  message?: string | string[];
};

async function readErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  const data = (await response.json().catch(() => null)) as ApiErrorResponse | null;

  if (Array.isArray(data?.message)) {
    return data.message.join(", ");
  }

  return data?.message ?? fallback;
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const accessToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null;
  const isFormData = init.body instanceof FormData;

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...init.headers,
      },
    });
  } catch (err) {
    throw new ApiError(
      err instanceof Error ? err.message : "Network request failed.",
      0,
    );
  }

  if (!response.ok) {
    const message = await readErrorMessage(
      response,
      "Something went wrong. Please try again.",
    );
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/** Resolves an `/uploads/...` path returned by the API into an absolute URL. */
export function resolveMediaUrl(path: string | null | undefined): string | null {
  if (!path) {
    return null;
  }

  return path.startsWith("http") ? path : `${API_URL}${path}`;
}
