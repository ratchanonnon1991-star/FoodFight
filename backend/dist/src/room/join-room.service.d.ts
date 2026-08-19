import { ConfigService } from '@nestjs/config';
import { RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRealtimeService } from './room-realtime.service';
export declare class JoinRoomService {
    private readonly prisma;
    private readonly configService;
    private readonly roomRealtimeService;
    constructor(prisma: PrismaService, configService: ConfigService, roomRealtimeService: RoomRealtimeService);
    joinRoom(roomId: string, userId: string): Promise<{
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
            status: RoomStatus;
            roomCode: string;
        };
    }>;
    getRoom(roomId: string, userId: string): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    getCurrentRoom(userId: string): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    } | null>;
    updateRoom(roomId: string, userId: string, dto: UpdateRoomDto): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    closeRoom(roomId: string, userId: string): Promise<{
        message: string;
    }>;
    setReady(roomId: string, userId: string, isReady: boolean): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    startRoom(roomId: string, userId: string): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    leaveRoom(roomId: string, userId: string): Promise<{
        message: string;
    }>;
    transferHost(roomId: string, currentUserId: string, memberId: string): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    kickMember(roomId: string, currentUserId: string, memberId: string): Promise<{
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
        status: RoomStatus;
        roomCode: string;
    }>;
    private readonly lobbyRoomSelect;
    private toLobbyResponse;
    private buildInviteLink;
    private isPrismaError;
}
