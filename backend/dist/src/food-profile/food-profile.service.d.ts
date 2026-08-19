import { PrismaService } from '../database/prisma.service';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';
export declare class FoodProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly foodProfileSelect;
    findByUserId(userId: string): Promise<{
        allergies: string[];
        otherAllergies: string | null;
        restrictions: string[];
        otherRestrictions: string | null;
        additionalNotes: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    upsert(userId: string, dto: UpsertFoodProfileDto): Promise<{
        allergies: string[];
        otherAllergies: string | null;
        restrictions: string[];
        otherRestrictions: string | null;
        additionalNotes: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private normalizeOptionalString;
}
