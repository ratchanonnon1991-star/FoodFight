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
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const receipt_ocr_service_1 = require("../infrastructure/ocr/receipt-ocr.service");
const local_storage_service_1 = require("../infrastructure/storage/local-storage.service");
const bill_access_service_1 = require("./bill-access.service");
const bill_detail_service_1 = require("./bill-detail.service");
let ReceiptService = class ReceiptService {
    prisma;
    storage;
    ocr;
    billAccess;
    billDetail;
    constructor(prisma, storage, ocr, billAccess, billDetail) {
        this.prisma = prisma;
        this.storage = storage;
        this.ocr = ocr;
        this.billAccess = billAccess;
        this.billDetail = billDetail;
    }
    async uploadReceipt(userId, billId, file) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertEditable(bill.status);
        const imageUrl = await this.storage.save(file, 'receipts');
        await this.storage.delete(bill.receipt?.imageUrl);
        const ocrResult = this.ocr.isConfigured()
            ? await this.ocr.extractItems(file.buffer, file.mimetype)
            : null;
        const ocrStatus = ocrResult
            ? ocrResult.ok
                ? client_1.OcrStatus.COMPLETED
                : client_1.OcrStatus.FAILED
            : client_1.OcrStatus.NOT_USED;
        const parsedData = ocrResult?.ok
            ? {
                items: ocrResult.items.map((item) => ({ ...item })),
                serviceCharge: ocrResult.serviceCharge,
                tax: ocrResult.tax,
                discount: ocrResult.discount,
            }
            : undefined;
        await this.prisma.$transaction(async (tx) => {
            await tx.receipt.upsert({
                where: { billId },
                update: { imageUrl, ocrStatus, parsedData },
                create: { billId, imageUrl, ocrStatus, parsedData },
            });
            if (ocrResult?.ok && ocrResult.items.length > 0) {
                await tx.receiptItem.deleteMany({ where: { billId } });
                await tx.receiptItem.createMany({
                    data: ocrResult.items.map((item) => ({
                        billId,
                        name: item.name,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        totalPrice: item.unitPrice * item.quantity,
                    })),
                });
            }
            if (ocrResult?.ok &&
                (ocrResult.serviceCharge > 0 ||
                    ocrResult.tax > 0 ||
                    ocrResult.discount > 0)) {
                await tx.bill.update({
                    where: { id: billId },
                    data: {
                        serviceCharge: ocrResult.serviceCharge,
                        tax: ocrResult.tax,
                        discount: ocrResult.discount,
                    },
                });
            }
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async addItem(userId, billId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertEditable(bill.status);
        await this.prisma.receiptItem.create({
            data: {
                billId,
                name: dto.name,
                quantity: dto.quantity,
                unitPrice: dto.unitPrice,
                totalPrice: dto.unitPrice * dto.quantity,
            },
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async updateItem(userId, billId, itemId, dto) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertEditable(bill.status);
        const item = bill.items.find((existing) => existing.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.receiptItem.update({
                where: { id: itemId },
                data: {
                    name: dto.name,
                    quantity: dto.quantity,
                    unitPrice: dto.unitPrice,
                    totalPrice: dto.unitPrice * dto.quantity,
                },
            });
            if (item.shares.length > 0) {
                await tx.itemShare.deleteMany({ where: { receiptItemId: itemId } });
            }
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async deleteItem(userId, billId, itemId) {
        const bill = await this.billAccess.loadOrThrow(billId);
        this.billAccess.assertCreator(bill, userId);
        this.assertEditable(bill.status);
        const item = bill.items.find((existing) => existing.id === itemId);
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        await this.prisma.receiptItem.delete({ where: { id: itemId } });
        return this.billDetail.getDetail(userId, billId);
    }
    assertEditable(status) {
        if (status === client_1.BillStatus.COMPLETED ||
            status === client_1.BillStatus.CLOSED ||
            status === client_1.BillStatus.CANCELLED) {
            throw new common_1.ConflictException('This bill is already finalized');
        }
    }
};
exports.ReceiptService = ReceiptService;
exports.ReceiptService = ReceiptService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        local_storage_service_1.LocalStorageService,
        receipt_ocr_service_1.ReceiptOcrService,
        bill_access_service_1.BillAccessService,
        bill_detail_service_1.BillDetailService])
], ReceiptService);
//# sourceMappingURL=receipt.service.js.map