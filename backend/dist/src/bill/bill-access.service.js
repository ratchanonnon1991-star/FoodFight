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
exports.BillAccessService = exports.billInclude = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
exports.billInclude = {
    session: {
        include: {
            room: { select: { name: true } },
            restaurantSelection: { select: { name: true } },
            members: {
                select: {
                    userId: true,
                    role: true,
                    user: { select: { displayName: true, avatarUrl: true } },
                },
            },
        },
    },
    createdBy: {
        select: {
            id: true,
            displayName: true,
            avatarUrl: true,
            paymentAccount: true,
        },
    },
    receipt: true,
    items: {
        orderBy: { createdAt: 'asc' },
        include: {
            shares: {
                include: {
                    user: { select: { id: true, displayName: true, avatarUrl: true } },
                },
            },
        },
    },
    payments: {
        include: {
            user: { select: { id: true, displayName: true, avatarUrl: true } },
        },
    },
};
let BillAccessService = class BillAccessService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async loadOrThrow(billId) {
        const bill = await this.prisma.bill.findUnique({
            where: { id: billId },
            include: exports.billInclude,
        });
        if (!bill) {
            throw new common_1.NotFoundException('Bill not found');
        }
        return bill;
    }
    assertParticipant(bill, userId) {
        const isParticipant = bill.session.members.some((member) => member.userId === userId);
        if (!isParticipant) {
            throw new common_1.ForbiddenException('You are not part of this bill');
        }
    }
    assertCreator(bill, userId) {
        if (bill.createdById !== userId) {
            throw new common_1.ForbiddenException('Only the bill creator can do this');
        }
    }
};
exports.BillAccessService = BillAccessService;
exports.BillAccessService = BillAccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillAccessService);
//# sourceMappingURL=bill-access.service.js.map