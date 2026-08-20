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
exports.SplitService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const bill_access_service_1 = require("./bill-access.service");
const bill_detail_service_1 = require("./bill-detail.service");
const money_util_1 = require("./util/money.util");
let SplitService = class SplitService {
    prisma;
    billAccess;
    billDetail;
    constructor(prisma, billAccess, billDetail) {
        this.prisma = prisma;
        this.billAccess = billAccess;
        this.billDetail = billDetail;
    }
    async assignItem(userId, billId, itemId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        if (bill.status === client_1.BillStatus.COMPLETED ||
            bill.status === client_1.BillStatus.CLOSED ||
            bill.status === client_1.BillStatus.CANCELLED) {
            throw new common_1.ConflictException('This bill is already finalized');
        }
        const item = bill.items.find((existing) => existing.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        const memberIds = new Set(bill.session.members.map((member) => member.userId));
        const assigneeIds = Array.from(new Set(dto.userIds));
        for (const assigneeId of assigneeIds) {
            if (!memberIds.has(assigneeId)) {
                throw new common_1.BadRequestException('Cannot assign an item to someone outside this meal');
            }
        }
        const totalCents = (0, money_util_1.toCents)(Number(item.totalPrice));
        const shareCents = (0, money_util_1.splitEvenlyCents)(totalCents, assigneeIds.length);
        await this.prisma.$transaction(async (tx) => {
            await tx.itemShare.deleteMany({ where: { receiptItemId: itemId } });
            if (assigneeIds.length > 0) {
                await tx.itemShare.createMany({
                    data: assigneeIds.map((assigneeId, index) => ({
                        receiptItemId: itemId,
                        userId: assigneeId,
                        amount: (0, money_util_1.fromCents)(shareCents[index]),
                    })),
                });
            }
            if (bill.status === client_1.BillStatus.DRAFT) {
                await tx.bill.update({
                    where: { id: billId },
                    data: { status: client_1.BillStatus.SPLITTING },
                });
            }
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async splitEvenly(userId, billId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        if (bill.status === client_1.BillStatus.COMPLETED ||
            bill.status === client_1.BillStatus.CLOSED ||
            bill.status === client_1.BillStatus.CANCELLED) {
            throw new common_1.ConflictException('This bill is already finalized');
        }
        if (bill.items.length === 0) {
            throw new common_1.BadRequestException('Add at least one item before splitting the bill');
        }
        const memberIds = new Set(bill.session.members.map((member) => member.userId));
        const participantIds = dto.userIds?.length
            ? Array.from(new Set(dto.userIds))
            : Array.from(memberIds);
        if (participantIds.length === 0) {
            throw new common_1.BadRequestException('Select at least one person to split the bill with');
        }
        for (const participantId of participantIds) {
            if (!memberIds.has(participantId)) {
                throw new common_1.BadRequestException('Cannot split the bill with someone outside this meal');
            }
        }
        const shareRows = bill.items.flatMap((item) => {
            const totalCents = (0, money_util_1.toCents)(Number(item.totalPrice));
            const shareCents = (0, money_util_1.splitEvenlyCents)(totalCents, participantIds.length);
            return participantIds.map((participantId, index) => ({
                receiptItemId: item.id,
                userId: participantId,
                amount: (0, money_util_1.fromCents)(shareCents[index]),
            }));
        });
        const itemIds = bill.items.map((item) => item.id);
        await this.prisma.$transaction(async (tx) => {
            await tx.itemShare.deleteMany({
                where: { receiptItemId: { in: itemIds } },
            });
            await tx.itemShare.createMany({ data: shareRows });
            if (bill.status === client_1.BillStatus.DRAFT) {
                await tx.bill.update({
                    where: { id: billId },
                    data: { status: client_1.BillStatus.SPLITTING },
                });
            }
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async calculateSummary(userId, billId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertReadyToCalculate(bill.status, bill.items.length);
        const unassignedItem = bill.items.find((item) => item.shares.length === 0);
        if (unassignedItem) {
            throw new common_1.BadRequestException(`"${unassignedItem.name}" has not been assigned to anyone yet`);
        }
        const serviceCharge = dto.serviceCharge ?? 0;
        const tax = dto.tax ?? 0;
        const discount = dto.discount ?? 0;
        const subtotal = bill.items.reduce((sum, item) => sum + Number(item.totalPrice), 0);
        const beforeDiscount = subtotal + serviceCharge + tax;
        if (discount > beforeDiscount) {
            throw new common_1.BadRequestException('Discount cannot exceed the bill total before discount');
        }
        const totalAmount = beforeDiscount - discount;
        await this.prisma.bill.update({
            where: { id: billId },
            data: {
                subtotal,
                serviceCharge,
                tax,
                discount,
                totalAmount,
                status: client_1.BillStatus.SPLITTING,
            },
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async confirmBill(userId, billId) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertReadyToCalculate(bill.status, bill.items.length);
        if (bill.totalAmount == null) {
            throw new common_1.BadRequestException('Calculate the bill summary before confirming');
        }
        if (!bill.createdBy.paymentAccount) {
            throw new common_1.ForbiddenException('Set up your payment account before confirming the bill');
        }
        const extraChargesCents = (0, money_util_1.toCents)(Number(bill.serviceCharge ?? 0)) +
            (0, money_util_1.toCents)(Number(bill.tax ?? 0)) -
            (0, money_util_1.toCents)(Number(bill.discount ?? 0));
        const memberTotals = new Map();
        for (const member of bill.session.members) {
            memberTotals.set(member.userId, 0);
        }
        for (const item of bill.items) {
            for (const share of item.shares) {
                memberTotals.set(share.userId, (memberTotals.get(share.userId) ?? 0) + (0, money_util_1.toCents)(Number(share.amount)));
            }
        }
        const participantIds = Array.from(memberTotals.keys()).filter((participantId) => (memberTotals.get(participantId) ?? 0) > 0);
        const weights = participantIds.map((id) => memberTotals.get(id) ?? 0);
        const extraSharesCents = (0, money_util_1.splitProportionallyCents)(extraChargesCents, weights);
        await this.prisma.$transaction(async (tx) => {
            await tx.userPayment.deleteMany({ where: { billId } });
            if (participantIds.length > 0) {
                await tx.userPayment.createMany({
                    data: participantIds.map((participantId, index) => ({
                        billId,
                        userId: participantId,
                        amount: (0, money_util_1.fromCents)((memberTotals.get(participantId) ?? 0) + extraSharesCents[index]),
                        status: client_1.PaymentStatus.UNPAID,
                    })),
                });
            }
            await tx.bill.update({
                where: { id: billId },
                data: { status: client_1.BillStatus.COMPLETED },
            });
        });
        return this.billDetail.getDetail(userId, billId);
    }
    assertReadyToCalculate(status, itemCount) {
        if (status === client_1.BillStatus.COMPLETED ||
            status === client_1.BillStatus.CLOSED ||
            status === client_1.BillStatus.CANCELLED) {
            throw new common_1.ConflictException('This bill is already finalized');
        }
        if (itemCount === 0) {
            throw new common_1.BadRequestException('Add at least one item before calculating the split');
        }
    }
};
exports.SplitService = SplitService;
exports.SplitService = SplitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bill_access_service_1.BillAccessService,
        bill_detail_service_1.BillDetailService])
], SplitService);
//# sourceMappingURL=split.service.js.map