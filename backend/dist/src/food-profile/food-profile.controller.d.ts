import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';
import { FoodProfileService } from './food-profile.service';
export declare class FoodProfileController {
    private readonly foodProfileService;
    constructor(foodProfileService: FoodProfileService);
    getMe(currentUser: AccessTokenPayload): Promise<{
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
    upsertMe(currentUser: AccessTokenPayload, dto: UpsertFoodProfileDto): Promise<{
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
}
