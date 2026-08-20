import { BillStatus, SessionMemberRole } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { BillDetailService } from './bill-detail.service';
import { CreateBillDto } from './dto/create-bill.dto';
export declare class CreateBillService {
    private readonly prisma;
    private readonly billDetail;
    constructor(prisma: PrismaService, billDetail: BillDetailService);
    listAvailableRooms(userId: string): Promise<{
        roomId: string;
        name: string;
        scheduledAt: Date;
        restaurantName: string | null;
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
        }[];
        billId: string | null;
        billStatus: BillStatus | null;
    }[]>;
    createBill(userId: string, dto: CreateBillDto): Promise<{
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
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: SessionMemberRole;
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
    getBySession(userId: string, sessionId: string): Promise<{
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
        members: {
            userId: string;
            displayName: string;
            avatarUrl: string | null;
            role: SessionMemberRole;
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
}
