import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, randomInt } from 'node:crypto';
import { Prisma, RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

const ROOM_CODE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const ROOM_CODE_LENGTH = 6;
const ROOM_CREATE_ATTEMPTS = 5;

@Injectable()
export class CreateRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async createRoom(userId: string, dto: CreateRoomDto) {
    const host = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!host) {
      throw new UnauthorizedException('Authenticated user not found');
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
            status: RoomStatus.LOBBY,
          },
          select: this.roomSelect,
        });

        return this.toRoomCreatedResponse(room);
      } catch (error) {
        if (this.isPrismaError(error, 'P2002')) {
          continue;
        }

        throw error;
      }
    }

    throw new ConflictException('Failed to create room. Please try again.');
  }

  private readonly roomSelect = {
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
  } as const;

  private toRoomCreatedResponse(room: {
    id: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number;
    scheduledAt: Date;
    status: RoomStatus;
    host: { displayName: string; avatarUrl: string | null };
  }) {
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

  private generateRoomCode(): string {
    return Array.from(
      { length: ROOM_CODE_LENGTH },
      () => ROOM_CODE_ALPHABET[randomInt(ROOM_CODE_ALPHABET.length)],
    ).join('');
  }

  private generateInviteToken(): string {
    return randomBytes(32).toString('base64url');
  }

  private buildInviteLink(inviteToken: string): string {
    const frontendUrl = (
      this.configService.get<string>('FRONTEND_URL') ?? 'http://localhost:3000'
    ).replace(/\/+$/, '');

    return `${frontendUrl}/join/${encodeURIComponent(inviteToken)}`;
  }

  private isPrismaError(
    error: unknown,
    code: string,
  ): error is Prisma.PrismaClientKnownRequestError {
    return (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === code
    );
  }
}
