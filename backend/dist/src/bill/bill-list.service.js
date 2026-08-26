"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillListService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
let BillListService = class BillListService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listPending(userId) {
        const bills = await this.prisma.bill.findMany({
            where: {
                status: {
                    in: [client_1.BillStatus.DRAFT, client_1.BillStatus.SPLITTING, client_1.BillStatus.COMPLETED],
                },
                session: {
                    room: { status: { not: client_1.RoomStatus.CANCELLED } },
                    members: { some: { userId } },
                },
            },
            select: {
                id: true,
                status: true,
                createdById: true,
                totalAmount: true,
                createdAt: true,
                updatedAt: true,
                session: {
                    select: {
                        room: { select: { name: true } },
                        restaurantSelection: { select: { name: true } },
                    },
                },
                createdBy: { select: { displayName: true } },
                receipt: { select: { id: true } },
                items: {
                    select: {
                        shares: { select: { userId: true } },
                    },
                },
                payments: {
                    select: { status: true },
                },
            },
            orderBy: { updatedAt: 'desc' },
        });
        return bills.map((bill) => {
            const unassignedItemCount = bill.items.filter((item) => item.shares.length === 0).length;
            const paidPaymentCount = bill.payments.filter((payment) => payment.status === client_1.PaymentStatus.PAID).length;
            const nextStep = this.getNextStep(bill.status, bill.items.length, unassignedItemCount);
            return {
                id: bill.id,
                status: bill.status,
                title: bill.session.room.name,
                restaurantName: bill.session.restaurantSelection?.name ?? null,
                createdByName: bill.createdBy.displayName,
                isCreator: bill.createdById === userId,
                receiptUploaded: Boolean(bill.receipt),
                itemCount: bill.items.length,
                unassignedItemCount,
                totalAmount: bill.totalAmount != null ? Number(bill.totalAmount) : null,
                paymentProgress: {
                    paidCount: paidPaymentCount,
                    totalCount: bill.payments.length,
                },
                nextStep,
                continueHref: this.getContinueHref(bill.id, nextStep),
                createdAt: bill.createdAt,
                updatedAt: bill.updatedAt,
            };
        });
    }
    getNextStep(status, itemCount, unassignedItemCount) {
        if (status === client_1.BillStatus.COMPLETED) {
            return 'PAYMENT';
        }
        if (itemCount === 0) {
            return 'RECEIPT';
        }
        if (unassignedItemCount > 0) {
            return 'SPLIT';
        }
        return 'SUMMARY';
    }
    getContinueHref(billId, nextStep) {
        if (nextStep === 'RECEIPT') {
            return `/bills/${billId}/receipt`;
        }
        if (nextStep === 'SPLIT') {
            return `/bills/${billId}/split`;
        }
        if (nextStep === 'SUMMARY') {
            return `/bills/${billId}/summary`;
        }
        return `/bills/${billId}`;
    }
};
exports.BillListService = BillListService;
exports.BillListService = BillListService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillListService);
//# sourceMappingURL=bill-list.service.js.map