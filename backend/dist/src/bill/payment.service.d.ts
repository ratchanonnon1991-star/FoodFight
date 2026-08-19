import { BillStatus, PaymentStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { PromptPayService } from '../infrastructure/promptpay/promptpay.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { SetPaymentStatusDto } from './dto/set-payment-status.dto';
export declare class PaymentService {
    private readonly prisma;
    private readonly storage;
    private readonly promptPay;
    private readonly billAccess;
    private readonly billDetail;
    constructor(prisma: PrismaService, storage: LocalStorageService, promptPay: PromptPayService, billAccess: BillAccessService, billDetail: BillDetailService);
    getQrForMember(userId: string, billId: string, targetUserId: string): Promise<{
        qrDataUrl: string;
        amount: number;
        accountName: string;
    }>;
    uploadSlip(userId: string, billId: string, targetUserId: string, file: Express.Multer.File): Promise<{
        id: string;
        status: BillStatus;
        summaryCalculated: boolean;
        isCreator: boolean;
        createdBy: {
            id: string;
            displayName: string;
            avatarUrl: string | null;
        };
        meal: {
            name: string;
            restaurantName: string | null;
        };
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: import("../database/generated/prisma/enums").OcrStatus;
            uploadedAt: Date;
        } | null;
        items: {
            id: string;
            name: string;
            imageUrl: string | null;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
            assignedUserIds: string[];
            shares: {
                userId: string;
                displayName: string;
                avatarUrl: string | null;
                amount: number;
            }[];
        }[];
        subtotal: number;
        serviceCharge: number;
        tax: number;
        discount: number;
        totalAmount: number;
        paymentAccount: {
            accountName: string;
            promptPayId: string;
            qrImageUrl: string | null;
        } | null;
        payments: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            amount: number;
            status: PaymentStatus;
            paidAt: Date | null;
            slipImageUrl: string | null;
        }[];
        progress: {
            paidCount: number;
            totalCount: number;
            collected: number;
            remaining: number;
        };
    }>;
    setStatus(userId: string, billId: string, targetUserId: string, dto: SetPaymentStatusDto): Promise<{
        id: string;
        status: BillStatus;
        summaryCalculated: boolean;
        isCreator: boolean;
        createdBy: {
            id: string;
            displayName: string;
            avatarUrl: string | null;
        };
        meal: {
            name: string;
            restaurantName: string | null;
        };
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: import("../database/generated/prisma/enums").OcrStatus;
            uploadedAt: Date;
        } | null;
        items: {
            id: string;
            name: string;
            imageUrl: string | null;
            quantity: number;
            unitPrice: number;
            totalPrice: number;
            assignedUserIds: string[];
            shares: {
                userId: string;
                displayName: string;
                avatarUrl: string | null;
                amount: number;
            }[];
        }[];
        subtotal: number;
        serviceCharge: number;
        tax: number;
        discount: number;
        totalAmount: number;
        paymentAccount: {
            accountName: string;
            promptPayId: string;
            qrImageUrl: string | null;
        } | null;
        payments: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            amount: number;
            status: PaymentStatus;
            paidAt: Date | null;
            slipImageUrl: string | null;
        }[];
        progress: {
            paidCount: number;
            totalCount: number;
            collected: number;
            remaining: number;
        };
    }>;
}
