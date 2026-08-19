import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
import { PaymentAccountService } from './payment-account.service';
export declare class PaymentAccountController {
    private readonly paymentAccountService;
    constructor(paymentAccountService: PaymentAccountService);
    getMyAccount(currentUser: AccessTokenPayload): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    } | null>;
    upsertMyAccount(currentUser: AccessTokenPayload, dto: UpsertPaymentAccountDto): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
    uploadQrImage(currentUser: AccessTokenPayload, file: Express.Multer.File): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
    removeQrImage(currentUser: AccessTokenPayload): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
}
