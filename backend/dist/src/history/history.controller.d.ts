import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { HistoryService } from './history.service';
export declare class HistoryController {
    private readonly historyService;
    constructor(historyService: HistoryService);
    getMe(currentUser: AccessTokenPayload): Promise<{
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
