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
exports.BillDetailService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const bill_access_service_1 = require("./bill-access.service");
let BillDetailService = class BillDetailService {
    billAccess;
    constructor(billAccess) {
        this.billAccess = billAccess;
    }
    async getDetail(userId, billId) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertParticipant(bill, userId);
        return this.toResponse(bill, userId);
    }
    toResponse(bill, userId) {
        const subtotal = bill.items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        const serviceCharge = bill.serviceCharge != null ? Number(bill.serviceCharge) : 0;
        const tax = bill.tax != null ? Number(bill.tax) : 0;
        const discount = bill.discount != null ? Number(bill.discount) : 0;
        const totalAmount = bill.totalAmount != null
            ? Number(bill.totalAmount)
            : subtotal + serviceCharge + tax - discount;
        const collected = bill.payments
            .filter((payment) => payment.status === client_1.PaymentStatus.PAID)
            .reduce((sum, payment) => sum + Number(payment.amount), 0);
        return {
            id: bill.id,
            status: bill.status,
            closedAt: bill.closedAt,
            summaryCalculated: bill.totalAmount != null,
            isCreator: bill.createdById === userId,
            createdBy: {
                id: bill.createdBy.id,
                displayName: bill.createdBy.displayName,
                avatarUrl: bill.createdBy.avatarUrl,
            },
            meal: {
                name: bill.session.room.name,
                restaurantName: bill.session.restaurantSelection?.name ?? null,
            },
            members: bill.session.members.map((member) => ({
                userId: member.userId,
                displayName: member.user.displayName,
                avatarUrl: member.user.avatarUrl,
                role: member.role,
            })),
            receipt: bill.receipt
                ? {
                    id: bill.receipt.id,
                    imageUrl: bill.receipt.imageUrl,
                    ocrStatus: bill.receipt.ocrStatus,
                    uploadedAt: bill.receipt.uploadedAt,
                }
                : null,
            items: bill.items.map((item) => ({
                id: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
                quantity: item.quantity,
                unitPrice: Number(item.unitPrice),
                totalPrice: Number(item.totalPrice),
                assignedUserIds: item.shares.map((share) => share.userId),
                shares: item.shares.map((share) => ({
                    userId: share.userId,
                    displayName: share.user.displayName,
                    avatarUrl: share.user.avatarUrl,
                    amount: Number(share.amount),
                })),
            })),
            subtotal,
            serviceCharge,
            tax,
            discount,
            totalAmount,
            paymentAccount: bill.createdBy.paymentAccount
                ? {
                    accountName: bill.createdBy.paymentAccount.accountName,
                    promptPayId: bill.createdBy.paymentAccount.promptPayNumber,
                    qrImageUrl: bill.createdBy.paymentAccount.qrCodeUrl,
                }
                : null,
            payments: bill.payments.map((payment) => ({
                userId: payment.userId,
                displayName: payment.user.displayName,
                avatarUrl: payment.user.avatarUrl,
                amount: Number(payment.amount),
                status: payment.status,
                paidAt: payment.paidAt,
                slipImageUrl: payment.slipImageUrl,
            })),
            progress: {
                paidCount: bill.payments.filter((payment) => payment.status === client_1.PaymentStatus.PAID).length,
                totalCount: bill.payments.length,
                collected,
                remaining: Math.max(totalAmount - collected, 0),
            },
        };
    }
};
exports.BillDetailService = BillDetailService;
exports.BillDetailService = BillDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bill_access_service_1.BillAccessService])
], BillDetailService);
//# sourceMappingURL=bill-detail.service.js.map