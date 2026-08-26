import { BillStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
export declare class BillListService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listPending(userId: string): Promise<{
        id: string;
        status: BillStatus;
        title: string;
        restaurantName: string | null;
        createdByName: string;
        isCreator: boolean;
        receiptUploaded: boolean;
        itemCount: number;
        unassignedItemCount: number;
        totalAmount: number | null;
        paymentProgress: {
            paidCount: number;
            totalCount: number;
        };
        nextStep: "PAYMENT" | "RECEIPT" | "SPLIT" | "SUMMARY";
        continueHref: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    private getNextStep;
    private getContinueHref;
}
