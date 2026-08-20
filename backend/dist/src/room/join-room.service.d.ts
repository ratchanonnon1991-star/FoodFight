import { ConfigService } from '@nestjs/config';
import { RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
export declare class JoinRoomService {
    private readonly prisma;
    private readonly configService;
    constructor(prisma: PrismaService, configService: ConfigService);
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
        id: string;
        name: string;
        status: RoomStatus;
        statusDescription: string;
        memberCount: number;
        members: string[];
    } | null>;
    private readonly lobbyRoomSelect;
    private readonly currentRoomSelect;
    private toLobbyResponse;
    private buildInviteLink;
    private isPrismaError;
}
