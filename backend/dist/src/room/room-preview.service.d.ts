import { PrismaService } from '../database/prisma.service';
export declare class RoomPreviewService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    private readonly previewRoomSelect;
    private toPreviewResponse;
    private normalizeRoomCode;
}
