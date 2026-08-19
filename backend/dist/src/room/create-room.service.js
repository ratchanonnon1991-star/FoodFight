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
exports.CreateRoomService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_crypto_1 = require("node:crypto");
const client_1 = require("../database/generated/prisma/client");
const prisma_service_1 = require("../database/prisma.service");
const ROOM_CODE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const ROOM_CODE_LENGTH = 6;
const ROOM_CREATE_ATTEMPTS = 5;
let CreateRoomService = class CreateRoomService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async createRoom(userId, dto) {
        const host = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true },
        });
        if (!host) {
            throw new common_1.UnauthorizedException('Authenticated user not found');
        }
        const scheduledAt = new Date(dto.scheduledAt);
        for (let attempt = 0; attempt < ROOM_CREATE_ATTEMPTS; attempt += 1) {
            try {
                const room = await this.prisma.room.create({
                    data: {
                        hostId: userId,
                        name: dto.name,
                        roomCode: this.generateRoomCode(),
                        inviteToken: this.generateInviteToken(),
                        maxMembers: dto.maxMembers,
                        locationName: dto.locationName,
                        latitude: dto.latitude,
                        longitude: dto.longitude,
                        searchRadiusKm: dto.searchRadiusKm,
                        scheduledAt,
                        status: client_1.RoomStatus.LOBBY,
                    },
                    select: this.roomSelect,
                });
                return this.toRoomCreatedResponse(room);
            }
            catch (error) {
                if (this.isPrismaError(error, 'P2002')) {
                    continue;
                }
                throw error;
            }
        }
        throw new common_1.ConflictException('Failed to create room. Please try again.');
    }
    roomSelect = {
        id: true,
        name: true,
        roomCode: true,
        inviteToken: true,
        maxMembers: true,
        locationName: true,
        latitude: true,
        longitude: true,
        searchRadiusKm: true,
        scheduledAt: true,
        status: true,
        host: { select: { displayName: true, avatarUrl: true } },
    };
    toRoomCreatedResponse(room) {
        return {
            id: room.id,
            name: room.name,
            host: room.host,
            memberCount: 1,
            maxMembers: room.maxMembers,
            locationName: room.locationName,
            latitude: room.latitude,
            longitude: room.longitude,
            searchRadiusKm: room.searchRadiusKm,
            scheduledAt: room.scheduledAt,
            status: room.status,
            roomCode: room.roomCode,
            inviteToken: room.inviteToken,
            inviteLink: this.buildInviteLink(room.inviteToken),
        };
    }
    generateRoomCode() {
        return Array.from({ length: ROOM_CODE_LENGTH }, () => ROOM_CODE_ALPHABET[(0, node_crypto_1.randomInt)(ROOM_CODE_ALPHABET.length)]).join('');
    }
    generateInviteToken() {
        return (0, node_crypto_1.randomBytes)(32).toString('base64url');
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
exports.CreateRoomService = CreateRoomService;
exports.CreateRoomService = CreateRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], CreateRoomService);
//# sourceMappingURL=create-room.service.js.map