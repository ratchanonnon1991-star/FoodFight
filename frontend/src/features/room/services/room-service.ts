import type {
  CreateRoomInput,
  LocationSearchSuggestion,
  RoomCreated,
  CurrentRoom,
  RoomLobby,
  RoomPreview,
  UpdateRoomInput,
} from "../types/room-types";
import { apiFetch } from "@/config/api-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";

export class RoomApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "RoomApiError";
  }
}

type ApiErrorBody = {
  message?: string | string[];
};

type RoomRealtimeEvent = {
  type: "room-updated";
  roomId: string;
};

async function readErrorMessage(response: Response, fallback: string) {
  const body = (await response.json().catch(() => null)) as ApiErrorBody | null;

  if (Array.isArray(body?.message)) {
    return body.message.join(", ");
  }

  return body?.message ?? fallback;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");

  let response: Response;

  try {
    response = authenticated
      ? await apiFetch(`${API_URL}${path}`, { ...init, headers })
      : await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new RoomApiError("Unable to connect to the server.", 0);
  }

  if (!response.ok) {
    throw new RoomApiError(
      await readErrorMessage(
        response,
        "The room request could not be completed.",
      ),
      response.status,
    );
  }

  return (await response.json()) as T;
}

export async function subscribeToRoomEvents(
  roomId: string,
  onRoomUpdated: (roomId: string) => void,
  signal: AbortSignal,
) {
  const accessToken = window.localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new RoomApiError("Please log in to continue.", 401);
  }

  const response = await fetch(
    `${API_URL}/rooms/${encodeURIComponent(roomId)}/events`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal,
    },
  );

  if (!response.ok) {
    throw new RoomApiError(
      await readErrorMessage(response, "Unable to subscribe to room updates."),
      response.status,
    );
  }

  if (!response.body) {
    throw new RoomApiError(
      "Room updates are not supported by this browser.",
      0,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const processMessage = (message: string) => {
    const data = message
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trim())
      .join("\n");

    if (!data) {
      return;
    }

    try {
      const event = JSON.parse(data) as RoomRealtimeEvent;

      if (event.type === "room-updated" && event.roomId === roomId) {
        onRoomUpdated(event.roomId);
      }
    } catch {
      // Ignore malformed SSE frames and keep the stream alive.
    }
  };

  while (!signal.aborted) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const messages = buffer.split(/\r?\n\r?\n/);
    buffer = messages.pop() ?? "";

    for (const message of messages) {
      processMessage(message);
    }
  }

  if (buffer.trim()) {
    processMessage(buffer);
  }
}

export const roomService = {
  searchLocations(
    query: string,
    options: {
      signal?: AbortSignal;
      latitude?: number | null;
      longitude?: number | null;
    } = {},
  ) {
    const params = new URLSearchParams({ q: query.trim() });

    if (
      typeof options.latitude === "number" &&
      typeof options.longitude === "number"
    ) {
      params.set("lat", String(options.latitude));
      params.set("lon", String(options.longitude));
    }

    return request<LocationSearchSuggestion[]>(
      `/rooms/location-search?${params.toString()}`,
      { signal: options.signal },
    );
  },

  reverseLocation(latitude: number, longitude: number, signal?: AbortSignal) {
    return request<LocationSearchSuggestion>(
      `/rooms/location-reverse?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`,
      { signal },
    );
  },

  createRoom(input: CreateRoomInput) {
    return request<RoomCreated>(
      "/rooms",
      {
        method: "POST",
        body: JSON.stringify(input),
      },
      true,
    );
  },

  findRoomByCode(roomCode: string) {
    return request<RoomPreview>(`/rooms/code/${encodeURIComponent(roomCode)}`);
  },

  findRoomByInviteToken(inviteToken: string) {
    return request<RoomPreview>(
      `/rooms/invite/${encodeURIComponent(inviteToken)}`,
    );
  },

  getRoom(roomId: string) {
    return request<RoomLobby>(`/rooms/${encodeURIComponent(roomId)}`, {}, true);
  },

  getCurrentRoom() {
    return request<RoomLobby | null>("/rooms/current", {}, true);
  },

  updateRoom(roomId: string, input: UpdateRoomInput) {
    return request<RoomLobby>(
      `/rooms/${encodeURIComponent(roomId)}`,
      {
        method: "PATCH",
        body: JSON.stringify(input),
      },
      true,
    );
  },

  closeRoom(roomId: string) {
    return request<{ message: string }>(
      `/rooms/${encodeURIComponent(roomId)}`,
      { method: "DELETE" },
      true,
    );
  },

  joinRoom(roomId: string) {
    return request<{ message: string; member: unknown; room: RoomLobby }>(
      `/rooms/${encodeURIComponent(roomId)}/join`,
      { method: "POST" },
      true,
    );
  },

  setReady(roomId: string, isReady: boolean) {
    return request<RoomLobby>(
      `/rooms/${encodeURIComponent(roomId)}/ready`,
      {
        method: "PATCH",
        body: JSON.stringify({ isReady }),
      },
      true,
    );
  },

  startRoom(roomId: string) {
    return request<RoomLobby>(
      `/rooms/${encodeURIComponent(roomId)}/start`,
      { method: "POST" },
      true,
    );
  },

  leaveRoom(roomId: string) {
    return request<{ message: string }>(
      `/rooms/${encodeURIComponent(roomId)}/leave`,
      { method: "DELETE" },
      true,
    );
  },

  transferHost(roomId: string, memberId: string) {
    return request<RoomLobby>(
      `/rooms/${encodeURIComponent(roomId)}/transfer-host`,
      {
        method: "POST",
        body: JSON.stringify({ memberId }),
      },
      true,
    );
  },

  kickMember(roomId: string, memberId: string) {
    return request<RoomLobby>(
      `/rooms/${encodeURIComponent(roomId)}/members/${encodeURIComponent(memberId)}`,
      { method: "DELETE" },
      true,
    );
  },
};
