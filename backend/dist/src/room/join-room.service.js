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
const room_realtime_service_1 = require("./room-realtime.service");
const JOIN_TRANSACTION_ATTEMPTS = 3;
let JoinRoomService = class JoinRoomService {
    prisma;
    configService;
    roomRealtimeService;
    constructor(prisma, configService, roomRealtimeService) {
        this.prisma = prisma;
        this.configService = configService;
        this.roomRealtimeService = roomRealtimeService;
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
                        select: { id: true, leftAt: true },
                    });
                    if (existingMember?.leftAt === null) {
                        throw new common_1.ConflictException('Already joined');
                    }
                    const activeMemberCount = await tx.roomMember.count({
                        where: { roomId, leftAt: null },
                    });
                    if (activeMemberCount + 1 >= room.maxMembers) {
                        throw new common_1.ConflictException('Room is full');
                    }
                    if (existingMember) {
                        return tx.roomMember.update({
                            where: { id: existingMember.id },
                            data: {
                                leftAt: null,
                                isReady: false,
                                joinedAt: new Date(),
                            },
                            select: {
                                id: true,
                                roomId: true,
                                userId: true,
                                isReady: true,
                                joinedAt: true,
                            },
                        });
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
        const updatedRoom = await this.getRoom(roomId, userId);
        this.roomRealtimeService.publish(roomId);
        return {
            message: 'Joined room successfully',
            member: joinedMember,
            room: updatedRoom,
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
        return this.toLobbyResponse(room, isHost, userId);
    }
    async getCurrentRoom(userId) {
        const room = await this.prisma.room.findFirst({
            where: {
                status: { in: [client_1.RoomStatus.LOBBY, client_1.RoomStatus.IN_PROGRESS] },
                OR: [
                    { hostId: userId },
                    { members: { some: { userId, leftAt: null } } },
                ],
            },
            orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
            select: this.lobbyRoomSelect,
        });
        if (!room) {
            return null;
        }
        return this.toLobbyResponse(room, room.hostId === userId, userId);
    }
    async updateRoom(roomId, userId, dto) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: { hostId: true, status: true, maxMembers: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.hostId !== userId) {
            throw new common_1.ForbiddenException('Only the host can edit room details');
        }
        if (room.status !== client_1.RoomStatus.LOBBY) {
            throw new common_1.ConflictException('Only lobby rooms can be edited');
        }
        if (dto.maxMembers !== undefined) {
            const activeMemberCount = await this.prisma.roomMember.count({
                where: { roomId, leftAt: null },
            });
            if (dto.maxMembers < activeMemberCount + 1) {
                throw new common_1.ConflictException('Maximum members cannot be lower than the current member count');
            }
        }
        const data = {};
        if (dto.name !== undefined)
            data.name = dto.name;
        if (dto.maxMembers !== undefined)
            data.maxMembers = dto.maxMembers;
        if (dto.locationName !== undefined)
            data.locationName = dto.locationName;
        if (dto.latitude !== undefined)
            data.latitude = dto.latitude;
        if (dto.longitude !== undefined)
            data.longitude = dto.longitude;
        if (dto.searchRadiusKm !== undefined) {
            data.searchRadiusKm = dto.searchRadiusKm;
        }
        if (dto.scheduledAt !== undefined) {
            data.scheduledAt = new Date(dto.scheduledAt);
        }
        await this.prisma.room.update({ where: { id: roomId }, data });
        const updatedRoom = await this.getRoom(roomId, userId);
        this.roomRealtimeService.publish(roomId);
        return updatedRoom;
    }
    async closeRoom(roomId, userId) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: { hostId: true, status: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.hostId !== userId) {
            throw new common_1.ForbiddenException('Only the host can close the room');
        }
        if (room.status !== client_1.RoomStatus.LOBBY &&
            room.status !== client_1.RoomStatus.IN_PROGRESS) {
            throw new common_1.ConflictException('Only active rooms can be closed');
        }
        await this.prisma.room.update({
            where: { id: roomId },
            data: { status: client_1.RoomStatus.CANCELLED },
        });
        this.roomRealtimeService.publish(roomId);
        return { message: 'Room closed successfully' };
    }
    async setReady(roomId, userId, isReady) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: { hostId: true, status: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.hostId === userId) {
            throw new common_1.ConflictException('The host does not need to set readiness');
        }
        if (room.status !== client_1.RoomStatus.LOBBY) {
            throw new common_1.ConflictException('Ready status can only be changed in the lobby');
        }
        const member = await this.prisma.roomMember.findFirst({
            where: { roomId, userId, leftAt: null },
            select: { id: true },
        });
        if (!member) {
            throw new common_1.ForbiddenException('You are not a member of this room');
        }
        await this.prisma.roomMember.update({
            where: { id: member.id },
            data: { isReady },
        });
        const updatedRoom = await this.getRoom(roomId, userId);
        this.roomRealtimeService.publish(roomId);
        return updatedRoom;
    }
    async startRoom(roomId, userId) {
        await this.prisma.$transaction(async (tx) => {
            const room = await tx.room.findUnique({
                where: { id: roomId },
                select: { hostId: true, status: true },
            });
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            if (room.hostId !== userId) {
                throw new common_1.ForbiddenException('Only the host can start FoodFight');
            }
            if (room.status !== client_1.RoomStatus.LOBBY) {
                throw new common_1.ConflictException('This room has already started');
            }
            const members = await tx.roomMember.findMany({
                where: { roomId, leftAt: null },
                select: { isReady: true },
            });
            if (members.length === 0 || members.some((member) => !member.isReady)) {
                throw new common_1.ConflictException('All members must be ready before starting');
            }
            await tx.room.update({
                where: { id: roomId },
                data: { status: client_1.RoomStatus.IN_PROGRESS },
            });
        });
        const updatedRoom = await this.getRoom(roomId, userId);
        this.roomRealtimeService.publish(roomId);
        return updatedRoom;
    }
    async leaveRoom(roomId, userId) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: { hostId: true, status: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.hostId === userId) {
            throw new common_1.ConflictException('The host must transfer host before leaving the room');
        }
        if (room.status !== client_1.RoomStatus.LOBBY) {
            throw new common_1.ConflictException('You can only leave from the lobby');
        }
        const member = await this.prisma.roomMember.findFirst({
            where: { roomId, userId, leftAt: null },
            select: { id: true },
        });
        if (!member) {
            throw new common_1.ForbiddenException('You are not a member of this room');
        }
        await this.prisma.roomMember.update({
            where: { id: member.id },
            data: { leftAt: new Date(), isReady: false },
        });
        this.roomRealtimeService.publish(roomId);
        return { message: 'Left room successfully' };
    }
    async transferHost(roomId, currentUserId, memberId) {
        await this.prisma.$transaction(async (tx) => {
            const room = await tx.room.findUnique({
                where: { id: roomId },
                select: { hostId: true, status: true },
            });
            if (!room) {
                throw new common_1.NotFoundException('Room not found');
            }
            if (room.hostId !== currentUserId) {
                throw new common_1.ForbiddenException('Only the host can manage members');
            }
            if (room.status !== client_1.RoomStatus.LOBBY) {
                throw new common_1.ConflictException('Members can only be managed in the lobby');
            }
            const targetMember = await tx.roomMember.findFirst({
                where: { id: memberId, roomId, leftAt: null },
                select: { id: true, userId: true },
            });
            if (!targetMember) {
                throw new common_1.NotFoundException('Member not found in this room');
            }
            if (targetMember.userId === currentUserId) {
                throw new common_1.ConflictException('You are already the host of this room');
            }
            const previousHostMember = await tx.roomMember.findUnique({
                where: { roomId_userId: { roomId, userId: currentUserId } },
                select: { id: true },
            });
            if (previousHostMember) {
                await tx.roomMember.delete({ where: { id: targetMember.id } });
                await tx.roomMember.update({
                    where: { id: previousHostMember.id },
                    data: { leftAt: null, isReady: false },
                });
            }
            else {
                await tx.roomMember.update({
                    where: { id: targetMember.id },
                    data: { userId: currentUserId, isReady: false, leftAt: null },
                });
            }
            await tx.room.update({
                where: { id: roomId },
                data: { hostId: targetMember.userId },
            });
        });
        const updatedRoom = await this.getRoom(roomId, currentUserId);
        this.roomRealtimeService.publish(roomId);
        return updatedRoom;
    }
    async kickMember(roomId, currentUserId, memberId) {
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
            select: { hostId: true, status: true },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.hostId !== currentUserId) {
            throw new common_1.ForbiddenException('Only the host can manage members');
        }
        if (room.status !== client_1.RoomStatus.LOBBY) {
            throw new common_1.ConflictException('Members can only be managed in the lobby');
        }
        const targetMember = await this.prisma.roomMember.findFirst({
            where: { id: memberId, roomId, leftAt: null },
            select: { id: true, userId: true },
        });
        if (!targetMember) {
            throw new common_1.NotFoundException('Member not found in this room');
        }
        if (targetMember.userId === currentUserId) {
            throw new common_1.ConflictException('The host cannot be removed from the room');
        }
        await this.prisma.roomMember.update({
            where: { id: targetMember.id },
            data: { leftAt: new Date() },
        });
        this.roomRealtimeService.publish(roomId);
        return this.getRoom(roomId, currentUserId);
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
    toLobbyResponse(room, isHost, userId) {
        const currentMember = room.members.find((member) => member.userId === userId);
        return {
            id: room.id,
            name: room.name,
            isHost,
            currentMember: currentMember
                ? { id: currentMember.id, isReady: currentMember.isReady }
                : null,
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
        config_1.ConfigService,
        room_realtime_service_1.RoomRealtimeService])
], JoinRoomService);
//# sourceMappingURL=join-room.service.js.map