import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, RoomStatus } from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';

const JOIN_TRANSACTION_ATTEMPTS = 3;

@Injectable()
export class JoinRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async joinRoom(roomId: string, userId: string) {
    let joinedMember:
      | {
          id: string;
          roomId: string;
          userId: string;
          isReady: boolean;
          joinedAt: Date;
        }
      | undefined;

    for (let attempt = 0; attempt < JOIN_TRANSACTION_ATTEMPTS; attempt += 1) {
      try {
        joinedMember = await this.prisma.$transaction(
          async (tx) => {
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
              throw new NotFoundException('Room not found');
            }

            if (room.status !== RoomStatus.LOBBY) {
              throw new ConflictException('Room is no longer available');
            }

            if (room.hostId === userId) {
              throw new ConflictException('Host cannot join their own room');
            }

            const existingMember = await tx.roomMember.findUnique({
              where: { roomId_userId: { roomId, userId } },
              select: { id: true },
            });

            if (existingMember) {
              throw new ConflictException('Already joined');
            }

            const activeMemberCount = await tx.roomMember.count({
              where: { roomId, leftAt: null },
            });

            if (activeMemberCount + 1 >= room.maxMembers) {
              throw new ConflictException('Room is full');
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
          },
          { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
        );

        break;
      } catch (error) {
        if (
          this.isPrismaError(error, 'P2034') &&
          attempt < JOIN_TRANSACTION_ATTEMPTS - 1
        ) {
          continue;
        }

        if (this.isPrismaError(error, 'P2002')) {
          throw new ConflictException('Already joined');
        }

        throw error;
      }
    }

    if (!joinedMember) {
      throw new ConflictException('Failed to join room. Please try again.');
    }

    return {
      message: 'Joined room successfully',
      member: joinedMember,
      room: await this.getRoom(roomId, userId),
    };
  }

  async getRoom(roomId: string, userId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: this.lobbyRoomSelect,
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const isHost = room.hostId === userId;
    const isActiveMember = room.members.some(
      (member) => member.userId === userId,
    );

    if (!isHost && !isActiveMember) {
      throw new ForbiddenException('You are not a member of this room');
    }

    return this.toLobbyResponse(room, isHost);
  }

  private readonly lobbyRoomSelect = {
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
      orderBy: { joinedAt: 'asc' as const },
      select: {
        id: true,
        userId: true,
        isReady: true,
        joinedAt: true,
        user: { select: { displayName: true, avatarUrl: true } },
      },
    },
  } as const;

  private toLobbyResponse(
    room: {
      id: string;
      hostId: string;
      name: string;
      roomCode: string;
      inviteToken: string;
      maxMembers: number;
      locationName: string;
      searchRadiusKm: number;
      scheduledAt: Date;
      status: RoomStatus;
      host: { displayName: string; avatarUrl: string | null };
      members: Array<{
        id: string;
        userId: string;
        isReady: boolean;
        joinedAt: Date;
        user: { displayName: string; avatarUrl: string | null };
      }>;
    },
    isHost: boolean,
  ) {
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
