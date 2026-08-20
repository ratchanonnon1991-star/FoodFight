import { PrismaService } from '../database/prisma.service';
import { BcryptService } from '../infrastructure/hash/bcrypt.service';
import { AuthProvider } from '../database/generated/prisma/enums';
import { Prisma, User } from '../database/generated/prisma/client';
export type CreateUserInput = {
    displayName: string;
    email: string;
    passwordHash: string;
};
export type CreateUserWithAccountInput = {
    displayName: string;
    email: string;
    provider: AuthProvider;
    providerAccountId: string;
    avatarUrl?: string;
};
export declare class UserService {
    private readonly prisma;
    private readonly bcryptService;
    constructor(prisma: PrismaService, bcryptService: BcryptService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: CreateUserInput): Promise<User>;
    findUserByProviderAccount(provider: AuthProvider, providerAccountId: string): Promise<User | null>;
    linkAccount(userId: string, provider: AuthProvider, providerAccountId: string): Prisma.Prisma__AccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        provider: AuthProvider;
        providerAccountId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createUserWithAccount(data: CreateUserWithAccountInput): Promise<User>;
    updateAvatarUrl(userId: string, avatarUrl: string): Promise<User>;
    updateDisplayName(userId: string, displayName: string): Promise<User>;
    updatePassword(userId: string, password: string, tx?: Prisma.TransactionClient): Promise<User>;
    getPublicProfile(id: string): Promise<{
        id: string;
        displayName: string;
        avatarUrl: string | null;
        role: import("../database/generated/prisma/enums").Role;
        createdAt: Date;
    }>;
    updateMe(userId: string, displayName: string, avatarUrl?: string | null): Promise<{
        id: string;
        displayName: string;
        email: string;
        avatarUrl: string | null;
        role: import("../database/generated/prisma/enums").Role;
    }>;
}
