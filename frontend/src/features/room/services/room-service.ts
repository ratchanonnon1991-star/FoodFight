import type {
  CreateRoomInput,
  RoomCreated,
  CurrentRoom,
  RoomLobby,
  RoomPreview,
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
      await readErrorMessage(response, "The room request could not be completed."),
      response.status,
    );
  }

  return (await response.json()) as T;
}

export const roomService = {
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
    return request<RoomPreview>(`/rooms/invite/${encodeURIComponent(inviteToken)}`);
  },

  getRoom(roomId: string) {
    return request<RoomLobby>(`/rooms/${encodeURIComponent(roomId)}`, {}, true);
  },

  getCurrentRoom() {
    return request<CurrentRoom | null>("/rooms/me/current", {}, true);
  },

  joinRoom(roomId: string) {
    return request<{ message: string; member: unknown; room: RoomLobby }>(
      `/rooms/${encodeURIComponent(roomId)}/join`,
      { method: "POST" },
      true,
    );
  },
};
