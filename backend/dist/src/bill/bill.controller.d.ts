import type { AccessTokenPayload } from '../infrastructure/jwt/types/jwt-payload';
import { BillDetailService } from './bill-detail.service';
import { CreateBillService } from './create-bill.service';
import { AssignItemDto } from './dto/assign-item.dto';
import { CalculateSummaryDto } from './dto/calculate-summary.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { SetPaymentStatusDto } from './dto/set-payment-status.dto';
import { UpsertReceiptItemDto } from './dto/upsert-receipt-item.dto';
import { PaymentService } from './payment.service';
import { ReceiptService } from './receipt.service';
import { SplitService } from './split.service';
export declare class BillController {
    private readonly createBillService;
    private readonly billDetailService;
    private readonly receiptService;
    private readonly splitService;
    private readonly paymentService;
    constructor(createBillService: CreateBillService, billDetailService: BillDetailService, receiptService: ReceiptService, splitService: SplitService, paymentService: PaymentService);
    listAvailableRooms(currentUser: AccessTokenPayload): Promise<{
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
        billStatus: import("../database/generated/prisma/enums").BillStatus | null;
    }[]>;
    createBill(currentUser: AccessTokenPayload, dto: CreateBillDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    getBySession(currentUser: AccessTokenPayload, sessionId: string): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    getBill(currentUser: AccessTokenPayload, billId: string): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    uploadReceipt(currentUser: AccessTokenPayload, billId: string, file: Express.Multer.File): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    addItem(currentUser: AccessTokenPayload, billId: string, dto: UpsertReceiptItemDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    updateItem(currentUser: AccessTokenPayload, billId: string, itemId: string, dto: UpsertReceiptItemDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    deleteItem(currentUser: AccessTokenPayload, billId: string, itemId: string): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    assignItem(currentUser: AccessTokenPayload, billId: string, itemId: string, dto: AssignItemDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    calculateSummary(currentUser: AccessTokenPayload, billId: string, dto: CalculateSummaryDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    confirmBill(currentUser: AccessTokenPayload, billId: string): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    getPaymentQr(currentUser: AccessTokenPayload, billId: string, targetUserId: string): Promise<{
        qrDataUrl: string;
        amount: number;
        accountName: string;
    }>;
    uploadSlip(currentUser: AccessTokenPayload, billId: string, targetUserId: string, file: Express.Multer.File): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
    setPaymentStatus(currentUser: AccessTokenPayload, billId: string, targetUserId: string, dto: SetPaymentStatusDto): Promise<{
        id: string;
        status: import("../database/generated/prisma/enums").BillStatus;
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
