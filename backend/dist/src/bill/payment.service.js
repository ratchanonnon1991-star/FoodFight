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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const promptpay_service_1 = require("../infrastructure/promptpay/promptpay.service");
const local_storage_service_1 = require("../infrastructure/storage/local-storage.service");
const bill_access_service_1 = require("./bill-access.service");
const bill_detail_service_1 = require("./bill-detail.service");
let PaymentService = class PaymentService {
    prisma;
    storage;
    promptPay;
    billAccess;
    billDetail;
    constructor(prisma, storage, promptPay, billAccess, billDetail) {
        this.prisma = prisma;
        this.storage = storage;
        this.promptPay = promptPay;
        this.billAccess = billAccess;
        this.billDetail = billDetail;
    }
    async getQrForMember(userId, billId, targetUserId) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertParticipant(bill, userId);
        if (bill.status !== client_1.BillStatus.COMPLETED) {
            throw new common_1.BadRequestException('The bill has not been confirmed yet');
        }
        if (!bill.createdBy.paymentAccount) {
            throw new common_1.BadRequestException('The bill creator has not set up a payment account yet');
        }
        const payment = bill.payments.find((p) => p.userId === targetUserId);
        if (!payment) {
            throw new common_1.NotFoundException('No payment found for this member');
        }
        const qrDataUrl = await this.promptPay.generateQrDataUrl(bill.createdBy.paymentAccount.promptPayNumber, Number(payment.amount));
        return {
            qrDataUrl,
            amount: Number(payment.amount),
            accountName: bill.createdBy.paymentAccount.accountName,
        };
    }
    async uploadSlip(userId, billId, targetUserId, file) {
        if (userId !== targetUserId) {
            throw new common_1.ForbiddenException('You can only upload your own payment slip');
        }
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertParticipant(bill, userId);
        if (bill.status === client_1.BillStatus.CLOSED) {
            throw new common_1.ConflictException('This bill is already closed');
        }
        const payment = bill.payments.find((p) => p.userId === targetUserId);
        if (!payment) {
            throw new common_1.NotFoundException('No payment found for this member');
        }
        const slipImageUrl = await this.storage.save(file, 'slips');
        await this.storage.delete(payment.slipImageUrl);
        await this.prisma.userPayment.update({
            where: { billId_userId: { billId, userId: targetUserId } },
            data: { slipImageUrl, status: client_1.PaymentStatus.PAID, paidAt: new Date() },
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async setStatus(userId, billId, targetUserId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        if (bill.status === client_1.BillStatus.CLOSED) {
            throw new common_1.ConflictException('This bill is already closed');
        }
        const payment = bill.payments.find((p) => p.userId === targetUserId);
        if (!payment) {
            throw new common_1.NotFoundException('No payment found for this member');
        }
        await this.prisma.userPayment.update({
            where: { billId_userId: { billId, userId: targetUserId } },
            data: {
                status: dto.status,
                paidAt: dto.status === client_1.PaymentStatus.PAID ? new Date() : null,
            },
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async closeBill(userId, billId) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        if (bill.status === client_1.BillStatus.CLOSED) {
            throw new common_1.ConflictException('This bill is already closed');
        }
        if (bill.status !== client_1.BillStatus.COMPLETED) {
            throw new common_1.ConflictException('Confirm the bill before closing it');
        }
        const { remaining } = this.billDetail.toResponse(bill, userId).progress;
        if (remaining > 0) {
            throw new common_1.ConflictException('Not everyone has paid yet');
        }
        await this.prisma.bill.update({
            where: { id: billId },
            data: { status: client_1.BillStatus.CLOSED, closedAt: new Date() },
        });
        return this.billDetail.getDetail(userId, billId);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        local_storage_service_1.LocalStorageService,
        promptpay_service_1.PromptPayService,
        bill_access_service_1.BillAccessService,
        bill_detail_service_1.BillDetailService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map