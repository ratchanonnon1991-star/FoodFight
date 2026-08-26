import { BillStatus, OcrStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ReceiptOcrService } from '../infrastructure/ocr/receipt-ocr.service';
import { LocalStorageService } from '../infrastructure/storage/local-storage.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { UpsertReceiptItemDto } from './dto/upsert-receipt-item.dto';
export declare class ReceiptService {
    private readonly prisma;
    private readonly storage;
    private readonly ocr;
    private readonly billAccess;
    private readonly billDetail;
    constructor(prisma: PrismaService, storage: LocalStorageService, ocr: ReceiptOcrService, billAccess: BillAccessService, billDetail: BillDetailService);
    uploadReceipt(userId: string, billId: string, file: Express.Multer.File): Promise<{
        id: string;
        status: BillStatus;
        closedAt: Date | null;
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
        roomStatus: import("../database/generated/prisma/enums").RoomStatus;
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: OcrStatus;
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
            status: import("../database/generated/prisma/enums").PaymentStatus;
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
    addItem(userId: string, billId: string, dto: UpsertReceiptItemDto): Promise<{
        id: string;
        status: BillStatus;
        closedAt: Date | null;
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
        roomStatus: import("../database/generated/prisma/enums").RoomStatus;
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: OcrStatus;
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
            status: import("../database/generated/prisma/enums").PaymentStatus;
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
    updateItem(userId: string, billId: string, itemId: string, dto: UpsertReceiptItemDto): Promise<{
        id: string;
        status: BillStatus;
        closedAt: Date | null;
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
        roomStatus: import("../database/generated/prisma/enums").RoomStatus;
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: OcrStatus;
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
            status: import("../database/generated/prisma/enums").PaymentStatus;
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
    deleteItem(userId: string, billId: string, itemId: string): Promise<{
        id: string;
        status: BillStatus;
        closedAt: Date | null;
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
        roomStatus: import("../database/generated/prisma/enums").RoomStatus;
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: import("../database/generated/prisma/enums").SessionMemberRole;
        }[];
        receipt: {
            id: string;
            imageUrl: string;
            ocrStatus: OcrStatus;
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
            status: import("../database/generated/prisma/enums").PaymentStatus;
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
    private assertEditable;
}
