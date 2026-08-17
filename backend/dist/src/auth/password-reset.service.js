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
exports.PasswordResetService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
let PasswordResetService = class PasswordResetService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findLatestActive(userId) {
        return this.prisma.passwordReset.findFirst({
            where: { userId, used: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    create(userId, tokenHash) {
        const now = Date.now();
        return this.prisma.passwordReset.create({
            data: {
                userId,
                tokenHash,
                expiresAt: new Date(now + OTP_TTL_MS),
                resendAvailableAt: new Date(now + RESEND_COOLDOWN_MS),
            },
        });
    }
    markUsed(id, tx = this.prisma) {
        return tx.passwordReset.update({
            where: { id },
            data: { used: true },
        });
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PasswordResetService);
//# sourceMappingURL=password-reset.service.js.map