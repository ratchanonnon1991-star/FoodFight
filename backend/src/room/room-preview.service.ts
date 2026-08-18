import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RoomPreviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomByCode(roomCode: string) {
    const normalizedRoomCode = this.normalizeRoomCode(roomCode);
    const room = await this.prisma.room.findUnique({
      where: { roomCode: normalizedRoomCode },
      select: this.previewRoomSelect,
    });

    return this.toPreviewResponse(
      room,
      'Room not found. Please check the code and try again.',
    );
  }

  async findRoomByInviteToken(inviteToken: string) {
    const normalizedInviteToken = inviteToken.trim();
    if (!normalizedInviteToken) {
      throw new BadRequestException('Invalid invite link');
    }

    const room = await this.prisma.room.findUnique({
      where: { inviteToken: normalizedInviteToken },
      select: this.previewRoomSelect,
    });

    return this.toPreviewResponse(room, 'Invalid invite link');
  }

  private readonly previewRoomSelect = {
    id: true,
    name: true,
    maxMembers: true,
    locationName: true,
    searchRadiusKm: true,
    scheduledAt: true,
    status: true,
    host: { select: { displayName: true, avatarUrl: true } },
  } as const;

  private async toPreviewResponse(
    room: {
      id: string;
      name: string;
      maxMembers: number;
      locationName: string;
      searchRadiusKm: number;
      scheduledAt: Date;
      status: RoomStatus;
      host: { displayName: string; avatarUrl: string | null };
    } | null,
    notFoundMessage: string,
  ) {
    if (!room) {
      throw new NotFoundException(notFoundMessage);
    }

    if (room.status !== RoomStatus.LOBBY) {
      throw new ConflictException('Room is no longer available');
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

  private normalizeRoomCode(roomCode: string): string {
    const normalizedRoomCode = roomCode.trim().toUpperCase();
    if (!/^[A-Z0-9]{6}$/.test(normalizedRoomCode)) {
      throw new BadRequestException('Invalid room code');
    }

    return normalizedRoomCode;
  }
}
