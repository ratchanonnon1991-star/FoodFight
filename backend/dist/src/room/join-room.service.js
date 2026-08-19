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
exports.JoinRoomService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const JOIN_TRANSACTION_ATTEMPTS = 3;
let JoinRoomService = class JoinRoomService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async joinRoom(roomId, userId) {
        let joinedMember;
        for (let attempt = 0; attempt < JOIN_TRANSACTION_ATTEMPTS; attempt += 1) {
            try {
                joinedMember = await this.prisma.$transaction(async (tx) => {
                    const room = await tx.room.findUnique({
                        where: { id: roomId },
                        select: {
                            id: true,
                            hostId: true,
                            maxMembers: true,
                            status: true,
                        },
                    });
                    if (!room) {
                        throw new common_1.NotFoundException('Room not found');
                    }
                    if (room.status !== client_1.RoomStatus.LOBBY) {
                        throw new common_1.ConflictException('Room is no longer available');
                    }
                    if (room.hostId === userId) {
                        throw new common_1.ConflictException('Host cannot join their own room');
                    }
                    const existingMember = await tx.roomMember.findUnique({
                        where: { roomId_userId: { roomId, userId } },
                        select: { id: true },
                    });
                    if (existingMember) {
                        throw new common_1.ConflictException('Already joined');
                    }
                    const activeMemberCount = await tx.roomMember.count({
                        where: { roomId, leftAt: null },
                    });
                    if (activeMemberCount + 1 >= room.maxMembers) {
                        throw new common_1.ConflictException('Room is full');
                    }
                    return tx.roomMember.create({
                        data: { roomId, userId },
                        select: {
                            id: true,
                            roomId: true,
                            userId: true,
                            isReady: true,
                            joinedAt: true,
                        },
                    });
                }, { isolationLevel: client_1.Prisma.TransactionIsolationLevel.Serializable });
                break;
            }
            catch (error) {
                if (this.isPrismaError(error, 'P2034') &&
                    attempt < JOIN_TRANSACTION_ATTEMPTS - 1) {
                    continue;
                }
                if (this.isPrismaError(error, 'P2002')) {
                    throw new common_1.ConflictException('Already joined');
                }
                throw error;
            }
        }
        if (!joinedMember) {
            throw new common_1.ConflictException('Failed to join room. Please try again.');
        }
        return {
            message: 'Joined room successfully',
            member: joinedMember,
            room: await this.getRoom(roomId, userId),
        };
    }
    async getRoom(roomId, userId) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: this.lobbyRoomSelect,
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        const isHost = room.hostId === userId;
        const isActiveMember = room.members.some((member) => member.userId === userId);
        if (!isHost && !isActiveMember) {
            throw new common_1.ForbiddenException('You are not a member of this room');
        }
        return this.toLobbyResponse(room, isHost);
    }
    lobbyRoomSelect = {
        id: true,
        hostId: true,
        name: true,
        roomCode: true,
        inviteToken: true,
        maxMembers: true,
        locationName: true,
        searchRadiusKm: true,
        scheduledAt: true,
        status: true,
        host: { select: { displayName: true, avatarUrl: true } },
        members: {
            where: { leftAt: null },
            orderBy: { joinedAt: 'asc' },
            select: {
                id: true,
                userId: true,
                isReady: true,
                joinedAt: true,
                user: { select: { displayName: true, avatarUrl: true } },
            },
        },
    };
    toLobbyResponse(room, isHost) {
        return {
            id: room.id,
            name: room.name,
            host: room.host,
            members: room.members.map((member) => ({
                id: member.id,
                userId: member.userId,
                displayName: member.user.displayName,
                avatarUrl: member.user.avatarUrl,
                isReady: member.isReady,
                joinedAt: member.joinedAt,
            })),
            memberCount: room.members.length + 1,
            maxMembers: room.maxMembers,
            locationName: room.locationName,
            searchRadiusKm: room.searchRadiusKm,
            scheduledAt: room.scheduledAt,
            status: room.status,
            roomCode: room.roomCode,
            ...(isHost
                ? {
                    inviteToken: room.inviteToken,
                    inviteLink: this.buildInviteLink(room.inviteToken),
                }
                : {}),
        };
    }
    buildInviteLink(inviteToken) {
        const frontendUrl = (this.configService.get('FRONTEND_URL') ?? 'http://localhost:3000').replace(/\/+$/, '');
        return `${frontendUrl}/join/${encodeURIComponent(inviteToken)}`;
    }
    isPrismaError(error, code) {
        return (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === code);
    }
};
exports.JoinRoomService = JoinRoomService;
exports.JoinRoomService = JoinRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], JoinRoomService);
//# sourceMappingURL=join-room.service.js.map