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
exports.CreateBillService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const bill_detail_service_1 = require("./bill-detail.service");
let CreateBillService = class CreateBillService {
    prisma;
    billDetail;
    constructor(prisma, billDetail) {
        this.prisma = prisma;
        this.billDetail = billDetail;
    }
    async listAvailableRooms(userId) {
        const rooms = await this.prisma.room.findMany({
            where: {
                status: { in: [client_1.RoomStatus.LOBBY, client_1.RoomStatus.IN_PROGRESS] },
                OR: [
                    { hostId: userId },
                    { members: { some: { userId, leftAt: null } } },
                ],
            },
            select: {
                id: true,
                name: true,
                scheduledAt: true,
                hostId: true,
                host: { select: { displayName: true, avatarUrl: true } },
                members: {
                    where: { leftAt: null },
                    select: {
                        userId: true,
                        user: { select: { displayName: true, avatarUrl: true } },
                    },
                },
                session: {
                    select: {
                        id: true,
                        restaurantSelection: { select: { name: true } },
                        bill: { select: { id: true, status: true } },
                    },
                },
            },
            orderBy: { scheduledAt: 'desc' },
        });
        return rooms
            .filter((room) => room.session?.bill?.status !== client_1.BillStatus.COMPLETED &&
            room.session?.bill?.status !== client_1.BillStatus.CLOSED)
            .map((room) => ({
            roomId: room.id,
            name: room.name,
            scheduledAt: room.scheduledAt,
            restaurantName: room.session?.restaurantSelection?.name ?? null,
            members: [
                {
                    userId: room.hostId,
                    displayName: room.host.displayName,
                    avatarUrl: room.host.avatarUrl,
                },
                ...room.members.map((member) => ({
                    userId: member.userId,
                    displayName: member.user.displayName,
                    avatarUrl: member.user.avatarUrl,
                })),
            ],
            billId: room.session?.bill?.id ?? null,
            billStatus: room.session?.bill?.status ?? null,
        }));
    }
    async createBill(userId, dto) {
        const room = await this.prisma.room.findUnique({
            where: { id: dto.roomId },
            include: { members: { where: { leftAt: null } } },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        const isHost = room.hostId === userId;
        const isMember = room.members.some((member) => member.userId === userId);
        if (!isHost && !isMember) {
            throw new common_1.ForbiddenException('You are not a member of this room');
        }
        const billId = await this.prisma.$transaction(async (tx) => {
            let session = await tx.foodFightSession.findUnique({
                where: { roomId: room.id },
            });
            if (!session) {
                session = await tx.foodFightSession.create({
                    data: { roomId: room.id, status: client_1.FoodFightStatus.BILLING },
                });
                const participantIds = [
                    room.hostId,
                    ...room.members.map((member) => member.userId),
                ];
                await tx.sessionMember.createMany({
                    data: participantIds.map((participantId) => ({
                        sessionId: session.id,
                        userId: participantId,
                        role: participantId === room.hostId
                            ? client_1.SessionMemberRole.HOST
                            : client_1.SessionMemberRole.MEMBER,
                    })),
                    skipDuplicates: true,
                });
            }
            else if (session.status !== client_1.FoodFightStatus.BILLING &&
                session.status !== client_1.FoodFightStatus.COMPLETED) {
                await tx.foodFightSession.update({
                    where: { id: session.id },
                    data: { status: client_1.FoodFightStatus.BILLING },
                });
            }
            const existingBill = await tx.bill.findUnique({
                where: { sessionId: session.id },
            });
            if (existingBill) {
                if (existingBill.status === client_1.BillStatus.CANCELLED) {
                    const revived = await tx.bill.update({
                        where: { id: existingBill.id },
                        data: { status: client_1.BillStatus.DRAFT, createdById: userId },
                    });
                    return revived.id;
                }
                throw new common_1.ConflictException('A bill already exists for this meal');
            }
            const bill = await tx.bill.create({
                data: {
                    sessionId: session.id,
                    createdById: userId,
                    status: client_1.BillStatus.DRAFT,
                },
            });
            return bill.id;
        });
        return this.billDetail.getDetail(userId, billId);
    }
    async getBySession(userId, sessionId) {
        const bill = await this.prisma.bill.findUnique({ where: { sessionId } });
        if (!bill) {
            throw new common_1.NotFoundException('No bill has been created for this meal yet');
        }
        return this.billDetail.getDetail(userId, bill.id);
    }
};
exports.CreateBillService = CreateBillService;
exports.CreateBillService = CreateBillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        bill_detail_service_1.BillDetailService])
], CreateBillService);
//# sourceMappingURL=create-bill.service.js.map