import { PrismaService } from '../database/prisma.service';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
export declare class PaymentAccountService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly paymentAccountSelect;
    findByUserId(userId: string): import("../database/generated/prisma/models").Prisma__PaymentAccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        paymentType: string;
        accountName: string;
        promptPayNumber: string;
        qrCodeUrl: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../database/generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    upsert(userId: string, dto: UpsertPaymentAccountDto): import("../database/generated/prisma/models").Prisma__PaymentAccountClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        paymentType: string;
        accountName: string;
        promptPayNumber: string;
        qrCodeUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../database/generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
