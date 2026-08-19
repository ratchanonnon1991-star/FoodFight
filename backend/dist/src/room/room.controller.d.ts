import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { CreateRoomService } from './create-room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomService } from './join-room.service';
import { RoomPreviewService } from './room-preview.service';
export declare class RoomController {
    private readonly createRoomService;
    private readonly joinRoomService;
    private readonly roomPreviewService;
    constructor(createRoomService: CreateRoomService, joinRoomService: JoinRoomService, roomPreviewService: RoomPreviewService);
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
    getRoom(roomId: string, currentUser: AccessTokenPayload): Promise<{
        inviteToken?: string | undefined;
        inviteLink?: string | undefined;
        id: string;
        name: string;
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
}
