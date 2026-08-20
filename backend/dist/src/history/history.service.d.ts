import { PrismaService } from '../database/prisma.service';
export declare class HistoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserId(userId: string): Promise<{
        id: string;
        status: string;
        role: import("../database/generated/prisma/enums").SessionMemberRole;
        memberCount: number;
        startedAt: string;
        completedAt: string;
        room: {
            id: string;
            name: string;
            locationName: string;
            scheduledAt: string;
        };
        finalMenu: {
            name: string;
            imageUrl: string | null;
        } | null;
        restaurant: {
            name: string;
            address: string | null;
            imageUrl: string | null;
        } | null;
    }[]>;
}
