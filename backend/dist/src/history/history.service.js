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
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
let HistoryService = class HistoryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserId(userId) {
        const sessions = await this.prisma.foodFightSession.findMany({
            where: {
                members: {
                    some: { userId },
                },
                OR: [
                    {
                        status: {
                            in: [client_1.FoodFightStatus.COMPLETED, client_1.FoodFightStatus.CANCELLED],
                        },
                    },
                    { completedAt: { not: null } },
                    {
                        room: {
                            status: {
                                in: [client_1.RoomStatus.COMPLETED, client_1.RoomStatus.CANCELLED],
                            },
                        },
                    },
                ],
            },
            orderBy: [{ completedAt: 'desc' }, { updatedAt: 'desc' }],
            take: 50,
            select: {
                id: true,
                status: true,
                startedAt: true,
                finalizedAt: true,
                completedAt: true,
                updatedAt: true,
                room: {
                    select: {
                        id: true,
                        name: true,
                        locationName: true,
                        scheduledAt: true,
                        status: true,
                    },
                },
                members: {
                    where: { userId },
                    select: { role: true },
                },
                _count: {
                    select: { members: true },
                },
                finalSelection: {
                    select: {
                        recommendationItem: {
                            select: {
                                menuName: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
                restaurantSelection: {
                    select: {
                        name: true,
                        address: true,
                        imageUrl: true,
                    },
                },
            },
        });
        return sessions.map((session) => {
            const isCancelled = session.status === client_1.FoodFightStatus.CANCELLED ||
                session.room.status === client_1.RoomStatus.CANCELLED;
            return {
                id: session.id,
                status: isCancelled ? 'CANCELLED' : 'COMPLETED',
                role: session.members[0]?.role ?? 'MEMBER',
                memberCount: session._count.members,
                startedAt: session.startedAt.toISOString(),
                completedAt: (session.completedAt ??
                    session.finalizedAt ??
                    session.updatedAt).toISOString(),
                room: {
                    id: session.room.id,
                    name: session.room.name,
                    locationName: session.room.locationName,
                    scheduledAt: session.room.scheduledAt.toISOString(),
                },
                finalMenu: session.finalSelection
                    ? {
                        name: session.finalSelection.recommendationItem.menuName,
                        imageUrl: session.finalSelection.recommendationItem.imageUrl,
                    }
                    : null,
                restaurant: session.restaurantSelection
                    ? {
                        name: session.restaurantSelection.name,
                        address: session.restaurantSelection.address,
                        imageUrl: session.restaurantSelection.imageUrl,
                    }
                    : null,
            };
        });
    }
};
exports.HistoryService = HistoryService;
exports.HistoryService = HistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HistoryService);
//# sourceMappingURL=history.service.js.map