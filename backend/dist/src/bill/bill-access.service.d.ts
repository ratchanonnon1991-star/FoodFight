import { Prisma } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
export declare const billInclude: {
    session: {
        include: {
            room: {
                select: {
                    name: true;
                    status: true;
                };
            };
            restaurantSelection: {
                select: {
                    name: true;
                };
            };
            members: {
                select: {
                    userId: true;
                    role: true;
                    user: {
                        select: {
                            displayName: true;
                            avatarUrl: true;
                        };
                    };
                };
            };
        };
    };
    createdBy: {
        select: {
            id: true;
            displayName: true;
            avatarUrl: true;
            paymentAccount: true;
        };
    };
    receipt: true;
    items: {
        orderBy: {
            createdAt: "asc";
        };
        include: {
            shares: {
                include: {
                    user: {
                        select: {
                            id: true;
                            displayName: true;
                            avatarUrl: true;
                        };
                    };
                };
            };
        };
    };
    payments: {
        include: {
            user: {
                select: {
                    id: true;
                    displayName: true;
                    avatarUrl: true;
                };
            };
        };
    };
};
export type BillWithRelations = Prisma.BillGetPayload<{
    include: typeof billInclude;
}>;
export declare class BillAccessService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    loadOrThrow(billId: string): Promise<BillWithRelations>;
    assertParticipant(bill: BillWithRelations, userId: string): void;
    assertCreator(bill: BillWithRelations, userId: string): void;
}
