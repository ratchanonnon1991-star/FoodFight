import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Prisma,
  RoomStatus,
} from '../database/generated/prisma/client';
import { PrismaService } from '../database/prisma.service';
import { FoodFightService } from '../food-fight/food-fight.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRealtimeService } from './room-realtime.service';

const JOIN_TRANSACTION_ATTEMPTS = 3;

@Injectable()
export class JoinRoomService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly roomRealtimeService: RoomRealtimeService,
    private readonly foodFightService: FoodFightService,
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
              select: { id: true, leftAt: true },
            });

            if (existingMember?.leftAt === null) {
              throw new ConflictException('Already joined');
            }

            const activeMemberCount = await tx.roomMember.count({
              where: { roomId, leftAt: null },
            });

            if (activeMemberCount + 1 >= room.maxMembers) {
              throw new ConflictException('Room is full');
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

    const updatedRoom = await this.getRoom(roomId, userId);
    this.roomRealtimeService.publish(roomId);

    return {
      message: 'Joined room successfully',
      member: joinedMember,
      room: updatedRoom,
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

    return this.toLobbyResponse(room, isHost, userId);
  }

  async getCurrentRoom(userId: string) {
    const room = await this.prisma.room.findFirst({
      where: {
        status: { in: [RoomStatus.LOBBY, RoomStatus.IN_PROGRESS] },
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

  async updateRoom(roomId: string, userId: string, dto: UpdateRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { hostId: true, status: true, maxMembers: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.hostId !== userId) {
      throw new ForbiddenException('Only the host can edit room details');
    }

    if (room.status !== RoomStatus.LOBBY) {
      throw new ConflictException('Only lobby rooms can be edited');
    }

    if (dto.maxMembers !== undefined) {
      const activeMemberCount = await this.prisma.roomMember.count({
        where: { roomId, leftAt: null },
      });

      if (dto.maxMembers < activeMemberCount + 1) {
        throw new ConflictException(
          'Maximum members cannot be lower than the current member count',
        );
      }
    }

    const data: {
      name?: string;
      maxMembers?: number;
      locationName?: string;
      latitude?: number | null;
      longitude?: number | null;
      searchRadiusKm?: number;
      scheduledAt?: Date;
    } = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.maxMembers !== undefined) data.maxMembers = dto.maxMembers;
    if (dto.locationName !== undefined) data.locationName = dto.locationName;
    if (dto.latitude !== undefined) data.latitude = dto.latitude;
    if (dto.longitude !== undefined) data.longitude = dto.longitude;
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

  async closeRoom(roomId: string, userId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { hostId: true, status: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.hostId !== userId) {
      throw new ForbiddenException('Only the host can close the room');
    }

    if (
      room.status !== RoomStatus.LOBBY &&
      room.status !== RoomStatus.IN_PROGRESS
    ) {
      throw new ConflictException('Only active rooms can be closed');
    }

    await this.prisma.room.update({
      where: { id: roomId },
      data: { status: RoomStatus.CANCELLED },
    });

    this.roomRealtimeService.publish(roomId);

    return { message: 'Room closed successfully' };
  }

  async setReady(roomId: string, userId: string, isReady: boolean) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { hostId: true, status: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.hostId === userId) {
      throw new ConflictException('The host does not need to set readiness');
    }

    if (room.status !== RoomStatus.LOBBY) {
      throw new ConflictException(
        'Ready status can only be changed in the lobby',
      );
    }

    const member = await this.prisma.roomMember.findFirst({
      where: { roomId, userId, leftAt: null },
      select: { id: true },
    });

    if (!member) {
      throw new ForbiddenException('You are not a member of this room');
    }

    await this.prisma.roomMember.update({
      where: { id: member.id },
      data: { isReady },
    });

    const updatedRoom = await this.getRoom(roomId, userId);
    this.roomRealtimeService.publish(roomId);

    return updatedRoom;
  }

  async startRoom(roomId: string, userId: string) {
    await this.prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: { id: roomId },
        select: { hostId: true, status: true },
      });

      if (!room) {
        throw new NotFoundException('Room not found');
      }

      if (room.hostId !== userId) {
        throw new ForbiddenException('Only the host can start FoodFight');
      }

      if (room.status !== RoomStatus.LOBBY) {
        throw new ConflictException('This room has already started');
      }

      const members = await tx.roomMember.findMany({
        where: { roomId, leftAt: null },
        select: { userId: true, isReady: true },
      });

      if (members.length === 0 || members.some((member) => !member.isReady)) {
        throw new ConflictException(
          'All members must be ready before starting',
        );
      }

      await this.foodFightService.createSessionForStartedRoom(
        tx,
        roomId,
        room.hostId,
        members.map((member) => member.userId),
      );

      await tx.room.update({
        where: { id: roomId },
        data: { status: RoomStatus.IN_PROGRESS },
      });
    });

    const updatedRoom = await this.getRoom(roomId, userId);
    this.roomRealtimeService.publish(roomId);

    return updatedRoom;
  }

  async leaveRoom(roomId: string, userId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { hostId: true, status: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.hostId === userId) {
      throw new ConflictException(
        'The host must transfer host before leaving the room',
      );
    }

    if (room.status !== RoomStatus.LOBBY) {
      throw new ConflictException('You can only leave from the lobby');
    }

    const member = await this.prisma.roomMember.findFirst({
      where: { roomId, userId, leftAt: null },
      select: { id: true },
    });

    if (!member) {
      throw new ForbiddenException('You are not a member of this room');
    }

    await this.prisma.roomMember.update({
      where: { id: member.id },
      data: { leftAt: new Date(), isReady: false },
    });

    this.roomRealtimeService.publish(roomId);

    return { message: 'Left room successfully' };
  }

  async transferHost(roomId: string, currentUserId: string, memberId: string) {
    await this.prisma.$transaction(async (tx) => {
      const room = await tx.room.findUnique({
        where: { id: roomId },
        select: { hostId: true, status: true },
      });

      if (!room) {
        throw new NotFoundException('Room not found');
      }

      if (room.hostId !== currentUserId) {
        throw new ForbiddenException('Only the host can manage members');
      }

      if (room.status !== RoomStatus.LOBBY) {
        throw new ConflictException('Members can only be managed in the lobby');
      }

      const targetMember = await tx.roomMember.findFirst({
        where: { id: memberId, roomId, leftAt: null },
        select: { id: true, userId: true },
      });

      if (!targetMember) {
        throw new NotFoundException('Member not found in this room');
      }

      if (targetMember.userId === currentUserId) {
        throw new ConflictException('You are already the host of this room');
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
      } else {
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

  async kickMember(roomId: string, currentUserId: string, memberId: string) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
      select: { hostId: true, status: true },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.hostId !== currentUserId) {
      throw new ForbiddenException('Only the host can manage members');
    }

    if (room.status !== RoomStatus.LOBBY) {
      throw new ConflictException('Members can only be managed in the lobby');
    }

    const targetMember = await this.prisma.roomMember.findFirst({
      where: { id: memberId, roomId, leftAt: null },
      select: { id: true, userId: true },
    });

    if (!targetMember) {
      throw new NotFoundException('Member not found in this room');
    }

    if (targetMember.userId === currentUserId) {
      throw new ConflictException('The host cannot be removed from the room');
    }

    await this.prisma.roomMember.update({
      where: { id: targetMember.id },
      data: { leftAt: new Date() },
    });

    this.roomRealtimeService.publish(roomId);

    return this.getRoom(roomId, currentUserId);
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
    userId: string,
  ) {
    const currentMember = room.members.find(
      (member) => member.userId === userId,
    );

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
