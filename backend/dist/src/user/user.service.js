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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const bcrypt_service_1 = require("../infrastructure/hash/bcrypt.service");
let UserService = class UserService {
    prisma;
    bcryptService;
    constructor(prisma, bcryptService) {
        this.prisma = prisma;
        this.bcryptService = bcryptService;
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    create(data) {
        return this.prisma.user.create({ data });
    }
    async findUserByProviderAccount(provider, providerAccountId) {
        const account = await this.prisma.account.findUnique({
            where: { provider_providerAccountId: { provider, providerAccountId } },
            include: { user: true },
        });
        return account?.user ?? null;
    }
    linkAccount(userId, provider, providerAccountId) {
        return this.prisma.account.create({
            data: { userId, provider, providerAccountId },
        });
    }
    createUserWithAccount(data) {
        return this.prisma.user.create({
            data: {
                displayName: data.displayName,
                email: data.email,
                avatarUrl: data.avatarUrl,
                emailVerified: true,
                accounts: {
                    create: {
                        provider: data.provider,
                        providerAccountId: data.providerAccountId,
                    },
                },
            },
        });
    }
    updateAvatarUrl(userId, avatarUrl) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { avatarUrl },
        });
    }
    updateDisplayName(userId, displayName) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { displayName },
        });
    }
    async updatePassword(userId, password, tx = this.prisma) {
        const passwordHash = await this.bcryptService.hash(password);
        return tx.user.update({
            where: { id: userId },
            data: { passwordHash },
        });
    }
    async getPublicProfile(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            id: user.id,
            displayName: user.displayName,
            avatarUrl: user.avatarUrl,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
    async updateMe(userId, displayName, avatarUrl) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                displayName,
                ...(avatarUrl !== undefined
                    ? { avatarUrl: avatarUrl?.trim() || null }
                    : {}),
            },
        });
        return {
            id: user.id,
            displayName: user.displayName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            role: user.role,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bcrypt_service_1.BcryptService])
], UserService);
//# sourceMappingURL=user.service.js.map