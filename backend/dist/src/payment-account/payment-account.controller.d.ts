import type { Response } from 'express';
import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
import { PaymentAccountService } from './payment-account.service';
export declare class PaymentAccountController {
    private readonly paymentAccountService;
    constructor(paymentAccountService: PaymentAccountService);
    getMe(currentUser: AccessTokenPayload, res: Response): Promise<void>;
    upsertMe(currentUser: AccessTokenPayload, dto: UpsertPaymentAccountDto): import("../database/generated/prisma/models").Prisma__PaymentAccountClient<{
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
