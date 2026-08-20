export type RoomStatus = "LOBBY" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface RoomHost {
  displayName: string;
  avatarUrl: string | null;
}

export interface RoomMember {
  id: string;
  userId: string;
  displayName: string;
  avatarUrl: string | null;
  isReady: boolean;
  joinedAt: string;
}

export interface RoomBase {
  id: string;
  name: string;
  host: RoomHost;
  memberCount: number;
  maxMembers: number;
  locationName: string;
  latitude?: number | null;
  longitude?: number | null;
  searchRadiusKm: number;
  scheduledAt: string;
  status: RoomStatus;
}

export interface RoomCreated extends RoomBase {
  roomCode: string;
  inviteToken: string;
  inviteLink: string;
}

export type RoomPreview = RoomBase;

export interface RoomLobby extends RoomBase {
  roomCode: string;
  inviteToken?: string;
  inviteLink?: string;
  members: RoomMember[];
}

export interface CurrentRoom {
  id: string;
  name: string;
  status: Extract<RoomStatus, "LOBBY" | "IN_PROGRESS">;
  statusDescription: string;
  memberCount: number;
  members: string[];
}

export interface CreateRoomInput {
  name: string;
  maxMembers: number;
  locationName: string;
  latitude?: number;
  longitude?: number;
  searchRadiusKm: 1 | 3 | 5 | 10;
  scheduledAt: string;
}
