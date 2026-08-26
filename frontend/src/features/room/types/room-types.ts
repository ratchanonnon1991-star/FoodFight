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
  isHost: boolean;
  currentMember: {
    id: string;
    isReady: boolean;
  } | null;
  inviteToken?: string;
  inviteLink?: string;
  members: RoomMember[];
}

export type LocationProviderId = "osm-photon" | "google-maps";

export type LocationSelectionSource = "search" | "map" | "current";

export interface LocationSearchSuggestion {
  locationName: string;
  latitude: number;
  longitude: number;
  provider?: LocationProviderId;
  providerPlaceId?: string | null;
}

export interface LocationSelection extends LocationSearchSuggestion {
  source: LocationSelectionSource;
}

export interface CreateRoomInput {
  name: string;
  maxMembers: number;
  locationName: string;
  latitude?: number | null;
  longitude?: number | null;
  searchRadiusKm: 1 | 3 | 5 | 10;
  scheduledAt: string;
}

export type UpdateRoomInput = Partial<CreateRoomInput>;
