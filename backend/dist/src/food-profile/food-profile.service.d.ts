import { PrismaService } from '../database/prisma.service';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';
export declare class FoodProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly foodProfileSelect;
    findByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        allergies: string[];
        otherAllergies: string | null;
        restrictions: string[];
        otherRestrictions: string | null;
        additionalNotes: string | null;
    }>;
    upsert(userId: string, dto: UpsertFoodProfileDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        allergies: string[];
        otherAllergies: string | null;
        restrictions: string[];
        otherRestrictions: string | null;
        additionalNotes: string | null;
    }>;
    private normalizeOptionalString;
}
