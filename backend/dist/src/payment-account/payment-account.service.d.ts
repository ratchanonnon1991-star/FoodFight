import { PrismaService } from '../database/prisma.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { UpsertPaymentAccountDto } from './dto/upsert-payment-account.dto';
export declare class PaymentAccountService {
    private readonly prisma;
    private readonly storage;
    constructor(prisma: PrismaService, storage: LocalStorageService);
    getForUser(userId: string): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    } | null>;
    upsert(userId: string, dto: UpsertPaymentAccountDto): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
    uploadQrImage(userId: string, file: Express.Multer.File): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
    removeQrImage(userId: string): Promise<{
        id: string;
        type: string;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        updatedAt: Date;
    }>;
    private toResponse;
}
