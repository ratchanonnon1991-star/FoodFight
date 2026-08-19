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
exports.RoomPreviewService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
let RoomPreviewService = class RoomPreviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findRoomByCode(roomCode) {
        const normalizedRoomCode = this.normalizeRoomCode(roomCode);
        const room = await this.prisma.room.findUnique({
            where: { roomCode: normalizedRoomCode },
            select: this.previewRoomSelect,
        });
        return this.toPreviewResponse(room, 'Room not found. Please check the code and try again.');
    }
    async findRoomByInviteToken(inviteToken) {
        const normalizedInviteToken = inviteToken.trim();
        if (!normalizedInviteToken) {
            throw new common_1.BadRequestException('Invalid invite link');
        }
        const room = await this.prisma.room.findUnique({
            where: { inviteToken: normalizedInviteToken },
            select: this.previewRoomSelect,
        });
        return this.toPreviewResponse(room, 'Invalid invite link');
    }
    previewRoomSelect = {
        id: true,
        name: true,
        maxMembers: true,
        locationName: true,
        searchRadiusKm: true,
        scheduledAt: true,
        status: true,
        host: { select: { displayName: true, avatarUrl: true } },
    };
    async toPreviewResponse(room, notFoundMessage) {
        if (!room) {
            throw new common_1.NotFoundException(notFoundMessage);
        }
        if (room.status !== client_1.RoomStatus.LOBBY) {
            throw new common_1.ConflictException('Room is no longer available');
        }
        const activeMemberCount = await this.prisma.roomMember.count({
            where: { roomId: room.id, leftAt: null },
        });
        return {
            id: room.id,
            name: room.name,
            host: room.host,
            memberCount: activeMemberCount + 1,
            maxMembers: room.maxMembers,
            locationName: room.locationName,
            searchRadiusKm: room.searchRadiusKm,
            scheduledAt: room.scheduledAt,
        };
    }
    normalizeRoomCode(roomCode) {
        const normalizedRoomCode = roomCode.trim().toUpperCase();
        if (!/^[A-Z0-9]{6}$/.test(normalizedRoomCode)) {
            throw new common_1.BadRequestException('Invalid room code');
        }
        return normalizedRoomCode;
    }
};
exports.RoomPreviewService = RoomPreviewService;
exports.RoomPreviewService = RoomPreviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomPreviewService);
//# sourceMappingURL=room-preview.service.js.map