import { BillStatus, PaymentStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { BillAccessService } from './bill-access.service';
import { BillDetailService } from './bill-detail.service';
import { AssignItemDto } from './dto/assign-item.dto';
import { CalculateSummaryDto } from './dto/calculate-summary.dto';
import { SplitEvenlyDto } from './dto/split-evenly.dto';
export declare class SplitService {
    private readonly prisma;
    private readonly billAccess;
    private readonly billDetail;
    constructor(prisma: PrismaService, billAccess: BillAccessService, billDetail: BillDetailService);
    assignItem(userId: string, billId: string, itemId: string, dto: AssignItemDto): Promise<{
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
    splitEvenly(userId: string, billId: string, dto: SplitEvenlyDto): Promise<{
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
    calculateSummary(userId: string, billId: string, dto: CalculateSummaryDto): Promise<{
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
    confirmBill(userId: string, billId: string): Promise<{
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
    private assertReadyToCalculate;
}
