import { Observable } from 'rxjs';
import type { MessageEvent } from '@nestjs/common';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { CreateRoomService } from './create-room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomService } from './join-room.service';
import { LocationSearchService } from './location-search.service';
import { RoomPreviewService } from './room-preview.service';
import { RoomRealtimeService } from './room-realtime.service';
import { SetReadyDto } from './dto/set-ready.dto';
import { TransferHostDto } from './dto/transfer-host.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomController {
    private readonly createRoomService;
    private readonly joinRoomService;
    private readonly locationSearchService;
    private readonly roomPreviewService;
    private readonly roomRealtimeService;
    constructor(createRoomService: CreateRoomService, joinRoomService: JoinRoomService, locationSearchService: LocationSearchService, roomPreviewService: RoomPreviewService, roomRealtimeService: RoomRealtimeService);
    createRoom(currentUser: AccessTokenPayload, dto: CreateRoomDto): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        latitude: number | null;
        longitude: number | null;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
        inviteToken: string;
        inviteLink: string;
    }>;
    findRoomByCode(roomCode: string): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
    }>;
    findRoomByInviteToken(inviteToken: string): Promise<{
        id: string;
        name: string;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
    }>;
    searchLocations(query?: string, latitude?: string, longitude?: string): Promise<import("./location-search.service").LocationSearchResult[]>;
    reverseLocation(latitude?: string, longitude?: string): Promise<import("./location-search.service").LocationSearchResult>;
    getCurrentRoom(currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    } | null>;
    updateRoom(roomId: string, dto: UpdateRoomDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    closeRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
    }>;
    roomEvents(roomId: string, currentUser: AccessTokenPayload): Observable<MessageEvent>;
    getRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    joinRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
        member: {
            id: string;
            roomId: string;
            userId: string;
            isReady: boolean;
            joinedAt: Date;
        };
        room: {
            inviteToken?: string | undefined;
            inviteLink?: string | undefined;
            id: string;
            name: string;
            isHost: boolean;
            currentMember: {
                id: string;
                isReady: boolean;
            } | null;
            host: {
                displayName: string;
                avatarUrl: string | null;
            };
            members: {
                id: string;
                userId: string;
                displayName: string;
                avatarUrl: string | null;
                isReady: boolean;
                joinedAt: Date;
            }[];
            memberCount: number;
            maxMembers: number;
            locationName: string;
            searchRadiusKm: number;
            scheduledAt: Date;
            status: import("../database/generated/prisma/enums").RoomStatus;
            roomCode: string;
        };
    }>;
    setReady(roomId: string, dto: SetReadyDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    startRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    leaveRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        message: string;
    }>;
    transferHost(roomId: string, dto: TransferHostDto, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
    kickMember(roomId: string, memberId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
        isHost: boolean;
        currentMember: {
            id: string;
            isReady: boolean;
        } | null;
        host: {
            displayName: string;
            avatarUrl: string | null;
        };
        members: {
            id: string;
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            isReady: boolean;
            joinedAt: Date;
        }[];
        memberCount: number;
        maxMembers: number;
        locationName: string;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: import("../database/generated/prisma/enums").RoomStatus;
        roomCode: string;
    }>;
}
