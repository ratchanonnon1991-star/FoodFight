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
exports.PaymentAccountService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const local_storage_service_1 = require("../infrastructure/storage/local-storage.service");
let PaymentAccountService = class PaymentAccountService {
    prisma;
    storage;
    constructor(prisma, storage) {
        this.prisma = prisma;
        this.storage = storage;
    }
    async getForUser(userId) {
        const account = await this.prisma.paymentAccount.findUnique({
            where: { userId },
        });
        return account ? this.toResponse(account) : null;
    }
    async upsert(userId, dto) {
        const account = await this.prisma.paymentAccount.upsert({
            where: { userId },
            update: {
                type: dto.type,
                accountName: dto.accountName,
                promptPayId: dto.promptPayId,
            },
            create: {
                userId,
                type: dto.type,
                accountName: dto.accountName,
                promptPayId: dto.promptPayId,
            },
        });
        return this.toResponse(account);
    }
    async uploadQrImage(userId, file) {
        const account = await this.prisma.paymentAccount.findUnique({
            where: { userId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Set up a payment account before uploading a QR code');
        }
        const qrImageUrl = await this.storage.save(file, 'payment-accounts');
        await this.storage.delete(account.qrImageUrl);
        const updated = await this.prisma.paymentAccount.update({
            where: { userId },
            data: { qrImageUrl },
        });
        return this.toResponse(updated);
    }
    async removeQrImage(userId) {
        const account = await this.prisma.paymentAccount.findUnique({
            where: { userId },
        });
        if (!account) {
            throw new common_1.NotFoundException('Payment account not found');
        }
        await this.storage.delete(account.qrImageUrl);
        const updated = await this.prisma.paymentAccount.update({
            where: { userId },
            data: { qrImageUrl: null },
        });
        return this.toResponse(updated);
    }
    toResponse(account) {
        return {
            id: account.id,
            type: account.type,
            accountName: account.accountName,
            promptPayId: account.promptPayId,
            qrImageUrl: account.qrImageUrl,
            updatedAt: account.updatedAt,
        };
    }
};
exports.PaymentAccountService = PaymentAccountService;
exports.PaymentAccountService = PaymentAccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        local_storage_service_1.LocalStorageService])
], PaymentAccountService);
//# sourceMappingURL=payment-account.service.js.map