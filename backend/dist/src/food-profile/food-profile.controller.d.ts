import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertFoodProfileDto } from './dto/upsert-food-profile.dto';
import { FoodProfileService } from './food-profile.service';
export declare class FoodProfileController {
    private readonly foodProfileService;
    constructor(foodProfileService: FoodProfileService);
    getMe(currentUser: AccessTokenPayload): Promise<{
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
    upsertMe(currentUser: AccessTokenPayload, dto: UpsertFoodProfileDto): Promise<{
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
}
