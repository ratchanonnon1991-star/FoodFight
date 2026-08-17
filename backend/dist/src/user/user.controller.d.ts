import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findById(id: string): Promise<{
        id: string;
        displayName: string;
        avatarUrl: string | null;
        role: import("../database/generated/prisma/enums").Role;
        createdAt: Date;
    }>;
    updateMe(currentUser: AccessTokenPayload, dto: UpdateUserDto): Promise<{
        id: string;
        displayName: string;
        email: string;
        avatarUrl: string | null;
        role: import("../database/generated/prisma/enums").Role;
    }>;
    changePassword(currentUser: AccessTokenPayload, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
