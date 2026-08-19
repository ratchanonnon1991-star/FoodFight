import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../database/generated/prisma/client';
export declare class PasswordResetService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findLatestActive(userId: string): Prisma.Prisma__PasswordResetClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        tokenHash: string;
        used: boolean;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    create(userId: string, tokenHash: string): Prisma.Prisma__PasswordResetClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        tokenHash: string;
        used: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markUsed(id: string, tx?: Prisma.TransactionClient): Prisma.Prisma__PasswordResetClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        tokenHash: string;
        used: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
}
