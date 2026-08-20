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
let PaymentAccountService = class PaymentAccountService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    paymentAccountSelect = {
        id: true,
        userId: true,
        paymentType: true,
        accountName: true,
        promptPayNumber: true,
        qrCodeUrl: true,
        createdAt: true,
        updatedAt: true,
    };
    findByUserId(userId) {
        return this.prisma.paymentAccount.findUnique({
            where: { userId },
            select: this.paymentAccountSelect,
        });
    }
    upsert(userId, dto) {
        return this.prisma.paymentAccount.upsert({
            where: { userId },
            create: {
                userId,
                paymentType: dto.paymentType,
                accountName: dto.accountName,
                promptPayNumber: dto.promptPayNumber,
                qrCodeUrl: dto.qrCodeUrl ?? null,
            },
            update: {
                paymentType: dto.paymentType,
                accountName: dto.accountName,
                promptPayNumber: dto.promptPayNumber,
                qrCodeUrl: dto.qrCodeUrl ?? null,
            },
            select: this.paymentAccountSelect,
        });
    }
};
exports.PaymentAccountService = PaymentAccountService;
exports.PaymentAccountService = PaymentAccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentAccountService);
//# sourceMappingURL=payment-account.service.js.map