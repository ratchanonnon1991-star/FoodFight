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
exports.FoodProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let FoodProfileService = class FoodProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    foodProfileSelect = {
        id: true,
        userId: true,
        allergies: true,
        otherAllergies: true,
        restrictions: true,
        otherRestrictions: true,
        additionalNotes: true,
        createdAt: true,
        updatedAt: true,
    };
    async findByUserId(userId) {
        const profile = await this.prisma.foodProfile.findUnique({
            where: { userId },
            select: this.foodProfileSelect,
        });
        if (!profile) {
            throw new common_1.NotFoundException('Food profile not found');
        }
        return profile;
    }
    async upsert(userId, dto) {
        const otherAllergies = this.normalizeOptionalString(dto.otherAllergies);
        const otherRestrictions = this.normalizeOptionalString(dto.otherRestrictions);
        const additionalNotes = this.normalizeOptionalString(dto.additionalNotes);
        return this.prisma.foodProfile.upsert({
            where: { userId },
            create: {
                userId,
                allergies: dto.allergies,
                otherAllergies,
                restrictions: dto.restrictions,
                otherRestrictions,
                additionalNotes,
            },
            update: {
                allergies: dto.allergies,
                otherAllergies,
                restrictions: dto.restrictions,
                otherRestrictions,
                additionalNotes,
            },
            select: this.foodProfileSelect,
        });
    }
    normalizeOptionalString(value) {
        if (value === undefined || value === null) {
            return null;
        }
        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
    }
};
exports.FoodProfileService = FoodProfileService;
exports.FoodProfileService = FoodProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoodProfileService);
//# sourceMappingURL=food-profile.service.js.map